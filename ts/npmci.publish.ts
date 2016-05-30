import "typings-global";
import * as plugins from "./npmci.plugins";

let npmrcPrefix:string = "//registry.npmjs.org/:_authToken=";
let npmToken:string = process.env.NPMCITOKEN;
let npmrcFileString = npmrcPrefix + npmToken;


export let publish = () => {
    let done = plugins.q.defer();
    plugins.beautylog.ok("Tests passed, now publishing to npm!");
    plugins.smartfile.memory.toFs(npmrcFileString,{fileName:".npmrc",filePath:"/root/"});
    plugins.shelljs.exec("npm publish");
    plugins.beautylog.ok("Done!")
    return done.promise;
};