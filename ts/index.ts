#!/usr/bin/env node
import "typings-global";
import * as plugins from "./npmci.plugins";



let command;
let commandOption;

plugins.commander
    .version('0.0.1')
    .arguments('<cmd> [node]')
    .action(function (commandArg, commandOptionArg) {
        command = commandArg;
        commandOption = commandOptionArg;
    });
 
plugins.commander.parse(process.argv);
 
if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}

switch (command){
    case "install":
        
}

shelljs.exec("bash -c \"source /usr/local/nvm/nvm.sh && nvm install "+ commandOption + " nvm alias default " + commandOption + "\"");