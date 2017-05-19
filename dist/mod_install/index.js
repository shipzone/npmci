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
const plugins = require("./mod.plugins");
const configModule = require("../npmci.config");
const npmci_bash_1 = require("../npmci.bash");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfaW5zdGFsbC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBQ3hDLGdEQUErQztBQUMvQyw4Q0FJc0M7QUFFdEM7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTyxVQUFVO0lBQ3BDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQ2xFLElBQUksT0FBZSxDQUFBO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzVCLE9BQU8sR0FBRyxRQUFRLENBQUE7SUFDcEIsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNuQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2YsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxHQUFHLFVBQVUsQ0FBQTtJQUN0QixDQUFDO0lBQUEsQ0FBQztJQUNGLEVBQUUsQ0FBQyxDQUFDLE1BQU0seUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0saUJBQUksQ0FBQyxlQUFlLE9BQU8seUJBQXlCLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDcEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLE9BQU8sMEJBQTBCLENBQUMsQ0FBQTtJQUM5RSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1REFBdUQsQ0FBQyxDQUFBO0lBQ2pGLENBQUM7SUFBQSxDQUFDO0lBQ0YsTUFBTSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JCLE1BQU0saUJBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQiwrQkFBK0I7SUFDL0IsTUFBTSxZQUFZLENBQUMsU0FBUyxFQUFFO1NBQzNCLElBQUksQ0FBQyxDQUFNLFNBQVM7UUFDbkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxJQUFJLFdBQVcsR0FBVyxNQUFNLHdCQUFXLENBQUMsU0FBUyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQy9ELElBQUksYUFBYSxHQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDdEYsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsT0FBTyxXQUFXLENBQUMsQ0FBQTtnQkFDakUsRUFBRSxDQUFDLENBQUMsTUFBTSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0saUJBQUksQ0FBQyxtQkFBbUIsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDMUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLGlCQUFJLENBQUMsZUFBZSxPQUFPLFFBQVEsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFBO0lBQ2pHLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEsQ0FBQSJ9