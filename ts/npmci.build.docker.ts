import * as plugins from "./npmci.plugins"
import * as NpmciEnv from "./npmci.env";


export let build = function(){
    let done = plugins.q.defer();
    
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

export let cleanTagsArrayFunction = function(dockerfileArrayArg:Dockerfile[]):string[]{
    let cleanTagsArray:string[] = [];
    dockerfileArrayArg.forEach(function(dockerfileArg){
        cleanTagsArray.push(dockerfileArg.cleanTag);
    });
    return cleanTagsArray;
}

export let sortDockerfiles = function(sortableArrayArg:Dockerfile[]){
    let done = plugins.q.defer();
    let sortedArray:Dockerfile[] = []; 
    let sorterFunctionCounter:number = 0;
    let sorterFunction = function(){
        console.log(sorterFunctionCounter);
        let cleanTags = cleanTagsArrayFunction(sortableArrayArg);
        sortableArrayArg.forEach((dockerfileArg)=>{
            if(cleanTags.indexOf(dockerfileArg.baseImage) == -1){
                let dockerfileArgIndex = sortableArrayArg.indexOf(dockerfileArg);
                sortableArrayArg.splice(dockerfileArgIndex,1);
                sortedArray.push(dockerfileArg);
            }
        });
        if(sortableArrayArg.length == 0){
            done.resolve(sortedArray);
        } else if (sorterFunctionCounter < 100) {
            sorterFunctionCounter++;
            sorterFunction();
        };
    }
    sorterFunction();
    return done.promise;
}

export let buildDockerfiles = function(){
    let done = plugins.q.defer();
    NpmciEnv.dockerFiles.forEach(function(dockerfileArg){
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
    baseImage:string;
    constructor(options:{filePath?:string,fileContents?:string|Buffer,read?:boolean}){
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        if(options.filePath && options.read){
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        };
        this.baseImage = dockerBaseImage(this.content);
    };
    build(){
        if(!this.buildTag){
            let tag = dockerTag(this.repo,this.version);
            plugins.shelljs.exec("docker build -t " + tag + " -f " + this.filePath + " .");
            this.buildTag = tag;
            NpmciEnv.dockerFilesBuilt.push(this);
        } else {
            plugins.beautylog.error("This Dockerfile already has been built!");
        }
        
    };
    push(){
        if(this.buildTag){
            plugins.shelljs.exec("docker push " + this.buildTag);
        } else {
            plugins.beautylog.error("Dockerfile hasn't been built yet!");
        }
    }
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
