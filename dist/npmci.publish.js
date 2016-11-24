"use strict";
const plugins = require("./npmci.plugins");
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_bash_1 = require("./npmci.bash");
const NpmciBuildDocker = require("./npmci.build.docker");
/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to
 */
exports.publish = (pubServiceArg = 'npm') => {
    switch (pubServiceArg) {
        case 'npm':
            return publishNpm();
        case 'docker':
            return publishDocker();
    }
};
/**
 * tries to publish current cwd to NPM registry
 */
let publishNpm = function () {
    let done = plugins.q.defer();
    npmci_prepare_1.prepare('npm')
        .then(function () {
        npmci_bash_1.bash('npm publish');
        plugins.beautylog.ok('Done!');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQyxtREFBdUM7QUFDdkMsNkNBQWlDO0FBRWpDLHlEQUF3RDtBQU94RDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFDLGdCQUE2QixLQUFLO0lBQ3BELE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDcEIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ3ZCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtJQUM5QixDQUFDO0FBQ0wsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLFVBQVUsR0FBSTtJQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsdUJBQU8sQ0FBQyxLQUFLLENBQUM7U0FDVCxJQUFJLENBQUM7UUFDRixpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxhQUFhLEdBQUc7SUFDaEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUN4QixnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7U0FDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1NBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7U0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==