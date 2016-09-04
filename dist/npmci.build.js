"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const buildDocker = require("./npmci.build.docker");
/**
 * builds for a specific service
 */
exports.build = function (commandArg) {
    switch (commandArg) {
        case "docker":
            return buildDocker.build();
        default:
            plugins.beautylog.log("build target " + commandArg + " not recognised!");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLE1BQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFHM0MsTUFBWSxXQUFXLFdBQU0sc0JBSzdCLENBQUMsQ0FMa0Q7QUFPbkQ7O0dBRUc7QUFDUSxhQUFLLEdBQUcsVUFBUyxVQUFVO0lBQ2xDLE1BQU0sQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDZixLQUFLLFFBQVE7WUFDVCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CO1lBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDTCxDQUFDLENBQUEifQ==