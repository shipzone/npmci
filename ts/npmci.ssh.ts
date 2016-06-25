import "typings-global";
import * as plugins from "./npmci.plugins";

let sshRegex = /^(.*)\|(.*)\|(.*)/
let sshInstance:plugins.smartssh.SshInstance;

export let ssh = () => {
    let done = plugins.q.defer();
    sshInstance = new plugins.smartssh.SshInstance();
    plugins.smartparam.forEachMinimatch(process.env,"NPMCI_SSHKEY_*",evaluateSshEnv);
    sshInstance.writeToDisk();
    done.resolve();
    return done.promise;
};

let evaluateSshEnv = (sshkeyEnvVarArg) => {
    let resultArray = sshRegex.exec(sshkeyEnvVarArg);
    let sshKey = new plugins.smartssh.SshKey();
    
    if(notUndefined(resultArray[1])) sshKey.host = resultArray[1];
    if(notUndefined(resultArray[2])) sshKey.privKeyBase64 = resultArray[2];
    if(notUndefined(resultArray[3])) sshKey.pubKeyBase64 = resultArray[3];
    
    sshInstance.addKey(sshKey);
};

let notUndefined = (stringArg:string) => {
    return (stringArg && stringArg != "undefined" && stringArg != "##")
}