import * as plugins from './mod.plugins'
let sshInstance: plugins.smartssh.SshInstance

export let handleCli = async (argvArg) => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[1]
    switch (action) {
      case 'prepare':
        await prepare()
        break
      default:
        plugins.beautylog.error(`action >>${action}<< not supported`)
    }
  }
}

/**
 * checks if not undefined
 */
let notUndefined = (stringArg: string) => {
  return (stringArg && stringArg !== 'undefined' && stringArg !== '##')
}

/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
export let prepare = async () => {
  sshInstance = new plugins.smartssh.SshInstance() // init ssh instance
  plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_SSHKEY_*', evaluateSshEnv)
  if (!process.env.NPMTS_TEST) {
    sshInstance.writeToDisk()
  } else {
    plugins.beautylog.log('In test mode, so not storing SSH keys to disk!')
  }
}

/**
 * gets called for each found SSH ENV Var and deploys it
 */
let evaluateSshEnv = async (sshkeyEnvVarArg: string) => {
  let sshEnvArray = sshkeyEnvVarArg.split('|')
  let sshKey = new plugins.smartssh.SshKey()
  plugins.beautylog.info('Found SSH identity for ' + sshEnvArray[1])
  if (notUndefined(sshEnvArray[0])) {
    plugins.beautylog.log('---> host defined!')
    sshKey.host = sshEnvArray[0]
  }
  if (notUndefined(sshEnvArray[1])) {
    plugins.beautylog.log('---> privKey defined!')
    sshKey.privKeyBase64 = sshEnvArray[1]
  }
  if (notUndefined(sshEnvArray[2])) {
    plugins.beautylog.log('---> pubKey defined!')
    sshKey.pubKeyBase64 = sshEnvArray[2]
  }

  sshInstance.addKey(sshKey)
  return
}
