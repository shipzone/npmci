"use strict";
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
exports.command = () => {
    let done = plugins.q.defer();
    let wrappedCommand = '';
    let argvArray = process.argv;
    for (let i = 3; i < argvArray.length; i++) {
        wrappedCommand = wrappedCommand + argvArray[i];
        if (i + 1 !== argvArray.length) {
            wrappedCommand = wrappedCommand + ' ';
        }
    }
    npmci_bash_1.bash(wrappedCommand);
    done.resolve();
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQyw2Q0FBaUM7QUFFdEIsUUFBQSxPQUFPLEdBQUc7SUFDakIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixJQUFJLGNBQWMsR0FBVyxFQUFFLENBQUE7SUFDL0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN4QyxjQUFjLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsY0FBYyxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUE7UUFBQyxDQUFDO0lBQzdFLENBQUM7SUFDRCxpQkFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSJ9