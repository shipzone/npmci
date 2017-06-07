import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot)
plugins.beautylog.log('npmci version: ' + npmciInfo.version)

import * as NpmciEnv from './npmci.env'

import * as npmciMods from './npmci.mods'

let smartcli = new plugins.smartcli.Smartcli()
smartcli.addVersion(npmciInfo.version)

// build
smartcli.addCommand('build')
  .then(async (argv) => {
    let modBuild = await npmciMods.modBuild.load()
    await modBuild.build(argv._[1])
    NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// clean
smartcli.addCommand('clean')
  .then(async (argv) => {
    let modClean = await npmciMods.modClean.load()
    await modClean.clean()
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// command
smartcli.addCommand('command')
  .then(async (argv) => {
    let modCommand = await npmciMods.modCommand.load()
    await modCommand.command()
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// purge
smartcli.addCommand('purge')
  .then(async (argvArg) => {
    let modPurge = await npmciMods.modPurge.load()
    await modPurge.purge(argvArg)
  }).catch(err => {
    console.log(err)
  })

// install
smartcli.addCommand('install')
  .then(async (argv) => {
    let modInstall = await npmciMods.modInstall.load()
    await modInstall.install(argv._[1])
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// prepare
smartcli.addCommand('prepare')
  .then(async (argv) => {
    let modPrepare = await npmciMods.modPrepare.load()
    await modPrepare.prepare(argv._[1])
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// publish
smartcli.addCommand('publish')
  .then(async (argv) => {
    let modPublish = await npmciMods.modPublish.load()
    await modPublish.publish(argv._[1])
    await NpmciEnv.configStore()

  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// test
smartcli.addCommand('test')
  .then(async (argv) => {
    let modTest = await npmciMods.modTest.load()
    await modTest.test(argv._[1])
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// trigger
smartcli.addCommand('trigger')
  .then(async (argv) => {
    let modTrigger = await npmciMods.modTrigger.load()
    await modTrigger.trigger()
    await NpmciEnv.configStore()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

smartcli.startParse()
