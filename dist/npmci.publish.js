"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_bash_1 = require("./npmci.bash");
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
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUd2QixlQUFPLEdBQUcsVUFBQyxVQUF5QjtJQUF6QiwwQkFBeUIsR0FBekIsa0JBQXlCO0lBQzNDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDaEIsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3hCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMvQixDQUFDO0FBQ0wsQ0FBQyxDQUFDO0FBRUYsSUFBSSxVQUFVLEdBQUk7SUFDZCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLHVCQUFPLENBQUMsS0FBSyxDQUFDO1NBQ1QsSUFBSSxDQUFDO1FBQ0YsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBRTtRQUMvQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN2QixDQUFDLENBQUE7QUFFRCxJQUFJLGFBQWEsR0FBRztJQUNoQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyIsImZpbGUiOiJucG1jaS5wdWJsaXNoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vbnBtY2kucGx1Z2luc1wiO1xuaW1wb3J0IHtwcmVwYXJlfSBmcm9tIFwiLi9ucG1jaS5wcmVwYXJlXCI7XG5pbXBvcnQge2Jhc2h9IGZyb20gXCIuL25wbWNpLmJhc2hcIjtcbmltcG9ydCAqIGFzIGVudiBmcm9tIFwiLi9ucG1jaS5lbnZcIjtcblxuZXhwb3J0IGxldCBwdWJsaXNoID0gKHNlcnZpY2VBcmc6c3RyaW5nID0gXCJucG1cIikgPT4ge1xuICAgIHN3aXRjaCAoc2VydmljZUFyZyl7XG4gICAgICAgIGNhc2UgXCJucG1cIjogXG4gICAgICAgICAgICByZXR1cm4gcHVibGlzaE5wbSgpO1xuICAgICAgICBjYXNlIFwiZG9ja2VyXCI6XG4gICAgICAgICAgICByZXR1cm4gcHVibGlzaERvY2tlcigpO1xuICAgIH1cbn07XG5cbmxldCBwdWJsaXNoTnBtICA9IGZ1bmN0aW9uKCl7XG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcbiAgICBwcmVwYXJlKFwibnBtXCIpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBiYXNoKFwibnBtIHB1Ymxpc2hcIik7XG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5vayhcIkRvbmUhXCIpIDtcbiAgICAgICAgICAgIGRvbmUucmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgIHJldHVybiBkb25lLnByb21pc2U7XG59XG5cbmxldCBwdWJsaXNoRG9ja2VyID0gZnVuY3Rpb24oKXtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59OyJdfQ==
