import * as plugins from './npmci.plugins';

export let cwd = process.cwd();

export let NpmciPackageRoot = plugins.path.join(__dirname, '../');
export let NpmciPackageConfig = plugins.path.join(NpmciPackageRoot, './config.json');
export let NpmciProjectDir = cwd;
export let NpmciTestDir = plugins.path.join(cwd, './test');
