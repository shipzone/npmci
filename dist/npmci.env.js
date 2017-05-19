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
const smartstring_1 = require("smartstring");
if (process.env.CI_REPOSITORY_URL) {
    exports.repo = new smartstring_1.GitRepo(process.env.CI_REPOSITORY_URL);
}
exports.buildStage = process.env.CI_BUILD_STAGE;
exports.setDockerRegistry = (dockerRegistryArg) => {
    exports.dockerRegistry = dockerRegistryArg;
};
exports.dockerFilesBuilt = [];
exports.dockerFiles = [];
exports.config = {
    dockerRegistry: undefined,
    dockerFilesBuilt: exports.dockerFilesBuilt,
    dockerFiles: exports.dockerFiles,
    project: undefined
};
exports.configStore = () => __awaiter(this, void 0, void 0, function* () {
    exports.config.dockerRegistry = exports.dockerRegistry;
    plugins.smartfile.memory.toFsSync(JSON.stringify(exports.config), paths.NpmciPackageConfig);
});
let configLoad = () => {
    // internal config to transfer information in between npmci shell calls
    try {
        plugins.lodash.assign(exports.config, plugins.smartfile.fs.toObjectSync(paths.NpmciPackageConfig, 'json'));
    }
    catch (err) {
        exports.configStore();
        plugins.beautylog.log('config initialized!');
    }
    // project config
    try {
        if (!exports.config.project) {
            exports.config.project = plugins.smartfile.fs.toObjectSync(paths.NpmciProjectDir, 'npmci.json');
            plugins.beautylog.ok('project config found!');
        }
    }
    catch (err) {
        exports.config.project = {};
        plugins.beautylog.log('no project config found, so proceeding with default behaviour!');
    }
    exports.config.dockerRegistry ? exports.dockerRegistry = exports.config.dockerRegistry : void (0);
    exports.config.dockerFilesBuilt ? exports.dockerFilesBuilt = exports.config.dockerFilesBuilt : void (0);
};
configLoad();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLDZDQUFxQztBQUlyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNsQyxZQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBRVUsUUFBQSxVQUFVLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7QUFJL0MsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLGlCQUF5QjtJQUN2RCxzQkFBYyxHQUFHLGlCQUFpQixDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQUNVLFFBQUEsZ0JBQWdCLEdBQWlCLEVBQUUsQ0FBQTtBQUNuQyxRQUFBLFdBQVcsR0FBaUIsRUFBRSxDQUFBO0FBQzlCLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGdCQUFnQixFQUFFLHdCQUFnQjtJQUNsQyxXQUFXLEVBQUUsbUJBQVc7SUFDeEIsT0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQTtBQUVVLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsQ0FBQTtJQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBTSxDQUFDLEVBQ3RCLEtBQUssQ0FBQyxrQkFBa0IsQ0FDekIsQ0FBQTtBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQsSUFBSSxVQUFVLEdBQUc7SUFDZix1RUFBdUU7SUFDdkUsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxFQUFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNwRyxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLG1CQUFXLEVBQUUsQ0FBQTtRQUNiLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDOUMsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixJQUFJLENBQUM7UUFDSCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLGNBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLENBQUE7WUFDdkYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUMvQyxDQUFDO0lBQ0gsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixjQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtRQUNuQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFBO0lBQ3pGLENBQUM7SUFFRCxjQUFNLENBQUMsY0FBYyxHQUFHLHNCQUFjLEdBQUcsY0FBTSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDekUsY0FBTSxDQUFDLGdCQUFnQixHQUFHLHdCQUFnQixHQUFHLGNBQU0sQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakYsQ0FBQyxDQUFBO0FBQ0QsVUFBVSxFQUFFLENBQUEifQ==