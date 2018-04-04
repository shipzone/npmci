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
const plugins = require("./npmci.plugins");
const env = require("./npmci.env");
const smartanalytics_1 = require("smartanalytics");
exports.npmciAnalytics = new smartanalytics_1.Analytics({
    apiEndPoint: 'https://pubapi.lossless.one/analytics',
    projectId: 'gitzone',
    appName: 'npmci'
});
exports.run = () => __awaiter(this, void 0, void 0, function* () {
    exports.npmciAnalytics
        .recordEvent('npmToolExecution', {
        host: env.repo.host,
        user: env.repo.user,
        repo: env.repo.repo
    })
        .catch(err => {
        plugins.beautylog.warn('Lossless Analytics API not available...');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kubW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLm1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDJDQUEyQztBQUMzQyxtQ0FBbUM7QUFFbkMsbURBQTJDO0FBRWhDLFFBQUEsY0FBYyxHQUFHLElBQUksMEJBQVMsQ0FBQztJQUN4QyxXQUFXLEVBQUUsdUNBQXVDO0lBQ3BELFNBQVMsRUFBRSxTQUFTO0lBQ3BCLE9BQU8sRUFBRSxPQUFPO0NBQ2pCLENBQUMsQ0FBQztBQUVRLFFBQUEsR0FBRyxHQUFHLEdBQVMsRUFBRTtJQUMxQixzQkFBYztTQUNYLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRTtRQUMvQixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO1FBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7UUFDbkIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtLQUNwQixDQUFDO1NBQ0QsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ1gsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQztJQUNwRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQSxDQUFDIn0=