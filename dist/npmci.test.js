"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_install_1 = require("./npmci.install");
exports.test = function (versionArg) {
    var done = plugins.q.defer();
    npmci_install_1.install(versionArg)
        .then(function () {
        plugins.beautylog.info("now starting tests:");
        plugins.shelljs.exec("npm test");
        plugins.beautylog.success("test finished");
        done.resolve();
    });
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzdCLFlBQUksR0FBRyxVQUFDLFVBQVU7SUFDekIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3Qix1QkFBTyxDQUFDLFVBQVUsQ0FBQztTQUNkLElBQUksQ0FBQztRQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDakMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFBO0lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIiwiZmlsZSI6Im5wbWNpLnRlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcclxuaW1wb3J0IHtpbnN0YWxsfSBmcm9tIFwiLi9ucG1jaS5pbnN0YWxsXCI7XHJcbmV4cG9ydCBsZXQgdGVzdCA9ICh2ZXJzaW9uQXJnKSA9PiB7XHJcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xyXG4gICAgaW5zdGFsbCh2ZXJzaW9uQXJnKVxyXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJub3cgc3RhcnRpbmcgdGVzdHM6XCIpO1xyXG4gICAgICAgICAgICBwbHVnaW5zLnNoZWxsanMuZXhlYyhcIm5wbSB0ZXN0XCIpO1xyXG4gICAgICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5zdWNjZXNzKFwidGVzdCBmaW5pc2hlZFwiKTtcclxuICAgICAgICAgICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSlcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn0iXX0=
