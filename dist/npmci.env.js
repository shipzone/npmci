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
/**
 * the build stage
 */
exports.buildStage = process.env.CI_BUILD_STAGE;
exports.setDockerRegistry = (dockerRegistryArg) => {
    exports.dockerRegistry = dockerRegistryArg;
};
exports.dockerFilesBuilt = [];
exports.dockerFiles = [];
/**
 * the config
 */
exports.config = {
    dockerRegistry: undefined,
    dockerFilesBuilt: exports.dockerFilesBuilt,
    dockerFiles: exports.dockerFiles,
    project: undefined
};
/**
 * the configuration store
 */
exports.configStore = () => __awaiter(this, void 0, void 0, function* () {
    exports.config.dockerRegistry = exports.dockerRegistry;
    plugins.smartfile.memory.toFsSync(JSON.stringify(exports.config), paths.NpmciPackageConfig);
});
/**
 * load the config in case a previous run has stored it
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLDZDQUFxQztBQU9yQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNsQyxZQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNuRCxDQUFDO0FBRUQ7O0dBRUc7QUFDUSxRQUFBLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQTtBQUkvQyxRQUFBLGlCQUFpQixHQUFHLENBQUMsaUJBQXlCO0lBQ3ZELHNCQUFjLEdBQUcsaUJBQWlCLENBQUE7QUFDcEMsQ0FBQyxDQUFBO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBaUIsRUFBRSxDQUFBO0FBQ25DLFFBQUEsV0FBVyxHQUFpQixFQUFFLENBQUE7QUFFekM7O0dBRUc7QUFDUSxRQUFBLE1BQU0sR0FBRztJQUNsQixjQUFjLEVBQUUsU0FBUztJQUN6QixnQkFBZ0IsRUFBRSx3QkFBZ0I7SUFDbEMsV0FBVyxFQUFFLG1CQUFXO0lBQ3hCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUE7QUFFRDs7R0FFRztBQUNRLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsQ0FBQTtJQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBTSxDQUFDLEVBQ3RCLEtBQUssQ0FBQyxrQkFBa0IsQ0FDekIsQ0FBQTtBQUNILENBQUMsQ0FBQSxDQUFBO0FBRUQ7O0dBRUc7QUFDSCxJQUFJLFVBQVUsR0FBRztJQUNmLHVFQUF1RTtJQUN2RSxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BHLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsbUJBQVcsRUFBRSxDQUFBO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEIsY0FBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUN2RixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQy9DLENBQUM7SUFDSCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLGNBQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUVELGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsR0FBRyxjQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsd0JBQWdCLEdBQUcsY0FBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRixDQUFDLENBQUE7QUFDRCxVQUFVLEVBQUUsQ0FBQSJ9