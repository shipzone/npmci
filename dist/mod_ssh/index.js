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
                process.exit(1);
        }
    }
    else {
        plugins.beautylog.error(`>>npmci ssh ...<< please specify an action!`);
        process.exit(1);
    }
});
/**
 * checks if not undefined
 */
let notUndefined = (stringArg) => {
    return stringArg && stringArg !== 'undefined' && stringArg !== '##';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2Rfc3NoL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsSUFBSSxXQUF5QyxDQUFDO0FBRW5DLFFBQUEsU0FBUyxHQUFHLENBQU0sT0FBTyxFQUFDLEVBQUU7SUFDckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxlQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxNQUFNLGtCQUFrQixDQUFDLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7UUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksWUFBWSxHQUFHLENBQUMsU0FBaUIsRUFBRSxFQUFFO0lBQ3ZDLE1BQU0sQ0FBQyxTQUFTLElBQUksU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDO0FBQ3RFLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsR0FBUyxFQUFFO0lBQzlCLFdBQVcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxvQkFBb0I7SUFDdEUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ25GLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzVCLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO0lBQzFFLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQUVGOztHQUVHO0FBQ0gsSUFBSSxjQUFjLEdBQUcsQ0FBTyxlQUF1QixFQUFFLEVBQUU7SUFDckQsSUFBSSxXQUFXLEdBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QyxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMzQixNQUFNLENBQUM7QUFDVCxDQUFDLENBQUEsQ0FBQyJ9