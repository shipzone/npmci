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
const npmci_bash_1 = require("./npmci.bash");
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
    yield npmci_bash_1.bash('docker login -u ' + username + ' -p ' + password);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnByZXBhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyw2Q0FBbUM7QUFDbkMsbUNBQWtDO0FBQ2xDLHlDQUF3QztBQVV4Qzs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHO0lBQ1IsSUFBSSxXQUFXLEdBQVcsbUNBQW1DLENBQUE7SUFDN0QsSUFBSSxRQUFRLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUE7SUFDbEQsSUFBSSxlQUFlLEdBQVcsV0FBVyxHQUFHLFFBQVEsQ0FBQTtJQUNwRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFBO1FBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLENBQUE7SUFDbEUsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHO0lBQ1gsR0FBRyxDQUFDLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ2xDLElBQUksV0FBVyxHQUFHLHFDQUFxQyxDQUFBO0lBQ3ZELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsdURBQXVELENBQUMsQ0FBQTtRQUNoRixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcscUJBQXFCLENBQUMsQ0FBQSxDQUFDLHVDQUF1QztJQUM5SixJQUFJLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0lBQzdFLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hDLE1BQU0saUJBQUksQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQyxDQUFBO0lBQzdELE1BQU0sQ0FBQTtBQUNSLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLFlBQVksR0FBRztJQUNqQixHQUFHLENBQUMsaUJBQWlCLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM1QyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcscUJBQXFCLENBQUMsQ0FBQTtJQUN0SCxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixNQUFNLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN2QixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsT0FBTyxHQUFHLENBQU8sVUFBd0I7SUFDbEQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNuQixLQUFLLEtBQUs7WUFDUixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixLQUFLLFFBQVE7WUFDWCxNQUFNLENBQUMsTUFBTSxNQUFNLEVBQUUsQ0FBQTtRQUN2QixLQUFLLGVBQWU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxFQUFFLENBQUE7UUFDN0IsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDcEI7WUFDRSxLQUFLLENBQUE7SUFDVCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUEifQ==