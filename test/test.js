"use strict";
require("typings-test");
const should = require("should");
const path = require("path");
// set up environment
process.env.CI_BUILD_REPO = 'https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git';
process.env.NPMCI_SSHKEY_1 = 'hostString|somePrivKey|##';
process.env.NPMTS_TEST = 'true';
process.cwd = () => {
    return path.join(__dirname, 'assets/');
};
const NpmciBuildDocker = require("../dist/npmci.build.docker");
const NpmciPublish = require("../dist/npmci.publish");
const NpmciTest = require("../dist/npmci.test");
const NpmciSsh = require("../dist/npmci.ssh");
let dockerfile1;
let dockerfile2;
let sortableArray;
describe('NPMCI', function () {
    describe('build.docker', function () {
        it('should return valid Dockerfiles', function () {
            dockerfile1 = new NpmciBuildDocker.Dockerfile({ filePath: './Dockerfile', read: true });
            dockerfile2 = new NpmciBuildDocker.Dockerfile({ filePath: './Dockerfile_sometag1', read: true });
            should(dockerfile1.version).equal('latest');
            should(dockerfile2.version).equal('sometag1');
        });
        it('should read a directory of Dockerfiles', function (done) {
            NpmciBuildDocker.readDockerfiles()
                .then(function (readDockerfilesArrayArg) {
                should(readDockerfilesArrayArg[1].version).equal('sometag1');
                sortableArray = readDockerfilesArrayArg;
                done();
            });
        });
        it('should sort an array of Dockerfiles', function (done) {
            NpmciBuildDocker.sortDockerfiles(sortableArray)
                .then(function (sortedArrayArg) {
                console.log(sortedArrayArg);
                done();
            });
        });
        it('should correctly chain Dockerfile handling', function (done) {
            NpmciBuildDocker.build()
                .then(() => {
                done();
            });
        });
    });
    describe('.publish.docker', function () {
        it('should publish all built Dockerfiles', function (done) {
            NpmciPublish.publish('docker')
                .then(() => {
                done();
            });
        });
    });
    describe('.test.npm', function () {
        it('should source nvm using bash and install a specific node version, then test it', function (done) {
            NpmciTest.test('legacy')
                .then(() => {
                return NpmciTest.test('lts');
            })
                .then(() => {
                return NpmciTest.test('stable');
            })
                .then(() => {
                done();
            });
        });
    });
    describe('test.docker', function () {
        it('should test dockerfiles', function (done) {
            NpmciTest.test('docker')
                .then(() => {
                done();
            });
        });
    });
    describe('npmci prepare ssh', function () {
        it('should pick up SSH keys', function (done) {
            NpmciSsh.ssh()
                .then(() => {
                done();
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFDaEMsNkJBQTRCO0FBRTVCLHFCQUFxQjtBQUNyQixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsR0FBRyx1REFBdUQsQ0FBQTtBQUNuRixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQTtBQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7QUFDL0IsT0FBTyxDQUFDLEdBQUcsR0FBRztJQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQTtBQUN6QyxDQUFDLENBQUE7QUFJRCwrREFBK0Q7QUFDL0Qsc0RBQXNEO0FBQ3RELGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFHOUMsSUFBSSxXQUF3QyxDQUFBO0FBQzVDLElBQUksV0FBd0MsQ0FBQTtBQUM1QyxJQUFJLGFBQTRDLENBQUE7QUFFaEQsUUFBUSxDQUFDLE9BQU8sRUFBQztJQUNiLFFBQVEsQ0FBQyxjQUFjLEVBQUM7UUFDcEIsRUFBRSxDQUFDLGlDQUFpQyxFQUFDO1lBQ2pDLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDckYsV0FBVyxHQUFHLElBQUksZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEVBQUMsUUFBUSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQzlGLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFVB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