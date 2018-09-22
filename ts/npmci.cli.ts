import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import * as npmciMonitor from './npmci.monitor';
npmciMonitor.run();

// Get Info about npmci itself
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log('npmci version: ' + npmciInfo.version);

import * as NpmciEnv from './npmci.env';

const npmciSmartcli = new plugins.smartcli.Smartcli();
npmciSmartcli.addVersion(npmciInfo.version);

// clean
npmciSmartcli.addCommand('clean').subscribe(
  async argv => {
    let modClean = await import('./mod_clean/index');
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
    let modCommand = await import('./mod_command/index');
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
    let modGit = await import('./mod_git/index');
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
    let modDocker = await import('./mod_docker/index');
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
    let modNode = await import('./mod_node/index');
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
    let modNpm = await import('./mod_npm/index');
    await modNpm.handleCli(argvArg);
  },
  err => {
    console.log(err);
  }
);

// trigger
npmciSmartcli.addCommand('ssh').subscribe(
  async argvArg => {
    let modSsh = await import('./mod_ssh/index');
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
    let modTrigger = await import('./mod_trigger/index');
    await modTrigger.trigger();
  },
  err => {
    console.log(err);
    process.exit(1);
  }
);

npmciSmartcli.startParse();
