"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
exports.cwd = process.cwd();
exports.NpmciPackageRoot = plugins.path.join(__dirname, "../");
exports.NpmciPackageConfig = plugins.path.join(exports.NpmciPackageRoot, "./config.json");
exports.NpmciProjectDir = exports.cwd;
exports.NpmciTestDir = plugins.path.join(exports.cwd, "./test");
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5wYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMEJBQXdCO0FBQ3hCLDJDQUEyQztBQUVoQyxRQUFBLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFcEIsUUFBQSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUM7QUFDdEQsUUFBQSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBZ0IsRUFBQyxlQUFlLENBQUMsQ0FBQztBQUN6RSxRQUFBLGVBQWUsR0FBRyxXQUFHLENBQUM7QUFDdEIsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFDIn0=