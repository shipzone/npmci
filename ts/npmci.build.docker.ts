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
    };
}

export class Dockerfile {
    repo:string;
    version:string;
    baseImage:string;
    constructor(options:{filePath?:string,fileContents?:string|Buffer,read?:boolean}){
        if(options.filePath && options.read){
            
        }
    };
    build(){
        
    };
    push(){
        
    }
    
}

export let dockerTagVersion = function(){
    if(process.env.CI_BUILD_STAGE == "test"){
        return "test";
    } else {
        return "latest"
    }
}

export let tagDocker = function(){
    return NpmciEnv.dockerRegistry + "/" + NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo + ":" + dockerTagVersion() +" .";
}

export let dockerTagTest = function(){
    return NpmciEnv.dockerRegistry + "/" + NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo + ":test .";
}

export let dockerTagRelease = function(){
    return NpmciEnv.dockerRegistry + "/" + NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo + ":latest .";
}
