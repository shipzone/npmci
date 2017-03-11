"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const configModule = require("./npmci.config");
const npmci_bash_1 = require("./npmci.bash");
const npmci_bash_2 = require("./npmci.bash");
/**
 * Install a specific version of node
 * @param versionArg
 */
exports.install = (versionArg) => __awaiter(this, void 0, void 0, function* () {
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
    if (yield npmci_bash_2.nvmAvailable.promise) {
        yield npmci_bash_1.bash(`nvm install ${version} && nvm alias default ${version}`);
        plugins.beautylog.success(`Node version ${version} successfully installed!`);
    }
    else {
        plugins.beautylog.warn('Nvm not in path so staying at installed node version!');
    }
    ;
    yield npmci_bash_1.bash('node -v');
    yield npmci_bash_1.bash('npm -v');
    // lets look for further config
    configModule.getConfig()
        .then((configArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.log('Now checking for needed global npm tools...');
        for (let npmTool of configArg.globalNpmTools) {
            plugins.beautylog.info(`Checking for global "${npmTool}"`);
            let whichOutput = yield npmci_bash_1.bashNoError(`which ${npmTool}`);
            let toolAvailable = !((/not\sfound/.test(whichOutput)) || whichOutput === '');
            if (toolAvailable) {
                plugins.beautylog.log(`Tool ${npmTool} is available`);
            }
            else {
                plugins.beautylog.info(`globally installing ${npmTool} from npm`);
                yield npmci_bash_1.bash(`npm install ${npmTool} -q -g`);
            }
        }
        plugins.beautylog.success('all global npm tools specified in npmextra.json are now available!');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsNkNBQWdEO0FBQ2hELDZDQUEyQztBQUUzQzs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLFVBQVU7SUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDbEUsSUFBSSxPQUFlLENBQUE7SUFDbkIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLFFBQVEsQ0FBQTtJQUNwQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDZixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDZixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLEdBQUcsVUFBVSxDQUFBO0lBQ3RCLENBQUM7SUFBQSxDQUFDO0lBQ0YsRUFBRSxDQUFDLENBQUMsTUFBTSx5QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDL0IsTUFBTSxpQkFBSSxDQUFDLGVBQWUsT0FBTyx5QkFBeUIsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNwRSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsT0FBTywwQkFBMEIsQ0FBQyxDQUFBO0lBQzlFLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHVEQUF1RCxDQUFDLENBQUE7SUFDakYsQ0FBQztJQUFBLENBQUM7SUFDRixNQUFNLGlCQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDckIsTUFBTSxpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3BCLCtCQUErQjtJQUMvQixZQUFZLENBQUMsU0FBUyxFQUFFO1NBQ3JCLElBQUksQ0FBQyxDQUFNLFNBQVM7UUFDbkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxJQUFJLFdBQVcsR0FBVyxNQUFNLHdCQUFXLENBQUMsU0FBUyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQy9ELElBQUksYUFBYSxHQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDdEYsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsT0FBTyxXQUFXLENBQUMsQ0FBQTtnQkFDakUsTUFBTSxpQkFBSSxDQUFDLGVBQWUsT0FBTyxRQUFRLENBQUMsQ0FBQTtZQUM1QyxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLG9FQUFvRSxDQUFDLENBQUE7SUFDakcsQ0FBQyxDQUFBLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQSxDQUFBIn0=