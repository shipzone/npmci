import * as _modClean from './mod_clean/index';
import * as _modCloudflare from './mod_cloudflare/index';
import * as _modCommand from './mod_command/index';
import * as _modDocker from './mod_docker/index';
import * as _modGit from './mod_git/index';
import * as _modNpm from './mod_npm/index';
import * as _modNode from './mod_node/index';
import * as _modSsh from './mod_ssh/index';
import * as _modTrigger from './mod_trigger/index';
import { LazyModule } from 'smartsystem';
export declare let modClean: LazyModule<typeof _modClean>;
export declare let modCloudflare: LazyModule<typeof _modCloudflare>;
export declare let modCommand: LazyModule<typeof _modCommand>;
export declare let modGit: LazyModule<typeof _modGit>;
export declare let modDocker: LazyModule<typeof _modDocker>;
export declare let modNode: LazyModule<typeof _modNode>;
export declare let modNpm: LazyModule<typeof _modNpm>;
export declare let modSsh: LazyModule<typeof _modSsh>;
export declare let modTrigger: LazyModule<typeof _modTrigger>;
