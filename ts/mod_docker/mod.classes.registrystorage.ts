import * as plugins from './mod.plugins'
import { Objectmap } from 'lik'

import { DockerRegistry } from './mod.classes.dockerregistry'

export class RegistryStorage {
  objectMap = new Objectmap<DockerRegistry>()
  constructor () {
    // Nothing here
  }

  addRegistry (registryArg: DockerRegistry) {
    this.objectMap.add(registryArg)
  }

  getRegistryByUrl (registryUrlArg: string) {
    return this.objectMap.find(registryArg => {
      return registryArg.registryUrl === registryUrlArg
    })
  }

  async loginAll () {
    await this.objectMap.forEach(async registryArg => {
      await registryArg.login()
    })
  }
}
