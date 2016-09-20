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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF3QjtBQUN4QiwyQ0FBMkM7QUFDM0MsNkNBQWtDO0FBQ2xDLG1EQUF3QztBQUV4Qyx5REFBeUQ7QUFFOUMsUUFBQSxJQUFJLEdBQUcsQ0FBQyxVQUFVO0lBQ3pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsRUFBRSxDQUFBLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDdkIsVUFBVSxFQUFFO2FBQ1AsSUFBSSxDQUFDO1lBQ0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osdUJBQU8sQ0FBQyxVQUFVLENBQUM7YUFDZCxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDYixJQUFJLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxlQUFlLEdBQUc7SUFDbEIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ3ZELGlCQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBO0FBRUQsSUFBSSxPQUFPLEdBQUc7SUFDVixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDOUMsaUJBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUN4QixDQUFDLENBQUE7QUFFRCxJQUFJLFVBQVUsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsZ0JBQWdCLENBQUMsZUFBZSxFQUFFO1NBQzdCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQztTQUMzQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDO1NBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=