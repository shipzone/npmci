import "typings-global";
import { GitRepo } from "smartstring";
import { Dockerfile } from "./npmci.build.docker";
export declare let repo: GitRepo;
export declare let dockerTestTag: string;
export declare let dockerReleaseTag: string;
export declare let dockerRegistry: any;
export declare let dockerFilesBuilt: Dockerfile[];
export declare let dockerFiles: Dockerfile[];
