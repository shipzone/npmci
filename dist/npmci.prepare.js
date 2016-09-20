"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const env = require("./npmci.env");
const sshModule = require("./npmci.ssh");
/**
 * authenticates npm with token from env var
 */
let npm = function () {
    let done = plugins.q.defer();
    let npmrcPrefix = "//registry.npmjs.org/:_authToken=";
    let npmToken = process.env.NPMCI_TOKEN_NPM;
    let npmrcFileString = npmrcPrefix + npmToken;
    if (npmToken) {
        plugins.beautylog.info("found access token");
    }
    else {
        plugins.beautylog.error("no access token found! Exiting!");
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString, "/root/.npmrc");
    done.resolve();
    return done.promise;
};
/**
 * logs in docker
 */
let docker = function () {
    let done = plugins.q.defer();
    env.setDockerRegistry("docker.io");
    let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/;
    if (!process.env.NPMCI_LOGIN_DOCKER) {
        plugins.beautylog.error("You have to specify Login Data to the Docker Registry");
        process.exit(1);
    }
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com"); // Always also login to GitLab Registry
    let dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER);
    let username = dockerRegexResultArray[1];
    let password = dockerRegexResultArray[2];
    plugins.shelljs.exec("docker login -u " + username + " -p " + password);
    done.resolve();
    return done.promise;
};
/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = function () {
    let done = plugins.q.defer();
    env.setDockerRegistry("registry.gitlab.com");
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com");
    done.resolve();
    return done.promise;
};
/**
 * prepare ssh
 */
let ssh = function () {
    let done = plugins.q.defer();
    sshModule.ssh()
        .then(done.resolve);
    return done.promise;
};
/**
 * the main exported prepare function
 * @param servieArg describes the service to prepare
 */
exports.prepare = function (serviceArg) {
    switch (serviceArg) {
        case "npm":
            return npm();
        case "docker":
            return docker();
        case "docker-gitlab":
            return dockerGitlab();
        case "ssh":
            return ssh();
        default:
            break;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnByZXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFFM0MsbUNBQWtDO0FBQ2xDLHlDQUF3QztBQVV4Qzs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHO0lBQ04sSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUU3QixJQUFJLFdBQVcsR0FBVSxtQ0FBbUMsQ0FBQztJQUM3RCxJQUFJLFFBQVEsR0FBVSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztJQUNsRCxJQUFJLGVBQWUsR0FBRyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBRTdDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDVCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBQyxjQUFjLENBQUMsQ0FBQztJQUNsRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHO0lBQ1QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkMsSUFBSSxXQUFXLEdBQUcscUNBQXFDLENBQUE7SUFDdkQsRUFBRSxDQUFBLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUEsQ0FBQztRQUNoQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO1FBQ2pGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsdUNBQXVDO0lBQy9KLElBQUksc0JBQXNCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUUsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQztJQUN4RSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksWUFBWSxHQUFHO0lBQ2YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM3QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcscUJBQXFCLENBQUMsQ0FBQztJQUN2SCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHO0lBQ04sSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixTQUFTLENBQUMsR0FBRyxFQUFFO1NBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUM7QUFFRjs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxVQUFTLFVBQXVCO0lBQ2pELE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDakIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQixLQUFLLGVBQWU7WUFDaEIsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLEtBQUssS0FBSztZQUNOLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQjtZQUNJLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDTCxDQUFDLENBQUEifQ==