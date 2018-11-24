import { logger } from '../npmci.logging';
import * as plugins from './mod.plugins';
import * as paths from '../npmci.paths';
import * as NpmciEnv from '../npmci.env';
import * as NpmciConfig from '../npmci.config';
import { bash } from '../npmci.bash';

import { Dockerfile } from './mod.classes.dockerfile';

/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
export let readDockerfiles = async (): Promise<Dockerfile[]> => {
  const fileTree = await plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*');

  // create the Dockerfile array
  const readDockerfilesArray: Dockerfile[] = [];
  logger.log('info', `found ${fileTree.length} Dockerfiles:`);
  console.log(fileTree);
  for (const dockerfilePath of fileTree) {
    const myDockerfile = new Dockerfile({
      filePath: dockerfilePath,
      read: true
    });
    readDockerfilesArray.push(myDockerfile);
  }

  return readDockerfilesArray;
};

/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
export let sortDockerfiles = (sortableArrayArg: Dockerfile[]): Promise<Dockerfile[]> => {
  const done = plugins.smartpromise.defer<Dockerfile[]>();
  logger.log('info', 'sorting Dockerfiles:');
  const sortedArray: Dockerfile[] = [];
  const cleanTagsOriginal = cleanTagsArrayFunction(sortableArrayArg, sortedArray);
  let sorterFunctionCounter: number = 0;
  const sorterFunction = () => {
    sortableArrayArg.forEach(dockerfileArg => {
      const cleanTags = cleanTagsArrayFunction(sortableArrayArg, sortedArray);
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
};

/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
export let mapDockerfiles = async (sortedArray: Dockerfile[]): Promise<Dockerfile[]> => {
  sortedArray.forEach(dockerfileArg => {
    if (dockerfileArg.localBaseImageDependent) {
      sortedArray.forEach((dockfile2: Dockerfile) => {
        if (dockfile2.cleanTag === dockerfileArg.baseImage) {
          dockerfileArg.localBaseDockerfile = dockfile2;
        }
      });
    }
  });
  return sortedArray;
};

/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
export let buildDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  for (const dockerfileArg of sortedArrayArg) {
    await dockerfileArg.build();
  }
  return sortedArrayArg;
};

/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
export let testDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  for (const dockerfileArg of sortedArrayArg) {
    await dockerfileArg.test();
  }
  return sortedArrayArg;
};

/**
 * returns a version for a docker file
 * @execution SYNC
 */
export let dockerFileVersion = (dockerfileNameArg: string): string => {
  let versionString: string;
  const versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
  const regexResultArray = versionRegex.exec(dockerfileNameArg);
  if (regexResultArray && regexResultArray.length === 2) {
    versionString = regexResultArray[1];
  } else {
    versionString = 'latest';
  }
  return versionString;
};

/**
 * returns the docker base image for a Dockerfile
 */
export let dockerBaseImage = (dockerfileContentArg: string) => {
  const baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
  const regexResultArray = baseImageRegex.exec(dockerfileContentArg);
  return regexResultArray[1];
};

/**
 * returns the docker tag
 */
export let getDockerTagString = (
  registryArg: string,
  repoArg: string,
  versionArg: string,
  suffixArg?: string
): string => {
  // determine wether the repo should be mapped accordingly to the registry
  const mappedRepo = NpmciConfig.configObject.dockerRegistryRepoMap[registryArg];
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
};

export let getDockerBuildArgs = async (): Promise<string> => {
  logger.log('info', 'checking for env vars to be supplied to the docker build');
  let buildArgsString: string = '';
  for (const key in NpmciConfig.configObject.dockerBuildargEnvMap) {
    const targetValue = process.env[NpmciConfig.configObject.dockerBuildargEnvMap[key]];
    buildArgsString = `${buildArgsString} --build-arg ${key}=${targetValue}`;
  }
  return buildArgsString;
};

/**
 *
 */
export let cleanTagsArrayFunction = (
  dockerfileArrayArg: Dockerfile[],
  trackingArrayArg: Dockerfile[]
): string[] => {
  const cleanTagsArray: string[] = [];
  dockerfileArrayArg.forEach((dockerfileArg) => {
    if (trackingArrayArg.indexOf(dockerfileArg) === -1) {
      cleanTagsArray.push(dockerfileArg.cleanTag);
    }
  });
  return cleanTagsArray;
};
