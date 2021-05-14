import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import { bash } from '../npmci.bash';

export interface IDockerRegistryConstructorOptions {
  registryUrl: string;
  username: string;
  password: string;
}

export class DockerRegistry {
  public registryUrl: string;
  public username: string;
  public password: string;
  constructor(optionsArg: IDockerRegistryConstructorOptions) {
    this.registryUrl = optionsArg.registryUrl;
    this.username = optionsArg.username;
    this.password = optionsArg.password;
    logger.log('info', `created DockerRegistry for ${this.registryUrl}`);
  }

  public static fromEnvString(envString: string): DockerRegistry {
    const dockerRegexResultArray = envString.split('|');
    if (dockerRegexResultArray.length !== 3) {
      logger.log('error', 'malformed docker env var...');
      process.exit(1);
      return;
    }
    const registryUrl = dockerRegexResultArray[0];
    const username = dockerRegexResultArray[1];
    const password = dockerRegexResultArray[2];
    return new DockerRegistry({
      registryUrl: registryUrl,
      username: username,
      password: password,
    });
  }

  public async login() {
    if (this.registryUrl === 'docker.io') {
      await bash(`docker login -u ${this.username} -p ${this.password}`);
      logger.log('info', 'Logged in to standard docker hub');
    } else {
      await bash(`docker login -u ${this.username} -p ${this.password} ${this.registryUrl}`);
    }
    logger.log('ok', `docker authenticated for ${this.registryUrl}!`);
  }
}
