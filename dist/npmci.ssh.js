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
let sshRegex = /^(.*)\|(.*)\|(.*)/;
let sshInstance;
/**
 * checks if not undefined
 */
let notUndefined = (stringArg) => {
    return (stringArg && stringArg !== 'undefined' && stringArg !== '##');
};
/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
exports.ssh = () => __awaiter(this, void 0, void 0, function* () {
    sshInstance = new plugins.smartssh.SshInstance(); // init ssh instance
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_SSHKEY_*', evaluateSshEnv);
    if (!process.env.NPMTS_TEST) {
        sshInstance.writeToDisk();
    }
    else {
        plugins.beautylog.log('In test mode, so not storing SSH keys to disk!');
    }
    ;
});
/**
 * gets called for each found SSH ENV Var and deploys it
 */
let evaluateSshEnv = (sshkeyEnvVarArg) => __awaiter(this, void 0, void 0, function* () {
    let resultArray = sshRegex.exec(sshkeyEnvVarArg);
    let sshKey = new plugins.smartssh.SshKey();
    plugins.beautylog.info('Found SSH identity for ' + resultArray[1]);
    if (notUndefined(resultArray[1])) {
        plugins.beautylog.log('---> host defined!');
        sshKey.host = resultArray[1];
    }
    if (notUndefined(resultArray[2])) {
        plugins.beautylog.log('---> privKey defined!');
        sshKey.privKeyBase64 = resultArray[2];
    }
    ;
    if (notUndefined(resultArray[3])) {
        '---> pubKey defined!';
        sshKey.pubKeyBase64 = resultArray[3];
    }
    ;
    sshInstance.addKey(sshKey);
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc3NoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc3NoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFFMUMsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUE7QUFDbEMsSUFBSSxXQUF5QyxDQUFBO0FBRTdDOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUcsQ0FBQyxTQUFpQjtJQUNuQyxNQUFNLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUE7QUFDdkUsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLEdBQUcsR0FBRztJQUNmLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUEsQ0FBQyxvQkFBb0I7SUFDckUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBQ2xGLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMzQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksY0FBYyxHQUFHLENBQU8sZUFBZTtJQUN6QyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ2hELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRSxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUE7UUFDM0MsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDOUIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUM5QyxNQUFNLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQUEsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsc0JBQXNCLENBQUE7UUFDdEIsTUFBTSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUFBLENBQUM7SUFFRixXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzFCLE1BQU0sQ0FBQTtBQUNSLENBQUMsQ0FBQSxDQUFBIn0=