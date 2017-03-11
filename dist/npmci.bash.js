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
const smartq = require("smartq");
/**
 * wether nvm is available or not
 */
exports.nvmAvailable = smartq.defer();
/**
 * the smartshell instance for npmci
 */
let npmciSmartshell = new plugins.smartshell.Smartshell({
    executor: 'bash',
    sourceFilePaths: []
});
let checkNvm = () => __awaiter(this, void 0, void 0, function* () {
    if ((yield plugins.smartshell.execSilent(`bash -c "source /usr/local/nvm/nvm.sh"`)).exitCode === 0) {
        npmciSmartshell.addSourceFiles([`/usr/local/nvm/nvm.sh && `]);
        exports.nvmAvailable.resolve(true);
    }
    else if ((yield plugins.smartshell.execSilent(`bash -c "source ~/.nvm/nvm.sh"`)).exitCode === 0) {
        npmciSmartshell.addSourceFiles([`~/.nvm/nvm.sh && `]);
        exports.nvmAvailable.resolve(true);
    }
    else {
        exports.nvmAvailable.resolve(false);
    }
    ;
});
checkNvm();
/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
exports.bash = (commandArg, retryArg = 2, bareArg = false) => __awaiter(this, void 0, void 0, function* () {
    yield exports.nvmAvailable.promise; // make sure nvm check has run
    let execResult;
    // determine if we fail
    let failOnError = true;
    if (retryArg === -1) {
        failOnError = false;
        retryArg = 0;
    }
    if (!process.env.NPMTS_TEST) {
        for (let i = 0; i <= retryArg; i++) {
            if (!bareArg) {
                execResult = yield npmciSmartshell.execSilent(commandArg);
            }
            else {
                execResult = yield plugins.smartshell.exec(commandArg);
            }
            // determine how bash reacts to error and success
            if (execResult.exitCode !== 0 && i === retryArg) {
                if (failOnError) {
                    plugins.beautylog.error('something went wrong and retries are exhausted');
                    process.exit(1);
                }
            }
            else if (execResult.exitCode === 0) {
                i = retryArg + 1; // retry +1 breaks for loop, if everything works out ok retrials are not wanted
            }
            else {
                plugins.beautylog.warn('Something went wrong! Exit Code: ' + execResult.exitCode.toString());
                plugins.beautylog.info('Retry ' + (i + 1).toString() + ' of ' + retryArg.toString());
            }
        }
    }
    else {
        plugins.beautylog.log('ShellExec would be: ' + commandArg);
        execResult = {
            exitCode: 0,
            stdout: 'testOutput'
        };
    }
    return execResult.stdout;
});
/**
 * bashBare allows usage of bash without sourcing any files like nvm
 */
exports.bashBare = (commandArg, retryArg = 2) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.bash(commandArg, retryArg, true);
});
/**
 * bashNoError allows executing stuff without throwing an error
 */
exports.bashNoError = (commandArg) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.bash(commandArg, -1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyxpQ0FBZ0M7QUFFaEM7O0dBRUc7QUFDUSxRQUFBLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFXLENBQUE7QUFFakQ7O0dBRUc7QUFDSCxJQUFJLGVBQWUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDO0lBQ3RELFFBQVEsRUFBRSxNQUFNO0lBQ2hCLGVBQWUsRUFBRSxFQUFFO0NBQ3BCLENBQUMsQ0FBQTtBQUVGLElBQUksUUFBUSxHQUFHO0lBQ2IsRUFBRSxDQUFDLENBQ0QsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDL0YsQ0FBQyxDQUFDLENBQUM7UUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxDQUFBO1FBQzdELG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1IsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDdkYsQ0FBQyxDQUFDLENBQUM7UUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFBO1FBQ3JELG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLG9CQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzdCLENBQUM7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFBLENBQUE7QUFDRCxR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