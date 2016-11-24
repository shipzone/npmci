import 'typings-test'
import * as should from 'should'
import * as path from 'path'

// set up environment
process.env.CI_BUILD_REPO = 'https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git'
process.env.NPMCI_SSHKEY_1 = 'hostString|somePrivKey|##'
process.env.NPMTS_TEST = 'true'
process.cwd = () => {
    return path.join(__dirname,'assets/')
}

// require NPMCI files
import npmci = require('../dist/index')
import NpmciBuildDocker = require('../dist/npmci.build.docker')
import NpmciPublish = require('../dist/npmci.publish')
import NpmciTest = require('../dist/npmci.test')
import NpmciSsh = require('../dist/npmci.ssh')


let dockerfile1: NpmciBuildDocker.Dockerfile
let dockerfile2: NpmciBuildDocker.Dockerfile
let sortableArray: NpmciBuildDocker.Dockerfile[]

describe('NPMCI',function(){
    describe('build.docker',function(){
        it('should return valid Dockerfiles',function(){
            dockerfile1 = new NpmciBuildDocker.Dockerfile({filePath: './Dockerfile', read: true})
            dockerfile2 = new NpmciBuildDocker.Dockerfile({filePath: './Dockerfile_sometag1', read: true})
            should(dockerfile1.version).equal('latest')
            should(dockerfile2.version).equal('sometag1')
        })

        it('should read a directory of Dockerfiles',function(done){
            NpmciBuildDocker.readDockerfiles()
                .then(function(readDockerfilesArrayArg: NpmciBuildDocker.Dockerfile[]){
                    should(readDockerfilesArrayArg[1].version).equal('sometag1')
                    sortableArray = readDockerfilesArrayArg
                    done()
                })
        })

        it('should sort an array of Dockerfiles',function(done){
            NpmciBuildDocker.sortDockerfiles(sortableArray)
                .then(function(sortedArrayArg: NpmciBuildDocker.Dockerfile[]){
                    console.log(sortedArrayArg)
                    done()
                })
        })

        it('should correctly chain Dockerfile handling', function(done){
            NpmciBuildDocker.build()
                .then(() => {
                    done()
                })
        })
    })

    describe('.publish.docker',function(){
        it('should publish all built Dockerfiles',function(done){
            NpmciPublish.publish('docker')
                .then(() => {
                    done()
                })
        })
    })

    describe('.test.npm',function(){
        it('should source nvm using bash and install a specific node version, then test it',function(done){
            NpmciTest.test('legacy')
                .then(() => {
                    return NpmciTest.test('lts')
                })
                .then(() => {
                    return NpmciTest.test('stable')
                })
                .then(() => {
                    done()
                })
        })
    })

    describe('test.docker',function(){
        it('should test dockerfiles',function(done){
            NpmciTest.test('docker')
                .then(() => {
                    done()
                })
        })
    })

    describe('npmci prepare ssh',function(){
        it('should pick up SSH keys',function(done){
            NpmciSsh.ssh()
                .then(() => {
                    done()
                })
        })
    })
})
