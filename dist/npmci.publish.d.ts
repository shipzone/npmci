/// <reference types="q" />
import "typings-global";
import * as plugins from "./npmci.plugins";
/**
 * type of supported services
 */
export declare type TPubService = "npm" | "docker";
/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to
 */
export declare let publish: (pubServiceArg?: TPubService) => plugins.q.Promise<{}>;
