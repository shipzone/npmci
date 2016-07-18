"use strict";
require("typings-test");
require("should");
const path = require("path");
const beautylog = require("beautylog");
//set up environment
process.env.CI_BUILD_REPO = "https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git";
process.env.NPMCI_SSHKEY_1 = "hostString|somePrivKey|##";
process.env.NPMTS_TEST = "true";
process.cwd = () => {
    return path.join(__dirname, "assets/");
};
const NpmciBuildDocker = require("../dist/npmci.build.docker");
const NpmciPublish = require("../dist/npmci.publish");
const NpmciTest = require("../dist/npmci.test");
const NpmciSsh = require("../dist/npmci.ssh");
let dockerfile1;
let dockerfile2;
let sortableArray;
describe("NPMCI", function () {
    describe("build.docker", function () {
        it("should return valid Dockerfiles", function () {
            dockerfile1 = new NpmciBuildDocker.Dockerfile({ filePath: "./Dockerfile", read: true });
            dockerfile2 = new NpmciBuildDocker.Dockerfile({ filePath: "./Dockerfile_sometag1", read: true });
            dockerfile1.version.should.equal("latest");
            dockerfile2.version.should.equal("sometag1");
        });
        it("should read a directory of Dockerfiles", function (done) {
            NpmciBuildDocker.readDockerfiles()
                .then(function (readDockerfilesArrayArg) {
                readDockerfilesArrayArg[1].version.should.equal("sometag1");
                sortableArray = readDockerfilesArrayArg;
                done();
            });
        });
        it("should sort an array of Dockerfiles", function (done) {
            NpmciBuildDocker.sortDockerfiles(sortableArray)
                .then(function (sortedArrayArg) {
                beautylog.success("final result");
                console.log(sortedArrayArg);
                done();
            });
        });
        it("should correctly chain Dockerfile handling", function (done) {
            NpmciBuildDocker.build()
                .then(() => {
                done();
            });
        });
    });
    describe(".publish.docker", function () {
        it("should publish all built Dockerfiles", function (done) {
            NpmciPublish.publish("docker")
                .then(() => {
                done();
            });
            ;
        });
    });
    describe(".test.npm", function () {
        it("should source nvm using bash and install a specific node version, then test it", function (done) {
            NpmciTest.test("legacy")
                .then(() => {
                return NpmciTest.test("lts");
            })
                .then(() => {
                return NpmciTest.test("stable");
            })
                .then(() => {
                done();
            });
        });
    });
    describe("test.docker", function () {
        it("should test dockerfiles", function (done) {
            NpmciTest.test("docker")
                .then(() => {
                done();
            });
        });
    });
    describe("npmci prepare ssh", function () {
        it("should pick up SSH keys", function (done) {
            NpmciSsh.ssh()
                .then(() => {
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUNoQixNQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixNQUFZLFNBQVMsV0FBTSxXQUUzQixDQUFDLENBRnFDO0FBQ3RDLG9CQUFvQjtBQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyx1REFBdUQsQ0FBQztBQUNwRixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQTtBQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsR0FBRztJQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFJRixNQUFPLGdCQUFnQixXQUFXLDRCQUE0QixDQUFDLENBQUM7QUFDaEUsTUFBTyxZQUFZLFdBQVcsdUJBQXVCLENBQUMsQ0FBQztBQUN2RCxNQUFPLFNBQVMsV0FBVyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2pELE1BQU8sUUFBUSxXQUFXLG1CQUFtQixDQUFDLENBQUE7QUFHOUMsSUFBSSxXQUF1QyxDQUFDO0FBQzVDLElBQUksV0FBdUMsQ0FBQztBQUM1QyxJQUFJLGFBQTJDLENBQUM7QUFFaEQsUUFBUSxDQUFDLE9BQU8sRUFBQztJQUNiLFFBQVEsQ0FBQyxjQUFjLEVBQUM7UUFDcEIsRUFBRSxDQUFDLGlDQUFpQyxFQUFDO1lBQ2pDLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBQyxjQUFjLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7WUFDbkYsV0FBVyxHQUFHLElBQUksZ0JBQWdCLENB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