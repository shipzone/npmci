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
const NpmciConfig = require("../npmci.config");
const mod_classes_dockerfile_1 = require("./mod.classes.dockerfile");
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
        let myDockerfile = new mod_classes_dockerfile_1.Dockerfile({
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
exports.getDockerTagString = (registryArg, repoArg, versionArg, suffixArg) => {
    // determine wether the repo should be mapped accordingly to the registry
    let mappedRepo = NpmciConfig.configObject.dockerRegistryRepoMap[registryArg];
    let repo = (() => {
        if (mappedRepo) {
            return mappedRepo;
        }
        else {
            return repoArg;
        }
    })();
    // determine wether the version contais a suffix
    let version = versionArg;
    if (suffixArg) {
        version = versionArg + '_' + suffixArg;
    }
    let tagString = `${registryArg}/${repo}:${version}`;
    return tagString;
};
exports.getDockerBuildArgs = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('checking for env vars to be supplied to the docker build');
    let buildArgsString = '';
    for (let key in NpmciConfig.configObject.dockerBuildargEnvMap) {
        let targetValue = process.env[NpmciConfig.configObject.dockerBuildargEnvMap[key]];
        buildArgsString = `${buildArgsString} --build-arg ${key}=${targetValue}`;
    }
    return buildArgsString;
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL21vZC5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsd0NBQXVDO0FBRXZDLCtDQUE4QztBQUc5QyxxRUFBcUQ7QUFFckQ7OztHQUdHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsR0FBZ0MsRUFBRTtJQUM3RCxJQUFJLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBRWhGLDhCQUE4QjtJQUM5QixJQUFJLG9CQUFvQixHQUFpQixFQUFFLENBQUE7SUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsTUFBTSxlQUFlLENBQUMsQ0FBQTtJQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxtQ0FBVSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFBO1FBQ0Ysb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pDLENBQUM7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUE7QUFFN0IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7OztHQUlHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBQyxnQkFBOEIsRUFBeUIsRUFBRTtJQUNyRixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBZ0IsQ0FBQTtJQUMxQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FB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