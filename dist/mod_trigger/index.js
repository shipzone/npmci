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
    plugins.request.post('https://gitlab.com/api/v3/projects/' + regexProjectId + '/trigger/builds', { form: { token: regexProjectTriggerToken, ref: regexRefName }
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfdHJpZ2dlci9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBR3hDLElBQUksaUJBQWlCLEdBQUcsZ0dBQWdHLENBQUE7QUFFN0csUUFBQSxPQUFPLEdBQUcsR0FBUyxFQUFFO0lBQzlCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7SUFDOUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQyxDQUFBO0FBQ3RGLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQUcsQ0FBTyxnQkFBZ0IsRUFBRSxFQUFFO0lBQy9DLElBQUksdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDdEUsSUFBSSxXQUFXLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsSUFBSSxjQUFjLEdBQUcsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDL0MsSUFBSSx3QkFBd0IsR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RCxJQUFJLFlBQVksR0FBRyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM3QyxJQUFJLGdCQUFnQixDQUFBO0lBQ3BCLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLGdCQUFnQixHQUFHLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGdCQUFnQixHQUFHLGlCQUFpQixDQUFBO0lBQ3RDLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJCQUEyQixHQUFHLFlBQVksR0FBRyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQTtJQUM3RixPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDbEIscUNBQXFDLEdBQUcsY0FBYyxHQUFHLGlCQUFpQixFQUMxRSxFQUFFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSx3QkFBd0IsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFO0tBQy9ELENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQSxDQUFBIn0=