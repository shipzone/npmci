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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyx1Q0FBc0M7QUFFdEMsaUNBQWdDO0FBRWhDOztHQUVHO0FBQ1EsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBVyxDQUFBO0FBQ3RDLFFBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQVcsQ0FBQTtBQUNsRDs7R0FFRztBQUNILElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEQsUUFBUSxFQUFFLE1BQU07SUFDaEIsZUFBZSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxJQUFJLG1CQUFtQixHQUFHO0lBQ3hCLGdCQUFnQjtJQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FDRCxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUMvRixDQUFDLENBQUMsQ0FBQztZQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBRSx1QkFBdUIsQ0FBRSxDQUFDLENBQUE7WUFDM0Qsb0JBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUN2RixDQUFDLENBQUMsQ0FBQztZQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBRSxlQUFlLENBQUUsQ0FBQyxDQUFBO1lBQ25ELG9CQUFZ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