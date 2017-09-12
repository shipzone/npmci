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
    yield helpers.readDockerfiles()
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
    let dockerfileArray = yield helpers.readDockerfiles()
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
    let dockerfileArray = yield helpers.readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles);
    for (let dockerfile of dockerfileArray) {
        yield dockerfile.pull(localDockerRegistry, suffix);
    }
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    return yield helpers.readDockerfiles()
        .then(helpers.testDockerfiles);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFJeEMseUNBQXdDO0FBWXRDLDBCQUFPO0FBVlQsVUFBVTtBQUNWLHFFQUFxRDtBQVFuRCxxQkFSTyxtQ0FBVSxDQVFQO0FBUFosNkVBQTZEO0FBQzdELCtFQUErRDtBQUUvRCxZQUFZO0FBQ1osSUFBSSxvQkFBb0IsR0FBRyxJQUFJLDZDQUFlLEVBQUUsQ0FBQTtBQVNoRDs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU87SUFDbkMsa0JBQVUsR0FBRyxPQUFPLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxhQUFLLEVBQUUsQ0FBQTtnQkFDYixLQUFLLENBQUE7WUFDUCxLQUFLLE9BQU8sQ0FBQztZQUNiLEtBQUssU0FBUztnQkFDWixNQUFNLGFBQUssRUFBRSxDQUFBO2dCQUNiLEtBQUssQ0FBQTtZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksRUFBRSxDQUFBO2dCQUNaLEtBQUssQ0FBQTtZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDbkIsS0FBSyxDQUFBO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE1BQU0sWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuQixLQUFLLENBQUE7WUFDUDtnQkFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsTUFB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