"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_bash_1 = require("./npmci.bash");
exports.publish = function (serviceArg) {
    if (serviceArg === void 0) { serviceArg = "npm"; }
    var done = plugins.q.defer();
    switch (serviceArg) {
        case "npm":
            publishNpm()
                .then(function () {
                done.resolve();
            });
            break;
        case "docker":
            publishDocker()
                .then(function () {
                done.resolve();
            });
    }
    return done.promise;
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
    npmci_prepare_1.prepare("docker")
        .then(function () {
        npmci_bash_1.bash("docker push");
        done.resolve();
    });
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUcsVUFBQyxVQUF5QjtJQUF6QiwwQkFBeUIsR0FBekIsa0JBQXlCO0lBQzNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUNoQixLQUFLLEtBQUs7WUFDTixVQUFVLEVBQUU7aUJBQ1AsSUFBSSxDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLEtBQUssQ0FBQztRQUNWLEtBQUssUUFBUTtZQUNULGFBQWEsRUFBRTtpQkFDVixJQUFJLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLElBQUksVUFBVSxHQUFJO0lBQ2QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLEtBQUssQ0FBQztTQUNULElBQUksQ0FBQztRQUNGLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdkIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxhQUFhLEdBQUc7SUFDaEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLFFBQVEsQ0FBQztTQUNaLElBQUksQ0FBQztRQUNGLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im5wbWNpLnB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcclxuaW1wb3J0IHtwcmVwYXJlfSBmcm9tIFwiLi9ucG1jaS5wcmVwYXJlXCI7XHJcbmltcG9ydCB7YmFzaH0gZnJvbSBcIi4vbnBtY2kuYmFzaFwiO1xyXG5cclxuZXhwb3J0IGxldCBwdWJsaXNoID0gKHNlcnZpY2VBcmc6c3RyaW5nID0gXCJucG1cIikgPT4ge1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHN3aXRjaCAoc2VydmljZUFyZyl7XHJcbiAgICAgICAgY2FzZSBcIm5wbVwiOiBcclxuICAgICAgICAgICAgcHVibGlzaE5wbSgpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgXCJkb2NrZXJcIjpcclxuICAgICAgICAgICAgcHVibGlzaERvY2tlcigpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59O1xyXG5cclxubGV0IHB1Ymxpc2hOcG0gID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICBwcmVwYXJlKFwibnBtXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgYmFzaChcIm5wbSBwdWJsaXNoXCIpO1xyXG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5vayhcIkRvbmUhXCIpIDtcclxuICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn1cclxuXHJcbmxldCBwdWJsaXNoRG9ja2VyID0gZnVuY3Rpb24oKXtcclxuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICBwcmVwYXJlKFwiZG9ja2VyXCIpXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgYmFzaChcImRvY2tlciBwdXNoXCIpO1xyXG4gICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn07Il19
