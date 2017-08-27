import * as plugins from './mod.plugins'

let npmciCflare = new plugins.cflare.CflareAccount()

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[1]
    switch (action) {
      default:
        plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`)
  }
}

export let purge = async (argvArg) => {
  npmciCflare.auth({
    email: '',
    key: ''
  })
  npmciCflare.purgeZone(argvArg._[1])
}
