import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';

import { repo } from './npmci.env';

import { KeyValueStore } from '@pushrocks/npmextra';

export interface INpmciOptions {
  projectInfo: plugins.projectinfo.ProjectInfo;
  npmGlobalTools: string[];
  npmAccessLevel?: 'private' | 'public';
  npmRegistryUrl: string;
  dockerRegistryRepoMap: any;
  dockerBuildargEnvMap: any;
}

// instantiate a kvStorage for the current directory
export let kvStorage = new KeyValueStore('custom', `${repo.user}_${repo.repo}`);

// handle config retrival
const npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
const defaultConfig: INpmciOptions = {
  projectInfo: new plugins.projectinfo.ProjectInfo(paths.cwd),
  npmGlobalTools: [],
  dockerRegistryRepoMap: {},
  npmAccessLevel: 'private',
  npmRegistryUrl: 'registry.npmjs.org',
  dockerBuildargEnvMap: {}
};
export let configObject = npmciNpmextra.dataFor<INpmciOptions>('npmci', defaultConfig);

/**
 * gets the npmci portion of the npmextra.json file
 */
export let getConfig = async (): Promise<INpmciOptions> => {
  return configObject;
};
