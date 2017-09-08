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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZ2l0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsOENBQW9DO0FBQ3BDLDRDQUFtQztBQUVuQzs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU87SUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBRSxDQUFBO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixLQUFLLFFBQVE7Z0JBQ1gsTUFBTSxjQUFNLEVBQUUsQ0FBQTtnQkFDZCxLQUFLLENBQUE7WUFDUDtnQkFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsTUFBTSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ25GLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQywyRUFBMkUsQ0FBQyxDQUFBO0lBQ3BHLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVVLFFBQUEsTUFBTSxHQUFHO0lBQ2xCLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUE7SUFDbkQsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsSUFBSSxnQkFBSSxDQUFDLElBQUksQ0FBQTtJQUMvRCxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLGdCQUFJLENBQUMsSUFBSSxDQUFBO0lBQzFELEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQTtRQUM3QyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsQ0FBQyxDQUFBO1FBQ3ZFLGlCQUFpQjtRQUNqQixNQUFNLGlCQUFJLENBQUMsaUNBQWlDLFdBQVcsZUFBZSxVQUFVLElBQUksVUFBVSxNQUFNLENBQUMsQ0FBQTtRQUNyRyxNQUFNLGlCQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtRQUNuQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFBO1FBQ3RELE1BQU0saUJBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFBO1FBQ3BDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUE7SUFDcEQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtRQUNyRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQSJ9