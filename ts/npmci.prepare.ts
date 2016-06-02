import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

let docker = function(){
    let done = plugins.q.defer();
    let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/
    let dockerRegexResultArray = dockerRegex.exec("process.env.NPMCI_LOGIN_DOCKER");
    let username = dockerRegexResultArray[1];
    let password = dockerRegexResultArray[2];
    bash("docker login -u " + username + " -p " + password);
    done.resolve();
    return done.promise;
}

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
    plugins.smartfile.memory.toFsSync(npmrcFileString,{fileName:".npmrc",filePath:"/root"});
    done.resolve();
    return done.promise;
};

export let prepare = function(serviceArg:string){
    switch (serviceArg) {
        case "npm":
            return npm();
        case "docker":
            return docker();
    }
}