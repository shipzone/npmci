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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFDM0MsNkNBQWtDO0FBRXZCLFFBQUEsT0FBTyxHQUFHO0lBQ2pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsSUFBSSxjQUFjLEdBQVUsRUFBRSxDQUFDO0lBQy9CLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7SUFDN0IsR0FBRyxDQUFBLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDLENBQUM7UUFDdEMsY0FBYyxHQUFHLGNBQWMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDO1lBQUMsY0FBYyxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUM7SUFDeEUsQ0FBQztJQUNELGlCQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBIn0=