"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
const smartstring_1 = require("smartstring");
if (process.env.CI_REPOSITORY_URL)
    exports.repo = new smartstring_1.GitRepo(process.env.CI_REPOSITORY_URL);
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
    }
    catch (err) {
        exports.config.project = {};
        plugins.beautylog.log('no project config found, so proceeding with default behaviour!');
    }
    exports.config.dockerRegistry ? exports.dockerRegistry = exports.config.dockerRegistry : void (0);
    exports.config.dockerFilesBuilt ? exports.dockerFilesBuilt = exports.config.dockerFilesBuilt : void (0);
};
configLoad();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUN0Qyw2Q0FBcUM7QUFJckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztJQUFDLFlBQUksR0FBRyxJQUFJLHFCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXpFLFFBQUEsVUFBVSxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFBO0FBSS9DLFFBQUEsaUJBQWlCLEdBQUcsQ0FBQyxpQkFBeUI7SUFDdkQsc0JBQWMsR0FBRyxpQkFBaUIsQ0FBQTtBQUNwQyxDQUFDLENBQUE7QUFDVSxRQUFBLGdCQUFnQixHQUFpQixFQUFFLENBQUE7QUFDbkMsUUFBQSxXQUFXLEdBQWlCLEVBQUUsQ0FBQTtBQUM5QixRQUFBLE1BQU0sR0FBRztJQUNsQixjQUFjLEVBQUUsU0FBUztJQUN6QixnQkFBZ0IsRUFBRSx3QkFBZ0I7SUFDbEMsV0FBVyxFQUFFLG1CQUFXO0lBQ3hCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUE7QUFFVSxRQUFBLFdBQVcsR0FBRztJQUN2QixjQUFNLENBQUMsY0FBYyxHQUFHLHNCQUFjLENBQUE7SUFDdEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQU0sQ0FBQyxFQUN0QixLQUFLLENBQUMsa0JBQWtCLENBQ3pCLENBQUE7QUFDSCxDQUFDLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBRztJQUNmLHVFQUF1RTtJQUN2RSxJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3BHLENBQUM7SUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2IsbUJBQVcsRUFBRSxDQUFBO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQztRQUNILEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDcEIsY0FBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQTtZQUN2RixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQy9DLENBQUM7SUFDSCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLGNBQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO1FBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7SUFDekYsQ0FBQztJQUVELGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsR0FBRyxjQUFNLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUN6RSxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsd0JBQWdCLEdBQUcsY0FBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRixDQUFDLENBQUE7QUFDRCxVQUFVLEVBQUUsQ0FBQSJ9