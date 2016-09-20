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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFzQjtBQUN0QixrQkFBZ0I7QUFDaEIsNkJBQThCO0FBQzlCLHVDQUFzQztBQUN0QyxvQkFBb0I7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsdURBQXVELENBQUM7QUFDcEYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsMkJBQTJCLENBQUE7QUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLEdBQUc7SUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUM7QUFDMUMsQ0FBQyxDQUFDO0FBSUYsK0RBQWdFO0FBQ2hFLHNEQUF1RDtBQUN2RCxnREFBaUQ7QUFDakQsOENBQThDO0FBRzlDLElBQUksV0FBdUMsQ0FBQztBQUM1QyxJQUFJLFdBQXVDLENBQUM7QUFDNUMsSUFBSSxhQUEyQyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxPQUFPLEVBQUM7SUFDYixRQUFRLENBQUMsY0FBYyxFQUFDO1FBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBQztZQUNqQyxXQUFXLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ25GLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUM1RixXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFD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