"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_bash_1 = require("./npmci.bash");
const NpmciBuildDocker = require("./npmci.build.docker");
/**
 * the main exported publish function.
 * @param registryServiceArg the serviceArg
 */
exports.publish = (registryServiceArg = "npm") => {
    switch (registryServiceArg) {
        case "npm":
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};
/**
 * tries to publish project at cwd to npm
 */
let publishNpm = function () {
    let done = plugins.q.defer();
    npmci_prepare_1.prepare("npm")
        .then(function () {
        npmci_bash_1.bash("npm publish");
        plugins.beautylog.ok("Done!");
        done.resolve();
    });
    return done.promise;
};
/**
 * tries to pubish current cwd to Docker registry
 */
let publishDocker = function () {
    let done = plugins.q.defer();
    NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(done.resolve);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLGdDQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUVsQyxNQUFZLGdCQUFnQixXQUFNLHNCQUtsQyxDQUFDLENBTHVEO0FBT3hEOzs7R0FHRztBQUNRLGVBQU8sR0FBRyxDQUFDLGtCQUFrQixHQUFtQixLQUFLO0lBQzVELE1BQU0sQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUEsQ0FBQztRQUN4QixLQUFLLEtBQUs7WUFDTixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsS0FBSyxRQUFRO1lBQ1QsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9CLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksVUFBVSxHQUFJO0lBQ2QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLEtBQUssQ0FBQztTQUNULElBQUksQ0FBQztRQUNGLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdkIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtTQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7U0FDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztTQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyJ9