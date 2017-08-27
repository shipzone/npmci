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
        });
    }
}
exports.RegistryStorage = RegistryStorage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMucmVnaXN0cnlzdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vdHMvbW9kX2RvY2tlci9tb2QuY2xhc3Nlcy5yZWdpc3RyeXN0b3JhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLDZCQUErQjtBQUkvQjtJQUVFO1FBREEsY0FBUyxHQUFHLElBQUksZUFBUyxFQUFrQixDQUFBO1FBRXpDLGVBQWU7SUFDakIsQ0FBQztJQUVELFdBQVcsQ0FBRSxXQUEyQjtRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsZ0JBQWdCLENBQUUsY0FBc0I7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFDcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEtBQUssY0FBYyxDQUFBO1FBQ25ELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLFFBQVE7O1lBQ1osTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFNLFdBQVc7Z0JBQzVDLE1BQU0sV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7Q0FDRjtBQXJCRCwwQ0FxQkMifQ==