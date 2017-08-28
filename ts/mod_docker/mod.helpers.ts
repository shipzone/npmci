import * as plugins from './mod.plugins'
import * as paths from '../npmci.paths'
import * as NpmciEnv from '../npmci.env'
import * as NpmciConfig from '../npmci.config'
import { bash } from '../npmci.bash'

import { Dockerfile } from './mod.classes.dockerfile'

/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
export let readDockerfiles = async (): Promise<Dockerfile[]> => {
  let fileTree = await plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*')

  // create the Dockerfile array
  let readDockerfilesArray: Dockerfile[] = []
  plugins.beautylog.info(`found ${fileTree.length} Dockerfiles:`)
  console.log(fileTree)
  for (let dockerfilePath of fileTree) {
    let myDockerfile = new Dockerfile({
      filePath: dockerfilePath,
      read: true
    })
    readDockerfilesArray.push(myDockerfile)
  }

  return readDockerfilesArray

}

/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
export let sortDockerfiles = (sortableArrayArg: Dockerfile[]): Promise<Dockerfile[]> => {
  let done = plugins.q.defer<Dockerfile[]>()
  plugins.beautylog.info('sorting Dockerfiles:')
  let sortedArray: Dockerfile[] = []
  let cleanTagsOriginal = cleanTagsArrayFunction(sortableArrayArg, sortedArray)
  let sorterFunctionCounter: number = 0
  let sorterFunction = function () {
    sortableArrayArg.forEach((dockerfileArg) => {
      let cleanTags = cleanTagsArrayFunction(sortableArrayArg, sortedArray)
      if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 && sortedArray.indexOf(dockerfileArg) === -1) {
        sortedArray.push(dockerfileArg)
      }
      if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
        dockerfileArg.localBaseImageDependent = true
      }
    })
    if (sortableArrayArg.length === sortedArray.length) {
      let counter = 1
      for (let dockerfile of sortedArray) {
        plugins.beautylog.log(`tag ${counter}: -> ${dockerfile.cleanTag}`)
        counter++
      }
      done.resolve(sortedArray)
    } else if (sorterFunctionCounter < 10) {
      sorterFunctionCounter++
      sorterFunction()
    }
  }
  sorterFunction()
  return done.promise
}

/**
 * maps local Dockerfiles dependencies to the correspoding Dockerfile class instances
 */
export let mapDockerfiles = async (sortedArray: Dockerfile[]): Promise<Dockerfile[]> => {
  sortedArray.forEach((dockerfileArg) => {
    if (dockerfileArg.localBaseImageDependent) {
      sortedArray.forEach((dockfile2: Dockerfile) => {
        if (dockfile2.cleanTag === dockerfileArg.baseImage) {
          dockerfileArg.localBaseDockerfile = dockfile2
        }
      })
    }
  })
  return sortedArray
}

/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
export let buildDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  for (let dockerfileArg of sortedArrayArg) {
    await dockerfileArg.build()
  }
  return sortedArrayArg
}

/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
export let testDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  for (let dockerfileArg of sortedArrayArg) {
    await dockerfileArg.test()
  }
  return sortedArrayArg
}

/**
 * returns a version for a docker file
 * @execution SYNC
 */
export let dockerFileVersion = (dockerfileNameArg: string): string => {
  let versionString: string
  let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/
  let regexResultArray = versionRegex.exec(dockerfileNameArg)
  if (regexResultArray && regexResultArray.length === 2) {
    versionString = regexResultArray[ 1 ]
  } else {
    versionString = 'latest'
  }
  return versionString
}

/**
 * returns the docker base image for a Dockerfile
 */
export let dockerBaseImage = function (dockerfileContentArg: string) {
  let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/
  let regexResultArray = baseImageRegex.exec(dockerfileContentArg)
  return regexResultArray[ 1 ]
}

/**
 * returns the docker tag
 */
export let getDockerTagString = (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string): string => {

  // determine wether the repo should be mapped accordingly to the registry
  let mappedRepo = NpmciConfig.configObject.dockerRegistryRepoMap[registryArg]
  let repo = (() => {
    if (mappedRepo) {
      return mappedRepo
    } else {
      return repoArg
    }
  })()

  // determine wether the version contais a suffix
  let version = versionArg
  if (suffixArg) {
    version = versionArg + '_' + suffixArg
  }

  let tagString = `${registryArg}/${repo}:${version}`
  return tagString
}

/**
 * 
 */
export let cleanTagsArrayFunction = function (dockerfileArrayArg: Dockerfile[], trackingArrayArg: Dockerfile[]): string[] {
  let cleanTagsArray: string[] = []
  dockerfileArrayArg.forEach(function (dockerfileArg) {
    if (trackingArrayArg.indexOf(dockerfileArg) === -1) {
      cleanTagsArray.push(dockerfileArg.cleanTag)
    }
  })
  return cleanTagsArray
}
