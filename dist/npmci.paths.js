"use strict";
const plugins = require("./npmci.plugins");
exports.cwd = process.cwd();
exports.NpmciPackageRoot = plugins.path.join(__dirname, '../');
exports.NpmciPackageConfig = plugins.path.join(exports.NpmciPackageRoot, './config.json');
exports.NpmciProjectDir = exports.cwd;
exports.NpmciTestDir = plugins.path.join(exports.cwd, './test');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5wYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTBDO0FBRS9CLFFBQUEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUVuQixRQUFBLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQTtBQUNyRCxRQUFBLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUFnQixFQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3hFLFFBQUEsZUFBZSxHQUFHLFdBQUcsQ0FBQTtBQUNyQixRQUFBLFlBQVksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFHLEVBQUMsUUFBUSxDQUFDLENBQUEifQ==