import * as plugins from './npmci.plugins'
import * as paths from './npmci.paths'
import * as NpmciEnv from './npmci.env'
import { bash } from './npmci.bash'

/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export let build = async () => {
  plugins.beautylog.log('now building Dockerfiles...')
  await readDockerfiles()
    .then(sortDockerfiles)
    .then(mapDockerfiles)
    .then(buildDockerfiles)
    .then(pushDockerfiles)
}

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
      filePath: plugins.path.join(paths.cwd, dockerfilePath),
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
  let sortedArray: Dockerfile[] = []
  let cleanTagsOriginal = cleanTagsArrayFunction(sortableArrayArg, sortedArray)
  let sorterFunctionCounter: number = 0
  let sorterFunction = function () {
    sortableArrayArg.forEach((dockerfileArg) => {
      let cleanTags = cleanTagsArrayFunction(sortableArrayArg, sortedArray)
      if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 && sortedArray.indexOf(dockerfileArg) === -1) {
        sortedArray.push(dockerfileArg)
      };
      if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
        dockerfileArg.localBaseImageDependent = true
      };
    })
    if (sortableArrayArg.length === sortedArray.length) {
      done.resolve(sortedArray)
    } else if (sorterFunctionCounter < 10) {
      sorterFunctionCounter++
      sorterFunction()
    };
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
    };
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
 * pushes the real Dockerfile images to a Docker registry
 */
export let pushDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  for (let dockerfileArg of sortedArrayArg) {
    await dockerfileArg.push(NpmciEnv.buildStage)
  }
  return sortedArrayArg
}

/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
export let pullDockerfileImages = async (sortableArrayArg: Dockerfile[], registryArg = 'registry.gitlab.com') => {
  for (let dockerfileArg of sortableArrayArg) {
    await dockerfileArg.pull(registryArg)
  }
  return sortableArrayArg
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
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
export class Dockerfile {
  filePath: string
  repo: string
  version: string
  cleanTag: string
  buildTag: string
  gitlabTestTag: string
  gitlabReleaseTag: string
  releaseTag: string
  containerName: string
  content: string
  baseImage: string
  localBaseImageDependent: boolean
  localBaseDockerfile: Dockerfile
  constructor (options: { filePath?: string, fileContents?: string | Buffer, read?: boolean }) {
    this.filePath = options.filePath
    this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo
    this.version = dockerFileVersion(plugins.path.parse(options.filePath).base)
    this.cleanTag = this.repo + ':' + this.version
    this.buildTag = this.cleanTag
    this.gitlabTestTag = dockerTag('registry.gitlab.com', this.repo, this.version, 'test')
    this.gitlabReleaseTag = dockerTag('registry.gitlab.com', this.repo, this.version)
    this.releaseTag = dockerTag(NpmciEnv.dockerRegistry, this.repo, this.version)
    this.containerName = 'dockerfile-' + this.version
    if (options.filePath && options.read) {
      this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath))
    };
    this.baseImage = dockerBaseImage(this.content)
    this.localBaseImageDependent = false
  };

  /**
   * builds the Dockerfile
   */
  async build () {
    plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag)
    let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} .`
    await bash(buildCommand)
    NpmciEnv.dockerFilesBuilt.push(this)
    return
  };

  /**
   * pushes the Dockerfile to a registry
   */
  async push(stageArg) {
    switch (stageArg) {
      case 'release':
        await bash(`docker tag ${this.buildTag} ${this.releaseTag}`)
        await bash(`docker push ${this.releaseTag}`)

        // if release registry is different from gitlab
        if (NpmciEnv.dockerRegistry !== 'registry.gitlab.com') {
          await bash(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`)
          await bash(`docker push ${this.gitlabReleaseTag}`)
        }
        break
      case 'test':
      default:
        await bash(`docker tag ${this.buildTag} ${this.gitlabTestTag}`)
        await bash(`docker push ${this.gitlabTestTag}`)
        break
    }
  };

  /**
   * pulls the Dockerfile from a registry
   */
  async pull(registryArg: string) {
    let pullTag = this.gitlabTestTag
    await bash('docker pull ' + pullTag)
    await bash('docker tag ' + pullTag + ' ' + this.buildTag)
  };

  /**
   * tests the Dockerfile;
   */
  async test() {
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
  };

  /**
   * gets the id of a Dockerfile
   */
  async getId() {
    let containerId = await bash('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag)
    return containerId
  };
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
 * 
 */
export let dockerBaseImage = function (dockerfileContentArg: string) {
  let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/
  let regexResultArray = baseImageRegex.exec(dockerfileContentArg)
  return regexResultArray[ 1 ]
}

/**
 * 
 */
export let dockerTag = function (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string): string {
  let tagString: string
  let registry = registryArg
  let repo = repoArg
  let version = versionArg
  if (suffixArg) {
    version = versionArg + '_' + suffixArg
  };
  tagString = registry + '/' + repo + ':' + version
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
