"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
exports.install = (versionArg) => {
    let done = plugins.q.defer();
    plugins.beautylog.log("now installing " + "node ".green + ("version " + versionArg).yellow);
    let version;
    if (versionArg == "stable") {
        version = "6.3.0";
    }
    else if (versionArg == "lts") {
        version = "6.3.0";
    }
    else if (versionArg == "legacy") {
        version = "6.3.0";
    }
    else {
        version = versionArg;
    }
    ;
    npmci_bash_1.bash("nvm install " + version +
        " && nvm alias default " + version);
    plugins.beautylog.success("Node version " + version + " successfully installed!");
    npmci_bash_1.bash("node -v");
    npmci_bash_1.bash("npm -v");
    done.resolve();
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUcsQ0FBQyxVQUFVO0lBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RixJQUFJLE9BQWMsQ0FBQztJQUNuQixFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLENBQUEsQ0FBQztRQUN2QixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxDQUFBLENBQUM7UUFDM0IsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQzlCLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUFDLElBQUksQ0FBRSxDQUFDO1FBQ0wsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBQUEsQ0FBQztJQUNGLGlCQUFJLENBQ0EsY0FBYyxHQUFHLE9BQU87UUFDeEIsd0JBQXdCLEdBQUcsT0FBTyxDQUNyQyxDQUFDO0lBQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLE9BQU8sR0FBRywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2xGLGlCQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEIsaUJBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQSJ9