import { Objectmap } from 'lik';
import { DockerRegistry } from './mod.classes.dockerregistry';
export declare class RegistryStorage {
    objectMap: Objectmap<DockerRegistry>;
    constructor();
    addRegistry(registryArg: DockerRegistry): void;
    getRegistryByUrl(registryUrlArg: string): DockerRegistry;
    loginAll(): Promise<void>;
}
