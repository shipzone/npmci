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
smartcli.addCommand('build')
    .then((argv) => {
    npmci_build_1.build(argv._[1])
        .then(NpmciEnv.configStore);
});
// clean
smartcli.addCommand('clean')
    .then((argv) => {
    npmci_clean_1.clean()
        .then(NpmciEnv.configStore);
});
// command
smartcli.addCommand('command')
    .then((argv) => {
    npmci_command_1.command()
        .then(NpmciEnv.configStore);
});
// install
smartcli.addCommand('install')
    .then((argv) => {
    npmci_install_1.install(argv._[1])
        .then(NpmciEnv.configStore);
});
// prepare
smartcli.addCommand('prepare')
    .then((argv) => {
    npmci_prepare_1.prepare(argv._[1])
        .then(NpmciEnv.configStore);
});
// publish
smartcli.addCommand('publish')
    .then((argv) => {
    npmci_publish_1.publish(argv._[1])
        .then(NpmciEnv.configStore);
});
// test
smartcli.addCommand('test')
    .then((argv) => {
    npmci_test_1.test(argv._[1])
        .then(NpmciEnv.configStore);
});
// trigger
smartcli.addCommand('trigger')
    .then((argv) => {
    npmci_trigger_1.trigger();
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTBDO0FBQzFDLHVDQUFzQztBQUN0QyxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzlFLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUU1RCwrQ0FBcUM7QUFDckMsK0NBQXFDO0FBQ3JDLG1EQUF5QztBQUN6QyxtREFBeUM7QUFDekMsbURBQXlDO0FBQ3pDLG1EQUF5QztBQUN6Qyw2Q0FBbUM7QUFDbkMsbURBQXlDO0FBQ3pDLHdDQUF1QztBQUV2Qyw2Q0FBcUM7QUFBNUIsOEJBQUEsS0FBSyxDQUFBO0FBQ2QsaURBQTBDO0FBQWpDLGtDQUFBLE9BQU8sQ0FBQTtBQUNoQixpREFBMEM7QUFBakMsa0NBQUEsT0FBTyxDQUFBO0FBRWhCLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUM5QyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUV0QyxRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7S0FDekIsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULG1CQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUNmLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFDLENBQUE7QUFFSixRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7S0FDekIsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULG1CQUFLLEVBQUU7U0FDSixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFBO0FBRUosVUFBVTtBQUNWLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0tBQzNCLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCx1QkFBTyxFQUFFO1NBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUMsQ0FBQTtBQUVKLFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztLQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxDQUFDO1NBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDL0IsQ0FBQyxDQUFDLENBQUE7QUFFSixVQUFVO0FBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7S0FDM0IsSUFBSSxDQUFDLENBQUMsSUFBSTtJQUNULHVCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQztTQUNqQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQy9CLENBQUMsQ0FBQyxDQUFBO0FBRUosVUFBVTtBQUNWLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0tBQzNCLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCx1QkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFFLENBQUM7U0FDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUMsQ0FBQTtBQUVKLE9BQU87QUFDUCxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztLQUN4QixJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsaUJBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxDQUFDO1NBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUMvQixDQUFDLENBQUMsQ0FBQTtBQUVKLFVBQVU7QUFDVixRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztLQUMzQixJQUFJLENBQUMsQ0FBQyxJQUFJO0lBQ1QsdUJBQU8sRUFBRSxDQUFBO0FBQ1gsQ0FBQyxDQUFDLENBQUE7QUFFSixRQUFRLENBQUMsVUFBVSxFQUFFLENBQUEifQ==