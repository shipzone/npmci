"use strict";
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
const NpmciEnv = require("./npmci.env");
const npmci_bash_1 = require("./npmci.bash");
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
exports.buildDockerfiles = (sortedArrayArg) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.build();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
exports.pushDockerfiles = function (sortedArrayArg) {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.push(NpmciEnv.buildStage);
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
exports.pullDockerfileImages = (sortableArrayArg, registryArg = "registry.gitlab.com") => {
    let done = plugins.q.defer();
    sortableArrayArg.forEach((dockerfileArg) => {
        dockerfileArg.pull(registryArg);
    });
    done.resolve(sortableArrayArg);
    return done.promise;
};
exports.testDockerfiles = (sortedArrayArg) => {
    let done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.test();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
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
    build() {
        let done = plugins.q.defer();
        plugins.beautylog.info("now building Dockerfile for " + this.cleanTag);
        npmci_bash_1.bashBare("docker build -t " + this.buildTag + " -f " + this.filePath + " .");
        NpmciEnv.dockerFilesBuilt.push(this);
        done.resolve();
        return done.promise;
    }
    ;
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
    pull(registryArg) {
        let pullTag = this.testTag;
        npmci_bash_1.bashBare("docker pull " + pullTag);
        npmci_bash_1.bashBare("docker tag " + pullTag + " " + this.buildTag);
    }
    ;
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
    getId() {
        let containerId = npmci_bash_1.bashBare("docker inspect --type=image --format=\"{{.Id}}\" " + this.buildTag);
        return containerId;
    }
    ;
}
exports.Dockerfile = Dockerfile;
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
exports.dockerBaseImage = function (dockerfileContentArg) {
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
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
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    let cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) == -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuYnVpbGQuZG9ja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLE1BQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZDLE1BQVksUUFBUSxXQUFNLGFBQWEsQ0FBQyxDQUFBO0FBQ3hDLDZCQUF1QixjQUFjLENBQUMsQ0FBQTtBQUUzQixhQUFLLEdBQUc7SUFDZixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFlLEVBQUU7U0FDWixJQUFJLENBQUMsdUJBQWUsQ0FBQztTQUNyQixJQUFJLENBQUMsc0JBQWMsQ0FBQztTQUNwQixJQUFJLENBQUMsd0JBQWdCLENBQUM7U0FDdEIsSUFBSSxDQUFDLHVCQUFlLENBQUM7U0FDckIsSUFBSSxDQUFDO1FBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRVUsdUJBQWUsR0FBRztJQUN6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLElBQUksb0JBQW9CLEdBQWdCLEVBQUUsQ0FBQTtJQUMxQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7U0FDNUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQzNDLElBQUksWUFBWSxHQUFHLElBQUksVUFBVSxDQUFDO1lBQzlCLFFBQVEsRUFBQyxJQUFJLENBQUMsSUFBSTtZQUNsQixJQUFJLEVBQUMsSUFBSTtTQUNaLENB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