/// <reference types="node" />
import { DockerRegistry } from './mod.classes.dockerregistry';
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export declare class Dockerfile {
    filePath: string;
    repo: string;
    version: string;
    cleanTag: string;
    buildTag: string;
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
    build(): Promise<void>;
    /**
     * pushes the Dockerfile to a registry
     */
    push(dockerRegistryArg: DockerRegistry, versionSuffix?: string): Promise<void>;
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg: DockerRegistry, versionSuffixArg?: string): Promise<void>;
    /**
     * tests the Dockerfile;
     */
    test(): Promise<void>;
    /**
     * gets the id of a Dockerfile
     */
    getId(): Promise<string>;
}
