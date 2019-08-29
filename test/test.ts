import { tap, expect } from '@pushrocks/tapbundle';
import * as path from 'path';

process.env.NPMTS_TEST = 'true';

// set up environment
process.env.CI_REPOSITORY_URL = 'https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git';
process.env.CI_BUILD_TOKEN = 'kjlkjfiudofiufs';

// Docker
process.env.NPMCI_LOGIN_DOCKER = 'docker.io|someuser|somepass';

// SSH env
process.env.NPMCI_SSHKEY_1 = 'hostString|somePrivKey|##';

process.cwd = () => {
  return path.join(__dirname, 'assets/');
};

import * as npmci from '../ts';

// ======
// Docker
// ======

let dockerfile1: npmci.Dockerfile;
let dockerfile2: npmci.Dockerfile;
let sortableArray: npmci.Dockerfile[];

tap.test('should return valid Dockerfiles', async () => {
  const npmciInstance = new npmci.Npmci();
  dockerfile1 = new npmci.Dockerfile(npmciInstance.dockerManager, {
    filePath: './Dockerfile',
    read: true
  });
  dockerfile2 = new npmci.Dockerfile(npmciInstance.dockerManager, {
    filePath: './Dockerfile_sometag1',
    read: true
  });
  expect(dockerfile1.version).to.equal('latest');
  return expect(dockerfile2.version).to.equal('sometag1');
});

tap.test('should read a directory of Dockerfiles', async () => {
  const npmciInstance = new npmci.Npmci();
  return npmci.Dockerfile.readDockerfiles(npmciInstance.dockerManager).then(
    async (readDockerfilesArrayArg: npmci.Dockerfile[]) => {
      sortableArray = readDockerfilesArrayArg;
      return expect(readDockerfilesArrayArg[1].version).to.equal('sometag1');
    }
  );
});

tap.test('should sort an array of Dockerfiles', async () => {
  return npmci.Dockerfile.sortDockerfiles(sortableArray).then(
    async (sortedArrayArg: npmci.Dockerfile[]) => {
      console.log(sortedArrayArg);
    }
  );
});

tap.test('should build all Dockerfiles', async () => {
  const npmciInstance = new npmci.Npmci();
  return npmciInstance.dockerManager.handleCli({
    _: ['docker', 'build']
  });
});

tap.test('should test all Dockerfiles', async () => {
  const npmciInstance = new npmci.Npmci();
  return npmciInstance.dockerManager.handleCli({
    _: ['docker', 'test']
  });
});

tap.test('should test dockerfiles', async () => {
  const npmciInstance = new npmci.Npmci();
  return npmciInstance.dockerManager.handleCli({
    _: ['docker', 'test']
  });
});

tap.test('should login docker daemon', async () => {
  const npmciInstance = new npmci.Npmci();
  return npmciInstance.dockerManager.handleCli({
    _: ['docker', 'login']
  });
});

// ===
// SSH
// ===
tap.test('should prepare SSH keys', async () => {
  const npmciModSsh = await import('../ts/mod_ssh');
  return await npmciModSsh.handleCli({
    _: ['ssh', 'prepare']
  });
});

// ====
// node
// ====
tap.test('should install a certain version of node', async () => {
  const npmciInstance = new npmci.Npmci();
  await npmciInstance.nodejsManager.handleCli({
    _: ['node', 'install', 'stable']
  });
  await npmciInstance.nodejsManager.handleCli({
    _: ['node', 'install', 'lts']
  });
  await npmciInstance.nodejsManager.handleCli({
    _: ['node', 'install', 'legacy']
  });
});

// make sure test ends all right
tap.test('reset paths', async () => {
  process.cwd = () => {
    return path.join(__dirname, '../');
  };
});

tap.start();
