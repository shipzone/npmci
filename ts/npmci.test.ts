import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import {install} from "./npmci.install";
import * as env from "./npmci.env";

export let test = (versionArg) => {
    let done = plugins.q.defer();
    install(versionArg)
        .then(function(){
            plugins.beautylog.info("now installing dependencies:");
            bash("npm install");
            plugins.beautylog.info("now starting tests:");
            bash("npm test");
            plugins.beautylog.success("test finished");
            done.resolve();
        });
    return done.promise;
}