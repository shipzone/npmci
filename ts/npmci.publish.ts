import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";

export let publish = (serviceArg:string = "npm") => {
    switch (serviceArg){
        case "npm": 
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};

let publishNpm  = function(){
    let done = plugins.q.defer();
    prepare("npm")
        .then(function(){
            bash("npm publish");
            plugins.beautylog.ok("Done!") ;
            done.resolve();
        });
   return done.promise;
}

let publishDocker = function(){
    let done = plugins.q.defer();
    prepare("docker")
        .then(function(){
            bash 
            bash("docker push ");
            done.resolve();
        });
    return done.promise;
};