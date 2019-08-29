import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import { logger } from "./npmci.logging";
import { Npmci } from './npmci.classes.npmci';

export class NpmciInfo {

  public npmciRef: Npmci;
  public projectInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);

  constructor(npmciArg: Npmci) {
    this.npmciRef = npmciArg;
  }

  public printToConsole () {
    logger.log('info', `npmci version: ${this.projectInfo.version}`);
  }
}