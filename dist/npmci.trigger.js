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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFLM0MsSUFBSSxpQkFBaUIsR0FBRyxnR0FBZ0csQ0FBQztBQUU5RyxRQUFBLE9BQU8sR0FBRztJQUNqQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ3JGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUVELElBQUksZUFBZSxHQUFHLENBQUMsZ0JBQWdCO0lBQ25DLElBQUksdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdkUsSUFBSSxXQUFXLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsSUFBSSx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxJQUFJLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLGdCQUFnQixDQUFDO0lBQ3JCLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLGdCQUFnQixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0lBQ3pDLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLFlBQVksR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxjQUFjLEdBQUcsaUJBQWlCLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsd0JBQXdCLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN2SyxDQUFDLENBQUEifQ==