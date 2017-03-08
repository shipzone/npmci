import * as plugins from './npmci.plugins'

let nvmSourceString: string = ''
export let nvmAvailable: boolean = false
let checkNvm = () => {
  let localExec: any = plugins.shelljs.exec
  if (localExec(`bash -c "source /usr/local/nvm/nvm.sh"`, { silent: true }).code === 0) {
    nvmSourceString = `source /usr/local/nvm/nvm.sh && `
    nvmAvailable = true
  } else if (localExec(`bash -c "source ~/.nvm/nvm.sh"`, { silent: true }).code === 0) {
    nvmSourceString = `source ~/.nvm/nvm.sh && `
    nvmAvailable = true
  };
}
checkNvm()

/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
export let bash = async (commandArg: string, retryArg: number = 2, bareArg: boolean = false): Promise<string> => {
  let exitCode: number
  let stdOut: string
  let execResult
  let failOnError: boolean = true
  if (retryArg === -1) {
    failOnError = false
    retryArg = 0
  }
  if (!process.env.NPMTS_TEST) { // NPMTS_TEST is used during testing
    for (let i = 0; i <= retryArg; i++) {
      if (!bareArg) {
        execResult = plugins.shelljs.exec(
          `bash -c "${nvmSourceString} ${commandArg}"`
        )
      } else {
        execResult = plugins.shelljs.exec(commandArg)
      }
      exitCode = execResult.code
      stdOut = execResult.stdout

      // determine how bash reacts to error and success
      if (exitCode !== 0 && i === retryArg) { // something went wrong and retries are exhausted
        if (failOnError) {
          plugins.beautylog.error('something went wrong and retries are exhausted')
          process.exit(1)
        }
      } else if (exitCode === 0) { // everything went fine, or no error wanted
        i = retryArg + 1 // retry +1 breaks for loop, if everything works out ok retrials are not wanted
      } else {
        plugins.beautylog.warn('Something went wrong! Exit Code: ' + exitCode.toString())
        plugins.beautylog.info('Retry ' + (i + 1).toString() + ' of ' + retryArg.toString())
      }
    }
  } else {
    plugins.beautylog.log('ShellExec would be: ' + commandArg)
  }
}

/**
 * bashBare allows usage of bash without sourcing any files like nvm
 */
export let bashBare = (commandArg: string, retryArg: number = 2): Promise<string> => {
  return bash(commandArg, retryArg, true)
}

/**
 * bashNoError allows executing stuff without throwing an error
 */
export let bashNoError = (commandArg: string): Promise<string> => {
  return bash(commandArg, -1)
}
