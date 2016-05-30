import "typings-global";
import * as plugins from "./npmci.plugins";
export let bash = (commandArg) => {
    plugins.shelljs.exec(
        "bash -c \"source /usr/local/nvm/nvm.sh &&" +
        commandArg +
        "\""
    );
}