/// <reference types="q" />
/// <reference types="node" />
import * as plugins from "./npmci.plugins";
export declare let build: () => plugins.q.Promise<{}>;
export declare let readDockerfiles: () => plugins.q.Promise<{}>;
export declare let sortDockerfiles: (sortableArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
export declare let mapDockerfiles: (sortedArray: Dockerfile[]) => plugins.q.Promise<{}>;
export declare let buildDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
export declare let pushDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
export declare let pullDockerfileImages: (sortableArrayArg: Dockerfile[], registryArg?: string) => plugins.q.Promise<{}>;
export declare let testDockerfiles: (sortedArrayArg: Dockerfile[]) => plugins.q.Promise<{}>;
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
    build(): plugins.q.Promise<{}>;
    push(stageArg: any): plugins.q.Promise<{}>;
    pull(registryArg: string): void;
    test(): void;
    getId(): string;
}
export declare let dockerFileVersion: (dockerfileNameArg: string) => string;
export declare let dockerBaseImage: (dockerfileContentArg: string) => string;
export declare let dockerTag: (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string) => string;
export declare let cleanTagsArrayFunction: (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]) => string[];
