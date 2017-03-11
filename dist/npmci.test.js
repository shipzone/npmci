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
const npmci_bash_1 = require("./npmci.bash");
const npmci_install_1 = require("./npmci.install");
const NpmciBuildDocker = require("./npmci.build.docker");
exports.test = (versionArg) => __awaiter(this, void 0, void 0, function* () {
    if (versionArg === 'docker') {
        yield testDocker();
    }
    else {
        yield npmci_install_1.install(versionArg)
            .then(npmDependencies)
            .then(npmTest);
    }
});
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
let testDocker = () => __awaiter(this, void 0, void 0, function* () {
    return yield NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.testDockerfiles);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQyw2Q0FBa0Q7QUFDbEQsbURBQXlDO0FBRXpDLHlEQUF3RDtBQUU3QyxRQUFBLElBQUksR0FBRyxDQUFPLFVBQVU7SUFDakMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsTUFBTSxVQUFVLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLHVCQUFPLENBQUMsVUFBVSxDQUFDO2FBQ3RCLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2xCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVELElBQUksZUFBZSxHQUFHO0lBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDdEQsRUFBRSxDQUFDLENBQUMsTUFBTSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxpQkFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQzVCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0saUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUMzQixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFRCxJQUFJLE9BQU8sR0FBRztJQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDN0MsTUFBTSxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQ3hCLENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxVQUFVLEdBQUc7SUFDZixNQUFNLENBQUMsTUFBTSxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7U0FDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1NBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUMzQyxDQUFDLENBQUEsQ0FBQSJ9