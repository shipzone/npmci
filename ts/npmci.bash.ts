import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'

import * as smartq from 'smartq'

/**
 * wether nvm is available or not
 */
export let nvmAvailable = smartq.defer<boolean>()
export let yarnAvailable = smartq.defer<boolean>()
/**
 * the smartshell instance for npmci
 */
let npmciSmartshell = new plugins.smartshell.Smartshell({
  executor: 'bash',
  sourceFilePaths: []
})

/**
 * check for tools.
 */
let checkToolsAvailable = async () => {
  // check for nvm
  if (
    (await plugins.smartshell.execSilent(`bash -c "source /usr/local/nvm/nvm.sh"`)).exitCode === 0
  ) {
    npmciSmartshell.addSourceFiles([`/usr/local/nvm/nvm.sh`])
    nvmAvailable.resolve(true)
  } else if (
    (await plugins.smartshell.execSilent(`bash -c "source ~/.nvm/nvm.sh"`)).exitCode === 0
  ) {
    npmciSmartshell.addSourceFiles([`~/.nvm/nvm.sh`])
    nvmAvailable.resolve(true)
  } else {
    nvmAvailable.resolve(false)
  };

  // check for yarn
  await plugins.smartshell.which('yarn').then(
    () => {
      plugins.smartshell.exec(`yarn config set cache-folder ${plugins.path.join(paths.cwd,'.yarn')}`)
      yarnAvailable.resolve(true)
    },
    () => { yarnAvailable.resolve(false) }
  )
}
checkToolsAvailable()

/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
export let bash = async (commandArg: string, retryArg: number = 2, bareArg: boolean = false): Promise<string> => {
  await nvmAvailable.promise // make sure nvm check has run
  let execResult: plugins.smartshell.IExecResult

  // determine if we fail
  let failOnError: boolean = true
  if (retryArg === -1) {
    failOnError = false
    retryArg = 0
  }

  if (!process.env.NPMTS_TEST) { // NPMTS_TEST is used during testing
    for (let i = 0; i <= retryArg; i++) {
      if (!bareArg) {
        execResult = await npmciSmartshell.exec(commandArg)
      } else {
        execResult = await plugins.smartshell.exec(commandArg)
      }

      // determine how bash reacts to error and success
      if (execResult.exitCode !== 0 && i === retryArg) { // something went wrong and retries are exhausted
        if (failOnError) {
          plugins.beautylog.error('something went wrong and retries are exhausted')
          process.exit(1)
        }
      } else if (execResult.exitCode === 0) { // everything went fine, or no error wanted
        i = retryArg + 1 // retry +1 breaks for loop, if everything works out ok retrials are not wanted
      } else {
        plugins.beautylog.warn('Something went wrong! Exit Code: ' + execResult.exitCode.toString())
        plugins.beautylog.info('Retry ' + (i + 1).toString() + ' of ' + retryArg.toString())
      }
    }
  } else {
    plugins.beautylog.log('ShellExec would be: ' + commandArg)
    await plugins.smartdelay.delayFor(100)
    execResult = {
      exitCode: 0,
      stdout: 'testOutput'
    }
  }
  return execResult.stdout
}

/**
 * bashBare allows usage of bash without sourcing any files like nvm
 */
export let bashBare = async (commandArg: string, retryArg: number = 2): Promise<string> => {
  return await bash(commandArg, retryArg, true)
}

/**
 * bashNoError allows executing stuff without throwing an error
 */
export let bashNoError = async (commandArg: string): Promise<string> => {
  return await bash(commandArg, -1)
}
