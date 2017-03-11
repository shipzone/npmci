"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
exports.getConfig = () => __awaiter(this, void 0, void 0, function* () {
    let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let defaultConfig = {
        globalNpmTools: []
    };
    let npmciConfig = npmciNpmextra.dataFor('npmci', defaultConfig);
    return npmciConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBTTNCLFFBQUEsU0FBUyxHQUFHO0lBQ3JCLElBQUksYUFBYSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVELElBQUksYUFBYSxHQUFrQjtRQUNqQyxjQUFjLEVBQUUsRUFBRTtLQUNuQixDQUFBO0lBQ0QsSUFBSSxXQUFXLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBZ0IsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFBO0lBQzlFLE1BQU0sQ0FBQyxXQUFXLENBQUE7QUFDcEIsQ0FBQyxDQUFBLENBQUEifQ==