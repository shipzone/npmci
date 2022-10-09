import * as plugins from './mod.plugins.js';
import * as paths from '../npmci.paths.js';

/**
 * cleans npmci config files
 */
export let clean = async (): Promise<void> => {
  plugins.smartfile.fs.removeSync(paths.NpmciPackageConfig);
  return;
};
