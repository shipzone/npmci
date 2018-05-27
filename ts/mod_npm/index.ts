import * as plugins from './mod.plugins';
import * as configModule from '../npmci.config';
import { bash, bashNoError, nvmAvailable } from '../npmci.bash';

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async argvArg => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[1];
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
        plugins.beautylog.error(`>>npmci npm ...<< action >>${action}<< not supported`);
        process.exit(1);
    }
  } else {
    plugins.beautylog.log(
      `>>npmci npm ...<< cli arguments invalid... Please read the documentation.`
    );
    process.exit(1);
  }
};

/**
 * authenticates npm with token from env var
 */
let prepare = async () => {
  let npmrcPrefix: string = '//registry.npmjs.org/:_authToken=';
  let npmToken: string = process.env.NPMCI_TOKEN_NPM;
  let npmrcFileString: string = npmrcPrefix + npmToken;
  if (npmToken) {
    plugins.beautylog.info('found access token');
  } else {
    plugins.beautylog.error('no access token found! Exiting!');
    process.exit(1);
  }
  plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc');
  return;
};

/**
 * publish a package to npm
 */
let publish = async () => {
  let npmAccessCliString = ``;
  const config = await configModule.getConfig();

  // -> configure package access level
  if (
    config.npmAccessLevel &&
    (config.npmAccessLevel === 'public' || config.npmAccessLevel === 'private')
  ) {
    npmAccessCliString = `--access=${config.npmAccessLevel}`;
  }

  // -> preparing
  plugins.beautylog.log(`now preparing environment:`);
  prepare();
  await bash(`npm -v`);

  // -> build it
  await bash(`npm install`);
  await bash(`npm run build`);

  plugins.beautylog.success(`Nice!!! The build for the publication was successfull!`);
  plugins.beautylog.log(`Lets clean up so we don't publish any packages that don't belong to us:`);
  // -> clean up before we publish stuff
  await bashNoError(`rm -r ./.npmci_cache`);
  await bash(`rm -r ./node_modules`);

  plugins.beautylog.success(`Cleaned up!:`);

  // -> publish it
  plugins.beautylog.log(`now invoking npm to publish the package!`);
  await bash(`npm publish ${npmAccessCliString}`);
  plugins.beautylog.success(`Package was successfully published!`);
};

let install = async (): Promise<void> => {
  plugins.beautylog.info('now installing dependencies:');
  await bash('npm install');
};

export let test = async (): Promise<void> => {
  plugins.beautylog.info('now starting tests:');
  await bash('npm test');
};
