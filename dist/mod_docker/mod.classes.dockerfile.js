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
                yield npmci_bash_1.bash(`docker run --name npmci_test_container --entrypoint="bash" ${this.buildTag} -c "mkdir /npmci_test"`);
                yield npmci_bash_1.bash(`docker cp ${testFile} npmci_test_container:/npmci_test/test.sh`);
                yield npmci_bash_1.bash(`docker commit npmci_test_container npmci_test_image`);
                yield npmci_bash_1.bash(`docker run --entrypoint="bash" npmci_test_image -x /npmci_test/test.sh`);
                yield npmci_bash_1.bash(`docker rm npmci_test_container`);
                yield npmci_bash_1.bash(`docker rmi --force npmci_test_image`);
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
            let containerId = yield npmci_bash_1.bash('docker inspect --type=image --format="{{.Id}}" ' + this.buildTag);
            return containerId;
        });
    }
}
exports.Dockerfile = Dockerfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMuZG9ja2VyZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3RzL21vZF9kb2NrZXIvbW9kLmNsYXNzZXMuZG9ja2VyZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLHlDQUF5QztBQUN6Qyw4Q0FBcUM7QUFDckMsd0NBQXdDO0FBR3hDLHlDQUF5QztBQUV6Qzs7R0FFRztBQUNIO0lBV0UsWUFBWSxPQUE4RTtRQUN4RixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFFOUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNsRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNGLENBQUM7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