import * as plugins from './npmci.plugins'
import { prepare } from './npmci.prepare'
import { bash } from './npmci.bash'

let triggerValueRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|?([a-zA-Z0-9\.\-\/]*)/

export let trigger = function () {
    let done = plugins.q.defer()
    plugins.beautylog.info('now running triggers')
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TRIGGER_*', evaluateTrigger)
    done.resolve()
    return done.promise
}

let evaluateTrigger = (triggerEnvVarArg) => {
    let triggerRegexResultArray = triggerValueRegex.exec(triggerEnvVarArg)
    let regexDomain = triggerRegexResultArray[1]
    let regexProjectId = triggerRegexResultArray[2]
    let regexProjectTriggerToken = triggerRegexResultArray[3]
    let regexRefName = triggerRegexResultArray[4]
    let regexTriggerName
    if (triggerRegexResultArray.length === 6) {
        regexTriggerName = triggerRegexResultArray[5]
    } else {
        regexTriggerName = 'Unnamed Trigger'
    }
    plugins.beautylog.info('Found Trigger!')
    plugins.beautylog.log('triggering build for ref ' + regexRefName + ' of ' + regexTriggerName)
    plugins.request.post('https://gitlab.com/api/v3/projects/' + regexProjectId + '/trigger/builds', { form: { token: regexProjectTriggerToken, ref: regexRefName } })
}
