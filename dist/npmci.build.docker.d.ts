/// <reference types="q" />
/// <reference types="node" />
import * as plugins from './npmci.plugins';
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export declare let build: () => plugins.q.Promise<{}>;
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
export declare let readDockerfiles: () => plugins.q.Promise<Dockerfile[]>;
/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
export declare let sortDockerfiles: (sortableArrayArg: Dockerfile[]) => plugins.q.Promise<Dockerfile[]>;
/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
export declare let mapDockerfiles: (sortedArray: Dockerfile[]) => plugins.q.Promise<Dockerfile[]>;
/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
export declare let buildDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
/**
 * pushes the real Dockerfile images to a Docker registry
 */
export declare let pushDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
export declare let pullDockerfileImages: (sortableArrayArg: Dockerfile[], registryArg?: string) => plugins.q.Promise<{}>;
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
export declare let testDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export declare class Dockerfile {
    filePath: string;
    repo: string;
    version: string;
    cleanTag: string;
    buildTag: string;
    testTag: string;
    releaseTag: string;
    containerName: string;
    content: string;
    baseImage: string;
    localBaseImageDependent: boolean;
    localBaseDockerfile: Dockerfile;
    constructor(options: {
        filePath?: string;
        fileContents?: string | Buffer;
        read?: boolean;
    });
    /**
     * builds the Dockerfile
     */
    build(): plugins.q.Promise<{}>;
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg: any): plugins.q.Promise<{}>;
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg: string): void;
    /**
     * tests the Dockerfile;
     */
    test(): void;
    /**
     * gets the id of a Dockerfile
     */
    getId(): string;
}
/**
 *
 */
export declare let dockerFileVersion: (dockerfileNameArg: string) => string;
/**
 *
 */
export declare let dockerBaseImage: (dockerfileContentArg: string) => string;
/**
 *
 */
export declare let dockerTag: (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string) => string;
/**
 *
 */
export declare let cleanTagsArrayFunction: (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]) => string[];
