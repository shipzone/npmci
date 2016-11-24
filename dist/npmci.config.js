"use strict";
const q = require("q");
const plugins = require("./npmci.plugins");
const paths = require("./npmci.paths");
exports.getConfig = () => {
    console.log('getting config');
    let done = q.defer();
    let npmciNpmextra = new plugins.npmextra.Npmextra(paths.cwd);
    let defaultConfig = {
        globalNpmTools: []
    };
    let npmciConfig = npmciNpmextra.dataFor('npmci', defaultConfig);
    done.resolve(npmciConfig);
    return done.promise;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1QkFBc0I7QUFFdEIsMkNBQTBDO0FBQzFDLHVDQUFzQztBQU0zQixRQUFBLFNBQVMsR0FBRztJQUNuQixPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDN0IsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBaUIsQ0FBQTtJQUNuQyxJQUFJLGFBQWEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM1RCxJQUFJLGFBQWEsR0FBa0I7UUFDL0IsY0FBYyxFQUFFLEVBQUU7S0FDckIsQ0FBQTtJQUNELElBQUksV0FBVyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQWdCLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQTtJQUM5RSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBQ3ZCLENBQUMsQ0FBQSJ9