"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLDZDQUFtQztBQUluQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztJQUFDLFlBQUksR0FBRyxJQUFJLHFCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUVqRSxRQUFBLFVBQVUsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQTtBQUkvQyxRQUFBLGlCQUFpQixHQUFHLENBQUMsaUJBQXlCO0lBQ3JELHNCQUFjLEdBQUcsaUJBQWlCLENBQUE7QUFDdEMsQ0FBQyxDQUFBO0FBQ1UsUUFBQSxnQkFBZ0IsR0FBaUIsRUFBRSxDQUFBO0FBQ25DLFFBQUEsV0FBVyxHQUFpQixFQUFFLENBQUE7QUFDOUIsUUFBQSxNQUFNLEdBQUc7SUFDaEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsZ0JBQWdCLEVBQUUsd0JBQWdCO0lBQ2xDLFdBQVcsRUFBRSxtQkFBVztJQUN4QixPQUFPLEVBQUUsU0FBUztDQUNyQixDQUFBO0FBRVUsUUFBQSxXQUFXLEdBQUc7SUFDckIsY0FBTSxDQUFDLGNBQWMsR0FBRyxzQkFBYyxDQUFBO0lBQ3RDLE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFNLENBQUMsRUFDdEIsS0FBSyxDQUFDLGtCQUFrQixDQUMzQixDQUFBO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsSUFBSSxVQUFVLEdBQUc7SUFDYix1RUFBdUU7SUFDdkUsSUFBSSxDQUFDO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxFQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUNwRyxDQUNBO0lBQUEsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNULG1CQUFXLEVBQUUsQ0FBQTtRQUNiLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7SUFDaEQsQ0FBQztJQUVELGlCQUFpQjtJQUNqQixJQUFJLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLGNBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUMsWUFBWSxDQUFDLENBQUE7WUFDdEYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQUEsQ0FBQztJQUNOLENBQ0E7SUFBQSxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1QsY0FBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDbkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0VBQWdFLENBQUMsQ0FBQTtJQUMzRixDQUFDO0lBRUQsY0FBTSxDQUFDLGNBQWMsR0FBRyxzQkFBYyxHQUFHLGNBQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3hFLGNBQU0sQ0FBQyxnQkFBZ0IsR0FBRyx3QkFBZ0IsR0FBRyxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2xGLENBQUMsQ0FBQTtBQUNELFVBQVUsRUFBRSxDQUFBIn0=