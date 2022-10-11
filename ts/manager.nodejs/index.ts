import * as plugins from '../npmci.plugins.js';
import * as paths from '../npmci.paths.js';

import { logger } from '../npmci.logging.js';
import { bash, bashNoError, nvmAvailable } from '../npmci.bash.js';
import { Npmci } from '../npmci.classes.npmci.js';

export class NpmciNodeJsManager {
  public npmciRef: Npmci;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
  }

  /**
   * handle cli input
   * @param argvArg
   */
  public async handleCli(argvArg: any) {
    if (argvArg._.length >= 3) {
      const action: string = argvArg._[1];
      switch (action) {
        case 'install':
          await this.install(argvArg._[2]);
          break;
        default:
          logger.log('error', `>>npmci node ...<< action >>${action}<< not supported`);
          process.exit(1);
      }
    } else {
      logger.log(
        'error',
        `>>npmci node ...<< cli arguments invalid... Please read the documentation.`
      );
      process.exit(1);
    }
  }

  /**
   * Install a specific version of node
   * @param versionArg
   */
  public async install(versionArg: any) {
    logger.log('info', `now installing node version ${versionArg}`);
    let version: string;
    if (versionArg === 'stable') {
      version = '18';
    } else if (versionArg === 'lts') {
      version = '16';
    } else if (versionArg === 'legacy') {
      version = '14';
    } else {
      version = versionArg;
    }
    if (await nvmAvailable.promise) {
      await bash(`nvm install ${version} && nvm alias default ${version}`);
      logger.log('success', `Node version ${version} successfully installed!`);
    } else {
      logger.log('warn', 'Nvm not in path so staying at installed node version!');
    }
    logger.log('info', 'now installing latest npm version');
    await bash('npm install -g npm');
    await bash('node -v');
    await bash('npm -v');

    // lets look for further config
    const config = await this.npmciRef.npmciConfig.getConfig();
    logger.log('info', 'Now checking for needed global npm tools...');
    for (const npmTool of config.npmGlobalTools) {
      logger.log('info', `Checking for global "${npmTool}"`);
      const whichOutput: string = await bashNoError(`which ${npmTool}`);
      const toolAvailable: boolean = !(/not\sfound/.test(whichOutput) || whichOutput === '');
      if (toolAvailable) {
        logger.log('info', `Tool ${npmTool} is available`);
      } else {
        logger.log('info', `globally installing ${npmTool} from npm`);
        await bash(`npm install ${npmTool} -q -g`);
      }
    }
    logger.log('success', 'all global npm tools specified in npmextra.json are now available!');
  }
}
