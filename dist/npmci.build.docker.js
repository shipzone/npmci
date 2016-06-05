"use strict";
var plugins = require("./npmci.plugins");
var NpmciEnv = require("./npmci.env");
exports.build = function () {
    var done = plugins.q.defer();
    plugins.gulp.src("./Dockerfile*")
        .pipe(readDockerfiles())
        .pipe(plugins.gulpFunction(function () {
        sortDockerfiles()
            .then(buildDockerfiles)
            .then(done.resolve);
    }, "atEnd"));
    return done.promise;
};
var readDockerfiles = function () {
    return plugins.through2.obj(function (file, enc, cb) {
        var myDockerfile = new Dockerfile({
            filePath: file.path,
            read: true
        });
        NpmciEnv.dockerFiles.push(myDockerfile);
        cb(null, file);
    });
};
var sortDockerfiles = function () {
    var done = plugins.q.defer();
    var redoSort;
    var sortCounter = 0;
    var sortFunction = function () {
        redoSort = false;
        var notYetBuiltImages = [];
        NpmciEnv.dockerFiles.forEach(function (dockerFileArg) {
            notYetBuiltImages.push(dockerFileArg.cleanTag);
        });
        NpmciEnv.dockerFiles.sort(function (a, b) {
            console.log("iteration: " + sortCounter.toString());
            console.log(notYetBuiltImages);
            console.log(a.cleanTag);
            var aIndex = notYetBuiltImages.indexOf(a.cleanTag);
            if (aIndex != -1) {
                notYetBuiltImages.splice(aIndex, 1);
            }
            console.log(notYetBuiltImages);
            if (notYetBuiltImages.indexOf(b.baseImage) != -1) {
                redoSort = true;
                return -1;
            }
            else {
                return 0;
            }
        });
        if (redoSort && sortCounter <= 50) {
            sortCounter++;
            sortFunction();
        }
        else {
            done.resolve();
        }
    };
    sortFunction();
    return done.promise;
};
var buildDockerfiles = function () {
    var done = plugins.q.defer();
    NpmciEnv.dockerFiles.forEach(function (dockerfileArg) {
        dockerfileArg.build();
    });
    done.resolve();
    return done.promise;
};
var Dockerfile = (function () {
    function Dockerfile(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + "/" + NpmciEnv.repo.repo;
        this.version = dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        }
        ;
        this.baseImage = dockerBaseImage(this.content);
    }
    ;
    Dockerfile.prototype.build = function () {
        if (!this.buildTag) {
            var tag = exports.dockerTag(this.repo, this.version);
            plugins.shelljs.exec("docker build -t " + tag + " -f " + this.filePath + " .");
            this.buildTag = tag;
            NpmciEnv.dockerFilesBuilt.push(this);
        }
        else {
            plugins.beautylog.error("This Dockerfile already has been built!");
        }
    };
    ;
    Dockerfile.prototype.push = function () {
        if (this.buildTag) {
            plugins.shelljs.exec("docker push " + this.buildTag);
        }
        else {
            plugins.beautylog.error("Dockerfile hasn't been built yet!");
        }
    };
    return Dockerfile;
}());
exports.Dockerfile = Dockerfile;
var dockerFileVersion = function (dockerfileNameArg) {
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
var dockerBaseImage = function (dockerfileContentArg) {
    var baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n/;
    var regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
exports.dockerTag = function (repoArg, versionArg) {
    var tagString;
    var registry = NpmciEnv.dockerRegistry;
    if (process.env.CI_BUILD_STAGE == "test") {
        registry = "registry.gitlab.com";
    }
    var repo = repoArg;
    var version = versionArg;
    if (process.env.CI_BUILD_STAGE == "test" || process.env.CI_BUILD_STAGE == "build") {
        version = version + "_test";
    }
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDO0lBQ0QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ25CLElBQUksT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUN6QixFQUFFLENBQUEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxNQUFNLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksT0FBTyxDQUFDLENBQUEsQ0FBQztRQUM5RSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsU0FBUyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUMiLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCJcbmltcG9ydCAqIGFzIE5wbWNpRW52IGZyb20gXCIuL25wbWNpLmVudlwiO1xuXG5cbmV4cG9ydCBsZXQgYnVpbGQgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgcGx1Z2lucy5ndWxwLnNyYyhcIi4vRG9ja2VyZmlsZSpcIilcbiAgICAgICAgLnBpcGUocmVhZERvY2tlcmZpbGVzKCkpXG4gICAgICAgIC5waXBlKHBsdWdpbnMuZ3VscEZ1bmN0aW9uKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBzb3J0RG9ja2VyZmlsZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKGJ1aWxkRG9ja2VyZmlsZXMpXG4gICAgICAgICAgICAgICAgLnRoZW4oZG9uZS5yZXNvbHZlKTtcbiAgICAgICAgfSxcImF0RW5kXCIpKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5sZXQgcmVhZERvY2tlcmZpbGVzID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gcGx1Z2lucy50aHJvdWdoMi5vYmooZnVuY3Rpb24oZmlsZSxlbmMsY2Ipe1xuICAgICAgICBsZXQgbXlEb2NrZXJmaWxlID0gbmV3IERvY2tlcmZpbGUoe1xuICAgICAgICAgICAgZmlsZVBhdGg6ZmlsZS5wYXRoLFxuICAgICAgICAgICAgcmVhZDp0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBOcG1jaUVudi5kb2NrZXJGaWxlcy5wdXNoKFxuICAgICAgICAgICAgbXlEb2NrZXJmaWxlXG4gICAgICAgICk7XG4gICAgICAgIGNiKG51bGwsZmlsZSk7XG4gICAgfSk7XG59XG5cbmxldCBzb3J0RG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgbGV0IHJlZG9Tb3J0OmJvb2xlYW47XG4gICAgbGV0IHNvcnRDb3VudGVyOm51bWJlciA9IDA7XG4gICAgbGV0IHNvcnRGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJlZG9Tb3J0ID0gZmFsc2U7XG4gICAgICAgIGxldCBub3RZZXRCdWlsdEltYWdlczpzdHJpbmdbXSA9IFtdO1xuICAgICAgICBOcG1jaUVudi5kb2NrZXJGaWxlcy5mb3JFYWNoKChkb2NrZXJGaWxlQXJnKT0+e1xuICAgICAgICAgICAgbm90WWV0QnVpbHRJbWFnZXMucHVzaChkb2NrZXJGaWxlQXJnLmNsZWFuVGFnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIE5wbWNpRW52LmRvY2tlckZpbGVzLnNvcnQoZnVuY3Rpb24oYSxiKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaXRlcmF0aW9uOiBcIiArIHNvcnRDb3VudGVyLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cobm90WWV0QnVpbHRJbWFnZXMpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhhLmNsZWFuVGFnKTtcbiAgICAgICAgICAgIGxldCBhSW5kZXggPSBub3RZZXRCdWlsdEltYWdlcy5pbmRleE9mKGEuY2xlYW5UYWcpO1xuICAgICAgICAgICAgaWYoYUluZGV4ICE9IC0xKXtub3RZZXRCdWlsdEltYWdlcy5zcGxpY2UoYUluZGV4LDEpfVxuICAgICAgICAgICAgY29uc29sZS5sb2cobm90WWV0QnVpbHRJbWFnZXMpO1xuICAgICAgICAgICAgaWYobm90WWV0QnVpbHRJbWFnZXMuaW5kZXhPZihiLmJhc2VJbWFnZSkgIT0gLTEpe1xuICAgICAgICAgICAgICAgIHJlZG9Tb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihyZWRvU29ydCAmJiBzb3J0Q291bnRlciA8PSA1MCl7XG4gICAgICAgICAgICBzb3J0Q291bnRlcisrO1xuICAgICAgICAgICAgc29ydEZ1bmN0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgc29ydEZ1bmN0aW9uKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn1cblxubGV0IGJ1aWxkRG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgTnBtY2lFbnYuZG9ja2VyRmlsZXMuZm9yRWFjaChmdW5jdGlvbihkb2NrZXJmaWxlQXJnKXtcbiAgICAgICAgZG9ja2VyZmlsZUFyZy5idWlsZCgpO1xuICAgIH0pXG4gICAgZG9uZS5yZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn1cblxuZXhwb3J0IGNsYXNzIERvY2tlcmZpbGUge1xuICAgIGZpbGVQYXRoOnN0cmluZztcbiAgICByZXBvOnN0cmluZztcbiAgICB2ZXJzaW9uOnN0cmluZztcbiAgICBjbGVhblRhZzpzdHJpbmc7XG4gICAgYnVpbGRUYWc6c3RyaW5nO1xuICAgIGNvbnRlbnQ6c3RyaW5nO1xuICAgIGJhc2VJbWFnZTpzdHJpbmc7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczp7ZmlsZVBhdGg/OnN0cmluZyxmaWxlQ29udGVudHM/OnN0cmluZ3xCdWZmZXIscmVhZD86Ym9vbGVhbn0pe1xuICAgICAgICB0aGlzLmZpbGVQYXRoID0gb3B0aW9ucy5maWxlUGF0aDtcbiAgICAgICAgdGhpcy5yZXBvID0gTnBtY2lFbnYucmVwby51c2VyICsgXCIvXCIgKyBOcG1jaUVudi5yZXBvLnJlcG87XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGRvY2tlckZpbGVWZXJzaW9uKHBsdWdpbnMucGF0aC5wYXJzZShvcHRpb25zLmZpbGVQYXRoKS5iYXNlKTtcbiAgICAgICAgdGhpcy5jbGVhblRhZyA9IHRoaXMucmVwbyArIFwiOlwiICsgdGhpcy52ZXJzaW9uO1xuICAgICAgICBpZihvcHRpb25zLmZpbGVQYXRoICYmIG9wdGlvbnMucmVhZCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBwbHVnaW5zLnNtYXJ0ZmlsZS5sb2NhbC50b1N0cmluZ1N5bmMocGx1Z2lucy5wYXRoLnJlc29sdmUob3B0aW9ucy5maWxlUGF0aCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhc2VJbWFnZSA9IGRvY2tlckJhc2VJbWFnZSh0aGlzLmNvbnRlbnQpO1xuICAgIH07XG4gICAgYnVpbGQoKXtcbiAgICAgICAgaWYoIXRoaXMuYnVpbGRUYWcpe1xuICAgICAgICAgICAgbGV0IHRhZyA9IGRvY2tlclRhZyh0aGlzLnJlcG8sdGhpcy52ZXJzaW9uKTtcbiAgICAgICAgICAgIHBsdWdpbnMuc2hlbGxqcy5leGVjKFwiZG9ja2VyIGJ1aWxkIC10IFwiICsgdGFnICsgXCIgLWYgXCIgKyB0aGlzLmZpbGVQYXRoICsgXCIgLlwiKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUYWcgPSB0YWc7XG4gICAgICAgICAgICBOcG1jaUVudi5kb2NrZXJGaWxlc0J1aWx0LnB1c2godGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcIlRoaXMgRG9ja2VyZmlsZSBhbHJlYWR5IGhhcyBiZWVuIGJ1aWx0IVwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuICAgIHB1c2goKXtcbiAgICAgICAgaWYodGhpcy5idWlsZFRhZyl7XG4gICAgICAgICAgICBwbHVnaW5zLnNoZWxsanMuZXhlYyhcImRvY2tlciBwdXNoIFwiICsgdGhpcy5idWlsZFRhZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcIkRvY2tlcmZpbGUgaGFzbid0IGJlZW4gYnVpbHQgeWV0IVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubGV0IGRvY2tlckZpbGVWZXJzaW9uID0gZnVuY3Rpb24oZG9ja2VyZmlsZU5hbWVBcmc6c3RyaW5nKTpzdHJpbmd7XG4gICAgbGV0IHZlcnNpb25TdHJpbmc6c3RyaW5nO1xuICAgIGxldCB2ZXJzaW9uUmVnZXggPSAvRG9ja2VyZmlsZV8oW2EtekEtWjAtOVxcLl0qKSQvO1xuICAgIGxldCByZWdleFJlc3VsdEFycmF5ID0gdmVyc2lvblJlZ2V4LmV4ZWMoZG9ja2VyZmlsZU5hbWVBcmcpO1xuICAgIGlmKHJlZ2V4UmVzdWx0QXJyYXkgJiYgcmVnZXhSZXN1bHRBcnJheS5sZW5ndGggPT0gMil7XG4gICAgICAgIHZlcnNpb25TdHJpbmcgPSByZWdleFJlc3VsdEFycmF5WzFdOyAgICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmVyc2lvblN0cmluZyA9IFwibGF0ZXN0XCI7XG4gICAgfVxuICAgIHJldHVybiB2ZXJzaW9uU3RyaW5nO1xufVxuXG5sZXQgZG9ja2VyQmFzZUltYWdlID0gZnVuY3Rpb24oZG9ja2VyZmlsZUNvbnRlbnRBcmc6c3RyaW5nKXtcbiAgICBsZXQgYmFzZUltYWdlUmVnZXggPSAvRlJPTVxccyhbYS16QS16MC05XFwvXFwtXFw6XSopXFxuL1xuICAgIGxldCByZWdleFJlc3VsdEFycmF5ID0gYmFzZUltYWdlUmVnZXguZXhlYyhkb2NrZXJmaWxlQ29udGVudEFyZylcbiAgICByZXR1cm4gcmVnZXhSZXN1bHRBcnJheVsxXTtcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJUYWcgPSBmdW5jdGlvbihyZXBvQXJnOnN0cmluZyx2ZXJzaW9uQXJnOnN0cmluZyk6c3RyaW5ne1xuICAgIGxldCB0YWdTdHJpbmc6c3RyaW5nO1xuICAgIGxldCByZWdpc3RyeSA9IE5wbWNpRW52LmRvY2tlclJlZ2lzdHJ5O1xuICAgIGlmKHByb2Nlc3MuZW52LkNJX0JVSUxEX1NUQUdFID09IFwidGVzdFwiKXtcbiAgICAgICAgcmVnaXN0cnkgPSBcInJlZ2lzdHJ5LmdpdGxhYi5jb21cIjtcbiAgICB9IFxuICAgIGxldCByZXBvID0gcmVwb0FyZztcbiAgICBsZXQgdmVyc2lvbiA9IHZlcnNpb25Bcmc7XG4gICAgaWYocHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJ0ZXN0XCIgfHwgcHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJidWlsZFwiKXtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb24gKyBcIl90ZXN0XCI7XG4gICAgfVxuICAgIHRhZ1N0cmluZyA9IHJlZ2lzdHJ5ICsgXCIvXCIgKyByZXBvICsgXCI6XCIgKyB2ZXJzaW9uO1xuICAgIHJldHVybiB0YWdTdHJpbmc7XG59O1xuIl19
