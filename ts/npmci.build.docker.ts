import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
import * as NpmciEnv from "./npmci.env";
import {bashBare} from "./npmci.bash";

export let build = function(){
    let done = plugins.q.defer();
    readDockerfiles()
        .then(sortDockerfiles)
        .then(mapDockerfiles)
        .then(buildDockerfiles)
        .then(pushDockerfiles)
        .then(() => {
            done.resolve();
        });
    return done.promise;
}

export let readDockerfiles = function(){
    let done = plugins.q.defer();
    let readDockerfilesArray:Dockerfile[] = []
    plugins.gulp.src("./Dockerfile*")
        .pipe(plugins.through2.obj(function(file,enc,cb){
            let myDockerfile = new Dockerfile({
                filePath:file.path,
                read:true
            });
            readDockerfilesArray.push(myDockerfile);
            cb(null,file);
         },function(){
             done.resolve(readDockerfilesArray);
         }));
    return done.promise;
}

export let sortDockerfiles = function(sortableArrayArg:Dockerfile[]){
    let done = plugins.q.defer();
    let sortedArray:Dockerfile[] = [];
    let cleanTagsOriginal = cleanTagsArrayFunction(sortableArrayArg,sortedArray);
    let sorterFunctionCounter:number = 0;
    let sorterFunction = function(){
        sortableArrayArg.forEach((dockerfileArg)=>{
            let cleanTags = cleanTagsArrayFunction(sortableArrayArg,sortedArray);
            if(cleanTags.indexOf(dockerfileArg.baseImage) == -1 && sortedArray.indexOf(dockerfileArg) == -1){
                sortedArray.push(dockerfileArg);
            };
            if(cleanTagsOriginal.indexOf(dockerfileArg.baseImage) != -1){
                dockerfileArg.localBaseImageDependent = true;
            };
        });
        if(sortableArrayArg.length == sortedArray.length){
            done.resolve(sortedArray);
        } else if (sorterFunctionCounter < 10) {
            sorterFunctionCounter++;
            sorterFunction();
        };
    }
    sorterFunction();
    return done.promise;
};

export let mapDockerfiles = function(sortedArray:Dockerfile[]){
    let done = plugins.q.defer();
    sortedArray.forEach((dockerfileArg) => {
        if(dockerfileArg.localBaseImageDependent){
            sortedArray.forEach((dockfile2:Dockerfile) => {
                if(dockfile2.cleanTag == dockerfileArg.baseImage){
                    dockerfileArg.localBaseDockerfile = dockfile2;
                }
            })
        };
    });
    done.resolve(sortedArray);
    return done.promise;
}

export let buildDockerfiles = (sortedArrayArg:Dockerfile[]) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.build();
    })
    done.resolve(sortedArrayArg);
    return done.promise;
}

export let pushDockerfiles = function(sortedArrayArg:Dockerfile[]){
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.push();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
}

export let pullDockerfileImages = (sortableArrayArg:Dockerfile[]) => {
    let done = plugins.q.defer();
    sortableArrayArg.forEach((dockerfileArg) => {
        dockerfileArg.pull();
    });
    done.resolve(sortableArrayArg);
    return done.promise;
}

export let testDockerfiles = (sortedArrayArg:Dockerfile[]) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.test();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};

export let releaseDockerfiles = (sortedArrayArg:Dockerfile[]) => {
     let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.release();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
}

export class Dockerfile {
    filePath:string;
    repo:string;
    version:string;
    cleanTag:string;
    buildTag:string;
    releaseTag:string;
    containerName:string
    content:string;
    patchedContent:string;
    baseImage:string;
    localBaseImageDependent:boolean;
    localBaseDockerfile:Dockerfile;
    constructor(options:{filePath?:string,fileContents?:string|Buffer,read?:boolean}){
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        this.buildTag = dockerTag(this.repo,this.version,"build");
        this.releaseTag = dockerTag(this.repo,this.version,"release");
        this.containerName = "dockerfile-" + this.version;
        if(options.filePath && options.read){
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        };
        this.baseImage = dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    };
    build(){
        let done = plugins.q.defer();
        this.patchContents();
        bashBare("docker build -t " + this.buildTag + " -f " + this.filePath + " .");
        NpmciEnv.dockerFilesBuilt.push(this);
        this.restoreContents();
        done.resolve();
        return done.promise;
    };
    push(){
        let done = plugins.q.defer();
        if(this.buildTag){
            bashBare("docker push " + this.buildTag);
        } else {
            plugins.beautylog.error("Dockerfile hasn't been built yet!");
        }
        done.resolve();
        return done.promise;
    }
    pull(){
        bashBare("docker pull " + this.buildTag);
    };
    test(){
        let testExists = plugins.smartfile.checks.fileExistsSync(
            plugins.path.join(paths.NpmciProjectDir,("./test/test_" + this.version + ".sh"))
        );
        if(testExists){
            bashBare("docker run -v " + 
                plugins.path.join(paths.NpmciProjectDir,"./test") + ":/test/ " +
                "--name " + this.containerName + " /test/" + "test_" + this.version  + ".sh");
        } else {
            plugins.beautylog.warn("skipping tests for " + this.cleanTag + " because no testfile was found!");
        }
    };
    release(){
        bashBare("docker tag " + this.getId() + " " + this.releaseTag);
        bashBare("docker push " + this.releaseTag);
    }
    getId(){
        let containerId = bashBare("docker inspect --type=image --format=\"{{.Id}}\" " + this.buildTag);
        return containerId;
    };
    patchContents(){
        let done = plugins.q.defer();
        if(this.localBaseImageDependent == true){
            this.patchedContent = this.content.replace(/FROM\s[a-zA-Z0-9\/\-\:]*/, 'FROM ' + this.localBaseDockerfile.buildTag);
            plugins.smartfile.memory.toFsSync(
                this.patchedContent,
                {
                    fileName:plugins.path.parse(this.filePath).name,
                    filePath:plugins.path.parse(this.filePath).dir
                }
            );
        }
        done.resolve();
        return done.promise;
    };
    restoreContents(){
        let done = plugins.q.defer();
        if(this.localBaseImageDependent == true){
            plugins.smartfile.memory.toFsSync(
                this.content,
                {
                    fileName:plugins.path.parse(this.filePath).name,
                    filePath:plugins.path.parse(this.filePath).dir
                }
            );
        }
        done.resolve();
        return done.promise;
    };
}

export let dockerFileVersion = function(dockerfileNameArg:string):string{
    let versionString:string;
    let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    let regexResultArray = versionRegex.exec(dockerfileNameArg);
    if(regexResultArray && regexResultArray.length == 2){
        versionString = regexResultArray[1];        
    } else {
        versionString = "latest";
    }
    return versionString;
}

export let dockerBaseImage = function(dockerfileContentArg:string){
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg)
    return regexResultArray[1];
}

export let dockerTag = function(repoArg:string,versionArg:string,stageArg:string):string{
    let tagString:string;
    let registry = NpmciEnv.dockerRegistry;
    if(stageArg == "build"  || stageArg == "test"){
        registry = "registry.gitlab.com";
    } 
    let repo = repoArg;
    let version = versionArg;
    if(NpmciEnv.buildStage == "build" || NpmciEnv.buildStage == "test"){
        version = version + "_test";
    }
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};

export let cleanTagsArrayFunction = function(dockerfileArrayArg:Dockerfile[],trackingArrayArg:Dockerfile[]):string[]{
    let cleanTagsArray:string[] = [];
    dockerfileArrayArg.forEach(function(dockerfileArg){
        if(trackingArrayArg.indexOf(dockerfileArg) == -1){
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
}