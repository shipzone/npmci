import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
let sshInstance: plugins.smartssh.SshInstance;

export let handleCli = async (argvArg: any) => {
  if (argvArg._.length >= 2) {
    const action: string = argvArg._[1];
    switch (action) {
      case 'prepare':
        await prepare();
        break;
      default:
        logger.log('error', `action >>${action}<< not supported`);
        process.exit(1);
    }
  } else {
    logger.log('error', `>>npmci ssh ...<< please specify an action!`);
    process.exit(1);
  }
};

/**
 * checks if not undefined
 */
const notUndefined = (stringArg: string) => {
  return stringArg && stringArg !== 'undefined' && stringArg !== '##';
};

/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
export let prepare = async () => {
  sshInstance = new plugins.smartssh.SshInstance(); // init ssh instance
  plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_SSHKEY_*', evaluateSshEnv);
  if (!process.env.NPMTS_TEST) {
    sshInstance.writeToDisk();
  } else {
    logger.log('info', 'In test mode, so not storing SSH keys to disk!');
  }
};

/**
 * gets called for each found SSH ENV Var and deploys it
 */
const evaluateSshEnv = async (sshkeyEnvVarArg: string) => {
  const sshEnvArray = sshkeyEnvVarArg.split('|');
  const sshKey = new plugins.smartssh.SshKey();
  logger.log('info', 'Found SSH identity for ' + sshEnvArray[1]);
  if (notUndefined(sshEnvArray[0])) {
    logger.log('info', '---> host defined!');
    sshKey.host = sshEnvArray[0];
  }
  if (notUndefined(sshEnvArray[1])) {
    logger.log('info', '---> privKey defined!');
    sshKey.privKeyBase64 = sshEnvArray[1];
  }
  if (notUndefined(sshEnvArray[2])) {
    logger.log('info', '---> pubKey defined!');
    sshKey.pubKeyBase64 = sshEnvArray[2];
  }

  sshInstance.addKey(sshKey);
  return;
};
