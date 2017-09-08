"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const smartanalytics_1 = require("smartanalytics");
exports.npmciAnalytics = new smartanalytics_1.Analytics({
    apiEndPoint: 'https://pubapi-1.lossless.one/analytics',
    projectId: 'gitzone',
    appName: 'npmci'
});
exports.npmciAnalytics.recordEvent('npmToolExecution', {}).catch(err => {
    plugins.beautylog.warn('Lossless Analytics API not available...');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kubW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLm1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMEM7QUFHMUMsbURBQTBDO0FBRS9CLFFBQUEsY0FBYyxHQUFHLElBQUksMEJBQVMsQ0FBQztJQUN4QyxXQUFXLEVBQUUseUNBQXlDO0lBQ3RELFNBQVMsRUFBRSxTQUFTO0lBQ3BCLE9BQU8sRUFBRSxPQUFPO0NBQ2pCLENBQUMsQ0FBQTtBQUVGLHNCQUFjLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLEVBRTlDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRztJQUNWLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUE7QUFDbkUsQ0FBQyxDQUFDLENBQUEifQ==