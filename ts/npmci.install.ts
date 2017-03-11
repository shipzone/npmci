import * as plugins from './npmci.plugins'
import * as configModule from './npmci.config'
import { bash, bashNoError } from './npmci.bash'
import { nvmAvailable } from './npmci.bash'

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
    version = '6'
  } else if (versionArg === 'legacy') {
    version = '6'
  } else {
    version = versionArg
  };
  if (await nvmAvailable.promise) {
    await bash(`nvm install ${version} && nvm alias default ${version}`)
    plugins.beautylog.success(`Node version ${version} successfully installed!`)
  } else {
    plugins.beautylog.warn('Nvm not in path so staying at installed node version!')
  };
  await bash('node -v')
  await bash('npm -v')
  // lets look for further config
  configModule.getConfig()
    .then(async configArg => {
      plugins.beautylog.log('Now checking for needed global npm tools...')
      for (let npmTool of configArg.globalNpmTools) {
        plugins.beautylog.info(`Checking for global "${npmTool}"`)
        let whichOutput: string = await bashNoError(`which ${npmTool}`)
        let toolAvailable: boolean = !((/not\sfound/.test(whichOutput)) || whichOutput === '')
        if (toolAvailable) {
          plugins.beautylog.log(`Tool ${npmTool} is available`)
        } else {
          plugins.beautylog.info(`globally installing ${npmTool} from npm`)
          await bash(`npm install ${npmTool} -q -g`)
        }
      }
      plugins.beautylog.success('all global npm tools specified in npmextra.json are now available!')
    })
}
