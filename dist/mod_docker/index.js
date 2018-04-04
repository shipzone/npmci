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
const helpers = require("./mod.helpers");
exports.helpers = helpers;
// classes
const mod_classes_dockerfile_1 = require("./mod.classes.dockerfile");
exports.Dockerfile = mod_classes_dockerfile_1.Dockerfile;
const mod_classes_dockerregistry_1 = require("./mod.classes.dockerregistry");
const mod_classes_registrystorage_1 = require("./mod.classes.registrystorage");
// instances
let npmciRegistryStorage = new mod_classes_registrystorage_1.RegistryStorage();
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    exports.modArgvArg = argvArg;
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'build':
                yield exports.build();
                break;
            case 'login':
            case 'prepare':
                yield exports.login();
                break;
            case 'test':
                yield exports.test();
                break;
            case 'push':
                yield exports.push(argvArg);
                break;
            case 'pull':
                yield exports.pull(argvArg);
                break;
            default:
                plugins.beautylog.error(`>>npmci docker ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci docker ...<< cli arguments invalid... Please read the documentation.`);
    }
});
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    plugins.beautylog.log('now building Dockerfiles...');
    yield helpers
        .readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles)
        .then(helpers.buildDockerfiles);
});
/**
 * login to the DockerRegistries
 */
exports.login = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    yield npmciRegistryStorage.loginAll();
});
/**
 * logs in docker
 */
exports.prepare = () => __awaiter(this, void 0, void 0, function* () {
    // Always login to GitLab Registry
    if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
        plugins.beautylog.error('No registry token specified by gitlab!');
        process.exit(1);
    }
    npmciRegistryStorage.addRegistry(new mod_classes_dockerregistry_1.DockerRegistry({
        registryUrl: 'registry.gitlab.com',
        username: 'gitlab-ci-token',
        password: process.env.CI_BUILD_TOKEN
    }));
    // handle registries
    yield plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', (envString) => __awaiter(this, void 0, void 0, function* () {
        npmciRegistryStorage.addRegistry(mod_classes_dockerregistry_1.DockerRegistry.fromEnvString(envString));
    }));
    return;
});
exports.push = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    let registryUrlArg = argvArg._[2];
    let suffix = null;
    if (argvArg._.length >= 4) {
        suffix = argvArg._[3];
    }
    let dockerfileArray = yield helpers
        .readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles);
    let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg);
    if (!localDockerRegistry) {
        plugins.beautylog.error(`Cannot push to registry ${registryUrlArg}, because it was not found in the authenticated registry list.`);
        process.exit(1);
    }
    for (let dockerfile of dockerfileArray) {
        yield dockerfile.push(localDockerRegistry, suffix);
    }
});
exports.pull = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    let registryUrlArg = argvArg._[2];
    let suffix = null;
    if (argvArg._.length >= 4) {
        suffix = argvArg._[3];
    }
    let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg);
    let dockerfileArray = yield helpers
        .readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles);
    for (let dockerfile of dockerfileArray) {
        yield dockerfile.pull(localDockerRegistry, suffix);
    }
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    return yield helpers.readDockerfiles().then(helpers.testDockerfiles);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFJekMseUNBQXlDO0FBVXBCLDBCQUFPO0FBUjVCLFVBQVU7QUFDVixxRUFBc0Q7QUFPN0MscUJBUEEsbUNBQVUsQ0FPQTtBQU5uQiw2RUFBOEQ7QUFDOUQsK0VBQWdFO0FBRWhFLFlBQVk7QUFDWixJQUFJLG9CQUFvQixHQUFHLElBQUksNkNBQWUsRUFBRSxDQUFDO0FBTWpEOzs7R0FHRztBQUNRLFFBQUEsU0FBUyxHQUFHLENBQU0sT0FBTyxFQUFDLEVBQUU7SUFDckMsa0JBQVUsR0FBRyxPQUFPLENBQUM7SUFDckIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxhQUFLLEVBQUUsQ0FBQztnQkFDZCxLQUFLLENBQUM7WUFDUixLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssU0FBUztnQkFDWixNQUFNLGFBQUssRUFBRSxDQUFDO2dCQUNkLEtBQUssQ0FBQztZQUNSLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksRUFBRSxDQUFDO2dCQUNiLEtBQUssQ0FBQztZQUNSLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxNQUFNO2dCQUNULE1BQU0sWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQixLQUFLLENBQUM7WUFDUjtnQkFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FB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