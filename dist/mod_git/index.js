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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZ2l0L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFFeEM7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTyxPQUFPO0lBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBRSxDQUFDLENBQUUsQ0FBQTtRQUNuQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxRQUFRO2dCQUNYLE1BQU0sY0FBTSxFQUFFLENBQUE7Z0JBQ2QsS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsOEJBQThCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtRQUNuRixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkVBQTJFLENBQUMsQ0FBQTtJQUNwRyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFVSxRQUFBLE1BQU0sR0FBRztBQUVwQixDQUFDLENBQUEsQ0FBQSJ9