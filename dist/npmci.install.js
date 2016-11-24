"use strict";
require("typings-global");
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
            plugins.beautylog.info(`globally installing ${npmTool} from npm`);
            npmci_bash_1.bash(`npm install --loglevel=silent  -g ${npmTool}`);
        }
        done.resolve();
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBCQUF1QjtBQUN2QiwyQ0FBMEM7QUFDMUMsK0NBQThDO0FBQzlDLDZDQUFtQztBQUNuQyw2Q0FBMkM7QUFDaEMsUUFBQSxPQUFPLEdBQUcsQ0FBQyxVQUFVO0lBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDbEUsSUFBSSxPQUFlLENBQUE7SUFDbkIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUIsT0FBTyxHQUFHLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDakIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNqQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2pCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDeEIsQ0FBQztJQUFBLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyx5QkFBWSxDQUFDLENBQUMsQ0FBQztRQUNmLGlCQUFJLENBQUMsZUFBZSxPQUFPLHlCQUF5QixPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQzlELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUE7SUFDaEYsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQTtJQUNuRixDQUFDO0lBQUEsQ0FBQztJQUNGLGlCQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDZixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRWQsK0JBQStCO0lBQy9CLFlBQVksQ0FBQyxTQUFTLEVBQUU7U0FDbkIsSUFBSSxDQUFDLE1BQU07UUFDUixHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUN4QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsT0FBTyxXQUFXLENBQUMsQ0FBQTtZQUNqRSxpQkFBSSxDQUFDLHFDQUFxQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ3hELENBQUM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDbEIsQ0FBQyxDQUFDLENBQUE7SUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUN2QixDQUFDLENBQUEifQ==