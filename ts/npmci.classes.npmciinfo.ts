import * as plugins from './npmci.plugins.js';
import * as paths from './npmci.paths.js';
import { logger } from './npmci.logging.js';
import { Npmci } from './npmci.classes.npmci.js';

export class NpmciInfo {
  public npmciRef: Npmci;
  public projectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);

  constructor(npmciArg: Npmci) {
    this.npmciRef = npmciArg;
  }

  public printToConsole() {
    logger.log('info', `npmci version: ${this.projectInfo.version}`);
  }
}
