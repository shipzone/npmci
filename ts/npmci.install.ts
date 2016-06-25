import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let install = (versionArg) => {
    let done = plugins.q.defer();
    plugins.beautylog.log("now installing " + "node ".green + ("version " + versionArg).yellow);
    let version:string;
    if(versionArg == "lts"){
        version = "4";
    } else if(versionArg == "legacy"){
        version = "0"
    } else {
        version = versionArg;
    };
    bash(
        "nvm install " + version +
        " && nvm alias default " + version
    );
    plugins.beautylog.success("Node version " + version + " successfully installed!");
    bash("node -v");
    bash("npm -v");
    done.resolve();
    return done.promise;
}