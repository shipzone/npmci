import * as plugins from './mod.plugins'

let npmciCflare = new plugins.cflare.CflareAccount()

export let purge = async (argvArg) => {
  npmciCflare.auth({
    email: '',
    key: ''
  })
  npmciCflare.purgeZone(argvArg._[1])
}
