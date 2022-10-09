import * as plugins from './npmci.plugins.js';
import { Npmci } from './npmci.classes.npmci.js';

export class NpmciEnv {
  public npmciRef: Npmci;

  public repoString: string;
  public repo: plugins.smartstring.GitRepo;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
    this.repoString = process.env.CI_REPOSITORY_URL;
    if (!this.repoString) {
      this.repoString = 'https://undefined:undefined@github.com/undefined/undefined.git';
    }
    this.repo = new plugins.smartstring.GitRepo(this.repoString);
  }
}
