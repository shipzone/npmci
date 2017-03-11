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
const npmci_bash_1 = require("./npmci.bash");
exports.command = () => __awaiter(this, void 0, void 0, function* () {
    let wrappedCommand = '';
    let argvArray = process.argv;
    for (let i = 3; i < argvArray.length; i++) {
        wrappedCommand = wrappedCommand + argvArray[i];
        if (i + 1 !== argvArray.length) {
            wrappedCommand = wrappedCommand + ' ';
        }
    }
    yield npmci_bash_1.bash(wrappedCommand);
    return;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLmNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDZDQUFtQztBQUV4QixRQUFBLE9BQU8sR0FBRztJQUNuQixJQUFJLGNBQWMsR0FBVyxFQUFFLENBQUE7SUFDL0IsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUM1QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxQyxjQUFjLEdBQUcsY0FBYyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQUMsY0FBYyxHQUFHLGNBQWMsR0FBRyxHQUFHLENBQUE7UUFBQyxDQUFDO0lBQzNFLENBQUM7SUFDRCxNQUFNLGlCQUFJLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDMUIsTUFBTSxDQUFBO0FBQ1IsQ0FBQyxDQUFBLENBQUEifQ==