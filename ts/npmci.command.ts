import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let command = () => {
    let done = plugins.q.defer()
    let wrappedCommand:string = "";
    let argvArray = process.argv;
    for(let i = 3; i < argvArray.length; i++){
        wrappedCommand = wrappedCommand + argvArray[i]; 
    }
    bash(wrappedCommand);
    done.resolve();
    return done.promise
}