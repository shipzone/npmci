import * as plugins from './mod.plugins'
import { bash } from '../npmci.bash'
import * as NpmciEnv from '../npmci.env'

import * as npmciMods from '../npmci.mods'

// import interfaces
import { Dockerfile } from '../mod_docker/index'


/**
 * type of supported services
 */
export type TPubService = 'npm' | 'docker'

/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to 
 */
export let publish = async (pubServiceArg: TPubService = 'npm') => {
  switch (pubServiceArg) {
    case 'npm':
      return await publishNpm()
    case 'docker':
      return await publishDocker()
  }
}

/**
 * tries to publish current cwd to NPM registry
 */
let publishNpm = async () => {
  let modPrepare = await npmciMods.modPrepare.load()
  await modPrepare.prepare('npm')
  await bash('npm publish')
  plugins.beautylog.ok('Done!')
}

/**
 * tries to publish current cwd to Docker registry
 */
let publishDocker = async () => {
  let modDocker = await npmciMods.modDocker.load()
  return await modDocker.readDockerfiles()
    .then(modDocker.pullDockerfileImages)
    .then(modDocker.pushDockerfiles)
    .then(dockerfileArray => {
      return dockerfileArray
    })
}
