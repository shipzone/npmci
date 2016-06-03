"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_bash_1 = require("./npmci.bash");
var env = require("./npmci.env");
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
    npmci_prepare_1.prepare("docker")
        .then(function () {
        npmci_bash_1.bash;
        npmci_bash_1.bash("docker push " + env.dockerTag());
        done.resolve();
    });
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUNsQyxJQUFZLEdBQUcsV0FBTSxhQUFhLENBQUMsQ0FBQTtBQUV4QixlQUFPLEdBQUcsVUFBQyxVQUF5QjtJQUF6QiwwQkFBeUIsR0FBekIsa0JBQXlCO0lBQzNDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDaEIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUk7SUFDZCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFPLENBQUMsS0FBSyxDQUFDO1NBQ1QsSUFBSSxDQUFDO1FBQ0YsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUE7QUFFRCxJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFPLENBQUMsUUFBUSxDQUFDO1NBQ1osSUFBSSxDQUFDO1FBQ0YsaUJBQUksQ0FBQTtRQUNKLGlCQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyIsImZpbGUiOiJucG1jaS5wdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XHJcbmltcG9ydCB7cHJlcGFyZX0gZnJvbSBcIi4vbnBtY2kucHJlcGFyZVwiO1xyXG5pbXBvcnQge2Jhc2h9IGZyb20gXCIuL25wbWNpLmJhc2hcIjtcclxuaW1wb3J0ICogYXMgZW52IGZyb20gXCIuL25wbWNpLmVudlwiO1xyXG5cclxuZXhwb3J0IGxldCBwdWJsaXNoID0gKHNlcnZpY2VBcmc6c3RyaW5nID0gXCJucG1cIikgPT4ge1xyXG4gICAgc3dpdGNoIChzZXJ2aWNlQXJnKXtcclxuICAgICAgICBjYXNlIFwibnBtXCI6IFxyXG4gICAgICAgICAgICByZXR1cm4gcHVibGlzaE5wbSgpO1xyXG4gICAgICAgIGNhc2UgXCJkb2NrZXJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHB1Ymxpc2hEb2NrZXIoKTtcclxuICAgIH1cclxufTtcclxuXHJcbmxldCBwdWJsaXNoTnBtICA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgcHJlcGFyZShcIm5wbVwiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGJhc2goXCJucG0gcHVibGlzaFwiKTtcclxuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cub2soXCJEb25lIVwiKSA7XHJcbiAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59XHJcblxyXG5sZXQgcHVibGlzaERvY2tlciA9IGZ1bmN0aW9uKCl7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgcHJlcGFyZShcImRvY2tlclwiKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGJhc2ggXHJcbiAgICAgICAgICAgIGJhc2goXCJkb2NrZXIgcHVzaCBcIiArIGVudi5kb2NrZXJUYWcoKSk7XHJcbiAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgcmV0dXJuIGRvbmUucHJvbWlzZTtcclxufTsiXX0=
