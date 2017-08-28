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
const npmci_env_1 = require("./npmci.env");
const npmextra_1 = require("npmextra");
// instantiate a kvStorage for the current directory
exports.kvStorage = new npmextra_1.KeyValueStore('custom', `${npmci_env_1.repo.user}_${npmci_env_1.repo.repo}`);
exports.getConfig = () => __awaiter(this, void 0, void 0, function* () {
    let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let defaultConfig = {
        npmGlobalTools: [],
        dockerRegistryRepoMap: {}
    };
    let npmciConfig = npmciNpmextra.dataFor('npmci', defaultConfig);
    return npmciConfig;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBRXRDLDJDQUFrQztBQUVsQyx1Q0FBd0M7QUFPeEMsb0RBQW9EO0FBQ3pDLFFBQUEsU0FBUyxHQUFHLElBQUksd0JBQWEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxnQkFBSSxDQUFDLElBQUksSUFBSSxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFFcEUsUUFBQSxTQUFTLEdBQUc7SUFDckIsSUFBSSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDNUQsSUFBSSxhQUFhLEdBQWtCO1FBQ2pDLGNBQWMsRUFBRSxFQUFFO1FBQ2xCLHFCQUFxQixFQUFFLEVBQUU7S0FDMUIsQ0FBQTtJQUNELElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQWdCLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM5RSxNQUFNLENBQUMsV0FBVyxDQUFBO0FBQ3BCLENBQUMsQ0FBQSxDQUFBIn0=