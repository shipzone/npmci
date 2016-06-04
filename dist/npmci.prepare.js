"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var env = require("./npmci.env");
var npm = function () {
    var done = plugins.q.defer();
    var npmrcPrefix = "//registry.npmjs.org/:_authToken=";
    var npmToken = process.env.NPMCI_TOKEN_NPM;
    var npmrcFileString = npmrcPrefix + npmToken;
    if (npmToken) {
        plugins.beautylog.info("found access token");
    }
    else {
        plugins.beautylog.error("no access token found! Exiting!");
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString, { fileName: ".npmrc", filePath: "/root" });
    done.resolve();
    return done.promise;
};
var docker = function () {
    var done = plugins.q.defer();
    env.dockerRegistry = "docker.io";
    var dockerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/;
    if (!process.env.NPMCI_LOGIN_DOCKER) {
        plugins.beautylog.error("You have to specify Login Data to the Docker Registry");
        process.exit(1);
    }
    var dockerRegexResultArray = dockerRegex.exec(process.env.NPMCI_LOGIN_DOCKER);
    var username = dockerRegexResultArray[1];
    var password = dockerRegexResultArray[2];
    plugins.shelljs.exec("docker login -u " + username + " -p " + password);
    done.resolve();
    return done.promise;
};
var dockerGitlab = function () {
    var done = plugins.q.defer();
    env.dockerRegistry = "registry.gitlab.com";
    var ciBuildToken = process.env.CI_BUILD_TOKEN;
    plugins.shelljs.exec("docker login -u gitlab-ci-token -p " + ciBuildToken + " " + env.dockerRegistry);
    done.resolve();
    return done.promise;
};
exports.prepare = function (serviceArg) {
    switch (serviceArg) {
        case "npm":
            return npm();
        case "docker":
            return docker();
        case "docker-gitlab":
            return dockerGitlab();
        default:
            break;
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUcsVUFBUyxVQUFpQjtJQUMzQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEtBQUssS0FBSztZQUNOLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNqQixLQUFLLFFBQVE7WUFDVCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDcEIsS0FBSyxlQUFlO1lBQ2hCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMxQjtZQUNJLEtBQUssQ0FBQztJQUNkLENBQUM7QUFDTCxDQUFDLENBQUEiLCJmaWxlIjoibnBtY2kucHJlcGFyZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInR5cGluZ3MtZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcbmltcG9ydCB7YmFzaH0gZnJvbSBcIi4vbnBtY2kuYmFzaFwiO1xuaW1wb3J0ICogYXMgZW52IGZyb20gXCIuL25wbWNpLmVudlwiXG5cbmxldCBucG0gPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgXG4gICAgbGV0IG5wbXJjUHJlZml4OnN0cmluZyA9IFwiLy9yZWdpc3RyeS5ucG1qcy5vcmcvOl9hdXRoVG9rZW49XCI7XG4gICAgbGV0IG5wbVRva2VuOnN0cmluZyA9IHByb2Nlc3MuZW52Lk5QTUNJX1RPS0VOX05QTTtcbiAgICBsZXQgbnBtcmNGaWxlU3RyaW5nID0gbnBtcmNQcmVmaXggKyBucG1Ub2tlbjtcbiAgICBcbiAgICBpZihucG1Ub2tlbil7XG4gICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJmb3VuZCBhY2Nlc3MgdG9rZW5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJubyBhY2Nlc3MgdG9rZW4gZm91bmQhIEV4aXRpbmchXCIpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgfVxuICAgIHBsdWdpbnMuc21hcnRmaWxlLm1lbW9yeS50b0ZzU3luYyhucG1yY0ZpbGVTdHJpbmcse2ZpbGVOYW1lOlwiLm5wbXJjXCIsZmlsZVBhdGg6XCIvcm9vdFwifSk7XG4gICAgZG9uZS5yZXNvbHZlKCk7XG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcbn07XG5cbmxldCBkb2NrZXIgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgZW52LmRvY2tlclJlZ2lzdHJ5ID0gXCJkb2NrZXIuaW9cIlxuICAgIGxldCBkb2NrZXJSZWdleCA9IC9eKFthLXpBLVowLTlcXC5dKilcXHwoW2EtekEtWjAtOVxcLl0qKS9cbiAgICBpZighcHJvY2Vzcy5lbnYuTlBNQ0lfTE9HSU5fRE9DS0VSKXtcbiAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJZb3UgaGF2ZSB0byBzcGVjaWZ5IExvZ2luIERhdGEgdG8gdGhlIERvY2tlciBSZWdpc3RyeVwiKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgICBsZXQgZG9ja2VyUmVnZXhSZXN1bHRBcnJheSA9IGRvY2tlclJlZ2V4LmV4ZWMocHJvY2Vzcy5lbnYuTlBNQ0lfTE9HSU5fRE9DS0VSKTtcbiAgICBsZXQgdXNlcm5hbWUgPSBkb2NrZXJSZWdleFJlc3VsdEFycmF5WzFdO1xuICAgIGxldCBwYXNzd29yZCA9IGRvY2tlclJlZ2V4UmVzdWx0QXJyYXlbMl07XG4gICAgcGx1Z2lucy5zaGVsbGpzLmV4ZWMoXCJkb2NrZXIgbG9naW4gLXUgXCIgKyB1c2VybmFtZSArIFwiIC1wIFwiICsgcGFzc3dvcmQpO1xuICAgIGRvbmUucmVzb2x2ZSgpO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59XG5cbmxldCBkb2NrZXJHaXRsYWIgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgZW52LmRvY2tlclJlZ2lzdHJ5ID0gXCJyZWdpc3RyeS5naXRsYWIuY29tXCI7XG4gICAgbGV0IGNpQnVpbGRUb2tlbiA9IHByb2Nlc3MuZW52LkNJX0JVSUxEX1RPS0VOXG4gICAgcGx1Z2lucy5zaGVsbGpzLmV4ZWMoXCJkb2NrZXIgbG9naW4gLXUgZ2l0bGFiLWNpLXRva2VuIC1wIFwiICsgY2lCdWlsZFRva2VuICsgXCIgXCIgKyBlbnYuZG9ja2VyUmVnaXN0cnkpO1xuICAgIGRvbmUucmVzb2x2ZSgpO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59XG5cbmV4cG9ydCBsZXQgcHJlcGFyZSA9IGZ1bmN0aW9uKHNlcnZpY2VBcmc6c3RyaW5nKXtcbiAgICBzd2l0Y2ggKHNlcnZpY2VBcmcpIHtcbiAgICAgICAgY2FzZSBcIm5wbVwiOlxuICAgICAgICAgICAgcmV0dXJuIG5wbSgpO1xuICAgICAgICBjYXNlIFwiZG9ja2VyXCI6XG4gICAgICAgICAgICByZXR1cm4gZG9ja2VyKCk7XG4gICAgICAgIGNhc2UgXCJkb2NrZXItZ2l0bGFiXCI6XG4gICAgICAgICAgICByZXR1cm4gZG9ja2VyR2l0bGFiKCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59Il19
