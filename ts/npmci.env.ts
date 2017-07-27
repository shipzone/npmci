import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
import { GitRepo } from 'smartstring'
import { Dockerfile } from './mod_docker/index'

/**
 * a info instance about the git respoitory at cwd :)
 */
export let repo: GitRepo
if (process.env.CI_REPOSITORY_URL) {
  repo = new GitRepo(process.env.CI_REPOSITORY_URL)
}

/**
 * the build stage
 */
export let buildStage: string = process.env.CI_BUILD_STAGE

// handling config between commands
export let dockerRegistry: string // will be set by npmci.prepare
export let setDockerRegistry = (dockerRegistryArg: string) => {
  dockerRegistry = dockerRegistryArg
}
export let dockerFilesBuilt: Dockerfile[] = []
export let dockerFiles: Dockerfile[] = []

/**
 * the config
 */
export let config = {
  dockerRegistry: undefined, // this will be set later on store
  dockerFilesBuilt: dockerFilesBuilt,
  dockerFiles: dockerFiles,
  project: undefined
}

/**
 * the configuration store
 */
export let configStore = async () => {
  config.dockerRegistry = dockerRegistry
  plugins.smartfile.memory.toFsSync(
    JSON.stringify(config),
    paths.NpmciPackageConfig
  )
}

/**
 * load the config in case a previous run has stored it
 */
let configLoad = () => {
  // internal config to transfer information in between npmci shell calls
  try {
    plugins.lodash.assign(config, plugins.smartfile.fs.toObjectSync(paths.NpmciPackageConfig, 'json'))
  } catch (err) {
    configStore()
    plugins.beautylog.log('config initialized!')
  }

  // project config
  try {
    if (!config.project) {
      config.project = plugins.smartfile.fs.toObjectSync(paths.NpmciProjectDir, 'npmci.json')
      plugins.beautylog.ok('project config found!')
    }
  } catch (err) {
    config.project = {}
    plugins.beautylog.log('no project config found, so proceeding with default behaviour!')
  }

  config.dockerRegistry ? dockerRegistry = config.dockerRegistry : void (0)
  config.dockerFilesBuilt ? dockerFilesBuilt = config.dockerFilesBuilt : void (0)
}
configLoad()
