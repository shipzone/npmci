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
        plugins.beautylog.info(`created DockerRegistry for ${this.registryUrl}`);
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
            plugins.beautylog.ok(`docker authenticated for ${this.registryUrl}!`);
        });
    }
}
exports.DockerRegistry = DockerRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMuZG9ja2VycmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL21vZC5jbGFzc2VzLmRvY2tlcnJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsOENBQXFDO0FBUXJDO0lBSUUsWUFBWSxVQUE2QztRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDMUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBaUI7UUFDcEMsSUFBSSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxXQUFXLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsSUFBSSxRQUFRLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDO1lBQ3hCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFSyxLQUFLOztZQUNULEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDckMsTUFBTSxpQkFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsUUFBUSxPQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzdELENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLGlCQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxRQUFRLE9BQU8sSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztZQUN6RixDQUFDO1lBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3hFLENBQUM7S0FBQTtDQUNGO0FBckNELHdDQXFDQyJ9