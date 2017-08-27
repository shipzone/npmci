import * as plugins from './mod.plugins'
import * as paths from '../npmci.paths'
import * as NpmciEnv from '../npmci.env'
import { bash } from '../npmci.bash'

export let modArgvArg // will be set through the build command

/**
 * handle cli input
 * @param argvArg
 */
export let handleCli = async (argvArg) => {
  modArgvArg = argvArg
  if (argvArg._.length >= 2) {
    let action: string = argvArg._[1]
    switch (action) {
      case 'build':
        await build()
        break
      case 'prepare':
        await prepare()
        break
      case 'test':
        await test()
        break
      default:
        plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`)
    }
  } else {
    plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`)
  }
}


/**
 * logs in docker
 */
export let prepare = async () => {
  NpmciEnv.setDockerRegistry('docker.io') // TODO: checkup why we set this here

  // handle registries
  plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', async (envString) => {
    let dockerRegexResultArray = envString.split('|')
    if (dockerRegexResultArray.length !== 3) {
      plugins.beautylog.error('malformed docker env var...')
      process.exit(1)
      return
    }
    let registry = dockerRegexResultArray[0]
    let username = dockerRegexResultArray[1]
    let password = dockerRegexResultArray[2]
    if (registry === 'docker.io') {
      await bash(`docker login -u ${username} -p ${password}`)
      plugins.beautylog.info('Logged in to standard docker hub')
    } else {
      await bash(`docker login -u ${username} -p ${password} ${registry}`)
    }
    plugins.beautylog.success(`docker authenticated for ${registry}!`)
  })

  // Always login to GitLab Registry
  if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
    plugins.beautylog.error('No registry token specified by gitlab!')
    return
  }
  await bash(`docker login -u gitlab-ci-token -p ${process.env.CI_BUILD_TOKEN} registry.gitlab.com`)
  plugins.beautylog.success(`docker authenticated for registry.gitlab.com!`)
  return
}

/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
export let build = async () => {
  plugins.beautylog.log('now building Dockerfiles...')
  await readDockerfiles()
    .then(sortDockerfiles)
    .then(mapDockerfiles)
    .then(buildDockerfiles)
}

export let push = async () => {
  await readDockerfiles()
    .then(sortDockerfiles)
    .then(mapDockerfiles)
    .then(pushDockerfiles)
}

export let pull = async () => {
  return await readDockerfiles()
    .then(pullDockerfileImages)
}

export let test = async () => {
  return await readDockerfiles()
    .then(testDockerfiles)
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
 * pushes the real Dockerfile images to a Docker registry
 */
export let pushDockerfiles = async (sortedArrayArg: Dockerfile[]) => {
  let stageArg = (function () {
    if (modArgvArg._ && modArgvArg._.length >= 3) {
      return modArgvArg._[ 2 ]
    } else {
      return NpmciEnv.buildStage
    }
  })()
  for (let dockerfileArg of sortedArrayArg) {
    await dockerfileArg.push(stageArg)
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
  constructor(options: { filePath?: string, fileContents?: string | Buffer, read?: boolean }) {
    this.filePath = options.filePath
    this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo
    this.version = dockerFileVersion(plugins.path.parse(options.filePath).base)
    this.cleanTag = this.repo + ':' + this.version
    this.buildTag = this.cleanTag
    this.gitlabTestTag = getDockerTagString('docker.io', this.repo, this.version, 'test') // TODO: using docker.io until gitlab is fixed
    this.gitlabReleaseTag = getDockerTagString('docker.io', this.repo, this.version) // TODO: using docker.io until gitlab is fixed

    // the releaseTag determines where the image gets released
    this.releaseTag = getDockerTagString('docker.io', this.repo, this.version)

    this.containerName = 'dockerfile-' + this.version
    if (options.filePath && options.read) {
      this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath))
    }
    this.baseImage = dockerBaseImage(this.content)
    this.localBaseImageDependent = false
  }

  /**
   * builds the Dockerfile
   */
  async build () {
    plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag)
    let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} .`
    await bash(buildCommand)
    NpmciEnv.dockerFilesBuilt.push(this)
    return
  }

  /**
   * pushes the Dockerfile to a registry
   */
  async push (stageArg) {
    await bash(`docker tag ${this.buildTag} ${this.releaseTag}`)
    await bash(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`)
    await bash(`docker tag ${this.buildTag} ${this.gitlabTestTag}`)
    switch (stageArg) {
      case 'release':
        await bash(`docker push ${this.gitlabReleaseTag}`)
        await bash(`docker push ${this.releaseTag}`)
        break
      case 'test':
      default:
        await bash(`docker push ${this.gitlabTestTag}`)
        break
    }
  }

  /**
   * pulls the Dockerfile from a registry
   */
  async pull (registryArg: string) {
    await bash(`docker pull ${this.gitlabTestTag}`)
    await bash(`docker tag ${this.gitlabTestTag} ${this.buildTag}`)
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
export let getDockerTagString = function (registryArg: string, repoArg: string, versionArg: string, suffixArg?: string): string {
  // determine wether the suffix is needed
  let version = versionArg
  if (suffixArg) {
    version = versionArg + '_' + suffixArg
  }
  let tagString = `${registryArg}/${repoArg}:${version}`
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
