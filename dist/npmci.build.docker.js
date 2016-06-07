"use strict";
var plugins = require("./npmci.plugins");
var paths = require("./npmci.paths");
var NpmciEnv = require("./npmci.env");
var npmci_bash_1 = require("./npmci.bash");
exports.build = function () {
    var done = plugins.q.defer();
    exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles)
        .then(exports.pushDockerfiles)
        .then(function () {
        done.resolve();
    });
    return done.promise;
};
exports.readDockerfiles = function () {
    var done = plugins.q.defer();
    var readDockerfilesArray = [];
    plugins.gulp.src("./Dockerfile*")
        .pipe(plugins.through2.obj(function (file, enc, cb) {
        var myDockerfile = new Dockerfile({
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
    var done = plugins.q.defer();
    var sortedArray = [];
    var cleanTagsOriginal = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    var sorterFunctionCounter = 0;
    var sorterFunction = function () {
        sortableArrayArg.forEach(function (dockerfileArg) {
            var cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
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
    var done = plugins.q.defer();
    sortedArray.forEach(function (dockerfileArg) {
        if (dockerfileArg.localBaseImageDependent) {
            sortedArray.forEach(function (dockfile2) {
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
exports.buildDockerfiles = function (sortedArrayArg) {
    var done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.build();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
exports.pushDockerfiles = function (sortedArrayArg) {
    var done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.push(NpmciEnv.buildStage);
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
exports.pullDockerfileImages = function (sortableArrayArg, registryArg) {
    if (registryArg === void 0) { registryArg = "registry.gitlab.com"; }
    var done = plugins.q.defer();
    sortableArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.pull(registryArg);
    });
    done.resolve(sortableArrayArg);
    return done.promise;
};
exports.testDockerfiles = function (sortedArrayArg) {
    var done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.test();
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
exports.releaseDockerfiles = function (sortedArrayArg, registryArg) {
    if (registryArg === void 0) { registryArg = NpmciEnv.dockerRegistry; }
    var done = plugins.q.defer();
    sortedArrayArg.forEach(function (dockerfileArg) {
        dockerfileArg.push(registryArg);
    });
    done.resolve(sortedArrayArg);
    return done.promise;
};
var Dockerfile = (function () {
    function Dockerfile(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = exports.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        this.buildTag = this.cleanTag;
        this.testTag = exports.dockerTag("registry.gitlab.com", this.repo, this.version, "test");
        this.releaseTag = exports.dockerTag(NpmciEnv.dockerRegistry, this.repo, this.version);
        this.containerName = "dockerfile-" + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        }
        ;
        this.baseImage = exports.dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    }
    ;
    Dockerfile.prototype.build = function () {
        var done = plugins.q.defer();
        plugins.beautylog.info("now building Dockerfile for " + this.cleanTag);
        npmci_bash_1.bashBare("docker build -t " + this.buildTag + " -f " + this.filePath + " .");
        NpmciEnv.dockerFilesBuilt.push(this);
        done.resolve();
        return done.promise;
    };
    ;
    Dockerfile.prototype.push = function (stageArg) {
        var done = plugins.q.defer();
        var pushTag;
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
    };
    Dockerfile.prototype.pull = function (registryArg) {
        var pullTag = this.testTag;
        npmci_bash_1.bashBare("docker pull " + pullTag);
        npmci_bash_1.bashBare("docker tag " + pullTag + " " + this.buildTag);
    };
    ;
    Dockerfile.prototype.test = function () {
        var testFile = plugins.path.join(paths.NpmciTestDir, "test_" + this.version + ".sh");
        var testFileExists = plugins.smartfile.checks.fileExistsSync(testFile);
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
    };
    ;
    Dockerfile.prototype.getId = function () {
        var containerId = npmci_bash_1.bashBare("docker inspect --type=image --format=\"{{.Id}}\" " + this.buildTag);
        return containerId;
    };
    ;
    return Dockerfile;
}());
exports.Dockerfile = Dockerfile;
exports.dockerFileVersion = function (dockerfileNameArg) {
    var versionString;
    var versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    var regexResultArray = versionRegex.exec(dockerfileNameArg);
    if (regexResultArray && regexResultArray.length == 2) {
        versionString = regexResultArray[1];
    }
    else {
        versionString = "latest";
    }
    return versionString;
};
exports.dockerBaseImage = function (dockerfileContentArg) {
    var baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    var regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
exports.dockerTag = function (registryArg, repoArg, versionArg, suffixArg) {
    var tagString;
    var registry = registryArg;
    var repo = repoArg;
    var version = versionArg;
    if (suffixArg) {
        version = versionArg + "_" + suffixArg;
    }
    ;
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    var cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) == -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLGNBQWMsQ0FBQztBQUMxQixDQUFDLENBQUEiLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XHJcbmltcG9ydCAqIGFzIHBhdGhzIGZyb20gXCIuL25wbWNpLnBhdGhzXCI7XHJcbmltcG9ydCAqIGFzIE5wbWNpRW52IGZyb20gXCIuL25wbWNpLmVudlwiO1xyXG5pbXBvcnQge2Jhc2hCYXJlfSBmcm9tIFwiLi9ucG1jaS5iYXNoXCI7XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICByZWFkRG9ja2VyZmlsZXMoKVxyXG4gICAgICAgIC50aGVuKHNvcnREb2NrZXJmaWxlcylcclxuICAgICAgICAudGhlbihtYXBEb2NrZXJmaWxlcylcclxuICAgICAgICAudGhlbihidWlsZERvY2tlcmZpbGVzKVxyXG4gICAgICAgIC50aGVuKHB1c2hEb2NrZXJmaWxlcylcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxufVxyXG5cclxuZXhwb3J0IGxldCByZWFkRG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIGxldCByZWFkRG9ja2VyZmlsZXNBcnJheTpEb2NrZXJmaWxlW10gPSBbXVxyXG4gICAgcGx1Z2lucy5ndWxwLnNyYyhcIi4vRG9ja2VyZmlsZSpcIilcclxuICAgICAgICAucGlwZShwbHVnaW5zLnRocm91Z2gyLm9iaihmdW5jdGlvbihmaWxlLGVuYyxjYil7XHJcbiAgICAgICAgICAgIGxldCBteURvY2tlcmZpbGUgPSBuZXcgRG9ja2VyZmlsZSh7XHJcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDpmaWxlLnBhdGgsXHJcbiAgICAgICAgICAgICAgICByZWFkOnRydWVcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJlYWREb2NrZXJmaWxlc0FycmF5LnB1c2gobXlEb2NrZXJmaWxlKTtcclxuICAgICAgICAgICAgY2IobnVsbCxmaWxlKTtcclxuICAgICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHJlYWREb2NrZXJmaWxlc0FycmF5KTtcclxuICAgICAgICAgfSkpO1xyXG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxufVxyXG5cclxuZXhwb3J0IGxldCBzb3J0RG9ja2VyZmlsZXMgPSBmdW5jdGlvbihzb3J0YWJsZUFycmF5QXJnOkRvY2tlcmZpbGVbXSl7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgbGV0IHNvcnRlZEFycmF5OkRvY2tlcmZpbGVbXSA9IFtdO1xyXG4gICAgbGV0IGNsZWFuVGFnc09yaWdpbmFsID0gY2xlYW5UYWdzQXJyYXlGdW5jdGlvbihzb3J0YWJsZUFycmF5QXJnLHNvcnRlZEFycmF5KTtcclxuICAgIGxldCBzb3J0ZXJGdW5jdGlvbkNvdW50ZXI6bnVtYmVyID0gMDtcclxuICAgIGxldCBzb3J0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgc29ydGFibGVBcnJheUFyZy5mb3JFYWNoKChkb2NrZXJmaWxlQXJnKT0+e1xyXG4gICAgICAgICAgICBsZXQgY2xlYW5UYWdzID0gY2xlYW5UYWdzQXJyYXlGdW5jdGlvbihzb3J0YWJsZUFycmF5QXJnLHNvcnRlZEFycmF5KTtcclxuICAgICAgICAgICAgaWYoY2xlYW5UYWdzLmluZGV4T2YoZG9ja2VyZmlsZUFyZy5iYXNlSW1hZ2UpID09IC0xICYmIHNvcnRlZEFycmF5LmluZGV4T2YoZG9ja2VyZmlsZUFyZykgPT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgc29ydGVkQXJyYXkucHVzaChkb2NrZXJmaWxlQXJnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgaWYoY2xlYW5UYWdzT3JpZ2luYWwuaW5kZXhPZihkb2NrZXJmaWxlQXJnLmJhc2VJbWFnZSkgIT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgZG9ja2VyZmlsZUFyZy5sb2NhbEJhc2VJbWFnZURlcGVuZGVudCA9IHRydWU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoc29ydGFibGVBcnJheUFyZy5sZW5ndGggPT0gc29ydGVkQXJyYXkubGVuZ3RoKXtcclxuICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHNvcnRlZEFycmF5KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHNvcnRlckZ1bmN0aW9uQ291bnRlciA8IDEwKSB7XHJcbiAgICAgICAgICAgIHNvcnRlckZ1bmN0aW9uQ291bnRlcisrO1xyXG4gICAgICAgICAgICBzb3J0ZXJGdW5jdGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzb3J0ZXJGdW5jdGlvbigpO1xyXG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxufTtcclxuXHJcbmV4cG9ydCBsZXQgbWFwRG9ja2VyZmlsZXMgPSBmdW5jdGlvbihzb3J0ZWRBcnJheTpEb2NrZXJmaWxlW10pe1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHNvcnRlZEFycmF5LmZvckVhY2goKGRvY2tlcmZpbGVBcmcpID0+IHtcclxuICAgICAgICBpZihkb2NrZXJmaWxlQXJnLmxvY2FsQmFzZUltYWdlRGVwZW5kZW50KXtcclxuICAgICAgICAgICAgc29ydGVkQXJyYXkuZm9yRWFjaCgoZG9ja2ZpbGUyOkRvY2tlcmZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmKGRvY2tmaWxlMi5jbGVhblRhZyA9PSBkb2NrZXJmaWxlQXJnLmJhc2VJbWFnZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9ja2VyZmlsZUFyZy5sb2NhbEJhc2VEb2NrZXJmaWxlID0gZG9ja2ZpbGUyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxuICAgIGRvbmUucmVzb2x2ZShzb3J0ZWRBcnJheSk7XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59XHJcblxyXG5leHBvcnQgbGV0IGJ1aWxkRG9ja2VyZmlsZXMgPSAoc29ydGVkQXJyYXlBcmc6RG9ja2VyZmlsZVtdKSA9PiB7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgc29ydGVkQXJyYXlBcmcuZm9yRWFjaChmdW5jdGlvbihkb2NrZXJmaWxlQXJnKXtcclxuICAgICAgICBkb2NrZXJmaWxlQXJnLmJ1aWxkKCk7XHJcbiAgICB9KVxyXG4gICAgZG9uZS5yZXNvbHZlKHNvcnRlZEFycmF5QXJnKTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgcHVzaERvY2tlcmZpbGVzID0gZnVuY3Rpb24oc29ydGVkQXJyYXlBcmc6RG9ja2VyZmlsZVtdKXtcclxuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICBzb3J0ZWRBcnJheUFyZy5mb3JFYWNoKGZ1bmN0aW9uKGRvY2tlcmZpbGVBcmcpe1xyXG4gICAgICAgIGRvY2tlcmZpbGVBcmcucHVzaChOcG1jaUVudi5idWlsZFN0YWdlKTtcclxuICAgIH0pO1xyXG4gICAgZG9uZS5yZXNvbHZlKHNvcnRlZEFycmF5QXJnKTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgcHVsbERvY2tlcmZpbGVJbWFnZXMgPSAoc29ydGFibGVBcnJheUFyZzpEb2NrZXJmaWxlW10scmVnaXN0cnlBcmcgPSBcInJlZ2lzdHJ5LmdpdGxhYi5jb21cIikgPT4ge1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHNvcnRhYmxlQXJyYXlBcmcuZm9yRWFjaCgoZG9ja2VyZmlsZUFyZykgPT4ge1xyXG4gICAgICAgIGRvY2tlcmZpbGVBcmcucHVsbChyZWdpc3RyeUFyZyk7XHJcbiAgICB9KTtcclxuICAgIGRvbmUucmVzb2x2ZShzb3J0YWJsZUFycmF5QXJnKTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBsZXQgdGVzdERvY2tlcmZpbGVzID0gKHNvcnRlZEFycmF5QXJnOkRvY2tlcmZpbGVbXSkgPT4ge1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHNvcnRlZEFycmF5QXJnLmZvckVhY2goZnVuY3Rpb24oZG9ja2VyZmlsZUFyZyl7XHJcbiAgICAgICAgZG9ja2VyZmlsZUFyZy50ZXN0KCk7XHJcbiAgICB9KTtcclxuICAgIGRvbmUucmVzb2x2ZShzb3J0ZWRBcnJheUFyZyk7XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCByZWxlYXNlRG9ja2VyZmlsZXMgPSAoc29ydGVkQXJyYXlBcmc6RG9ja2VyZmlsZVtdLCByZWdpc3RyeUFyZyA9IE5wbWNpRW52LmRvY2tlclJlZ2lzdHJ5KSA9PiB7XHJcbiAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHNvcnRlZEFycmF5QXJnLmZvckVhY2goZnVuY3Rpb24oZG9ja2VyZmlsZUFyZyl7XHJcbiAgICAgICAgZG9ja2VyZmlsZUFyZy5wdXNoKHJlZ2lzdHJ5QXJnKTtcclxuICAgIH0pO1xyXG4gICAgZG9uZS5yZXNvbHZlKHNvcnRlZEFycmF5QXJnKTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBEb2NrZXJmaWxlIHtcclxuICAgIGZpbGVQYXRoOnN0cmluZztcclxuICAgIHJlcG86c3RyaW5nO1xyXG4gICAgdmVyc2lvbjpzdHJpbmc7XHJcbiAgICBjbGVhblRhZzpzdHJpbmc7XHJcbiAgICBidWlsZFRhZzpzdHJpbmc7XHJcbiAgICB0ZXN0VGFnOnN0cmluZztcclxuICAgIHJlbGVhc2VUYWc6c3RyaW5nO1xyXG4gICAgY29udGFpbmVyTmFtZTpzdHJpbmdcclxuICAgIGNvbnRlbnQ6c3RyaW5nO1xyXG4gICAgYmFzZUltYWdlOnN0cmluZztcclxuICAgIGxvY2FsQmFzZUltYWdlRGVwZW5kZW50OmJvb2xlYW47XHJcbiAgICBsb2NhbEJhc2VEb2NrZXJmaWxlOkRvY2tlcmZpbGU7XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOntmaWxlUGF0aD86c3RyaW5nLGZpbGVDb250ZW50cz86c3RyaW5nfEJ1ZmZlcixyZWFkPzpib29sZWFufSl7XHJcbiAgICAgICAgdGhpcy5maWxlUGF0aCA9IG9wdGlvbnMuZmlsZVBhdGg7XHJcbiAgICAgICAgdGhpcy5yZXBvID0gTnBtY2lFbnYucmVwby51c2VyICsgXCIvXCIgKyBOcG1jaUVudi5yZXBvLnJlcG87XHJcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gZG9ja2VyRmlsZVZlcnNpb24ocGx1Z2lucy5wYXRoLnBhcnNlKG9wdGlvbnMuZmlsZVBhdGgpLmJhc2UpO1xyXG4gICAgICAgIHRoaXMuY2xlYW5UYWcgPSB0aGlzLnJlcG8gKyBcIjpcIiArIHRoaXMudmVyc2lvbjtcclxuICAgICAgICB0aGlzLmJ1aWxkVGFnID0gdGhpcy5jbGVhblRhZztcclxuICAgICAgICB0aGlzLnRlc3RUYWcgPSBkb2NrZXJUYWcoXCJyZWdpc3RyeS5naXRsYWIuY29tXCIsdGhpcy5yZXBvLHRoaXMudmVyc2lvbixcInRlc3RcIik7XHJcbiAgICAgICAgdGhpcy5yZWxlYXNlVGFnID0gZG9ja2VyVGFnKE5wbWNpRW52LmRvY2tlclJlZ2lzdHJ5LHRoaXMucmVwbyx0aGlzLnZlcnNpb24pO1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyTmFtZSA9IFwiZG9ja2VyZmlsZS1cIiArIHRoaXMudmVyc2lvbjtcclxuICAgICAgICBpZihvcHRpb25zLmZpbGVQYXRoICYmIG9wdGlvbnMucmVhZCl7XHJcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHBsdWdpbnMuc21hcnRmaWxlLmxvY2FsLnRvU3RyaW5nU3luYyhwbHVnaW5zLnBhdGgucmVzb2x2ZShvcHRpb25zLmZpbGVQYXRoKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmJhc2VJbWFnZSA9IGRvY2tlckJhc2VJbWFnZSh0aGlzLmNvbnRlbnQpO1xyXG4gICAgICAgIHRoaXMubG9jYWxCYXNlSW1hZ2VEZXBlbmRlbnQgPSBmYWxzZTtcclxuICAgIH07XHJcbiAgICBidWlsZCgpe1xyXG4gICAgICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuaW5mbyhcIm5vdyBidWlsZGluZyBEb2NrZXJmaWxlIGZvciBcIiArIHRoaXMuY2xlYW5UYWcpO1xyXG4gICAgICAgIGJhc2hCYXJlKFwiZG9ja2VyIGJ1aWxkIC10IFwiICsgdGhpcy5idWlsZFRhZyArIFwiIC1mIFwiICsgdGhpcy5maWxlUGF0aCArIFwiIC5cIik7XHJcbiAgICAgICAgTnBtY2lFbnYuZG9ja2VyRmlsZXNCdWlsdC5wdXNoKHRoaXMpO1xyXG4gICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9O1xyXG4gICAgcHVzaChzdGFnZUFyZyl7XHJcbiAgICAgICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgICAgICBsZXQgcHVzaFRhZztcclxuICAgICAgICBzd2l0Y2ggKHN0YWdlQXJnKXtcclxuICAgICAgICAgICAgY2FzZSBcInJlbGVhc2VcIjpcclxuICAgICAgICAgICAgICAgIHB1c2hUYWcgPSB0aGlzLnJlbGVhc2VUYWc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInRlc3RcIjpcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHB1c2hUYWcgPSB0aGlzLnRlc3RUYWc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgYmFzaEJhcmUoXCJkb2NrZXIgdGFnIFwiICsgdGhpcy5idWlsZFRhZyArIFwiIFwiICsgcHVzaFRhZyk7XHJcbiAgICAgICAgYmFzaEJhcmUoXCJkb2NrZXIgcHVzaCBcIiArIHB1c2hUYWcpO1xyXG4gICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbiAgICB9XHJcbiAgICBwdWxsKHJlZ2lzdHJ5QXJnOnN0cmluZyl7XHJcbiAgICAgICAgbGV0IHB1bGxUYWcgPSB0aGlzLnRlc3RUYWc7XHJcbiAgICAgICAgYmFzaEJhcmUoXCJkb2NrZXIgcHVsbCBcIiArIHB1bGxUYWcpO1xyXG4gICAgICAgIGJhc2hCYXJlKFwiZG9ja2VyIHRhZyBcIiArIHB1bGxUYWcgKyBcIiBcIiArIHRoaXMuYnVpbGRUYWcpO1xyXG4gICAgfTtcclxuICAgIHRlc3QoKXtcclxuICAgICAgICBsZXQgdGVzdEZpbGU6c3RyaW5nID0gcGx1Z2lucy5wYXRoLmpvaW4ocGF0aHMuTnBtY2lUZXN0RGlyLFwidGVzdF9cIiArIHRoaXMudmVyc2lvbiArIFwiLnNoXCIpO1xyXG4gICAgICAgIGxldCB0ZXN0RmlsZUV4aXN0czpib29sZWFuID0gcGx1Z2lucy5zbWFydGZpbGUuY2hlY2tzLmZpbGVFeGlzdHNTeW5jKHRlc3RGaWxlKTtcclxuICAgICAgICBpZih0ZXN0RmlsZUV4aXN0cyl7XHJcbiAgICAgICAgICAgIGJhc2hCYXJlKFwiZG9ja2VyIHJ1biAtLW5hbWUgbnBtY2lfdGVzdF9jb250YWluZXIgXCIgKyB0aGlzLmJ1aWxkVGFnICsgXCIgbWtkaXIgL25wbWNpX3Rlc3RcIik7XHJcbiAgICAgICAgICAgIGJhc2hCYXJlKFwiZG9ja2VyIGNwIFwiICsgdGVzdEZpbGUgKyBcIiBucG1jaV90ZXN0X2NvbnRhaW5lcjovbnBtY2lfdGVzdC90ZXN0LnNoXCIpO1xyXG4gICAgICAgICAgICBiYXNoQmFyZShcImRvY2tlciBjb21taXQgbnBtY2lfdGVzdF9jb250YWluZXIgbnBtY2lfdGVzdF9pbWFnZVwiKTtcclxuICAgICAgICAgICAgYmFzaEJhcmUoXCJkb2NrZXIgcnVuIG5wbWNpX3Rlc3RfaW1hZ2Ugc2ggL25wbWNpX3Rlc3QvdGVzdC5zaFwiKTtcclxuICAgICAgICAgICAgYmFzaEJhcmUoXCJkb2NrZXIgcm0gbnBtY2lfdGVzdF9jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGJhc2hCYXJlKFwiZG9ja2VyIHJtaSAtLWZvcmNlIG5wbWNpX3Rlc3RfaW1hZ2VcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cud2FybihcInNraXBwaW5nIHRlc3RzIGZvciBcIiArIHRoaXMuY2xlYW5UYWcgKyBcIiBiZWNhdXNlIG5vIHRlc3RmaWxlIHdhcyBmb3VuZCFcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIGdldElkKCl7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lcklkID0gYmFzaEJhcmUoXCJkb2NrZXIgaW5zcGVjdCAtLXR5cGU9aW1hZ2UgLS1mb3JtYXQ9XFxcInt7LklkfX1cXFwiIFwiICsgdGhpcy5idWlsZFRhZyk7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcklkO1xyXG4gICAgfTtcclxufVxyXG5cclxuZXhwb3J0IGxldCBkb2NrZXJGaWxlVmVyc2lvbiA9IGZ1bmN0aW9uKGRvY2tlcmZpbGVOYW1lQXJnOnN0cmluZyk6c3RyaW5ne1xyXG4gICAgbGV0IHZlcnNpb25TdHJpbmc6c3RyaW5nO1xyXG4gICAgbGV0IHZlcnNpb25SZWdleCA9IC9Eb2NrZXJmaWxlXyhbYS16QS1aMC05XFwuXSopJC87XHJcbiAgICBsZXQgcmVnZXhSZXN1bHRBcnJheSA9IHZlcnNpb25SZWdleC5leGVjKGRvY2tlcmZpbGVOYW1lQXJnKTtcclxuICAgIGlmKHJlZ2V4UmVzdWx0QXJyYXkgJiYgcmVnZXhSZXN1bHRBcnJheS5sZW5ndGggPT0gMil7XHJcbiAgICAgICAgdmVyc2lvblN0cmluZyA9IHJlZ2V4UmVzdWx0QXJyYXlbMV07ICAgICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmVyc2lvblN0cmluZyA9IFwibGF0ZXN0XCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmVyc2lvblN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGxldCBkb2NrZXJCYXNlSW1hZ2UgPSBmdW5jdGlvbihkb2NrZXJmaWxlQ29udGVudEFyZzpzdHJpbmcpe1xyXG4gICAgbGV0IGJhc2VJbWFnZVJlZ2V4ID0gL0ZST01cXHMoW2EtekEtejAtOVxcL1xcLVxcOl0qKVxcbj8vXHJcbiAgICBsZXQgcmVnZXhSZXN1bHRBcnJheSA9IGJhc2VJbWFnZVJlZ2V4LmV4ZWMoZG9ja2VyZmlsZUNvbnRlbnRBcmcpXHJcbiAgICByZXR1cm4gcmVnZXhSZXN1bHRBcnJheVsxXTtcclxufVxyXG5cclxuZXhwb3J0IGxldCBkb2NrZXJUYWcgPSBmdW5jdGlvbihyZWdpc3RyeUFyZzpzdHJpbmcscmVwb0FyZzpzdHJpbmcsdmVyc2lvbkFyZzpzdHJpbmcsc3VmZml4QXJnPzpzdHJpbmcpOnN0cmluZ3tcclxuICAgIGxldCB0YWdTdHJpbmc6c3RyaW5nO1xyXG4gICAgbGV0IHJlZ2lzdHJ5ID0gcmVnaXN0cnlBcmc7XHJcbiAgICBsZXQgcmVwbyA9IHJlcG9Bcmc7XHJcbiAgICBsZXQgdmVyc2lvbiA9IHZlcnNpb25Bcmc7XHJcbiAgICBpZihzdWZmaXhBcmcpe1xyXG4gICAgICAgIHZlcnNpb24gPSB2ZXJzaW9uQXJnICsgXCJfXCIgKyBzdWZmaXhBcmc7XHJcbiAgICB9O1xyXG4gICAgdGFnU3RyaW5nID0gcmVnaXN0cnkgKyBcIi9cIiArIHJlcG8gKyBcIjpcIiArIHZlcnNpb247XHJcbiAgICByZXR1cm4gdGFnU3RyaW5nO1xyXG59O1xyXG5cclxuZXhwb3J0IGxldCBjbGVhblRhZ3NBcnJheUZ1bmN0aW9uID0gZnVuY3Rpb24oZG9ja2VyZmlsZUFycmF5QXJnOkRvY2tlcmZpbGVbXSx0cmFja2luZ0FycmF5QXJnOkRvY2tlcmZpbGVbXSk6c3RyaW5nW117XHJcbiAgICBsZXQgY2xlYW5UYWdzQXJyYXk6c3RyaW5nW10gPSBbXTtcclxuICAgIGRvY2tlcmZpbGVBcnJheUFyZy5mb3JFYWNoKGZ1bmN0aW9uKGRvY2tlcmZpbGVBcmcpe1xyXG4gICAgICAgIGlmKHRyYWNraW5nQXJyYXlBcmcuaW5kZXhPZihkb2NrZXJmaWxlQXJnKSA9PSAtMSl7XHJcbiAgICAgICAgICAgIGNsZWFuVGFnc0FycmF5LnB1c2goZG9ja2VyZmlsZUFyZy5jbGVhblRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gY2xlYW5UYWdzQXJyYXk7XHJcbn0iXX0=
