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
        case 'docker':
            return yield publishDocker(argvArg);
        case 'npm':
            return yield publishNpm(argvArg);
        default:
            plugins.beautylog.info('no publish target specified, thus defaulting to npm...');
            return yield publishNpm(argvArg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHVibGlzaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLDhDQUFvQztBQUdwQywyQ0FBMEM7QUFXMUM7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTyxPQUFZO0lBQ3RDLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDaEMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN0QixLQUFLLFFBQVE7WUFDWCxNQUFNLENBQUMsTUFBTSxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckMsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2xDO1lBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQTtZQUNoRixNQUFNLENBQUMsTUFBTSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDcEMsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLFVBQVUsR0FBRyxDQUFPLE9BQU87SUFDN0IsSUFBSSxVQUFVLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2xELE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQixNQUFNLGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDekIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksYUFBYSxHQUFHLENBQU8sT0FBTztJQUNoQyxJQUFJLFNBQVMsR0FBRyxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDaEQsTUFBTSxDQUFDLE1BQU0sU0FBUyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7U0FDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQztTQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztTQUMvQixJQUFJLENBQUMsZUFBZTtRQUNuQixNQUFNLENBQUMsZUFBZSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBLENBQUEifQ==