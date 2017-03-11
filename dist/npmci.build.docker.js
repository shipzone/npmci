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
const paths = require("./npmci.paths");
const NpmciEnv = require("./npmci.env");
const npmci_bash_1 = require("./npmci.bash");
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles)
        .then(exports.pushDockerfiles);
});
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
exports.readDockerfiles = () => __awaiter(this, void 0, void 0, function* () {
    let fileTree = yield plugins.smartfile.fs.listFileTree(paths.cwd, './Dockerfile*');
    // create the Dockerfile array
    let readDockerfilesArray = [];
    for (let dockerfilePath of fileTree) {
        let myDockerfile = new Dockerfile({
            filePath: dockerfilePath,
            read: true
        });
        readDockerfilesArray.push(myDockerfile);
    }
    return readDockerfilesArray;
});
/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
exports.sortDockerfiles = (sortableArrayArg) => {
    let done = plugins.q.defer();
    let sortedArray = [];
    let cleanTagsOriginal = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    let sorterFunctionCounter = 0;
    let sorterFunction = function () {
        sortableArrayArg.forEach((dockerfileArg) => {
            let cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 && sortedArray.indexOf(dockerfileArg) === -1) {
                sortedArray.push(dockerfileArg);
            }
            ;
            if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
                dockerfileArg.localBaseImageDependent = true;
            }
            ;
        });
        if (sortableArrayArg.length === sortedArray.length) {
            done.resolve(sortedArray);
        }
        else if (sorterFunctionCounter < 10) {
            sorterFunctionCounter++;
            sorterFunction();
        }
        ;
    };
    sorterFunction();
    return done.promise;
};
/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
exports.mapDockerfiles = (sortedArray) => __awaiter(this, void 0, void 0, function* () {
    sortedArray.forEach((dockerfileArg) => {
        if (dockerfileArg.localBaseImageDependent) {
            sortedArray.forEach((dockfile2) => {
                if (dockfile2.cleanTag === dockerfileArg.baseImage) {
                    dockerfileArg.localBaseDockerfile = dockfile2;
                }
            });
        }
        ;
    });
    return sortedArray;
});
/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
exports.buildDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    sortedArrayArg.forEach(function (dockerfileArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dockerfileArg.build();
        });
    });
    return sortedArrayArg;
});
/**
 * pushes the real Dockerfile images to a Docker registry
 */
exports.pushDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    sortedArrayArg.forEach((dockerfileArg) => __awaiter(this, void 0, void 0, function* () {
        yield dockerfileArg.push(NpmciEnv.buildStage);
    }));
    return sortedArrayArg;
});
/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
exports.pullDockerfileImages = (sortableArrayArg, registryArg = 'registry.gitlab.com') => __awaiter(this, void 0, void 0, function* () {
    sortableArrayArg.forEach((dockerfileArg) => __awaiter(this, void 0, void 0, function* () {
        yield dockerfileArg.pull(registryArg);
    }));
    return sortableArrayArg;
});
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
exports.testDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    sortedArrayArg.forEach((dockerfileArg) => __awaiter(this, void 0, void 0, function* () {
        yield dockerfileArg.test();
    }));
    return sortedArrayArg;
});
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
class Dockerfile {
    constructor(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo;
        this.version = exports.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ':' + this.version;
        this.buildTag = this.cleanTag;
        this.testTag = exports.dockerTag('registry.gitlab.com', this.repo, this.version, 'test');
        this.releaseTag = exports.dockerTag(NpmciEnv.dockerRegistry, this.repo, this.version);
        this.containerName = 'dockerfile-' + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
        }
        ;
        this.baseImage = exports.dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    }
    ;
    /**
     * builds the Dockerfile
     */
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag);
            yield npmci_bash_1.bashBare('docker build -t ' + this.buildTag + ' -f ' + this.filePath + ' .');
            NpmciEnv.dockerFilesBuilt.push(this);
        });
    }
    ;
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let pushTag;
            switch (stageArg) {
                case 'release':
                    pushTag = this.releaseTag;
                    break;
                case 'test':
                default:
                    pushTag = this.testTag;
                    break;
            }
            yield npmci_bash_1.bashBare('docker tag ' + this.buildTag + ' ' + pushTag);
            yield npmci_bash_1.bashBare('docker push ' + pushTag);
        });
    }
    ;
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let pullTag = this.testTag;
            yield npmci_bash_1.bashBare('docker pull ' + pullTag);
            yield npmci_bash_1.bashBare('docker tag ' + pullTag + ' ' + this.buildTag);
        });
    }
    ;
    /**
     * tests the Dockerfile;
     */
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            let testFile = plugins.path.join(paths.NpmciTestDir, 'test_' + this.version + '.sh');
            let testFileExists = plugins.smartfile.fs.fileExistsSync(testFile);
            if (testFileExists) {
                // run tests
                yield npmci_bash_1.bashBare('docker run --name npmci_test_container ' + this.buildTag + ' mkdir /npmci_test');
                yield npmci_bash_1.bashBare('docker cp ' + testFile + ' npmci_test_container:/npmci_test/test.sh');
                yield npmci_bash_1.bashBare('docker commit npmci_test_container npmci_test_image');
                yield npmci_bash_1.bashBare('docker run npmci_test_image sh /npmci_test/test.sh');
                yield npmci_bash_1.bashBare('docker rm npmci_test_container');
                yield npmci_bash_1.bashBare('docker rmi --force npmci_test_image');
            }
            else {
                plugins.beautylog.warn('skipping tests for ' + this.cleanTag + ' because no testfile was found!');
            }
        });
    }
    ;
    /**
     * gets the id of a Dockerfile
     */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            let containerId = yield npmci_bash_1.bashBare('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag);
            return containerId;
        });
    }
    ;
}
exports.Dockerfile = Dockerfile;
/**
 * returns a version for a docker file
 * @execution SYNC
 */
exports.dockerFileVersion = (dockerfileNameArg) => {
    let versionString;
    let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    let regexResultArray = versionRegex.exec(dockerfileNameArg);
    if (regexResultArray && regexResultArray.length === 2) {
        versionString = regexResultArray[1];
    }
    else {
        versionString = 'latest';
    }
    return versionString;
};
/**
 *
 */
exports.dockerBaseImage = function (dockerfileContentArg) {
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
/**
 *
 */
exports.dockerTag = function (registryArg, repoArg, versionArg, suffixArg) {
    let tagString;
    let registry = registryArg;
    let repo = repoArg;
    let version = versionArg;
    if (suffixArg) {
        version = versionArg + '_' + suffixArg;
    }
    ;
    tagString = registry + '/' + repo + ':' + version;
    return tagString;
};
/**
 *
 */
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    let cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) === -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLHdDQUF1QztBQUN2Qyw2Q0FBdUM7QUFFdkM7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRztJQUNqQixNQUFNLHVCQUFlLEVBQUU7U0FDcEIsSUFBSSxDQUFDLHVCQUFlLENBQUM7U0FDckIsSUFBSSxDQUFDLHNCQUFjLENBQUM7U0FDcEIsSUFBSSxDQUFDLHdCQUFnQixDQUFDO1NBQ3RCLElBQUksQ0FBQyx1QkFBZSxDQUFDLENBQUE7QUFDMUIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLGVBQWUsR0FBRztJQUMzQixJQUFJLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRWxGLDhCQUE4QjtJQUM5QixJQUFJLG9CQUFvQixHQUFpQixFQUFFLENBQUE7SUFDM0MsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNoQyxRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQTtRQUNGLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFBO0FBRTdCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNRLFFBQUEsZUFBZSxHQUFHLENBQUMsZ0JBQThCO0lBQzFELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFn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