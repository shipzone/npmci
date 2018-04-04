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
        }), () => {
            exports.yarnAvailable.resolve(false);
        });
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
        // NPMTS_TEST is used during testing
        for (let i = 0; i <= retryArg; i++) {
            if (process.env.DEBUG_NPMCI === 'true') {
                console.log(commandArg);
            }
            execResult = yield npmciSmartshell.exec(commandArg);
            // determine how bash reacts to error and success
            if (execResult.exitCode !== 0 && i === retryArg) {
                // something went wrong and retries are exhausted
                if (failOnError) {
                    plugins.beautylog.error('something went wrong and retries are exhausted');
                    process.exit(1);
                }
            }
            else if (execResult.exitCode === 0) {
                // everything went fine, or no error wanted
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEyQztBQUMzQyx1Q0FBdUM7QUFFdkMsaUNBQWlDO0FBRWpDOztHQUVHO0FBQ1EsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBVyxDQUFDO0FBQ3ZDLFFBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQVcsQ0FBQztBQUNuRDs7R0FFRztBQUNILElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEQsUUFBUSxFQUFFLE1BQU07SUFDaEIsZUFBZSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQyxDQUFDO0FBRUg7O0dBRUc7QUFDSCxJQUFJLG1CQUFtQixHQUFHLEdBQVMsRUFBRTtJQUNuQyxnQkFBZ0I7SUFDaEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDNUIsRUFBRSxDQUFDLENBQ0QsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDL0YsQ0FBQyxDQUFDLENBQUM7WUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQzFELG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQ1IsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FDdkYsQ0FBQyxDQUFDLENBQUM7WUFDRCxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZ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