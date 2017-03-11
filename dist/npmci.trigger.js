"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
let triggerValueRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|?([a-zA-Z0-9\.\-\/]*)/;
exports.trigger = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now running triggers');
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_TRIGGER_*', evaluateTrigger);
});
let evaluateTrigger = (triggerEnvVarArg) => __awaiter(this, void 0, void 0, function* () {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUkxQyxJQUFJLGlCQUFpQixHQUFHLGdHQUFnRyxDQUFBO0FBRTdHLFFBQUEsT0FBTyxHQUFHO0lBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDOUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQUcsQ0FBTyxnQkFBZ0I7SUFDM0MsSUFBSSx1QkFBdUIsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtJQUN0RSxJQUFJLFdBQVcsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM1QyxJQUFJLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUMvQyxJQUFJLHdCQUF3QixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3pELElBQUksWUFBWSxHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdDLElBQUksZ0JBQWdCLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsdUJBQXVCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsZ0JBQWdCLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUE7SUFDdEMsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsWUFBWSxHQUFHLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzdGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLGNBQWMsR0FBRyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0FBQ3BLLENBQUMsQ0FBQSxDQUFBIn0=