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
    plugins.beautylog.log('now building Dockerfiles...');
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
    let fileTree = yield plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*');
    // create the Dockerfile array
    let readDockerfilesArray = [];
    plugins.beautylog.info(`found ${fileTree.length} Dockerfiles:`);
    console.log(fileTree);
    for (let dockerfilePath of fileTree) {
        let myDockerfile = new Dockerfile({
            filePath: plugins.path.join(paths.cwd, dockerfilePath),
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
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.build();
    }
    return sortedArrayArg;
});
/**
 * pushes the real Dockerfile images to a Docker registry
 */
exports.pushDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.push(NpmciEnv.buildStage);
    }
    return sortedArrayArg;
});
/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
exports.pullDockerfileImages = (sortableArrayArg, registryArg = 'registry.gitlab.com') => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortableArrayArg) {
        yield dockerfileArg.pull(registryArg);
    }
    return sortableArrayArg;
});
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
exports.testDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.test();
    }
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
        this.gitlabTestTag = exports.dockerTag('registry.gitlab.com', this.repo, this.version, 'test');
        this.gitlabReleaseTag = exports.dockerTag('registry.gitlab.com', this.repo, this.version);
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
            let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} .`;
            yield npmci_bash_1.bash(buildCommand);
            NpmciEnv.dockerFilesBuilt.push(this);
            return;
        });
    }
    ;
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (stageArg) {
                case 'release':
                    yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.releaseTag}`);
                    yield npmci_bash_1.bash(`docker push ${this.releaseTag}`);
                    // if release registry is different from gitlab
                    if (NpmciEnv.dockerRegistry !== 'registry.gitlab.com') {
                        yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`);
                        yield npmci_bash_1.bash(`docker push ${this.gitlabReleaseTag}`);
                    }
                    break;
                case 'test':
                default:
                    yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabTestTag}`);
                    yield npmci_bash_1.bash(`docker push ${this.gitlabTestTag}`);
                    break;
            }
        });
    }
    ;
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let pullTag = this.gitlabTestTag;
            yield npmci_bash_1.bash('docker pull ' + pullTag);
            yield npmci_bash_1.bash('docker tag ' + pullTag + ' ' + this.buildTag);
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
                yield npmci_bash_1.bash('docker run --name npmci_test_container ' + this.buildTag + ' mkdir /npmci_test');
                yield npmci_bash_1.bash('docker cp ' + testFile + ' npmci_test_container:/npmci_test/test.sh');
                yield npmci_bash_1.bash('docker commit npmci_test_container npmci_test_image');
                yield npmci_bash_1.bash('docker run npmci_test_image sh /npmci_test/test.sh');
                yield npmci_bash_1.bash('docker rm npmci_test_container');
                yield npmci_bash_1.bash('docker rmi --force npmci_test_image');
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
            let containerId = yield npmci_bash_1.bash('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLHdDQUF1QztBQUN2Qyw2Q0FBbUM7QUFFbkM7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRztJQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0lBQ3BELE1BQU0sdUJBQWUsRUFBRTtTQUNwQixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUMsc0JBQWMsQ0FBQztTQUNwQixJQUFJLENBQUMsd0JBQWdCLENBQUM7U0FDdEIsSUFBSSxDQUFDLHVCQUFlLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsZUFBZSxHQUFHO0lBQzNCLElBQUksUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFFaEYsOEJBQThCO0lBQzlCLElBQUksb0JBQW9CLEdBQWlCLEVBQUUsQ0FBQTtJQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNoQyxRQUFRLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUM7WUFDdEQsSUFBSSxF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