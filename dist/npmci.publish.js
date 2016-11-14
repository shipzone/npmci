"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_bash_1 = require("./npmci.bash");
const NpmciBuildDocker = require("./npmci.build.docker");
/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to
 */
exports.publish = (pubServiceArg = "npm") => {
    switch (pubServiceArg) {
        case "npm":
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};
/**
 * tries to publish current cwd to NPM registry
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFDM0MsbURBQXdDO0FBQ3hDLDZDQUFrQztBQUVsQyx5REFBd0Q7QUFPeEQ7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBQyxnQkFBNEIsS0FBSztJQUNuRCxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQSxDQUFDO1FBQ25CLEtBQUssS0FBSztZQUNOLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4QixLQUFLLFFBQVE7WUFDVCxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDL0IsQ0FBQztBQUNMLENBQUMsQ0FBQztBQUVGOztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUk7SUFDZCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFPLENBQUMsS0FBSyxDQUFDO1NBQ1QsSUFBSSxDQUFDO1FBQ0YsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksYUFBYSxHQUFHO0lBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1NBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztTQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1NBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDIn0=