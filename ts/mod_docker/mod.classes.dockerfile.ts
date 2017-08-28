import * as plugins from './mod.plugins'
import * as NpmciEnv from '../npmci.env'
import { bash } from '../npmci.bash'
import * as paths from '../npmci.paths'

import { DockerRegistry } from './mod.classes.dockerregistry'
import * as helpers from './mod.helpers'

/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export class Dockerfile {
  filePath: string
  repo: string
  version: string
  cleanTag: string
  buildTag: string
  containerName: string
  content: string
  baseImage: string
  localBaseImageDependent: boolean
  localBaseDockerfile: Dockerfile
  constructor (options: { filePath?: string, fileContents?: string | Buffer, read?: boolean }) {
    this.filePath = options.filePath
    this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo
    this.version = helpers.dockerFileVersion(plugins.path.parse(options.filePath).base)
    this.cleanTag = this.repo + ':' + this.version
    this.buildTag = this.cleanTag

    this.containerName = 'dockerfile-' + this.version
    if (options.filePath && options.read) {
      this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath))
    }
    this.baseImage = helpers.dockerBaseImage(this.content)
    this.localBaseImageDependent = false
  }

  /**
   * builds the Dockerfile
   */
  async build () {
    plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag)
    let buildArgsString = await helpers.getDockerBuildArgs()
    let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} ${buildArgsString} .`
    await bash(buildCommand)
    return
  }

  /**
   * pushes the Dockerfile to a registry
   */
  async push (dockerRegistryArg: DockerRegistry, versionSuffix: string = null) {
    let pushTag = helpers.getDockerTagString(dockerRegistryArg.registryUrl, this.repo, this.version, versionSuffix)
    await bash(`docker tag ${this.buildTag} ${pushTag}`)
    await bash(`docker push ${pushTag}`)
  }

  /**
   * pulls the Dockerfile from a registry
   */
  async pull (registryArg: DockerRegistry, versionSuffixArg: string = null) {
    let pullTag = helpers.getDockerTagString(registryArg.registryUrl,this.repo, this.version, versionSuffixArg)
    await bash(`docker pull ${pullTag}`)
    await bash(`docker tag ${pullTag} ${this.buildTag}`)
  }

  /**
   * tests the Dockerfile;
   */
  async test () {
    let testFile: string = plugins.path.join(paths.NpmciTestDir, 'test_' + this.version + '.sh')
    let testFileExists: boolean = plugins.smartfile.fs.fileExistsSync(testFile)
    if (testFileExists) {
      // run tests
      await bash('docker run --name npmci_test_container ' + this.buildTag + ' mkdir /npmci_test')
      await bash('docker cp ' + testFile + ' npmci_test_container:/npmci_test/test.sh')
      await bash('docker commit npmci_test_container npmci_test_image')
      await bash('docker run npmci_test_image sh /npmci_test/test.sh')
      await bash('docker rm npmci_test_container')
      await bash('docker rmi --force npmci_test_image')
    } else {
      plugins.beautylog.warn('skipping tests for ' + this.cleanTag + ' because no testfile was found!')
    }
  }

  /**
   * gets the id of a Dockerfile
   */
  async getId () {
    let containerId = await bash('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag)
    return containerId
  }
}
