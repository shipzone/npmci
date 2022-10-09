import * as plugins from './npmci.plugins.js';

import { CloudlyConnector } from './connector.cloudly/cloudlyconnector.js';

import { NpmciInfo } from './npmci.classes.npmciinfo.js';
import { NpmciCli } from './npmci.classes.npmcicli.js';
import { NpmciConfig } from './npmci.classes.npmciconfig.js';

// mods
import { NpmciDockerManager } from './manager.docker/index.js';
import { NpmciGitManager } from './manager.git/index.js';
import { NpmciNodeJsManager } from './manager.nodejs/index.js';
import { NpmciNpmManager } from './manager.npm/index.js';
import { NpmciEnv } from './npmci.classes.npmcienv.js';

export class Npmci {
  public analytics: plugins.smartanalytics.Analytics;
  public cloudlyConnector: CloudlyConnector;

  public npmciEnv: NpmciEnv;
  public npmciInfo: NpmciInfo;
  public npmciConfig: NpmciConfig;
  public npmciCli: NpmciCli;

  // managers
  public dockerManager: NpmciDockerManager;
  public gitManager: NpmciGitManager;
  public nodejsManager: NpmciNodeJsManager;
  public npmManager: NpmciNpmManager;

  constructor() {
    this.analytics = new plugins.smartanalytics.Analytics({
      apiEndPoint: 'https://pubapi.lossless.one/analytics',
      projectId: 'gitzone',
      appName: 'npmci',
    });
    this.cloudlyConnector = new CloudlyConnector(this);
    this.npmciEnv = new NpmciEnv(this);
    this.npmciInfo = new NpmciInfo(this);
    this.npmciCli = new NpmciCli(this);
    this.npmciConfig = new NpmciConfig(this);

    // managers
    this.dockerManager = new NpmciDockerManager(this);
    this.gitManager = new NpmciGitManager(this);
    this.nodejsManager = new NpmciNodeJsManager(this);
    this.npmManager = new NpmciNpmManager(this);
  }

  public async start() {
    await this.npmciInfo.printToConsole();
    await this.npmciConfig.init();
    this.npmciCli.startParse();
  }
}
