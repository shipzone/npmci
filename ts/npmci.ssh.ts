import "typings-global";
import * as plugins from "./npmci.plugins";

export let ssh = () => {
    let sshInstance = new plugins.smartssh.SshInstance();
    plugins.smartparam.forEachMinimatch(process.env,"NPMCI_SSHKEY_*",evaluateSshkey);
};

export let evaluateSshkey = () => {
    
};