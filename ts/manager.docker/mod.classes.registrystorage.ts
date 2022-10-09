import { logger } from '../npmci.logging.js';
import * as plugins from './mod.plugins.js';
import { ObjectMap } from '@pushrocks/lik';

import { DockerRegistry } from './mod.classes.dockerregistry.js';

export class RegistryStorage {
  objectMap = new ObjectMap<DockerRegistry>();
  constructor() {
    // Nothing here
  }

  addRegistry(registryArg: DockerRegistry) {
    this.objectMap.add(registryArg);
  }

  getRegistryByUrl(registryUrlArg: string) {
    return this.objectMap.findSync((registryArg) => {
      return registryArg.registryUrl === registryUrlArg;
    });
  }

  async loginAll() {
    await this.objectMap.forEach(async (registryArg) => {
      await registryArg.login();
    });
    logger.log('success', 'logged in successfully into all available DockerRegistries!');
  }
}
