import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import { bash } from '../npmci.bash';
import { Npmci } from '../npmci.classes.npmci';

export class NpmciGitManager {
  public npmciRef: Npmci;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;
  }

  /**
   * handle cli input
   * @param argvArg
   */
  public handleCli = async argvArg => {
    if (argvArg._.length >= 2) {
      const action: string = argvArg._[1];
      switch (action) {
        case 'mirror':
          await this.mirror();
          break;
        default:
          logger.log('error', `npmci git -> action >>${action}<< not supported!`);
      }
    } else {
      logger.log('info', `npmci git -> cli arguments invalid! Please read the documentation.`);
    }
  };

  public mirror = async () => {
    const githubToken = process.env.NPMCI_GIT_GITHUBTOKEN;
    const githubUser = process.env.NPMCI_GIT_GITHUBGROUP || this.npmciRef.npmciEnv.repo.user;
    const githubRepo = process.env.NPMCI_GIT_GITHUB || this.npmciRef.npmciEnv.repo;
    if (
      this.npmciRef.npmciConfig.getConfig().projectInfo.npm.packageJson.private === true ||
      this.npmciRef.npmciConfig.getConfig().npmAccessLevel === 'private'
    ) {
      logger.log(
        'warn',
        `refusing to mirror due to private property use a private mirror location instead`
      );
      return;
    }
    if (githubToken) {
      logger.log('info', 'found github token.');
      logger.log('info', 'attempting the mirror the repository to GitHub');

      // plugins.smartgit.GitRepo;

      // add the mirror
      console.log(`git remote add mirror https://${githubToken}@github.com/${githubUser}/${githubRepo}.git`);
      await bash(
        `git remote add mirror https://${githubToken}@github.com/${githubUser}/${githubRepo}.git`
      );
      await bash(`git push mirror --all`);
      logger.log('ok', 'pushed all branches to mirror!');
      await bash(`git push mirror --tags`);
      logger.log('ok', 'pushed all tags to mirror!');
    } else {
      logger.log('error', `cannot find NPMCI_GIT_GITHUBTOKEN env var!`);
      process.exit(1);
    }
  };
}
