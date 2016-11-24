"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
exports.cwd = process.cwd();
exports.NpmciPackageRoot = plugins.path.join(__dirname, '../');
exports.NpmciPackageConfig = plugins.path.join(exports.NpmciPackageRoot, './config.json');
exports.NpmciProjectDir = exports.cwd;
exports.NpmciTestDir = plugins.path.join(exports.cwd, './test');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5wYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXVCO0FBQ3ZCLDJDQUEwQztBQUUvQixRQUFBLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUE7QUFFbkIsUUFBQSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUE7QUFDckQsUUFBQSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBZ0IsRUFBQyxlQUFlLENBQUMsQ0FBQTtBQUN4RSxRQUFBLGVBQWUsR0FBRyxXQUFHLENBQUE7QUFDckIsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFBIn0=