import { Npmci } from './npmci.classes.npmci';
import { Dockerfile } from './manager.docker/mod.classes.dockerfile';

export const npmciInstance = new Npmci();

export { Dockerfile, Npmci };

export const runCli = async () => {
  npmciInstance.start();
};
