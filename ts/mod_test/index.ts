import * as plugins from './mod.plugins'
import { bash, yarnAvailable } from '../npmci.bash'
import * as env from '../npmci.env'
import * as npmciMods from '../npmci.mods'

// interfaces
import { Dockerfile } from '../mod_docker/index'

let npmDependencies = async (): Promise<void> => {
  plugins.beautylog.info('now installing dependencies:')
  if (await yarnAvailable.promise) {
    await bash('yarn upgrade')
  } else {
    await bash('npm install')
  }
}

let npmTest = async (): Promise<void> => {
  plugins.beautylog.info('now starting tests:')
  await bash('npm test')
}

let testDocker = async (): Promise<Dockerfile[]> => {
  let modDocker = await npmciMods.modDocker.load()
  return await modDocker.readDockerfiles()
    .then(modDocker.pullDockerfileImages)
    .then(modDocker.testDockerfiles)
}

/**
 * the main test function
 * @param versionArg
 */
export let test = async (versionArg): Promise<void> => {
  if (versionArg === 'docker') {
    await testDocker()
  } else {
    let modInstall = await npmciMods.modInstall.load()
    await modInstall.install(versionArg)
      .then(npmDependencies)
      .then(npmTest)
  }
}

