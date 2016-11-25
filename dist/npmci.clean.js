"use strict";
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
/**
 * cleans npmci config files
 */
exports.clean = () => {
    let done = plugins.q.defer();
    plugins.smartfile.fs.removeSync(paths.NpmciPackageConfig);
    done.resolve();
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5jbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUV0Qzs7R0FFRztBQUNRLFFBQUEsS0FBSyxHQUFHO0lBQ2YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUE7SUFDekQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBIn0=