"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const buildDocker = require("./npmci.build.docker");
/**
 * builds for a specific service
 */
exports.build = function (commandArg) {
    switch (commandArg) {
        case 'docker':
            return buildDocker.build();
        default:
            plugins.beautylog.log('build target ' + commandArg + ' not recognised!');
    }
    ;
    return;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBQ3ZCLDJDQUEwQztBQUcxQyxvREFBbUQ7QUFPbkQ7O0dBRUc7QUFDUSxRQUFBLEtBQUssR0FBRyxVQUFTLFVBQVU7SUFDbEMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUNqQixLQUFLLFFBQVE7WUFDVCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzlCO1lBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFBO0lBQ2hGLENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxDQUFBO0FBQ1YsQ0FBQyxDQUFBIn0=