import { KeyValueStore } from 'npmextra';
export interface INpmciOptions {
    globalNpmTools: string[];
}
export declare let kvStorage: KeyValueStore;
export declare let getConfig: () => Promise<INpmciOptions>;
