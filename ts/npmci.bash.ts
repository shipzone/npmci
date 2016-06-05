import "typings-global";
import * as plugins from "./npmci.plugins";
export let bash = (commandArg) => {
    let exitCode = plugins.shelljs.exec(
        "bash -c \"source /usr/local/nvm/nvm.sh &&" +
        commandArg +
        "\""
    ).code;
    if(exitCode !== 0){
        process.exit(1);
    }
}

export let bashBare = () => {
    
}