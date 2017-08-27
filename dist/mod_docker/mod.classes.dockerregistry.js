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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kLmNsYXNzZXMuZG9ja2VycmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL21vZC5jbGFzc2VzLmRvY2tlcnJlZ2lzdHJ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsOENBQW9DO0FBUXBDO0lBSUUsWUFBYSxVQUE2QztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUE7UUFDekMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFBO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQTtRQUNuQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUE7SUFDMUUsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUUsU0FBaUI7UUFDckMsSUFBSSxzQkFBc0IsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFDdEQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNmLE1BQU0sQ0FBQTtRQUNSLENBQUM7UUFDRCxJQUFJLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzQyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxJQUFJLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN4QyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUM7WUFDeEIsV0FBVyxFQUFFLFdBQVc7WUFDeEIsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVLLEtBQUs7O1lBQ1QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLGlCQUFJLENBQUMsbUJBQW1CLElBQUksQ0FBQyxRQUFRLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7Z0JBQ2xFLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGtDQUFrQyxDQUFDLENBQUE7WUFDNUQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0saUJBQUksQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFBO1lBQ3hGLENBQUM7WUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUE7UUFDdkUsQ0FBQztLQUFBO0NBQ0Y7QUFyQ0Qsd0NBcUNDIn0=