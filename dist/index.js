#!/usr/bin/env node
"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var paths = require("./npmci.paths");
var npmciInfo = new plugins.projectinfo.ProjectinfoNpm(paths.NpmciPackageRoot);
plugins.beautylog.log("npmci version: " + npmciInfo.version);
var npmci_build_1 = require("./npmci.build");
var npmci_install_1 = require("./npmci.install");
var npmci_publish_1 = require("./npmci.publish");
var npmci_prepare_1 = require("./npmci.prepare");
var npmci_test_1 = require("./npmci.test");
var npmci_trigger_1 = require("./npmci.trigger");
var NpmciEnv = require("./npmci.env");
var npmci_build_2 = require("./npmci.build");
exports.build = npmci_build_2.build;
var npmci_install_2 = require("./npmci.install");
exports.install = npmci_install_2.install;
var npmci_publish_2 = require("./npmci.publish");
exports.publish = npmci_publish_2.publish;
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
        npmci_build_1.build(commandOption)
            .then(NpmciEnv.configStore);
        break;
    case "command":
        command()
            .then(NpmciEnv.configStore);
        break;
    case "install":
        npmci_install_1.install(commandOption)
            .then(NpmciEnv.configStore);
        ;
        break;
    case "prepare":
        npmci_prepare_1.prepare(commandOption)
            .then(NpmciEnv.configStore);
        ;
        break;
    case "publish":
        npmci_publish_1.publish(commandOption)
            .then(NpmciEnv.configStore);
        ;
        break;
    case "test":
        npmci_test_1.test(commandOption)
            .then(NpmciEnv.configStore);
        break;
    case "trigger":
        npmci_trigger_1.trigger();
        break;
    default:
        plugins.beautylog.error("command " + commandOption.blue + " not recognised");
        process.exit(1);
        break;
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUcsYUFBYSxDQUFDLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsS0FBSyxDQUFDO0FBQ2QsQ0FBQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiMhL3Vzci9iaW4vZW52IG5vZGVcbmltcG9ydCBcInR5cGluZ3MtZ2xvYmFsXCI7XG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcbmltcG9ydCAqIGFzIHBhdGhzIGZyb20gXCIuL25wbWNpLnBhdGhzXCI7XG5sZXQgbnBtY2lJbmZvID0gbmV3IHBsdWdpbnMucHJvamVjdGluZm8uUHJvamVjdGluZm9OcG0ocGF0aHMuTnBtY2lQYWNrYWdlUm9vdCk7XG5wbHVnaW5zLmJlYXV0eWxvZy5sb2coXCJucG1jaSB2ZXJzaW9uOiBcIiArIG5wbWNpSW5mby52ZXJzaW9uKTtcblxuaW1wb3J0IHtidWlsZH0gZnJvbSBcIi4vbnBtY2kuYnVpbGRcIlxuaW1wb3J0IHtjb21tYW5kIGFzIGNvbW1hbmQyfSBmcm9tIFwiLi9ucG1jaS5jb21tYW5kXCI7XG5pbXBvcnQge2luc3RhbGx9IGZyb20gXCIuL25wbWNpLmluc3RhbGxcIjtcbmltcG9ydCB7cHVibGlzaH0gZnJvbSBcIi4vbnBtY2kucHVibGlzaFwiO1xuaW1wb3J0IHtwcmVwYXJlfSBmcm9tIFwiLi9ucG1jaS5wcmVwYXJlXCI7XG5pbXBvcnQge3RhZywgcmV0YWd9IGZyb20gXCIuL25wbWNpLnRhZ1wiO1xuaW1wb3J0IHt0ZXN0fSBmcm9tIFwiLi9ucG1jaS50ZXN0XCI7XG5pbXBvcnQge3RyaWdnZXJ9IGZyb20gXCIuL25wbWNpLnRyaWdnZXJcIjtcbmltcG9ydCAqIGFzIE5wbWNpRW52IGZyb20gXCIuL25wbWNpLmVudlwiO1xuXG5leHBvcnQge2J1aWxkfSBmcm9tIFwiLi9ucG1jaS5idWlsZFwiXG5leHBvcnQge2luc3RhbGx9IGZyb20gXCIuL25wbWNpLmluc3RhbGxcIjtcbmV4cG9ydCB7cHVibGlzaH0gZnJvbSBcIi4vbnBtY2kucHVibGlzaFwiO1xuXG5sZXQgY29tbWFuZDtcbmxldCBjb21tYW5kT3B0aW9uOnN0cmluZztcblxucGx1Z2lucy5jb21tYW5kZXJcbiAgICAuYXJndW1lbnRzKCc8Y29tbWFuZGFyZz4gW2NvbW1hbmRvcHRpb25hcmddJylcbiAgICAuYWN0aW9uKGZ1bmN0aW9uIChjb21tYW5kYXJnLCBjb21tYW5kb3B0aW9uYXJnKSB7XG4gICAgICAgIGNvbW1hbmQgPSBjb21tYW5kYXJnO1xuICAgICAgICBjb21tYW5kT3B0aW9uID0gY29tbWFuZG9wdGlvbmFyZztcbiAgICB9KTtcbiBcbnBsdWdpbnMuY29tbWFuZGVyLnBhcnNlKHByb2Nlc3MuYXJndik7XG4gXG5pZiAodHlwZW9mIGNvbW1hbmQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc29sZS5lcnJvcignbm8gY29tbWFuZCBnaXZlbiEnKTtcbiAgICBwcm9jZXNzLmV4aXQoMSk7XG59XG5cbnN3aXRjaCAoY29tbWFuZCl7XG4gICAgY2FzZSBcImJ1aWxkXCI6XG4gICAgICAgIGJ1aWxkKGNvbW1hbmRPcHRpb24pXG4gICAgICAgICAgICAudGhlbihOcG1jaUVudi5jb25maWdTdG9yZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJjb21tYW5kXCI6XG4gICAgICAgIGNvbW1hbmQoKVxuICAgICAgICAgICAgLnRoZW4oTnBtY2lFbnYuY29uZmlnU3RvcmUpO1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwiaW5zdGFsbFwiOlxuICAgICAgICBpbnN0YWxsKGNvbW1hbmRPcHRpb24pXG4gICAgICAgICAgICAudGhlbihOcG1jaUVudi5jb25maWdTdG9yZSk7O1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwicHJlcGFyZVwiOlxuICAgICAgICBwcmVwYXJlKGNvbW1hbmRPcHRpb24pXG4gICAgICAgICAgICAudGhlbihOcG1jaUVudi5jb25maWdTdG9yZSk7O1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwicHVibGlzaFwiOlxuICAgICAgICBwdWJsaXNoKGNvbW1hbmRPcHRpb24pXG4gICAgICAgICAgICAudGhlbihOcG1jaUVudi5jb25maWdTdG9yZSk7O1xuICAgICAgICBicmVhaztcbiAgICBjYXNlIFwidGVzdFwiOlxuICAgICAgICB0ZXN0KGNvbW1hbmRPcHRpb24pXG4gICAgICAgICAgICAudGhlbihOcG1jaUVudi5jb25maWdTdG9yZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ0cmlnZ2VyXCI6XG4gICAgICAgIHRyaWdnZXIoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgICAgcGx1Z2lucy5iZWF1dHlsb2cuZXJyb3IoXCJjb21tYW5kIFwiICsgY29tbWFuZE9wdGlvbi5ibHVlICsgXCIgbm90IHJlY29nbmlzZWRcIik7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgYnJlYWs7XG59XG5cbiJdfQ==
