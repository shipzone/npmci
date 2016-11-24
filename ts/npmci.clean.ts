import * as plugins from "./npmci.plugins";
import * as paths from "./npmci.paths"

/**
 * cleans npmci config files
 */
export let clean = () => {
    let done = plugins.q.defer();
    plugins.smartfile.fs.removeSync(paths.NpmciPackageConfig);
    done.resolve();
    return done.promise;
};