"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
const smartstring_1 = require("smartstring");
if (process.env.CI_BUILD_REPO)
    exports.repo = new smartstring_1.GitRepo(process.env.CI_BUILD_REPO);
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
exports.configStore = () => {
    exports.config.dockerRegistry = exports.dockerRegistry;
    plugins.smartfile.memory.toFsSync(JSON.stringify(exports.config), paths.NpmciPackageConfig);
};
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
        ;
    }
    catch (err) {
        exports.config.project = {};
        plugins.beautylog.log('no project config found, so proceeding with default behaviour!');
    }
    exports.config.dockerRegistry ? exports.dockerRegistry = exports.config.dockerRegistry : void (0);
    exports.config.dockerFilesBuilt ? exports.dockerFilesBuilt = exports.config.dockerFilesBuilt : void (0);
};
configLoad();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUN0Qyw2Q0FBcUM7QUFJckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFBQyxZQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUE7QUFFakUsUUFBQSxVQUFVLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUE7QUFJL0MsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLGlCQUF5QjtJQUN2RCxzQkFBYyxHQUFHLGlCQUFpQixDQUFBO0FBQ3BDLENBQUMsQ0FBQTtBQUNVLFFBQUEsZ0JBQWdCLEdBQWlCLEVBQUUsQ0FBQTtBQUNuQyxRQUFBLFdBQVcsR0FBaUIsRUFBRSxDQUFBO0FBQzlCLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGdCQUFnQixFQUFFLHdCQUFnQjtJQUNsQyxXQUFXLEVBQUUsbUJBQVc7SUFDeEIsT0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQTtBQUVVLFFBQUEsV0FBVyxHQUFHO0lBQ3ZCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsQ0FBQTtJQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBTSxDQUFDLEVBQ3RCLEtBQUssQ0FBQyxrQkFBa0IsQ0FDekIsQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELElBQUksVUFBVSxHQUFHO0lBQ2YsdUVBQXVFO0lBQ3ZFLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDcEcsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixtQkFBVyxFQUFFLENBQUE7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsSUFBSSxDQUFDO1FBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixjQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxDQUFBO1lBQ3ZGLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUE7UUFDL0MsQ0FBQztRQUFBLENBQUM7SUFDSixDQUFDO0lBQ0QsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNYLGNBQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUVELGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsR0FBRyxjQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsd0JBQWdCLEdBQUcsY0FBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRixDQUFDLENBQUE7QUFDRCxVQUFVLEVBQUUsQ0FBQSJ9