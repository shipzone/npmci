"use strict";
require("typings-test");
require("should");
var path = require("path");
//set up environment
process.env.CI_BUILD_REPO = "https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git";
process.cwd = function () {
    return path.join(__dirname, "assets/");
};
//require NPMCI files
var NpmciBuildDocker = require("../dist/npmci.build.docker");
var dockerfile1;
var dockerfile2;
var sortableArray;
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
                console.log(sortedArrayArg);
                done();
            });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FBYyxDQUFDLENBQUE7QUFDdEIsUUFBTyxRQUFRLENBQUMsQ0FBQTtBQUNoQixJQUFPLElBQUksV0FBVyxNQUFNLENBQUMsQ0FBQztBQUM5QixvQkFBb0I7QUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEdBQUcsdURBQXVELENBQUM7QUFDcEYsT0FBTyxDQUFDLEdBQUcsR0FBRztJQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxTQUFTLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUM7QUFFRixxQkFBcUI7QUFDckIsSUFBTyxnQkFBZ0IsV0FBVyw0QkFBNEIsQ0FBQyxDQUFDO0FBR2hFLElBQUksV0FBdUMsQ0FBQztBQUM1QyxJQUFJLFdBQXVDLENBQUM7QUFDNUMsSUFBSSxhQUEyQyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxPQUFPLEVBQUM7SUFDYixRQUFRLENBQUMsY0FBYyxFQUFDO1FBQ3BCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBQztZQUNqQyxXQUFXLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsRUFBQyxRQUFRLEVBQUMsY0FBYyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ25GLFdBQVcsR0FBRyxJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBQyx1QkFBdUIsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUM1RixXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLHdDQUF3QyxFQUFDLFVBQVMsSUFBSTtZQUNyRCxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7aUJBQzdCLElBQUksQ0FBQyxVQUFTLHVCQUFxRDtnQkFDaEUsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzVELGFBQWEsR0FBRyx1QkFBdUIsQ0FBQTtnQkFDdkMsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLHFDQUFxQyxFQUFDLFVBQVMsSUFBSTtZQUNsRCxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDO2lCQUMxQyxJQUFJLENBQUMsVUFBUyxjQUE0QztnQkFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDNUIsSUFBSSxFQUFFLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQTtRQUNWLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSIsImZpbGUiOiJ0ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy10ZXN0XCI7XG5pbXBvcnQgXCJzaG91bGRcIjtcbmltcG9ydCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG4vL3NldCB1cCBlbnZpcm9ubWVudFxucHJvY2Vzcy5lbnYuQ0lfQlVJTERfUkVQTyA9IFwiaHR0cHM6Ly95eXl5eXk6eHh4eHh4eHhAZ2l0bGFiLmNvbS9teWdyb3VwL215cmVwby5naXRcIjtcbnByb2Nlc3MuY3dkID0gKCkgPT4ge1xuICAgIHJldHVybiBwYXRoLmpvaW4oX19kaXJuYW1lLFwiYXNzZXRzL1wiKTtcbn07XG5cbi8vcmVxdWlyZSBOUE1DSSBmaWxlc1xuaW1wb3J0IE5wbWNpQnVpbGREb2NrZXIgPSByZXF1aXJlKFwiLi4vZGlzdC9ucG1jaS5idWlsZC5kb2NrZXJcIik7XG5cblxubGV0IGRvY2tlcmZpbGUxOk5wbWNpQnVpbGREb2NrZXIuRG9ja2VyZmlsZTtcbmxldCBkb2NrZXJmaWxlMjpOcG1jaUJ1aWxkRG9ja2VyLkRvY2tlcmZpbGU7XG5sZXQgc29ydGFibGVBcnJheTpOcG1jaUJ1aWxkRG9ja2VyLkRvY2tlcmZpbGVbXTtcblxuZGVzY3JpYmUoXCJOUE1DSVwiLGZ1bmN0aW9uKCl7XG4gICAgZGVzY3JpYmUoXCJidWlsZC5kb2NrZXJcIixmdW5jdGlvbigpe1xuICAgICAgICBpdChcInNob3VsZCByZXR1cm4gdmFsaWQgRG9ja2VyZmlsZXNcIixmdW5jdGlvbigpe1xuICAgICAgICAgICAgZG9ja2VyZmlsZTEgPSBuZXcgTnBtY2lCdWlsZERvY2tlci5Eb2NrZXJmaWxlKHtmaWxlUGF0aDpcIi4vRG9ja2VyZmlsZVwiLHJlYWQ6dHJ1ZX0pO1xuICAgICAgICAgICAgZG9ja2VyZmlsZTIgPSBuZXcgTnBtY2lCdWlsZERvY2tlci5Eb2NrZXJmaWxlKHtmaWxlUGF0aDpcIi4vRG9ja2VyZmlsZV9zb21ldGFnMVwiLHJlYWQ6dHJ1ZX0pO1xuICAgICAgICAgICAgZG9ja2VyZmlsZTEudmVyc2lvbi5zaG91bGQuZXF1YWwoXCJsYXRlc3RcIik7XG4gICAgICAgICAgICBkb2NrZXJmaWxlMi52ZXJzaW9uLnNob3VsZC5lcXVhbChcInNvbWV0YWcxXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgaXQoXCJzaG91bGQgcmVhZCBhIGRpcmVjdG9yeSBvZiBEb2NrZXJmaWxlc1wiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgTnBtY2lCdWlsZERvY2tlci5yZWFkRG9ja2VyZmlsZXMoKVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlYWREb2NrZXJmaWxlc0FycmF5QXJnOk5wbWNpQnVpbGREb2NrZXIuRG9ja2VyZmlsZVtdKXtcbiAgICAgICAgICAgICAgICAgICAgcmVhZERvY2tlcmZpbGVzQXJyYXlBcmdbMV0udmVyc2lvbi5zaG91bGQuZXF1YWwoXCJzb21ldGFnMVwiKTtcbiAgICAgICAgICAgICAgICAgICAgc29ydGFibGVBcnJheSA9IHJlYWREb2NrZXJmaWxlc0FycmF5QXJnXG4gICAgICAgICAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSlcbiAgICAgICAgaXQoXCJzaG91bGQgc29ydCBhbiBhcnJheSBvZiBEb2NrZXJmaWxlc1wiLGZ1bmN0aW9uKGRvbmUpe1xuICAgICAgICAgICAgTnBtY2lCdWlsZERvY2tlci5zb3J0RG9ja2VyZmlsZXMoc29ydGFibGVBcnJheSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihzb3J0ZWRBcnJheUFyZzpOcG1jaUJ1aWxkRG9ja2VyLkRvY2tlcmZpbGVbXSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNvcnRlZEFycmF5QXJnKTtcbiAgICAgICAgICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn0pIl19
