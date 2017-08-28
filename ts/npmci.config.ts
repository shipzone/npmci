import * as q from 'q'

import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'

import { repo } from './npmci.env'

import { KeyValueStore } from 'npmextra'

export interface INpmciOptions {
  npmGlobalTools: string[]
  dockerRegistryRepoMap: any
}

// instantiate a kvStorage for the current directory
export let kvStorage = new KeyValueStore('custom', `${repo.user}_${repo.repo}`)

export let getConfig = async (): Promise<INpmciOptions> => {
  let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd)
  let defaultConfig: INpmciOptions = {
    npmGlobalTools: [],
    dockerRegistryRepoMap: {}
  }
  let npmciConfig = npmciNpmextra.dataFor<INpmciOptions>('npmci', defaultConfig)
  return npmciConfig
}
