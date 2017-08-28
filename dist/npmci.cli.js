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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY2xpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY2xpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwyQ0FBMEM7QUFDMUMsdUNBQXNDO0FBQ3RDLElBQUksU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFDOUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBSTVELDBDQUF5QztBQUV6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUE7QUFDOUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUE7QUFFdEMsUUFBUTtBQUNSLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO0tBQ3pCLElBQUksQ0FBQyxDQUFPLElBQUk7SUFDZixJQUFJLFFBQVEsR0FBRyxNQUFNLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDOUMsTUFBTSxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDeEIsQ0FBQyxDQUFBLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztJQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUVKLGFBQWE7QUFDYixRQUFRLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQztLQUNoQyxJQUFJLENBQUMsQ0FBTyxPQUFPO0lBQ2xCLElBQUksUUFBUSxHQUFHLE1BQU0sU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNuRCxNQUFNLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FB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