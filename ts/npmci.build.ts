import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env";
import * as buildDocker from "./npmci.build.docker"

/**
 * defines possible build services
 */
export type TBuildService = "docker";

/**
 * builds for a specific service
 */
export let build = function(commandArg):plugins.q.Promise<any> {
    switch(commandArg){
        case "docker":
            return buildDocker.build();   
        default:
            plugins.beautylog.log("build target " + commandArg + " not recognised!");
    };
    return;
}



