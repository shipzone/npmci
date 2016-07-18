"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
const smartstring_1 = require("smartstring");
if (process.env.CI_BUILD_REPO)
    exports.repo = new smartstring_1.GitRepo(process.env.CI_BUILD_REPO);
exports.buildStage = process.env.CI_BUILD_STAGE;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFDeEIsTUFBWSxPQUFPLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxNQUFZLEtBQUssV0FBTSxlQUFlLENBQUMsQ0FBQTtBQUN2Qyw4QkFBc0IsYUFBYSxDQUFDLENBQUE7QUFJcEMsRUFBRSxDQUFBLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFBQyxZQUFJLEdBQUcsSUFBSSxxQkFBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFFakUsa0JBQVUsR0FBVSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQztBQUkvQyx3QkFBZ0IsR0FBZ0IsRUFBRSxDQUFDO0FBQ25DLG1CQUFXLEdBQWdCLEVBQUUsQ0FBQztBQUM5QixjQUFNLEdBQUc7SUFDaEIsY0FBYyxFQUFFLFNBQVM7SUFDekIsZ0JBQWdCLEVBQUUsd0JBQWdCO0lBQ2xDLFdBQVcsRUFBRSxtQkFBVztJQUN4QixPQUFPLEVBQUUsU0FBUztDQUNyQixDQUFDO0FBRVMsbUJBQVcsR0FBRztJQUNyQixjQUFNLENBQUMsY0FBYyxHQUFHLHNCQUFjLENBQUM7SUFDdkMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQU0sQ0FBQyxFQUN0QixLQUFLLENBQUMsa0JBQWtCLENBQzNCLENBQUM7QUFDTixDQUFDLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBRztJQUNiLHVFQUF1RTtJQUN2RSxJQUFJLENBQUM7UUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLEVBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQ0E7SUFBQSxLQUFLLENBQUEsQ0FBQyxHQUFHLENBQUMsQ0FBQSxDQUFDO1FBQ1AsbUJBQVcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQztRQUNELEVBQUUsQ0FBQSxDQUFDLENBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUM7WUFDaEIsY0FBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBQyxZQUFZLENBQUMsQ0FBQztZQUN2RixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFBQSxDQUFDO0lBQ04sQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxjQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxjQUFNLENBQUMsY0FBYyxHQUFHLHNCQUFjLEdBQUcsY0FBTSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekUsY0FBTSxDQUFDLGdCQUFnQixHQUFHLHdCQUFnQixHQUFHLGNBQU0sQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQyxDQUFBO0FBQ0QsVUFBVSxFQUFFLENBQUMifQ==