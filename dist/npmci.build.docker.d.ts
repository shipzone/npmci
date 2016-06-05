export declare let build: () => any;
export declare class Dockerfile {
    filePath: string;
    buildTag: string;
    repo: string;
    version: string;
    content: string;
    baseImage: string;
    constructor(options: {
        filePath?: string;
        fileContents?: string | Buffer;
        read?: boolean;
    });
    build(): void;
    push(): void;
}
export declare let dockerTag: (repoArg: string, versionArg: string) => string;
