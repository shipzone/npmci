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
const buildDocker = require("./npmci.build.docker");
/**
 * builds for a specific service
 */
exports.build = (commandArg) => __awaiter(this, void 0, void 0, function* () {
    switch (commandArg) {
        case 'docker':
            yield buildDocker.build();
            break;
        default:
            plugins.beautylog.log('build target ' + commandArg + ' not recognised!');
    }
    ;
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQTBDO0FBRzFDLG9EQUFtRDtBQU9uRDs7R0FFRztBQUNRLFFBQUEsS0FBSyxHQUFHLENBQU8sVUFBVTtJQUNsQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEtBQUssUUFBUTtZQUNYLE1BQU0sV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ3pCLEtBQUssQ0FBQTtRQUNQO1lBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBO0lBQzVFLENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUEifQ==