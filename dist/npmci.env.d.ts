import { GitRepo } from 'smartstring';
import { Dockerfile } from './mod_docker/index';
/**
 * a info instance about the git respoitory at cwd :)
 */
export declare let repo: GitRepo;
/**
 * the build stage
 */
export declare let buildStage: string;
export declare let dockerRegistry: string;
export declare let setDockerRegistry: (dockerRegistryArg: string) => void;
export declare let dockerFilesBuilt: Dockerfile[];
export declare let dockerFiles: Dockerfile[];
/**
 * the config
 */
export declare let config: {
    dockerRegistry: any;
    dockerFilesBuilt: Dockerfile[];
    dockerFiles: Dockerfile[];
    project: any;
};
/**
 * the configuration store
 */
export declare let configStore: () => Promise<void>;
