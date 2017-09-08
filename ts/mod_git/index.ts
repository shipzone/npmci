import * as plugins from './mod.plugins'
import { bash } from '../npmci.bash'
import { repo } from '../npmci.env'

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[ 1 ]
    switch (action) {
      case 'mirror':
        await mirror()
        break
      default:
        plugins.beautylog.error(`>>npmci git ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci git ...<< cli arguments invalid... Please read the documentation.`)
  }
}

export let mirror = async () => {
  let githubToken = process.env.NPMCI_GIT_GITHUBTOKEN
  let githubUser = process.env.NPMCI_GIT_GITHUBGROUP || repo.user
  let githubRepo = process.env.NPMCI_GIT_GITHUB || repo.repo
  if (githubToken) {
    plugins.beautylog.info('found github token.')
    plugins.beautylog.log('attempting the mirror the repository to GitHub')
    // add the mirror
    bash(`git remote add mirror https://${githubToken}@github.com/${githubUser}/${githubRepo}.git`)
    bash(`git push mirror`)
  }
}
