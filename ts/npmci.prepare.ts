import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env"
import * as sshModule from "./npmci.ssh"

let npm = function(){
    let done = plugins.q.defer();
    
    let npmrcPrefix:string = "//registry.npmjs.org/:_authToken=";
    let npmToken:string = process.env.NPMCI_TOKEN_NPM;
    let npmrcFileString = npmrcPrefix + npmToken;
    
    if(npmToken){
        plugins.beautylog.info("found access token");
    } else {
        plugins.beautylog.error("no access token found! Exiting!");
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString,"/root/.npmrc");
    done.resolve();
    return done.promise;
};

let docker = function(){
    let done = plugins.q.defer();
    env.setDockerRegistry("docker.io");
    let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/
    if(!process.env.NPMCI_LOGIN_DOCKER){
        plugins.beautylog.error("You have to specify Login Data to the Docker Registry");
        process.exit(1);
    }
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com"); // Always also login to GitLab Registry
    let dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER);
    let username = dockerRegexResultArray[1];
    let password = dockerRegexResultArray[2];
    plugins.shelljs.exec("docker login -u " + username + " -p " + password);
    done.resolve();
    return done.promise;
}

let dockerGitlab = function(){
    let done = plugins.q.defer();
    env.setDockerRegistry("registry.gitlab.com");
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com");
    done.resolve();
    return done.promise;
}

let ssh = function(){
    let done = plugins.q.defer();
    sshModule.ssh()
        .then(done.resolve);
    return done.promise;
}

export let prepare = function(serviceArg:string){
    switch (serviceArg) {
        case "npm":
            return npm();
        case "docker":
            return docker();
        case "docker-gitlab":
            return dockerGitlab();
        case "ssh":
            return ssh();
        default:
            break;
    }
}