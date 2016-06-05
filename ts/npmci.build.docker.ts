import * as plugins from "./npmci.plugins"
import * as NpmciEnv from "./npmci.env";


export let build = function(){
    let done = plugins.q.defer();
    done.resolve();
    return done.promise;
}

let readDockerfiles = function(){
    plugins.gulp.dest("./Dockerfile*")
        .pipe(makeDockerfiles);
};

let makeDockerfiles = function(){
    return function(file,enc,cb){
        NpmciEnv.dockerFiles.push(
            new Dockerfile({
                filePath:file.path,
                read:true
            })
        );
        cb();
    };
}

export class Dockerfile {
    repo:string;
    version:string;
    content:string;
    baseImage:string;
    constructor(options:{filePath?:string,fileContents?:string|Buffer,read?:boolean}){
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = dockerFileVersion(plugins.path.parse(options.filePath).base);
        if(options.filePath && options.read){
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        };
        this.baseImage = dockerBaseImage(this.content);
    };
    build(){
        
    };
    push(){
        
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

export let dockerTagVersion = function(){
    if(process.env.CI_BUILD_STAGE == "test"){
        return "test";
    } else {
        return "latest"
    }
};
