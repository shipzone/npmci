import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let command = () => {
    let done = plugins.q.defer()
    console.log(process.argv);
    done.resolve();
    return done.promise
}