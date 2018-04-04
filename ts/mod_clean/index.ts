import * as plugins from './mod.plugins';
import * as paths from '../npmci.paths';

/**
 * cleans npmci config files
 */
export let clean = async (): Promise<void> => {
  plugins.smartfile.fs.removeSync(paths.NpmciPackageConfig);
  return;
};
