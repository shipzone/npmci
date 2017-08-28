import * as q from 'q'

import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'

import { repo } from './npmci.env'

import { KeyValueStore } from 'npmextra'

export interface INpmciOptions {
  globalNpmTools: string[]
}

// instantiate a kvStorage for the current directory
export let kvStorage = new KeyValueStore('custom', repo.user + repo.repo)

export let getConfig = async (): Promise<INpmciOptions> => {
  let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd)
  let defaultConfig: INpmciOptions = {
    globalNpmTools: []
  }
  let npmciConfig = npmciNpmextra.dataFor<INpmciOptions>('npmci', defaultConfig)
  return npmciConfig
}
