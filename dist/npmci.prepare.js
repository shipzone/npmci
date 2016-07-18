"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const env = require("./npmci.env");
const sshModule = require("./npmci.ssh");
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
let docker = function () {
    let done = plugins.q.defer();
    env.dockerRegistry = "docker.io";
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
let dockerGitlab = function () {
    let done = plugins.q.defer();
    env.dockerRegistry = "registry.gitlab.com";
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + process.env.CI_BUILD_TOKEN + " " + "registry.gitlab.com");
    done.resolve();
    return done.promise;
};
let ssh = function () {
    let done = plugins.q.defer();
    sshModule.ssh()
        .then(done.resolve);
    return done.promise;
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnByZXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRTNDLE1BQVksR0FBRyxXQUFNLGFBQ3JCLENBQUMsQ0FEaUM7QUFDbEMsTUFBWSxTQUFTLFdBQU0sYUFFM0IsQ0FBQyxDQUZ1QztBQUV4QyxJQUFJLEdBQUcsR0FBRztJQUNOLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFN0IsSUFBSSxXQUFXLEdBQVUsbUNBQW1DLENBQUM7SUFDN0QsSUFBSSxRQUFRLEdBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7SUFDbEQsSUFBSSxlQUFlLEdBQUcsV0FBVyxHQUFHLFFBQVEsQ0FBQztJQUU3QyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ1QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDbEUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDO0FBRUYsSUFBSSxNQUFNLEdBQUc7SUFDVCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtB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