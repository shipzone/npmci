import * as plugins from './npmci.plugins';
/**
 * wether nvm is available or not
 */
export declare let nvmAvailable: plugins.q.Deferred<boolean>;
/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
export declare let bash: (commandArg: string, retryArg?: number, bareArg?: boolean) => Promise<string>;
/**
 * bashBare allows usage of bash without sourcing any files like nvm
 */
export declare let bashBare: (commandArg: string, retryArg?: number) => Promise<string>;
/**
 * bashNoError allows executing stuff without throwing an error
 */
export declare let bashNoError: (commandArg: string) => Promise<string>;
