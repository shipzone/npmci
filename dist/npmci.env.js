"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths = require("./npmci.paths");
const smartstring_1 = require("smartstring");
const projectinfo_1 = require("projectinfo");
if (process.env.CI_REPOSITORY_URL) {
    exports.repo = new smartstring_1.GitRepo(process.env.CI_REPOSITORY_URL);
}
/**
 * Info about the project at cwd
 */
exports.cwdProjectInfo = new projectinfo_1.ProjectInfo(paths.cwd);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsdUNBQXNDO0FBQ3RDLDZDQUFxQztBQUNyQyw2Q0FBeUM7QUFPekMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEMsWUFBSSxHQUFHLElBQUkscUJBQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7QUFDbkQsQ0FBQztBQUVEOztHQUVHO0FBQ1EsUUFBQSxjQUFjLEdBQUcsSUFBSSx5QkFBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQSJ9