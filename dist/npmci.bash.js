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
 */
exports.bash = (commandArg, retryArg = 2, bareArg = false) => {
    let exitCode;
    let stdOut;
    let execResult;
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
                process.exit(1);
            }
            else if (exitCode === 0 || retryArg === -1) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUUxQyxJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUE7QUFDckIsUUFBQSxZQUFZLEdBQVksS0FBSyxDQUFBO0FBQ3hDLElBQUksUUFBUSxHQUFHO0lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLEVBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixlQUFlLEdBQUcsa0NBQWtDLENBQUE7UUFDcEQsb0JBQVksR0FBRyxJQUFJLENBQUE7SUFDdkIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLGVBQWUsR0FBRywwQkFBMEIsQ0FBQTtRQUM1QyxvQkFBWSxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBQUEsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUNELFFBQVEsRUFBRSxDQUFBO0FBRVY7O0dBRUc7QUFDUSxRQUFBLElBQUksR0FBRyxDQUFDLFVBQWtCLEVBQUUsV0FBbUIsQ0FBQyxFQUFFLFVBQW1CLEtBQUs7SUFDakYsSUFBSSxRQUFnQixDQUFBO0lBQ3BCLElBQUksTUFBYyxDQUFBO0lBQ2xCLElBQUksVUFBVSxDQUFBO0lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QixZQUFZLGVBQWUsSUFBSSxVQUFVLEdBQUcsQ0FDL0MsQ0FBQTtZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUNELFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1lBQzFCLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBO1lBRTFCLGlEQUFpRDtZQUNqRCxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ25CLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQSxDQUFDLCtFQUErRTtZQUNwRyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ2pGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDeEYsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNqQixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsUUFBUSxHQUFHLENBQUMsVUFBa0IsRUFBRSxXQUFtQixDQUFDO0lBQzNELE1BQU0sQ0FBQyxZQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsV0FBVyxHQUFHLENBQUMsVUFBa0I7SUFDeEMsTUFBTSxDQUFDLFlBQUksQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUM5QixDQUFDLENBQUEifQ==