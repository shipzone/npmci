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
exports.publish = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let whatToPublish = argvArg._[1];
    switch (whatToPublish) {
        case 'npm':
            return yield publishNpm(argvArg);
        case 'docker':
            return yield publishDocker(argvArg);
    }
});
/**
 * tries to publish current cwd to NPM registry
 */
let publishNpm = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPrepare = yield npmciMods.modPrepare.load();
    yield modPrepare.prepare('npm');
    yield npmci_bash_1.bash('npm publish');
    plugins.beautylog.ok('Done!');
});
/**
 * tries to publish current cwd to Docker registry
 */
let publishDocker = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    return yield modDocker.readDockerfiles(argvArg)
        .then(modDocker.pullDockerfileImages)
        .then(modDocker.pushDockerfiles)
        .then(dockerfileArray => {
        return dockerfileArray;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHVibGlzaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUdwQywyQ0FBMEM7QUFXMUM7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTyxPQUFZO0lBQ3RDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN0QixLQUFLLEtBQUs7WUFDUixNQUFNLENBQUMsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbEMsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQUcsQ0FBTyxPQUFPO0lBQzdCLElBQUksVUFBVSxHQUFHLE1BQU0sU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNsRCxNQUFNLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0IsTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBQ3pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLGFBQWEsR0FBRyxDQUFPLE9BQU87SUFDaEMsSUFBSSxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2hELE1BQU0sQ0FBQyxNQUFNLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDO1NBQzVDLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUM7U0FDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7U0FDL0IsSUFBSSxDQUFDLGVBQWU7UUFDbkIsTUFBTSxDQUFDLGVBQWUsQ0FBQTtJQUN4QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSxDQUFBIn0=