import "typings-global";
import * as plugins from "./npmci.plugins";

let sshRegex = /^(.*)\|?(.*)\|?(.*)/
let sshInstance:plugins.smartssh.SshInstance;

export let ssh = () => {
    sshInstance = new plugins.smartssh.SshInstance();
    plugins.smartparam.forEachMinimatch(process.env,"NPMCI_SSHKEY_*",evaluateSshkey);
    sshInstance.writeToDisk();
};

export let evaluateSshkey = (sshkeyEnvVarArg) => {
    let resultArray = sshRegex.exec(sshkeyEnvVarArg);
    let sshKey = new plugins.smartssh.SshKey();
    
    if(resultArray[1] && resultArray[1] != "undefined") sshKey.privKeyBase64 = resultArray[1];
    let publicKey:string;
    if(resultArray[2] && resultArray[2] != "undefined") sshKey.pubKeyBase64 = resultArray[2];
    let host:string;
    if(resultArray[3] && resultArray[3] != "undefined") sshKey.host = resultArray[1];
    
    sshInstance.addKey(sshKey);
};