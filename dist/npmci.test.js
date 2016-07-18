"use strict";
require("typings-global");
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
const npmci_install_1 = require("./npmci.install");
const NpmciBuildDocker = require("./npmci.build.docker");
exports.test = (versionArg) => {
    let done = plugins.q.defer();
    if (versionArg == "docker") {
        testDocker()
            .then(() => {
            done.resolve();
        });
    }
    else {
        npmci_install_1.install(versionArg)
            .then(npmDependencies)
            .then(npmTest)
            .then(() => {
            done.resolve();
        });
    }
    return done.promise;
};
let npmDependencies = function () {
    let done = plugins.q.defer();
    plugins.beautylog.info("now installing dependencies:");
    npmci_bash_1.bash("npm install");
    done.resolve();
    return done.promise;
};
let npmTest = () => {
    let done = plugins.q.defer();
    plugins.beautylog.info("now starting tests:");
    npmci_bash_1.bash("npm test");
    done.resolve();
    return done.promise;
};
let testDocker = function () {
    let done = plugins.q.defer();
    NpmciBuildDocker.readDockerfiles()
        .then(NpmciBuildDocker.pullDockerfileImages)
        .then(NpmciBuildDocker.testDockerfiles)
        .then(done.resolve);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDZCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUNsQyxnQ0FBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUV4QyxNQUFZLGdCQUFnQixXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFFOUMsWUFBSSxHQUFHLENBQUMsVUFBVTtJQUN6QixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLEVBQUUsQ0FBQSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUMsQ0FBQSxDQUFDO1FBQ3ZCLFVBQVUsRUFBRTthQUNQLElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLHVCQUFPLENBQUMsVUFBVSxDQUFDO2FBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQzthQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ2IsSUFBSSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUVELElBQUksZUFBZSxHQUFHO0lBQ2xCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN2RCxpQkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQTtBQUVELElBQUksT0FBTyxHQUFHO0lBQ1YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzlDLGlCQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxVQUFVLEdBQUc7SUFDYixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLGdCQUFnQixDQUFDLGVBQWUsRUFBRTtTQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUM7U0FDM0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQztTQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQSJ9