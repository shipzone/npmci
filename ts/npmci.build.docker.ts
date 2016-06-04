import * as plugins from "./npmci.plugins"
import * as NpmciEnv from "./npmci.env";


export let build = function(){
    let done = plugins.q.defer();
    done.resolve();
    return done.promise;
}


class Dockerfile {
    repo:string;
    version:string;
    baseImage:string;
    constructor(){
        
    };
    build(){
        
    };
    
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
