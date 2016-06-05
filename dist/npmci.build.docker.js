"use strict";
var plugins = require("./npmci.plugins");
var NpmciEnv = require("./npmci.env");
exports.build = function () {
    var done = plugins.q.defer();
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
exports.cleanTagsArrayFunction = function (dockerfileArrayArg) {
    var cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        cleanTagsArray.push(dockerfileArg.cleanTag);
    });
    return cleanTagsArray;
};
exports.sortDockerfiles = function (sortableArrayArg) {
    var done = plugins.q.defer();
    var sortedArray = [];
    var sorterFunctionCounter = 0;
    var sorterFunction = function () {
        console.log(sorterFunctionCounter);
        var cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg);
        sortableArrayArg.forEach(function (dockerfileArg) {
            if (cleanTags.indexOf(dockerfileArg.baseImage) == -1) {
                var dockerfileArgIndex = sortableArrayArg.indexOf(dockerfileArg);
                sortableArrayArg.splice(dockerfileArgIndex, 1);
                sortedArray.push(dockerfileArg);
            }
        });
        if (sortableArrayArg.length == 0) {
            done.resolve(sortedArray);
        }
        else if (sorterFunctionCounter < 100) {
            sorterFunctionCounter++;
            sorterFunction();
        }
        ;
    };
    sorterFunction();
    return done.promise;
};
exports.buildDockerfiles = function () {
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
        this.version = exports.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ":" + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.local.toStringSync(plugins.path.resolve(options.filePath));
        }
        ;
        this.baseImage = exports.dockerBaseImage(this.content);
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
exports.dockerTag = function (repoArg, versionArg) {
    var tagString;
    var registry = NpmciEnv.dockerRegistry;
    if (process.env.CI_BUILD_STAGE == "build" || process.env.CI_BUILD_STAGE == "test") {
        registry = "registry.gitlab.com";
    }
    var repo = repoArg;
    var version = versionArg;
    if (process.env.CI_BUILD_STAGE == "build" || process.env.CI_BUILD_STAGE == "test") {
        version = version + "_test";
    }
    tagString = registry + "/" + repo + ":" + version;
    return tagString;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksTUFBTSxDQUFDLENBQUEsQ0FBQztRQUM5RSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNoQyxDQUFDO0lBQ0QsU0FBUyxHQUFHLFFBQVEsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUM7SUFDbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNyQixDQUFDLENBQUMiLCJmaWxlIjoibnBtY2kuYnVpbGQuZG9ja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCJcbmltcG9ydCAqIGFzIE5wbWNpRW52IGZyb20gXCIuL25wbWNpLmVudlwiO1xuXG5cbmV4cG9ydCBsZXQgYnVpbGQgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgXG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn1cblxuZXhwb3J0IGxldCByZWFkRG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgbGV0IHJlYWREb2NrZXJmaWxlc0FycmF5OkRvY2tlcmZpbGVbXSA9IFtdXG4gICAgcGx1Z2lucy5ndWxwLnNyYyhcIi4vRG9ja2VyZmlsZSpcIilcbiAgICAgICAgLnBpcGUocGx1Z2lucy50aHJvdWdoMi5vYmooZnVuY3Rpb24oZmlsZSxlbmMsY2Ipe1xuICAgICAgICAgICAgbGV0IG15RG9ja2VyZmlsZSA9IG5ldyBEb2NrZXJmaWxlKHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDpmaWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgcmVhZDp0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlYWREb2NrZXJmaWxlc0FycmF5LnB1c2gobXlEb2NrZXJmaWxlKTtcbiAgICAgICAgICAgIGNiKG51bGwsZmlsZSk7XG4gICAgICAgICB9LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHJlYWREb2NrZXJmaWxlc0FycmF5KTtcbiAgICAgICAgIH0pKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5leHBvcnQgbGV0IGNsZWFuVGFnc0FycmF5RnVuY3Rpb24gPSBmdW5jdGlvbihkb2NrZXJmaWxlQXJyYXlBcmc6RG9ja2VyZmlsZVtdKTpzdHJpbmdbXXtcbiAgICBsZXQgY2xlYW5UYWdzQXJyYXk6c3RyaW5nW10gPSBbXTtcbiAgICBkb2NrZXJmaWxlQXJyYXlBcmcuZm9yRWFjaChmdW5jdGlvbihkb2NrZXJmaWxlQXJnKXtcbiAgICAgICAgY2xlYW5UYWdzQXJyYXkucHVzaChkb2NrZXJmaWxlQXJnLmNsZWFuVGFnKTtcbiAgICB9KTtcbiAgICByZXR1cm4gY2xlYW5UYWdzQXJyYXk7XG59XG5cbmV4cG9ydCBsZXQgc29ydERvY2tlcmZpbGVzID0gZnVuY3Rpb24oc29ydGFibGVBcnJheUFyZzpEb2NrZXJmaWxlW10pe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgbGV0IHNvcnRlZEFycmF5OkRvY2tlcmZpbGVbXSA9IFtdOyBcbiAgICBsZXQgc29ydGVyRnVuY3Rpb25Db3VudGVyOm51bWJlciA9IDA7XG4gICAgbGV0IHNvcnRlckZ1bmN0aW9uID0gZnVuY3Rpb24oKXtcbiAgICAgICAgY29uc29sZS5sb2coc29ydGVyRnVuY3Rpb25Db3VudGVyKTtcbiAgICAgICAgbGV0IGNsZWFuVGFncyA9IGNsZWFuVGFnc0FycmF5RnVuY3Rpb24oc29ydGFibGVBcnJheUFyZyk7XG4gICAgICAgIHNvcnRhYmxlQXJyYXlBcmcuZm9yRWFjaCgoZG9ja2VyZmlsZUFyZyk9PntcbiAgICAgICAgICAgIGlmKGNsZWFuVGFncy5pbmRleE9mKGRvY2tlcmZpbGVBcmcuYmFzZUltYWdlKSA9PSAtMSl7XG4gICAgICAgICAgICAgICAgbGV0IGRvY2tlcmZpbGVBcmdJbmRleCA9IHNvcnRhYmxlQXJyYXlBcmcuaW5kZXhPZihkb2NrZXJmaWxlQXJnKTtcbiAgICAgICAgICAgICAgICBzb3J0YWJsZUFycmF5QXJnLnNwbGljZShkb2NrZXJmaWxlQXJnSW5kZXgsMSk7XG4gICAgICAgICAgICAgICAgc29ydGVkQXJyYXkucHVzaChkb2NrZXJmaWxlQXJnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHNvcnRhYmxlQXJyYXlBcmcubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHNvcnRlZEFycmF5KTtcbiAgICAgICAgfSBlbHNlIGlmIChzb3J0ZXJGdW5jdGlvbkNvdW50ZXIgPCAxMDApIHtcbiAgICAgICAgICAgIHNvcnRlckZ1bmN0aW9uQ291bnRlcisrO1xuICAgICAgICAgICAgc29ydGVyRnVuY3Rpb24oKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgc29ydGVyRnVuY3Rpb24oKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5leHBvcnQgbGV0IGJ1aWxkRG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgTnBtY2lFbnYuZG9ja2VyRmlsZXMuZm9yRWFjaChmdW5jdGlvbihkb2NrZXJmaWxlQXJnKXtcbiAgICAgICAgZG9ja2VyZmlsZUFyZy5idWlsZCgpO1xuICAgIH0pXG4gICAgZG9uZS5yZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn1cblxuZXhwb3J0IGNsYXNzIERvY2tlcmZpbGUge1xuICAgIGZpbGVQYXRoOnN0cmluZztcbiAgICByZXBvOnN0cmluZztcbiAgICB2ZXJzaW9uOnN0cmluZztcbiAgICBjbGVhblRhZzpzdHJpbmc7XG4gICAgYnVpbGRUYWc6c3RyaW5nO1xuICAgIGNvbnRlbnQ6c3RyaW5nO1xuICAgIGJhc2VJbWFnZTpzdHJpbmc7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczp7ZmlsZVBhdGg/OnN0cmluZyxmaWxlQ29udGVudHM/OnN0cmluZ3xCdWZmZXIscmVhZD86Ym9vbGVhbn0pe1xuICAgICAgICB0aGlzLmZpbGVQYXRoID0gb3B0aW9ucy5maWxlUGF0aDtcbiAgICAgICAgdGhpcy5yZXBvID0gTnBtY2lFbnYucmVwby51c2VyICsgXCIvXCIgKyBOcG1jaUVudi5yZXBvLnJlcG87XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGRvY2tlckZpbGVWZXJzaW9uKHBsdWdpbnMucGF0aC5wYXJzZShvcHRpb25zLmZpbGVQYXRoKS5iYXNlKTtcbiAgICAgICAgdGhpcy5jbGVhblRhZyA9IHRoaXMucmVwbyArIFwiOlwiICsgdGhpcy52ZXJzaW9uO1xuICAgICAgICBpZihvcHRpb25zLmZpbGVQYXRoICYmIG9wdGlvbnMucmVhZCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBwbHVnaW5zLnNtYXJ0ZmlsZS5sb2NhbC50b1N0cmluZ1N5bmMocGx1Z2lucy5wYXRoLnJlc29sdmUob3B0aW9ucy5maWxlUGF0aCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhc2VJbWFnZSA9IGRvY2tlckJhc2VJbWFnZSh0aGlzLmNvbnRlbnQpO1xuICAgIH07XG4gICAgYnVpbGQoKXtcbiAgICAgICAgaWYoIXRoaXMuYnVpbGRUYWcpe1xuICAgICAgICAgICAgbGV0IHRhZyA9IGRvY2tlclRhZyh0aGlzLnJlcG8sdGhpcy52ZXJzaW9uKTtcbiAgICAgICAgICAgIHBsdWdpbnMuc2hlbGxqcy5leGVjKFwiZG9ja2VyIGJ1aWxkIC10IFwiICsgdGFnICsgXCIgLWYgXCIgKyB0aGlzLmZpbGVQYXRoICsgXCIgLlwiKTtcbiAgICAgICAgICAgIHRoaXMuYnVpbGRUYWcgPSB0YWc7XG4gICAgICAgICAgICBOcG1jaUVudi5kb2NrZXJGaWxlc0J1aWx0LnB1c2godGhpcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcIlRoaXMgRG9ja2VyZmlsZSBhbHJlYWR5IGhhcyBiZWVuIGJ1aWx0IVwiKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9O1xuICAgIHB1c2goKXtcbiAgICAgICAgaWYodGhpcy5idWlsZFRhZyl7XG4gICAgICAgICAgICBwbHVnaW5zLnNoZWxsanMuZXhlYyhcImRvY2tlciBwdXNoIFwiICsgdGhpcy5idWlsZFRhZyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5lcnJvcihcIkRvY2tlcmZpbGUgaGFzbid0IGJlZW4gYnVpbHQgeWV0IVwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGxldCBkb2NrZXJGaWxlVmVyc2lvbiA9IGZ1bmN0aW9uKGRvY2tlcmZpbGVOYW1lQXJnOnN0cmluZyk6c3RyaW5ne1xuICAgIGxldCB2ZXJzaW9uU3RyaW5nOnN0cmluZztcbiAgICBsZXQgdmVyc2lvblJlZ2V4ID0gL0RvY2tlcmZpbGVfKFthLXpBLVowLTlcXC5dKikkLztcbiAgICBsZXQgcmVnZXhSZXN1bHRBcnJheSA9IHZlcnNpb25SZWdleC5leGVjKGRvY2tlcmZpbGVOYW1lQXJnKTtcbiAgICBpZihyZWdleFJlc3VsdEFycmF5ICYmIHJlZ2V4UmVzdWx0QXJyYXkubGVuZ3RoID09IDIpe1xuICAgICAgICB2ZXJzaW9uU3RyaW5nID0gcmVnZXhSZXN1bHRBcnJheVsxXTsgICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcnNpb25TdHJpbmcgPSBcImxhdGVzdFwiO1xuICAgIH1cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZztcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJCYXNlSW1hZ2UgPSBmdW5jdGlvbihkb2NrZXJmaWxlQ29udGVudEFyZzpzdHJpbmcpe1xuICAgIGxldCBiYXNlSW1hZ2VSZWdleCA9IC9GUk9NXFxzKFthLXpBLXowLTlcXC9cXC1cXDpdKilcXG4/L1xuICAgIGxldCByZWdleFJlc3VsdEFycmF5ID0gYmFzZUltYWdlUmVnZXguZXhlYyhkb2NrZXJmaWxlQ29udGVudEFyZylcbiAgICByZXR1cm4gcmVnZXhSZXN1bHRBcnJheVsxXTtcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJUYWcgPSBmdW5jdGlvbihyZXBvQXJnOnN0cmluZyx2ZXJzaW9uQXJnOnN0cmluZyk6c3RyaW5ne1xuICAgIGxldCB0YWdTdHJpbmc6c3RyaW5nO1xuICAgIGxldCByZWdpc3RyeSA9IE5wbWNpRW52LmRvY2tlclJlZ2lzdHJ5O1xuICAgIGlmKHByb2Nlc3MuZW52LkNJX0JVSUxEX1NUQUdFID09IFwiYnVpbGRcIiAgfHwgcHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJ0ZXN0XCIpe1xuICAgICAgICByZWdpc3RyeSA9IFwicmVnaXN0cnkuZ2l0bGFiLmNvbVwiO1xuICAgIH0gXG4gICAgbGV0IHJlcG8gPSByZXBvQXJnO1xuICAgIGxldCB2ZXJzaW9uID0gdmVyc2lvbkFyZztcbiAgICBpZihwcm9jZXNzLmVudi5DSV9CVUlMRF9TVEFHRSA9PSBcImJ1aWxkXCIgfHwgcHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJ0ZXN0XCIpe1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbiArIFwiX3Rlc3RcIjtcbiAgICB9XG4gICAgdGFnU3RyaW5nID0gcmVnaXN0cnkgKyBcIi9cIiArIHJlcG8gKyBcIjpcIiArIHZlcnNpb247XG4gICAgcmV0dXJuIHRhZ1N0cmluZztcbn07XG4iXX0=
