"use strict";
const plugins = require("./npmci.plugins");
const npmci_bash_1 = require("./npmci.bash");
const npmci_install_1 = require("./npmci.install");
const NpmciBuildDocker = require("./npmci.build.docker");
exports.test = (versionArg) => {
    let done = plugins.q.defer();
    if (versionArg === 'docker') {
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
    plugins.beautylog.info('now installing dependencies:');
    npmci_bash_1.bash('npm install');
    done.resolve();
    return done.promise;
};
let npmTest = () => {
    let done = plugins.q.defer();
    plugins.beautylog.info('now starting tests:');
    npmci_bash_1.bash('npm test');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQyw2Q0FBaUM7QUFDakMsbURBQXVDO0FBRXZDLHlEQUF3RDtBQUU3QyxRQUFBLElBQUksR0FBRyxDQUFDLFVBQVU7SUFDekIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxQixVQUFVLEVBQUU7YUFDUCxJQUFJLENBQUM7WUFDRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSix1QkFBTyxDQUFDLFVBQVUsQ0FBQzthQUNkLElBQUksQ0FBQyxlQUFlLENBQUM7YUFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNiLElBQUksQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNWLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFFRCxJQUFJLGVBQWUsR0FBRztJQUNsQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUE7SUFDdEQsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTtJQUNuQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUE7QUFFRCxJQUFJLE9BQU8sR0FBRztJQUNWLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUM3QyxpQkFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2hCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQTtBQUVELElBQUksVUFBVSxHQUFHO0lBQ2IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixnQkFBZ0IsQ0FBQyxlQUFlLEVBQUU7U0FDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDO1NBQzNDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUM7U0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==