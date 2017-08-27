export interface IDockerRegistryConstructorOptions {
    registryUrl: string;
    username: string;
    password: string;
}
export declare class DockerRegistry {
    registryUrl: string;
    username: string;
    password: string;
    constructor(optionsArg: IDockerRegistryConstructorOptions);
    static fromEnvString(envString: string): DockerRegistry;
    login(): Promise<void>;
}
