"use strict";
const q = require("q");
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
exports.getConfig = () => {
    let done = q.defer();
    let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let defaultConfig = {
        globalNpmTools: []
    };
    let npmciConfig = npmciNpmextra.dataFor('npmci', defaultConfig);
    done.resolve(npmciConfig);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBc0I7QUFFdEIsMkNBQTBDO0FBQzFDLHVDQUFzQztBQU0zQixRQUFBLFNBQVMsR0FBRztJQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFpQixDQUFBO0lBQ25DLElBQUksYUFBYSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVELElBQUksYUFBYSxHQUFrQjtRQUMvQixjQUFjLEVBQUUsRUFBRTtLQUNyQixDQUFBO0lBQ0QsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBZ0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzlFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBIn0=