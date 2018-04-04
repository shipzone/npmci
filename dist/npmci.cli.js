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
smartcli
    .addCommand('clean')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modClean = yield npmciMods.modClean.load();
    yield modClean.clean();
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
// cloudflare
smartcli
    .addCommand('cloudflare')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modPurge = yield npmciMods.modCloudflare.load();
    yield modPurge.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
});
// command
smartcli
    .addCommand('command')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modCommand = yield npmciMods.modCommand.load();
    yield modCommand.command();
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
// command
smartcli
    .addCommand('git')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modGit = yield npmciMods.modGit.load();
    yield modGit.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
// build
smartcli
    .addCommand('docker')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modDocker = yield npmciMods.modDocker.load();
    yield modDocker.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
// node
smartcli
    .addCommand('node')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNode = yield npmciMods.modNode.load();
    yield modNode.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
});
// npm
smartcli
    .addCommand('npm')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modNpm = yield npmciMods.modNpm.load();
    yield modNpm.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
});
// trigger
smartcli
    .addCommand('ssh')
    .then((argvArg) => __awaiter(this, void 0, void 0, function* () {
    let modSsh = yield npmciMods.modSsh.load();
    yield modSsh.handleCli(argvArg);
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
// trigger
smartcli
    .addCommand('trigger')
    .then((argv) => __awaiter(this, void 0, void 0, function* () {
    let modTrigger = yield npmciMods.modTrigger.load();
    yield modTrigger.trigger();
}))
    .catch(err => {
    console.log(err);
    process.exit(1);
});
smartcli.startParse();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMkM7QUFDM0MsdUNBQXVDO0FBQ3ZDLGdEQUFnRDtBQUNoRCxZQUFZLENBQUMsR0FBRyxFQUFFLENBQUM7QUFFbkIsOEJBQThCO0FBQzlCLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBSTdELDBDQUEwQztBQUUxQyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDL0MsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFdkMsUUFBUTtBQUNSLFFBQVE7S0FDTCxVQUFVLENBQUMsT0FBTyxDQUFDO0tBQ25CLElBQUksQ0FBQyxDQUFNLElBQUksRUFBQyxFQUFFO0lBQ2pCLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMvQyxNQUFNLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN6QixDQUFDLENBQUEsQ0FBQztLQUNELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtJQUNYLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQztBQUVMLGFBQWE7QUFDYixRQUFRO0tBQ0wsVUFBVSxDQUFDLFlBQVksQ0FBQztLQUN4QixJQUFJLENBQUMsQ0FBTSxPQUFPLEVBQUMsRUFBRTtJQUNwQixJ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