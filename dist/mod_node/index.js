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
    yield npmciConfig.getConfig().then((configArg) => __awaiter(this, void 0, void 0, function* () {
        plugins.beautylog.log('Now checking for needed global npm tools...');
        for (let npmTool of configArg.npmGlobalTools) {
            plugins.beautylog.info(`Checking for global "${npmTool}"`);
            let whichOutput = yield npmci_bash_1.bashNoError(`which ${npmTool}`);
            let toolAvailable = !(/not\sfound/.test(whichOutput) || whichOutput === '');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2Rfbm9kZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNENBQTRDO0FBQzVDLCtDQUErQztBQUMvQyw4Q0FBK0U7QUFFL0U7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTSxPQUFPLEVBQUMsRUFBRTtJQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksTUFBTSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssU0FBUztnQkFDWixNQUFNLGVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNSO2dCQUNFLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLCtCQUErQixNQUFNLGtCQUFrQixDQUFDLENBQUM7Z0JBQ2pGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNILENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUNyQiw0RUFBNEUsQ0FDN0UsQ0FBQztRQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEIsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDO0FBRUY7OztHQUdHO0FBQ1EsUUFBQSxPQUFPLEdBQUcsQ0FBTSxVQUFVLEVBQUMsRUFBRTtJQUN0QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNuRSxJQUFJLE9BQWUsQ0FBQztJQUNwQixFQUFFLENB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