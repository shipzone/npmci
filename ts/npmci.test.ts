import 'typings-global'
import * as plugins from './npmci.plugins'
import {bash} from './npmci.bash'
import {install} from './npmci.install'
import * as env from './npmci.env'
import * as NpmciBuildDocker from './npmci.build.docker'

export let test = (versionArg) => {
    let done = plugins.q.defer()
    if (versionArg === 'docker') {
        testDocker()
            .then(() => {
                done.resolve()
            })
    } else {
        install(versionArg)
            .then(npmDependencies)
            .then(npmTest)
            .then(() => {
                done.resolve()
            })
    }
    return done.promise
}

let npmDependencies = function(){
    let done = plugins.q.defer()
    plugins.beautylog.info('now installing dependencies:')
    bash('npm install')
    done.resolve()
    return done.promise
}

let npmTest = () => {
    let done = plugins.q.defer()
    plugins.beautylog.info('now starting tests:')
    bash('npm test')
    done.resolve()
    return done.promise
}

let testDocker = function(){
    let done = plugins.q.defer()
    NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.testDockerfiles)
        .then(done.resolve)
    return done.promise
}

