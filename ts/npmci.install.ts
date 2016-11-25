import * as plugins from './npmci.plugins'
import * as configModule from './npmci.config'
import { bash } from './npmci.bash'
import { nvmAvailable } from './npmci.bash'
export let install = (versionArg) => {
    let done = plugins.q.defer()
    plugins.beautylog.log(`now installing node version ${versionArg}`)
    let version: string
    if (versionArg === 'stable') {
        version = 'stable'
    } else if (versionArg === 'lts') {
        version = '6'
    } else if (versionArg === 'legacy') {
        version = '6'
    } else {
        version = versionArg
    };
    if (nvmAvailable) {
        bash(`nvm install ${version} && nvm alias default ${version}`)
        plugins.beautylog.success(`Node version ${version} successfully installed!`)
    } else {
        plugins.beautylog.warn('Nvm not in path so staying at installed node version!')
    };
    bash('node -v')
    bash('npm -v')

    // lets look for further config
    configModule.getConfig()
        .then(config => {
            for (let npmTool of config.globalNpmTools) {
                plugins.beautylog.info(`globally installing ${npmTool} from npm`)
                bash(`npm install -q -g ${npmTool}`)
            }
            done.resolve()
        })
    return done.promise
}
