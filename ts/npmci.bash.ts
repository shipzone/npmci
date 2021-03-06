import { logger } from './npmci.logging';
import * as plugins from './npmci.plugins';
import * as paths from './npmci.paths';

import * as smartpromise from '@pushrocks/smartpromise';

/**
 * wether nvm is available or not
 */
export let nvmAvailable = smartpromise.defer<boolean>();
/**
 * the smartshell instance for npmci
 */
const npmciSmartshell = new plugins.smartshell.Smartshell({
  executor: 'bash',
  sourceFilePaths: []
});

/**
 * check for tools.
 */
const checkToolsAvailable = async () => {
  // check for nvm
  if (!process.env.NPMTS_TEST) {
    if (
      (await npmciSmartshell.execSilent(`bash -c "source /usr/local/nvm/nvm.sh"`)).exitCode === 0
    ) {
      npmciSmartshell.shellEnv.addSourceFiles([`/usr/local/nvm/nvm.sh`]);
      nvmAvailable.resolve(true);
    } else if (
      (await npmciSmartshell.execSilent(`bash -c "source ~/.nvm/nvm.sh"`)).exitCode === 0
    ) {
      npmciSmartshell.shellEnv.addSourceFiles([`~/.nvm/nvm.sh`]);
      nvmAvailable.resolve(true);
    } else {
      nvmAvailable.resolve(false);
    }
  } else {
    nvmAvailable.resolve(true);
  }
};
checkToolsAvailable();

/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
export let bash = async (commandArg: string, retryArg: number = 2): Promise<string> => {
  await nvmAvailable.promise; // make sure nvm check has run
  let execResult: plugins.smartshell.IExecResult;

  // determine if we fail
  let failOnError: boolean = true;
  if (retryArg === -1) {
    failOnError = false;
    retryArg = 0;
  }

  if (!process.env.NPMTS_TEST) {
    // NPMTS_TEST is used during testing
    for (let i = 0; i <= retryArg; i++) {
      if (process.env.DEBUG_NPMCI === 'true') {
        console.log(commandArg);
      }
      execResult = await npmciSmartshell.exec(commandArg);

      // determine how bash reacts to error and success
      if (execResult.exitCode !== 0 && i === retryArg) {
        // something went wrong and retries are exhausted
        if (failOnError) {
          logger.log('error', 'something went wrong and retries are exhausted');
          process.exit(1);
        }
      } else if (execResult.exitCode === 0) {
        // everything went fine, or no error wanted
        i = retryArg + 1; // retry +1 breaks for loop, if everything works out ok retrials are not wanted
      } else {
        logger.log('warn', 'Something went wrong! Exit Code: ' + execResult.exitCode.toString());
        logger.log('info', 'Retry ' + (i + 1).toString() + ' of ' + retryArg.toString());
      }
    }
  } else {
    logger.log('info', 'ShellExec would be: ' + commandArg);
    execResult = {
      exitCode: 0,
      stdout: 'testOutput'
    };
  }
  return execResult.stdout;
};

/**
 * bashNoError allows executing stuff without throwing an error
 */
export let bashNoError = async (commandArg: string): Promise<string> => {
  return await bash(commandArg, -1);
};
