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
let sshInstance;
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'prepare':
                yield exports.prepare();
                break;
            default:
                plugins.beautylog.error(`action >>${action}<< not supported`);
        }
    }
});
/**
 * checks if not undefined
 */
let notUndefined = (stringArg) => {
    return (stringArg && stringArg !== 'undefined' && stringArg !== '##');
};
/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
exports.prepare = () => __awaiter(this, void 0, void 0, function* () {
    sshInstance = new plugins.smartssh.SshInstance(); // init ssh instance
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_SSHKEY_*', evaluateSshEnv);
    if (!process.env.NPMTS_TEST) {
        sshInstance.writeToDisk();
    }
    else {
        plugins.beautylog.log('In test mode, so not storing SSH keys to disk!');
    }
});
/**
 * gets called for each found SSH ENV Var and deploys it
 */
let evaluateSshEnv = (sshkeyEnvVarArg) => __awaiter(this, void 0, void 0, function* () {
    let sshEnvArray = sshkeyEnvVarArg.split('|');
    let sshKey = new plugins.smartssh.SshKey();
    plugins.beautylog.info('Found SSH identity for ' + sshEnvArray[1]);
    if (notUndefined(sshEnvArray[0])) {
        plugins.beautylog.log('---> host defined!');
        sshKey.host = sshEnvArray[0];
    }
    if (notUndefined(sshEnvArray[1])) {
        plugins.beautylog.log('---> privKey defined!');
        sshKey.privKeyBase64 = sshEnvArray[1];
    }
    if (notUndefined(sshEnvArray[2])) {
        plugins.beautylog.log('---> pubKey defined!');
        sshKey.pubKeyBase64 = sshEnvArray[2];
    }
    sshInstance.addKey(sshKey);
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2Rfc3NoL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsSUFBSSxXQUF5QyxDQUFBO0FBRWxDLFFBQUEsU0FBUyxHQUFHLENBQU8sT0FBTztJQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixNQUFNLGVBQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksTUFBTSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2pFLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksWUFBWSxHQUFHLENBQUMsU0FBaUI7SUFDbkMsTUFBTSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxLQUFLLElBQUksQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxPQUFPLEdBQUc7SUFDbkIsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQSxDQUFDLG9CQUFvQjtJQUNyRSxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDbEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQzNCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7SUFDekUsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGNBQWMsR0FBRyxDQUFPLGVBQXVCO0lBQ2pELElBQUksV0FBVyxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQzFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xFLEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM5QixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDN0MsTUFBTSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDdEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDMUIsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUEifQ==