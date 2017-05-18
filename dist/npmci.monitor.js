"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const smartmonitor_1 = require("smartmonitor");
exports.npmciMonitor = new smartmonitor_1.Smartmonitor();
if (process.env.SMARTMONITOR) {
    exports.npmciMonitor.addInstrumental({
        apiKey: process.env.SMARTMONITOR
    });
    plugins.beautylog.info('Monitoring activated');
}
else {
    plugins.beautylog.warn('Monitoring could not be enabled due to missing API-KEY');
}
exports.npmciMonitor.increment('lossless-ci.builds', 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kubW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLm1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMEM7QUFHMUMsK0NBQTJDO0FBRWhDLFFBQUEsWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFBO0FBRTVDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM1QixvQkFBWSxDQUFDLGVBQWUsQ0FBQztRQUMzQixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZO0tBQ2pDLENBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUE7QUFDaEQsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsd0RBQXdELENBQUMsQ0FBQTtBQUNsRixDQUFDO0FBRUQsb0JBQVksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDLENBQUEifQ==