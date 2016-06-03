import "typings-global";
import * as plugins from "./npmci.plugins";

import {GitRepo} from "smartstring";

export let repo = new GitRepo(process.env.CI_BUILD_REPO);
export let dockerTestTag:string;
export let dockerReleaseTag:string;

export let dockerRegistry = "docker.io"; // will be set by npmci.prepare

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
