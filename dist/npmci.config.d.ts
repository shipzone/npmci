import * as plugins from './npmci.plugins';
export interface INpmciOptions {
    npmGlobalTools: string[];
    npmAccessLevel?: 'private' | 'public';
    dockerRegistryRepoMap: any;
    dockerBuildargEnvMap: any;
}
export declare let kvStorage: plugins.npmextra.KeyValueStore;
export declare let configObject: INpmciOptions;
/**
 * gets the npmci portion of the npmextra.json file
 */
export declare let getConfig: () => Promise<INpmciOptions>;
