"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5idWlsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTBDO0FBRzFDLG9EQUFtRDtBQU9uRDs7R0FFRztBQUNRLFFBQUEsS0FBSyxHQUFHLFVBQVMsVUFBVTtJQUNsQyxNQUFNLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDOUI7WUFDSSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsVUFBVSxHQUFHLGtCQUFrQixDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUFBLENBQUM7SUFDRixNQUFNLENBQUE7QUFDVixDQUFDLENBQUEifQ==