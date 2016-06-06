"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var paths = require("./npmci.paths");
var smartstring_1 = require("smartstring");
exports.repo = new smartstring_1.GitRepo(process.env.CI_BUILD_REPO);
exports.buildStage = process.env.CI_BUILD_STAGE;
exports.dockerFilesBuilt = [];
exports.dockerFiles = [];
exports.configStore = function () {
    plugins.smartfile.memory.toFsSync(JSON.stringify(exports.config), {
        fileName: "config.json",
        filePath: paths.NpmciPackageRoot
    });
};
exports.configLoad = function () {
    try {
        exports.config = plugins.smartfile.local.toObjectSync(paths.NpmciPackageConfig, "json");
    }
    catch (err) {
        exports.config = {};
        exports.configStore();
        plugins.beautylog.log("config inititialized!");
    }
    exports.config.dockerRegistry ? exports.dockerRegistry = exports.config.dockerRegistry : void (0);
    exports.config.dockerFilesBuilt ? exports.dockerFilesBuilt = exports.config.dockerFilesBuilt : void (0);
};
exports.configLoad();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmVudi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFDM0MsSUFBWSxLQUFLLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFDdkMsNEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBR3pCLFlBQUksR0FBVyxJQUFJLHFCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUV0RCxrQkFBVSxHQUFVLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO0FBSS9DLHdCQUFnQixHQUFnQixFQUFFLENBQUM7QUFDbkMsbUJBQVcsR0FBZ0IsRUFBRSxDQUFDO0FBSTlCLG1CQUFXLEdBQUc7SUFDckIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQU0sQ0FBQyxFQUN0QjtRQUNJLFFBQVEsRUFBQyxhQUFhO1FBQ3RCLFFBQVEsRUFBQyxLQUFLLENBQUMsZ0JBQWdCO0tBQ2xDLENBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQTtBQUVVLGtCQUFVLEdBQUc7SUFDcEIsSUFBSSxDQUFDO1FBQ0QsY0FBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDbkYsQ0FDQTtJQUFBLEtBQUssQ0FBQSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7UUFDUCxjQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osbUJBQVcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsY0FBTSxDQUFDLGNBQWMsR0FBRyxzQkFBYyxHQUFHLGNBQU0sQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLGNBQU0sQ0FBQyxnQkFBZ0IsR0FBRyx3QkFBZ0IsR0FBRyxjQUFNLENBQUMsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ25GLENBQUMsQ0FBQTtBQUNELGtCQUFVLEVBQUUsQ0FBQyIsImZpbGUiOiJucG1jaS5lbnYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5pbXBvcnQgKiBhcyBwYXRocyBmcm9tIFwiLi9ucG1jaS5wYXRoc1wiO1xuaW1wb3J0IHtHaXRSZXBvfSBmcm9tIFwic21hcnRzdHJpbmdcIjtcbmltcG9ydCB7RG9ja2VyZmlsZX0gZnJvbSBcIi4vbnBtY2kuYnVpbGQuZG9ja2VyXCJcblxuZXhwb3J0IGxldCByZXBvOkdpdFJlcG8gPSBuZXcgR2l0UmVwbyhwcm9jZXNzLmVudi5DSV9CVUlMRF9SRVBPKTtcblxuZXhwb3J0IGxldCBidWlsZFN0YWdlOnN0cmluZyA9IHByb2Nlc3MuZW52LkNJX0JVSUxEX1NUQUdFO1xuXG4vLyBoYW5kbGluZyBjb25maWcgYmV0d2VlbiBjb21tYW5kc1xuZXhwb3J0IGxldCBkb2NrZXJSZWdpc3RyeTsgLy8gd2lsbCBiZSBzZXQgYnkgbnBtY2kucHJlcGFyZVxuZXhwb3J0IGxldCBkb2NrZXJGaWxlc0J1aWx0OkRvY2tlcmZpbGVbXSA9IFtdO1xuZXhwb3J0IGxldCBkb2NrZXJGaWxlczpEb2NrZXJmaWxlW10gPSBbXTtcblxuZXhwb3J0IGxldCBjb25maWc7XG5cbmV4cG9ydCBsZXQgY29uZmlnU3RvcmUgPSAoKSA9PiB7XG4gICAgcGx1Z2lucy5zbWFydGZpbGUubWVtb3J5LnRvRnNTeW5jKFxuICAgICAgICBKU09OLnN0cmluZ2lmeShjb25maWcpLFxuICAgICAgICB7XG4gICAgICAgICAgICBmaWxlTmFtZTpcImNvbmZpZy5qc29uXCIsXG4gICAgICAgICAgICBmaWxlUGF0aDpwYXRocy5OcG1jaVBhY2thZ2VSb290XG4gICAgICAgIH1cbiAgICApO1xufVxuXG5leHBvcnQgbGV0IGNvbmZpZ0xvYWQgPSAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uZmlnID0gcGx1Z2lucy5zbWFydGZpbGUubG9jYWwudG9PYmplY3RTeW5jKHBhdGhzLk5wbWNpUGFja2FnZUNvbmZpZyxcImpzb25cIik7XG4gICAgfVxuICAgIGNhdGNoKGVycil7XG4gICAgICAgIGNvbmZpZyA9IHt9O1xuICAgICAgICBjb25maWdTdG9yZSgpO1xuICAgICAgICBwbHVnaW5zLmJlYXV0eWxvZy5sb2coXCJjb25maWcgaW5pdGl0aWFsaXplZCFcIik7XG4gICAgfVxuICAgIFxuICAgIGNvbmZpZy5kb2NrZXJSZWdpc3RyeSA/IGRvY2tlclJlZ2lzdHJ5ID0gY29uZmlnLmRvY2tlclJlZ2lzdHJ5IDogdm9pZCgwKTtcbiAgICBjb25maWcuZG9ja2VyRmlsZXNCdWlsdCA/IGRvY2tlckZpbGVzQnVpbHQgPSBjb25maWcuZG9ja2VyRmlsZXNCdWlsdCA6IHZvaWQoMCk7XG59XG5jb25maWdMb2FkKCk7Il19
