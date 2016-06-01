import "typings-global";
import * as plugins from "./npmci.plugins";

let docker = function(){
    
}

let npm = function(){
    let done = plugins.q.defer();
    
    let npmrcPrefix:string = "//registry.npmjs.org/:_authToken=";
    let npmToken:string = process.env.NPMCITOKEN;
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