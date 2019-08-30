import * as plugins from './mod.plugins';
import * as paths from '../npmci.paths';

import { logger } from '../npmci.logging';
import { bash } from '../npmci.bash';

import { DockerRegistry } from './mod.classes.dockerregistry';
import * as helpers from './mod.helpers';
import { NpmciDockerManager } from '.';
import { Npmci } from '../npmci.classes.npmci';

/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export class Dockerfile {
  // STATIC

  /**
   * creates instance of class Dockerfile for all Dockerfiles in cwd
   * @returns Promise<Dockerfile[]>
   */
  public static async readDockerfiles(
    npmciDockerManagerRefArg: NpmciDockerManager
  ): Promise<Dockerfile[]> {
    const fileTree = await plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*');

    // create the Dockerfile array
    const readDockerfilesArray: Dockerfile[] = [];
    logger.log('info', `found ${fileTree.length} Dockerfiles:`);
    console.log(fileTree);
    for (const dockerfilePath of fileTree) {
      const myDockerfile = new Dockerfile(npmciDockerManagerRefArg, {
        filePath: dockerfilePath,
        read: true
      });
      readDockerfilesArray.push(myDockerfile);
    }

    return readDockerfilesArray;
  }

  /**
   * sorts Dockerfiles into a dependency chain
   * @param sortableArrayArg an array of instances of class Dockerfile
   * @returns Promise<Dockerfile[]>
   */
  public static async sortDockerfiles(sortableArrayArg: Dockerfile[]): Promise<Dockerfile[]> {
    const done = plugins.smartpromise.defer<Dockerfile[]>();
    logger.log('info', 'sorting Dockerfiles:');
    const sortedArray: Dockerfile[] = [];
    const cleanTagsOriginal = Dockerfile.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    let sorterFunctionCounter: number = 0;
    const sorterFunction = () => {
      sortableArrayArg.forEach(dockerfileArg => {
        const cleanTags = Dockerfile.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
        if (
          cleanTags.indexOf(dockerfileArg.baseImage) === -1 &&
          sortedArray.indexOf(dockerfileArg) === -1
        ) {
          sortedArray.push(dockerfileArg);
        }
        if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
          dockerfileArg.localBaseImageDependent = true;
        }
      });
      if (sortableArrayArg.length === sortedArray.length) {
        let counter = 1;
        for (const dockerfile of sortedArray) {
          logger.log('info', `tag ${counter}: -> ${dockerfile.cleanTag}`);
          counter++;
        }
        done.resolve(sortedArray);
      } else if (sorterFunctionCounter < 10) {
        sorterFunctionCounter++;
        sorterFunction();
      }
    };
    sorterFunction();
    return done.promise;
  }

  /**
   * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
   */
  public static async mapDockerfiles(sortedDockerfileArray: Dockerfile[]): Promise<Dockerfile[]> {
    sortedDockerfileArray.forEach(dockerfileArg => {
      if (dockerfileArg.localBaseImageDependent) {
        sortedDockerfileArray.forEach((dockfile2: Dockerfile) => {
          if (dockfile2.cleanTag === dockerfileArg.baseImage) {
            dockerfileArg.localBaseDockerfile = dockfile2;
          }
        });
      }
    });
    return sortedDockerfileArray;
  }

  /**
   * builds the correspoding real docker image for each Dockerfile class instance
   */
  public static async buildDockerfiles(sortedArrayArg: Dockerfile[]) {
    for (const dockerfileArg of sortedArrayArg) {
      await dockerfileArg.build();
    }
    return sortedArrayArg;
  }

  /**
   * tests all Dockerfiles in by calling class Dockerfile.test();
   * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
   */
  public static async testDockerfiles(sortedArrayArg: Dockerfile[]) {
    for (const dockerfileArg of sortedArrayArg) {
      await dockerfileArg.test();
    }
    return sortedArrayArg;
  }

  /**
   * returns a version for a docker file
   * @execution SYNC
   */
  public static dockerFileVersion(dockerfileNameArg: string): string {
    let versionString: string;
    const versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    const regexResultArray = versionRegex.exec(dockerfileNameArg);
    if (regexResultArray && regexResultArray.length === 2) {
      versionString = regexResultArray[1];
    } else {
      versionString = 'latest';
    }
    return versionString;
  }

  /**
   * returns the docker base image for a Dockerfile
   */
  public static dockerBaseImage(dockerfileContentArg: string): string {
    const baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    const regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
  }

  /**
   * returns the docker tag
   */
  public static getDockerTagString(
    npmciDockerManagerRef: NpmciDockerManager,
    registryArg: string,
    repoArg: string,
    versionArg: string,
    suffixArg?: string
  ): string {
    // determine wether the repo should be mapped accordingly to the registry
    const mappedRepo = npmciDockerManagerRef.npmciRef.npmciConfig.getConfig().dockerRegistryRepoMap[
      registryArg
    ];
    const repo = (() => {
      if (mappedRepo) {
        return mappedRepo;
      } else {
        return repoArg;
      }
    })();

    // determine wether the version contais a suffix
    let version = versionArg;
    if (suffixArg) {
      version = versionArg + '_' + suffixArg;
    }

    const tagString = `${registryArg}/${repo}:${version}`;
    return tagString;
  }

  public static async getDockerBuildArgs(
    npmciDockerManagerRef: NpmciDockerManager
  ): Promise<string> {
    logger.log('info', 'checking for env vars to be supplied to the docker build');
    let buildArgsString: string = '';
    for (const key of Object.keys(
      npmciDockerManagerRef.npmciRef.npmciConfig.getConfig().dockerBuildargEnvMap
    )) {
      const targetValue =
        process.env[
          npmciDockerManagerRef.npmciRef.npmciConfig.getConfig().dockerBuildargEnvMap[key]
        ];
      buildArgsString = `${buildArgsString} --build-arg ${key}="${targetValue}"`;
    }
    return buildArgsString;
  }

  /**
   *
   */
  public static cleanTagsArrayFunction(
    dockerfileArrayArg: Dockerfile[],
    trackingArrayArg: Dockerfile[]
  ): string[] {
    const cleanTagsArray: string[] = [];
    dockerfileArrayArg.forEach(dockerfileArg => {
      if (trackingArrayArg.indexOf(dockerfileArg) === -1) {
        cleanTagsArray.push(dockerfileArg.cleanTag);
      }
    });
    return cleanTagsArray;
  }

  // INSTANCE
  public npmciDockerManagerRef: NpmciDockerManager;

  public filePath: string;
  public repo: string;
  public version: string;
  public cleanTag: string;
  public buildTag: string;
  public pushTag: string;
  public containerName: string;
  public content: string;
  public baseImage: string;
  public localBaseImageDependent: boolean;
  public localBaseDockerfile: Dockerfile;

  constructor(
    dockerManagerRefArg: NpmciDockerManager,
    options: { filePath?: string; fileContents?: string | Buffer; read?: boolean }
  ) {
    this.npmciDockerManagerRef = dockerManagerRefArg;
    this.filePath = options.filePath;
    this.repo =
      this.npmciDockerManagerRef.npmciRef.npmciEnv.repo.user +
      '/' +
      this.npmciDockerManagerRef.npmciRef.npmciEnv.repo.repo;
    this.version = Dockerfile.dockerFileVersion(plugins.path.parse(options.filePath).base);
    this.cleanTag = this.repo + ':' + this.version;
    this.buildTag = this.cleanTag;

    this.containerName = 'dockerfile-' + this.version;
    if (options.filePath && options.read) {
      this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
    }
    this.baseImage = Dockerfile.dockerBaseImage(this.content);
    this.localBaseImageDependent = false;
  }

  /**
   * builds the Dockerfile
   */
  public async build() {
    logger.log('info', 'now building Dockerfile for ' + this.cleanTag);
    const buildArgsString = await Dockerfile.getDockerBuildArgs(this.npmciDockerManagerRef);
    const buildCommand = `docker build --label="version=${
      this.npmciDockerManagerRef.npmciRef.npmciConfig.getConfig().projectInfo.npm.version
    }" -t ${this.buildTag} -f ${this.filePath} ${buildArgsString} .`;
    await bash(buildCommand);
    return;
  }

  /**
   * pushes the Dockerfile to a registry
   */
  public async push(dockerRegistryArg: DockerRegistry, versionSuffix: string = null) {
    this.pushTag = Dockerfile.getDockerTagString(
      this.npmciDockerManagerRef,
      dockerRegistryArg.registryUrl,
      this.repo,
      this.version,
      versionSuffix
    );
    await bash(`docker tag ${this.buildTag} ${this.pushTag}`);
    await bash(`docker push ${this.pushTag}`);
    console.log('you can get the digest using this command');
    console.log(`docker inspect --format='{{index .RepoDigests 0}}' ${this.pushTag}`);
    const imageDigest = await bash(
      `docker inspect --format='{{index .RepoDigests 0}}' ${this.pushTag}`
    );
    console.log(imageDigest);
    await this.npmciDockerManagerRef.npmciRef.cloudlyConnector.announceDockerContainer({
      dockerImageUrl: this.pushTag,
      dockerImageVersion: this.npmciDockerManagerRef.npmciRef.npmciConfig.getConfig().projectInfo
        .npm.version
    });
  }

  /**
   * pulls the Dockerfile from a registry
   */
  public async pull(registryArg: DockerRegistry, versionSuffixArg: string = null) {
    const pullTag = Dockerfile.getDockerTagString(
      this.npmciDockerManagerRef,
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
