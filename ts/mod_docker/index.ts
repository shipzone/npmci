import * as plugins from './mod.plugins'
import * as paths from '../npmci.paths'
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
      case 'login':
        await login()
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
        plugins.beautylog.error(`>>npmci docker ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci docker ...<< cli arguments invalid... Please read the documentation.`)
  }
}

/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export let build = async () => {
  await prepare()
  plugins.beautylog.log('now building Dockerfiles...')
  await helpers.readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
    .then(helpers.buildDockerfiles)
}

/**
 * login to the DockerRegistries
 */
export let login = async () => {
  await prepare()
  await npmciRegistryStorage.loginAll()
}

/**
 * logs in docker
 */
export let prepare = async () => {
  // Always login to GitLab Registry
  if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
    plugins.beautylog.error('No registry token specified by gitlab!')
    process.exit(1)
  }
  npmciRegistryStorage.addRegistry(new DockerRegistry({
    registryUrl: 'registry.gitlab.com',
    username: 'gitlab-ci-token',
    password: process.env.CI_BUILD_TOKEN
  }))

  // handle registries
  await plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', async (envString) => {
    npmciRegistryStorage.addRegistry(
      DockerRegistry.fromEnvString(envString)
    )
  })
  return
}

export let push = async (argvArg) => {
  await prepare()
  let registryUrlArg = argvArg._[ 2 ]
  let suffix = null
  if (argvArg._.length >= 4) {
    suffix = argvArg._[ 3 ]
  }
  let dockerfileArray = await helpers.readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
  let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg)
  if (!localDockerRegistry) {
    plugins.beautylog.error(`Cannot push to registry ${registryUrlArg}, because it was not found in the authenticated registry list.`)
    process.exit(1)
  }
  for (let dockerfile of dockerfileArray) {
    await dockerfile.push(localDockerRegistry, suffix)
  }
}

export let pull = async (argvArg) => {
  await prepare()
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
  await prepare()
  return await helpers.readDockerfiles()
    .then(helpers.testDockerfiles)
}
