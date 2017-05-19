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
let npmDependencies = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now installing dependencies:');
    if (yield npmci_bash_1.yarnAvailable.promise) {
        yield npmci_bash_1.bash('yarn upgrade');
    }
    else {
        yield npmci_bash_1.bash('npm install');
    }
});
let npmTest = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now starting tests:');
    yield npmci_bash_1.bash('npm test');
});
let testDocker = () => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    return yield modDocker.readDockerfiles()
        .then(modDocker.pullDockerfileImages)
        .then(modDocker.testDockerfiles);
});
/**
 * the main test function
 * @param versionArg
 */
exports.test = (versionArg) => __awaiter(this, void 0, void 0, function* () {
    if (versionArg === 'docker') {
        yield testDocker();
    }
    else {
        let modInstall = yield npmciMods.modInstall.load();
        yield modInstall.install(versionArg)
            .then(npmDependencies)
            .then(npmTest);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfdGVzdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFtRDtBQUVuRCwyQ0FBMEM7QUFLMUMsSUFBSSxlQUFlLEdBQUc7SUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUN0RCxFQUFFLENBQUMsQ0FBQyxNQUFNLDBCQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLGlCQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksT0FBTyxHQUFHO0lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM3QyxNQUFNLGlCQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDeEIsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBRztJQUNmLElBQUksU0FBUyxHQUFHLE1BQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNoRCxNQUFNLENBQUMsTUFBTSxTQUFTLENBQUMsZUFBZSxFQUFFO1NBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7U0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsSUFBSSxHQUFHLENBQU8sVUFBVTtJQUNqQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QixNQUFNLFVBQVUsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksVUFBVSxHQUFHLE1BQU0sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsRCxNQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQSJ9