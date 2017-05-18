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
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_bash_1 = require("./npmci.bash");
const NpmciBuildDocker = require("./npmci.build.docker");
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
    yield npmci_prepare_1.prepare('npm')
        .then(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield npmci_bash_1.bash('npm publish');
            plugins.beautylog.ok('Done!');
        });
    });
});
/**
 * tries to publish current cwd to Docker registry
 */
let publishDocker = () => __awaiter(this, void 0, void 0, function* () {
    return yield NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(dockerfileArray => {
        return dockerfileArray;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfcHVibGlzaC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsMkNBQTBDO0FBQzFDLG1EQUF5QztBQUN6Qyw2Q0FBbUM7QUFFbkMseURBQXdEO0FBT3hEOzs7R0FHRztBQUNRLFFBQUEsT0FBTyxHQUFHLENBQU8sZ0JBQTZCLEtBQUs7SUFDNUQsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUN0QixLQUFLLEtBQUs7WUFDUixNQUFNLENBQUMsTUFBTSxVQUFVLEVBQUUsQ0FBQTtRQUMzQixLQUFLLFFBQVE7WUFDWCxNQUFNLENBQUMsTUFBTSxhQUFhLEVBQUUsQ0FBQTtJQUNoQyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksVUFBVSxHQUFHO0lBQ2YsTUFBTSx1QkFBTyxDQUFDLEtBQUssQ0FBQztTQUNqQixJQUFJLENBQUM7O1lBQ0osTUFBTSxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ3pCLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQy9CLENBQUM7S0FBQSxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsSUFBSSxhQUFhLEdBQUc7SUFDbEIsTUFBTSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1NBQzVDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztTQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1NBQ3RDLElBQUksQ0FBQyxlQUFlO1FBQ25CLE1BQU0sQ0FBQyxlQUFlLENBQUE7SUFDeEIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEsQ0FBQSJ9