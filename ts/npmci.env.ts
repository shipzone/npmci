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

export let configStore = () => {
    let config = {
        dockerRegistry: dockerRegistry,
        dockerFilesBuilt: dockerFilesBuilt,
        dockerFiles: dockerFiles
    }
    plugins.smartfile.memory.toFsSync(
        JSON.stringify(config),
        {
            fileName:"config.json",
            filePath:paths.NpmciPackageRoot
        }
    );
}

export let configLoad = () => {
    let config;
    try {
        config = plugins.smartfile.local.toObjectSync(paths.NpmciPackageConfig,"json");
    }
    catch(err){
        config = {};
        configStore();
        plugins.beautylog.log("config initialized!");
    }
    
    config.dockerRegistry ? dockerRegistry = config.dockerRegistry : void(0);
    config.dockerFilesBuilt ? dockerFilesBuilt = config.dockerFilesBuilt : void(0);
}
configLoad();