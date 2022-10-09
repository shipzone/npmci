import { logger } from './npmci.logging.js';
import * as plugins from './npmci.plugins.js';
import * as paths from './npmci.paths.js';
import { Npmci } from './npmci.classes.npmci.js';

export class NpmciCli {
  public npmciRef: Npmci;
  public smartcli: plugins.smartcli.Smartcli;

  constructor(npmciArg: Npmci) {
    this.npmciRef = npmciArg;
    this.smartcli = new plugins.smartcli.Smartcli();
    this.smartcli.addVersion(this.npmciRef.npmciInfo.projectInfo.version);

    // clean
    this.smartcli.addCommand('clean').subscribe(
      async (argv) => {
        const modClean = await import('./mod_clean/index.js');
        await modClean.clean();
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // command
    this.smartcli.addCommand('command').subscribe(
      async (argv) => {
        const modCommand = await import('./mod_command/index.js');
        await modCommand.command();
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // command
    this.smartcli.addCommand('git').subscribe(
      async (argvArg) => {
        await this.npmciRef.gitManager.handleCli(argvArg);
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // build
    this.smartcli.addCommand('docker').subscribe(
      async (argvArg) => {
        await this.npmciRef.dockerManager.handleCli(argvArg);
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // node
    this.smartcli.addCommand('node').subscribe(
      async (argvArg) => {
        await this.npmciRef.nodejsManager.handleCli(argvArg);
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // npm
    this.smartcli.addCommand('npm').subscribe(
      async (argvArg) => {
        await this.npmciRef.npmManager.handleCli(argvArg);
      },
      (err) => {
        console.log(err);
      }
    );

    // trigger
    this.smartcli.addCommand('ssh').subscribe(
      async (argvArg) => {
        const modSsh = await import('./mod_ssh/index.js');
        await modSsh.handleCli(argvArg);
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );

    // trigger
    this.smartcli.addCommand('trigger').subscribe(
      async (argv) => {
        const modTrigger = await import('./mod_trigger/index.js');
        await modTrigger.trigger();
      },
      (err) => {
        console.log(err);
        process.exit(1);
      }
    );
  }

  public startParse = () => {
    this.smartcli.startParse();
  };
}
