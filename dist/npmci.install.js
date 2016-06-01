"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var npmci_bash_1 = require("./npmci.bash");
exports.install = function (versionArg) {
    var done = plugins.q.defer();
    plugins.beautylog.log("now installing " + "node ".green + ("version " + versionArg).yellow);
    var version;
    if (versionArg == "lts") {
        version = "4";
    }
    else if (versionArg = "legacy") {
        version = "4.0.0";
    }
    else {
        version = versionArg;
    }
    ;
    npmci_bash_1.bash("nvm install " + version +
        " && nvm alias default " + version);
    plugins.beautylog.success("Node version " + version + " successfully installed!");
    npmci_bash_1.bash("node -v");
    npmci_bash_1.bash("npm -v");
    done.resolve();
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUcsVUFBQyxVQUFVO0lBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RixJQUFJLE9BQWMsQ0FBQztJQUNuQixFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLENBQUEsQ0FBQztRQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDN0IsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQUksQ0FDQSxjQUFjLEdBQUcsT0FBTztRQUN4Qix3QkFBd0IsR0FBRyxPQUFPLENBQ3JDLENBQUM7SUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLDBCQUEwQixDQUFDLENBQUM7SUFDbEYsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIiwiZmlsZSI6Im5wbWNpLmluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcclxuaW1wb3J0IHtiYXNofSBmcm9tIFwiLi9ucG1jaS5iYXNoXCI7XHJcblxyXG5leHBvcnQgbGV0IGluc3RhbGwgPSAodmVyc2lvbkFyZykgPT4ge1xyXG4gICAgbGV0IGRvbmUgPSBwbHVnaW5zLnEuZGVmZXIoKTtcclxuICAgIHBsdWdpbnMuYmVhdXR5bG9nLmxvZyhcIm5vdyBpbnN0YWxsaW5nIFwiICsgXCJub2RlIFwiLmdyZWVuICsgKFwidmVyc2lvbiBcIiArIHZlcnNpb25BcmcpLnllbGxvdyk7XHJcbiAgICBsZXQgdmVyc2lvbjpzdHJpbmc7XHJcbiAgICBpZih2ZXJzaW9uQXJnID09IFwibHRzXCIpe1xyXG4gICAgICAgIHZlcnNpb24gPSBcIjRcIjtcclxuICAgIH0gZWxzZSBpZih2ZXJzaW9uQXJnID0gXCJsZWdhY3lcIil7XHJcbiAgICAgICAgdmVyc2lvbiA9IFwiNC4wLjBcIlxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbkFyZztcclxuICAgIH07XHJcbiAgICBiYXNoKFxyXG4gICAgICAgIFwibnZtIGluc3RhbGwgXCIgKyB2ZXJzaW9uICtcclxuICAgICAgICBcIiAmJiBudm0gYWxpYXMgZGVmYXVsdCBcIiArIHZlcnNpb25cclxuICAgICk7XHJcbiAgICBwbHVnaW5zLmJlYXV0eWxvZy5zdWNjZXNzKFwiTm9kZSB2ZXJzaW9uIFwiICsgdmVyc2lvbiArIFwiIHN1Y2Nlc3NmdWxseSBpbnN0YWxsZWQhXCIpO1xyXG4gICAgYmFzaChcIm5vZGUgLXZcIik7XHJcbiAgICBiYXNoKFwibnBtIC12XCIpO1xyXG4gICAgZG9uZS5yZXNvbHZlKCk7XHJcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xyXG59Il19
