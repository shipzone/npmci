import "typings-global";
import * as plugins from "./npmci.plugins";
import {GitRepo} from "smartstring";
import {Dockerfile} from "./npmci.build.docker"

export let repo:GitRepo = new GitRepo(process.env.CI_BUILD_REPO);

export let buildStage:string = process.env.CI_BUILD_STAGE;

export let dockerRegistry; // will be set by npmci.prepare
export let dockerFilesBuilt:Dockerfile[] = [];
export let dockerFiles:Dockerfile[] = [];

