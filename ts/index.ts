#!/usr/bin/env node
import "typings-global";
import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log("npmci version: " + npmciInfo.version);

import {build} from "./npmci.build"
import {command as command2} from "./npmci.command";
import {install} from "./npmci.install";
import {publish} from "./npmci.publish";
import {prepare} from "./npmci.prepare";
import {tag, retag} from "./npmci.tag";
import {test} from "./npmci.test";
import {trigger} from "./npmci.trigger";
import * as NpmciEnv from "./npmci.env";

export {build} from "./npmci.build"
export {install} from "./npmci.install";
export {publish} from "./npmci.publish";

let command;
let commandOption:string;

let commander = plugins.commander
    .option("-v","--version","print version")
    .arguments('<commandarg> [commandoptionarg]')
    .action(function (commandarg, commandoptionarg) {
        command = commandarg;
        commandOption = commandoptionarg;
    });
 
plugins.commander.parse(process.argv);

if(commander.version) {
    console.log(npmciInfo.version);
    process.exit(0);
}

if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}

switch (command){
    case "build":
        build(commandOption)
            .then(NpmciEnv.configStore);
        break;
    case "command":
        command2()
            .then(NpmciEnv.configStore);
        break;
    case "install":
        install(commandOption)
            .then(NpmciEnv.configStore);;
        break;
    case "prepare":
        prepare(commandOption)
            .then(NpmciEnv.configStore);;
        break;
    case "publish":
        publish(commandOption)
            .then(NpmciEnv.configStore);;
        break;
    case "test":
        test(commandOption)
            .then(NpmciEnv.configStore);
        break;
    case "trigger":
        trigger();
        break;
    default:
        plugins.beautylog.error("command " + commandOption.blue + " not recognised");
        process.exit(1);
        break;
}

