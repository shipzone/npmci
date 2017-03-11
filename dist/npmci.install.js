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
    if (yield npmci_bash_1.nvmAvailable.promise) {
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
    yield configModule.getConfig()
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
                if (yield npmci_bash_1.yarnAvailable.promise) {
                    yield npmci_bash_1.bash(`yarn global add ${npmTool}`);
                }
                else {
                    yield npmci_bash_1.bash(`npm install ${npmTool} -q -g`);
                }
            }
        }
        plugins.beautylog.success('all global npm tools specified in npmextra.json are now available!');
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuaW5zdGFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEwQztBQUMxQywrQ0FBOEM7QUFDOUMsNkNBSXFDO0FBRXJDOzs7R0FHRztBQUNRLFFBQUEsT0FBTyxHQUFHLENBQU8sVUFBVTtJQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQTtJQUNsRSxJQUFJLE9BQWUsQ0FBQTtJQUNuQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsUUFBUSxDQUFBO0lBQ3BCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDaEMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNmLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sR0FBRyxVQUFVLENBQUE7SUFDdEIsQ0FBQztJQUFBLENBQUM7SUFDRixFQUFFLENBQUMsQ0FBQyxNQUFNLHlCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLGlCQUFJLENBQUMsZUFBZSxPQUFPLHlCQUF5QixPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ3BFLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQTtJQUNqRixDQUFDO0lBQUEsQ0FBQztJQUNGLE1BQU0saUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQTtJQUNyQixNQUFNLGlCQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDcEIsK0JBQStCO0lBQy9CLE1BQU0sWUFBWSxDQUFDLFNBQVMsRUFBRTtTQUMzQixJQUFJLENBQUMsQ0FBTSxTQUFTO1FBQ25CLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7UUFDcEUsR0FBRyxDQUFDLENBQUMsSUFBSSxPQUFPLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE9BQU8sR0FBRyxDQUFDLENBQUE7WUFDMUQsSUFBSSxXQUFXLEdBQVcsTUFBTSx3QkFBVyxDQUFDLFNBQVMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUMvRCxJQUFJLGFBQWEsR0FBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksV0FBVyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3RGLEVBQUUsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsT0FBTyxlQUFlLENBQUMsQ0FBQTtZQUN2RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdUJBQXVCLE9BQU8sV0FBVyxDQUFDLENBQUE7Z0JBQ2pFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxNQUFNLGlCQUFJLENBQUMsbUJBQW1CLE9BQU8sRUFBRSxDQUFDLENBQUE7Z0JBQzFDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sTUFBTSxpQkFBSSxDQUFDLGVBQWUsT0FBTyxRQUFRLENBQUMsQ0FBQTtnQkFDNUMsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsb0VBQW9FLENBQUMsQ0FBQTtJQUNqRyxDQUFDLENBQUEsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFBLENBQUEifQ==