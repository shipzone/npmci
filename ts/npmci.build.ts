import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let build = function(commandArg){
    switch(commandArg){
        case "docker":
            return docker();
        case "docker-gitlab":
            return dockerGitlab();
        default:
            break;
    }
}

let docker = function(){
    let done = plugins.q.defer();
    let repo = new plugins.smartstring.GitRepo(process.env.CI_BUILD_REPO);
    let dockerTag;
    plugins.shelljs.exec("docker build -t " + "registry.gitlab.com/" + repo.user + "/" + repo.repo + ":latest .");
    done.resolve();
    return done.promise;
}

let dockerGitlab = function(){
    let done = plugins.q.defer();
    let repo = new plugins.smartstring.GitRepo(process.env.CI_BUILD_REPO);
    let dockerTag;
    plugins.shelljs.exec("docker build -t " + "registry.gitlab.com/" + repo.user + "/" + repo.repo + ":latest .");
    done.resolve();
    return done.promise;
}