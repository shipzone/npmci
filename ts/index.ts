#!/usr/bin/env node
import "typings-global";
import * as plugins from "./npmci.plugins";

plugins.beautylog.log("npmci in version 1.0.10");

import {install} from "./npmci.install";
import {test} from "./npmci.test";
import {publish} from "./npmci.publish";


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
    case "install":
        install(commandOption);
        break;
    case "test":
        test(commandOption);
        break;
    case "publish":
        publish();
        break;
    default:
        break;
}

