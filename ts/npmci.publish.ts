import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";
import * as NpmciEnv from "./npmci.env";
import * as NpmciBuildDocker from "./npmci.build.docker"

/**
 * type of supported services
 */
export type registryService = "npm" | "docker";

/**
 * the main exported publish function.
 * @param registryServiceArg the serviceArg 
 */
export let publish = (registryServiceArg:registryService = "npm") => {
    switch (registryServiceArg){
        case "npm": 
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};

/**
 * tries to publish project at cwd to npm
 */
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

/**
 * tries to pubish current cwd to Docker registry
 */
let publishDocker = function(){
    let done = plugins.q.defer();
        NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(done.resolve);
    return done.promise;
};