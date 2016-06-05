import "typings-global";
import * as plugins from "./npmci.plugins";
import {GitRepo} from "smartstring";
import {Dockerfile} from "./npmci.build.docker"

export let repo = new GitRepo(process.env.CI_BUILD_REPO);
export let dockerTestTag:string;
export let dockerReleaseTag:string;

export let dockerRegistry; // will be set by npmci.prepare
export let dockerImages;
export let dockerFiles:Dockerfile[];

