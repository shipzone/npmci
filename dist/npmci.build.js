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
    ;
    return;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXdCO0FBQ3hCLDJDQUEyQztBQUczQyxvREFBbUQ7QUFPbkQ7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRyxVQUFTLFVBQVU7SUFDbEMsTUFBTSxDQUFBLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztRQUNmLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0I7WUFDSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsVUFBVSxHQUFHLGtCQUFrQixDQUFDLENBQUM7SUFDakYsQ0FBQztJQUFBLENBQUM7SUFDRixNQUFNLENBQUM7QUFDWCxDQUFDLENBQUEifQ==