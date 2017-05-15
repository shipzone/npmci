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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLHdDQUF1QztBQUN2Qyw2Q0FBdUM7QUFFdkM7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRztJQUNqQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFBO0lBQ3BELE1BQU0sdUJBQWUsRUFBRTtTQUNwQixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUMsc0JBQWMsQ0FBQztTQUNwQixJQUFJLENBQUMsd0JBQWdCLENBQUM7U0FDdEIsSUFBSSxDQUFDLHVCQUFlLENBQUMsQ0FBQTtBQUMxQixDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsZUFBZSxHQUFHO0lBQzNCLElBQUksUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUE7SUFFaEYsOEJBQThCO0lBQzlCLElBQUksb0JBQW9CLEdBQWlCLEVBQUUsQ0FBQTtJQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxNQUFNLGVBQWUsQ0FBQyxDQUFBO0lBQy9ELE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLENBQUMsSUFBSSxjQUFjLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFlBQVksR0FBRyxJQUFJLFVBQVUsQ0FBQztZQUNoQyxRQUFRLEVBQUUsY0FBYztZQUN4QixJQUFJLEVBQUUsSUFBSTtTQUNYLENBQUMsQ0FBQTtRQUNGLG9CQUFvQixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFBO0FBRTdCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7Ozs7R0FJRztBQUNRLFFBQUEsZUFBZSxHQUFHLENBQUMsZ0JBQThCO0lBQzFELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFnQixDQUFBO0lBQzFDLElBQUksV0FBVyxHQUFpQixFQUFFLENBQUE7SUFDbEMsSUFBSSxpQkFBaUIsR0FBRyw4QkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQTtJQUM3RSxJQUFJLHFCQUFxQixHQUFXLENBQUMsQ0FBQTtJQUNyQyxJQUFJLGNBQWMsR0FBRztRQUNuQixnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhO1lBQ3JDLElBQUksU0FBUyxHQUFHLDhCQUFzQixDQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFBO1lBQ3JFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ2pDLENBQUM7WUFBQSxDQUFDO1lBQ0YsRUFBRSxDQUFDLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlELGFBQWEsQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUE7WUFDOUMsQ0FBQztZQUFBLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzNCLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMscUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0QyxxQkFBcUIsRUFBRSxDQUFBO1lBQ3ZCLGNBQWMsRUFBRSxDQUFBO1FBQ2xCLENBQUM7UUFBQSxDQUFDO0lBQ0osQ0FBQyxDQUFBO0lBQ0QsY0FBYyxFQUFFLENBQUE7SUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLGNBQWMsR0FBRyxDQUFPLFdBQXlCO0lBQzFELFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7WUFDMUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQXFCO2dCQUN4QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxhQUFhLENBQUMsbUJBQW1CLEdBQUcsU0FBUyxDQUFBO2dCQUMvQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFDSixDQUFDO1FBQUEsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLFdBQVcsQ0FBQTtBQUNwQixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ1EsUUFBQSxnQkFBZ0IsR0FBRyxDQUFPLGNBQTRCO0lBQy9ELEdBQUcsQ0FBQyxDQUFDLElBQUksYUFBYSxJQUFJLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDN0IsQ0FBQztJQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7QUFDdkIsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsZUFBZSxHQUFHLENBQU8sY0FBNEI7SUFDOUQsR0FBRyxDQUFDLENBQUMsSUFBSSxhQUFhLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQy9DLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7OztHQUdHO0FBQ1EsUUFBQSxvQkFBb0IsR0FBRyxDQUFPLGdCQUE4QixFQUFFLFdBQVcsR0FBRyxxQkFBcUI7SUFDMUcsR0FBRyxDQUFDLENBQUMsSUFBSSxhQUFhLElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE1BQU0sYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBQ0QsTUFBTSxDQUFDLGdCQUFnQixDQUFBO0FBQ3pCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7OztHQUdHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBTyxjQUE0QjtJQUM5RCxHQUFHLENBQUMsQ0FBQyxJQUFJLGFBQWEsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sYUFBYSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFDRCxNQUFNLENBQUMsY0FBYyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQWNFLFlBQVksT0FBOEU7UUFDeEYsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3pELElBQUksQ0FBQyxPQUFPLEdBQUcseUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQTtRQUM5QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUE7UUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxpQkFBUyxDQUFDLHFCQUFxQixFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUN0RixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsaUJBQVMsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNqRixJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFTLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUM3RSxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUE7UUFDMUYsQ0FBQztRQUFBLENBQUM7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLHVCQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzlDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUE7SUFDdEMsQ0FBQztJQUFBLENBQUM7SUFFRjs7T0FFRztJQUNHLEtBQUs7O1lBQ1QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ3RFLE1BQU0scUJBQVEsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBO1lBQ2xGLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEMsTUFBTSxDQUFBO1FBQ1IsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0csSUFBSSxDQUFDLFFBQVE7O1lBQ2pCLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLEtBQUssU0FBUztvQkFDWixNQUFNLHFCQUFRLENBQUMsY0FBYyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFBO29CQUNoRSxNQUFNLHFCQUFRLENBQUMsZUFBZSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQTtvQkFFaEQsK0NBQStDO29CQUMvQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsY0FBYyxLQUFLLHFCQUFxQixDQUFDLENBQUMsQ0FBQzt3QkFDdEQsTUFBTSxxQkFBUSxDQUFDLGNBQWMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO3dCQUN0RSxNQUFNLHFCQUFRLENBQUMsZUFBZSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFBO29CQUN4RCxDQUFDO29CQUNELEtBQUssQ0FBQTtnQkFDUCxLQUFLLE1BQU0sQ0FBQztnQkFDWjtvQkFDRSxNQUFNLHFCQUFRLENBQUMsY0FBYyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFBO29CQUNuRSxNQUFNLHFCQUFRLENBQUMsZUFBZSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQTtvQkFDbkQsS0FBSyxDQUFBO1lBQ1QsQ0FBQztRQUNILENBQUM7S0FBQTtJQUFBLENBQUM7SUFFRjs7T0FFRztJQUNHLElBQUksQ0FBQyxXQUFtQjs7WUFDNUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQTtZQUNoQyxNQUFNLHFCQUFRLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFBO1lBQ3hDLE1BQU0scUJBQVEsQ0FBQyxhQUFhLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDL0QsQ0FBQztLQUFBO0lBQUEsQ0FBQztJQUVGOztPQUVHO0lBQ0csSUFBSTs7WUFDUixJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFBO1lBQzVGLElBQUksY0FBYyxHQUFZLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUMzRSxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixZQUFZO2dCQUNaLE1BQU0scUJBQVEsQ0FBQyx5Q0FBeUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFvQixDQUFDLENBQUE7Z0JBQ2hHLE1BQU0scUJBQVEsQ0FBQyxZQUFZLEdBQUcsUUFBUSxHQUFHLDJDQUEyQyxDQUFDLENBQUE7Z0JBQ3JGLE1BQU0scUJBQVEsQ0FBQyxxREFBcUQsQ0FBQyxDQUFBO2dCQUNyRSxNQUFNLHFCQUFRLENBQUMsb0RBQW9ELENBQUMsQ0FBQTtnQkFDcEUsTUFBTSxxQkFBUSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7Z0JBQ2hELE1BQU0scUJBQVEsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLGlDQUFpQyxDQUFDLENBQUE7WUFDbkcsQ0FBQztRQUNILENBQUM7S0FBQTtJQUFBLENBQUM7SUFFRjs7T0FFRztJQUNHLEtBQUs7O1lBQ1QsSUFBSSxXQUFXLEdBQUcsTUFBTSxxQkFBUSxDQUFDLG1EQUFtRCxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNyRyxNQUFNLENBQUMsV0FBVyxDQUFBO1FBQ3BCLENBQUM7S0FBQTtJQUFBLENBQUM7Q0FDSDtBQW5HRCxnQ0FtR0M7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLGlCQUFpQixHQUFHLENBQUMsaUJBQXlCO0lBQ3ZELElBQUksYUFBcUIsQ0FBQTtJQUN6QixJQUFJLFlBQVksR0FBRyw4QkFBOEIsQ0FBQTtJQUNqRCxJQUFJLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUMzRCxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxhQUFhLEdBQUcsZ0JBQWdCLENBQUUsQ0FBQyxDQUFFLENBQUE7SUFDdkMsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sYUFBYSxHQUFHLFFBQVEsQ0FBQTtJQUMxQixDQUFDO0lBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsZUFBZSxHQUFHLFVBQVUsb0JBQTRCO0lBQ2pFLElBQUksY0FBYyxHQUFHLCtCQUErQixDQUFBO0lBQ3BELElBQUksZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO0lBQ2hFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBRSxDQUFDLENBQUUsQ0FBQTtBQUM5QixDQUFDLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsU0FBUyxHQUFHLFVBQVUsV0FBbUIsRUFBRSxPQUFlLEVBQUUsVUFBa0IsRUFBRSxTQUFrQjtJQUMzRyxJQUFJLFNBQWlCLENBQUE7SUFDckIsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFBO0lBQzFCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQTtJQUNsQixJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDeEIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNkLE9BQU8sR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQTtJQUN4QyxDQUFDO0lBQUEsQ0FBQztJQUNGLFNBQVMsR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsT0FBTyxDQUFBO0lBQ2pELE1BQU0sQ0FBQyxTQUFTLENBQUE7QUFDbEIsQ0FBQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLHNCQUFzQixHQUFHLFVBQVUsa0JBQWdDLEVBQUUsZ0JBQThCO0lBQzVHLElBQUksY0FBYyxHQUFhLEVBQUUsQ0FBQTtJQUNqQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxhQUFhO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsY0FBYyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDN0MsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==