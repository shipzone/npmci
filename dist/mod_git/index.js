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
const npmci_bash_1 = require("../npmci.bash");
const npmci_env_1 = require("../npmci.env");
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'mirror':
                yield exports.mirror();
                break;
            default:
                plugins.beautylog.error(`>>npmci git ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci git ...<< cli arguments invalid... Please read the documentation.`);
    }
});
exports.mirror = () => __awaiter(this, void 0, void 0, function* () {
    let githubToken = process.env.NPMCI_GIT_GITHUBTOKEN;
    let githubUser = process.env.NPMCI_GIT_GITHUBGROUP || npmci_env_1.repo.user;
    let githubRepo = process.env.NPMCI_GIT_GITHUB || npmci_env_1.repo.repo;
    if (githubToken) {
        plugins.beautylog.info('found github token.');
        plugins.beautylog.log('attempting the mirror the repository to GitHub');
        // add the mirror
        yield npmci_bash_1.bash(`git remote add mirror https://${githubToken}@github.com/${githubUser}/${githubRepo}.git`);
        yield npmci_bash_1.bash(`git push mirror --all`);
        plugins.beautylog.ok('pushed all branches to mirror!');
        yield npmci_bash_1.bash(`git push mirror --tags`);
        plugins.beautylog.ok('pushed all tags to mirror!');
    }
    else {
        plugins.beautylog.error(`cannot find NPMCI_GIT_GITHUBTOKEN env var!`);
        process.exit(1);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZ2l0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsOENBQW9DO0FBQ3BDLDRDQUFtQztBQUVuQzs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxRQUFRO2dCQUNYLE1BQU0sY0FBTSxFQUFFLENBQUE7Z0JBQ2QsS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtRQUNuRixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQTtJQUNwRyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRyxHQUFTLEVBQUU7SUFDN0IsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQTtJQUNuRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixJQUFJLGdCQUFJLENBQUMsSUFBSSxDQUFBO0lBQy9ELElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksZ0JBQUksQ0FBQyxJQUFJLENBQUE7SUFDMUQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNoQixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxDQUFDLENBQUE7UUFDdkUsaUJBQWlCO1FBQ2pCLE1BQU0saUJBQUksQ0FBQyxpQ0FBaUMsV0FBVyxlQUFlLFVBQVUsSUFBSSxVQUFVLE1BQU0sQ0FBQyxDQUFBO1FBQ3JHLE1BQU0saUJBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO1FBQ25DLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFDdEQsTUFBTSxpQkFBSSxDQUFDLHdCQUF3QixDQUFDLENBQUE7UUFDcEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtJQUNwRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1FBQ3JFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakIsQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFBIn0=