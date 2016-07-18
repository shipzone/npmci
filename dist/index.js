#!/usr/bin/env node
"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log("npmci version: " + npmciInfo.version);
const npmci_build_1 = require("./npmci.build");
const npmci_clean_1 = require("./npmci.clean");
const npmci_command_1 = require("./npmci.command");
const npmci_install_1 = require("./npmci.install");
const npmci_publish_1 = require("./npmci.publish");
const npmci_prepare_1 = require("./npmci.prepare");
const npmci_test_1 = require("./npmci.test");
const npmci_trigger_1 = require("./npmci.trigger");
const NpmciEnv = require("./npmci.env");
var npmci_build_2 = require("./npmci.build");
exports.build = npmci_build_2.build;
var npmci_install_2 = require("./npmci.install");
exports.install = npmci_install_2.install;
var npmci_publish_2 = require("./npmci.publish");
exports.publish = npmci_publish_2.publish;
let smartcli = new plugins.smartcli.Smartcli();
smartcli.addVersion(npmciInfo.version);
// build
smartcli.addCommand({
    commandName: "build"
}).then((argv) => {
    npmci_build_1.build(argv._[1])
        .then(NpmciEnv.configStore);
});
// clean
smartcli.addCommand({
    commandName: "clean"
}).then((argv) => {
    npmci_clean_1.clean()
        .then(NpmciEnv.configStore);
});
// command
smartcli.addCommand({
    commandName: "command"
}).then((argv) => {
    npmci_command_1.command()
        .then(NpmciEnv.configStore);
});
// install
smartcli.addCommand({
    commandName: "install"
}).then((argv) => {
    npmci_install_1.install(argv._[1])
        .then(NpmciEnv.configStore);
});
// prepare
smartcli.addCommand({
    commandName: "prepare"
}).then((argv) => {
    npmci_prepare_1.prepare(argv._[1])
        .then(NpmciEnv.configStore);
});
// publish
smartcli.addCommand({
    commandName: "publish"
}).then((argv) => {
    npmci_publish_1.publish(argv._[1])
        .then(NpmciEnv.configStore);
});
// test
smartcli.addCommand({
    commandName: "test"
}).then((argv) => {
    npmci_test_1.test(argv._[1])
        .then(NpmciEnv.configStore);
});
// trigger
smartcli.addCommand({
    commandName: "trigger"
}).then((argv) => {
    npmci_trigger_1.trigger();
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLE1BQVksS0FBSyxXQUFNLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZDLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdELDhCQUFvQixlQUNwQixDQUFDLENBRGtDO0FBQ25DLDhCQUFvQixlQUFlLENBQUMsQ0FBQTtBQUNwQyxnQ0FBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QyxnQ0FBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QyxnQ0FBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QyxnQ0FBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4Qyw2QkFBbUIsY0FBYyxDQUFDLENBQUE7QUFDbEMsZ0NBQXNCLGlCQUFpQixDQUFDLENBQUE7QUFDeEMsTUFBWSxRQUFRLFdBQU0sYUFBYSxDQUFDLENBQUE7QUFFeEMsNEJBQW9CLGVBQ3BCLENBQUM7QUFETyxvQ0FBMkI7QUFDbkMsOEJBQXNCLGlCQUFpQixDQUFDO0FBQWhDLDBDQUFnQztBQUN4Qyw4QkFBc0IsaUJBQWlCLENBQUM7QUFBaEMsMENBQWdDO0FBR3hDLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUMvQyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV2QyxRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUMsT0FBTztDQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULG1CQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNYLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUMsT0FBTztDQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULG1CQUFLLEVBQUU7U0FDRixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BDLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBVTtBQUNWLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEIsV0FBVyxFQUFDLFNBQVM7Q0FDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCx1QkFBTyxFQUFFO1NBQ0osSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBQyxTQUFTO0NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBQyxTQUFTO0NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBQyxTQUFTO0NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILE9BQU87QUFDUCxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBQyxNQUFNO0NBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsaUJBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQztBQUVILFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBQyxTQUFTO0NBQ3hCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sRUFBRSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMifQ==