#!/usr/bin/env node
import "typings-global";
import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log("npmci version: " + npmciInfo.version);

import {build} from "./npmci.build"
import {install} from "./npmci.install";
import {publish} from "./npmci.publish";
import {prepare} from "./npmci.prepare";
import {tag, retag} from "./npmci.tag";
import {test} from "./npmci.test";
import {trigger} from "./npmci.trigger";
import * as NpmciEnv from "./npmci.env";


let command;
let commandOption;

plugins.commander
    .arguments('<commandarg> [commandoptionarg]')
    .action(function (commandarg, commandoptionarg) {
        command = commandarg;
        commandOption = commandoptionarg;
    });
 
plugins.commander.parse(process.argv);
 
if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}

switch (command){
    case "build":
        build(commandOption)
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
        break;
}

