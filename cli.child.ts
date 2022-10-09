#!/usr/bin/env node
process.env.CLI_CALL = 'true';
import * as cliTool from './ts/index.js';
cliTool.runCli();
