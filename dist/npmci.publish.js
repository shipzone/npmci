"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_bash_1 = require("./npmci.bash");
const NpmciBuildDocker = require("./npmci.build.docker");
exports.publish = (serviceArg = "npm") => {
    switch (serviceArg) {
        case "npm":
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};
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
let publishDocker = function () {
    let done = plugins.q.defer();
    NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(done.resolve);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLGdDQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUVsQyxNQUFZLGdCQUFnQixXQUFNLHNCQUVsQyxDQUFDLENBRnVEO0FBRTdDLGVBQU8sR0FBRyxDQUFDLFVBQVUsR0FBVSxLQUFLO0lBQzNDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDaEIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUk7SUFDZCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFPLENBQUMsS0FBSyxDQUFDO1NBQ1QsSUFBSSxDQUFDO1FBQ0YsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUE7QUFFRCxJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ3pCLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtTQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7U0FDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztTQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyJ9