import * as plugins from './npmci.plugins.js';
import * as paths from './npmci.paths.js';

import { logger } from './npmci.logging.js';
import { Npmci } from './npmci.classes.npmci.js';

/**
 * the main config interface for npmci
 */
export interface INpmciOptions {
  projectInfo: plugins.projectinfo.ProjectInfo;

  // npm
  npmGlobalTools: string[];
  npmAccessLevel?: 'private' | 'public';
  npmRegistryUrl: string;

  // docker
  dockerRegistries: string[];
  dockerRegistryRepoMap: { [key: string]: string };
  dockerBuildargEnvMap: { [key: string]: string };

  // urls
  urlCloudly: string;
}

/**
 * a config class for Npmci
 */
export class NpmciConfig {
  public npmciRef: Npmci;

  public npmciNpmextra: plugins.npmextra.Npmextra;
  public kvStorage: plugins.npmextra.KeyValueStore;
  public npmciQenv: plugins.qenv.Qenv;

  private configObject: INpmciOptions;

  constructor(npmciRefArg: Npmci) {
    this.npmciRef = npmciRefArg;

    this.npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
    this.kvStorage = new plugins.npmextra.KeyValueStore(
      'custom',
      `${this.npmciRef.npmciEnv.repo.user}_${this.npmciRef.npmciEnv.repo.repo}`
    );
    this.npmciQenv = new plugins.qenv.Qenv(
      paths.NpmciProjectDir,
      paths.NpmciProjectNogitDir,
      false
    );

    this.configObject = {
      projectInfo: new plugins.projectinfo.ProjectInfo(paths.cwd),
      npmGlobalTools: [],
      dockerRegistries: [],
      dockerRegistryRepoMap: {},
      npmAccessLevel: 'private',
      npmRegistryUrl: 'registry.npmjs.org',
      dockerBuildargEnvMap: {},
      urlCloudly: this.npmciQenv.getEnvVarOnDemand('NPMCI_URL_CLOUDLY'),
    };
  }

  public async init() {
    this.configObject = this.npmciNpmextra.dataFor<INpmciOptions>('npmci', this.configObject);
  }

  public getConfig(): INpmciOptions {
    return this.configObject;
  }
}
