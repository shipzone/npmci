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
            if (exitCode !== 0 && i === retryArg) {
                process.exit(1);
            }
            else if (exitCode === 0) {
                i = retryArg + 1; // if everything works out ok retrials are not wanted
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
exports.bashBare = (commandArg, retryArg = 2) => {
    return exports.bash(commandArg, retryArg, true);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUUxQyxJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUE7QUFDckIsUUFBQSxZQUFZLEdBQVksS0FBSyxDQUFBO0FBQ3hDLElBQUksUUFBUSxHQUFHO0lBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLEVBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRixlQUFlLEdBQUcsa0NBQWtDLENBQUE7UUFDcEQsb0JBQVksR0FBRyxJQUFJLENBQUE7SUFDdkIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsRUFBQyxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFGLGVBQWUsR0FBRywwQkFBMEIsQ0FBQTtRQUM1QyxvQkFBWSxHQUFHLElBQUksQ0FBQTtJQUN2QixDQUFDO0lBQUEsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUNELFFBQVEsRUFBRSxDQUFBO0FBRUMsUUFBQSxJQUFJLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFFBQVEsR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLEtBQUs7SUFDaEUsSUFBSSxRQUFnQixDQUFBO0lBQ3BCLElBQUksTUFBYyxDQUFBO0lBQ2xCLElBQUksVUFBVSxDQUFBO0lBQ2QsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDMUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QixZQUFZLGVBQWUsSUFBSSxVQUFVLEdBQUcsQ0FDL0MsQ0FBQTtZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDakQsQ0FBQztZQUNELFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFBO1lBQzFCLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFBO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDbkIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUEsQ0FBQyxxREFBcUQ7WUFDMUUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG1DQUFtQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO2dCQUNqRixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ3hGLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEdBQUcsVUFBVSxDQUFDLENBQUE7SUFDOUQsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUE7QUFDakIsQ0FBQyxDQUFBO0FBRVUsUUFBQSxRQUFRLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxHQUFHLENBQUM7SUFDM0MsTUFBTSxDQUFDLFlBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzNDLENBQUMsQ0FBQSJ9