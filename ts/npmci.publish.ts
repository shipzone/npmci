import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env";

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
            bash("docker push " + env.dockerTag());
            done.resolve();
        });
    return done.promise;
};