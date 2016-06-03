import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env";

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
    plugins.shelljs.exec("docker build -t " + "registry.gitlab.com/" + env.repo.user + "/" + env.repo.repo + ":latest .");
    done.resolve();
    return done.promise;
}

let dockerGitlab = function(){
    let done = plugins.q.defer();
    let repo = new plugins.smartstring.GitRepo(process.env.CI_BUILD_REPO);
    plugins.shelljs.exec("docker build -t " + "registry.gitlab.com/" + env.repo.user + "/" + env.repo.repo + ":latest .");
    done.resolve();
    return done.promise;
}