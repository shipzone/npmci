import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
import { GitRepo } from 'smartstring'
import { ProjectInfo } from 'projectinfo'
import { Dockerfile } from './mod_docker/index'

/**
 * a info instance about the git respoitory at cwd :)
 */
export let repo: GitRepo
if (process.env.CI_REPOSITORY_URL) {
  repo = new GitRepo(process.env.CI_REPOSITORY_URL)
}

/**
 * Info about the project at cwd
 */
export let cwdProjectInfo = new ProjectInfo(paths.cwd)
