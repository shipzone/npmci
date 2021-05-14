#!/usr/bin/env node
process.env.CLI_CALL = 'true';
require('@gitzone/tsrun');
const cliTool = require('./ts/index');
cliTool.runCli();
