#!/usr/bin/env node
import "typings-global";
import * as plugins from "./npmci.plugins";

let packJson = require("../package.json");

plugins.beautylog.info("npmci version: " + packJson.version);

import {install} from "./npmci.install";
import {test} from "./npmci.test";
import {publish} from "./npmci.publish";
import {trigger} from "./npmci.trigger";


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
    case "prepare":
        
        break;
    case "publish":
        publish(commandOption)
            .then(trigger);
        break;
    default:
        break;
}

