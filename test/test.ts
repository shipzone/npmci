import { tap, expect } from 'tapbundle'
import * as path from 'path'

// set up environment
process.env.CI_REPOSITORY_URL = 'https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git'
process.env.NPMCI_SSHKEY_1 = 'hostString|somePrivKey|##'
process.env.NPMTS_TEST = 'true'
process.cwd = () => {
  return path.join(__dirname, 'assets/')
}

// require NPMCI files
import '../dist/index'
import NpmciBuildDocker = require('../dist/mod_docker/index')
import NpmciPublish = require('../dist/mod_publish/index')
import NpmciTest = require('../dist/mod_test/index')
import NpmciSsh = require('../dist/npmci.ssh')

let dockerfile1: NpmciBuildDocker.Dockerfile
let dockerfile2: NpmciBuildDocker.Dockerfile
let sortableArray: NpmciBuildDocker.Dockerfile[]


tap.test('should return valid Dockerfiles', async () => {
  dockerfile1 = new NpmciBuildDocker.Dockerfile({ filePath: './Dockerfile', read: true })
  dockerfile2 = new NpmciBuildDocker.Dockerfile({ filePath: './Dockerfile_sometag1', read: true })
  expect(dockerfile1.version).to.equal('latest')
  return expect(dockerfile2.version).to.equal('sometag1')
})

tap.test('should read a directory of Dockerfiles', async () => {
  return NpmciBuildDocker.readDockerfiles()
    .then(async (readDockerfilesArrayArg: NpmciBuildDocker.Dockerfile[]) => {
      sortableArray = readDockerfilesArrayArg
      return expect(readDockerfilesArrayArg[ 1 ].version).to.equal('sometag1')
    })
})

tap.test('should sort an array of Dockerfiles', async () => {
  return NpmciBuildDocker.sortDockerfiles(sortableArray)
    .then(async (sortedArrayArg: NpmciBuildDocker.Dockerfile[]) => {
      console.log(sortedArrayArg)
    })
})

tap.test('should correctly chain Dockerfile handling', async () => {
  return NpmciBuildDocker.build()
})

tap.test('should publish all built Dockerfiles', async () => {
  return NpmciPublish.publish('docker')
})

tap.test('should source nvm using bash and install a specific node version, then test it', async () => {
  return NpmciTest.test('legacy')
    .then(() => {
      return NpmciTest.test('lts')
    })
    .then(() => {
      return NpmciTest.test('stable')
    })
})

tap.test('should test dockerfiles', async () => {
  return NpmciTest.test('docker')
})

tap.test('should pick up SSH keys', async () => {
  return NpmciSsh.ssh()
})

tap.test('reset paths', async () => {
  process.cwd = () => {
    return path.join(__dirname, '../')
  }
})

tap.start()
