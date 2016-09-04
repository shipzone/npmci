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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuc2VydmV6b25lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuc2VydmV6b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRTNDOzs7R0FHRztBQUNILElBQUksY0FBYyxHQUFHLG1CQUFtQixDQUFDO0FBRXpDOztHQUVHO0FBQ0gsSUFBSSx5QkFBeUIsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFakY7O0dBRUc7QUFDSCxJQUFJLG1DQUFtQyxHQUFHO0lBQ3RDLEtBQUssRUFBRSxPQUFPO0lBQ2QsUUFBUSxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFJLEVBQUUsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksRUFBRSxJQUFJO0lBQ1YsR0FBRyxFQUFFLHlCQUF5QixDQUFDLENBQUMsQ0FBQztDQUNwQyxDQUFDO0FBRUY7O0dBRUc7QUFDUSxXQUFHLEdBQUcsQ0FBQyxTQUFTO0lBQ3ZCLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FDckMsbUNBQW1DLENBQ3RDLENBQUM7QUFDTixDQUFDLENBQUMifQ==