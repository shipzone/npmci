export declare let build: () => any;
export declare let readDockerfiles: () => any;
export declare let sortDockerfiles: (sortableArrayArg: Dockerfile[]) => any;
export declare let mapDockerfiles: (sortedArray: Dockerfile[]) => any;
export declare let buildDockerfiles: (sortedArrayArg: Dockerfile[]) => any;
export declare let pushDockerfiles: (sortedArrayArg: Dockerfile[]) => any;
export declare class Dockerfile {
    filePath: string;
    repo: string;
    version: string;
    cleanTag: string;
    buildTag: string;
    content: string;
    patchedContent: string;
    baseImage: string;
    localBaseImageDependent: boolean;
    localBaseDockerfile: Dockerfile;
    constructor(options: {
        filePath?: string;
        fileContents?: string | Buffer;
        read?: boolean;
    });
    build(): void;
    push(): void;
    patchContents(): void;
    restoreContents(): void;
}
export declare let dockerFileVersion: (dockerfileNameArg: string) => string;
export declare let dockerBaseImage: (dockerfileContentArg: string) => string;
export declare let dockerTag: (repoArg: string, versionArg: string) => string;
export declare let cleanTagsArrayFunction: (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]) => string[];
