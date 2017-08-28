import * as plugins from './mod.plugins'

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[ 1 ]
    switch (action) {
      case 'mirror':
        await mirror()
        break
      default:
        plugins.beautylog.error(`>>npmci git ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci git ...<< cli arguments invalid... Please read the documentation.`)
  }
}

export let mirror = async () => {

}
