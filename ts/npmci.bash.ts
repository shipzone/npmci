import "typings-global";
import * as plugins from "./npmci.plugins";


let nvmSourceString:string = "";
export let nvmAvailable:boolean = false;
let checkNvm = () => {
    let nvmExecCode = plugins.shelljs.exec(`bash -c "source /usr/local/nvm/nvm.sh"`).code;
    if(nvmExecCode === 0){
        nvmSourceString = `source /usr/local/nvm/nvm.sh && `
        nvmAvailable = true;
    }
};
checkNvm();

export let bash = (commandArg:string,retryArg = 2,bareArg = false) => {
    let exitCode:number;
    let stdOut:string;
    let execResult;
    if(!process.env.NPMTS_TEST){ // NPMTS_TEST is used during testing
        for (let i = 0; i <= retryArg; i++){
            if(!bareArg){
                execResult = plugins.shelljs.exec(
                    `bash -c "${nvmSourceString} ${commandArg}"`
                );
            } else {
                execResult = plugins.shelljs.exec(commandArg);
            }
            exitCode = execResult.code;
            stdOut = execResult.stdout;
            if(exitCode !== 0 && i == retryArg){
                process.exit(1);
            } else if(exitCode == 0){
                i = retryArg + 1; // if everything works out ok retrials are not wanted
            } else {
                plugins.beautylog.warn("Something went wrong! Exit Code: " + exitCode.toString());
                plugins.beautylog.info("Retry " + (i + 1).toString() + " of " +  retryArg.toString());
            }
        }
    } else {
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue)
    }
    return stdOut;
}

export let bashBare = (commandArg,retryArg = 2) => {
    return bash(commandArg,retryArg,true);
}