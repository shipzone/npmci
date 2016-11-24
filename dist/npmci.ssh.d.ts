/// <reference types="q" />
import * as plugins from './npmci.plugins';
/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
export declare let ssh: () => plugins.q.Promise<{}>;
