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
            default:
                plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfbnBtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFFeEMsOENBS3NCO0FBRXRCOzs7R0FHRztBQUNRLFFBQUEsU0FBUyxHQUFHLENBQU8sT0FBTztJQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFBO2dCQUNmLEtBQUssQ0FBQTtZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksRUFBRSxDQUFBO2dCQUNaLEtBQUssQ0FBQTtZQUNQO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLCtCQUErQixNQUFNLGtCQUFrQixDQUFDLENBQUE7UUFDcEYsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDRFQUE0RSxDQUFDLENBQUE7SUFDckcsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLE9BQU8sR0FBRztJQUNaLElBQUksV0FBVyxHQUFXLG1DQUFtQyxDQUFBO0lBQzdELElBQUksUUFBUSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0lBQ2xELElBQUksZUFBZSxHQUFXLFdBQVcsR0FBRyxRQUFRLENBQUE7SUFDcEQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sQ0FBQTtBQUNSLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxPQUFPLEdBQUc7SUFDWixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLE1BQU0sMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0saUJBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDM0IsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRVUsUUFBQSxJQUFJLEdBQUc7SUFDaEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM3QyxNQUFNLGlCQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDekIsQ0FBQyxDQUFBLENBQUEifQ==