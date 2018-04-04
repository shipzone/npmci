"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartstring_1 = require("smartstring");
/**
 * a info instance about the git respoitory at cwd :)
 */
let repoString = process.env.CI_REPOSITORY_URL;
if (!repoString) {
    repoString = 'https://undefined:undefined@github.com/undefined/undefined.git';
}
exports.repo = new smartstring_1.GitRepo(repoString);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkNBQXNDO0FBR3RDOztHQUVHO0FBQ0gsSUFBSSxVQUFVLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztBQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDaEIsVUFBVSxHQUFHLGdFQUFnRSxDQUFDO0FBQ2hGLENBQUM7QUFDVSxRQUFBLElBQUksR0FBRyxJQUFJLHFCQUFPLENBQUMsVUFBVSxDQUFDLENBQUMifQ==