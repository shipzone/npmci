import * as plugins from "./npmci.plugins"
import * as env from "./npmci.env";
import {tagDocker} from ".npmci.tag";
export let build = function(){
    let done = plugins.q.defer();
    done.resolve();
    return done.promise;
}

let getDockerFiles 