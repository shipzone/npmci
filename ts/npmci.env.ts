import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import { GitRepo } from '@pushrocks/smartstring';
import { Dockerfile } from './mod_docker/index';

/**
 * a info instance about the git respoitory at cwd :)
 */
let repoString: string = process.env.CI_REPOSITORY_URL;
if (!repoString) {
  repoString = 'https://undefined:undefined@github.com/undefined/undefined.git';
}
export let repo = new GitRepo(repoString);
