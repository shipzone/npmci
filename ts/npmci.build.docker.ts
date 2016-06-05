import * as plugins from "./npmci.plugins"
import * as NpmciEnv from "./npmci.env";


export let build = function(){
    let done = plugins.q.defer();
    plugins.gulp.dest("./Dockerfile*")
        .pipe(readDockerfiles())
        .pipe(plugins.gulpFunction(function(){
            sortDockerfiles()
                .then(buildDockerfiles)
                .then(done.resolve);
        },"atEnd"));
    return done.promise;
}

let readDockerfiles = function(){
    return plugins.through2(function(file,enc,cb){
        let myDockerfile = new Dockerfile({
            filePath:file.path,
            read:true
        });
        NpmciEnv.dockerFiles.push(
            myDockerfile
        );
        cb(null,file);
    });
}

let sortDockerfiles = function(){
    let done = plugins.q.defer();
    let redoSort:boolean;
    let sortFunction = function(){
        redoSort = false;
        let notYetBuiltImages:string[] = [];
        NpmciEnv.dockerFiles.forEach((dockerFileArg)=>{
            notYetBuiltImages.push(dockerFileArg.cleanTag);
        });
        NpmciEnv.dockerFiles.sort(function(a,b){
            plugins.beautylog.log("sort build order for Dockerimages");
            let aIndex = notYetBuiltImages.indexOf(a.cleanTag);
            if(aIndex != -1){notYetBuiltImages.splice(aIndex,1)}
            if(notYetBuiltImages.indexOf(b.cleanTag) != -1){
                redoSort = true;
                return -1;
            } else {
                return 0
            }
        });
        if(redoSort){
            sortFunction();
        } else {
            done.resolve();
        }
    };
    sortFunction();
    return done.promise;
}

let buildDockerfiles = function(){
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

let dockerFileVersion = function(dockerfileNameArg:string):string{
    let versionString:string;
    let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    let regexResultArray = versionRegex.exec(dockerfileNameArg);
    if(regexResultArray.length = 2){
        versionString = regexResultArray[1];        
    } else {
        versionString = "latest";
    }
    return versionString;
}

let dockerBaseImage = function(dockerfileContentArg:string){
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n/
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg)
    return regexResultArray[1];
}

export let dockerTag = function(repoArg:string,versionArg:string):string{
    let tagString:string;
    let registry = NpmciEnv.dockerRegistry;
    if(process.env.CI_BUILD_STAGE == "test"){
        registry = "registry.gitlab.com";
    } 
    let repo = repoArg;
    let version = versionArg;
    if(process.env.CI_BUILD_STAGE == "test" || process.env.CI_BUILD_STAGE == "build"){
        version = version + "_test";
    }
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};
