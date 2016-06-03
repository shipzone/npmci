import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import * as env from "./npmci.env";

export let build = function(commandArg){
    switch(commandArg){
        case "docker":
            return docker();   
    }
}

let docker = function(){
    let done = plugins.q.defer();
    plugins.shelljs.exec("docker build -t " + env.dockerTag());
    done.resolve();
    return done.promise;
}

