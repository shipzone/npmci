# NPMCI
npmci is your friend when it comes to handling npm packages during CI builds. It is optimized for GitLab CI

## Status
[![build status](https://gitlab.com/pushrocks/npmci/badges/master/build.svg)](https://gitlab.com/pushrocks/npmci/commits/master)
[![Build status](https://ci.appveyor.com/api/projects/status/7h4qq2qtrke5a9vj/branch/master?svg=true)](https://ci.appveyor.com/project/philkunz/npmci/branch/master)

## Usage
npmci is designed to work in docker CI environments. The following docker images come with npmci presinstalled:

Docker Hub:

* [hosttoday/ht-docker-node](https://hub.docker.com/r/hosttoday/ht-docker-node/)  
has LTS node version preinstalled. Change it with npmci
* [hosttoday/ht-docker-node-python-3](https://hub.docker.com/r/hosttoday/ht-docker-node-python3/)  
like ht-docker-node, but with python3 instead of python2.7

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

# prepare tools
npmci prepare npm # will look vor $NPMCI_TOKEN_NPM env var and create .npmrc, so npm is authenticated
npmci prepare docker # will look $NPMCI_LOGIN_DOCKER ind form username|password and authenticate docker
npmci prepare docker-gitlab # will log you in to gitlab container registry

# build containers
npmci build docker # will build container and tag it

# publish npm module
npmci publish npm # will look vor $NPMCI_TOKEN_NPM env var and push any module in cwd to npm
npmci publish docker

# trigger webhooks
npmci trigger # will look for NPMCI_TRIGGER_1 to NPMCI_TRIGGER_99 in form domain|id|token|ref|name  
```

