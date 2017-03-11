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
 * tries to pubish current cwd to Docker registry
 */
let publishDocker = () => __awaiter(this, void 0, void 0, function* () {
    return yield NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(dockerfileArray => {
        return dockerfileArray;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kucHVibGlzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnB1Ymxpc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyxtREFBeUM7QUFDekMsNkNBQW1DO0FBRW5DLHlEQUF3RDtBQU94RDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLGdCQUE2QixLQUFLO0lBQzVELE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDdEIsS0FBSyxLQUFLO1lBQ1IsTUFBTSxDQUFDLE1BQU0sVUFBVSxFQUFFLENBQUE7UUFDM0IsS0FBSyxRQUFRO1lBQ1gsTUFBTSxDQUFDLE1BQU0sYUFBYSxFQUFFLENBQUE7SUFDaEMsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLFVBQVUsR0FBRztJQUNmLE1BQU0sdUJBQU8sQ0FBQyxLQUFLLENBQUM7U0FDakIsSUFBSSxDQUFDOztZQUNKLE1BQU0saUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtZQUN6QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMvQixDQUFDO0tBQUEsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBLENBQUE7QUFFRDs7R0FFRztBQUNILElBQUksYUFBYSxHQUFHO0lBQ2xCLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtTQUM1QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7U0FDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztTQUN0QyxJQUFJLENBQUMsZUFBZTtRQUNuQixNQUFNLENBQUMsZUFBZSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBLENBQUEifQ==