import "typings-global";
import * as plugins from "./npmci.plugins";
export let bash = (commandArg) => {
    if(!process.env.NPMTS_TEST){
        let exitCode = plugins.shelljs.exec(
            "bash -c \"source /usr/local/nvm/nvm.sh &&" +
            commandArg +
            "\""
        ).code;
        if(exitCode !== 0){
            process.exit(1);
        }
    } else {
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue)
    }
}

export let bashBare = (commandArg) => {
    if (!process.env.NPMTS_TEST){
        let exitCode = plugins.shelljs.exec(commandArg).code;
        if(exitCode !== 0){
            process.exit(1);
        }
    } else {
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue)
    }
}