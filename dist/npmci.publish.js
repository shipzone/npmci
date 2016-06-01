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
    });
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUcsVUFBQyxVQUF5QjtJQUF6QiwwQkFBeUIsR0FBekIsa0JBQXlCO0lBQzNDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUNoQixLQUFLLEtBQUs7WUFDTixVQUFVLEVBQUU7aUJBQ1AsSUFBSSxDQUFDO2dCQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLEtBQUssQ0FBQztRQUNWLEtBQUssUUFBUTtZQUNULGFBQWEsRUFBRTtpQkFDVixJQUFJLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLElBQUksVUFBVSxHQUFJO0lBQ2QsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLEtBQUssQ0FBQztTQUNULElBQUksQ0FBQztRQUNGLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDdkIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxhQUFhLEdBQUc7SUFDaEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLFFBQVEsQ0FBQztTQUNaLElBQUksQ0FBQztRQUNGLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUMiLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcInR5cGluZ3MtZ2xvYmFsXCI7XHJcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vbnBtY2kucGx1Z2luc1wiO1xyXG5pbXBvcnQge3ByZXBhcmV9IGZyb20gXCIuL25wbWNpLnByZXBhcmVcIjtcclxuaW1wb3J0IHtiYXNofSBmcm9tIFwiLi9ucG1jaS5iYXNoXCI7XHJcblxyXG5leHBvcnQgbGV0IHB1Ymxpc2ggPSAoc2VydmljZUFyZzpzdHJpbmcgPSBcIm5wbVwiKSA9PiB7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgc3dpdGNoIChzZXJ2aWNlQXJnKXtcclxuICAgICAgICBjYXNlIFwibnBtXCI6IFxyXG4gICAgICAgICAgICBwdWJsaXNoTnBtKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBcImRvY2tlclwiOlxyXG4gICAgICAgICAgICBwdWJsaXNoRG9ja2VyKClcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn07XHJcblxyXG5sZXQgcHVibGlzaE5wbSAgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHByZXBhcmUoXCJucG1cIilcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBiYXNoKFwibnBtIHB1Ymxpc2hcIik7XHJcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLm9rKFwiRG9uZSFcIikgO1xyXG4gICAgICAgICAgICBkb25lLnJlc29sdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxufVxyXG5cclxubGV0IHB1Ymxpc2hEb2NrZXIgPSBmdW5jdGlvbigpe1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHByZXBhcmUoXCJkb2NrZXJcIilcclxuICAgICAgICAudGhlbihmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBiYXNoKFwiZG9ja2VyIHB1c2hcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59OyJdfQ==
