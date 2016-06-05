import "typings-global";
import * as plugins from "./npmci.plugins";

export let cwd = process.cwd();

export let NpmciPackageRoot = plugins.path.join(__dirname,"../");#
export let NpmciPackageConfig = plugins.path.join(NpmciPackageRoot,"./config.json")