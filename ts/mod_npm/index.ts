import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import * as configModule from '../npmci.config';
import { bash, bashNoError, nvmAvailable } from '../npmci.bash';

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async argvArg => {
  if (argvArg._.length >= 2) {
    const action: string = argvArg._[1];
    switch (action) {
      case 'install':
        await install();
        break;
      case 'prepare':
        await prepare();
        break;
      case 'test':
        await test();
        break;
      case 'publish':
        await publish();
        break;
      default:
        logger.log('error', `>>npmci npm ...<< action >>${action}<< not supported`);
        process.exit(1);
    }
  } else {
    logger.log('info', `>>npmci npm ...<< cli arguments invalid... Please read the documentation.`);
    process.exit(1);
  }
};

/**
 * authenticates npm with token from env var
 */
const prepare = async () => {
  const config = await configModule.getConfig();
  let npmrcFileString: string = '';
  await plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TOKEN_NPM*', npmEnvArg => {
    const npmRegistryUrl = npmEnvArg.split('|')[0];
    const npmToken = npmEnvArg.split('|')[1];
    npmrcFileString += `//${npmRegistryUrl}/:_authToken="${plugins.smartstring.base64.decode(
      npmToken
    )}"\n`;
  });
  logger.log('info', `setting default npm registry to ${config.npmRegistryUrl}`);
  npmrcFileString += `registry=https://${config.npmRegistryUrl}\n`;

  // final check
  if (npmrcFileString.length > 0) {
    logger.log('info', 'found one or more access tokens');
  } else {
    logger.log('error', 'no access token found! Exiting!');
    process.exit(1);
  }

  // lets save it to disk
  plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc');
  return;
};

/**
 * publish a package to npm
 */
const publish = async () => {
  const buildPublishCommand = async () => {
    let npmAccessCliString = ``;
    let npmRegistryCliString = ``;
    let publishVerdaccioAsWell = false;
    const config = await configModule.getConfig();
    const availableRegistries: string[] = [];
    await plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TOKEN_NPM*', npmEnvArg => {
      availableRegistries.push(npmEnvArg.split('|')[0]);
    });

    // -> configure package access level
    if (config.npmAccessLevel) {
      npmAccessCliString = `--access=${config.npmAccessLevel}`;
      if (config.npmAccessLevel === 'public') {
        publishVerdaccioAsWell = true;
      }
    } else {
      throw new Error('You need to set a npmAccessLevel!!!');
    }
    // -> configure registry url
    if (config.npmRegistryUrl) {
      npmRegistryCliString = `--registry=https://${config.npmRegistryUrl}`;
    } else {
      logger.log('error', `no registry url specified. Can't publish!`);
      process.exit(1);
    }

    let publishCommand = `npm publish ${npmAccessCliString} ${npmRegistryCliString} `;

    // publishEverywhere
    if (publishVerdaccioAsWell) {
      const verdaccioRegistry = availableRegistries.find(registryString =>
        registryString.startsWith('verdaccio')
      );
      if (verdaccioRegistry) {
        logger.log(
          'info',
          `package is public and verdaccio registry is specified. Also publishing to Verdaccio!`
        );
        publishCommand = `${publishCommand} && npm publish ${npmAccessCliString} --registry=https://${verdaccioRegistry}`;
      } else {
        logger.log(
          'error',
          `This package should also be published to Verdaccio, however there is no Verdaccio registry data available!`
        );
      }
    }
    return publishCommand;
  };

  // -> preparing
  logger.log('info', `now preparing environment:`);
  prepare();
  await bash(`npm -v`);

  // -> build it
  await bash(`npm install`);
  await bash(`npm run build`);

  logger.log('success', `Nice!!! The build for the publication was successfull!`);
  logger.log('info', `Lets clean up so we don't publish any packages that don't belong to us:`);
  // -> clean up before we publish stuff
  await bashNoError(`rm -r ./.npmci_cache`);
  await bash(`rm -r ./node_modules`);

  logger.log('success', `Cleaned up!:`);

  // -> publish it
  logger.log('info', `now invoking npm to publish the package!`);
  await bash(await buildPublishCommand());
  logger.log('success', `Package was successfully published!`);
};

const install = async (): Promise<void> => {
  logger.log('info', 'now installing dependencies:');
  await bash('npm install');
};

export let test = async (): Promise<void> => {
  logger.log('info', 'now starting tests:');
  await bash('npm test');
};
