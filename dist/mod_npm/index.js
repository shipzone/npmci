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
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'install':
                yield install();
                break;
            case 'prepare':
                yield prepare();
                break;
            case 'test':
                yield exports.test();
                break;
            case 'publish':
                yield publish();
                break;
            default:
                plugins.beautylog.error(`>>npmci npm ...<< action >>${action}<< not supported`);
                process.exit(1);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci npm ...<< cli arguments invalid... Please read the documentation.`);
        process.exit(1);
    }
});
/**
 * authenticates npm with token from env var
 */
let prepare = () => __awaiter(this, void 0, void 0, function* () {
    let npmrcPrefix = '//registry.npmjs.org/:_authToken=';
    let npmToken = process.env.NPMCI_TOKEN_NPM;
    let npmrcFileString = npmrcPrefix + npmToken;
    if (npmToken) {
        plugins.beautylog.info('found access token');
    }
    else {
        plugins.beautylog.error('no access token found! Exiting!');
        process.exit(1);
    }
    plugins.smartfile.memory.toFsSync(npmrcFileString, '/root/.npmrc');
    return;
});
let publish = () => __awaiter(this, void 0, void 0, function* () {
    let npmAccessCliString = ``;
    const config = yield configModule.getConfig();
    if (config.npmAccessLevel &&
        (config.npmAccessLevel === 'public' || config.npmAccessLevel === 'private')) {
        npmAccessCliString = `--access=${config.npmAccessLevel}`;
    }
    yield npmci_bash_1.bash(`npm publish ${npmAccessCliString}`);
});
let install = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now installing dependencies:');
    if (yield npmci_bash_1.yarnAvailable.promise) {
        yield npmci_bash_1.bash('yarn install');
    }
    else {
        yield npmci_bash_1.bash('npm install');
    }
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.info('now starting tests:');
    yield npmci_bash_1.bash('yarn test');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfbnBtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsZ0RBQWdEO0FBQ2hELDhDQUErRTtBQUUvRTs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFNLE9BQU8sRUFBQyxFQUFFO0lBQ3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxTQUFTO2dCQUNaLE1BQU0sT0FBTyxFQUFFLENBQUM7Z0JBQ2hCLEtBQUssQ0FBQztZQUNSLEtBQUssU0FBUztnQkFDWixNQUFNLE9BQU8sRUFBRSxDQUFDO2dCQUNoQixLQUFLLENBQUM7WUFDUixLQUFLLE1BQU07Z0JBQ1QsTUFBTSxZQUFJLEVBQUUsQ0FBQztnQkFDYixLQUFLLENBQUM7WUFDUixLQUFLLFNBQVM7Z0JBQ1osTUFBTSxPQUFPLEVBQUUsQ0FBQztnQkFDaEIsS0FBSyxDQUFDO1lBQ1I7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQztnQkFDaEYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ25CLDJFQUEyRSxDQUM1RSxDQUFDO1FBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFRjs7R0FFRztBQUNILElBQUksT0FBTyxHQUFHLEdBQVMsRUFBRTtJQUN2QixJQUFJLFdBQVcsR0FBVyxtQ0FBbUMsQ0FBQztJQUM5RCxJQUFJLFFBQVEsR0FBVyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztJQUNuRCxJQUFJLGVBQWUsR0FBVyxXQUFXLEdBQUcsUUFBUSxDQUFDO0lBQ3JELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDYixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7UUFDM0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNuRSxNQUFNLENBQUM7QUFDVCxDQUFDLENBQUEsQ0FBQztBQUVGLElBQUksT0FBTyxHQUFHLEdBQVMsRUFBRTtJQUN2QixJQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QyxFQUFFLENBQUMsQ0FDRCxNQUFNLENBQUMsY0FBYztRQUNyQixDQUFDLE1BQU0sQ0FBQyxjQUFjLEtBQUssUUFBUSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEtBQUssU0FBUyxDQUM1RSxDQUFDLENBQUMsQ0FBQztRQUNELGtCQUFrQixHQUFHLFlBQVksTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFDRCxNQUFNLGlCQUFJLENBQUMsZUFBZSxrQkFBa0IsRUFBRSxDQUFDLENBQUM7QUFDbEQsQ0FBQyxDQUFBLENBQUM7QUFFRixJQUFJLE9BQU8sR0FBRyxHQUF3QixFQUFFO0lBQ3RDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDdkQsRUFBRSxDQUFDLENBQUMsTUFBTSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEMsTUFBTSxpQkFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0saUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUM7QUFFUyxRQUFBLElBQUksR0FBRyxHQUF3QixFQUFFO0lBQzFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDOUMsTUFBTSxpQkFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFCLENBQUMsQ0FBQSxDQUFDIn0=