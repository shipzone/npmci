#!/usr/bin/env node
process.env.CLI_CALL = 'true';
const cliTool = require('./dist_ts/index');
cliTool.runCli();
