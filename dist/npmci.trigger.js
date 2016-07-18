"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
let triggerValueRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|?([a-zA-Z0-9\.\-\/]*)/;
exports.trigger = function () {
    let done = plugins.q.defer();
    plugins.beautylog.info("now running triggers");
    plugins.smartparam.forEachMinimatch(process.env, "NPMCI_TRIGGER_*", evaluateTrigger);
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
    if (triggerRegexResultArray.length == 6) {
        regexTriggerName = triggerRegexResultArray[5];
    }
    else {
        regexTriggerName = "Unnamed Trigger";
    }
    plugins.beautylog.info("Found Trigger!");
    plugins.beautylog.log("triggering build for ref " + regexRefName + " of " + regexTriggerName);
    plugins.request.post("https://gitlab.com/api/v3/projects/" + regexProjectId + "/trigger/builds", { form: { token: regexProjectTriggerToken, ref: regexRefName } });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBSzNDLElBQUksaUJBQWlCLEdBQUcsZ0dBQWdHLENBQUM7QUFFOUcsZUFBTyxHQUFHO0lBQ2pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDckYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDbkMsSUFBSSx1QkFBdUIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2RSxJQUFJLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxJQUFJLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxJQUFJLHdCQUF3QixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELElBQUksWUFBWSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLElBQUksZ0JBQWdCLENBQUM7SUFDckIsRUFBRSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7SUFDekMsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsWUFBWSxHQUFHLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLGNBQWMsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZLLENBQUMsQ0FBQSJ9