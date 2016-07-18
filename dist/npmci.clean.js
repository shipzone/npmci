"use strict";
require("typings-global");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xlYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5jbGVhbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLE1BQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDM0MsTUFBWSxLQUFLLFdBQU0sZUFLdkIsQ0FBQyxDQUxxQztBQUV0Qzs7R0FFRztBQUNRLGFBQUssR0FBRztJQUNmLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzFELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQyJ9