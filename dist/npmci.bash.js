"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
exports.bash = function (commandArg, retryArg, bareArg) {
    if (retryArg === void 0) { retryArg = 2; }
    if (bareArg === void 0) { bareArg = false; }
    var exitCode;
    var stdOut;
    var execResult;
    if (!process.env.NPMTS_TEST) {
        for (var i = 0; i <= retryArg; i++) {
            if (!bareArg) {
                execResult = plugins.shelljs.exec("bash -c \"source /usr/local/nvm/nvm.sh &&" +
                    commandArg +
                    "\"").code;
            }
            else {
                execResult = plugins.shelljs.exec(bareArg);
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
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue);
    }
    return stdOut;
};
exports.bashBare = function (commandArg, retryArg) {
    if (retryArg === void 0) { retryArg = 2; }
    return exports.bash(commandArg, retryArg, true);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRWhDLFlBQUksR0FBRyxVQUFDLFVBQWlCLEVBQUMsUUFBWSxFQUFDLE9BQWU7SUFBNUIsd0JBQVksR0FBWixZQUFZO0lBQUMsdUJBQWUsR0FBZixlQUFlO0lBQzdELElBQUksUUFBZSxDQUFDO0lBQ3BCLElBQUksTUFBYSxDQUFDO0lBQ2xCLElBQUksVUFBVSxDQUFDO0lBQ2YsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7Z0JBQ1QsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QiwyQ0FBMkM7b0JBQzNDLFVBQVU7b0JBQ1YsSUFBSSxDQUNQLENBQUMsSUFBSSxDQUFDO1lBQ1gsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMvQyxDQUFDO1lBQ0QsUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDM0IsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7WUFDM0IsRUFBRSxDQUFBLENBQUMsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNyQixDQUFDLEdBQUcsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLHFEQUFxRDtZQUMzRSxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsbUNBQW1DLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2xGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxNQUFNLEdBQUksUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDMUYsQ0FBQztRQUNMLENBQUM7SUFDTCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkUsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBRVUsZ0JBQVEsR0FBRyxVQUFDLFVBQVUsRUFBQyxRQUFZO0lBQVosd0JBQVksR0FBWixZQUFZO0lBQzFDLE1BQU0sQ0FBQyxZQUFJLENBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUEiLCJmaWxlIjoibnBtY2kuYmFzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInR5cGluZ3MtZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcblxuZXhwb3J0IGxldCBiYXNoID0gKGNvbW1hbmRBcmc6c3RyaW5nLHJldHJ5QXJnID0gMixiYXJlQXJnID0gZmFsc2UpID0+IHtcbiAgICBsZXQgZXhpdENvZGU6bnVtYmVyO1xuICAgIGxldCBzdGRPdXQ6c3RyaW5nO1xuICAgIGxldCBleGVjUmVzdWx0O1xuICAgIGlmKCFwcm9jZXNzLmVudi5OUE1UU19URVNUKXtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmV0cnlBcmc7IGkrKyl7XG4gICAgICAgICAgICBpZighYmFyZUFyZyl7XG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdCA9IHBsdWdpbnMuc2hlbGxqcy5leGVjKFxuICAgICAgICAgICAgICAgICAgICBcImJhc2ggLWMgXFxcInNvdXJjZSAvdXNyL2xvY2FsL252bS9udm0uc2ggJiZcIiArXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRBcmcgK1xuICAgICAgICAgICAgICAgICAgICBcIlxcXCJcIlxuICAgICAgICAgICAgICAgICkuY29kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZXhlY1Jlc3VsdCA9IHBsdWdpbnMuc2hlbGxqcy5leGVjKGJhcmVBcmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZXhpdENvZGUgPSBleGVjUmVzdWx0LmNvZGU7XG4gICAgICAgICAgICBzdGRPdXQgPSBleGVjUmVzdWx0LnN0ZG91dDtcbiAgICAgICAgICAgIGlmKGV4aXRDb2RlICE9PSAwICYmIGkgPT0gcmV0cnlBcmcpe1xuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihleGl0Q29kZSA9PSAwKXtcbiAgICAgICAgICAgICAgICBpID0gcmV0cnlBcmcgKyAxOyAvLyBpZiBldmVyeXRoaW5nIHdvcmtzIG91dCBvayByZXRyaWFscyBhcmUgbm90IHdhbnRlZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy53YXJuKFwiU29tZXRoaW5nIHdlbnQgd3JvbmchIEV4aXQgQ29kZTogXCIgKyBleGl0Q29kZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5pbmZvKFwiUmV0cnkgXCIgKyAoaSArIDEpLnRvU3RyaW5nKCkgKyBcIiBvZiBcIiArICByZXRyeUFyZy50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmxvZyhcIlNoZWxsRXhlYyB3b3VsZCBiZTogXCIgKyBjb21tYW5kQXJnLmJsdWUpXG4gICAgfVxuICAgIHJldHVybiBzdGRPdXQ7XG59XG5cbmV4cG9ydCBsZXQgYmFzaEJhcmUgPSAoY29tbWFuZEFyZyxyZXRyeUFyZyA9IDIpID0+IHtcbiAgICByZXR1cm4gYmFzaChjb21tYW5kQXJnLHJldHJ5QXJnLHRydWUpO1xufSJdfQ==
