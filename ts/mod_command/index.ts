import * as plugins from './mod.plugins.js';
import { bash } from '../npmci.bash.js';

export let command = async () => {
  let wrappedCommand: string = '';
  let argvArray = process.argv;
  for (let i = 3; i < argvArray.length; i++) {
    wrappedCommand = wrappedCommand + argvArray[i];
    if (i + 1 !== argvArray.length) {
      wrappedCommand = wrappedCommand + ' ';
    }
  }
  await bash(wrappedCommand);
  return;
};
