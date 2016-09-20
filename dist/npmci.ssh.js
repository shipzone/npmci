"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
let sshRegex = /^(.*)\|(.*)\|(.*)/;
let sshInstance;
/**
 * checks for ENV vars in form of NPMCI_SSHKEY_* and deploys any found ones
 */
exports.ssh = () => {
    let done = plugins.q.defer();
    sshInstance = new plugins.smartssh.SshInstance(); // init ssh instance
    plugins.smartparam.forEachMinimatch(process.env, "NPMCI_SSHKEY_*", evaluateSshEnv);
    if (!process.env.NPMTS_TEST) {
        sshInstance.writeToDisk();
    }
    else {
        plugins.beautylog.log("In test mode, so not storing SSH keys to disk!");
    }
    ;
    done.resolve();
    return done.promise;
};
/**
 * gets called for each found SSH ENV Var and deploys it
 */
let evaluateSshEnv = (sshkeyEnvVarArg) => {
    let resultArray = sshRegex.exec(sshkeyEnvVarArg);
    let sshKey = new plugins.smartssh.SshKey();
    plugins.beautylog.info("Found SSH identity for " + resultArray[1]);
    if (notUndefined(resultArray[1])) {
        plugins.beautylog.log("---> host defined!");
        sshKey.host = resultArray[1];
    }
    if (notUndefined(resultArray[2])) {
        plugins.beautylog.log("---> privKey defined!");
        sshKey.privKeyBase64 = resultArray[2];
    }
    ;
    if (notUndefined(resultArray[3])) {
        "---> pubKey defined!";
        sshKey.pubKeyBase64 = resultArray[3];
    }
    ;
    sshInstance.addKey(sshKey);
};
/**
 * checks if not undefined
 */
let notUndefined = (stringArg) => {
    return (stringArg && stringArg != "undefined" && stringArg != "##");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc3NoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc3NoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBd0I7QUFDeEIsMkNBQTJDO0FBRTNDLElBQUksUUFBUSxHQUFHLG1CQUFtQixDQUFBO0FBQ2xDLElBQUksV0FBd0MsQ0FBQztBQUU3Qzs7R0FFRztBQUNRLFFBQUEsR0FBRyxHQUFHO0lBQ2IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixXQUFXLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsb0JBQW9CO0lBQ3RFLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQyxnQkFBZ0IsRUFBQyxjQUFjLENBQUMsQ0FBQztJQUNqRixFQUFFLENBQUEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUN4QixXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0RBQWdELENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQUEsQ0FBQztJQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsSUFBSSxjQUFjLEdBQUcsQ0FBQyxlQUFlO0lBQ2pDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDakQsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLEVBQUUsQ0FBQSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUM7UUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtRQUMzQyxNQUFNLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQzlDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFBQSxDQUFDO0lBQ0YsRUFBRSxDQUFBLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztRQUM3QixzQkFBc0IsQ0FBQTtRQUN0QixNQUFNLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQUEsQ0FBQztJQUVGLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxJQUFJLFlBQVksR0FBRyxDQUFDLFNBQWdCO0lBQ2hDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLElBQUksV0FBVyxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUN4RSxDQUFDLENBQUEifQ==