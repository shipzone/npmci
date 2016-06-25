"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var sshRegex = /^(.*)\|(.*)\|(.*)/;
var sshInstance;
exports.ssh = function () {
    var done = plugins.q.defer();
    sshInstance = new plugins.smartssh.SshInstance();
    plugins.smartparam.forEachMinimatch(process.env, "NPMCI_SSHKEY_*", evaluateSshEnv);
    sshInstance.writeToDisk();
    done.resolve();
    return done.promise;
};
var evaluateSshEnv = function (sshkeyEnvVarArg) {
    var resultArray = sshRegex.exec(sshkeyEnvVarArg);
    var sshKey = new plugins.smartssh.SshKey();
    if (notUndefined(resultArray[1]))
        sshKey.host = resultArray[1];
    if (notUndefined(resultArray[2]))
        sshKey.privKeyBase64 = resultArray[2];
    if (notUndefined(resultArray[3]))
        sshKey.pubKeyBase64 = resultArray[3];
    sshInstance.addKey(sshKey);
};
var notUndefined = function (stringArg) {
    return (stringArg && stringArg != "undefined" && stringArg != "##");
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnNzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsSUFBSSxRQUFRLEdBQUcsbUJBQW1CLENBQUE7QUFDbEMsSUFBSSxXQUF3QyxDQUFDO0FBRWxDLFdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDakYsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLElBQUksY0FBYyxHQUFHLFVBQUMsZUFBZTtJQUNqQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUUzQyxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RCxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RSxFQUFFLENBQUEsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV0RSxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUVGLElBQUksWUFBWSxHQUFHLFVBQUMsU0FBZ0I7SUFDaEMsTUFBTSxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsSUFBSSxXQUFXLElBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFBO0FBQ3ZFLENBQUMsQ0FBQSIsImZpbGUiOiJucG1jaS5zc2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5cbmxldCBzc2hSZWdleCA9IC9eKC4qKVxcfCguKilcXHwoLiopL1xubGV0IHNzaEluc3RhbmNlOnBsdWdpbnMuc21hcnRzc2guU3NoSW5zdGFuY2U7XG5cbmV4cG9ydCBsZXQgc3NoID0gKCkgPT4ge1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgc3NoSW5zdGFuY2UgPSBuZXcgcGx1Z2lucy5zbWFydHNzaC5Tc2hJbnN0YW5jZSgpO1xuICAgIHBsdWdpbnMuc21hcnRwYXJhbS5mb3JFYWNoTWluaW1hdGNoKHByb2Nlc3MuZW52LFwiTlBNQ0lfU1NIS0VZXypcIixldmFsdWF0ZVNzaEVudik7XG4gICAgc3NoSW5zdGFuY2Uud3JpdGVUb0Rpc2soKTtcbiAgICBkb25lLnJlc29sdmUoKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTtcblxubGV0IGV2YWx1YXRlU3NoRW52ID0gKHNzaGtleUVudlZhckFyZykgPT4ge1xuICAgIGxldCByZXN1bHRBcnJheSA9IHNzaFJlZ2V4LmV4ZWMoc3Noa2V5RW52VmFyQXJnKTtcbiAgICBsZXQgc3NoS2V5ID0gbmV3IHBsdWdpbnMuc21hcnRzc2guU3NoS2V5KCk7XG4gICAgXG4gICAgaWYobm90VW5kZWZpbmVkKHJlc3VsdEFycmF5WzFdKSkgc3NoS2V5Lmhvc3QgPSByZXN1bHRBcnJheVsxXTtcbiAgICBpZihub3RVbmRlZmluZWQocmVzdWx0QXJyYXlbMl0pKSBzc2hLZXkucHJpdktleUJhc2U2NCA9IHJlc3VsdEFycmF5WzJdO1xuICAgIGlmKG5vdFVuZGVmaW5lZChyZXN1bHRBcnJheVszXSkpIHNzaEtleS5wdWJLZXlCYXNlNjQgPSByZXN1bHRBcnJheVszXTtcbiAgICBcbiAgICBzc2hJbnN0YW5jZS5hZGRLZXkoc3NoS2V5KTtcbn07XG5cbmxldCBub3RVbmRlZmluZWQgPSAoc3RyaW5nQXJnOnN0cmluZykgPT4ge1xuICAgIHJldHVybiAoc3RyaW5nQXJnICYmIHN0cmluZ0FyZyAhPSBcInVuZGVmaW5lZFwiICYmIHN0cmluZ0FyZyAhPSBcIiMjXCIpXG59Il19
