#!/usr/bin/env node
import "typings-global"
let shelljs = require("shelljs");

let program = require('commander');
let cmdValue;
let nodeValue;

program
  .version('0.0.1')
  .arguments('<cmd> [node]')
  .action(function (cmd, node) {
     cmdValue = cmd;
     nodeValue = node;
  });
 
program.parse(process.argv);
 
if (typeof cmdValue === 'undefined') {
   console.error('no command given!');
   process.exit(1);
}
console.log('command:', cmdValue);
console.log('node Version:', nodeValue);
shelljs.exec("bash -x \"source /usr/local/nvm/.nvm.sh && nvm install "+ nodeValue);