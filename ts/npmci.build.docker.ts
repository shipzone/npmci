import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
import * as NpmciEnv from "./npmci.env";
import {bashBare} from "./npmci.bash";

/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
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

/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
export let readDockerfiles = function():plugins.q.Promise<Dockerfile[]>{
    let done = plugins.q.defer<Dockerfile[]>();
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

/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
export let sortDockerfiles = function(sortableArrayArg:Dockerfile[]):plugins.q.Promise<Dockerfile[]>{
    let done = plugins.q.defer<Dockerfile[]>();
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

/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
export let mapDockerfiles = function(sortedArray:Dockerfile[]):plugins.q.Promise<Dockerfile[]>{
    let done = plugins.q.defer<Dockerfile[]>();
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

/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
export let buildDockerfiles = (sortedArrayArg:Dockerfile[]) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.build();
    })
    done.resolve(sortedArrayArg);
    return done.promise;
}

/**
 * pushes the real Dockerfile images to a Docker registry
 */
export let pushDockerfiles = function(sortedArrayArg:Dockerfile[]){
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.push(NpmciEnv.buildStage);
    });
    done.resolve(sortedArrayArg);
    return done.promise;
}

/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
export let pullDockerfileImages = (sortableArrayArg:Dockerfile[],registryArg = "registry.gitlab.com") => {
    let done = plugins.q.defer();
    sortableArrayArg.forEach((dockerfileArg) => {
        dockerfileArg.pull(registryArg);
    });
    done.resolve(sortableArrayArg);
    return done.promise;
}

/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
export let testDockerfiles = (sortedArrayArg:Dockerfile[]) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function(dockerfileArg){
        dockerfileArg.test();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};

/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export class Dockerfile {
    filePath:string;
    repo:string;
    version:string;
    cleanTag:string;
    buildTag:string;
    testTag:string;
    releaseTag:string;
    containerName:string
    content:string;
    baseImage:string;
    localBaseImageDependent:boolean;
    localBaseDockerfile:Dockerfile;
    constructor(options:{filePath?:string,fileContents?:string|Buffer,read?:boolean}){
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        this.buildTag = this.cleanTag;
        this.testTag = dockerTag("registry.gitlab.com",this.repo,this.version,"test");
        this.releaseTag = dockerTag(NpmciEnv.dockerRegistry,this.repo,this.version);
        this.containerName = "dockerfile-" + this.version;
        if(options.filePath && options.read){
            this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
        };
        this.baseImage = dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    };

    /**
     * builds the Dockerfile
     */
    build(){
        let done = plugins.q.defer();
        plugins.beautylog.info("now building Dockerfile for " + this.cleanTag);
        bashBare("docker build -t " + this.buildTag + " -f " + this.filePath + " .");
        NpmciEnv.dockerFilesBuilt.push(this);
        done.resolve();
        return done.promise;
    };

    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg){
        let done = plugins.q.defer();
        let pushTag;
        switch (stageArg){
            case "release":
                pushTag = this.releaseTag;
                break;
            case "test":
            default:
                pushTag = this.testTag;
                break;
        }
        bashBare("docker tag " + this.buildTag + " " + pushTag);
        bashBare("docker push " + pushTag);
        done.resolve();
        return done.promise;
    };

    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg:string){
        let pullTag = this.testTag;
        bashBare("docker pull " + pullTag);
        bashBare("docker tag " + pullTag + " " + this.buildTag);
    };

    /**
     * tests the Dockerfile;
     */
    test(){
        let testFile:string = plugins.path.join(paths.NpmciTestDir,"test_" + this.version + ".sh");
        let testFileExists:boolean = plugins.smartfile.fs.fileExistsSync(testFile);
        if(testFileExists){
            bashBare("docker run --name npmci_test_container " + this.buildTag + " mkdir /npmci_test");
            bashBare("docker cp " + testFile + " npmci_test_container:/npmci_test/test.sh");
            bashBare("docker commit npmci_test_container npmci_test_image");
            bashBare("docker run npmci_test_image sh /npmci_test/test.sh");
            bashBare("docker rm npmci_test_container");
            bashBare("docker rmi --force npmci_test_image");
        } else {
            plugins.beautylog.warn("skipping tests for " + this.cleanTag + " because no testfile was found!");
        }
    };

    /**
     * gets the id of a Dockerfile
     */
    getId(){
        let containerId = bashBare("docker inspect --type=image --format=\"{{.Id}}\" " + this.buildTag);
        return containerId;
    };
}

/**
 * 
 */
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

/**
 * 
 */
export let dockerBaseImage = function(dockerfileContentArg:string){
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg)
    return regexResultArray[1];
}

/**
 * 
 */
export let dockerTag = function(registryArg:string,repoArg:string,versionArg:string,suffixArg?:string):string{
    let tagString:string;
    let registry = registryArg;
    let repo = repoArg;
    let version = versionArg;
    if(suffixArg){
        version = versionArg + "_" + suffixArg;
    };
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};

/**
 * 
 */
export let cleanTagsArrayFunction = function(dockerfileArrayArg:Dockerfile[],trackingArrayArg:Dockerfile[]):string[]{
    let cleanTagsArray:string[] = [];
    dockerfileArrayArg.forEach(function(dockerfileArg){
        if(trackingArrayArg.indexOf(dockerfileArg) == -1){
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
}