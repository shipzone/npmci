export declare let build: () => any;
export declare let readDockerfiles: () => any;
export declare let sortDockerfiles: (sortableArrayArg: Dockerfile[]) => any;
export declare let mapDockerfiles: (sortedArray: Dockerfile[]) => any;
export declare let buildDockerfiles: (sortedArrayArg: Dockerfile[]) => any;
export declare let pushDockerfiles: (sortedArrayArg: Dockerfile[]) => any;
export declare let pullDockerfileImages: (sortableArrayArg: Dockerfile[], registryArg?: string) => any;
export declare let testDockerfiles: (sortedArrayArg: Dockerfile[]) => any;
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
    build(): any;
    push(stageArg: any): any;
    pull(registryArg: string): void;
    test(): void;
    getId(): string;
}
export declare let dockerFileVersion: (dockerfileNameArg: string) => string;
export declare let dockerBaseImage: (dockerfileContentArg: string) => string;
export declare let dockerTag: (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string) => string;
export declare let cleanTagsArrayFunction: (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]) => string[];
