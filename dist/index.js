#!/usr/bin/env node
"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var packJson = require("../package.json");
plugins.beautylog.info("npmci version: " + packJson.version);
var npmci_build_1 = require("./npmci.build");
var npmci_install_1 = require("./npmci.install");
var npmci_publish_1 = require("./npmci.publish");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_test_1 = require("./npmci.test");
var npmci_trigger_1 = require("./npmci.trigger");
var command;
var commandOption;
plugins.commander
    .arguments('<commandarg> [commandoptionarg]')
    .action(function (commandarg, commandoptionarg) {
    command = commandarg;
    commandOption = commandoptionarg;
});
plugins.commander.parse(process.argv);
if (typeof command === 'undefined') {
    console.error('no command given!');
    process.exit(1);
}
switch (command) {
    case "build":
        npmci_build_1.build("commandArg");
        break;
    case "install":
        npmci_install_1.install(commandOption);
        break;
    case "prepare":
        npmci_prepare_1.prepare(commandOption);
        break;
    case "publish":
        npmci_publish_1.publish(commandOption);
        break;
    case "test":
        npmci_test_1.test(commandOption);
        break;
    case "trigger":
        npmci_trigger_1.trigger();
        break;
    default:
        break;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdELDRCQUFvQixlQUNwQixDQUFDLENBRGtDO0FBQ25DLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUNsQyw4QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUd4QyxJQUFJLE9BQU8sQ0FBQztBQUNaLElBQUksYUFBYSxDQUFDO0FBRWxCLE9BQU8sQ0FBQyxTQUFTO0tBQ1osU0FBUyxDQUFDLGlDQUFpQyxDQUFDO0tBQzVDLE1BQU0sQ0FBQyxVQUFVLFVBQVUsRUFBRSxnQkFBZ0I7SUFDMUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUNyQixhQUFhLEdBQUcsZ0JBQWdCLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFUCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztJQUNiLEtBQUssT0FBTztRQUNSLG1CQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDO0lBQ1YsS0FBSyxTQUFTO1FBQ1YsdUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFDVix1QkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQztJQUNWLEtBQUssU0FBUztRQUNWLHVCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkIsS0FBSyxDQUFDO0lBQ1YsS0FBSyxNQUFNO1FBQ1AsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFDVix1QkFBTyxFQUFFLENBQUM7UUFDVixLQUFLLENBQUM7SUFDVjtRQUNJLEtBQUssQ0FBQztBQUNkLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5cbmxldCBwYWNrSnNvbiA9IHJlcXVpcmUoXCIuLi9wYWNrYWdlLmpzb25cIik7XG5cbnBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJucG1jaSB2ZXJzaW9uOiBcIiArIHBhY2tKc29uLnZlcnNpb24pO1xuXG5pbXBvcnQge2J1aWxkfSBmcm9tIFwiLi9ucG1jaS5idWlsZFwiXG5pbXBvcnQge2luc3RhbGx9IGZyb20gXCIuL25wbWNpLmluc3RhbGxcIjtcbmltcG9ydCB7cHVibGlzaH0gZnJvbSBcIi4vbnBtY2kucHVibGlzaFwiO1xuaW1wb3J0IHtwcmVwYXJlfSBmcm9tIFwiLi9ucG1jaS5wcmVwYXJlXCI7XG5pbXBvcnQge3RhZywgcmV0YWd9IGZyb20gXCIuL25wbWNpLnRhZ1wiO1xuaW1wb3J0IHt0ZXN0fSBmcm9tIFwiLi9ucG1jaS50ZXN0XCI7XG5pbXBvcnQge3RyaWdnZXJ9IGZyb20gXCIuL25wbWNpLnRyaWdnZXJcIjtcblxuXG5sZXQgY29tbWFuZDtcbmxldCBjb21tYW5kT3B0aW9uO1xuXG5wbHVnaW5zLmNvbW1hbmRlclxuICAgIC5hcmd1bWVudHMoJzxjb21tYW5kYXJnPiBbY29tbWFuZG9wdGlvbmFyZ10nKVxuICAgIC5hY3Rpb24oZnVuY3Rpb24gKGNvbW1hbmRhcmcsIGNvbW1hbmRvcHRpb25hcmcpIHtcbiAgICAgICAgY29tbWFuZCA9IGNvbW1hbmRhcmc7XG4gICAgICAgIGNvbW1hbmRPcHRpb24gPSBjb21tYW5kb3B0aW9uYXJnO1xuICAgIH0pO1xuIFxucGx1Z2lucy5jb21tYW5kZXIucGFyc2UocHJvY2Vzcy5hcmd2KTtcbiBcbmlmICh0eXBlb2YgY29tbWFuZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zb2xlLmVycm9yKCdubyBjb21tYW5kIGdpdmVuIScpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbn1cblxuc3dpdGNoIChjb21tYW5kKXtcbiAgICBjYXNlIFwiYnVpbGRcIjpcbiAgICAgICAgYnVpbGQoXCJjb21tYW5kQXJnXCIpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiaW5zdGFsbFwiOlxuICAgICAgICBpbnN0YWxsKGNvbW1hbmRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwicHJlcGFyZVwiOlxuICAgICAgICBwcmVwYXJlKGNvbW1hbmRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwicHVibGlzaFwiOlxuICAgICAgICBwdWJsaXNoKGNvbW1hbmRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwidGVzdFwiOlxuICAgICAgICB0ZXN0KGNvbW1hbmRPcHRpb24pO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwidHJpZ2dlclwiOlxuICAgICAgICB0cmlnZ2VyKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xufVxuXG4iXX0=
