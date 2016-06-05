import * as plugins from "./npmci.plugins"
import * as NpmciEnv from "./npmci.env";

export let build = function(){
    let done = plugins.q.defer();
    readDockerfiles()
        .then(sortDockerfiles)
        .then(mapDockerfiles)
        .then(buildDockerfiles);
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
    let trackingArray:Dockerfile[] = [];
    let sorterFunctionCounter:number = 0;
    let sorterFunction = function(){
        sortableArrayArg.forEach((dockerfileArg)=>{
            let cleanTags = cleanTagsArrayFunction(sortableArrayArg,trackingArray);
            if(cleanTags.indexOf(dockerfileArg.baseImage) == -1 && trackingArray.indexOf(dockerfileArg) == -1){
                sortedArray.push(dockerfileArg);
                trackingArray.push(dockerfileArg);
            } else if(cleanTags.indexOf(dockerfileArg.baseImage) != -1){
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
            let dockerfileDependency:Dockerfile;
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

export let buildDockerfiles = function(sortedArrayArg:Dockerfile[]){
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.build();
    })
    done.resolve();
    return done.promise;
}

export class Dockerfile {
    filePath:string;
    repo:string;
    version:string;
    cleanTag:string;
    buildTag:string;
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
        if(options.filePath && options.read){
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        };
        this.baseImage = dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    };
    build(){
        if(!this.buildTag){
            this.patchContents();
            let tag = dockerTag(this.repo,this.version);
            plugins.shelljs.exec("docker build -t " + tag + " -f " + this.filePath + " .");
            this.buildTag = tag;
            NpmciEnv.dockerFilesBuilt.push(this);
            this.restoreContents();
        } else {
            plugins.beautylog.error("This Dockerfile has already been built!");
        }
        
    };
    push(){
        if(this.buildTag){
            plugins.shelljs.exec("docker push " + this.buildTag);
        } else {
            plugins.beautylog.error("Dockerfile hasn't been built yet!");
        }
    }
    patchContents(){
        
    };
    restoreContents(){
        
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

export let dockerTag = function(repoArg:string,versionArg:string):string{
    let tagString:string;
    let registry = NpmciEnv.dockerRegistry;
    if(process.env.CI_BUILD_STAGE == "build"  || process.env.CI_BUILD_STAGE == "test"){
        registry = "registry.gitlab.com";
    } 
    let repo = repoArg;
    let version = versionArg;
    if(process.env.CI_BUILD_STAGE == "build" || process.env.CI_BUILD_STAGE == "test"){
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