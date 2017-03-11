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
/**
 * checks if not undefined
 */
let notUndefined = (stringArg) => {
    return (stringArg && stringArg !== 'undefined' && stringArg !== '##');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc3NoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc3NoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFFMUMsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUE7QUFDbEMsSUFBSSxXQUF5QyxDQUFBO0FBRTdDOztHQUVHO0FBQ1EsUUFBQSxHQUFHLEdBQUc7SUFDZixXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBLENBQUMsb0JBQW9CO0lBQ3JFLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1QixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUE7SUFDM0IsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtJQUN6RSxDQUFDO0lBQUEsQ0FBQztBQUNKLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGNBQWMsR0FBRyxDQUFPLGVBQWU7SUFDekMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQzNDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDOUMsTUFBTSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUFBLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLHNCQUFzQixDQUFBO1FBQ3RCLE1BQU0sQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFBQSxDQUFDO0lBRUYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUMxQixNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUcsQ0FBQyxTQUFpQjtJQUNuQyxNQUFNLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLENBQUE7QUFDdkUsQ0FBQyxDQUFBIn0=