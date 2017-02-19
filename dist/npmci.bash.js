"use strict";
const plugins = require("./npmci.plugins");
let nvmSourceString = '';
exports.nvmAvailable = false;
let checkNvm = () => {
    let localExec = plugins.shelljs.exec;
    if (localExec(`bash -c "source /usr/local/nvm/nvm.sh"`, { silent: true }).code === 0) {
        nvmSourceString = `source /usr/local/nvm/nvm.sh && `;
        exports.nvmAvailable = true;
    }
    else if (localExec(`bash -c "source ~/.nvm/nvm.sh"`, { silent: true }).code === 0) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUUxQyxJQUFJLGVBQWUsR0FBVyxFQUFFLENBQUE7QUFDckIsUUFBQSxZQUFZLEdBQVksS0FBSyxDQUFBO0FBQ3hDLElBQUksUUFBUSxHQUFHO0lBQ2IsSUFBSSxTQUFTLEdBQVEsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7SUFDekMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLHdDQUF3QyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckYsZUFBZSxHQUFHLGtDQUFrQyxDQUFBO1FBQ3BELG9CQUFZLEdBQUcsSUFBSSxDQUFBO0lBQ3JCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGdDQUFnQyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEYsZUFBZSxHQUFHLDBCQUEwQixDQUFBO1FBQzVDLG9CQUFZLEdBQUcsSUFBSSxDQUFBO0lBQ3JCLENBQUM7SUFBQSxDQUFDO0FBQ0osQ0FBQyxDQUFBO0FBQ0QsUUFBUSxFQUFFLENBQUE7QUFFVjs7OztHQUlHO0FBQ1EsUUFBQSxJQUFJLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFdBQW1CLENBQUMsRUFBRSxVQUFtQixLQUFLO0lBQ25GLElBQUksUUFBZ0IsQ0FBQTtJQUNwQixJQUFJLE1BQWMsQ0FBQTtJQUNsQixJQUFJLFVBQVUsQ0FBQTtJQUNkLElBQUksV0FBVyxHQUFZLElBQUksQ0FBQTtJQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLFdBQVcsR0FBRyxLQUFLLENBQUE7UUFDbkIsUUFBUSxHQUFHLENBQUMsQ0FBQTtJQUNkLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ25DLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixVQUFVLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQy9CLFlBQVksZUFBZSxJQUFJLFVBQVUsR0FBRyxDQUM3QyxDQUFBO1lBQ0gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUMvQyxDQUFDO1lBQ0QsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUE7WUFDMUIsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUE7WUFFMUIsaURBQWlEO1lBQ2pELEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQSxDQUFDLCtFQUErRTtZQUNsRyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ2pGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7WUFDdEYsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsQ0FBQTtJQUM1RCxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQTtBQUNmLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxRQUFRLEdBQUcsQ0FBQyxVQUFrQixFQUFFLFdBQW1CLENBQUM7SUFDN0QsTUFBTSxDQUFDLFlBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3pDLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxXQUFXLEdBQUcsQ0FBQyxVQUFrQjtJQUMxQyxNQUFNLENBQUMsWUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQzdCLENBQUMsQ0FBQSJ9