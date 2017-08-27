import * as helpers from './mod.helpers';
import { Dockerfile } from './mod.classes.dockerfile';
export { Dockerfile, helpers };
export declare let modArgvArg: any;
/**
 * handle cli input
 * @param argvArg
 */
export declare let handleCli: (argvArg: any) => Promise<void>;
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export declare let build: () => Promise<void>;
/**
 * logs in docker
 */
export declare let prepare: () => Promise<void>;
export declare let push: (argvArg: any) => Promise<void>;
export declare let pull: (argvArg: any) => Promise<void>;
export declare let test: () => Promise<Dockerfile[]>;
