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
const npmci_bash_1 = require("../npmci.bash");
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'install':
                yield install();
                break;
            case 'prepare':
                yield prepare();
                break;
            case 'test':
                yield exports.test();
                break;
            case 'publish':
                yield publish();
                break;
            default:
                plugins.beautylog.error(`>>npmci npm ...<< action >>${action}<< not supported`);
                process.exit(1);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci npm ...<< cli arguments invalid... Please read the documentation.`);
        process.exit(1);
    }
});
/**
 * authenticates npm with token from env var
 */
let prepare = () => __awaiter(this, void 0, void 0, function* () {
    let npmrcPrefix = '//registry.npmjs.org/:_authToken=';
    let npmToken = process.env.NPMCI_TOKEN_NPM;
    let npmrcFileString = npmrcPrefix + npmToken;
    if (npmToken) {
        plugins.beautylog.info('found access token');
    }
    else {
        plugins.beautylog.error('no access token found! Exiting!');
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc');
    return;
});
let publish = () => __awaiter(this, void 0, void 0, function* () {
    yield npmci_bash_1.bash('npm publish');
});
let install = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now installing dependencies:');
    if (yield npmci_bash_1.yarnAvailable.promise) {
        yield npmci_bash_1.bash('yarn install');
    }
    else {
        yield npmci_bash_1.bash('npm install');
    }
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now starting tests:');
    yield npmci_bash_1.bash('yarn test');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfbnBtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFFeEMsOENBS3NCO0FBRXRCOzs7R0FHRztBQUNRLFFBQUEsU0FBUyxHQUFHLENBQU8sT0FBTztJQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksRUFBRSxDQUFBO2dCQUNaLEtBQUssQ0FBQTtZQUNQLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDhCQUE4QixNQUFNLGtCQUFrQixDQUFDLENBQUE7Z0JBQy9FLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDJFQUEyRSxDQUFDLENBQUE7UUFDbEcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksT0FBTyxHQUFHO0lBQ1osSUFBSSxXQUFXLEdBQVcsbUNBQW1DLENBQUE7SUFDN0QsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7SUFDbEQsSUFBSSxlQUFlLEdBQVcsV0FBVyxHQUFHLFFBQVEsQ0FBQTtJQUNwRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLE9BQU8sR0FBRztJQUNaLE1BQU0saUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksT0FBTyxHQUFHO0lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUN0RCxFQUFFLENBQUMsQ0FBQyxNQUFNLDBCQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLGlCQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVVLFFBQUEsSUFBSSxHQUFHO0lBQ2hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDN0MsTUFBTSxpQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3pCLENBQUMsQ0FBQSxDQUFBIn0=