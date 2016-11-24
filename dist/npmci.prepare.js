"use strict";
const plugins = require("./npmci.plugins");
const env = require("./npmci.env");
const sshModule = require("./npmci.ssh");
/**
 * authenticates npm with token from env var
 */
let npm = function () {
    let done = plugins.q.defer();
    let npmrcPrefix = '//registry.npmjs.org/:_authToken=';
    let npmToken = process.env.NPMCI_TOKEN_NPM;
    let npmrcFileString = npmrcPrefix + npmToken;
    if (npmToken) {
        plugins.beautylog.info('found access token');
    }
    else {
        plugins.beautylog.error('no access token found! Exiting!');
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc');
    done.resolve();
    return done.promise;
};
/**
 * logs in docker
 */
let docker = function () {
    let done = plugins.q.defer();
    env.setDockerRegistry('docker.io');
    let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/;
    if (!process.env.NPMCI_LOGIN_DOCKER) {
        plugins.beautylog.error('You have to specify Login Data to the Docker Registry');
        process.exit(1);
    }
    plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com'); // Always also login to GitLab Registry
    let dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER);
    let username = dockerRegexResultArray[1];
    let password = dockerRegexResultArray[2];
    plugins.shelljs.exec('docker login -u ' + username + ' -p ' + password);
    done.resolve();
    return done.promise;
};
/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = function () {
    let done = plugins.q.defer();
    env.setDockerRegistry('registry.gitlab.com');
    plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com');
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
        case 'npm':
            return npm();
        case 'docker':
            return docker();
        case 'docker-gitlab':
            return dockerGitlab();
        case 'ssh':
            return ssh();
        default:
            break;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnByZXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUUxQyxtQ0FBa0M7QUFDbEMseUNBQXdDO0FBVXhDOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDTixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBRTVCLElBQUksV0FBVyxHQUFXLG1DQUFtQyxDQUFBO0lBQzdELElBQUksUUFBUSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFBO0lBQ2xELElBQUksZUFBZSxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUE7SUFFNUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNYLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQTtRQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25CLENBQUM7SUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUc7SUFDVCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNsQyxJQUFJLFdBQVcsR0FBRyxxQ0FBcUMsQ0FBQTtJQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLHVEQUF1RCxDQUFDLENBQUE7UUFDaEYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNuQixDQUFDO0lBQ0QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQXFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLHFCQUFxQixDQUFDLENBQUEsQ0FBQyx1Q0FBdUM7SUFDOUosSUFBSSxzQkFBc0IsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUM3RSxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4QyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN4QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFBO0lBQ3ZFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUc7SUFDZixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQzVDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3RILElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDTixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7U0FDVixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsT0FBTyxHQUFHLFVBQVMsVUFBd0I7SUFDbEQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNqQixLQUFLLEtBQUs7WUFDTixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDaEIsS0FBSyxRQUFRO1lBQ1QsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ25CLEtBQUssZUFBZTtZQUNoQixNQUFNLENBQUMsWUFBWSxFQUFFLENBQUE7UUFDekIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFBO1FBQ2hCO1lBQ0ksS0FBSyxDQUFBO0lBQ2IsQ0FBQztBQUNMLENBQUMsQ0FBQSJ9