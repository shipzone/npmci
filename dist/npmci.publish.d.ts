/// <reference types="q" />
import "typings-global";
import * as plugins from "./npmci.plugins";
/**
 * type of supported services
 */
export declare type registryService = "npm" | "docker";
/**
 * the main exported publish function.
 * @param registryServiceArg the serviceArg
 */
export declare let publish: (registryServiceArg?: registryService) => plugins.q.Promise<{}>;
