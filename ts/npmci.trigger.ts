import "typings-global";
import * as plugins from "./npmci.plugins";
import {prepare} from "./npmci.prepare";
import {bash} from "./npmci.bash";

//Variables
let triggerEnvPrefix = "NPMCI_TRIGGER_";

export let trigger = function(){
    let done = plugins.q.defer();
    plugins.beautylog.info("now running triggers");
    let triggerRegex = /^([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)\|([a-zA-Z0-9\.]*)/;
    for(let i = 0; i < 100; i++){
        let iteratorString = i.toString();
        let triggerName = triggerEnvPrefix + iteratorString
        if(process.env[triggerName]){
            let triggerRegexResultArray = triggerRegex.exec(process.env[triggerName]);
            let regexDomain = triggerRegexResultArray[1];
            let regexProjectId = triggerRegexResultArray[2];
            let regexProjectTriggerToken = triggerRegexResultArray[3];
            let regexRefName = triggerRegexResultArray[4];
            plugins.beautylog.log("triggering build for ref " + regexRefName);
            plugins.beautylog.log("Found TRIGGER" + iteratorString);
            plugins.request.post("https://gitlab.com/api/v3/projects/" + regexProjectId + "/trigger/builds", {form:{token:regexProjectTriggerToken,ref:regexRefName}});
        }
    }
    done.resolve();
    return done.promise;
}