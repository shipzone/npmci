#!/usr/bin/env node
"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var packJson = require("../package.json");
plugins.beautylog.info("npmci version: " + packJson.version);
var npmci_install_1 = require("./npmci.install");
var npmci_test_1 = require("./npmci.test");
var npmci_publish_1 = require("./npmci.publish");
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
    case "install":
        npmci_install_1.install(commandOption);
        break;
    case "test":
        npmci_test_1.test(commandOption);
        break;
    case "prepare":
        break;
    case "publish":
        npmci_publish_1.publish(commandOption)
            .then(npmci_trigger_1.trigger);
        break;
    default:
        break;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFFMUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTdELDhCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUNsQyw4QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4Qyw4QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUd4QyxJQUFJLE9BQU8sQ0FBQztBQUNaLElBQUksYUFBYSxDQUFDO0FBRWxCLE9BQU8sQ0FBQyxTQUFTO0tBQ1osU0FBUyxDQUFDLGlDQUFpQyxDQUFDO0tBQzVDLE1BQU0sQ0FBQyxVQUFVLFVBQVUsRUFBRSxnQkFBZ0I7SUFDMUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztJQUNyQixhQUFhLEdBQUcsZ0JBQWdCLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUM7QUFFUCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFdEMsRUFBRSxDQUFDLENBQUMsT0FBTyxPQUFPLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDbkMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUEsQ0FBQztJQUNiLEtBQUssU0FBUztRQUNWLHVCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkIsS0FBSyxDQUFDO0lBQ1YsS0FBSyxNQUFNO1FBQ1AsaUJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwQixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFFVixLQUFLLENBQUM7SUFDVixLQUFLLFNBQVM7UUFDVix1QkFBTyxDQUFDLGFBQWEsQ0FBQzthQUNqQixJQUFJLENBQUMsdUJBQU8sQ0FBQyxDQUFDO1FBQ25CLEtBQUssQ0FBQztJQUNWO1FBQ0ksS0FBSyxDQUFDO0FBQ2QsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcclxuaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcclxuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XHJcblxyXG5sZXQgcGFja0pzb24gPSByZXF1aXJlKFwiLi4vcGFja2FnZS5qc29uXCIpO1xyXG5cclxucGx1Z2lucy5iZWF1dHlsb2cuaW5mbyhcIm5wbWNpIHZlcnNpb246IFwiICsgcGFja0pzb24udmVyc2lvbik7XHJcblxyXG5pbXBvcnQge2luc3RhbGx9IGZyb20gXCIuL25wbWNpLmluc3RhbGxcIjtcclxuaW1wb3J0IHt0ZXN0fSBmcm9tIFwiLi9ucG1jaS50ZXN0XCI7XHJcbmltcG9ydCB7cHVibGlzaH0gZnJvbSBcIi4vbnBtY2kucHVibGlzaFwiO1xyXG5pbXBvcnQge3RyaWdnZXJ9IGZyb20gXCIuL25wbWNpLnRyaWdnZXJcIjtcclxuXHJcblxyXG5sZXQgY29tbWFuZDtcclxubGV0IGNvbW1hbmRPcHRpb247XHJcblxyXG5wbHVnaW5zLmNvbW1hbmRlclxyXG4gICAgLmFyZ3VtZW50cygnPGNvbW1hbmRhcmc+IFtjb21tYW5kb3B0aW9uYXJnXScpXHJcbiAgICAuYWN0aW9uKGZ1bmN0aW9uIChjb21tYW5kYXJnLCBjb21tYW5kb3B0aW9uYXJnKSB7XHJcbiAgICAgICAgY29tbWFuZCA9IGNvbW1hbmRhcmc7XHJcbiAgICAgICAgY29tbWFuZE9wdGlvbiA9IGNvbW1hbmRvcHRpb25hcmc7XHJcbiAgICB9KTtcclxuIFxyXG5wbHVnaW5zLmNvbW1hbmRlci5wYXJzZShwcm9jZXNzLmFyZ3YpO1xyXG4gXHJcbmlmICh0eXBlb2YgY29tbWFuZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ25vIGNvbW1hbmQgZ2l2ZW4hJyk7XHJcbiAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbn1cclxuXHJcbnN3aXRjaCAoY29tbWFuZCl7XHJcbiAgICBjYXNlIFwiaW5zdGFsbFwiOlxyXG4gICAgICAgIGluc3RhbGwoY29tbWFuZE9wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwidGVzdFwiOlxyXG4gICAgICAgIHRlc3QoY29tbWFuZE9wdGlvbik7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIFwicHJlcGFyZVwiOlxyXG4gICAgICAgIFxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSBcInB1Ymxpc2hcIjpcclxuICAgICAgICBwdWJsaXNoKGNvbW1hbmRPcHRpb24pXHJcbiAgICAgICAgICAgIC50aGVuKHRyaWdnZXIpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxufVxyXG5cclxuIl19
