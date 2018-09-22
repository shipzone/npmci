import * as q from 'q';

import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';

import { repo } from './npmci.env';

import { KeyValueStore } from '@pushrocks/npmextra';

export interface INpmciOptions {
  npmGlobalTools: string[];
  npmAccessLevel?: 'private' | 'public';
  dockerRegistryRepoMap: any;
  dockerBuildargEnvMap: any;
}

// instantiate a kvStorage for the current directory
export let kvStorage = new KeyValueStore('custom', `${repo.user}_${repo.repo}`);

// handle config retrival
let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
let defaultConfig: INpmciOptions = {
  npmGlobalTools: [],
  dockerRegistryRepoMap: {},
  dockerBuildargEnvMap: {}
};
export let configObject = npmciNpmextra.dataFor<INpmciOptions>('npmci', defaultConfig);

/**
 * gets the npmci portion of the npmextra.json file
 */
export let getConfig = async (): Promise<INpmciOptions> => {
  return configObject;
};
