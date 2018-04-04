"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
exports.cwd = process.cwd();
exports.NpmciPackageRoot = plugins.path.join(__dirname, '../');
exports.NpmciPackageConfig = plugins.path.join(exports.NpmciPackageRoot, './config.json');
exports.NpmciProjectDir = exports.cwd;
exports.NpmciTestDir = plugins.path.join(exports.cwd, './test');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucGF0aHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9ucG1jaS5wYXRocy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEyQztBQUVoQyxRQUFBLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFcEIsUUFBQSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDdkQsUUFBQSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyx3QkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQztBQUMxRSxRQUFBLGVBQWUsR0FBRyxXQUFHLENBQUM7QUFDdEIsUUFBQSxZQUFZLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDIn0=