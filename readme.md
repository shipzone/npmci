# @shipzone/npmci
node and docker in gitlab ci on steroids

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@shipzone/npmci)
* [gitlab.com (source)](https://gitlab.com/shipzone/npmci)
* [github.com (source mirror)](https://github.com/shipzone/npmci)
* [docs (typedoc)](https://shipzone.gitlab.io/npmci/)

## Status for master
[![build status](https://gitlab.com/shipzone/npmci/badges/master/build.svg)](https://gitlab.com/shipzone/npmci/commits/master)
[![coverage report](https://gitlab.com/shipzone/npmci/badges/master/coverage.svg)](https://gitlab.com/shipzone/npmci/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@shipzone/npmci.svg)](https://www.npmjs.com/package/@shipzone/npmci)
[![Known Vulnerabilities](https://snyk.io/test/npm/@shipzone/npmci/badge.svg)](https://snyk.io/test/npm/@shipzone/npmci)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

npmci is designed to work in docker CI environments. The following docker images come with npmci presinstalled:

Docker Hub:

- [hosttoday/ht-docker-node:npmci](https://hub.docker.com/r/hosttoday/ht-docker-node/)  
  has LTS node version and npmci preinstalled.
- [hosttoday/ht-docker-dbase](https://hub.docker.com/r/hosttoday/ht-docker-dbase/)  
  based on docker:git, can be used to build docker images in conjunction with docker:dind

npmci can be called from commandline and handle a lot of tasks durug ci:

```shell
# Handle node versions
npmci node install stable # will install latest stable node version and update PATH for node and npm
npmci node install lts # will install latest LTS node version and update PATH for node and npm versions
npmci node install legacy # will install latest legacy node version and update PATH for node and npm
npmci node install x.x.x #  will install any specific node version.

# Handle npm and yarn tasks
npmcu npm login # logs in npm using the auth key provided at env var "NPMCI_TOKEN_NPM"
npmci npm install  # installs dependencies using npm or yarn dependending on availablity
npmci npm test # tests the package
npmci npm publish # builds a package and publishes it

# handle docker tasks
npmci docker prepare
## npmci test docker will look at all Dockerfiles and look for according tags on GitLab container registry


# prepare tools
npmci prepare npm # will look for $NPMCI_TOKEN_NPM env var and create .npmrc, so npm is authenticated
npmci prepare docker # will look for $NPMCI_LOGIN_DOCKER in form username|password and authenticate docker
npmci prepare docker-gitlab # will authenticate docker for gitlab container registry

# build containers
npmci docker build # will build containers
## all Dockerfiles named Dockerfile* are picked up.
## specify tags like this Dockerfile_[tag]
## uploads all built images as [username]/[reponame]:[tag]_test to GitLab
## then test in next step with "npmci test docker"

# publish npm module
npmci publish npm # will look vor $NPMCI_TOKEN_NPM env var and push any module in cwd to npm
npmci publish docker

# trigger webhooks
npmci trigger # will look for NPMCI_TRIGGER_1 to NPMCI_TRIGGER_100 in form domain|id|token|ref|name
```

## Configuration

npmci supports the use of npmextra.

To configure npmci create a `npmextra.json` file at the root of your project

```json
{
  "npmci": {
    "globalNpmTools": ["npm-check-updates", "protractor", "npmts", "gitzone"]
  }
}
```

**Available options**

| setting        | example                       | description                                                                                       |
| -------------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| globalNpmTools | "globalNpmTools": ["gitbook"] | Will look for the specified package names locally and (if not yet present) install them from npm. |

For further information read the linked docs at the top of this README.

Use TypeScript for best in class instellisense.

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://shipzone.gitlab.io/assets/repo-footer.svg)](https://maintainedby.lossless.com)
