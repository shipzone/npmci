import * as plugins from './mod.plugins';
import * as configModule from '../npmci.config';
import { bash, bashNoError, nvmAvailable, yarnAvailable } from '../npmci.bash';

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
  if (
    config.npmAccessLevel &&
    (config.npmAccessLevel === 'public' || config.npmAccessLevel === 'private')
  ) {
    npmAccessCliString = `--access=${config.npmAccessLevel}`;
  }
  await bash(`npm publish ${npmAccessCliString}`);
};

let install = async (): Promise<void> => {
  plugins.beautylog.info('now installing dependencies:');
  if (await yarnAvailable.promise) {
    await bash('yarn install');
  } else {
    await bash('npm install');
  }
};

export let test = async (): Promise<void> => {
  plugins.beautylog.info('now starting tests:');
  await bash('yarn test');
};
