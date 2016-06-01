import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";

export let publish = (serviceArg:string = "npm") => {
    let done = plugins.q.defer();
    switch (serviceArg){
        case "npm": 
            publishNpm()
                .then(function(){
                    done.resolve();
                });
            break;
        case "docker":
            publishDocker()
                .then(function(){
                    done.resolve();
                });
    }
    return done.promise;
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
            bash("docker push");
        });
    return done.promise;
};