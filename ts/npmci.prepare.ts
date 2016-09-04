import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env"
import * as sshModule from "./npmci.ssh"


//types

/**
 * defines possible prepare services
 */
export type TPrepService = "npm" | "docker" | "docker-gitlab" | "ssh";

/**
 * authenticates npm with token from env var
 */
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

/**
 * logs in docker
 */
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

/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = function(){
    let done = plugins.q.defer();
    env.setDockerRegistry("registry.gitlab.com");
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com");
    done.resolve();
    return done.promise;
}

/**
 * prepare ssh
 */
let ssh = function(){
    let done = plugins.q.defer();
    sshModule.ssh()
        .then(done.resolve);
    return done.promise;
};

/**
 * the main exported prepare function
 * @param servieArg describes the service to prepare
 */
export let prepare = function(serviceArg:TPrepService){
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