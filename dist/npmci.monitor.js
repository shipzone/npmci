"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./npmci.plugins");
const smartmonitor_1 = require("smartmonitor");
exports.npmciMonitor = new smartmonitor_1.Smartmonitor();
let monitorEnvString = process.env.NPMCI_MONITOR;
if (monitorEnvString) {
    let npmciMonitorKeys = monitorEnvString.split('|');
    exports.npmciMonitor.addInstrumental({
        apiKey: process.env.NPMCI_MONITOR
    });
    plugins.beautylog.info('Monitoring activated');
}
else {
    plugins.beautylog.warn('Monitoring could not be enabled due to missing API-KEY');
}
exports.npmciMonitor.increment('lossless-ci.builds', 1);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kubW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL25wbWNpLm1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwyQ0FBMEM7QUFHMUMsK0NBQTJDO0FBRWhDLFFBQUEsWUFBWSxHQUFHLElBQUksMkJBQVksRUFBRSxDQUFBO0FBRTVDLElBQUksZ0JBQWdCLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUE7QUFFeEQsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0lBQ3JCLElBQUksZ0JBQWdCLEdBQWEsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzVELG9CQUFZLENBQUMsZUFBZSxDQUFDO1FBQzNCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWE7S0FDbEMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyx3REFBd0QsQ0FBQyxDQUFBO0FBQ2xGLENBQUM7QUFFRCxvQkFBWSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDLENBQUMsQ0FBQSJ9