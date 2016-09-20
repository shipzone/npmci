"use strict";
require("typings-global");
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
        plugins.lodash.assign(exports.config, plugins.smartfile.fs.toObjectSync(paths.NpmciPackageConfig, "json"));
    }
    catch (err) {
        exports.configStore();
        plugins.beautylog.log("config initialized!");
    }
    // project config
    try {
        if (!exports.config.project) {
            exports.config.project = plugins.smartfile.fs.toObjectSync(paths.NpmciProjectDir, "npmci.json");
            plugins.beautylog.ok("project config found!");
        }
        ;
    }
    catch (err) {
        exports.config.project = {};
        plugins.beautylog.log("no project config found, so proceeding with default behaviour!");
    }
    exports.config.dockerRegistry ? exports.dockerRegistry = exports.config.dockerRegistry : void (0);
    exports.config.dockerFilesBuilt ? exports.dockerFilesBuilt = exports.config.dockerFilesBuilt : void (0);
};
configLoad();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBd0I7QUFDeEIsMkNBQTJDO0FBQzNDLHVDQUF1QztBQUN2Qyw2Q0FBb0M7QUFJcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFBQyxZQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFakUsUUFBQSxVQUFVLEdBQVUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUM7QUFJL0MsUUFBQSxpQkFBaUIsR0FBRyxDQUFDLGlCQUF3QjtJQUNwRCxzQkFBYyxHQUFHLGlCQUFpQixDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQUNVLFFBQUEsZ0JBQWdCLEdBQWdCLEVBQUUsQ0FBQztBQUNuQyxRQUFBLFdBQVcsR0FBZ0IsRUFBRSxDQUFDO0FBQzlCLFFBQUEsTUFBTSxHQUFHO0lBQ2hCLGNBQWMsRUFBRSxTQUFTO0lBQ3pCLGdCQUFnQixFQUFFLHdCQUFnQjtJQUNsQyxXQUFXLEVBQUUsbUJBQVc7SUFDeEIsT0FBTyxFQUFFLFNBQVM7Q0FDckIsQ0FBQztBQUVTLFFBQUEsV0FBVyxHQUFHO0lBQ3JCLGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsQ0FBQztJQUN2QyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBTSxDQUFDLEVBQ3RCLEtBQUssQ0FBQyxrQkFBa0IsQ0FDM0IsQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVELElBQUksVUFBVSxHQUFHO0lBQ2IsdUVBQXVFO0lBQ3ZFLElBQUksQ0FBQztRQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sRUFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDckcsQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxtQkFBVyxFQUFFLENBQUM7UUFDZCxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFRCxpQkFBaUI7SUFDakIsSUFBSSxDQUFDO1FBQ0QsRUFBRSxDQUFBLENBQUMsQ0FBQyxjQUFNLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztZQUNoQixjQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3ZGLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUFBLENBQUM7SUFDTixDQUNBO0lBQUEsS0FBSyxDQUFBLENBQUMsR0FBRyxDQUFDLENBQUEsQ0FBQztRQUNQLGNBQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdFQUFnRSxDQUFDLENBQUM7SUFDNUYsQ0FBQztJQUVELGNBQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQWMsR0FBRyxjQUFNLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RSxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsd0JBQWdCLEdBQUcsY0FBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNuRixDQUFDLENBQUE7QUFDRCxVQUFVLEVBQUUsQ0FBQyJ9