import { Dockerfile } from './mod.classes.dockerfile';
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
export declare let readDockerfiles: () => Promise<Dockerfile[]>;
/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
export declare let sortDockerfiles: (sortableArrayArg: Dockerfile[]) => Promise<Dockerfile[]>;
/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
export declare let mapDockerfiles: (sortedArray: Dockerfile[]) => Promise<Dockerfile[]>;
/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
export declare let buildDockerfiles: (sortedArrayArg: Dockerfile[]) => Promise<Dockerfile[]>;
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
export declare let testDockerfiles: (sortedArrayArg: Dockerfile[]) => Promise<Dockerfile[]>;
/**
 * returns a version for a docker file
 * @execution SYNC
 */
export declare let dockerFileVersion: (dockerfileNameArg: string) => string;
/**
 * returns the docker base image for a Dockerfile
 */
export declare let dockerBaseImage: (dockerfileContentArg: string) => string;
/**
 * returns the docker tag
 */
export declare let getDockerTagString: (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string) => string;
export declare let getDockerBuildArgs: () => Promise<string>;
/**
 *
 */
export declare let cleanTagsArrayFunction: (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]) => string[];
