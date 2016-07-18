"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const buildDocker = require("./npmci.build.docker");
exports.build = function (commandArg) {
    switch (commandArg) {
        case "docker":
            return buildDocker.build();
        default:
            plugins.beautylog.log("build target " + commandArg + " not recognised!");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLE1BQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFHM0MsTUFBWSxXQUFXLFdBQU0sc0JBRTdCLENBQUMsQ0FGa0Q7QUFFeEMsYUFBSyxHQUFHLFVBQVMsVUFBVTtJQUNsQyxNQUFNLENBQUEsQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1FBQ2YsS0FBSyxRQUFRO1lBQ1QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQjtZQUNJLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsR0FBRyxVQUFVLEdBQUcsa0JBQWtCLENBQUMsQ0FBQztJQUNqRixDQUFDO0FBQ0wsQ0FBQyxDQUFBIn0=