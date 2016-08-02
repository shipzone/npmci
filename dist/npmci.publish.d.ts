/// <reference types="q" />
import "typings-global";
import * as plugins from "./npmci.plugins";
export declare let publish: (serviceArg?: string) => plugins.q.Promise<{}>;
