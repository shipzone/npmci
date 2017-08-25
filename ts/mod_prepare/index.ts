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
  env.setDockerRegistry('docker.io') // TODO: checkup why we set this here

  // handle registries
  plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', async (envString) => {
    let dockerRegexResultArray = process.env.NPMCI_LOGIN_DOCKER.split('|')
    if (dockerRegexResultArray.length !== 3) {
      plugins.beautylog.error('malformed docker env var...')
      process.exit(1)
      return
    }
    let registry = dockerRegexResultArray[0]
    let username = dockerRegexResultArray[1]
    let password = dockerRegexResultArray[2]
    if (registry === 'docker.io') {
      await bash('docker login -u ' + username + ' -p ' + password)
    } else {
      await bash(`docker login -u ${username} -p ${password} ${registry}`)
    }
    plugins.beautylog.success(`docker authenticated for ${registry}!`)
  })

  // Always login to GitLab Registry
  await dockerGitlab()
  return
}

/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = async () => {
  // env.setDockerRegistry('registry.gitlab.com')
  await bash(`docker login -u gitlab-ci-token -p ${process.env.CI_BUILD_TOKEN} registry.gitlab.com`)
  plugins.beautylog.success(`docker authenticated for registry.gitlab.com!`)
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
