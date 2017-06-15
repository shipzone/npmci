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
const plugins = require("./mod.plugins");
const npmci_bash_1 = require("../npmci.bash");
const env = require("../npmci.env");
const npmciMods = require("../npmci.mods");
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
    let sshModule = yield npmciMods.modSsh.load();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHJlcGFyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUNwQyxvQ0FBbUM7QUFDbkMsMkNBQTBDO0FBUzFDOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixJQUFJLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQTtJQUM3RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtJQUNsRCxJQUFJLGVBQWUsR0FBVyxXQUFXLEdBQUcsUUFBUSxDQUFBO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUc7SUFDWCxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDbEMsSUFBSSxXQUFXLEdBQUcscUNBQXFDLENBQUE7SUFDdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO1FBQ2hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztJQUNELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBLENBQUMsdUNBQXVDO0lBQzlKLElBQUksc0JBQXNCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDN0UsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDeEMsTUFBTSxpQkFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUE7SUFDN0QsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksWUFBWSxHQUFHO0lBQ2pCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQzVDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3RILE1BQU0sQ0FBQTtBQUNSLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLEdBQUcsR0FBRztJQUNSLElBQUksU0FBUyxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM3QyxNQUFNLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUN2QixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsT0FBTyxHQUFHLENBQU8sVUFBd0I7SUFDbEQsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNuQixLQUFLLEtBQUs7WUFDUixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNwQixLQUFLLFFBQVE7WUFDWCxNQUFNLENBQUMsTUFBTSxNQUFNLEVBQUUsQ0FBQTtRQUN2QixLQUFLLGVBQWU7WUFDbEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxFQUFFLENBQUE7UUFDN0IsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDcEI7WUFDRSxLQUFLLENBQUE7SUFDVCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUEifQ==