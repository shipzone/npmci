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
        .then(configArg => {
        plugins.beautylog.log('Now checking for needed global npm tools...');
        for (let npmTool of configArg.globalNpmTools) {
            plugins.beautylog.info(`Checking for global "${npmTool}"`);
            let whichOutput = npmci_bash_1.bashNoError(`which ${npmTool}`);
            let toolAvailable = !((/not\sfound/.test(whichOutput)) || whichOutput === '');
            if (toolAvailable) {
                plugins.beautylog.log(`Tool ${npmTool} is available`);
            }
            else {
                plugins.beautylog.info(`globally installing ${npmTool} from npm`);
                npmci_bash_1.bash(`npm install ${npmTool} -q -g`);
            }
        }
        plugins.beautylog.success('all global npm tools specified in npmextra.json are now available!');
        done.resolve();
    });
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsNkNBQWdEO0FBQ2hELDZDQUEyQztBQUNoQyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQVU7SUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxJQUFJLE9BQWUsQ0FBQTtJQUNuQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMxQixPQUFPLEdBQUcsUUFBUSxDQUFBO0lBQ3RCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ2pDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDakIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ0osT0FBTyxHQUFHLFVBQVUsQ0FBQTtJQUN4QixDQUFDO0lBQUEsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLHlCQUFZLENBQUMsQ0FBQyxDQUFDO1FBQ2YsaUJBQUksQ0FBQyxlQUFlLE9BQU8seUJBQXlCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDOUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQTtJQUNoRixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0lBQ25GLENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNmLGlCQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDZCwrQkFBK0I7SUFDL0IsWUFBWSxDQUFDLFNBQVMsRUFBRTtTQUNuQixJQUFJLENBQUMsU0FBUztRQUNYLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE9BQU8sR0FBRyxDQUFDLENBQUE7WUFDMUQsSUFBSSxXQUFXLEdBQUcsd0JBQVcsQ0FBQyxTQUFTLE9BQU8sRUFBRSxDQUFDLENBQUE7WUFDakQsSUFBSSxhQUFhLEdBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLFdBQVcsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUN0RixFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLE9BQU8sZUFBZSxDQUFDLENBQUE7WUFDekQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVCQUF1QixPQUFPLFdBQVcsQ0FBQyxDQUFBO2dCQUNqRSxpQkFBSSxDQUFDLGVBQWUsT0FBTyxRQUFRLENBQUMsQ0FBQTtZQUN4QyxDQUFDO1FBQ0wsQ0FBQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG9FQUFvRSxDQUFDLENBQUE7UUFDL0YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7QUFDdkIsQ0FBQyxDQUFBIn0=