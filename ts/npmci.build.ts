import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let build = function(commandArg){
    let done = plugins.q.defer();
    return done.promise;
}