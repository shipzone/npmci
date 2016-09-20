"use strict";
const plugins = require("./npmci.plugins");
/**
 * servezoneRegex is the regex that parses the servezone connection data
 * parses strings in the form of "servezone.example.com|3000|somepassword"
 */
let servezoneRegex = /^(.*)\|(.*)\|(.*)/;
/**
 * holds the results of the parsed servezone env string
 */
let servezoneRegexResultArray = servezoneRegex.exec(process.env.NPMCI_SERVEZONE);
/**
 * the data object that is used for the smartsocket client object
 */
let smartsocketClientConstructorOptions = {
    alias: "npmci",
    password: servezoneRegexResultArray[3],
    port: parseInt(servezoneRegexResultArray[2]),
    role: "ci",
    url: servezoneRegexResultArray[1]
};
/**
 * the main run function to submit a service to a servezone
 */
exports.run = (configArg) => {
    new plugins.smartsocket.SmartsocketClient(smartsocketClientConstructorOptions);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc2VydmV6b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc2VydmV6b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwyQ0FBMkM7QUFFM0M7OztHQUdHO0FBQ0gsSUFBSSxjQUFjLEdBQUcsbUJBQW1CLENBQUM7QUFFekM7O0dBRUc7QUFDSCxJQUFJLHlCQUF5QixHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUVqRjs7R0FFRztBQUNILElBQUksbUNBQW1DLEdBQUc7SUFDdEMsS0FBSyxFQUFFLE9BQU87SUFDZCxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUksRUFBRSxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxFQUFFLElBQUk7SUFDVixHQUFHLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO0NBQ3BDLENBQUM7QUFFRjs7R0FFRztBQUNRLFFBQUEsR0FBRyxHQUFHLENBQUMsU0FBUztJQUN2QixJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQ3JDLG1DQUFtQyxDQUN0QyxDQUFDO0FBQ04sQ0FBQyxDQUFDIn0=