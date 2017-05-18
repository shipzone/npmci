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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfY29tbWFuZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNkNBQW1DO0FBRXhCLFFBQUEsT0FBTyxHQUFHO0lBQ25CLElBQUksY0FBYyxHQUFXLEVBQUUsQ0FBQTtJQUMvQixJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzFDLGNBQWMsR0FBRyxjQUFjLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFBQyxjQUFjLEdBQUcsY0FBYyxHQUFHLEdBQUcsQ0FBQTtRQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNELE1BQU0saUJBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMxQixNQUFNLENBQUE7QUFDUixDQUFDLENBQUEsQ0FBQSJ9