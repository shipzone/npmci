import * as plugins from './mod.plugins';
import { bash } from '../npmci.bash';
import { logger } from '../npmci.logging';

const triggerValueRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|?([a-zA-Z0-9\.\-\/]*)/;

export let trigger = async () => {
  logger.log('info', 'now running triggers');
  await plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TRIGGER_*', evaluateTrigger);
};

const evaluateTrigger = async triggerEnvVarArg => {
  const triggerRegexResultArray = triggerValueRegex.exec(triggerEnvVarArg);
  const regexDomain = triggerRegexResultArray[1];
  const regexProjectId = triggerRegexResultArray[2];
  const regexProjectTriggerToken = triggerRegexResultArray[3];
  const regexRefName = triggerRegexResultArray[4];
  let regexTriggerName;
  if (triggerRegexResultArray.length === 6) {
    regexTriggerName = triggerRegexResultArray[5];
  } else {
    regexTriggerName = 'Unnamed Trigger';
  }
  logger.log('info', 'Found Trigger!');
  logger.log('info', 'triggering build for ref ' + regexRefName + ' of ' + regexTriggerName);
  plugins.smartrequest.postFormData(
    'https://gitlab.com/api/v3/projects/' + regexProjectId + '/trigger/builds',
    {},
    [
      {
        name: 'token',
        payload: regexProjectTriggerToken,
        type: 'string'
      },
      {
        name: 'ref',
        payload: regexRefName,
        type: 'string'
      }
    ]
  );
};
