"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./mod.plugins");
const paths = require("../npmci.paths");
const NpmciEnv = require("../npmci.env");
const npmci_bash_1 = require("../npmci.bash");
/**
 * handle cli input
 * @param argvArg
 */
exports.handleCli = (argvArg) => __awaiter(this, void 0, void 0, function* () {
    exports.modArgvArg = argvArg;
    if (argvArg._.length >= 2) {
        let action = argvArg._[1];
        switch (action) {
            case 'build':
                yield exports.build();
                break;
            case 'prepare':
                yield exports.prepare();
                break;
            case 'test':
                yield exports.test();
                break;
            default:
                plugins.beautylog.error(`>>npmci node ...<< action >>${action}<< not supported`);
        }
    }
    else {
        plugins.beautylog.log(`>>npmci node ...<< cli arguments invalid... Please read the documentation.`);
    }
});
/**
 * logs in docker
 */
exports.prepare = () => __awaiter(this, void 0, void 0, function* () {
    NpmciEnv.setDockerRegistry('docker.io'); // TODO: checkup why we set this here
    // handle registries
    plugins.smartparam.forEachMinimatch(process.env, 'NPMCI_LOGIN_DOCKER*', (envString) => __awaiter(this, void 0, void 0, function* () {
        let dockerRegexResultArray = envString.split('|');
        if (dockerRegexResultArray.length !== 3) {
            plugins.beautylog.error('malformed docker env var...');
            process.exit(1);
            return;
        }
        let registry = dockerRegexResultArray[0];
        let username = dockerRegexResultArray[1];
        let password = dockerRegexResultArray[2];
        if (registry === 'docker.io') {
            yield npmci_bash_1.bash(`docker login -u ${username} -p ${password}`);
            plugins.beautylog.info('Logged in to standard docker hub');
        }
        else {
            yield npmci_bash_1.bash(`docker login -u ${username} -p ${password} ${registry}`);
        }
        plugins.beautylog.success(`docker authenticated for ${registry}!`);
    }));
    // Always login to GitLab Registry
    if (!process.env.CI_BUILD_TOKEN || process.env.CI_BUILD_TOKEN === '') {
        plugins.beautylog.error('No registry token specified by gitlab!');
        return;
    }
    yield npmci_bash_1.bash(`docker login -u gitlab-ci-token -p ${process.env.CI_BUILD_TOKEN} registry.gitlab.com`);
    plugins.beautylog.success(`docker authenticated for registry.gitlab.com!`);
    return;
});
/**
 * builds a cwd of Dockerfiles by triggering a promisechain
 */
exports.build = () => __awaiter(this, void 0, void 0, function* () {
    plugins.beautylog.log('now building Dockerfiles...');
    yield exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.buildDockerfiles);
});
exports.push = () => __awaiter(this, void 0, void 0, function* () {
    yield exports.readDockerfiles()
        .then(exports.sortDockerfiles)
        .then(exports.mapDockerfiles)
        .then(exports.pushDockerfiles);
});
exports.pull = () => __awaiter(this, void 0, void 0, function* () {
    return yield exports.readDockerfiles()
        .then(exports.pullDockerfileImages);
});
exports.test = () => __awaiter(this, void 0, void 0, function* () {
    return yield exports.readDockerfiles()
        .then(exports.testDockerfiles);
});
/**
 * creates instance of class Dockerfile for all Dockerfiles in cwd
 * @returns Promise<Dockerfile[]>
 */
exports.readDockerfiles = () => __awaiter(this, void 0, void 0, function* () {
    let fileTree = yield plugins.smartfile.fs.listFileTree(paths.cwd, 'Dockerfile*');
    // create the Dockerfile array
    let readDockerfilesArray = [];
    plugins.beautylog.info(`found ${fileTree.length} Dockerfiles:`);
    console.log(fileTree);
    for (let dockerfilePath of fileTree) {
        let myDockerfile = new Dockerfile({
            filePath: dockerfilePath,
            read: true
        });
        readDockerfilesArray.push(myDockerfile);
    }
    return readDockerfilesArray;
});
/**
 * sorts Dockerfiles into a dependency chain
 * @param sortableArrayArg an array of instances of class Dockerfile
 * @returns Promise<Dockerfile[]>
 */
exports.sortDockerfiles = (sortableArrayArg) => {
    let done = plugins.q.defer();
    plugins.beautylog.info('sorting Dockerfiles:');
    let sortedArray = [];
    let cleanTagsOriginal = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
    let sorterFunctionCounter = 0;
    let sorterFunction = function () {
        sortableArrayArg.forEach((dockerfileArg) => {
            let cleanTags = exports.cleanTagsArrayFunction(sortableArrayArg, sortedArray);
            if (cleanTags.indexOf(dockerfileArg.baseImage) === -1 && sortedArray.indexOf(dockerfileArg) === -1) {
                sortedArray.push(dockerfileArg);
            }
            if (cleanTagsOriginal.indexOf(dockerfileArg.baseImage) !== -1) {
                dockerfileArg.localBaseImageDependent = true;
            }
        });
        if (sortableArrayArg.length === sortedArray.length) {
            let counter = 1;
            for (let dockerfile of sortedArray) {
                plugins.beautylog.log(`tag ${counter}: -> ${dockerfile.cleanTag}`);
                counter++;
            }
            done.resolve(sortedArray);
        }
        else if (sorterFunctionCounter < 10) {
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
exports.mapDockerfiles = (sortedArray) => __awaiter(this, void 0, void 0, function* () {
    sortedArray.forEach((dockerfileArg) => {
        if (dockerfileArg.localBaseImageDependent) {
            sortedArray.forEach((dockfile2) => {
                if (dockfile2.cleanTag === dockerfileArg.baseImage) {
                    dockerfileArg.localBaseDockerfile = dockfile2;
                }
            });
        }
    });
    return sortedArray;
});
/**
 * builds the correspoding real docker image for each Dockerfile class instance
 */
exports.buildDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.build();
    }
    return sortedArrayArg;
});
/**
 * pushes the real Dockerfile images to a Docker registry
 */
exports.pushDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    let stageArg = (function () {
        if (exports.modArgvArg._ && exports.modArgvArg._.length >= 3) {
            return exports.modArgvArg._[2];
        }
        else {
            return NpmciEnv.buildStage;
        }
    })();
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.push(stageArg);
    }
    return sortedArrayArg;
});
/**
 * pulls corresponding real Docker images for instances of Dockerfile from a registry.
 * This is needed if building, testing, and publishing of Docker images is carried out in seperate CI stages.
 */
exports.pullDockerfileImages = (sortableArrayArg, registryArg = 'registry.gitlab.com') => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortableArrayArg) {
        yield dockerfileArg.pull(registryArg);
    }
    return sortableArrayArg;
});
/**
 * tests all Dockerfiles in by calling class Dockerfile.test();
 * @param sortedArrayArg Dockerfile[] that contains all Dockerfiles in cwd
 */
exports.testDockerfiles = (sortedArrayArg) => __awaiter(this, void 0, void 0, function* () {
    for (let dockerfileArg of sortedArrayArg) {
        yield dockerfileArg.test();
    }
    return sortedArrayArg;
});
/**
 * class Dockerfile represents a Dockerfile on disk in npmci
 */
class Dockerfile {
    constructor(options) {
        this.filePath = options.filePath;
        this.repo = NpmciEnv.repo.user + '/' + NpmciEnv.repo.repo;
        this.version = exports.dockerFileVersion(plugins.path.parse(options.filePath).base);
        this.cleanTag = this.repo + ':' + this.version;
        this.buildTag = this.cleanTag;
        this.gitlabTestTag = exports.getDockerTagString('docker.io', this.repo, this.version, 'test'); // TODO: using docker.io until gitlab is fixed
        this.gitlabReleaseTag = exports.getDockerTagString('docker.io', this.repo, this.version); // TODO: using docker.io until gitlab is fixed
        // the releaseTag determines where the image gets released
        this.releaseTag = exports.getDockerTagString('docker.io', this.repo, this.version);
        this.containerName = 'dockerfile-' + this.version;
        if (options.filePath && options.read) {
            this.content = plugins.smartfile.fs.toStringSync(plugins.path.resolve(options.filePath));
        }
        this.baseImage = exports.dockerBaseImage(this.content);
        this.localBaseImageDependent = false;
    }
    /**
     * builds the Dockerfile
     */
    build() {
        return __awaiter(this, void 0, void 0, function* () {
            plugins.beautylog.info('now building Dockerfile for ' + this.cleanTag);
            let buildCommand = `docker build -t ${this.buildTag} -f ${this.filePath} .`;
            yield npmci_bash_1.bash(buildCommand);
            NpmciEnv.dockerFilesBuilt.push(this);
            return;
        });
    }
    /**
     * pushes the Dockerfile to a registry
     */
    push(stageArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.releaseTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabReleaseTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.buildTag} ${this.gitlabTestTag}`);
            switch (stageArg) {
                case 'release':
                    yield npmci_bash_1.bash(`docker push ${this.gitlabReleaseTag}`);
                    yield npmci_bash_1.bash(`docker push ${this.releaseTag}`);
                    break;
                case 'test':
                default:
                    yield npmci_bash_1.bash(`docker push ${this.gitlabTestTag}`);
                    break;
            }
        });
    }
    /**
     * pulls the Dockerfile from a registry
     */
    pull(registryArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield npmci_bash_1.bash(`docker pull ${this.gitlabTestTag}`);
            yield npmci_bash_1.bash(`docker tag ${this.gitlabTestTag} ${this.buildTag}`);
        });
    }
    /**
     * tests the Dockerfile;
     */
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            let testFile = plugins.path.join(paths.NpmciTestDir, 'test_' + this.version + '.sh');
            let testFileExists = plugins.smartfile.fs.fileExistsSync(testFile);
            if (testFileExists) {
                // run tests
                yield npmci_bash_1.bash('docker run --name npmci_test_container ' + this.buildTag + ' mkdir /npmci_test');
                yield npmci_bash_1.bash('docker cp ' + testFile + ' npmci_test_container:/npmci_test/test.sh');
                yield npmci_bash_1.bash('docker commit npmci_test_container npmci_test_image');
                yield npmci_bash_1.bash('docker run npmci_test_image sh /npmci_test/test.sh');
                yield npmci_bash_1.bash('docker rm npmci_test_container');
                yield npmci_bash_1.bash('docker rmi --force npmci_test_image');
            }
            else {
                plugins.beautylog.warn('skipping tests for ' + this.cleanTag + ' because no testfile was found!');
            }
        });
    }
    /**
     * gets the id of a Dockerfile
     */
    getId() {
        return __awaiter(this, void 0, void 0, function* () {
            let containerId = yield npmci_bash_1.bash('docker inspect --type=image --format=\"{{.Id}}\" ' + this.buildTag);
            return containerId;
        });
    }
}
exports.Dockerfile = Dockerfile;
/**
 * returns a version for a docker file
 * @execution SYNC
 */
exports.dockerFileVersion = (dockerfileNameArg) => {
    let versionString;
    let versionRegex = /Dockerfile_([a-zA-Z0-9\.]*)$/;
    let regexResultArray = versionRegex.exec(dockerfileNameArg);
    if (regexResultArray && regexResultArray.length === 2) {
        versionString = regexResultArray[1];
    }
    else {
        versionString = 'latest';
    }
    return versionString;
};
/**
 * returns the docker base image for a Dockerfile
 */
exports.dockerBaseImage = function (dockerfileContentArg) {
    let baseImageRegex = /FROM\s([a-zA-z0-9\/\-\:]*)\n?/;
    let regexResultArray = baseImageRegex.exec(dockerfileContentArg);
    return regexResultArray[1];
};
/**
 * returns the docker tag
 */
exports.getDockerTagString = function (registryArg, repoArg, versionArg, suffixArg) {
    // determine wether the suffix is needed
    let version = versionArg;
    if (suffixArg) {
        version = versionArg + '_' + suffixArg;
    }
    let tagString = `${registryArg}/${repoArg}:${version}`;
    return tagString;
};
/**
 *
 */
exports.cleanTagsArrayFunction = function (dockerfileArrayArg, trackingArrayArg) {
    let cleanTagsArray = [];
    dockerfileArrayArg.forEach(function (dockerfileArg) {
        if (trackingArrayArg.indexOf(dockerfileArg) === -1) {
            cleanTagsArray.push(dockerfileArg.cleanTag);
        }
    });
    return cleanTagsArray;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90cy9tb2RfZG9ja2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSx5Q0FBd0M7QUFDeEMsd0NBQXVDO0FBQ3ZDLHlDQUF3QztBQUN4Qyw4Q0FBb0M7QUFJcEM7OztHQUdHO0FBQ1EsUUFBQSxTQUFTLEdBQUcsQ0FBTyxPQUFPO0lBQ25DLGtCQUFVLEdBQUcsT0FBTyxDQUFBO0lBQ3BCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxNQUFNLEdBQVcsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2YsS0FBSyxPQUFPO2dCQUNWLE1BQU0sYUFBSyxFQUFFLENBQUE7Z0JBQ2IsS0FBSyxDQUFBO1lBQ1AsS0FBSyxTQUFTO2dCQUNaLE1BQU0sZUFBTyxFQUFFLENBQUE7Z0JBQ2YsS0FBSyxDQUFBO1lBQ1AsS0FBSyxNQUFNO2dCQUNULE1BQU0sWUFBSSxFQUFFLENBQUE7Z0JBQ1osS0FBSyxDQUFBO1lBQ1A7Z0JBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsK0JBQStCLE1BQU0sa0JBQWtCLENBQUMsQ0FBQTtRQUNwRixDQUFDO0lBQ0gsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsNEVBQTRFLENBQUMsQ0FBQTtJQUNyRyxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFHRDs7R0FFRztBQUNRLFFBQUEsT0FBTyxHQUFHO0lBQ25CLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQSxDQUFDLHFDQUFxQztJQUU3RSxvQkFBb0I7SUFDcEIsT0FBTyxDQUFDLFVBQVUsQ0FB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