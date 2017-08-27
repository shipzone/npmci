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
// cloudflare
smartcli.addCommand('cloudflare')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPurge = yield npmciMods.modCloudflare.load();
    yield modPurge.handleCli(argvArg);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
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
// build
smartcli.addCommand('docker')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    yield modDocker.handleCli(argvArg);
    NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// node
smartcli.addCommand('node')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNode = yield npmciMods.modNode.load();
    yield modNode.handleCli(argvArg);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
});
// npm
smartcli.addCommand('npm')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNpm = yield npmciMods.modNpm.load();
    yield modNpm.handleCli(argvArg);
    yield NpmciEnv.configStore();
})).catch(err => {
    console.log(err);
});
// trigger
smartcli.addCommand('ssh')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modSsh = yield npmciMods.modSsh.load();
    yield modSsh.handleCli(argvArg);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDOUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRTVELHdDQUF1QztBQUV2QywwQ0FBeUM7QUFFekMsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFBO0FBQzlDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBRXRDLFFBQVE7QUFDUixRQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztLQUN6QixJQUFJLENBQUMsQ0FBTyxJQUFJO0lBQ2YsSUFBSSxRQUFRLEdBQUcsTUFBTSxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzlDLE1BQU0sUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3RCLE1BQU0sUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFBO0FBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7SUFDVixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ2hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDakIsQ0FBQyxDQUFDLENBQUE7QUFFSixhQUFhO0FBQ2IsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7S0FDaEMsSUFBSSxDQUFDLENBQU8sT0FBTztJQUNsQixJQUFJLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxhQUFhLENBQUMs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