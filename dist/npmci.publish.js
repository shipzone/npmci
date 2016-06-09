"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_bash_1 = require("./npmci.bash");
var NpmciBuildDocker = require("./npmci.build.docker");
exports.publish = function (serviceArg) {
    if (serviceArg === void 0) { serviceArg = "npm"; }
    switch (serviceArg) {
        case "npm":
            return publishNpm();
        case "docker":
            return publishDocker();
    }
};
var publishNpm = function () {
    var done = plugins.q.defer();
    npmci_prepare_1.prepare("npm")
        .then(function () {
        npmci_bash_1.bash("npm publish");
        plugins.beautylog.ok("Done!");
        done.resolve();
    });
    return done.promise;
};
var publishDocker = function () {
    var done = plugins.q.defer();
    NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(done.resolve);
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUVsQyxJQUFZLGdCQUFnQixXQUFNLHNCQUVsQyxDQUFDLENBRnVEO0FBRTdDLGVBQU8sR0FBRyxVQUFDLFVBQXlCO0lBQXpCLDBCQUF5QixHQUF6QixrQkFBeUI7SUFDM0MsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUNoQixLQUFLLEtBQUs7WUFDTixNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDeEIsS0FBSyxRQUFRO1lBQ1QsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQy9CLENBQUM7QUFDTCxDQUFDLENBQUM7QUFFRixJQUFJLFVBQVUsR0FBSTtJQUNkLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsdUJBQU8sQ0FBQyxLQUFLLENBQUM7U0FDVCxJQUFJLENBQUM7UUFDRixpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFFO1FBQy9CLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQTtBQUVELElBQUksYUFBYSxHQUFHO0lBQ2hCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDekIsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1NBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztTQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1NBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im5wbWNpLnB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5pbXBvcnQge3ByZXBhcmV9IGZyb20gXCIuL25wbWNpLnByZXBhcmVcIjtcbmltcG9ydCB7YmFzaH0gZnJvbSBcIi4vbnBtY2kuYmFzaFwiO1xuaW1wb3J0ICogYXMgTnBtY2lFbnYgZnJvbSBcIi4vbnBtY2kuZW52XCI7XG5pbXBvcnQgKiBhcyBOcG1jaUJ1aWxkRG9ja2VyIGZyb20gXCIuL25wbWNpLmJ1aWxkLmRvY2tlclwiXG5cbmV4cG9ydCBsZXQgcHVibGlzaCA9IChzZXJ2aWNlQXJnOnN0cmluZyA9IFwibnBtXCIpID0+IHtcbiAgICBzd2l0Y2ggKHNlcnZpY2VBcmcpe1xuICAgICAgICBjYXNlIFwibnBtXCI6IFxuICAgICAgICAgICAgcmV0dXJuIHB1Ymxpc2hOcG0oKTtcbiAgICAgICAgY2FzZSBcImRvY2tlclwiOlxuICAgICAgICAgICAgcmV0dXJuIHB1Ymxpc2hEb2NrZXIoKTtcbiAgICB9XG59O1xuXG5sZXQgcHVibGlzaE5wbSAgPSBmdW5jdGlvbigpe1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgcHJlcGFyZShcIm5wbVwiKVxuICAgICAgICAudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgYmFzaChcIm5wbSBwdWJsaXNoXCIpO1xuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cub2soXCJEb25lIVwiKSA7XG4gICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICByZXR1cm4gZG9uZS5wcm9taXNlO1xufVxuXG5sZXQgcHVibGlzaERvY2tlciA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcbiAgICAgICAgTnBtY2lCdWlsZERvY2tlci5yZWFkRG9ja2VyZmlsZXMoKVxuICAgICAgICAudGhlbihOcG1jaUJ1aWxkRG9ja2VyLnB1bGxEb2NrZXJmaWxlSW1hZ2VzKVxuICAgICAgICAudGhlbihOcG1jaUJ1aWxkRG9ja2VyLnB1c2hEb2NrZXJmaWxlcylcbiAgICAgICAgLnRoZW4oZG9uZS5yZXNvbHZlKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTsiXX0=
