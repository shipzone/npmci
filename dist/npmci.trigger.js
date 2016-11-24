"use strict";
const plugins = require("./npmci.plugins");
let triggerValueRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|?([a-zA-Z0-9\.\-\/]*)/;
exports.trigger = function () {
    let done = plugins.q.defer();
    plugins.beautylog.info('now running triggers');
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TRIGGER_*', evaluateTrigger);
    done.resolve();
    return done.promise;
};
let evaluateTrigger = (triggerEnvVarArg) => {
    let triggerRegexResultArray = triggerValueRegex.exec(triggerEnvVarArg);
    let regexDomain = triggerRegexResultArray[1];
    let regexProjectId = triggerRegexResultArray[2];
    let regexProjectTriggerToken = triggerRegexResultArray[3];
    let regexRefName = triggerRegexResultArray[4];
    let regexTriggerName;
    if (triggerRegexResultArray.length === 6) {
        regexTriggerName = triggerRegexResultArray[5];
    }
    else {
        regexTriggerName = 'Unnamed Trigger';
    }
    plugins.beautylog.info('Found Trigger!');
    plugins.beautylog.log('triggering build for ref ' + regexRefName + ' of ' + regexTriggerName);
    plugins.request.post('https://gitlab.com/api/v3/projects/' + regexProjectId + '/trigger/builds', { form: { token: regexProjectTriggerToken, ref: regexRefName } });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUkxQyxJQUFJLGlCQUFpQixHQUFHLGdHQUFnRyxDQUFBO0FBRTdHLFFBQUEsT0FBTyxHQUFHO0lBQ2pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtJQUM5QyxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFDcEYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDbkMsSUFBSSx1QkFBdUIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN0RSxJQUFJLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1QyxJQUFJLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvQyxJQUFJLHdCQUF3QixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pELElBQUksWUFBWSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdDLElBQUksZ0JBQWdCLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUE7SUFDeEMsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsWUFBWSxHQUFHLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzdGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLGNBQWMsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3RLLENBQUMsQ0FBQSJ9