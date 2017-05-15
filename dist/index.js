"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// clean
smartcli.addCommand('clean')
    .then((argv) => {
    npmci_clean_1.clean()
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// command
smartcli.addCommand('command')
    .then((argv) => {
    npmci_command_1.command()
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// install
smartcli.addCommand('install')
    .then((argv) => {
    npmci_install_1.install(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// prepare
smartcli.addCommand('prepare')
    .then((argv) => {
    npmci_prepare_1.prepare(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// publish
smartcli.addCommand('publish')
    .then((argv) => {
    npmci_publish_1.publish(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// test
smartcli.addCommand('test')
    .then((argv) => {
    npmci_test_1.test(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// trigger
smartcli.addCommand('trigger')
    .then((argv) => {
    npmci_trigger_1.trigger();
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJDQUEwQztBQUMxQyx1Q0FBc0M7QUFDdEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUM5RSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFNUQsK0NBQXFDO0FBQ3JDLCtDQUFxQztBQUNyQyxtREFBeUM7QUFDekMsbURBQXlDO0FBQ3pDLG1EQUF5QztBQUN6QyxtREFBeUM7QUFDekMsNkNBQW1DO0FBQ25DLG1EQUF5QztBQUN6Qyx3Q0FBdUM7QUFFdkMsNkNBQXFDO0FBQTVCLDhCQUFBLEtBQUssQ0FBQTtBQUNkLGlEQUEwQztBQUFqQyxrQ0FBQSxPQUFPLENBQUE7QUFDaEIsaURBQTBDO0FBQWpDLGtDQUFBLE9BQU8sQ0FBQTtBQUVoQixJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdEMsUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0tBQ3pCLElBQUksQ0FBQyxDQUFDLElBQUk7SUFDVCxtQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUUsQ0FBQyxDQUFFLENBQUM7U0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztTQUMxQixLQUFLLENBQUMsR0FBRztRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDLENBQUMsQ0FBQTtBQUNO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