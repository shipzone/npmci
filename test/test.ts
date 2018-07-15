import { tap, expect } from '@pushrocks/tapbundle';
import * as path from 'path';

// Setup test
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

// require NPMCI files
import '../ts/index';
import npmciModDocker = require('../ts/mod_docker/index');
import npmciModNpm = require('../ts/mod_npm/index');
import npmciModNode = require('../ts/mod_node/index');
import npmciModSsh = require('../ts/mod_ssh/index');
import npmciEnv = require('../ts/npmci.env');

// ======
// Docker
// ======

let dockerfile1: npmciModDocker.Dockerfile;
let dockerfile2: npmciModDocker.Dockerfile;
let sortableArray: npmciModDocker.Dockerfile[];

tap.test('should return valid Dockerfiles', async () => {
  dockerfile1 = new npmciModDocker.Dockerfile({ filePath: './Dockerfile', read: true });
  dockerfile2 = new npmciModDocker.Dockerfile({ filePath: './Dockerfile_sometag1', read: true });
  expect(dockerfile1.version).to.equal('latest');
  return expect(dockerfile2.version).to.equal('sometag1');
});

tap.test('should read a directory of Dockerfiles', async () => {
  return npmciModDocker.helpers
    .readDockerfiles()
    .then(async (readDockerfilesArrayArg: npmciModDocker.Dockerfile[]) => {
      sortableArray = readDockerfilesArrayArg;
      return expect(readDockerfilesArrayArg[1].version).to.equal('sometag1');
    });
});

tap.test('should sort an array of Dockerfiles', async () => {
  return npmciModDocker.helpers
    .sortDockerfiles(sortableArray)
    .then(async (sortedArrayArg: npmciModDocker.Dockerfile[]) => {
      console.log(sortedArrayArg);
    });
});

tap.test('should build all Dockerfiles', async () => {
  return npmciModDocker.handleCli({
    _: ['docker', 'build']
  });
});

tap.test('should test all Dockerfiles', async () => {
  return await npmciModDocker.handleCli({
    _: ['docker', 'test']
  });
});

tap.test('should test dockerfiles', async () => {
  return await npmciModDocker.handleCli({
    _: ['docker', 'test']
  });
});

tap.test('should login docker daemon', async () => {
  return await npmciModDocker.handleCli({
    _: ['docker', 'login']
  });
});

// ===
// SSH
// ===
tap.test('should prepare SSH keys', async () => {
  return await npmciModSsh.handleCli({
    _: ['ssh', 'prepare']
  });
});

// ====
// node
// ====
tap.test('should install a certain version of node', async () => {
  await npmciModNode.handleCli({
    _: ['node', 'install', 'stable']
  });
  await npmciModNode.handleCli({
    _: ['node', 'install', 'lts']
  });
  await npmciModNode.handleCli({
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
