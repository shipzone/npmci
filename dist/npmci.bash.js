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
const paths = require("./npmci.paths");
const smartq = require("smartq");
/**
 * wether nvm is available or not
 */
exports.nvmAvailable = smartq.defer();
exports.yarnAvailable = smartq.defer();
/**
 * the smartshell instance for npmci
 */
let npmciSmartshell = new plugins.smartshell.Smartshell({
    executor: 'bash',
    sourceFilePaths: []
});
/**
 * check for tools.
 */
let checkToolsAvailable = () => __awaiter(this, void 0, void 0, function* () {
    // check for nvm
    if (!process.env.NPMTS_TEST) {
        if ((yield plugins.smartshell.execSilent(`bash -c "source /usr/local/nvm/nvm.sh"`)).exitCode === 0) {
            npmciSmartshell.addSourceFiles([`/usr/local/nvm/nvm.sh`]);
            exports.nvmAvailable.resolve(true);
        }
        else if ((yield plugins.smartshell.execSilent(`bash -c "source ~/.nvm/nvm.sh"`)).exitCode === 0) {
            npmciSmartshell.addSourceFiles([`~/.nvm/nvm.sh`]);
            exports.nvmAvailable.resolve(true);
        }
        else {
            exports.nvmAvailable.resolve(false);
        }
        // check for yarn
        yield plugins.smartshell.which('yarn').then(() => __awaiter(this, void 0, void 0, function* () {
            yield plugins.smartshell.exec(`yarn config set cache-folder ${plugins.path.join(paths.cwd, '.yarn')}`);
            exports.yarnAvailable.resolve(true);
        }), () => { exports.yarnAvailable.resolve(false); });
    }
    else {
        exports.nvmAvailable.resolve(true);
        exports.yarnAvailable.resolve(true);
    }
});
checkToolsAvailable();
/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
exports.bash = (commandArg, retryArg = 2) => __awaiter(this, void 0, void 0, function* () {
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
            if (process.env.DEBUG_NPMCI === 'true') {
                console.log(commandArg);
            }
            execResult = yield npmciSmartshell.exec(commandArg);
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
 * bashNoError allows executing stuff without throwing an error
 */
exports.bashNoError = (commandArg) => __awaiter(this, void 0, void 0, function* () {
    return yield exports.bash(commandArg, -1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyx1Q0FBc0M7QUFFdEMsaUNBQWdDO0FBRWhDOztHQUVHO0FBQ1EsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBVyxDQUFBO0FBQ3RDLFFBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQVcsQ0FBQTtBQUNsRDs7R0FFRztBQUNILElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEQsUUFBUSxFQUFFLE1BQU07SUFDaEIsZUFBZSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxJQUFJLG1CQUFtQixHQUFHLEdBQVMsRUFBRTtJQUNuQyxnQkFBZ0I7SUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQ0QsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDL0YsQ0FBQyxDQUFDLENBQUM7WUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUUsdUJBQXVCLENBQUUsQ0FBQyxDQUFBO1lBQzNELG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1IsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDdkYsQ0FBQyxDQUFDLENBQUM7WUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUUsZUFBZSxDQUFFLENBQUMsQ0FBQTtZ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