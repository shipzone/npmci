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
                process.exit(1);
        }
    }
    else {
        plugins.beautylog.error(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
        process.exit(1);
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
        version = '8';
    }
    else if (versionArg === 'legacy') {
        version = '8';
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
        for (let npmTool of configArg.npmGlobalTools) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2Rfbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTJDO0FBQzNDLCtDQUE4QztBQUM5Qyw4Q0FLc0I7QUFFdEI7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTyxPQUFPLEVBQUUsRUFBRTtJQUN2QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixNQUFNLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzNCLEtBQUssQ0FBQTtZQUNQO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLCtCQUErQixNQUFNLGtCQUFrQixDQUFDLENBQUE7Z0JBQ2hGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDRFQUE0RSxDQUFDLENBQUE7UUFDckcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNqQixDQUFDO0FBRUgsQ0FBQyxDQUFBLENBQUE7QUFFRDs7O0dBR0c7QUFDUSxRQUFBLE9BQU8sR0FBRyxDQUFPLFVBQVUsRUFBRSxFQUFFO0lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLCtCQUErQixVQUFVLEVBQUUsQ0FBQyxDQUFBO0lBQ2xFLElBQUksT0FBZSxDQUFBO0lBQ25CLEVBQUUsQ0FB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