import * as plugins from './mod.plugins'
import * as paths from '../npmci.paths'
import * as NpmciEnv from '../npmci.env'
import { bash } from '../npmci.bash'

import * as helpers from './mod.helpers'

// classes
import { Dockerfile } from './mod.classes.dockerfile'
import { DockerRegistry } from './mod.classes.dockerregistry'
import { RegistryStorage } from './mod.classes.registrystorage'

// instances
let npmciRegistryStorage = new RegistryStorage()

export {
  Dockerfile,
  helpers
}

export let modArgvArg // will be set through the build command

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  modArgvArg = argvArg
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[ 1 ]
    switch (action) {
      case 'build':
        await build()
        break
      case 'prepare':
        await prepare()
        break
      case 'test':
        await test()
        break
      case 'push':
        await push(argvArg)
        break
      case 'pull':
        await pull(argvArg)
        break
      default:
        plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`)
  }
}

/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export let build = async () => {
  plugins.beautylog.log('now building Dockerfiles...')
  await helpers.readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
    .then(helpers.buildDockerfiles)
}

/**
 * logs in docker
 */
export let prepare = async () => {
  NpmciEnv.setDockerRegistry('docker.io') // TODO: checkup why we set this here

  // Always login to GitLab Registry
  if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
    plugins.beautylog.error('No registry token specified by gitlab!')
    return
  }
  npmciRegistryStorage.addRegistry(new DockerRegistry({
    registryUrl: 'registry.gitlab.com',
    username: 'gitlab-ci-token',
    password: process.env.CI_BUILD_TOKEN
  }))

  // handle registries
  plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', async (envString) => {
    npmciRegistryStorage.addRegistry(
      DockerRegistry.fromEnvString(envString)
    )
    await npmciRegistryStorage.loginAll()
  })
  return
}

export let push = async (argvArg) => {
  let registryUrlArg = argvArg._[ 2 ]
  let suffix = null
  if (argvArg._.length >= 4) {
    suffix = argvArg._[ 3 ]
  }
  let dockerfileArray = await helpers.readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
  let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg)
  for (let dockerfile of dockerfileArray) {
    dockerfile.push(localDockerRegistry, suffix)
  }
}

export let pull = async (argvArg) => {
  let registryUrlArg = argvArg._[ 2 ]
  let suffix = null
  if (argvArg._.length >= 4) {
    suffix = argvArg._[ 3 ]
  }
  let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg)
  let dockerfileArray = await helpers.readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
  for (let dockerfile of dockerfileArray) {
    dockerfile.pull(localDockerRegistry, suffix)
  }
}

export let test = async () => {
  return await helpers.readDockerfiles()
    .then(helpers.testDockerfiles)
}
