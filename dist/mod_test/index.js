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
        yield npmci_bash_1.bash('yarn install');
    }
    else {
        yield npmci_bash_1.bash('npm install');
    }
});
let npmTest = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now starting tests:');
    yield npmci_bash_1.bash('npm test');
});
let testDocker = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    return yield modDocker.readDockerfiles(argvArg)
        .then(modDocker.pullDockerfileImages)
        .then(modDocker.testDockerfiles);
});
/**
 * the main test function
 * @param versionArg
 */
exports.test = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let whatToTest = argvArg._[1];
    if (whatToTest === 'docker') {
        yield testDocker(argvArg);
    }
    else {
        let modInstall = yield npmciMods.modInstall.load();
        yield modInstall.install(whatToTest)
            .then(npmDependencies)
            .then(npmTest);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfdGVzdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFtRDtBQUVuRCwyQ0FBMEM7QUFLMUMsSUFBSSxlQUFlLEdBQUc7SUFDcEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQTtJQUN0RCxFQUFFLENBQUMsQ0FBQyxNQUFNLDBCQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLGlCQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksT0FBTyxHQUFHO0lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM3QyxNQUFNLGlCQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDeEIsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBRyxDQUFPLE9BQU87SUFDN0IsSUFBSSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1NBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7U0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEsQ0FBQTtBQUVEOzs7R0FHRztBQUNRLFFBQUEsSUFBSSxHQUFHLENBQU8sT0FBTztJQUM5QixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdCLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksVUFBVSxHQUFHLE1BQU0sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsRCxNQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO2FBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQSJ9