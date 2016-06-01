import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";

export let trigger = function(){
    let done = plugins.q.defer();
    plugins.beautylog.info("now running triggers");
    for(let i = 0; i < 100; i++){
        let iteratorString = i.toString();
        if(process.env["TRIGGER" + iteratorString]){
            plugins.beautylog.log("Found TRIGGER" + iteratorString);
            plugins.request.post(process.env["TRIGGER" + iteratorString]);
        }
    }
    done.resolve();
    return done.promise;
}