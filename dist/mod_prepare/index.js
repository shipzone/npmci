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
    env.setDockerRegistry('docker.io'); // TODO: checkup why we set this here
    let dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/;
    // Login external reigstry
    if (!process.env.NPMCI_LOGIN_DOCKER) {
        plugins.beautylog.warn('You have to specify Login Data to an external Docker Registry');
        plugins.beautylog.warn('|- As a result only the gitlab registry is availble for this build.');
    }
    else {
        let dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER);
        let username = dockerRegexResultArray[1];
        let password = dockerRegexResultArray[2];
        yield npmci_bash_1.bash('docker login -u ' + username + ' -p ' + password);
    }
    // Always login to GitLab Registry
    plugins.shelljs.exec('docker login -u gitlab-ci-token -p ' + process.env.CI_BUILD_TOKEN + ' ' + 'registry.gitlab.com');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHJlcGFyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUNwQyxvQ0FBbUM7QUFDbkMsMkNBQTBDO0FBUzFDOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixJQUFJLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQTtJQUM3RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtJQUNsRCxJQUFJLGVBQWUsR0FBVyxXQUFXLEdBQUcsUUFBUSxDQUFBO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUc7SUFDWCxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7SUFDeEUsSUFBSSxXQUFXLEdBQUcscUNBQXFDLENBQUE7SUFFdkQsMEJBQTBCO0lBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7UUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsK0RBQStELENBQUMsQ0FBQTtRQUN2RixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxRUFBcUUsQ0FBQyxDQUFBO0lBQy9GLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksc0JBQXNCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDN0UsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEMsTUFBTSxpQkFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDLENBQUE7SUFDL0QsQ0FBQztJQUVELGtDQUFrQztJQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxxQ0FBcUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRyxHQUFHLEdBQUcscUJBQXFCLENBQUMsQ0FBQTtJQUN0SCxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUc7SUFDakIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDNUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMscUNBQXFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsR0FBRyxHQUFHLHFCQUFxQixDQUFDLENBQUE7SUFDdEgsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksR0FBRyxHQUFHO0lBQ1IsSUFBSSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzdDLE1BQU0sU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTyxVQUF3QjtJQUNsRCxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ25CLEtBQUssS0FBSztZQUNSLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ3BCLEtBQUssUUFBUTtZQUNYLE1BQU0sQ0FBQyxNQUFNLE1BQU0sRUFBRSxDQUFBO1FBQ3ZCLEtBQUssZUFBZTtZQUNsQixNQUFNLENBQUMsTUFBTSxZQUFZLEVBQUUsQ0FBQTtRQUM3QixLQUFLLEtBQUs7WUFDUixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtRQUNwQjtZQUNFLEtBQUssQ0FBQTtJQUNULENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQSJ9