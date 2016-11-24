import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot)
plugins.beautylog.log('npmci version: ' + npmciInfo.version)

import {build} from './npmci.build'
import {clean} from './npmci.clean'
import {command} from './npmci.command'
import {install} from './npmci.install'
import {publish} from './npmci.publish'
import {prepare} from './npmci.prepare'
import {test} from './npmci.test'
import {trigger} from './npmci.trigger'
import * as NpmciEnv from './npmci.env'

export {build} from './npmci.build'
export {install} from './npmci.install';
export {publish} from './npmci.publish';

let smartcli = new plugins.smartcli.Smartcli()
smartcli.addVersion(npmciInfo.version)

// build
smartcli.addCommand({
    commandName: 'build'
}).then((argv) => {
    build(argv._[1])
        .then(NpmciEnv.configStore)
})

// clean
smartcli.addCommand({
    commandName: 'clean'
}).then((argv) => {
    clean()
        .then(NpmciEnv.configStore)
})

// command
smartcli.addCommand({
    commandName: 'command'
}).then((argv) => {
    command()
        .then(NpmciEnv.configStore)
})

// install
smartcli.addCommand({
    commandName: 'install'
}).then((argv) => {
    install(argv._[1])
        .then(NpmciEnv.configStore)
})

// prepare
smartcli.addCommand({
    commandName: 'prepare'
}).then((argv) => {
    prepare(argv._[1])
        .then(NpmciEnv.configStore)
})

// publish
smartcli.addCommand({
    commandName: 'publish'
}).then((argv) => {
    publish(argv._[1])
        .then(NpmciEnv.configStore)
})

// test
smartcli.addCommand({
    commandName: 'test'
}).then((argv) => {
    test(argv._[1])
        .then(NpmciEnv.configStore)
})

// trigger
smartcli.addCommand({
    commandName: 'trigger'
}).then((argv) => {
    trigger()
})

smartcli.startParse()
