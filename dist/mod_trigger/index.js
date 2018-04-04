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
const plugins = require("./mod.plugins");
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
    plugins.request.post('https://gitlab.com/api/v3/projects/' + regexProjectId + '/trigger/builds', {
        form: { token: regexProjectTriggerToken, ref: regexRefName }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfdHJpZ2dlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBR3pDLElBQUksaUJBQWlCLEdBQUcsZ0dBQWdHLENBQUM7QUFFOUcsUUFBQSxPQUFPLEdBQUcsR0FBUyxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZGLENBQUMsQ0FBQSxDQUFDO0FBRUYsSUFBSSxlQUFlLEdBQUcsQ0FBTSxnQkFBZ0IsRUFBQyxFQUFFO0lBQzdDLElBQUksdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDdkUsSUFBSSxXQUFXLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsSUFBSSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEQsSUFBSSx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRCxJQUFJLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QyxJQUFJLGdCQUFnQixDQUFDO0lBQ3JCLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLGdCQUFnQixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGdCQUFnQixHQUFHLGlCQUFpQixDQUFDO0lBQ3ZDLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLFlBQVksR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxjQUFjLEdBQUcsaUJBQWlCLEVBQUU7UUFDL0YsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLHdCQUF3QixFQUFFLEdBQUcsRUFBRSxZQUFZLEVBQUU7S0FDN0QsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFBLENBQUMifQ==