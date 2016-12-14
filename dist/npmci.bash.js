"use strict";
const plugins = require("./npmci.plugins");
let nvmSourceString = '';
exports.nvmAvailable = false;
let checkNvm = () => {
    if (plugins.shelljs.exec(`bash -c "source /usr/local/nvm/nvm.sh"`, { silent: true }).code === 0) {
        nvmSourceString = `source /usr/local/nvm/nvm.sh && `;
        exports.nvmAvailable = true;
    }
    else if (plugins.shelljs.exec(`bash -c "source ~/.nvm/nvm.sh"`, { silent: true }).code === 0) {
        nvmSourceString = `source ~/.nvm/nvm.sh && `;
        exports.nvmAvailable = true;
    }
    ;
};
checkNvm();
/**
 * bash() allows using bash with nvm in path
 * @param commandArg - The command to execute
 * @param retryArg - The retryArg: 0 to any positive number will retry, -1 will always succeed, -2 will return undefined
 */
exports.bash = (commandArg, retryArg = 2, bareArg = false) => {
    let exitCode;
    let stdOut;
    let execResult;
    let failOnError = true;
    if (retryArg === -1) {
        failOnError = false;
        retryArg = 0;
    }
    if (!process.env.NPMTS_TEST) {
        for (let i = 0; i <= retryArg; i++) {
            if (!bareArg) {
                execResult = plugins.shelljs.exec(`bash -c "${nvmSourceString} ${commandArg}"`);
            }
            else {
                execResult = plugins.shelljs.exec(commandArg);
            }
            exitCode = execResult.code;
            stdOut = execResult.stdout;
            // determine how bash reacts to error and success
            if (exitCode !== 0 && i === retryArg) {
                if (failOnError) {
                    process.exit(1);
                }
            }
            else if (exitCode === 0) {
                i = retryArg + 1; // retry +1 breaks for loop, if everything works out ok retrials are not wanted
            }
            else {
                plugins.beautylog.warn('Something went wrong! Exit Code: ' + exitCode.toString());
                plugins.beautylog.info('Retry ' + (i + 1).toString() + ' of ' + retryArg.toString());
            }
        }
    }
    else {
        plugins.beautylog.log('ShellExec would be: ' + commandArg);
    }
    return stdOut;
};
/**
 * bashBare allows usage of bash without sourcing any files like nvm
 */
exports.bashBare = (commandArg, retryArg = 2) => {
    return exports.bash(commandArg, retryArg, true);
};
/**
 * bashNoError allows executing stuff without throwing an error
 */
exports.bashNoError = (commandArg) => {
    return exports.bash(commandArg, -1);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUUxQyxJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUE7QUFDckIsUUFBQSxZQUFZLEdBQVksS0FBSyxDQUFBO0FBQ3hDLElBQUksUUFBUSxHQUFHO0lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLEVBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixlQUFlLEdBQUcsa0NBQWtDLENBQUE7UUFDcEQsb0JBQVksR0FBRyxJQUFJLENBQUE7SUFDdkIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLGVBQWUsR0FBRywwQkFBMEIsQ0FBQTtRQUM1QyxvQkFBWSxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBQUEsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUNELFFBQVEsRUFBRSxDQUFBO0FBRVY7Ozs7R0FJRztBQUNRLFFBQUEsSUFBSSxHQUFHLENBQUMsVUFBa0IsRUFBRSxXQUFtQixDQUFDLEVBQUUsVUFBbUIsS0FBSztJQUNqRixJQUFJLFFBQWdCLENBQUE7SUFDcEIsSUFBSSxNQUFjLENBQUE7SUFDbEIsSUFBSSxVQUFVLENBQUE7SUFDZCxJQUFJLFdBQVcsR0FBWSxJQUFJLENBQUE7SUFDL0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQixXQUFXLEdBQUcsS0FBSyxDQUFBO1FBQ25CLFFBQVEsR0FBRyxDQUFDLENBQUE7SUFDaEIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNYLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDN0IsWUFBWSxlQUFlLElBQUksVUFBVSxHQUFHLENBQy9DLENBQUE7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1lBQ2pELENBQUM7WUFDRCxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQTtZQUMxQixNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQTtZQUUxQixpREFBaUQ7WUFDakQsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNuQixDQUFDO1lBQ0wsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUEsQ0FBQywrRUFBK0U7WUFDcEcsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ3hGLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFFBQVEsR0FBRyxDQUFDLFVBQWtCLEVBQUUsV0FBbUIsQ0FBQztJQUMzRCxNQUFNLENBQUMsWUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDM0MsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFdBQVcsR0FBRyxDQUFDLFVBQWtCO0lBQ3hDLE1BQU0sQ0FBQyxZQUFJLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUIsQ0FBQyxDQUFBIn0=