"use strict";
require("typings-test");
const should = require("should");
const path = require("path");
const beautylog = require("beautylog");
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
                beautylog.success('final result');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFDaEMsNkJBQTZCO0FBQzdCLHVDQUFzQztBQUV0QyxxQkFBcUI7QUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsdURBQXVELENBQUE7QUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEdBQUcsMkJBQTJCLENBQUE7QUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO0FBQy9CLE9BQU8sQ0FBQyxHQUFHLEdBQUc7SUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUE7QUFDekMsQ0FBQyxDQUFBO0FBSUQsK0RBQStEO0FBQy9ELHNEQUFzRDtBQUN0RCxnREFBZ0Q7QUFDaEQsOENBQThDO0FBRzlDLElBQUksV0FBd0MsQ0FBQTtBQUM1QyxJQUFJLFdBQXdDLENBQUE7QUFDNUMsSUFBSSxhQUE0QyxDQUFBO0FBRWhELFFBQVEsQ0FBQyxPQUFPLEVBQUM7SUFDYixRQUFRLENBQUMsY0FBYyxFQUFDO1FBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBQztZQUNqQyxXQUFXLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1lBQ3JGLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQTtZQUM5RixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUNqRCxDQUFDLENBQUMsQ0FBQTtRQUVGLEVBQUUsQ0FBQyx3Q0FBd0MsRUFBQyxVQUFTLElBQUk7WUFDckQsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO2lCQUM3QixJQUFJLENBQUMsVUFBUyx1QkFBc0Q7Z0JBQ2pFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQzVELGFBQWEsR0FBRyx1QkFBdUIsQ0FBQTtnQkFDdkMsSUFBSSxFQUFFLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLHFDQUFxQyxFQUFDLFVBQVMsSUFBSTtZQUNsRCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO2lCQUMxQyxJQUFJLENBQUMsVUFBUyxjQUE2QztnQkFDeEQsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtnQkFDM0IsSUFBSSxFQUFFLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO1FBRUYsRUFBRSxDQUFDLDRDQUE0QyxFQUFFLFVBQVMsSUFBSTtZQUMxRCxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUU7aUJBQ25CLElBQUksQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxpQkFBaUIsRUFBQztRQUN2QixFQUFFLENBQUMsc0NBQXNDLEVBQUMsVUFBUyxJQUFJO1lBQ25ELFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDO2lCQUN6QixJQUFJLENBQUM7Z0JBQ0YsSUFBSSxFQUFFLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsV0FBVyxFQUFDO1FBQ2pCLEVBQUUsQ0FBQyxnRkFBZ0YsRUFBQyxVQUFTLElBQUk7WUFDN0YsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ25CLElBQUksQ0FBQztnQkFDRixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNoQyxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1lBQ25DLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUM7Z0JBQ0YsSUFBSSxFQUFFLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7SUFFRixRQUFRLENBQUMsYUFBYSxFQUFDO1FBQ25CLEVBQUUsQ0FBQyx5QkFBeUIsRUFBQyxVQUFTLElBQUk7WUFDdEMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQ25CLElBQUksQ0FBQztnQkFDRixJQUFJLEVBQUUsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtJQUVGLFFBQVEsQ0FBQyxtQkFBbUIsRUFBQztRQUN6QixFQUFFLENBQUMseUJBQXlCLEVBQUMsVUFBUyxJQUFJO1lBQ3RDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7aUJBQ1QsSUFBSSxDQUFDO2dCQUNGLElBQUksRUFBRSxDQUFBO1lBQ1YsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==