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
/**
 * servezoneRegex is the regex that parses the servezone connection data
 * parses strings in the form of "servezone.example.com|3000|somepassword"
 */
let servezoneRegex = /^(.*)\|(.*)\|(.*)/;
/**
 * holds the results of the parsed servezone env string
 */
let servezoneRegexResultArray = servezoneRegex.exec(process.env.NPMCI_SERVEZONE);
/**
 * the data object that is used for the smartsocket client object
 */
let smartsocketClientConstructorOptions = {
    alias: 'npmci',
    password: servezoneRegexResultArray[3],
    port: parseInt(servezoneRegexResultArray[2]),
    role: 'ci',
    url: servezoneRegexResultArray[1]
};
/**
 * the main run function to submit a service to a servezone
 */
exports.run = (configArg) => __awaiter(this, void 0, void 0, function* () {
    new plugins.smartsocket.SmartsocketClient(smartsocketClientConstructorOptions);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc2VydmV6b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc2VydmV6b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFFMUM7OztHQUdHO0FBQ0gsSUFBSSxjQUFjLEdBQUcsbUJBQW1CLENBQUE7QUFFeEM7O0dBRUc7QUFDSCxJQUFJLHlCQUF5QixHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUVoRjs7R0FFRztBQUNILElBQUksbUNBQW1DLEdBQUc7SUFDdEMsS0FBSyxFQUFFLE9BQU87SUFDZCxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksRUFBRSxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxFQUFFLElBQUk7SUFDVixHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0NBQ3BDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsR0FBRyxHQUFHLENBQU8sU0FBUztJQUM3QixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQ3JDLG1DQUFtQyxDQUN0QyxDQUFBO0FBQ0wsQ0FBQyxDQUFBLENBQUEifQ==