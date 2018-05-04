import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import * as npmciMonitor from './npmci.monitor';
npmciMonitor.run();

// Get Info about npmci itself
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log('npmci version: ' + npmciInfo.version);

import * as NpmciEnv from './npmci.env';

import * as npmciMods from './npmci.mods';

const npmciSmartcli = new plugins.smartcli.Smartcli();
npmciSmartcli.addVersion(npmciInfo.version);

// clean
npmciSmartcli
  .addCommand('clean')
  .subscribe(async argv => {
    let modClean = await npmciMods.modClean.load();
    await modClean.clean();
  }, err => {
    console.log(err);
    process.exit(1);
  });

// cloudflare
npmciSmartcli
  .addCommand('cloudflare')
  .subscribe(async argvArg => {
    let modPurge = await npmciMods.modCloudflare.load();
    await modPurge.handleCli(argvArg);
  }, err => {
    console.log(err);
  });

// command
npmciSmartcli
  .addCommand('command')
  .subscribe(async argv => {
    let modCommand = await npmciMods.modCommand.load();
    await modCommand.command();
  }, err => {
    console.log(err);
    process.exit(1);
  });

// command
npmciSmartcli
  .addCommand('git')
  .subscribe(async argvArg => {
    let modGit = await npmciMods.modGit.load();
    await modGit.handleCli(argvArg);
  }, err => {
    console.log(err);
    process.exit(1);
  });

// build
npmciSmartcli
  .addCommand('docker')
  .subscribe(async argvArg => {
    let modDocker = await npmciMods.modDocker.load();
    await modDocker.handleCli(argvArg);
  }, err => {
    console.log(err);
    process.exit(1);
  });

// node
npmciSmartcli
  .addCommand('node')
  .subscribe(async argvArg => {
    let modNode = await npmciMods.modNode.load();
    await modNode.handleCli(argvArg);
  }, err => {
    console.log(err);
    process.exit(1);
  });

// npm
npmciSmartcli
  .addCommand('npm')
  .subscribe(async argvArg => {
    let modNpm = await npmciMods.modNpm.load();
    await modNpm.handleCli(argvArg);
  }, err => {
    console.log(err);
  });

// trigger
npmciSmartcli
  .addCommand('ssh')
  .subscribe(async argvArg => {
    let modSsh = await npmciMods.modSsh.load();
    await modSsh.handleCli(argvArg);
  }, err => {
    console.log(err);
    process.exit(1);
  });

// trigger
npmciSmartcli
  .addCommand('trigger')
  .subscribe(async argv => {
    let modTrigger = await npmciMods.modTrigger.load();
    await modTrigger.trigger();
  }, err => {
    console.log(err);
    process.exit(1);
  });

npmciSmartcli.startParse();
