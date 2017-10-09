import * as plugins from '../npmci.plugins'
import * as npmciConfig from '../npmci.config'
import {
  bash,
  bashNoError,
  nvmAvailable,
  yarnAvailable
} from '../npmci.bash'

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  if (argvArg._.length >= 3) {
    let action: string = argvArg._[1]
    switch (action) {
      case 'install':
        await install(argvArg._[2])
        break
      default:
        plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`)
        process.exit(1)
    }
  } else {
    plugins.beautylog.error(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`)
    process.exit(1)
  }

}

/**
 * Install a specific version of node
 * @param versionArg
 */
export let install = async (versionArg) => {
  plugins.beautylog.log(`now installing node version ${versionArg}`)
  let version: string
  if (versionArg === 'stable') {
    version = 'stable'
  } else if (versionArg === 'lts') {
    version = '8'
  } else if (versionArg === 'legacy') {
    version = '8'
  } else {
    version = versionArg
  }
  if (await nvmAvailable.promise) {
    await bash(`nvm install ${version} && nvm alias default ${version}`)
    plugins.beautylog.success(`Node version ${version} successfully installed!`)
  } else {
    plugins.beautylog.warn('Nvm not in path so staying at installed node version!')
  }
  await bash('node -v')
  await bash('npm -v')
  // lets look for further config
  await npmciConfig.getConfig()
    .then(async configArg => {
      plugins.beautylog.log('Now checking for needed global npm tools...')
      for (let npmTool of configArg.npmGlobalTools) {
        plugins.beautylog.info(`Checking for global "${npmTool}"`)
        let whichOutput: string = await bashNoError(`which ${npmTool}`)
        let toolAvailable: boolean = !((/not\sfound/.test(whichOutput)) || whichOutput === '')
        if (toolAvailable) {
          plugins.beautylog.log(`Tool ${npmTool} is available`)
        } else {
          plugins.beautylog.info(`globally installing ${npmTool} from npm`)
          if (await yarnAvailable.promise) {
            await bash(`yarn global add ${npmTool}`)
          } else {
            await bash(`npm install ${npmTool} -q -g`)
          }
        }
      }
      plugins.beautylog.success('all global npm tools specified in npmextra.json are now available!')
    })
}
