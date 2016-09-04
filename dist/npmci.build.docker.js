"use strict";
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
const NpmciEnv = require("./npmci.env");
const npmci_bash_1 = require("./npmci.bash");
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = function () {
    let done = plugins.q.defer();
    exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles)
        .then(exports.pushDockerfiles)
        .then(() => {
        done.resolve();
    });
    return done.promise;
};
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
exports.readDockerfiles = function () {
    let done = plugins.q.defer();
    let readDockerfilesArray = [];
    plugins.gulp.src("./Dockerfile*")
        .pipe(plugins.through2.obj(function (file, enc, cb) {
        let myDockerfile = new Dockerfile({
            filePath: file.path,
            read: true
        });
        readDockerfilesArray.push(myDockerfile);
        cb(null, file);
    }, function () {
        done.resolve(readDockerfilesArray);
    }));
    return done.promise;
};
/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
exports.sortDockerfiles = function (sortableArrayArg) {
    let done = plugins.q.defer();
    let sortedArray = [];
    let cleanTagsOriginal = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    let sorterFunctionCounter = 0;
    let sorterFunction = function () {
        sortableArrayArg.forEach((dockerfileArg) => {
            let cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) == -1 && sortedArray.indexOf(dockerfileArg) == -1) {
                sortedArray.push(dockerfileArg);
            }
            ;
            if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) != -1) {
                dockerfileArg.localBaseImageDependent = true;
            }
            ;
        });
        if (sortableArrayArg.length == sortedArray.length) {
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
exports.mapDockerfiles = function (sortedArray) {
    let done = plugins.q.defer();
    sortedArray.forEach((dockerfileArg) => {
        if (dockerfileArg.localBaseImageDependent) {
            sortedArray.forEach((dockfile2) => {
                if (dockfile2.cleanTag == dockerfileArg.baseImage) {
                    dockerfileArg.localBaseDockerfile = dockfile2;
                }
            });
        }
        ;
    });
    done.resolve(sortedArray);
    return done.promise;
};
/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
exports.buildDockerfiles = (sortedArrayArg) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.build();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
/**
 * pushes the real Dockerfile images to a Docker registry
 */
exports.pushDockerfiles = function (sortedArrayArg) {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.push(NpmciEnv.buildStage);
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
exports.pullDockerfileImages = (sortableArrayArg, registryArg = "registry.gitlab.com") => {
    let done = plugins.q.defer();
    sortableArrayArg.forEach((dockerfileArg) => {
        dockerfileArg.pull(registryArg);
    });
    done.resolve(sortableArrayArg);
    return done.promise;
};
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
exports.testDockerfiles = (sortedArrayArg) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.test();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
class Dockerfile {
    constructor(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = exports.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        this.buildTag = this.cleanTag;
        this.testTag = exports.dockerTag("registry.gitlab.com", this.repo, this.version, "test");
        this.releaseTag = exports.dockerTag(NpmciEnv.dockerRegistry, this.repo, this.version);
        this.containerName = "dockerfile-" + this.version;
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
        let done = plugins.q.defer();
        plugins.beautylog.info("now building Dockerfile for " + this.cleanTag);
        npmci_bash_1.bashBare("docker build -t " + this.buildTag + " -f " + this.filePath + " .");
        NpmciEnv.dockerFilesBuilt.push(this);
        done.resolve();
        return done.promise;
    }
    ;
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg) {
        let done = plugins.q.defer();
        let pushTag;
        switch (stageArg) {
            case "release":
                pushTag = this.releaseTag;
                break;
            case "test":
            default:
                pushTag = this.testTag;
                break;
        }
        npmci_bash_1.bashBare("docker tag " + this.buildTag + " " + pushTag);
        npmci_bash_1.bashBare("docker push " + pushTag);
        done.resolve();
        return done.promise;
    }
    ;
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg) {
        let pullTag = this.testTag;
        npmci_bash_1.bashBare("docker pull " + pullTag);
        npmci_bash_1.bashBare("docker tag " + pullTag + " " + this.buildTag);
    }
    ;
    /**
     * tests the Dockerfile;
     */
    test() {
        let testFile = plugins.path.join(paths.NpmciTestDir, "test_" + this.version + ".sh");
        let testFileExists = plugins.smartfile.fs.fileExistsSync(testFile);
        if (testFileExists) {
            npmci_bash_1.bashBare("docker run --name npmci_test_container " + this.buildTag + " mkdir /npmci_test");
            npmci_bash_1.bashBare("docker cp " + testFile + " npmci_test_container:/npmci_test/test.sh");
            npmci_bash_1.bashBare("docker commit npmci_test_container npmci_test_image");
            npmci_bash_1.bashBare("docker run npmci_test_image sh /npmci_test/test.sh");
            npmci_bash_1.bashBare("docker rm npmci_test_container");
            npmci_bash_1.bashBare("docker rmi --force npmci_test_image");
        }
        else {
            plugins.beautylog.warn("skipping tests for " + this.cleanTag + " because no testfile was found!");
        }
    }
    ;
    /**
     * gets the id of a Dockerfile
     */
    getId() {
        let containerId = npmci_bash_1.bashBare("docker inspect --type=image --format=\"{{.Id}}\" " + this.buildTag);
        return containerId;
    }
    ;
}
exports.Dockerfile = Dockerfile;
/**
 *
 */
exports.dockerFileVersion = function (dockerfileNameArg) {
    let versionString;
    let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    let regexResultArray = versionRegex.exec(dockerfileNameArg);
    if (regexResultArray && regexResultArray.length == 2) {
        versionString = regexResultArray[1];
    }
    else {
        versionString = "latest";
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
        version = versionArg + "_" + suffixArg;
    }
    ;
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};
/**
 *
 */
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    let cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) == -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLE1BQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZDLE1BQVksUUFBUSxXQUFNLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLDZCQUF1QixjQUFjLENBQUMsQ0FBQTtBQUV0Qzs7R0FFRztBQUNRLGFBQUssR0FBRztJQUNmLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUJBQWUsRUFBRTtTQUNaLElBQUksQ0FBQyx1QkFBZSxDQUFDO1NBQ3JCLElBQUksQ0FBQyxzQkFBYyxDQUFDO1NBQ3BCLElBQUksQ0FBQyx3QkFBZ0IsQ0FBQztTQUN0QixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUM7UUFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUE7QUFFRDs7O0dBR0c7QUFDUSx1QkFBZSxHQUFHO0lBQ3pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFnQixDQUFDO0lBQzNDLElBQUksb0JBQW9CLEdBQWdCLEVBQUUsQ0FBQTtJQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7U0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQzNDLElBQUksWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQzlCLFFBQVEsRUFBQyxJQUFJLENBQUMsSUFBSTtZQUNs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