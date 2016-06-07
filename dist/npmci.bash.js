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
                    "\"");
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
        plugins.beautylog.log("ShellExec would be: " + commandArg.blue);
    }
    return stdOut;
};
exports.bashBare = function (commandArg, retryArg) {
    if (retryArg === void 0) { retryArg = 2; }
    return exports.bash(commandArg, retryArg, true);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmJhc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRWhDLFlBQUksR0FBRyxVQUFDLFVBQWlCLEVBQUMsUUFBWSxFQUFDLE9BQWU7SUFBNUIsd0JBQVksR0FBWixZQUFZO0lBQUMsdUJBQWUsR0FBZixlQUFlO0lBQzdELElBQUksUUFBZSxDQUFDO0lBQ3BCLElBQUksTUFBYSxDQUFDO0lBQ2xCLElBQUksVUFBVSxDQUFDO0lBQ2YsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDeEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztZQUNoQyxFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7Z0JBQ1QsVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QiwyQ0FBMkM7b0JBQzNDLFVBQVU7b0JBQ1YsSUFBSSxDQUNQLENBQUM7WUFDTixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osVUFBVSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xELENBQUM7WUFDRCxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztZQUMzQixNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUMzQixFQUFFLENBQUEsQ0FBQyxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO2dCQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3JCLENBQUMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMscURBQXFEO1lBQzNFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDbEYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLE1BQU0sR0FBSSxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxRixDQUFDO1FBQ0wsQ0FBQztJQUNMLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHNCQUFzQixHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNuRSxDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFVSxnQkFBUSxHQUFHLFVBQUMsVUFBVSxFQUFDLFFBQVk7SUFBWix3QkFBWSxHQUFaLFlBQVk7SUFDMUMsTUFBTSxDQUFDLFlBQUksQ0FBQyxVQUFVLEVBQUMsUUFBUSxFQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLENBQUMsQ0FBQSIsImZpbGUiOiJucG1jaS5iYXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XHJcblxyXG5leHBvcnQgbGV0IGJhc2ggPSAoY29tbWFuZEFyZzpzdHJpbmcscmV0cnlBcmcgPSAyLGJhcmVBcmcgPSBmYWxzZSkgPT4ge1xyXG4gICAgbGV0IGV4aXRDb2RlOm51bWJlcjtcclxuICAgIGxldCBzdGRPdXQ6c3RyaW5nO1xyXG4gICAgbGV0IGV4ZWNSZXN1bHQ7XHJcbiAgICBpZighcHJvY2Vzcy5lbnYuTlBNVFNfVEVTVCl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gcmV0cnlBcmc7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKCFiYXJlQXJnKXtcclxuICAgICAgICAgICAgICAgIGV4ZWNSZXN1bHQgPSBwbHVnaW5zLnNoZWxsanMuZXhlYyhcclxuICAgICAgICAgICAgICAgICAgICBcImJhc2ggLWMgXFxcInNvdXJjZSAvdXNyL2xvY2FsL252bS9udm0uc2ggJiZcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZEFyZyArXHJcbiAgICAgICAgICAgICAgICAgICAgXCJcXFwiXCJcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBleGVjUmVzdWx0ID0gcGx1Z2lucy5zaGVsbGpzLmV4ZWMoY29tbWFuZEFyZyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXhpdENvZGUgPSBleGVjUmVzdWx0LmNvZGU7XHJcbiAgICAgICAgICAgIHN0ZE91dCA9IGV4ZWNSZXN1bHQuc3Rkb3V0O1xyXG4gICAgICAgICAgICBpZihleGl0Q29kZSAhPT0gMCAmJiBpID09IHJldHJ5QXJnKXtcclxuICAgICAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmKGV4aXRDb2RlID09IDApe1xyXG4gICAgICAgICAgICAgICAgaSA9IHJldHJ5QXJnICsgMTsgLy8gaWYgZXZlcnl0aGluZyB3b3JrcyBvdXQgb2sgcmV0cmlhbHMgYXJlIG5vdCB3YW50ZWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLndhcm4oXCJTb21ldGhpbmcgd2VudCB3cm9uZyEgRXhpdCBDb2RlOiBcIiArIGV4aXRDb2RlLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuaW5mbyhcIlJldHJ5IFwiICsgKGkgKyAxKS50b1N0cmluZygpICsgXCIgb2YgXCIgKyAgcmV0cnlBcmcudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmxvZyhcIlNoZWxsRXhlYyB3b3VsZCBiZTogXCIgKyBjb21tYW5kQXJnLmJsdWUpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RkT3V0O1xyXG59XHJcblxyXG5leHBvcnQgbGV0IGJhc2hCYXJlID0gKGNvbW1hbmRBcmcscmV0cnlBcmcgPSAyKSA9PiB7XHJcbiAgICByZXR1cm4gYmFzaChjb21tYW5kQXJnLHJldHJ5QXJnLHRydWUpO1xyXG59Il19
