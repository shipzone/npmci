import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env";
import * as buildDocker from "./npmci.build.docker"

export let build = function(commandArg){
    switch(commandArg){
        case "docker":
            return buildDocker.build();   
    }
}



