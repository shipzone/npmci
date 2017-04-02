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
        ;
        // check for yarn
        yield plugins.smartshell.which('yarn').then(() => {
            plugins.smartshell.exec(`yarn config set cache-folder ${plugins.path.join(paths.cwd, '.yarn')}`);
            exports.yarnAvailable.resolve(true);
        }, () => { exports.yarnAvailable.resolve(false); });
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
                execResult = yield npmciSmartshell.exec(commandArg);
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
        yield plugins.smartdelay.delayFor(100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyx1Q0FBc0M7QUFFdEMsaUNBQWdDO0FBRWhDOztHQUVHO0FBQ1EsUUFBQSxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBVyxDQUFBO0FBQ3RDLFFBQUEsYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQVcsQ0FBQTtBQUNsRDs7R0FFRztBQUNILElBQUksZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUM7SUFDdEQsUUFBUSxFQUFFLE1BQU07SUFDaEIsZUFBZSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQyxDQUFBO0FBRUY7O0dBRUc7QUFDSCxJQUFJLG1CQUFtQixHQUFHO0lBQ3hCLGdCQUFnQjtJQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsQ0FDRCxDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsd0NBQXdDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUMvRixDQUFDLENBQUMsQ0FBQztZQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBRSx1QkFBdUIsQ0FBRSxDQUFDLENBQUE7WUFDM0Qsb0JBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDNUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDUixDQUFDLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUN2RixDQUFDLENBQUMsQ0FBQztZQUNELGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBRSxlQUFlLENBQUUsQ0FBQyxDQUFBO1lBQ25ELG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLG9CQUFZLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFBQSxDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUN6QztZQUNFLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUNoRyxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM3QixDQUFDLEVBQ0QsUUFBUSxxQkFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDLENBQUMsQ0FDdkMsQ0FBQTtJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLG9CQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzFCLHFCQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUNELG1CQUFtQixFQUFFLENBQUE7QUFFckI7Ozs7R0FJRztBQUNRLFFBQUEsSUFBSSxHQUFHLENBQU8sVUFBa0IsRUFBRSxXQUFtQixDQUFDLEVBQUUsVUFBbUIsS0FBSztJQUN6RixNQUFNLG9CQUFZLENBQUMsT0FBTyxDQUFBLENBQUMsOEJBQThCO0lBQ3pELElBQUksVUFBMEMsQ0FBQTtJQUU5Qyx1QkFBdUI7SUFDdkIsSUFBSSxXQUFXLEdBQVksSUFBSSxDQUFBO0lBQy9CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUNuQixRQUFRLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLFVBQVUsR0FBRyxNQUFNLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDckQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFVBQVUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ3hELENBQUM7WUFFRCxpREFBaUQ7WUFDakQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7b0JBQ3pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckMsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUEsQ0FBQywrRUFBK0U7WUFDbEcsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDNUYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtZQUN0RixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxDQUFBO1FBQzFELE1BQU0sT0FBTyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDdEMsVUFBVSxHQUFHO1lBQ1gsUUFBUSxFQUFFLENBQUM7WUFDWCxNQUFNLEVBQUUsWUFBWTtTQUNyQixDQUFBO0lBQ0gsQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFBO0FBQzFCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxDQUFPLFVBQWtCLEVBQUUsV0FBbUIsQ0FBQztJQUNuRSxNQUFNLENBQUMsTUFBTSxZQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMvQyxDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxXQUFXLEdBQUcsQ0FBTyxVQUFrQjtJQUNoRCxNQUFNLENBQUMsTUFBTSxZQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFBLENBQUEifQ==