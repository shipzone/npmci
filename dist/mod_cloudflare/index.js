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
                plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
    }
});
exports.purge = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    npmciCflare.auth({
        email: '',
        key: ''
    });
    npmciCflare.purgeZone(argvArg._[1]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfY2xvdWRmbGFyZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEseUNBQXdDO0FBRXhDLElBQUksV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQTtBQUVwRDs7O0dBR0c7QUFDUSxRQUFBLFNBQVMsR0FBRyxDQUFPLE9BQU87SUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLE1BQU0sR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZjtnQkFDRSxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsTUFBTSxrQkFBa0IsQ0FBQyxDQUFBO1FBQ3BGLENBQUM7SUFDSCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyw0RUFBNEUsQ0FBQyxDQUFBO0lBQ3JHLENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVVLFFBQUEsS0FBSyxHQUFHLENBQU8sT0FBTztJQUMvQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2YsS0FBSyxFQUFFLEVBQUU7UUFDVCxHQUFHLEVBQUUsRUFBRTtLQUNSLENBQUMsQ0FBQTtJQUNGLFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQSxDQUFBIn0=