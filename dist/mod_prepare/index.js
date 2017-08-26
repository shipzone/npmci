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
    // handle registries
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', (envString) => __awaiter(this, void 0, void 0, function* () {
        let dockerRegexResultArray = envString.split('|');
        if (dockerRegexResultArray.length !== 3) {
            plugins.beautylog.error('malformed docker env var...');
            process.exit(1);
            return;
        }
        let registry = dockerRegexResultArray[0];
        let username = dockerRegexResultArray[1];
        let password = dockerRegexResultArray[2];
        if (registry === 'docker.io') {
            yield npmci_bash_1.bash(`docker login -u ${username} -p ${password}`);
            plugins.beautylog.info('Logged in to standard docker hub');
        }
        else {
            yield npmci_bash_1.bash(`docker login -u ${username} -p ${password} ${registry}`);
        }
        plugins.beautylog.success(`docker authenticated for ${registry}!`);
    }));
    // Always login to GitLab Registry
    yield dockerGitlab();
    return;
});
/**
 * prepare docker for gitlab registry
 */
let dockerGitlab = () => __awaiter(this, void 0, void 0, function* () {
    // env.setDockerRegistry('registry.gitlab.com')
    yield npmci_bash_1.bash(`docker login -u gitlab-ci-token -p ${process.env.CI_BUILD_TOKEN} registry.gitlab.com`);
    plugins.beautylog.success(`docker authenticated for registry.gitlab.com!`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHJlcGFyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUNwQyxvQ0FBbUM7QUFDbkMsMkNBQTBDO0FBUzFDOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixJQUFJLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQTtJQUM3RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQTtJQUNsRCxJQUFJLGVBQWUsR0FBVyxXQUFXLEdBQUcsUUFBUSxDQUFBO0lBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQTtJQUNsRSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUc7SUFDWCxHQUFHLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUEsQ0FBQyxxQ0FBcUM7SUFFeEUsb0JBQW9CO0lBQ3BCLE9BQU8sQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxxQkFBcUIsRUFBRSxDQUFPLFNBQVM7UUFDdEYsSUFBSSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNmLE1BQU0sQ0FBQTtRQUNSLENBQUM7UUFDRCxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLGlCQUFJLENBQUMsbUJBQW1CLFFBQVEsT0FBTyxRQUFRLEVBQUUsQ0FBQyxDQUFBO1lBQ3hELE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7UUFDNUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxpQkFBSSxDQUFDLG1CQUFtQixRQUFRLE9BQU8sUUFBUSxJQUFJLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDdEUsQ0FBQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixRQUFRLEdBQUcsQ0FBQyxDQUFBO0lBQ3BFLENBQUMsQ0FBQSxDQUFDLENBQUE7SUFFRixrQ0FBa0M7SUFDbEMsTUFBTSxZQUFZLEVBQUUsQ0FBQTtJQUNwQixNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxZQUFZLEdBQUc7SUFDakIsK0NBQStDO0lBQy9DLE1BQU0saUJBQUksQ0FBQyxzQ0FBc0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLHNCQUFzQixDQUFDLENBQUE7SUFDbEcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsK0NBQStDLENBQUMsQ0FBQTtJQUMxRSxNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxHQUFHLEdBQUc7SUFDUixJQUFJLFNBQVMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDN0MsTUFBTSxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUE7QUFDdkIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLFVBQXdCO0lBQ2xELE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkIsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7UUFDcEIsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sTUFBTSxFQUFFLENBQUE7UUFDdkIsS0FBSyxlQUFlO1lBQ2xCLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFBO1FBQzdCLEtBQUssS0FBSztZQUNSLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFBO1FBQ3BCO1lBQ0UsS0FBSyxDQUFBO0lBQ1QsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBIn0=