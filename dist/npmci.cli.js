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
const npmciMonitor = require("./npmci.monitor");
npmciMonitor.run();
// Get Info about npmci itself
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log('npmci version: ' + npmciInfo.version);
const npmciMods = require("./npmci.mods");
let smartcli = new plugins.smartcli.Smartcli();
smartcli.addVersion(npmciInfo.version);
// clean
smartcli.addCommand('clean')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modClean = yield npmciMods.modClean.load();
    yield modClean.clean();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// cloudflare
smartcli.addCommand('cloudflare')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPurge = yield npmciMods.modCloudflare.load();
    yield modPurge.handleCli(argvArg);
})).catch(err => {
    console.log(err);
});
// command
smartcli.addCommand('command')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modCommand = yield npmciMods.modCommand.load();
    yield modCommand.command();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// command
smartcli.addCommand('git')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modGit = yield npmciMods.modGit.load();
    yield modGit.handleCli(argvArg);
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// build
smartcli.addCommand('docker')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    yield modDocker.handleCli(argvArg);
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// node
smartcli.addCommand('node')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNode = yield npmciMods.modNode.load();
    yield modNode.handleCli(argvArg);
})).catch(err => {
    console.log(err);
});
// npm
smartcli.addCommand('npm')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNpm = yield npmciMods.modNpm.load();
    yield modNpm.handleCli(argvArg);
})).catch(err => {
    console.log(err);
});
// trigger
smartcli.addCommand('ssh')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modSsh = yield npmciMods.modSsh.load();
    yield modSsh.handleCli(argvArg);
})).catch(err => {
    console.log(err);
    process.exit(1);
});
// trigger
smartcli.addCommand('trigger')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modTrigger = yield npmciMods.modTrigger.load();
    yield modTrigger.trigger();
})).catch(err => {
    console.log(err);
    process.exit(1);
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLGdEQUErQztBQUMvQyxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUE7QUFFbEIsOEJBQThCO0FBQzlCLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDOUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBSTVELDBDQUF5QztBQUV6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdEMsUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0tBQ3pCLElBQUksQ0FBQyxDQUFPLElBQUksRUFBRSxFQUFFO0lBQ25CLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUM5QyxNQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtBQUN4QixDQUFDLENBQUEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUVKLGFBQWE7QUFDYixRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztLQUNoQyxJQUFJLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtJQUN0QixJ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