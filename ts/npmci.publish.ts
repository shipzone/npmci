import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

let npmrcPrefix:string = "//registry.npmjs.org/:_authToken=";
let npmToken:string = process.env.NPMCITOKEN;
let npmrcFileString = npmrcPrefix + npmToken;


export let publish = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ok("Tests passed, now publishing to npm!");
    plugins.smartfile.memory.toFs(npmrcFileString,{fileName:".npmrc",filePath:"/"});
    bash("npm publish");
    plugins.beautylog.ok("Done!")
    return done.promise;
};