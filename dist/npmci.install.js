"use strict";
const plugins = require("./npmci.plugins");
const configModule = require("./npmci.config");
const npmci_bash_1 = require("./npmci.bash");
const npmci_bash_2 = require("./npmci.bash");
exports.install = (versionArg) => {
    let done = plugins.q.defer();
    plugins.beautylog.log(`now installing node version ${versionArg}`);
    let version;
    if (versionArg === 'stable') {
        version = 'stable';
    }
    else if (versionArg === 'lts') {
        version = '6';
    }
    else if (versionArg === 'legacy') {
        version = '6';
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
        plugins.beautylog.warn('Nvm not in path so staying at installed node version!');
    }
    ;
    npmci_bash_1.bash('node -v');
    npmci_bash_1.bash('npm -v');
    // lets look for further config
    configModule.getConfig()
        .then(config => {
        for (let npmTool of config.globalNpmTools) {
            let whichOutput = npmci_bash_1.bash(`which ${npmTool}`);
            let toolAvailable = !(/not found/.test(whichOutput));
            if (toolAvailable) {
                plugins.beautylog.log(`Tool ${npmTool} is available`);
            }
            else {
                plugins.beautylog.info(`globally installing ${npmTool} from npm`);
                npmci_bash_1.bash(`npm install -q -g ${npmTool}`);
            }
        }
        done.resolve();
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsNkNBQW1DO0FBQ25DLDZDQUEyQztBQUNoQyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQVU7SUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxJQUFJLE9BQWUsQ0FBQTtJQUNuQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFBO0lBQ3RCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDakIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxHQUFHLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBQUEsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2YsaUJBQUksQ0FBQyxlQUFlLE9BQU8seUJBQXlCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0lBQ25GLENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNmLGlCQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFZCwrQkFBK0I7SUFDL0IsWUFBWSxDQUFDLFNBQVMsRUFBRTtTQUNuQixJQUFJLENBQUMsTUFBTTtRQUNSLEdBQUcsQ0FBQyxDQUFDLElBQUksT0FBTyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksV0FBVyxHQUFHLGlCQUFJLENBQUMsU0FBUyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQzFDLElBQUksYUFBYSxHQUFZLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7WUFDN0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1lBQ3pELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsT0FBTyxXQUFXLENBQUMsQ0FBQTtnQkFDakUsaUJBQUksQ0FBQyxxQkFBcUIsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1FBQ0wsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNsQixDQUFDLENBQUMsQ0FBQTtJQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSJ9