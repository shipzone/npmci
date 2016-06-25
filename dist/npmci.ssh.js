"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var sshRegex = /^(.*)\|?(.*)\|?(.*)/;
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
    if (resultArray[1] && resultArray[1] != "undefined")
        sshKey.privKeyBase64 = resultArray[1];
    var publicKey;
    if (resultArray[2] && resultArray[2] != "undefined")
        sshKey.pubKeyBase64 = resultArray[2];
    var host;
    if (resultArray[3] && resultArray[3] != "undefined")
        sshKey.host = resultArray[1];
    sshInstance.addKey(sshKey);
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLnNzaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsUUFBTyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hCLElBQVksT0FBTyxXQUFNLGlCQUFpQixDQUFDLENBQUE7QUFFM0MsSUFBSSxRQUFRLEdBQUcscUJBQXFCLENBQUE7QUFDcEMsSUFBSSxXQUF3QyxDQUFDO0FBRWxDLFdBQUcsR0FBRztJQUNiLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsV0FBVyxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRCxPQUFPLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDakYsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ3hCLENBQUMsQ0FBQztBQUVGLElBQUksY0FBYyxHQUFHLFVBQUMsZUFBZTtJQUNqQyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUUzQyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQztRQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFGLElBQUksU0FBZ0IsQ0FBQztJQUNyQixFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQztRQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pGLElBQUksSUFBVyxDQUFDO0lBQ2hCLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDO1FBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakYsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMiLCJmaWxlIjoibnBtY2kuc3NoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vbnBtY2kucGx1Z2luc1wiO1xuXG5sZXQgc3NoUmVnZXggPSAvXiguKilcXHw/KC4qKVxcfD8oLiopL1xubGV0IHNzaEluc3RhbmNlOnBsdWdpbnMuc21hcnRzc2guU3NoSW5zdGFuY2U7XG5cbmV4cG9ydCBsZXQgc3NoID0gKCkgPT4ge1xuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XG4gICAgc3NoSW5zdGFuY2UgPSBuZXcgcGx1Z2lucy5zbWFydHNzaC5Tc2hJbnN0YW5jZSgpO1xuICAgIHBsdWdpbnMuc21hcnRwYXJhbS5mb3JFYWNoTWluaW1hdGNoKHByb2Nlc3MuZW52LFwiTlBNQ0lfU1NIS0VZXypcIixldmFsdWF0ZVNzaEVudik7XG4gICAgc3NoSW5zdGFuY2Uud3JpdGVUb0Rpc2soKTtcbiAgICBkb25lLnJlc29sdmUoKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTtcblxubGV0IGV2YWx1YXRlU3NoRW52ID0gKHNzaGtleUVudlZhckFyZykgPT4ge1xuICAgIGxldCByZXN1bHRBcnJheSA9IHNzaFJlZ2V4LmV4ZWMoc3Noa2V5RW52VmFyQXJnKTtcbiAgICBsZXQgc3NoS2V5ID0gbmV3IHBsdWdpbnMuc21hcnRzc2guU3NoS2V5KCk7XG4gICAgXG4gICAgaWYocmVzdWx0QXJyYXlbMV0gJiYgcmVzdWx0QXJyYXlbMV0gIT0gXCJ1bmRlZmluZWRcIikgc3NoS2V5LnByaXZLZXlCYXNlNjQgPSByZXN1bHRBcnJheVsxXTtcbiAgICBsZXQgcHVibGljS2V5OnN0cmluZztcbiAgICBpZihyZXN1bHRBcnJheVsyXSAmJiByZXN1bHRBcnJheVsyXSAhPSBcInVuZGVmaW5lZFwiKSBzc2hLZXkucHViS2V5QmFzZTY0ID0gcmVzdWx0QXJyYXlbMl07XG4gICAgbGV0IGhvc3Q6c3RyaW5nO1xuICAgIGlmKHJlc3VsdEFycmF5WzNdICYmIHJlc3VsdEFycmF5WzNdICE9IFwidW5kZWZpbmVkXCIpIHNzaEtleS5ob3N0ID0gcmVzdWx0QXJyYXlbMV07XG4gICAgXG4gICAgc3NoSW5zdGFuY2UuYWRkS2V5KHNzaEtleSk7XG59OyJdfQ==
