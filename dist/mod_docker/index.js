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
const NpmciEnv = require("../npmci.env");
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
            case 'prepare':
                yield exports.prepare();
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
                plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
    }
});
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.log('now building Dockerfiles...');
    yield helpers.readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles)
        .then(helpers.buildDockerfiles);
});
/**
 * logs in docker
 */
exports.prepare = () => __awaiter(this, void 0, void 0, function* () {
    NpmciEnv.setDockerRegistry('docker.io'); // TODO: checkup why we set this here
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
        yield npmciRegistryStorage.loginAll();
    }));
    return;
});
exports.push = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let registryUrlArg = argvArg._[2];
    let suffix = null;
    if (argvArg._.length >= 4) {
        suffix = argvArg._[3];
    }
    let dockerfileArray = yield helpers.readDockerfiles()
        .then(helpers.sortDockerfiles)
        .then(helpers.mapDockerfiles);
    let localDockerRegistry = npmciRegistryStorage.getRegistryByUrl(registryUrlArg);
    for (let dockerfile of dockerfileArray) {
        dockerfile.push(localDockerRegistry, suffix);
    }
});
exports.pull = (argvArg) => __awaiter(this, void 0, void 0, function* () {
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
    return yield helpers.readDockerfiles()
        .then(helpers.testDockerfiles);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFFeEMseUNBQXdDO0FBR3hDLHlDQUF3QztBQVl0QywwQkFBTztBQVZULFVBQVU7QUFDVixxRUFBcUQ7QUFRbkQscUJBUk8sbUNBQVUsQ0FRUDtBQVBaLDZFQUE2RDtBQUM3RCwrRUFBK0Q7QUFFL0QsWUFBWTtBQUNaLElBQUksb0JBQW9CLEdBQUcsSUFBSSw2Q0FBZSxFQUFFLENBQUE7QUFTaEQ7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTyxPQUFPO0lBQ25DLGtCQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxPQUFPO2dCQUNWLE1BQU0sYUFBSyxFQUFFLENBQUE7Z0JBQ2IsS0FBSyxDQUFBO1lBQ1AsS0FBSyxTQUFTO2dCQUNaLE1BQU0sZUFBTyxFQUFFLENBQUE7Z0JBQ2YsS0FBSyxDQUFBO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE1BQU0sWUFBSSxFQUFFLENBQUE7Z0JBQ1osS0FBSyxDQUFBO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE1BQU0sWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUNuQixLQUFLLENBQUE7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsTUFBTSxZQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQ25CLEtBQUssQ0FBQTtZQUNQO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLCtCQUErQixNQUFNLGtCQUFr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