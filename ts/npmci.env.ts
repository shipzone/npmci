import "typings-global";
import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
import {GitRepo} from "smartstring";
import {Dockerfile} from "./npmci.build.docker"

export let repo:GitRepo = new GitRepo(process.env.CI_BUILD_REPO);

export let buildStage:string = process.env.CI_BUILD_STAGE;

// handling config between commands
export let dockerRegistry; // will be set by npmci.prepare
export let dockerFilesBuilt:Dockerfile[] = [];
export let dockerFiles:Dockerfile[] = [];

export let config;

export let configLoad = () => {
    config = plugins.smartfile.local.toObjectSync(paths.NpmciPackageConfig,"json");
    config.dockerRegistry ? dockerRegistry = config.dockerRegistry : void(0);
    config.dockerFilesBuilt ? dockerFilesBuilt = config.dockerFilesBuilt : void(0);
}

export let configStore = () => {
    
}