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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsNkNBQWdEO0FBQ2hELDZDQUEyQztBQUNoQyxRQUFBLE9BQU8sR0FBRyxDQUFDLFVBQVU7SUFDOUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxJQUFJLE9BQWUsQ0FBQTtJQUNuQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsUUFBUSxDQUFBO0lBQ3BCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDdEIsQ0FBQztJQUFBLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyx5QkFBWSxDQUFDLENBQUMsQ0FBQztRQUNqQixpQkFBSSxDQUFDLGVBQWUsT0FBTyx5QkFBeUIsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUM5RCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsT0FBTywwQkFBMEIsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUE7SUFDakYsQ0FBQztJQUFBLENBQUM7SUFDRixpQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2YsaUJBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNkLCtCQUErQjtJQUMvQixZQUFZLENBQUMsU0FBUyxFQUFFO1NBQ3JCLElBQUksQ0FBQyxTQUFTO1FBQ2IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxJQUFJLFdBQVcsR0FBRyx3QkFBVyxDQUFDLFNBQVMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUNqRCxJQUFJLGFBQWEsR0FBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3RGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsT0FBTyxlQUFlLENBQUMsQ0FBQTtZQUN2RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLE9BQU8sV0FBVyxDQUFDLENBQUE7Z0JBQ2pFLGlCQUFJLENBQUMsZUFBZSxPQUFPLFFBQVEsQ0FBQyxDQUFBO1lBQ3RDLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtRQUMvRixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtBQUNyQixDQUFDLENBQUEifQ==