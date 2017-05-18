import * as _modBuild from './mod_build/index'
import * as _modClean from './mod_clean/index'
import * as _modCommand from './mod_command/index'
import * as _modDocker from './mod_docker/index'
import * as _modInstall from './mod_install/index'
import * as _modPublish from './mod_publish/index'
import * as _modPrepare from './mod_prepare/index'
import * as _modTrigger from './mod_trigger/index'
import * as _modTest from './mod_test/index'

import { LazyModule } from 'smartsystem'

export let modBuild = new LazyModule<typeof _modBuild>('./mod_build/index', __dirname)
export let modClean = new LazyModule<typeof _modClean>('./mod_clean/index', __dirname)
export let modCommand = new LazyModule<typeof _modCommand>('./mod_command/index', __dirname)
export let modDocker = new LazyModule<typeof _modDocker>('./mod_docker/index', __dirname)
export let modInstall = new LazyModule<typeof _modInstall>('./mod_install/index', __dirname)
export let modPublish = new LazyModule<typeof _modPublish>('./mod_publish/index', __dirname)
export let modPrepare = new LazyModule<typeof _modPrepare>('./mod_prepare/index', __dirname)
export let modTrigger = new LazyModule<typeof _modTrigger>('./mod_trigger/index', __dirname)
export let modTest = new LazyModule<typeof _modTest>('./mod_test/index',__dirname)
