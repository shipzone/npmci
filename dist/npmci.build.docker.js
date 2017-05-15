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
    plugins.beautylog.log('Now building Dockerfiles:');
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
            yield npmci_bash_1.bashBare('docker build -t ' + this.buildTag + ' -f ' + this.filePath + ' .');
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
                    yield npmci_bash_1.bashBare(`docker tag ${this.buildTag} ${this.releaseTag}`);
                    yield npmci_bash_1.bashBare(`docker push ${this.releaseTag}`);
                    // if release registry is different from gitlab
                    if (NpmciEnv.dockerRegistry !== 'registry.gitlab.com') {
                        yield npmci_bash_1.bashBare(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`);
                        yield npmci_bash_1.bashBare(`docker push ${this.gitlabReleaseTag}`);
                    }
                    break;
                case 'test':
                default:
                    yield npmci_bash_1.bashBare(`docker tag ${this.buildTag} ${this.gitlabTestTag}`);
                    yield npmci_bash_1.bashBare(`docker push ${this.gitlabTestTag}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLHdDQUF1QztBQUN2Qyw2Q0FBdUM7QUFFdkM7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRztJQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQ2xELE1BQU0sdUJBQWUsRUFBRTtTQUNwQixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUMsc0JBQWMsQ0FBQztTQUNwQixJQUFJLENBQUMsd0JBQWdCLENBQUM7U0FDdEIsSUFBSSxDQUFDLHVCQUFlLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsZUFBZSxHQUFHO0lBQzNCLElBQUksUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsZUFBZSxDQUFDLENBQUE7SUFFbEYsOEJBQThCO0lBQzlCLElBQUksb0JBQW9CLEdBQWlCLEVBQUUsQ0FBQTtJQUMzQyxHQUFHLENBQUMsQ0FBQyxJQUFJLGNBQWMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFBO1FBQ0Ysb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUE7QUFFN0IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBQyxnQkFBOEI7SUFDMUQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQWdCLENBQUE7SUFDMUMsSUFBSSxXQUFXLEdBQWlCLEVBQUUsQ0FBQTtJQUNsQyxJQUFJLGlCQUFpQixHQUFHLDhCQUFzQixDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFBO0lBQzdFLElBQUkscUJBQXFCLEdBQVcsQ0FBQyxDQUFBO0lBQ3JDLElBQUksY0FBYyxHQUFHO1FBQ25CLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWE7WUFDckMsSUFBSSxTQUFTLEdBQUcsOEJBQXNCLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUE7WUFDckUsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25HLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDakMsQ0FBQztZQUFBLENBQUM7WUFDRixFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUQsYUFBYSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQTtZQUM5QyxDQUFDO1lBQUEsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDM0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLHFCQUFxQixFQUFFLENBQUE7WUFDdkIsY0FBYyxFQUFFLENBQUE7UUFDbEIsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDLENBQUE7SUFDRCxjQUFjLEVBQUUsQ0FBQTtJQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsY0FBYyxHQUFHLENBQU8sV0FBeUI7SUFDMUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWE7UUFDaEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUMxQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBcUI7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEtBQUssYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ25ELGFBQWEsQ0FBQyxtQkFBbUIsR0FBRyxTQUFTLENBQUE7Z0JBQy9DLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFBQSxDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsV0FBVyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLGdCQUFnQixHQUFHLENBQU8sY0FBNEI7SUFDL0QsR0FBRyxDQUFDLENBQUMsSUFBSSxhQUFhLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM3QixDQUFDO0lBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQTtBQUN2QixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBTyxjQUE0QjtJQUM5RCxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0MsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7QUFDdkIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLG9CQUFvQixHQUFHLENBQU8sZ0JBQThCLEVBQUUsV0FBVyxHQUFHLHFCQUFxQjtJQUMxRyxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDM0MsTUFBTSxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7SUFDRCxNQUFNLENBQUMsZ0JBQWdCLENBQUE7QUFDekIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLGVBQWUsR0FBRyxDQUFPLGNBQTRCO0lBQzlELEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7QUFDdkIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBY0UsWUFBWSxPQUE4RTtRQUN4RixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDaEMsSUFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7UUFDekQsSUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBaUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQTtRQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLGlCQUFTLENBQUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3RGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxpQkFBUyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2pGLElBQUksQ0FBQyxVQUFVLEdBQUcsaUJBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzdFLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUE7UUFDakQsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtRQUMxRixDQUFDO1FBQUEsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsdUJBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDOUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQTtJQUN0QyxDQUFDO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDdEUsTUFBTSxxQkFBUSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUE7WUFDbEYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNwQyxNQUFNLENBQUE7UUFDUixDQUFDO0tBQUE7SUFBQSxDQUFDO0lBRUY7O09BRUc7SUFDRyxJQUFJLENBQUMsUUFBUTs7WUFDakIsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDakIsS0FBSyxTQUFTO29CQUNaLE1BQU0scUJBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7b0JBQ2hFLE1BQU0scUJBQVEsQ0FBQyxlQUFlLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO29CQUVoRCwrQ0FBK0M7b0JBQy9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEtBQUsscUJBQXFCLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxNQUFNLHFCQUFRLENBQUMsY0FBYyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7d0JBQ3RFLE1BQU0scUJBQVEsQ0FBQyxlQUFlLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUE7b0JBQ3hELENBQUM7b0JBQ0QsS0FBSyxDQUFBO2dCQUNQLEtBQUssTUFBTSxDQUFDO2dCQUNaO29CQUNFLE1BQU0scUJBQVEsQ0FBQyxjQUFjLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUE7b0JBQ25FLE1BQU0scUJBQVEsQ0FBQyxlQUFlLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO29CQUNuRCxLQUFLLENBQUE7WUFDVCxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0csSUFBSSxDQUFDLFdBQW1COztZQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFBO1lBQ2hDLE1BQU0scUJBQVEsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLENBQUE7WUFDeEMsTUFBTSxxQkFBUSxDQUFDLGFBQWEsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUMvRCxDQUFDO0tBQUE7SUFBQSxDQUFDO0lBRUY7O09BRUc7SUFDRyxJQUFJOztZQUNSLElBQUksUUFBUSxHQUFXLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUE7WUFDNUYsSUFBSSxjQUFjLEdBQVksT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFlBQVk7Z0JBQ1osTUFBTSxxQkFBUSxDQUFDLHlDQUF5QyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsb0JBQW9CLENBQUMsQ0FBQTtnQkFDaEcsTUFBTSxxQkFBUSxDQUFDLFlBQVksR0FBRyxRQUFRLEdBQUcsMkNBQTJDLENBQUMsQ0FBQTtnQkFDckYsTUFBTSxxQkFBUSxDQUFDLHFEQUFxRCxDQUFDLENBQUE7Z0JBQ3JFLE1BQU0scUJBQVEsQ0FBQyxvREFBb0QsQ0FBQyxDQUFBO2dCQUNwRSxNQUFNLHFCQUFRLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtnQkFDaEQsTUFBTSxxQkFBUSxDQUFDLHFDQUFxQyxDQUFDLENBQUE7WUFDdkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsaUNBQWlDLENBQUMsQ0FBQTtZQUNuRyxDQUFDO1FBQ0gsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxJQUFJLFdBQVcsR0FBRyxNQUFNLHFCQUFRLENBQUMsbURBQW1ELEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3JHLE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDcEIsQ0FBQztLQUFBO0lBQUEsQ0FBQztDQUNIO0FBbkdELGdDQW1HQztBQUVEOzs7R0FHRztBQUNRLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBeUI7SUFDdkQsSUFBSSxhQUFxQixDQUFBO0lBQ3pCLElBQUksWUFBWSxHQUFHLDhCQUE4QixDQUFBO0lBQ2pELElBQUksZ0JBQWdCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBQzNELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELGFBQWEsR0FBRyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUUsQ0FBQTtJQUN2QyxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixhQUFhLEdBQUcsUUFBUSxDQUFBO0lBQzFCLENBQUM7SUFDRCxNQUFNLENBQUMsYUFBYSxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsVUFBVSxvQkFBNEI7SUFDakUsSUFBSSxjQUFjLEdBQUcsK0JBQStCLENBQUE7SUFDcEQsSUFBSSxnQkFBZ0IsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUE7SUFDaEUsTUFBTSxDQUFDLGdCQUFnQixDQUFFLENBQUMsQ0FBRSxDQUFBO0FBQzlCLENBQUMsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsVUFBVSxXQUFtQixFQUFFLE9BQWUsRUFBRSxVQUFrQixFQUFFLFNBQWtCO0lBQzNHLElBQUksU0FBaUIsQ0FBQTtJQUNyQixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUE7SUFDMUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFBO0lBQ2xCLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQTtJQUN4QixFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ2QsT0FBTyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFBO0lBQ3hDLENBQUM7SUFBQSxDQUFDO0lBQ0YsU0FBUyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUE7SUFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsc0JBQXNCLEdBQUcsVUFBVSxrQkFBZ0MsRUFBRSxnQkFBOEI7SUFDNUcsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFBO0lBQ2pDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFVLGFBQWE7UUFDaEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUM3QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDRixNQUFNLENBQUMsY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSJ9