import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import * as NpmciEnv from '../npmci.env';
import { bash } from '../npmci.bash';
import * as paths from '../npmci.paths';

import { DockerRegistry } from './mod.classes.dockerregistry';
import * as helpers from './mod.helpers';

/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export class Dockerfile {
  public filePath: string;
  public repo: string;
  public version: string;
  public cleanTag: string;
  public buildTag: string;
  public containerName: string;
  public content: string;
  public baseImage: string;
  public localBaseImageDependent: boolean;
  public localBaseDockerfile: Dockerfile;
  constructor(options: { filePath?: string; fileContents?: string | Buffer; read?: boolean }) {
    this.filePath = options.filePath;
    this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo;
    this.version = helpers.dockerFileVersion(plugins.path.parse(options.filePath).base);
    this.cleanTag = this.repo + ':' + this.version;
    this.buildTag = this.cleanTag;

    this.containerName = 'dockerfile-' + this.version;
    if (options.filePath && options.read) {
      this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
    }
    this.baseImage = helpers.dockerBaseImage(this.content);
    this.localBaseImageDependent = false;
  }

  /**
   * builds the Dockerfile
   */
  public async build() {
    logger.log('info', 'now building Dockerfile for ' + this.cleanTag);
    const buildArgsString = await helpers.getDockerBuildArgs();
    const buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} ${buildArgsString} .`;
    await bash(buildCommand);
    return;
  }

  /**
   * pushes the Dockerfile to a registry
   */
  public async push(dockerRegistryArg: DockerRegistry, versionSuffix: string = null) {
    const pushTag = helpers.getDockerTagString(
      dockerRegistryArg.registryUrl,
      this.repo,
      this.version,
      versionSuffix
    );
    await bash(`docker tag ${this.buildTag} ${pushTag}`);
    await bash(`docker push ${pushTag}`);
  }

  /**
   * pulls the Dockerfile from a registry
   */
  public async pull(registryArg: DockerRegistry, versionSuffixArg: string = null) {
    const pullTag = helpers.getDockerTagString(
      registryArg.registryUrl,
      this.repo,
      this.version,
      versionSuffixArg
    );
    await bash(`docker pull ${pullTag}`);
    await bash(`docker tag ${pullTag} ${this.buildTag}`);
  }

  /**
   * tests the Dockerfile;
   */
  public async test() {
    const testFile: string = plugins.path.join(paths.NpmciTestDir, 'test_' + this.version + '.sh');
    const testFileExists: boolean = plugins.smartfile.fs.fileExistsSync(testFile);
    if (testFileExists) {
      // run tests
      await bash(
        `docker run --name npmci_test_container --entrypoint="bash" ${this.buildTag} -c "mkdir /npmci_test"`
      );
      await bash(`docker cp ${testFile} npmci_test_container:/npmci_test/test.sh`);
      await bash(`docker commit npmci_test_container npmci_test_image`);
      await bash(`docker run --entrypoint="bash" npmci_test_image -x /npmci_test/test.sh`);
      await bash(`docker rm npmci_test_container`);
      await bash(`docker rmi --force npmci_test_image`);
    } else {
      logger.log('warn', 'skipping tests for ' + this.cleanTag + ' because no testfile was found!');
    }
  }

  /**
   * gets the id of a Dockerfile
   */
  public async getId() {
    const containerId = await bash(
      'docker inspect --type=image --format="{{.Id}}" ' + this.buildTag
    );
    return containerId;
  }
}
