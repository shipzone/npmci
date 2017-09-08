"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartstring_1 = require("smartstring");
if (process.env.CI_REPOSITORY_URL) {
    exports.repo = new smartstring_1.GitRepo(process.env.CI_REPOSITORY_URL);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnBtY2kuZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvbnBtY2kuZW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsNkNBQXFDO0FBT3JDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLFlBQUksR0FBRyxJQUFJLHFCQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ25ELENBQUMifQ==