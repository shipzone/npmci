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
const plugins = require("../npmci.plugins");
const npmciConfig = require("../npmci.config");
const npmci_bash_1 = require("../npmci.bash");
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 3) {
        let action = argvArg._[1];
        switch (action) {
            case 'install':
                yield exports.install(argvArg._[2]);
                break;
            default:
                plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.error(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
    }
});
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
    if (yield npmci_bash_1.nvmAvailable.promise) {
        yield npmci_bash_1.bash(`nvm install ${version} && nvm alias default ${version}`);
        plugins.beautylog.success(`Node version ${version} successfully installed!`);
    }
    else {
        plugins.beautylog.warn('Nvm not in path so staying at installed node version!');
    }
    yield npmci_bash_1.bash('node -v');
    yield npmci_bash_1.bash('npm -v');
    // lets look for further config
    yield npmciConfig.getConfig()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2Rfbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTJDO0FBQzNDLCtDQUE4QztBQUM5Qyw4Q0FLc0I7QUFFdEI7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTyxPQUFPO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxTQUFTO2dCQUNaLE1BQU0sZUFBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDM0IsS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0JBQStCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtRQUNwRixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNEVBQTRFLENBQUMsQ0FBQTtJQUN2RyxDQUFDO0FBRUgsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLFVBQVU7SUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsK0JBQStCLFVBQVUsRUFBRSxDQUFDLENBQUE7SUFDbEUsSUFBSSxPQUFlLENBQUE7SUFDbkIsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsT0FBTyxHQUFHLFFBQVEsQ0FBQTtJQUNwQixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDZixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sR0FBRyxHQUFHLENBQUE7SUFDZixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLEdBQUcsVUFBVSxDQUFBO0lBQ3RCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLHlCQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUMvQixNQUFNLGlCQUFJLENBQUMsZUFBZSxPQUFPLHlCQUF5QixPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ3BFLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLGdCQUFnQixPQUFPLDBCQUEwQixDQUFDLENBQUE7SUFDOUUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsdURBQXVELENBQUMsQ0FBQTtJQUNqRixDQUFDO0lBQ0QsTUFBTSxpQkFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JCLE1BQU0saUJBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNwQiwrQkFBK0I7SUFDL0IsTUFBTSxXQUFXLENBQUMsU0FBUyxFQUFFO1NBQzFCLElBQUksQ0FBQyxDQUFNLFNBQVM7UUFDbkIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtRQUNwRSxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUM3QyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsT0FBTyxHQUFHLENBQUMsQ0FBQTtZQUMxRCxJQUFJLFdBQVcsR0FBVyxNQUFNLHdCQUFXLENBQUMsU0FBUyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1lBQy9ELElBQUksYUFBYSxHQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDdEYsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxPQUFPLGVBQWUsQ0FBQyxDQUFBO1lBQ3ZELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsT0FBTyxXQUFXLENBQUMsQ0FBQTtnQkFDakUsRUFBRSxDQUFDLENBQUMsTUFBTSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ2hDLE1BQU0saUJBQUksQ0FBQyxtQkFBbUIsT0FBTyxFQUFFLENBQUMsQ0FBQTtnQkFDMUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixNQUFNLGlCQUFJLENBQUMsZUFBZSxPQUFPLFFBQVEsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxvRUFBb0UsQ0FBQyxDQUFBO0lBQ2pHLENBQUMsQ0FBQSxDQUFDLENBQUE7QUFDTixDQUFDLENBQUEsQ0FBQSJ9