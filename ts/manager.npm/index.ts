import * as plugins from './mod.plugins.js';
import * as paths from '../npmci.paths.js';

import { logger } from '../npmci.logging.js';
import { bash, bashNoError, nvmAvailable } from '../npmci.bash.js';
import { Npmci } from '../npmci.classes.npmci.js';

export class NpmciNpmManager {
  public npmciRef: Npmci;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
  }

  /**
   * handle cli input
   * @param argvArg
   */
  public async handleCli(argvArg: any) {
    if (argvArg._.length >= 2) {
      const action: string = argvArg._[1];
      switch (action) {
        case 'install':
          await this.install();
          break;
        case 'build':
          await this.build();
          break;
        case 'prepare':
          await this.prepare();
          break;
        case 'test':
          await this.test();
          break;
        case 'publish':
          await this.publish();
          break;
        default:
          logger.log('error', `>>npmci npm ...<< action >>${action}<< not supported`);
          process.exit(1);
      }
    } else {
      logger.log(
        'info',
        `>>npmci npm ...<< cli arguments invalid... Please read the documentation.`
      );
      process.exit(1);
    }
  }

  /**
   * authenticates npm with token from env var
   */
  public async prepare() {
    const config = this.npmciRef.npmciConfig.getConfig();
    let npmrcFileString: string = '';
    await plugins.smartparam.forEachMinimatch(
      process.env,
      'NPMCI_TOKEN_NPM*',
      (npmEnvArg: string) => {
        const npmRegistryUrl = npmEnvArg.split('|')[0];
        let npmToken = npmEnvArg.split('|')[1];
        if (npmEnvArg.split('|')[2] && npmEnvArg.split('|')[2] === 'plain') {
          logger.log('ok', 'npm token not base64 encoded.');
        } else {
          logger.log('ok', 'npm token base64 encoded.');
          npmToken = plugins.smartstring.base64.decode(npmToken);
        }
        npmrcFileString += `//${npmRegistryUrl}/:_authToken="${npmToken}"\n`;
      }
    );
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

    // lets set the cache directory
    await bash(`npm config set cache ${paths.NpmciCacheDir}  --global `);

    return;
  }

  /**
   * publish a package to npm
   */
  public async publish() {
    const buildPublishCommand = async () => {
      let npmAccessCliString = ``;
      let npmRegistryCliString = ``;
      let publishVerdaccioAsWell = false;
      const config = this.npmciRef.npmciConfig.getConfig();
      const availableRegistries: string[] = [];
      await plugins.smartparam.forEachMinimatch(
        process.env,
        'NPMCI_TOKEN_NPM*',
        (npmEnvArg: string) => {
          availableRegistries.push(npmEnvArg.split('|')[0]);
        }
      );

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
        const verdaccioRegistry = availableRegistries.find((registryString) =>
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
    this.prepare();
    await bash(`npm -v`);
    await bash(`pnpm -v`);

    // -> build it
    await this.install();
    await this.build();

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
  }

  public async install(): Promise<void> {
    logger.log('info', 'now installing dependencies:');
    await bash('pnpm install');
  }

  public async build(): Promise<void> {
    logger.log('info', 'now building the project:');
    await bash('pnpm run build');
  }

  public async test(): Promise<void> {
    logger.log('info', 'now starting tests:');
    await bash('pnpm test');
  }
}
