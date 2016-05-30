"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmrcPrefix = "//registry.npmjs.org/:_authToken=";
var npmToken = process.env.NPMCITOKEN;
var npmrcFileString = npmrcPrefix + npmToken;
exports.publish = function () {
    var done = plugins.q.defer();
    plugins.smartfile.memory.toFs(npmrcFileString, { fileName: ".npmrc", filePath: "/root/" });
    plugins.shelljs.exec("npm publish");
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRTNDLElBQUksV0FBVyxHQUFVLG1DQUFtQyxDQUFDO0FBQzdELElBQUksUUFBUSxHQUFVLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBQzdDLElBQUksZUFBZSxHQUFHLFdBQVcsR0FBRyxRQUFRLENBQUM7QUFHbEMsZUFBTyxHQUFHO0lBQ2pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBQyxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDckYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im5wbWNpLnB1Ymxpc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcclxuXHJcbmxldCBucG1yY1ByZWZpeDpzdHJpbmcgPSBcIi8vcmVnaXN0cnkubnBtanMub3JnLzpfYXV0aFRva2VuPVwiO1xyXG5sZXQgbnBtVG9rZW46c3RyaW5nID0gcHJvY2Vzcy5lbnYuTlBNQ0lUT0tFTjtcclxubGV0IG5wbXJjRmlsZVN0cmluZyA9IG5wbXJjUHJlZml4ICsgbnBtVG9rZW47XHJcblxyXG5cclxuZXhwb3J0IGxldCBwdWJsaXNoID0gKCkgPT4ge1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIFxyXG4gICAgcGx1Z2lucy5zbWFydGZpbGUubWVtb3J5LnRvRnMobnBtcmNGaWxlU3RyaW5nLHtmaWxlTmFtZTpcIi5ucG1yY1wiLGZpbGVQYXRoOlwiL3Jvb3QvXCJ9KTtcclxuICAgIHBsdWdpbnMuc2hlbGxqcy5leGVjKFwibnBtIHB1Ymxpc2hcIik7XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59OyJdfQ==
