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
const NpmciEnv = require("./npmci.env");
const npmciMods = require("./npmci.mods");
let smartcli = new plugins.smartcli.Smartcli();
smartcli.addVersion(npmciInfo.version);
// build
smartcli.addCommand('build')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modBuild = yield npmciMods.modBuild.load();
    yield modBuild.build(argvArg);
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
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// command
smartcli.addCommand('command')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modCommand = yield npmciMods.modCommand.load();
    yield modCommand.command();
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// purge
smartcli.addCommand('purge')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPurge = yield npmciMods.modPurge.load();
    yield modPurge.purge(argvArg);
})).catch(err => {
    console.log(err);
});
// install
smartcli.addCommand('install')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modInstall = yield npmciMods.modInstall.load();
    yield modInstall.install(argv._[1]);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// prepare
smartcli.addCommand('prepare')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modPrepare = yield npmciMods.modPrepare.load();
    yield modPrepare.prepare(argv._[1]);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// publish
smartcli.addCommand('publish')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPublish = yield npmciMods.modPublish.load();
    yield modPublish.publish(argvArg);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// test
smartcli.addCommand('test')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modTest = yield npmciMods.modTest.load();
    yield modTest.test(argv);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// trigger
smartcli.addCommand('trigger')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modTrigger = yield npmciMods.modTrigger.load();
    yield modTrigger.trigger();
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDOUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRTVELHdDQUF1QztBQUV2QywwQ0FBeUM7QUFFekMsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQzlDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXRDLFFBQVE7QUFDUixRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztLQUN6QixJQUFJLENBQUMsQ0FBTSxPQUFPO0lBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxNQUFNLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDN0IsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7SUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakIsQ0FBQyxDQUFDLENBQUE7QUFFSixRQUFRO0FBQ1IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7S0FDekIsSUFBSSxDQUFDLENBQU8sSUFBSTtJQUNmLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLFFBQVEs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