import "typings-global";
import * as plugins from "./npmci.plugins";
export let bash = (commandArg:string,retryArg = 2) => {
    if(!process.env.NPMTS_TEST){
        for (let i = 0; i <= retryArg; i++){
            let exitCode = plugins.shelljs.exec(
                "bash -c \"source /usr/local/nvm/nvm.sh &&" +
                commandArg +
                "\""
            ).code;
            if(exitCode !== 0 && i == retryArg){
                process.exit(1);
            } else if(exitCode == 0){
                i = retryArg + 1;
            }
        }
    } else {
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue)
    }
}

export let bashBare = (commandArg,retryArg = 3) => {
    if (!process.env.NPMTS_TEST){
        for(let i = 0; i <= retryArg; i++){
            let exitCode = plugins.shelljs.exec(commandArg).code;
            if(exitCode !== 0 && i == retryArg){
                process.exit(1);
            } else if(exitCode == 0){
                i = retryArg + 1;
            }
        }
    } else {
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue)
    }
}