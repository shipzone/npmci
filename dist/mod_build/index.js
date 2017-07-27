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
const npmciMods = require("../npmci.mods");
/**
 * builds for a specific service
 */
exports.build = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    console.log(argvArg);
    let whatToPublish = argvArg._[1];
    switch (whatToPublish) {
        case 'docker':
            let modDocker = yield npmciMods.modDocker.load();
            yield modDocker.build(argvArg);
            break;
        default:
            plugins.beautylog.log('build target ' + whatToPublish + ' not recognised!');
    }
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfYnVpbGQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUd4QywyQ0FBMEM7QUFPMUM7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRyxDQUFPLE9BQU87SUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNwQixJQUFJLGFBQWEsR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdEIsS0FBSyxRQUFRO1lBQ1gsSUFBSSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQ2hELE1BQU0sU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM5QixLQUFLLENBQUE7UUFDUDtZQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxhQUFhLEdBQUcsa0JBQWtCLENBQUMsQ0FBQTtJQUMvRSxDQUFDO0lBQ0QsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUEifQ==