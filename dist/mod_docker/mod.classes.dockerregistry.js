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
class DockerRegistry {
    constructor(optionsArg) {
        this.registryUrl = optionsArg.registryUrl;
        this.username = optionsArg.username;
        this.password = optionsArg.password;
    }
    static fromEnvString(envString) {
        let dockerRegexResultArray = envString.split('|');
        if (dockerRegexResultArray.length !== 3) {
            plugins.beautylog.error('malformed docker env var...');
            process.exit(1);
            return;
        }
        let registryUrl = dockerRegexResultArray[0];
        let username = dockerRegexResultArray[1];
        let password = dockerRegexResultArray[2];
        return new DockerRegistry({
            registryUrl: registryUrl,
            username: username,
            password: password
        });
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.registryUrl === 'docker.io') {
                yield npmci_bash_1.bash(`docker login -u ${this.username} -p ${this.password}`);
                plugins.beautylog.info('Logged in to standard docker hub');
            }
            else {
                yield npmci_bash_1.bash(`docker login -u ${this.username} -p ${this.password} ${this.registryUrl}`);
            }
            plugins.beautylog.success(`docker authenticated for ${this.registryUrl}!`);
        });
    }
}
exports.DockerRegistry = DockerRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMuZG9ja2VycmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL21vZC5jbGFzc2VzLmRvY2tlcnJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsOENBQW9DO0FBUXBDO0lBSUUsWUFBYSxVQUE2QztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUE7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBRSxTQUFpQjtRQUNyQyxJQUFJLHNCQUFzQixHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDakQsRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtZQUN0RCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2YsTUFBTSxDQUFBO1FBQ1IsQ0FBQztRQUNELElBQUksV0FBVyxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzNDLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLElBQUksUUFBUSxHQUFHLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLGNBQWMsQ0FBQztZQUN4QixXQUFXLEVBQUUsV0FBVztZQUN4QixRQUFRLEVBQUUsUUFBUTtZQUNsQixRQUFRLEVBQUUsUUFBUTtTQUNuQixDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssS0FBSzs7WUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0saUJBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtnQkFDbEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsa0NBQWtDLENBQUMsQ0FBQTtZQUM1RCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxpQkFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsUUFBUSxPQUFPLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7WUFDeEYsQ0FBQztZQUNELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQTtRQUM1RSxDQUFDO0tBQUE7Q0FDRjtBQXBDRCx3Q0FvQ0MifQ==