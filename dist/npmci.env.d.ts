import { GitRepo } from 'smartstring';
import { Dockerfile } from './npmci.build.docker';
export declare let repo: GitRepo;
export declare let buildStage: string;
export declare let dockerRegistry: string;
export declare let setDockerRegistry: (dockerRegistryArg: string) => void;
export declare let dockerFilesBuilt: Dockerfile[];
export declare let dockerFiles: Dockerfile[];
export declare let config: {
    dockerRegistry: any;
    dockerFilesBuilt: any[];
    dockerFiles: any[];
    project: any;
};
export declare let configStore: () => void;
