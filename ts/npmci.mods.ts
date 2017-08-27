import * as _modClean from './mod_clean/index'
import * as _modCloudflare from './mod_cloudflare/index'
import * as _modCommand from './mod_command/index'
import * as _modDocker from './mod_docker/index'
import * as _modNpm from './mod_npm/index'
import * as _modNode from './mod_node/index'
import * as _modSsh from './mod_ssh/index'
import * as _modTrigger from './mod_trigger/index'

import { LazyModule } from 'smartsystem'

export let modClean = new LazyModule<typeof _modClean>('./mod_clean/index', __dirname)
export let modCloudflare = new LazyModule<typeof _modCloudflare>('./mod_cloudflare/index', __dirname)
export let modCommand = new LazyModule<typeof _modCommand>('./mod_command/index', __dirname)
export let modDocker = new LazyModule<typeof _modDocker>('./mod_docker/index', __dirname)
export let modNode = new LazyModule<typeof _modNode>('./mod_node/index', __dirname)
export let modNpm = new LazyModule<typeof _modNpm>('./mod_npm/index', __dirname)
export let modSsh = new LazyModule<typeof _modSsh>('./mod_ssh/index', __dirname)
export let modTrigger = new LazyModule<typeof _modTrigger>('./mod_trigger/index', __dirname)
