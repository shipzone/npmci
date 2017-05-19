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
const plugins = require("./mod.plugins");
const npmci_bash_1 = require("../npmci.bash");
const npmciMods = require("../npmci.mods");
/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to
 */
exports.publish = (pubServiceArg = 'npm') => __awaiter(this, void 0, void 0, function* () {
    switch (pubServiceArg) {
        case 'npm':
            return yield publishNpm();
        case 'docker':
            return yield publishDocker();
    }
});
/**
 * tries to publish current cwd to NPM registry
 */
let publishNpm = () => __awaiter(this, void 0, void 0, function* () {
    let modPrepare = yield npmciMods.modPrepare.load();
    yield modPrepare.prepare('npm');
    yield npmci_bash_1.bash('npm publish');
    plugins.beautylog.ok('Done!');
});
/**
 * tries to publish current cwd to Docker registry
 */
let publishDocker = () => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    return yield modDocker.readDockerfiles()
        .then(modDocker.pullDockerfileImages)
        .then(modDocker.pushDockerfiles)
        .then(dockerfileArray => {
        return dockerfileArray;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHVibGlzaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUdwQywyQ0FBMEM7QUFXMUM7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTyxnQkFBNkIsS0FBSztJQUM1RCxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEtBQUssS0FBSztZQUNSLE1BQU0sQ0FBQyxNQUFNLFVBQVUsRUFBRSxDQUFBO1FBQzNCLEtBQUssUUFBUTtZQUNYLE1BQU0sQ0FBQyxNQUFNLGFBQWEsRUFBRSxDQUFBO0lBQ2hDLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUc7SUFDZixJQUFJLFVBQVUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDbEQsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9CLE1BQU0saUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUN6QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxhQUFhLEdBQUc7SUFDbEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxlQUFlLEVBQUU7U0FDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztTQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztTQUMvQixJQUFJLENBQUMsZUFBZTtRQUNuQixNQUFNLENBQUMsZUFBZSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBLENBQUEifQ==