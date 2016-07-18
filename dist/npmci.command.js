"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
exports.command = () => {
    let done = plugins.q.defer();
    let wrappedCommand = "";
    let argvArray = process.argv;
    for (let i = 3; i < argvArray.length; i++) {
        wrappedCommand = wrappedCommand + argvArray[i];
        if (i + 1 != argvArray.length)
            wrappedCommand = wrappedCommand + " ";
    }
    npmci_bash_1.bash(wrappedCommand);
    done.resolve();
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUc7SUFDakIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLGNBQWMsR0FBVSxFQUFFLENBQUM7SUFDL0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUM3QixHQUFHLENBQUEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUMsQ0FBQztRQUN0QyxjQUFjLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMvQyxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUM7WUFBQyxjQUFjLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQztJQUN4RSxDQUFDO0lBQ0QsaUJBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==