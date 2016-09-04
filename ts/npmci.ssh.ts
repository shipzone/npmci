import "typings-global";
import * as plugins from "./npmci.plugins";

let sshRegex = /^(.*)\|(.*)\|(.*)/
let sshInstance:plugins.smartssh.SshInstance;

/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
export let ssh = () => {
    let done = plugins.q.defer();
    sshInstance = new plugins.smartssh.SshInstance(); // init ssh instance
    plugins.smartparam.forEachMinimatch(process.env,"NPMCI_SSHKEY_*",evaluateSshEnv);
    if(!process.env.NPMTS_TEST){
        sshInstance.writeToDisk();
    } else {
        plugins.beautylog.log("In test mode, so not storing SSH keys to disk!");
    };
    done.resolve();
    return done.promise;
};

/**
 * gets called for each found SSH ENV Var and deploys it 
 */
let evaluateSshEnv = (sshkeyEnvVarArg) => {
    let resultArray = sshRegex.exec(sshkeyEnvVarArg);
    let sshKey = new plugins.smartssh.SshKey();
    plugins.beautylog.info("Found SSH identity for " + resultArray[1]);
    if(notUndefined(resultArray[1])){
        plugins.beautylog.log("---> host defined!")
        sshKey.host = resultArray[1];
    }
    if(notUndefined(resultArray[2])){
        plugins.beautylog.log("---> privKey defined!")
        sshKey.privKeyBase64 = resultArray[2];
    };
    if(notUndefined(resultArray[3])){
        "---> pubKey defined!"
        sshKey.pubKeyBase64 = resultArray[3];
    };
    
    sshInstance.addKey(sshKey);
};

/**
 * checks if not undefined
 */
let notUndefined = (stringArg:string) => {
    return (stringArg && stringArg != "undefined" && stringArg != "##");
}