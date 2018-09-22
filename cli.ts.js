#!/usr/bin/env node
process.env.CLI_CALL = 'true';
require('@gitzone/tsrun');
require('./ts/index');
