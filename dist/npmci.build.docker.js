"use strict";
var plugins = require("./npmci.plugins");
var NpmciEnv = require("./npmci.env");
exports.build = function () {
    var done = plugins.q.defer();
    exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles);
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
    var trackingArray = [];
    var sorterFunctionCounter = 0;
    var sorterFunction = function () {
        sortableArrayArg.forEach(function (dockerfileArg) {
            var cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, trackingArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) == -1 && trackingArray.indexOf(dockerfileArg) == -1) {
                sortedArray.push(dockerfileArg);
                trackingArray.push(dockerfileArg);
            }
            else if (cleanTags.indexOf(dockerfileArg.baseImage) != -1) {
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
            var dockerfileDependency = void 0;
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
        this.localBaseImageDependent = false;
    }
    ;
    Dockerfile.prototype.build = function () {
        if (!this.buildTag) {
            this.patchContents();
            var tag = exports.dockerTag(this.repo, this.version);
            plugins.shelljs.exec("docker build -t " + tag + " -f " + this.filePath + " .");
            this.buildTag = tag;
            NpmciEnv.dockerFilesBuilt.push(this);
            this.restoreContents();
        }
        else {
            plugins.beautylog.error("This Dockerfile has already been built!");
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
    Dockerfile.prototype.patchContents = function () {
    };
    ;
    Dockerfile.prototype.restoreContents = function () {
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
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    var cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) == -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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O0FBRVMsOEJBQXNCLEdBQUcsVUFBUyxrQkFBK0IsRUFBQyxnQkFBNkI7SUFDdEcsSUFBSSxjQUFjLEdBQVksRUFBRSxDQUFDO0lBQ2pDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxVQUFTLGFBQWE7UUFDN0MsRUFBRSxDQUFBLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQztZQUM5QyxjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsY0FBYyxDQUFDO0FBQzFCLENBQUMsQ0FBQSIsImZpbGUiOiJucG1jaS5idWlsZC5kb2NrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIlxuaW1wb3J0ICogYXMgTnBtY2lFbnYgZnJvbSBcIi4vbnBtY2kuZW52XCI7XG5cbmV4cG9ydCBsZXQgYnVpbGQgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgcmVhZERvY2tlcmZpbGVzKClcbiAgICAgICAgLnRoZW4oc29ydERvY2tlcmZpbGVzKVxuICAgICAgICAudGhlbihtYXBEb2NrZXJmaWxlcylcbiAgICAgICAgLnRoZW4oYnVpbGREb2NrZXJmaWxlcyk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn1cblxuZXhwb3J0IGxldCByZWFkRG9ja2VyZmlsZXMgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgbGV0IHJlYWREb2NrZXJmaWxlc0FycmF5OkRvY2tlcmZpbGVbXSA9IFtdXG4gICAgcGx1Z2lucy5ndWxwLnNyYyhcIi4vRG9ja2VyZmlsZSpcIilcbiAgICAgICAgLnBpcGUocGx1Z2lucy50aHJvdWdoMi5vYmooZnVuY3Rpb24oZmlsZSxlbmMsY2Ipe1xuICAgICAgICAgICAgbGV0IG15RG9ja2VyZmlsZSA9IG5ldyBEb2NrZXJmaWxlKHtcbiAgICAgICAgICAgICAgICBmaWxlUGF0aDpmaWxlLnBhdGgsXG4gICAgICAgICAgICAgICAgcmVhZDp0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlYWREb2NrZXJmaWxlc0FycmF5LnB1c2gobXlEb2NrZXJmaWxlKTtcbiAgICAgICAgICAgIGNiKG51bGwsZmlsZSk7XG4gICAgICAgICB9LGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgZG9uZS5yZXNvbHZlKHJlYWREb2NrZXJmaWxlc0FycmF5KTtcbiAgICAgICAgIH0pKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5leHBvcnQgbGV0IHNvcnREb2NrZXJmaWxlcyA9IGZ1bmN0aW9uKHNvcnRhYmxlQXJyYXlBcmc6RG9ja2VyZmlsZVtdKXtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuICAgIGxldCBzb3J0ZWRBcnJheTpEb2NrZXJmaWxlW10gPSBbXTsgXG4gICAgbGV0IHRyYWNraW5nQXJyYXk6RG9ja2VyZmlsZVtdID0gW107XG4gICAgbGV0IHNvcnRlckZ1bmN0aW9uQ291bnRlcjpudW1iZXIgPSAwO1xuICAgIGxldCBzb3J0ZXJGdW5jdGlvbiA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHNvcnRhYmxlQXJyYXlBcmcuZm9yRWFjaCgoZG9ja2VyZmlsZUFyZyk9PntcbiAgICAgICAgICAgIGxldCBjbGVhblRhZ3MgPSBjbGVhblRhZ3NBcnJheUZ1bmN0aW9uKHNvcnRhYmxlQXJyYXlBcmcsdHJhY2tpbmdBcnJheSk7XG4gICAgICAgICAgICBpZihjbGVhblRhZ3MuaW5kZXhPZihkb2NrZXJmaWxlQXJnLmJhc2VJbWFnZSkgPT0gLTEgJiYgdHJhY2tpbmdBcnJheS5pbmRleE9mKGRvY2tlcmZpbGVBcmcpID09IC0xKXtcbiAgICAgICAgICAgICAgICBzb3J0ZWRBcnJheS5wdXNoKGRvY2tlcmZpbGVBcmcpO1xuICAgICAgICAgICAgICAgIHRyYWNraW5nQXJyYXkucHVzaChkb2NrZXJmaWxlQXJnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihjbGVhblRhZ3MuaW5kZXhPZihkb2NrZXJmaWxlQXJnLmJhc2VJbWFnZSkgIT0gLTEpe1xuICAgICAgICAgICAgICAgIGRvY2tlcmZpbGVBcmcubG9jYWxCYXNlSW1hZ2VEZXBlbmRlbnQgPSB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKHNvcnRhYmxlQXJyYXlBcmcubGVuZ3RoID09IHNvcnRlZEFycmF5Lmxlbmd0aCl7XG4gICAgICAgICAgICBkb25lLnJlc29sdmUoc29ydGVkQXJyYXkpO1xuICAgICAgICB9IGVsc2UgaWYgKHNvcnRlckZ1bmN0aW9uQ291bnRlciA8IDEwKSB7XG4gICAgICAgICAgICBzb3J0ZXJGdW5jdGlvbkNvdW50ZXIrKztcbiAgICAgICAgICAgIHNvcnRlckZ1bmN0aW9uKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHNvcnRlckZ1bmN0aW9uKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn07XG5cbmV4cG9ydCBsZXQgbWFwRG9ja2VyZmlsZXMgPSBmdW5jdGlvbihzb3J0ZWRBcnJheTpEb2NrZXJmaWxlW10pe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgc29ydGVkQXJyYXkuZm9yRWFjaCgoZG9ja2VyZmlsZUFyZykgPT4ge1xuICAgICAgICBpZihkb2NrZXJmaWxlQXJnLmxvY2FsQmFzZUltYWdlRGVwZW5kZW50KXtcbiAgICAgICAgICAgIGxldCBkb2NrZXJmaWxlRGVwZW5kZW5jeTpEb2NrZXJmaWxlO1xuICAgICAgICAgICAgc29ydGVkQXJyYXkuZm9yRWFjaCgoZG9ja2ZpbGUyOkRvY2tlcmZpbGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZihkb2NrZmlsZTIuY2xlYW5UYWcgPT0gZG9ja2VyZmlsZUFyZy5iYXNlSW1hZ2Upe1xuICAgICAgICAgICAgICAgICAgICBkb2NrZXJmaWxlQXJnLmxvY2FsQmFzZURvY2tlcmZpbGUgPSBkb2NrZmlsZTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICBkb25lLnJlc29sdmUoc29ydGVkQXJyYXkpO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59XG5cbmV4cG9ydCBsZXQgYnVpbGREb2NrZXJmaWxlcyA9IGZ1bmN0aW9uKHNvcnRlZEFycmF5QXJnOkRvY2tlcmZpbGVbXSl7XG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcbiAgICBzb3J0ZWRBcnJheUFyZy5mb3JFYWNoKGZ1bmN0aW9uKGRvY2tlcmZpbGVBcmcpe1xuICAgICAgICBkb2NrZXJmaWxlQXJnLmJ1aWxkKCk7XG4gICAgfSlcbiAgICBkb25lLnJlc29sdmUoKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5leHBvcnQgY2xhc3MgRG9ja2VyZmlsZSB7XG4gICAgZmlsZVBhdGg6c3RyaW5nO1xuICAgIHJlcG86c3RyaW5nO1xuICAgIHZlcnNpb246c3RyaW5nO1xuICAgIGNsZWFuVGFnOnN0cmluZztcbiAgICBidWlsZFRhZzpzdHJpbmc7XG4gICAgY29udGVudDpzdHJpbmc7XG4gICAgcGF0Y2hlZENvbnRlbnQ6c3RyaW5nO1xuICAgIGJhc2VJbWFnZTpzdHJpbmc7XG4gICAgbG9jYWxCYXNlSW1hZ2VEZXBlbmRlbnQ6Ym9vbGVhbjtcbiAgICBsb2NhbEJhc2VEb2NrZXJmaWxlOkRvY2tlcmZpbGU7XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczp7ZmlsZVBhdGg/OnN0cmluZyxmaWxlQ29udGVudHM/OnN0cmluZ3xCdWZmZXIscmVhZD86Ym9vbGVhbn0pe1xuICAgICAgICB0aGlzLmZpbGVQYXRoID0gb3B0aW9ucy5maWxlUGF0aDtcbiAgICAgICAgdGhpcy5yZXBvID0gTnBtY2lFbnYucmVwby51c2VyICsgXCIvXCIgKyBOcG1jaUVudi5yZXBvLnJlcG87XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IGRvY2tlckZpbGVWZXJzaW9uKHBsdWdpbnMucGF0aC5wYXJzZShvcHRpb25zLmZpbGVQYXRoKS5iYXNlKTtcbiAgICAgICAgdGhpcy5jbGVhblRhZyA9IHRoaXMucmVwbyArIFwiOlwiICsgdGhpcy52ZXJzaW9uO1xuICAgICAgICBpZihvcHRpb25zLmZpbGVQYXRoICYmIG9wdGlvbnMucmVhZCl7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBwbHVnaW5zLnNtYXJ0ZmlsZS5sb2NhbC50b1N0cmluZ1N5bmMocGx1Z2lucy5wYXRoLnJlc29sdmUob3B0aW9ucy5maWxlUGF0aCkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmJhc2VJbWFnZSA9IGRvY2tlckJhc2VJbWFnZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgICB0aGlzLmxvY2FsQmFzZUltYWdlRGVwZW5kZW50ID0gZmFsc2U7XG4gICAgfTtcbiAgICBidWlsZCgpe1xuICAgICAgICBpZighdGhpcy5idWlsZFRhZyl7XG4gICAgICAgICAgICB0aGlzLnBhdGNoQ29udGVudHMoKTtcbiAgICAgICAgICAgIGxldCB0YWcgPSBkb2NrZXJUYWcodGhpcy5yZXBvLHRoaXMudmVyc2lvbik7XG4gICAgICAgICAgICBwbHVnaW5zLnNoZWxsanMuZXhlYyhcImRvY2tlciBidWlsZCAtdCBcIiArIHRhZyArIFwiIC1mIFwiICsgdGhpcy5maWxlUGF0aCArIFwiIC5cIik7XG4gICAgICAgICAgICB0aGlzLmJ1aWxkVGFnID0gdGFnO1xuICAgICAgICAgICAgTnBtY2lFbnYuZG9ja2VyRmlsZXNCdWlsdC5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29udGVudHMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiVGhpcyBEb2NrZXJmaWxlIGhhcyBhbHJlYWR5IGJlZW4gYnVpbHQhXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgcHVzaCgpe1xuICAgICAgICBpZih0aGlzLmJ1aWxkVGFnKXtcbiAgICAgICAgICAgIHBsdWdpbnMuc2hlbGxqcy5leGVjKFwiZG9ja2VyIHB1c2ggXCIgKyB0aGlzLmJ1aWxkVGFnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmVycm9yKFwiRG9ja2VyZmlsZSBoYXNuJ3QgYmVlbiBidWlsdCB5ZXQhXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhdGNoQ29udGVudHMoKXtcbiAgICAgICAgXG4gICAgfTtcbiAgICByZXN0b3JlQ29udGVudHMoKXtcbiAgICAgICAgXG4gICAgfTtcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJGaWxlVmVyc2lvbiA9IGZ1bmN0aW9uKGRvY2tlcmZpbGVOYW1lQXJnOnN0cmluZyk6c3RyaW5ne1xuICAgIGxldCB2ZXJzaW9uU3RyaW5nOnN0cmluZztcbiAgICBsZXQgdmVyc2lvblJlZ2V4ID0gL0RvY2tlcmZpbGVfKFthLXpBLVowLTlcXC5dKikkLztcbiAgICBsZXQgcmVnZXhSZXN1bHRBcnJheSA9IHZlcnNpb25SZWdleC5leGVjKGRvY2tlcmZpbGVOYW1lQXJnKTtcbiAgICBpZihyZWdleFJlc3VsdEFycmF5ICYmIHJlZ2V4UmVzdWx0QXJyYXkubGVuZ3RoID09IDIpe1xuICAgICAgICB2ZXJzaW9uU3RyaW5nID0gcmVnZXhSZXN1bHRBcnJheVsxXTsgICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZlcnNpb25TdHJpbmcgPSBcImxhdGVzdFwiO1xuICAgIH1cbiAgICByZXR1cm4gdmVyc2lvblN0cmluZztcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJCYXNlSW1hZ2UgPSBmdW5jdGlvbihkb2NrZXJmaWxlQ29udGVudEFyZzpzdHJpbmcpe1xuICAgIGxldCBiYXNlSW1hZ2VSZWdleCA9IC9GUk9NXFxzKFthLXpBLXowLTlcXC9cXC1cXDpdKilcXG4/L1xuICAgIGxldCByZWdleFJlc3VsdEFycmF5ID0gYmFzZUltYWdlUmVnZXguZXhlYyhkb2NrZXJmaWxlQ29udGVudEFyZylcbiAgICByZXR1cm4gcmVnZXhSZXN1bHRBcnJheVsxXTtcbn1cblxuZXhwb3J0IGxldCBkb2NrZXJUYWcgPSBmdW5jdGlvbihyZXBvQXJnOnN0cmluZyx2ZXJzaW9uQXJnOnN0cmluZyk6c3RyaW5ne1xuICAgIGxldCB0YWdTdHJpbmc6c3RyaW5nO1xuICAgIGxldCByZWdpc3RyeSA9IE5wbWNpRW52LmRvY2tlclJlZ2lzdHJ5O1xuICAgIGlmKHByb2Nlc3MuZW52LkNJX0JVSUxEX1NUQUdFID09IFwiYnVpbGRcIiAgfHwgcHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJ0ZXN0XCIpe1xuICAgICAgICByZWdpc3RyeSA9IFwicmVnaXN0cnkuZ2l0bGFiLmNvbVwiO1xuICAgIH0gXG4gICAgbGV0IHJlcG8gPSByZXBvQXJnO1xuICAgIGxldCB2ZXJzaW9uID0gdmVyc2lvbkFyZztcbiAgICBpZihwcm9jZXNzLmVudi5DSV9CVUlMRF9TVEFHRSA9PSBcImJ1aWxkXCIgfHwgcHJvY2Vzcy5lbnYuQ0lfQlVJTERfU1RBR0UgPT0gXCJ0ZXN0XCIpe1xuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbiArIFwiX3Rlc3RcIjtcbiAgICB9XG4gICAgdGFnU3RyaW5nID0gcmVnaXN0cnkgKyBcIi9cIiArIHJlcG8gKyBcIjpcIiArIHZlcnNpb247XG4gICAgcmV0dXJuIHRhZ1N0cmluZztcbn07XG5cbmV4cG9ydCBsZXQgY2xlYW5UYWdzQXJyYXlGdW5jdGlvbiA9IGZ1bmN0aW9uKGRvY2tlcmZpbGVBcnJheUFyZzpEb2NrZXJmaWxlW10sdHJhY2tpbmdBcnJheUFyZzpEb2NrZXJmaWxlW10pOnN0cmluZ1tde1xuICAgIGxldCBjbGVhblRhZ3NBcnJheTpzdHJpbmdbXSA9IFtdO1xuICAgIGRvY2tlcmZpbGVBcnJheUFyZy5mb3JFYWNoKGZ1bmN0aW9uKGRvY2tlcmZpbGVBcmcpe1xuICAgICAgICBpZih0cmFja2luZ0FycmF5QXJnLmluZGV4T2YoZG9ja2VyZmlsZUFyZykgPT0gLTEpe1xuICAgICAgICAgICAgY2xlYW5UYWdzQXJyYXkucHVzaChkb2NrZXJmaWxlQXJnLmNsZWFuVGFnKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjbGVhblRhZ3NBcnJheTtcbn0iXX0=
