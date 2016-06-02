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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdELDRCQUFvQixlQUNwQixDQUFDLENBRGtDO0FBQ25DLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUNsQyw4QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUd4QyxJQUFJLE9BQU8sQ0FBQztBQUNaLElBQUksYUFBYSxDQUFDO0FBRWxCLE9BQU8sQ0FBQyxTQUFTO0tBQ1osU0FBUyxDQUFDLGlDQUFpQyxDQUFDO0tBQzVDLE1BQU0sQ0FBQyxVQUFVLFVBQVUsRUFBRSxnQkFBZ0I7SUFDMUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUNyQixhQUFhLEdBQUcsZ0JBQWdCLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFUCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztJQUNiLEtBQUssT0FBTztRQUNSLG1CQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDcEIsS0FBSyxDQUFDO0lBQ1YsS0FBSyxTQUFTO1FBQ1YsdUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2QixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFDVix1QkFBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZCLEtBQUssQ0FBQztJQUNWLEtBQUssU0FBUztRQUNWLHVCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkIsS0FBSyxDQUFDO0lBQ1YsS0FBSyxNQUFNO1FBQ1AsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFDVix1QkFBTyxFQUFFLENBQUM7UUFDVixLQUFLLENBQUM7SUFDVjtRQUNJLEtBQUssQ0FBQztBQUNkLENBQUMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXHJcbmltcG9ydCBcInR5cGluZ3MtZ2xvYmFsXCI7XHJcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vbnBtY2kucGx1Z2luc1wiO1xyXG5cclxubGV0IHBhY2tKc29uID0gcmVxdWlyZShcIi4uL3BhY2thZ2UuanNvblwiKTtcclxuXHJcbnBsdWdpbnMuYmVhdXR5bG9nLmluZm8oXCJucG1jaSB2ZXJzaW9uOiBcIiArIHBhY2tKc29uLnZlcnNpb24pO1xyXG5cclxuaW1wb3J0IHtidWlsZH0gZnJvbSBcIi4vbnBtY2kuYnVpbGRcIlxyXG5pbXBvcnQge2luc3RhbGx9IGZyb20gXCIuL25wbWNpLmluc3RhbGxcIjtcclxuaW1wb3J0IHtwdWJsaXNofSBmcm9tIFwiLi9ucG1jaS5wdWJsaXNoXCI7XHJcbmltcG9ydCB7cHJlcGFyZX0gZnJvbSBcIi4vbnBtY2kucHJlcGFyZVwiO1xyXG5pbXBvcnQge3Rlc3R9IGZyb20gXCIuL25wbWNpLnRlc3RcIjtcclxuaW1wb3J0IHt0cmlnZ2VyfSBmcm9tIFwiLi9ucG1jaS50cmlnZ2VyXCI7XHJcblxyXG5cclxubGV0IGNvbW1hbmQ7XHJcbmxldCBjb21tYW5kT3B0aW9uO1xyXG5cclxucGx1Z2lucy5jb21tYW5kZXJcclxuICAgIC5hcmd1bWVudHMoJzxjb21tYW5kYXJnPiBbY29tbWFuZG9wdGlvbmFyZ10nKVxyXG4gICAgLmFjdGlvbihmdW5jdGlvbiAoY29tbWFuZGFyZywgY29tbWFuZG9wdGlvbmFyZykge1xyXG4gICAgICAgIGNvbW1hbmQgPSBjb21tYW5kYXJnO1xyXG4gICAgICAgIGNvbW1hbmRPcHRpb24gPSBjb21tYW5kb3B0aW9uYXJnO1xyXG4gICAgfSk7XHJcbiBcclxucGx1Z2lucy5jb21tYW5kZXIucGFyc2UocHJvY2Vzcy5hcmd2KTtcclxuIFxyXG5pZiAodHlwZW9mIGNvbW1hbmQgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdubyBjb21tYW5kIGdpdmVuIScpO1xyXG4gICAgcHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcblxyXG5zd2l0Y2ggKGNvbW1hbmQpe1xyXG4gICAgY2FzZSBcImJ1aWxkXCI6XHJcbiAgICAgICAgYnVpbGQoXCJjb21tYW5kQXJnXCIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcImluc3RhbGxcIjpcclxuICAgICAgICBpbnN0YWxsKGNvbW1hbmRPcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInByZXBhcmVcIjpcclxuICAgICAgICBwcmVwYXJlKGNvbW1hbmRPcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInB1Ymxpc2hcIjpcclxuICAgICAgICBwdWJsaXNoKGNvbW1hbmRPcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInRlc3RcIjpcclxuICAgICAgICB0ZXN0KGNvbW1hbmRPcHRpb24pO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInRyaWdnZXJcIjpcclxuICAgICAgICB0cmlnZ2VyKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBkZWZhdWx0OlxyXG4gICAgICAgIGJyZWFrO1xyXG59XHJcblxyXG4iXX0=
