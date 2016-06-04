import "typings-global";
import * as plugins from "./npmci.plugins";
import * as env from "./npmci.env";
export let dockerTagVersion = function(){
    if(process.env.CI_BUILD_STAGE == "test"){
        return "test";
    } else {
        return "latest"
    }
}

export let dockerTag = function(){
    return dockerRegistry + "/" + repo.user + "/" + repo.repo + ":" + dockerTagVersion() +" .";
}

export let dockerTagTest = function(){
    return dockerRegistry + "/" + repo.user + "/" + repo.repo + ":test .";
}

export let dockerTagRelease = function(){
    return dockerRegistry + "/" + repo.user + "/" + repo.repo + ":latest .";
}