/// <reference types="q" />
import "typings-global";
import * as plugins from "./npmci.plugins";
/**
 * defines possible build services
 */
export declare type TBuildService = "docker";
/**
 * builds for a specific service
 */
export declare let build: (commandArg: any) => plugins.q.Promise<any>;
