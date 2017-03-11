import * as plugins from './npmci.plugins'
import { bash, yarnAvailable } from './npmci.bash'
import { install } from './npmci.install'
import * as env from './npmci.env'
import * as NpmciBuildDocker from './npmci.build.docker'

export let test = async (versionArg): Promise<void> => {
  if (versionArg === 'docker') {
    await testDocker()
  } else {
    await install(versionArg)
      .then(npmDependencies)
      .then(npmTest)
  }
}

let npmDependencies = async (): Promise<void> => {
  plugins.beautylog.info('now installing dependencies:')
  if (await yarnAvailable.promise) {
    await bash('yarn install')
  } else {
    await bash('npm install')
  }
}

let npmTest = async (): Promise<void> => {
  plugins.beautylog.info('now starting tests:')
  await bash('npm test')
}

let testDocker = async (): Promise<NpmciBuildDocker.Dockerfile[]> => {
  return await NpmciBuildDocker.readDockerfiles()
    .then(NpmciBuildDocker.pullDockerfileImages)
    .then(NpmciBuildDocker.testDockerfiles)
}

