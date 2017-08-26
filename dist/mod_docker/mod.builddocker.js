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
const paths = require("../npmci.paths");
const NpmciEnv = require("../npmci.env");
const npmci_bash_1 = require("../npmci.bash");
let modArgvArg; // will be set through the build command
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    modArgvArg = argvArg;
    plugins.beautylog.log('now building Dockerfiles...');
    yield exports.readDockerfiles(argvArg)
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles)
        .then(exports.pushDockerfiles);
});
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
exports.readDockerfiles = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    modArgvArg = argvArg;
    let fileTree = yield plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*');
    // create the Dockerfile array
    let readDockerfilesArray = [];
    plugins.beautylog.info(`found ${fileTree.length} Dockerfiles:`);
    console.log(fileTree);
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
    plugins.beautylog.info('sorting Dockerfiles:');
    let sortedArray = [];
    let cleanTagsOriginal = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    let sorterFunctionCounter = 0;
    let sorterFunction = function () {
        sortableArrayArg.forEach((dockerfileArg) => {
            let cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 && sortedArray.indexOf(dockerfileArg) === -1) {
                sortedArray.push(dockerfileArg);
            }
            if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
                dockerfileArg.localBaseImageDependent = true;
            }
        });
        if (sortableArrayArg.length === sortedArray.length) {
            let counter = 1;
            for (let dockerfile of sortedArray) {
                plugins.beautylog.log(`tag ${counter}: -> ${dockerfile.cleanTag}`);
                counter++;
            }
            done.resolve(sortedArray);
        }
        else if (sorterFunctionCounter < 10) {
            sorterFunctionCounter++;
            sorterFunction();
        }
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
    let stageArg = (function () {
        if (modArgvArg._ && modArgvArg._.length >= 3) {
            return modArgvArg._[2];
        }
        else {
            return NpmciEnv.buildStage;
        }
    })();
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.push(stageArg);
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
        this.gitlabTestTag = exports.getDockerTagString('docker.io', this.repo, this.version, 'test'); // TODO: using docker.io until gitlab is fixed
        this.gitlabReleaseTag = exports.getDockerTagString('docker.io', this.repo, this.version); // TODO: using docker.io until gitlab is fixed
        // the releaseTag determines where the image gets released
        this.releaseTag = exports.getDockerTagString('docker.io', this.repo, this.version);
        this.containerName = 'dockerfile-' + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
        }
        this.baseImage = exports.dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    }
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
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.releaseTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabTestTag}`);
            switch (stageArg) {
                case 'release':
                    yield npmci_bash_1.bash(`docker push ${this.gitlabReleaseTag}`);
                    yield npmci_bash_1.bash(`docker push ${this.releaseTag}`);
                    break;
                case 'test':
                default:
                    yield npmci_bash_1.bash(`docker push ${this.gitlabTestTag}`);
                    break;
            }
        });
    }
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield npmci_bash_1.bash(`docker pull ${this.gitlabTestTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.gitlabTestTag} ${this.buildTag}`);
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
 * returns the docker base image for a Dockerfile
 */
exports.dockerBaseImage = function (dockerfileContentArg) {
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
/**
 * returns the docker tag
 */
exports.getDockerTagString = function (registryArg, repoArg, versionArg, suffixArg) {
    // determine wether the suffix is needed
    let version = versionArg;
    if (suffixArg) {
        version = versionArg + '_' + suffixArg;
    }
    let tagString = `${registryArg}/${repoArg}:${version}`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmJ1aWxkZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMvbW9kX2RvY2tlci9tb2QuYnVpbGRkb2NrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUN4Qyx3Q0FBdUM7QUFDdkMseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUVwQyxJQUFJLFVBQVUsQ0FBQSxDQUFDLHdDQUF3QztBQUV2RDs7R0FFRztBQUNRLFFBQUEsS0FBSyxHQUFHLENBQU8sT0FBWTtJQUNwQyxVQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUE7SUFDcEQsTUFBTSx1QkFBZSxDQUFDLE9BQU8sQ0FBQztTQUMzQixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUMsc0JBQWMsQ0FBQztTQUNwQixJQUFJLENBQUMsd0JBQWdCLENBQUM7U0FDdEIsSUFBSSxDQUFDLHVCQUFlLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsZUFBZSxHQUFHLENBQU8sT0FBTztJQUN6QyxVQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3BCLElBQUksUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFFaEYsOEJBQThCO0lBQzlCLElBQUksb0JBQW9CLEdBQWlCLEVBQUUsQ0FBQTtJQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztR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