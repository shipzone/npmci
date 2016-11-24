import 'typings-global'
import * as plugins from './npmci.plugins'
import {prepare} from './npmci.prepare'
import {bash} from './npmci.bash'
import * as NpmciEnv from './npmci.env'
import * as NpmciBuildDocker from './npmci.build.docker'

/**
 * type of supported services
 */
export type TPubService = 'npm' | 'docker';

/**
 * the main exported publish function.
 * @param pubServiceArg references targeted service to publish to 
 */
export let publish = (pubServiceArg: TPubService = 'npm') => {
    switch (pubServiceArg) {
        case 'npm':
            return publishNpm()
        case 'docker':
            return publishDocker()
    }
}

/**
 * tries to publish current cwd to NPM registry
 */
let publishNpm  = function(){
    let done = plugins.q.defer()
    prepare('npm')
        .then(function(){
            bash('npm publish')
            plugins.beautylog.ok('Done!') 
            done.resolve()
        })
   return done.promise
}

/**
 * tries to pubish current cwd to Docker registry
 */
let publishDocker = function(){
    let done = plugins.q.defer()
        NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.pushDockerfiles)
        .then(done.resolve)
    return done.promise
}
