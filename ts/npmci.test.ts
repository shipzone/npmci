import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";
import {install} from "./npmci.install";
import * as env from "./npmci.env";

export let test = (versionArg) => {
    let done = plugins.q.defer();
    if(versionArg == "docker"){
        testDocker()
            .then(()=>{
                done.resolve();
            });
    } else {
        install(versionArg)
            .then(npmDependencies)
            .then(()=>{
                plugins.beautylog.info("now starting tests:");
                bash("npm test");
                plugins.beautylog.success("test finished");
                done.resolve();
            });
    }
    return done.promise;
}

let npmDependencies = function(){
    let done = plugins.q.defer();
    plugins.beautylog.info("now installing dependencies:");
    bash("npm install");
    done.resolve();
    return done.promise;
}

let testDocker = function(){
    let done = plugins.q.defer();
    
    done.resolve();
    return done.promise;
}

