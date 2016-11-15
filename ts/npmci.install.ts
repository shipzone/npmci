import 'typings-global';
import * as plugins from './npmci.plugins';
import { bash } from './npmci.bash';
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
    done.resolve()
    return done.promise
}