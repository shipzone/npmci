import { Npmci } from './npmci.classes.npmci.js';
import { Dockerfile } from './manager.docker/mod.classes.dockerfile.js';

export const npmciInstance = new Npmci();

export { Dockerfile, Npmci };

export const runCli = async () => {
  npmciInstance.start();
};
