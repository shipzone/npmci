/// <reference types="q" />
import "typings-global";
import * as plugins from "./npmci.plugins";
/**
 * cleans npmci config files
 */
export declare let clean: () => plugins.q.Promise<{}>;
