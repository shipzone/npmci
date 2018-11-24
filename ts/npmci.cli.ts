import { logger } from './npmci.logging';
import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import * as npmciMonitor from './npmci.monitor';
npmciMonitor.run();

// Get Info about npmci itself
const npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
logger.log('info', 'npmci version: ' + npmciInfo.version);

import * as NpmciEnv from './npmci.env';

const npmciSmartcli = new plugins.smartcli.Smartcli();
npmciSmartcli.addVersion(npmciInfo.version);

// clean
npmciSmartcli.addCommand('clean').subscribe(
  async argv => {
    const modClean = await import('./mod_clean/index');
    await modClean.clean();
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// command
npmciSmartcli.addCommand('command').subscribe(
  async argv => {
    const modCommand = await import('./mod_command/index');
    await modCommand.command();
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// command
npmciSmartcli.addCommand('git').subscribe(
  async argvArg => {
    const modGit = await import('./mod_git/index');
    await modGit.handleCli(argvArg);
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// build
npmciSmartcli.addCommand('docker').subscribe(
  async argvArg => {
    const modDocker = await import('./mod_docker/index');
    await modDocker.handleCli(argvArg);
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// node
npmciSmartcli.addCommand('node').subscribe(
  async argvArg => {
    const modNode = await import('./mod_node/index');
    await modNode.handleCli(argvArg);
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// npm
npmciSmartcli.addCommand('npm').subscribe(
  async argvArg => {
    const modNpm = await import('./mod_npm/index');
    await modNpm.handleCli(argvArg);
  },
  err => {
    console.log(err);
  }
);

// trigger
npmciSmartcli.addCommand('ssh').subscribe(
  async argvArg => {
    const modSsh = await import('./mod_ssh/index');
    await modSsh.handleCli(argvArg);
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

// trigger
npmciSmartcli.addCommand('trigger').subscribe(
  async argv => {
    const modTrigger = await import('./mod_trigger/index');
    await modTrigger.trigger();
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

npmciSmartcli.startParse();
