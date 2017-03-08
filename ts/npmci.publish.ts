import * as plugins from './npmci.plugins'
import { prepare } from './npmci.prepare'
import { bash } from './npmci.bash'
import * as NpmciEnv from './npmci.env'
import * as NpmciBuildDocker from './npmci.build.docker'

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
  await prepare('npm')
    .then(async function () {
      await bash('npm publish')
      plugins.beautylog.ok('Done!')
    })
}

/**
 * tries to pubish current cwd to Docker registry
 */
let publishDocker = async () => {
  return await NpmciBuildDocker.readDockerfiles()
    .then(NpmciBuildDocker.pullDockerfileImages)
    .then(NpmciBuildDocker.pushDockerfiles)
    .then(dockerfileArray => {
      return dockerfileArray
    })
}
