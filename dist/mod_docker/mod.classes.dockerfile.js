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
const npmci_bash_1 = require("../npmci.bash");
const paths = require("../npmci.paths");
const helpers = require("./mod.helpers");
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
class Dockerfile {
    constructor(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo;
        this.version = helpers.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ':' + this.version;
        this.buildTag = this.cleanTag;
        this.containerName = 'dockerfile-' + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
        }
        this.baseImage = helpers.dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    }
    /**
     * builds the Dockerfile
     */
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag);
            let buildArgsString = yield helpers.getDockerBuildArgs();
            let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} ${buildArgsString} .`;
            yield npmci_bash_1.bash(buildCommand);
            return;
        });
    }
    /**
     * pushes the Dockerfile to a registry
     */
    push(dockerRegistryArg, versionSuffix = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let pushTag = helpers.getDockerTagString(dockerRegistryArg.registryUrl, this.repo, this.version, versionSuffix);
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${pushTag}`);
            yield npmci_bash_1.bash(`docker push ${pushTag}`);
        });
    }
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg, versionSuffixArg = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let pullTag = helpers.getDockerTagString(registryArg.registryUrl, this.repo, this.version, versionSuffixArg);
            yield npmci_bash_1.bash(`docker pull ${pullTag}`);
            yield npmci_bash_1.bash(`docker tag ${pullTag} ${this.buildTag}`);
        });
    }
    /**
     * tests the Dockerfile;
     */
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            let testFile = plugins.path.join(paths.NpmciTestDir, 'test_' + this.version + '.sh');
            let testFileExists = plugins.smartfile.fs.fileExistsSync(testFile);
            if (testFileExists) {
                // run tests
                yield npmci_bash_1.bash('docker run --name npmci_test_container ' + this.buildTag + ' --entrypoint="mkdir" /npmci_test');
                yield npmci_bash_1.bash('docker cp ' + testFile + ' npmci_test_container:/npmci_test/test.sh');
                yield npmci_bash_1.bash('docker commit npmci_test_container npmci_test_image');
                yield npmci_bash_1.bash('docker run npmci_test_image --entrypoint="sh" /npmci_test/test.sh');
                yield npmci_bash_1.bash('docker rm npmci_test_container');
                yield npmci_bash_1.bash('docker rmi --force npmci_test_image');
            }
            else {
                plugins.beautylog.warn('skipping tests for ' + this.cleanTag + ' because no testfile was found!');
            }
        });
    }
    /**
     * gets the id of a Dockerfile
     */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            let containerId = yield npmci_bash_1.bash('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag);
            return containerId;
        });
    }
}
exports.Dockerfile = Dockerfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMuZG9ja2VyZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZF9kb2NrZXIvbW9kLmNsYXNzZXMuZG9ja2VyZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLHlDQUF3QztBQUN4Qyw4Q0FBb0M7QUFDcEMsd0NBQXVDO0FBR3ZDLHlDQUF3QztBQUV4Qzs7R0FFRztBQUNIO0lBV0UsWUFBYSxPQUE4RTtRQUN6RixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25GLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFFN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUNqRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBO1FBQzFGLENBQUM7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