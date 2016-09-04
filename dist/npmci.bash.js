"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
let nvmSourceString = "";
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
            if (exitCode !== 0 && i == retryArg) {
                process.exit(1);
            }
            else if (exitCode == 0) {
                i = retryArg + 1; // if everything works out ok retrials are not wanted
            }
            else {
                plugins.beautylog.warn("Something went wrong! Exit Code: " + exitCode.toString());
                plugins.beautylog.info("Retry " + (i + 1).toString() + " of " + retryArg.toString());
            }
        }
    }
    else {
        plugins.beautylog.log("ShellExec would be: " + commandArg);
    }
    return stdOut;
};
exports.bashBare = (commandArg, retryArg = 2) => {
    return exports.bash(commandArg, retryArg, true);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRzNDLElBQUksZUFBZSxHQUFXLEVBQUUsQ0FBQztBQUN0QixvQkFBWSxHQUFZLEtBQUssQ0FBQztBQUN6QyxJQUFJLFFBQVEsR0FBRztJQUNYLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxFQUFDLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUYsZUFBZSxHQUFHLGtDQUFrQyxDQUFBO1FBQ3BELG9CQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLEVBQUMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RixlQUFlLEdBQUcsMEJBQTBCLENBQUE7UUFDNUMsb0JBQVksR0FBRyxJQUFJLENBQUM7SUFDeEIsQ0FBQztJQUFBLENBQUM7QUFDTixDQUFDLENBQUM7QUFDRixRQUFRLEVBQUUsQ0FBQztBQUVBLFlBQUksR0FBRyxDQUFDLFVBQWtCLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsS0FBSztJQUNoRSxJQUFJLFFBQWdCLENBQUM7SUFDckIsSUFBSSxNQUFjLENBQUM7SUFDbkIsSUFBSSxVQUFVLENBQUM7SUFDZixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDWCxVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzdCLFlBQVksZUFBZSxJQUFJLFVBQVUsR0FBRyxDQUMvQyxDQUFDO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNsRCxDQUFDO1lBQ0QsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDM0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLHFEQUFxRDtZQUMzRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDekYsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsQ0FBQTtJQUM5RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFVSxnQkFBUSxHQUFHLENBQUMsVUFBVSxFQUFFLFFBQVEsR0FBRyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxZQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUEifQ==