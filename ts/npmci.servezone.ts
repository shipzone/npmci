import * as plugins from './npmci.plugins'

/**
 * servezoneRegex is the regex that parses the servezone connection data
 * parses strings in the form of "servezone.example.com|3000|somepassword"
 */
let servezoneRegex = /^(.*)\|(.*)\|(.*)/

/**
 * holds the results of the parsed servezone env string
 */
let servezoneRegexResultArray = servezoneRegex.exec(process.env.NPMCI_SERVEZONE)

/**
 * the data object that is used for the smartsocket client object
 */
let smartsocketClientConstructorOptions = {
    alias: 'npmci',
    password: servezoneRegexResultArray[3],
    port: parseInt(servezoneRegexResultArray[2]),
    role: 'ci',
    url: servezoneRegexResultArray[1]
}

/**
 * the main run function to submit a service to a servezone
 */
export let run = async (configArg) => {
    new plugins.smartsocket.SmartsocketClient(
        smartsocketClientConstructorOptions
    )
}
