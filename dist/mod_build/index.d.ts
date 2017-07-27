/**
 * defines possible build services
 */
export declare type TBuildService = 'docker';
/**
 * builds for a specific service
 */
export declare let build: (argvArg: any) => Promise<void>;
