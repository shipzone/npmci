import { logger } from './npmci.logging';
import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';
import { Npmci } from './npmci.classes.npmci';

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
        const modClean = await import('./mod_clean/index');
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
        const modCommand = await import('./mod_command/index');
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
        const modSsh = await import('./mod_ssh/index');
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
        const modTrigger = await import('./mod_trigger/index');
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
