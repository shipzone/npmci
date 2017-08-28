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
        dockerfile.push(localDockerRegistry, suffix);
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
        dockerfile.pull(localDockerRegistry, suffix);
    }
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.prepare();
    return yield helpers.readDockerfiles()
        .then(helpers.testDockerfiles);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFJeEMseUNBQXdDO0FBWXRDLDBCQUFPO0FBVlQsVUFBVTtBQUNWLHFFQUFxRDtBQVFuRCxxQkFSTyxtQ0FBVSxDQVFQO0FBUFosNkVBQTZEO0FBQzdELCtFQUErRDtBQUUvRCxZQUFZO0FBQ1osSUFBSSxvQkFBb0IsR0FBRyxJQUFJLDZDQUFlLEVBQUUsQ0FBQTtBQVNoRDs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU87SUFDbkMsa0JBQVUsR0FBRyxPQUFPLENBQUE7SUFDcEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLE9BQU87Z0JBQ1YsTUFBTSxhQUFLLEVBQUUsQ0FBQTtnQkFDYixLQUFLLENBQUE7WUFDUCxLQUFLLE9BQU87Z0JBQ1YsTUFBTSxhQUFLLEVBQUUsQ0FBQTtnQkFDYixLQUFLLENBQUE7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxZQUFJLEVBQUUsQ0FBQTtnQkFDWixLQUFLLENBQUE7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ25CLEtBQUssQ0FBQTtZQUNQLEtBQUssTUFBTTtnQkFDVCxNQUFNLFlBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDbkIsS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsaUNBQWlDLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtR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