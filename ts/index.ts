import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot)
plugins.beautylog.log('npmci version: ' + npmciInfo.version)

import { build } from './npmci.build'
import { clean } from './npmci.clean'
import { command } from './npmci.command'
import { install } from './npmci.install'
import { publish } from './npmci.publish'
import { prepare } from './npmci.prepare'
import { test } from './npmci.test'
import { trigger } from './npmci.trigger'
import * as NpmciEnv from './npmci.env'

export { build } from './npmci.build'
export { install } from './npmci.install';
export { publish } from './npmci.publish';

let smartcli = new plugins.smartcli.Smartcli()
smartcli.addVersion(npmciInfo.version)

// build
smartcli.addCommand('build')
  .then((argv) => {
    build(argv._[ 1 ])
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// clean
smartcli.addCommand('clean')
  .then((argv) => {
    clean()
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// command
smartcli.addCommand('command')
  .then((argv) => {
    command()
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// install
smartcli.addCommand('install')
  .then((argv) => {
    install(argv._[ 1 ])
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// prepare
smartcli.addCommand('prepare')
  .then((argv) => {
    prepare(argv._[ 1 ])
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// publish
smartcli.addCommand('publish')
  .then((argv) => {
    publish(argv._[ 1 ])
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// test
smartcli.addCommand('test')
  .then((argv) => {
    test(argv._[ 1 ])
      .then(NpmciEnv.configStore)
      .catch(err => {
        console.log(err)
        process.exit(1)
      })
  })

// trigger
smartcli.addCommand('trigger')
  .then((argv) => {
    trigger()
  })

smartcli.startParse()
