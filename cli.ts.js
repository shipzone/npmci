#!/usr/bin/env node
process.env.CLI_CALL = 'true';

import * as tsrun from '@gitzone/tsrun';
tsrun.runPath('./cli.child.js', import.meta.url);
