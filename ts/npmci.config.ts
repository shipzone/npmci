import * as q from 'q'

import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'

export interface INpmciOptions {
  globalNpmTools: string[]
}

export let getConfig = async (): Promise<INpmciOptions> => {
  let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd)
  let defaultConfig: INpmciOptions = {
    globalNpmTools: []
  }
  let npmciConfig = npmciNpmextra.dataFor<INpmciOptions>('npmci', defaultConfig)
  return npmciConfig
}
