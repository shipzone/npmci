import * as plugins from './mod.plugins'
import { bash } from '../npmci.bash'
import * as env from '../npmci.env'
import * as npmciMods from '../npmci.mods'

// types

/**
 * defines possible prepare services
 */
export type TPrepService = 'npm' | 'docker' | 'docker-gitlab' | 'ssh'

/**
 * authenticates npm with token from env var
 */
let npm = async () => {
  let npmrcPrefix: string = '//registry.npmjs.org/:_authToken='
  let npmToken: string = process.env.NPMCI_TOKEN_NPM
  let npmrcFileString: string = npmrcPrefix + npmToken
  if (npmToken) {
    plugins.beautylog.info('found access token')
  } else {
    plugins.beautylog.error('no access token found! Exiting!')
    process.exit(1)
  }
  plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc')
  return
}

/**
 * logs in docker
 */
let docker = async () => {
  env.setDockerRegistry('docker.io')
  let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/
  if (!process.env.NPMCI_LOGIN_DOCKER) {
    plugins.beautylog.error('You have to specify Login Data to the Docker Registry')
    process.exit(1)
  }
  plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com') // Always also login to GitLab Registry
  let dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER)
  let username = dockerRegexResultArray[1]
  let password = dockerRegexResultArray[2]
  await bash('docker login -u ' + username + ' -p ' + password)
  return
}

/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = async () => {
  env.setDockerRegistry('registry.gitlab.com')
  plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com')
  return
}

/**
 * prepare ssh
 */
let ssh = async () => {
  let sshModule = await npmciMods.modSsh.load()
  await sshModule.ssh()
}

/**
 * the main exported prepare function
 * @param servieArg describes the service to prepare
 */
export let prepare = async (serviceArg: TPrepService) => {
  switch (serviceArg) {
    case 'npm':
      return await npm()
    case 'docker':
      return await docker()
    case 'docker-gitlab':
      return await dockerGitlab()
    case 'ssh':
      return await ssh()
    default:
      break
  }
}
