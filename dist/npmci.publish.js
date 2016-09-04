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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLGdDQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUVsQyxNQUFZLGdCQUFnQixXQUFNLHNCQUtsQyxDQUFDLENBTHVEO0FBT3hEOzs7R0FHRztBQUNRLGVBQU8sR0FBRyxDQUFDLGFBQWEsR0FBZSxLQUFLO0lBQ25ELE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUM7UUFDbkIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUY7O0dBRUc7QUFDSCxJQUFJLFVBQVUsR0FBSTtJQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUJBQU8sQ0FBQyxLQUFLLENBQUM7U0FDVCxJQUFJLENBQUM7UUFDRixpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxhQUFhLEdBQUc7SUFDaEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN6QixnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7U0FDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1NBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7U0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUMifQ==