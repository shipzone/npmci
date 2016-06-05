import "typings-test";
import "should";
import path = require("path");
import * as beautylog from "beautylog"
//set up environment
process.env.CI_BUILD_REPO = "https://yyyyyy:xxxxxxxx@gitlab.com/mygroup/myrepo.git";
process.cwd = () => {
    return path.join(__dirname,"assets/");
};

//require NPMCI files
import NpmciBuildDocker = require("../dist/npmci.build.docker");


let dockerfile1:NpmciBuildDocker.Dockerfile;
let dockerfile2:NpmciBuildDocker.Dockerfile;
let sortableArray:NpmciBuildDocker.Dockerfile[];

describe("NPMCI",function(){
    describe("build.docker",function(){
        it("should return valid Dockerfiles",function(){
            dockerfile1 = new NpmciBuildDocker.Dockerfile({filePath:"./Dockerfile",read:true});
            dockerfile2 = new NpmciBuildDocker.Dockerfile({filePath:"./Dockerfile_sometag1",read:true});
            dockerfile1.version.should.equal("latest");
            dockerfile2.version.should.equal("sometag1");
        });
        it("should read a directory of Dockerfiles",function(done){
            NpmciBuildDocker.readDockerfiles()
                .then(function(readDockerfilesArrayArg:NpmciBuildDocker.Dockerfile[]){
                    readDockerfilesArrayArg[1].version.should.equal("sometag1");
                    sortableArray = readDockerfilesArrayArg
                    done();
                });
        })
        it("should sort an array of Dockerfiles",function(done){
            NpmciBuildDocker.sortDockerfiles(sortableArray)
                .then(function(sortedArrayArg:NpmciBuildDocker.Dockerfile[]){
                    beautylog.success("final result");
                    console.log(sortedArrayArg);
                    done();
                })
        })
    })
})