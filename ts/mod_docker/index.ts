import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import * as paths from '../npmci.paths';
import { bash } from '../npmci.bash';

import * as helpers from './mod.helpers';

// classes
import { Dockerfile } from './mod.classes.dockerfile';
import { DockerRegistry } from './mod.classes.dockerregistry';
import { RegistryStorage } from './mod.classes.registrystorage';

// config
import { configObject } from '../npmci.config';

// instances
const npmciRegistryStorage = new RegistryStorage();

export { Dockerfile, helpers };

export let modArgvArg; // will be set through the build command

/**
 * handle cli input
 * @param argvArg
 */
export const handleCli = async argvArg => {
  modArgvArg = argvArg;
  if (argvArg._.length >= 2) {
    const action: string = argvArg._[1];
    switch (action) {
      case 'build':
        await build();
        break;
      case 'login':
      case 'prepare':
        await login();
        break;
      case 'test':
        await test();
        break;
      case 'push':
        await push(argvArg);
        break;
      case 'pull':
        await pull(argvArg);
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
export const build = async () => {
  await prepare();
  logger.log('info', 'now building Dockerfiles...');
  await helpers
    .readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles)
    .then(helpers.buildDockerfiles);
};

/**
 * login to the DockerRegistries
 */
export const login = async () => {
  await prepare();
  await npmciRegistryStorage.loginAll();
};

/**
 * logs in docker
 */
export const prepare = async () => {
  // Always login to GitLab Registry
  if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
    logger.log('error', 'No registry token specified by gitlab!');
    process.exit(1);
  }
  npmciRegistryStorage.addRegistry(
    new DockerRegistry({
      registryUrl: 'registry.gitlab.com',
      username: 'gitlab-ci-token',
      password: process.env.CI_BUILD_TOKEN
    })
  );

  // handle registries
  await plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', async envString => {
    npmciRegistryStorage.addRegistry(DockerRegistry.fromEnvString(envString));
  });
  return;
};

/**
 * pushes an image towards a registry
 * @param argvArg
 */
export const push = async argvArg => {
  await prepare();
  let dockerRegistryUrls: string[] = [];

  // lets parse the input of cli and npmextra
  if (argvArg._.length >= 3 && argvArg._[2] !== 'npmextra') {
    dockerRegistryUrls.push(argvArg._[2]);
  } else {
    if (configObject.dockerRegistries.length === 0) {
      logger.log(
        'warn',
        `There are no docker registries listed in npmextra.json! This is strange!`
      );
    }
    dockerRegistryUrls = dockerRegistryUrls.concat(configObject.dockerRegistries);
  }

  // lets determine the suffix
  let suffix = null;
  if (argvArg._.length >= 4) {
    suffix = argvArg._[3];
  }

  // lets push to the registries
  for (const dockerRegistryUrl of dockerRegistryUrls) {
    const dockerfileArray = await helpers
      .readDockerfiles()
      .then(helpers.sortDockerfiles)
      .then(helpers.mapDockerfiles);
    const dockerRegistryToPushTo = npmciRegistryStorage.getRegistryByUrl(dockerRegistryUrl);
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

export const pull = async argvArg => {
  await prepare();
  const registryUrlArg = argvArg._[2];
  let suffix = null;
  if (argvArg._.length >= 4) {
    suffix = argvArg._[3];
  }
  const localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg);
  const dockerfileArray = await helpers
    .readDockerfiles()
    .then(helpers.sortDockerfiles)
    .then(helpers.mapDockerfiles);
  for (const dockerfile of dockerfileArray) {
    await dockerfile.pull(localDockerRegistry, suffix);
  }
};

/**
 * tests docker files
 */
export const test = async () => {
  await prepare();
  return await helpers.readDockerfiles().then(helpers.testDockerfiles);
};
