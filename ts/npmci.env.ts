import "typings-global";
import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths";
import {GitRepo} from "smartstring";
import {Dockerfile} from "./npmci.build.docker"

export let repo:GitRepo;
if(process.env.CI_BUILD_REPO) repo = new GitRepo(process.env.CI_BUILD_REPO);

export let buildStage:string = process.env.CI_BUILD_STAGE;

// handling config between commands
export let dockerRegistry; // will be set by npmci.prepare
export let dockerFilesBuilt:Dockerfile[] = [];
export let dockerFiles:Dockerfile[] = [];
export let config;

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

let configLoad = () => {
    // internal config to transfer information in between npmci shell calls
    try {
        config = plugins.smartfile.fs.toObjectSync(paths.NpmciPackageConfig,"json");
    }
    catch(err){
        config = {};
        configStore();
        plugins.beautylog.log("config initialized!");
    }

    // project config
    try {
        if(!config.project){
            config.project = plugins.smartfile.fs.toObjectSync(paths.NpmciProjectDir,"npmci.json");
            plugins.beautylog.ok("project config found!");
        };
    }
    catch(err){
        config.project = {};
        plugins.beautylog.log("no project config found, so proceeding with default behaviour!");
    }
    
    config.dockerRegistry ? dockerRegistry = config.dockerRegistry : void(0);
    config.dockerFilesBuilt ? dockerFilesBuilt = config.dockerFilesBuilt : void(0);
}
configLoad();