import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
import * as npmciMonitor from './npmci.monitor'
npmciMonitor.run()

// Get Info about npmci itself
let npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot)
plugins.beautylog.log('npmci version: ' + npmciInfo.version)

import * as NpmciEnv from './npmci.env'

import * as npmciMods from './npmci.mods'

let smartcli = new plugins.smartcli.Smartcli()
smartcli.addVersion(npmciInfo.version)

// clean
smartcli.addCommand('clean')
  .then(async (argv) => {
    let modClean = await npmciMods.modClean.load()
    await modClean.clean()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// cloudflare
smartcli.addCommand('cloudflare')
.then(async (argvArg) => {
  let modPurge = await npmciMods.modCloudflare.load()
  await modPurge.handleCli(argvArg)
}).catch(err => {
  console.log(err)
})

// command
smartcli.addCommand('command')
  .then(async (argv) => {
    let modCommand = await npmciMods.modCommand.load()
    await modCommand.command()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// command
smartcli.addCommand('git')
.then(async (argvArg) => {
  let modGit = await npmciMods.modGit.load()
  await modGit.handleCli(argvArg)
}).catch(err => {
  console.log(err)
  process.exit(1)
})

// build
smartcli.addCommand('docker')
  .then(async argvArg => {
    let modDocker = await npmciMods.modDocker.load()
    await modDocker.handleCli(argvArg)
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// node
smartcli.addCommand('node')
  .then(async (argvArg) => {
    let modNode = await npmciMods.modNode.load()
    await modNode.handleCli(argvArg)
  }).catch(err => {
    console.log(err)
  })

// npm
smartcli.addCommand('npm')
  .then(async (argvArg) => {
    let modNpm = await npmciMods.modNpm.load()
    await modNpm.handleCli(argvArg)
  }).catch(err => {
    console.log(err)
  })

// trigger
smartcli.addCommand('ssh')
  .then(async (argvArg) => {
    let modSsh = await npmciMods.modSsh.load()
    await modSsh.handleCli(argvArg)
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

// trigger
smartcli.addCommand('trigger')
  .then(async (argv) => {
    let modTrigger = await npmciMods.modTrigger.load()
    await modTrigger.trigger()
  }).catch(err => {
    console.log(err)
    process.exit(1)
  })

smartcli.startParse()
