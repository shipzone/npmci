"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var buildDocker = require("./npmci.build.docker");
exports.build = function (commandArg) {
    switch (commandArg) {
        case "docker":
            return buildDocker.build();
        default:
            plugins.beautylog.log("build target " + commandArg + " not recognised!");
    }
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmJ1aWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFDeEIsSUFBWSxPQUFPLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUczQyxJQUFZLFdBQVcsV0FBTSxzQkFFN0IsQ0FBQyxDQUZrRDtBQUV4QyxhQUFLLEdBQUcsVUFBUyxVQUFVO0lBQ2xDLE1BQU0sQ0FBQSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQUM7UUFDZixLQUFLLFFBQVE7WUFDVCxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQy9CO1lBQ0ksT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2pGLENBQUM7QUFDTCxDQUFDLENBQUEiLCJmaWxlIjoibnBtY2kuYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5pbXBvcnQge2Jhc2h9IGZyb20gXCIuL25wbWNpLmJhc2hcIjtcbmltcG9ydCAqIGFzIGVudiBmcm9tIFwiLi9ucG1jaS5lbnZcIjtcbmltcG9ydCAqIGFzIGJ1aWxkRG9ja2VyIGZyb20gXCIuL25wbWNpLmJ1aWxkLmRvY2tlclwiXG5cbmV4cG9ydCBsZXQgYnVpbGQgPSBmdW5jdGlvbihjb21tYW5kQXJnKXtcbiAgICBzd2l0Y2goY29tbWFuZEFyZyl7XG4gICAgICAgIGNhc2UgXCJkb2NrZXJcIjpcbiAgICAgICAgICAgIHJldHVybiBidWlsZERvY2tlci5idWlsZCgpOyAgIFxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cubG9nKFwiYnVpbGQgdGFyZ2V0IFwiICsgY29tbWFuZEFyZyArIFwiIG5vdCByZWNvZ25pc2VkIVwiKTtcbiAgICB9XG59XG5cblxuXG4iXX0=
