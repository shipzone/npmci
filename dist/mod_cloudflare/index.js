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
let npmciCflare = new plugins.cflare.CflareAccount();
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            default:
                plugins.beautylog.error(`>>npmci cloudflare ...<< action >>${action}<< not supported`);
                process.exit(1);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci cloudflare ...<< cli arguments invalid... Please read the documentation.`);
        process.exit(1);
    }
});
exports.purge = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    npmciCflare.auth({
        email: '',
        key: ''
    });
    npmciCflare.purgeZone(argvArg._[1]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfY2xvdWRmbGFyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBRXhDLElBQUksV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUVwRDs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU8sRUFBRSxFQUFFO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2Y7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMscUNBQXFDLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtnQkFDdEYsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0ZBQWtGLENBQUMsQ0FBQTtRQUN6RyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pCLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVVLFFBQUEsS0FBSyxHQUFHLENBQU8sT0FBTyxFQUFFLEVBQUU7SUFDbkMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNmLEtBQUssRUFBRSxFQUFFO1FBQ1QsR0FBRyxFQUFFLEVBQUU7S0FDUixDQUFDLENBQUE7SUFDRixXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNyQyxDQUFDLENBQUEsQ0FBQSJ9