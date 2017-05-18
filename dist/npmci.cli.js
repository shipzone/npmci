"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log('npmci version: ' + npmciInfo.version);
const npmci_test_1 = require("./npmci.test");
const NpmciEnv = require("./npmci.env");
const npmciMods = require("./npmci.mods");
let smartcli = new plugins.smartcli.Smartcli();
smartcli.addVersion(npmciInfo.version);
// build
smartcli.addCommand('build')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modBuild = yield npmciMods.modBuild.load();
    yield modBuild.build(argv._[1]);
    NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// clean
smartcli.addCommand('clean')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modClean = yield npmciMods.modClean.load();
    yield modClean.clean();
    NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// command
smartcli.addCommand('command')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modCommand = yield npmciMods.modCommand.load();
    modCommand.command();
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// install
smartcli.addCommand('install')
    .then((argv) => {
    install(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// prepare
smartcli.addCommand('prepare')
    .then((argv) => {
    prepare(argv._[1])
        .then(NpmciEnv.configStore)
        .catch(err => {
        console.log(err);
        process.exit(1);
    });
});
// publish
smartcli.addCommand('publish')
    .then((argv) => {
    publish(argv._[1])
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
    trigger();
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDOUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRzVELDZDQUFtQztBQUNuQyx3Q0FBdUM7QUFFdkMsMENBQXlDO0FBRXpDLElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtBQUM5QyxRQUFRLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtBQUV0QyxRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7S0FDekIsSUFBSSxDQUFDLENBQU8sSUFBSTtJQUNmLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQy9CLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHO0lBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2pCLENBQUMsQ0FBQyxDQUFBO0FBRUosUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0tBQ3pCLElBQUksQ0FBQyxDQUFPLElBQUk7SUFD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