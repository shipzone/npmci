import * as plugins from './mod.plugins'
import { bash } from '../npmci.bash'

export interface IDockerRegistryConstructorOptions {
  registryUrl: string,
  username: string,
  password: string
}

export class DockerRegistry {
  registryUrl: string
  username: string
  password: string
  constructor (optionsArg: IDockerRegistryConstructorOptions) {
    this.registryUrl = optionsArg.registryUrl
    this.username = optionsArg.username
    this.password = optionsArg.password
  }

  static fromEnvString (envString: string): DockerRegistry {
    let dockerRegexResultArray = envString.split('|')
    if (dockerRegexResultArray.length !== 3) {
      plugins.beautylog.error('malformed docker env var...')
      process.exit(1)
      return
    }
    let registryUrl = dockerRegexResultArray[0]
    let username = dockerRegexResultArray[1]
    let password = dockerRegexResultArray[2]
    return new DockerRegistry({
      registryUrl: registryUrl,
      username: username,
      password: password
    })
  }

  async login () {
    if (this.registryUrl === 'docker.io') {
      await bash(`docker login -u ${this.username} -p ${this.password}`)
      plugins.beautylog.info('Logged in to standard docker hub')
    } else {
      await bash(`docker login -u ${this.username} -p ${this.password} ${this.registryUrl}`)
    }
    plugins.beautylog.success(`docker authenticated for ${this.registryUrl}!`)
  }
}
