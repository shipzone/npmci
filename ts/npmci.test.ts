import "typings-global";
import * as plugins from "./npmci.plugins";
import {install} from "./npmci.install";
export let test = (versionArg) => {
    let done = plugins.q.defer();
    install(versionArg)
        .then(function(){
            plugins.beautylog.info("now starting tests:");
            plugins.shelljs.exec("npm test");
            plugins.beautylog.success("test finished");
            done.resolve();
        })
    return done.promise;
}