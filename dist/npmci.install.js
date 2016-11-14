"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
const npmci_bash_2 = require("./npmci.bash");
exports.install = (versionArg) => {
    let done = plugins.q.defer();
    plugins.beautylog.log(`now installing node version ${versionArg}`);
    let version;
    if (versionArg == "stable") {
        version = "stable";
    }
    else if (versionArg == "lts") {
        version = "--lts";
    }
    else if (versionArg == "legacy") {
        version = "6.6.0";
    }
    else {
        version = versionArg;
    }
    ;
    if (npmci_bash_2.nvmAvailable) {
        npmci_bash_1.bash(`nvm install ${version} && nvm alias default ${version}`);
        plugins.beautylog.success(`Node version ${version} successfully installed!`);
    }
    else {
        plugins.beautylog.warn("Nvm not in path so staying at installed node version!");
    }
    ;
    npmci_bash_1.bash("node -v");
    npmci_bash_1.bash("npm -v");
    done.resolve();
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFDM0MsNkNBQW9DO0FBQ3BDLDZDQUEyQztBQUVoQyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQVU7SUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNuRSxJQUFJLE9BQWUsQ0FBQztJQUNwQixFQUFFLENBQUMsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN6QixPQUFPLEdBQUcsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2YsaUJBQUksQ0FBQyxlQUFlLE9BQU8seUJBQXlCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=