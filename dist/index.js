"use strict";
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log('npmci version: ' + npmciInfo.version);
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
    commandName: 'build'
}).then((argv) => {
    npmci_build_1.build(argv._[1])
        .then(NpmciEnv.configStore);
});
// clean
smartcli.addCommand({
    commandName: 'clean'
}).then((argv) => {
    npmci_clean_1.clean()
        .then(NpmciEnv.configStore);
});
// command
smartcli.addCommand({
    commandName: 'command'
}).then((argv) => {
    npmci_command_1.command()
        .then(NpmciEnv.configStore);
});
// install
smartcli.addCommand({
    commandName: 'install'
}).then((argv) => {
    npmci_install_1.install(argv._[1])
        .then(NpmciEnv.configStore);
});
// prepare
smartcli.addCommand({
    commandName: 'prepare'
}).then((argv) => {
    npmci_prepare_1.prepare(argv._[1])
        .then(NpmciEnv.configStore);
});
// publish
smartcli.addCommand({
    commandName: 'publish'
}).then((argv) => {
    npmci_publish_1.publish(argv._[1])
        .then(NpmciEnv.configStore);
});
// test
smartcli.addCommand({
    commandName: 'test'
}).then((argv) => {
    npmci_test_1.test(argv._[1])
        .then(NpmciEnv.configStore);
});
// trigger
smartcli.addCommand({
    commandName: 'trigger'
}).then((argv) => {
    npmci_trigger_1.trigger();
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUN0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzlFLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUU1RCwrQ0FBbUM7QUFDbkMsK0NBQW1DO0FBQ25DLG1EQUF1QztBQUN2QyxtREFBdUM7QUFDdkMsbURBQXVDO0FBQ3ZDLG1EQUF1QztBQUN2Qyw2Q0FBaUM7QUFDakMsbURBQXVDO0FBQ3ZDLHdDQUF1QztBQUV2Qyw2Q0FBbUM7QUFBM0IsOEJBQUEsS0FBSyxDQUFBO0FBQ2IsaURBQXdDO0FBQWhDLGtDQUFBLE9BQU8sQ0FBQTtBQUNmLGlEQUF3QztBQUFoQyxrQ0FBQSxPQUFPLENBQUE7QUFFZixJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdEMsUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEIsV0FBVyxFQUFFLE9BQU87Q0FDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCxtQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDWCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ25DLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEIsV0FBVyxFQUFFLE9BQU87Q0FDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCxtQkFBSyxFQUFFO1NBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNuQyxDQUFDLENBQUMsQ0FBQTtBQUVGLFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ2hCLFdBQVcsRUFBRSxTQUFTO0NBQ3pCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sRUFBRTtTQUNKLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixVQUFVO0FBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUUsU0FBUztDQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULHVCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixVQUFVO0FBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUUsU0FBUztDQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULHVCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixVQUFVO0FBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUUsU0FBUztDQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULHVCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixPQUFPO0FBQ1AsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUUsTUFBTTtDQUN0QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULGlCQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDbkMsQ0FBQyxDQUFDLENBQUE7QUFFRixVQUFVO0FBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUNoQixXQUFXLEVBQUUsU0FBUztDQUN6QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULHVCQUFPLEVBQUUsQ0FBQTtBQUNiLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBIn0=