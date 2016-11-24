/// <reference types="q" />
import * as q from 'q';
export interface INpmciOptions {
    globalNpmTools: string[];
}
export declare let getConfig: () => q.Promise<INpmciOptions>;
