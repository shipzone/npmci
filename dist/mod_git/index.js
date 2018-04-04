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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZ2l0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsOENBQXFDO0FBQ3JDLDRDQUFvQztBQUVwQzs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFNLE9BQU8sRUFBQyxFQUFFO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxRQUFRO2dCQUNYLE1BQU0sY0FBTSxFQUFFLENBQUM7Z0JBQ2YsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ25CLDJFQUEyRSxDQUM1RSxDQUFDO0lBQ0osQ0FBQztBQUNILENBQUMsQ0FBQSxDQUFDO0FBRVMsUUFBQSxNQUFNLEdBQUcsR0FBUyxFQUFFO0lBQzdCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUM7SUFDcEQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxnQkFBSSxDQUFDLElBQUksQ0FBQztJQUNoRSxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLGdCQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUM5QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1FBQ3hFLGlCQUFpQjtRQUNqQixNQUFNLGlCQUFJLENBQ1IsaUNBQWlDLFdBQVcsZUFBZSxVQUFVLElBQUksVUFBVSxNQUFNLENBQzFGLENBQUM7UUFDRixNQUFNLGlCQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ3ZELE1BQU0saUJBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDckQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQztRQUN0RSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQyJ9