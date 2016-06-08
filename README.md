# NPMCI
npmci is your friend when it comes to handling npm packages during CI builds. It is optimized for GitLab CI

## Status
[![build status](https://gitlab.com/pushrocks/npmci/badges/master/build.svg)](https://gitlab.com/pushrocks/npmci/commits/master)

## Usage
npmci is designed to work in docker CI environments. The following docker images come with npmci presinstalled:

Docker Hub:

* [hosttoday/ht-docker-node:npmci](https://hub.docker.com/r/hosttoday/ht-docker-node/)  
has LTS node version and npmci preinstalled.
* [hosttoday/ht-docker-dbase](https://hub.docker.com/r/hosttoday/ht-docker-dbase/)  
based on docker:git, can be used to build docker images in conjunction with docker:dind

npmci can be called from commandline:
```shell
# Install any node version:
npmci install lts # will install latest LTS node version and update PATH for node and npm versions
npmci install stable # will install latest stable node version and update PATH for node and npm
npmci install legacy # will install latest legacy node version and update PATH for node and npm
npmci install x.x.x #  will install any specific node version.

# Install any node version, install dependencies and run test in cwd:
npmci test lts # will install latest lts node version and run "npm install" and "npm test".
npmci test stable # will install latest stable node version and run "npm install" and "npm test".
npmci test legacy # will install latest legacy node version and run "npm install" and "npm test".
npmci test x.x.x # will install any specific node version and run "npm install" and "npm test".
npmci test docker # will test any build image with tests defined in ./npmci/dockertest_1.sh to ./npmci/dockertest_100.sh
## npmci test docker will look at all Dockerfiles and look for according tags on GitLab container registry


# prepare tools
npmci prepare npm # will look for $NPMCI_TOKEN_NPM env var and create .npmrc, so npm is authenticated
npmci prepare docker # will look for $NPMCI_LOGIN_DOCKER in form username|password and authenticate docker
npmci prepare docker-gitlab # will authenticate docker for gitlab container registry

# build containers
npmci build docker # will build containers
## all Dockerfiles named DOckerfile* are picked up.
## specify tags lake this Dockerfile_[tag]
## uploads all built images as [username]/[reponame]:[tag]_test to GitLab
## then test in next step with "npmci test docker"

# publish npm module
npmci publish npm # will look vor $NPMCI_TOKEN_NPM env var and push any module in cwd to npm
npmci publish docker

# trigger webhooks
npmci trigger # will look for NPMCI_TRIGGER_1 to NPMCI_TRIGGER_100 in form domain|id|token|ref|name  
```

