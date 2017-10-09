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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfbnBtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFFeEMsOENBS3NCO0FBRXRCOzs7R0FHRztBQUNRLFFBQUEsU0FBUyxHQUFHLENBQU8sT0FBTyxFQUFFLEVBQUU7SUFDdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxPQUFPLEVBQUUsQ0FBQTtnQkFDZixLQUFLLENBQUE7WUFDUCxLQUFLLFNBQVM7Z0JBQ1osTUFBTSxPQUFPLEVBQUUsQ0FBQTtnQkFDZixLQUFLLENBQUE7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxZQUFJLEVBQUUsQ0FBQTtnQkFDWixLQUFLLENBQUE7WUFDUCxLQUFLLFNBQVM7Z0JBQ1osTUFBTSxPQUFPLEVBQUUsQ0FBQTtnQkFDZixLQUFLLENBQUE7WUFDUDtnQkFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsTUFBTSxrQkFBa0IsQ0FBQyxDQUFBO2dCQUMvRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyRUFBMkUsQ0FBQyxDQUFBO1FBQ2xHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLE9BQU8sR0FBRyxHQUFTLEVBQUU7SUFDdkIsSUFBSSxXQUFXLEdBQVcsbUNBQW1DLENBQUE7SUFDN0QsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7SUFDbEQsSUFBSSxlQUFlLEdBQVcsV0FBVyxHQUFHLFFBQVEsQ0FBQTtJQUNwRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLE9BQU8sR0FBRyxHQUFTLEVBQUU7SUFDdkIsTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxPQUFPLEdBQUcsR0FBd0IsRUFBRTtJQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO0lBQ3RELEVBQUUsQ0FBQyxDQUFDLE1BQU0sMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE1BQU0saUJBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUM1QixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDM0IsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRVUsUUFBQSxJQUFJLEdBQUcsR0FBd0IsRUFBRTtJQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQzdDLE1BQU0saUJBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUN6QixDQUFDLENBQUEsQ0FBQSJ9