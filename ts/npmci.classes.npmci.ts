import * as plugins from './npmci.plugins';

import { CloudlyConnector } from './connector.cloudly/cloudlyconnector';

import { NpmciInfo } from './npmci.classes.npmciinfo';
import { NpmciCli } from './npmci.classes.npmcicli';
import { NpmciConfig } from './npmci.classes.npmciconfig';

// mods
import { NpmciDockerManager } from './manager.docker';
import { NpmciGitManager } from './manager.git';
import { NpmciNodeJsManager } from './manager.nodejs';
import { NpmciNpmManager } from './manager.npm';
import { NpmciEnv } from './npmci.classes.npmcienv';

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
      appName: 'npmci'
    });
    this.cloudlyConnector = new CloudlyConnector();
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
