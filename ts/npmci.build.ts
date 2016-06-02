import "typings-global";
import * as plugins from "./npmci.plugins";
import {bash} from "./npmci.bash";

export let build = function(commandArg){
    let done = plugins.q.defer();
    let repo = new plugins.smartstring.GitRepo(process.env.CI_BUILD_REPO);
    plugins.shelljs.exec("docker build -t " + repo.user + "/" + repo.repo + ":latest .");
    done.resolve();
    return done.promise;
}