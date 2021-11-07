import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import * as paths from '../npmci.paths';
import { bash } from '../npmci.bash';

// classes
import { Npmci } from '../npmci.classes.npmci';
import { Dockerfile } from './mod.classes.dockerfile';
import { DockerRegistry } from './mod.classes.dockerregistry';
import { RegistryStorage } from './mod.classes.registrystorage';

export class NpmciDockerManager {
  public npmciRef: Npmci;
  public npmciRegistryStorage = new RegistryStorage();

  constructor(npmciArg: Npmci) {
    this.npmciRef = npmciArg;
  }

  /**
   * handle cli input
   * @param argvArg
   */
  public handleCli = async (argvArg: any) => {
    if (argvArg._.length >= 2) {
      const action: string = argvArg._[1];
      switch (action) {
        case 'build':
          await this.build();
          break;
        case 'login':
        case 'prepare':
          await this.login();
          break;
        case 'test':
          await this.test();
          break;
        case 'push':
          await this.push(argvArg);
          break;
        case 'pull':
          await this.pull(argvArg);
          break;
        default:
          logger.log('error', `>>npmci docker ...<< action >>${action}<< not supported`);
      }
    } else {
      logger.log(
        'info',
        `>>npmci docker ...<< cli arguments invalid... Please read the documentation.`
      );
    }
  };

  /**
   * builds a cwd of Dockerfiles by triggering a promisechain
   */
  public build = async () => {
    await this.prepare();
    logger.log('info', 'now building Dockerfiles...');
    await Dockerfile.readDockerfiles(this)
      .then(Dockerfile.sortDockerfiles)
      .then(Dockerfile.mapDockerfiles)
      .then(Dockerfile.buildDockerfiles);
  };

  /**
   * login to the DockerRegistries
   */
  public login = async () => {
    await this.prepare();
    await this.npmciRegistryStorage.loginAll();
  };

  /**
   * logs in docker
   */
  public prepare = async () => {
    // Always login to GitLab Registry
    if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
      logger.log('error', 'No registry token specified by gitlab!');
      process.exit(1);
    }
    this.npmciRegistryStorage.addRegistry(
      new DockerRegistry({
        registryUrl: 'registry.gitlab.com',
        username: 'gitlab-ci-token',
        password: process.env.CI_BUILD_TOKEN,
      })
    );

    // handle registries
    await plugins.smartparam.forEachMinimatch(
      process.env,
      'NPMCI_LOGIN_DOCKER*',
      async (envString: string) => {
        this.npmciRegistryStorage.addRegistry(DockerRegistry.fromEnvString(envString));
      }
    );
    return;
  };

  /**
   * pushes an image towards a registry
   * @param argvArg
   */
  public push = async (argvArg: any) => {
    await this.prepare();
    let dockerRegistryUrls: string[] = [];

    // lets parse the input of cli and npmextra
    if (argvArg._.length >= 3 && argvArg._[2] !== 'npmextra') {
      dockerRegistryUrls.push(argvArg._[2]);
    } else {
      if (this.npmciRef.npmciConfig.getConfig().dockerRegistries.length === 0) {
        logger.log(
          'warn',
          `There are no docker registries listed in npmextra.json! This is strange!`
        );
      }
      dockerRegistryUrls = dockerRegistryUrls.concat(
        this.npmciRef.npmciConfig.getConfig().dockerRegistries
      );
    }

    // lets determine the suffix
    let suffix = null;
    if (argvArg._.length >= 4) {
      suffix = argvArg._[3];
    }

    // lets push to the registries
    for (const dockerRegistryUrl of dockerRegistryUrls) {
      const dockerfileArray = await Dockerfile.readDockerfiles(this)
        .then(Dockerfile.sortDockerfiles)
        .then(Dockerfile.mapDockerfiles);
      const dockerRegistryToPushTo = await this.npmciRegistryStorage.getRegistryByUrl(
        dockerRegistryUrl
      );
      if (!dockerRegistryToPushTo) {
        logger.log(
          'error',
          `Cannot push to registry ${dockerRegistryUrl}, because it was not found in the authenticated registry list.`
        );
        process.exit(1);
      }
      for (const dockerfile of dockerfileArray) {
        await dockerfile.push(dockerRegistryToPushTo, suffix);
      }
    }
  };

  /**
   * pulls an image
   */
  public pull = async (argvArg: any) => {
    await this.prepare();
    const registryUrlArg = argvArg._[2];
    let suffix = null;
    if (argvArg._.length >= 4) {
      suffix = argvArg._[3];
    }
    const localDockerRegistry = await this.npmciRegistryStorage.getRegistryByUrl(registryUrlArg);
    const dockerfileArray = await Dockerfile.readDockerfiles(this)
      .then(Dockerfile.sortDockerfiles)
      .then(Dockerfile.mapDockerfiles);
    for (const dockerfile of dockerfileArray) {
      await dockerfile.pull(localDockerRegistry, suffix);
    }
  };

  /**
   * tests docker files
   */
  public test = async () => {
    await this.prepare();
    return await Dockerfile.readDockerfiles(this).then(Dockerfile.testDockerfiles);
  };
}
