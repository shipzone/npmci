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
        sortableArrayArg.forEach(dockerfileArg => {
            let cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 &&
                sortedArray.indexOf(dockerfileArg) === -1) {
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
    sortedArray.forEach(dockerfileArg => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmhlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL21vZC5oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsd0NBQXdDO0FBRXhDLCtDQUErQztBQUcvQyxxRUFBc0Q7QUFFdEQ7OztHQUdHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsR0FBZ0MsRUFBRTtJQUM3RCxJQUFJLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRWpGLDhCQUE4QjtJQUM5QixJQUFJLG9CQUFvQixHQUFpQixFQUFFLENBQUM7SUFDNUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxRQUFRLENBQUMsTUFBTSxlQUFlLENBQUMsQ0FBQztJQUNoRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RCLEdBQUcsQ0FBQyxDQUFDLElBQUksY0FBYyxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxZQUFZLEdBQUcsSUFBSSxtQ0FBVSxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLElBQUksRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gsb0JBQW9CLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7QUFDOUIsQ0FBQyxDQUFBLENBQUM7QUFFRjs7OztHQUlHO0FBQ1EsUUFBQSxlQUFlLEdBQUcsQ0FBQyxnQkFBOEIsRUFBeUIsRUFBRTtJQUNyRixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBZ0IsQ0FBQztJQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FB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