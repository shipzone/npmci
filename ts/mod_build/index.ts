import * as plugins from './mod.plugins'
import { bash } from '../npmci.bash'
import * as env from '../npmci.env'
import * as npmciMods from '../npmci.mods'

/**
 * defines possible build services
 */
export type TBuildService = 'docker'

/**
 * builds for a specific service
 */
export let build = async (commandArg): Promise<void> => {
  switch (commandArg) {
    case 'docker':
      let modDocker = await npmciMods.modDocker.load()
      await modDocker.build()
      break
    default:
      plugins.beautylog.log('build target ' + commandArg + ' not recognised!')
  };
  return
}
