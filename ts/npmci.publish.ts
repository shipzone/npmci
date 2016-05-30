import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

let npmrcPrefix:string = "//registry.npmjs.org/:_authToken=";
let npmToken:string = process.env.NPMCITOKEN;
let npmrcFileString = npmrcPrefix + npmToken;


export let publish = () => {
    let done = plugins.q.defer();
    if(npmToken){
        plugins.beautylog.info("found access token");
    } else {
        plugins.beautylog.error("no access token found! Exiting!");
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString,{fileName:".npmrc",filePath:"$HOME"});
    bash("npm publish");
    plugins.beautylog.ok("Done!")
    return done.promise;
};