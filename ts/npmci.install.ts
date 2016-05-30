import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let install = (versionArg) => {
    let done = plugins.q.defer();
    let version:string;
    if(versionArg = "lts"){
        version = "4";
    } else {
        version = versionArg;
    };
    plugins.beautylog.log("now installing " + "node ".green + ("version " + version).yellow);
    bash(
        "nvm install " + version +
        " nvm alias default " + version
    );
    plugins.beautylog.success("Node version " + version + " successfully installed!");
    plugins.shelljs.exec("node -v");
    plugins.shelljs.exec("npm -v");
    done.resolve();
    return done.promise;
}