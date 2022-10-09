import * as plugins from './npmci.plugins.js';

export const cwd = process.cwd();

// package paths
export const NpmciPackageRoot = plugins.path.join(plugins.smartpath.get.dirnameFromImportMetaUrl(import.meta.url), '../');
export const NpmciPackageConfig = plugins.path.join(NpmciPackageRoot, './config.json');

// project paths
export const NpmciProjectDir = cwd;
export const NpmciProjectNogitDir = plugins.path.join(NpmciProjectDir, './.nogit');
export const NpmciTestDir = plugins.path.join(cwd, './test');
export const NpmciCacheDir = plugins.path.join(cwd, './.npmci_cache');
