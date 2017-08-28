import { KeyValueStore } from 'npmextra';
export interface INpmciOptions {
    npmGlobalTools: string[];
    dockerRegistryRepoMap: any;
}
export declare let kvStorage: KeyValueStore;
export declare let configObject: INpmciOptions;
export declare let getConfig: () => Promise<INpmciOptions>;
