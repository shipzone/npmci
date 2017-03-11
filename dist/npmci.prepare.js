"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const env = require("./npmci.env");
const sshModule = require("./npmci.ssh");
/**
 * authenticates npm with token from env var
 */
let npm = () => __awaiter(this, void 0, void 0, function* () {
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
    return;
});
/**
 * logs in docker
 */
let docker = () => __awaiter(this, void 0, void 0, function* () {
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
    return;
});
/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = () => __awaiter(this, void 0, void 0, function* () {
    env.setDockerRegistry('registry.gitlab.com');
    plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com');
    return;
});
/**
 * prepare ssh
 */
let ssh = () => __awaiter(this, void 0, void 0, function* () {
    yield sshModule.ssh();
});
/**
 * the main exported prepare function
 * @param servieArg describes the service to prepare
 */
exports.prepare = (serviceArg) => __awaiter(this, void 0, void 0, function* () {
    switch (serviceArg) {
        case 'npm':
            return yield npm();
        case 'docker':
            return yield docker();
        case 'docker-gitlab':
            return yield dockerGitlab();
        case 'ssh':
            return yield ssh();
        default:
            break;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnByZXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUUxQyxtQ0FBa0M7QUFDbEMseUNBQXdDO0FBVXhDOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixJQUFJLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQTtJQUM3RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtJQUNsRCxJQUFJLGVBQWUsR0FBVyxXQUFXLEdBQUcsUUFBUSxDQUFBO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUc7SUFDWCxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEMsSUFBSSxXQUFXLEdBQUcscUNBQXFDLENBQUE7SUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO1FBQ2hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBLENBQUMsdUNBQXVDO0lBQzlKLElBQUksc0JBQXNCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDN0UsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUMsQ0FBQTtJQUN2RSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUc7SUFDakIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQXFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLHFCQUFxQixDQUFDLENBQUE7SUFDdEgsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHO0lBQ1IsTUFBTSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDdkIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLFVBQXdCO0lBQ2xELE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkIsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDcEIsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sTUFBTSxFQUFFLENBQUE7UUFDdkIsS0FBSyxlQUFlO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFBO1FBQzdCLEtBQUssS0FBSztZQUNSLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ3BCO1lBQ0UsS0FBSyxDQUFBO0lBQ1QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBIn0=