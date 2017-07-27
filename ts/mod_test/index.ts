import * as plugins from './mod.plugins'
import { bash, yarnAvailable } from '../npmci.bash'
import * as env from '../npmci.env'
import * as npmciMods from '../npmci.mods'

// interfaces
import { Dockerfile } from '../mod_docker/index'

let npmDependencies = async (): Promise<void> => {
  plugins.beautylog.info('now installing dependencies:')
  if (await yarnAvailable.promise) {
    await bash('yarn install')
  } else {
    await bash('npm install')
  }
}

let npmTest = async (): Promise<void> => {
  plugins.beautylog.info('now starting tests:')
  await bash('npm test')
}

let testDocker = async (argvArg): Promise<Dockerfile[]> => {
  let modDocker = await npmciMods.modDocker.load()
  return await modDocker.readDockerfiles(argvArg)
    .then(modDocker.pullDockerfileImages)
    .then(modDocker.testDockerfiles)
}

/**
 * the main test function
 * @param versionArg
 */
export let test = async (argvArg): Promise<void> => {
  let whatToTest = argvArg._[1]
  if (whatToTest === 'docker') {
    await testDocker(argvArg)
  } else {
    let modInstall = await npmciMods.modInstall.load()
    await modInstall.install(whatToTest)
      .then(npmDependencies)
      .then(npmTest)
  }
}

