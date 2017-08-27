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
const lik_1 = require("lik");
class RegistryStorage {
    constructor() {
        this.objectMap = new lik_1.Objectmap();
        // Nothing here
    }
    addRegistry(registryArg) {
        this.objectMap.add(registryArg);
    }
    getRegistryByUrl(registryUrlArg) {
        return this.objectMap.find(registryArg => {
            return registryArg.registryUrl === registryUrlArg;
        });
    }
    loginAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.objectMap.forEach((registryArg) => __awaiter(this, void 0, void 0, function* () {
                yield registryArg.login();
            }));
            plugins.beautylog.success('logged in successfully into all available DockerRegistries!');
        });
    }
}
exports.RegistryStorage = RegistryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMucmVnaXN0cnlzdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMvbW9kX2RvY2tlci9tb2QuY2xhc3Nlcy5yZWdpc3RyeXN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHlDQUF3QztBQUN4Qyw2QkFBK0I7QUFJL0I7SUFFRTtRQURBLGNBQVMsR0FBRyxJQUFJLGVBQVMsRUFBa0IsQ0FBQTtRQUV6QyxlQUFlO0lBQ2pCLENBQUM7SUFFRCxXQUFXLENBQUUsV0FBMkI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELGdCQUFnQixDQUFFLGNBQXNCO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQ3BDLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLGNBQWMsQ0FBQTtRQUNuRCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFSyxRQUFROztZQUNaLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBTSxXQUFXO2dCQUM1QyxNQUFNLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUMzQixDQUFDLENBQUEsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNkRBQTZELENBQUMsQ0FBQTtRQUMxRixDQUFDO0tBQUE7Q0FDRjtBQXRCRCwwQ0FzQkMifQ==