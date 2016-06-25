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
    else if (versionArg == "legacy") {
        version = "0";
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNDLDJCQUFtQixjQUFjLENBQUMsQ0FBQTtBQUV2QixlQUFPLEdBQUcsVUFBQyxVQUFVO0lBQzVCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM1RixJQUFJLE9BQWMsQ0FBQztJQUNuQixFQUFFLENBQUEsQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLENBQUEsQ0FBQztRQUNwQixPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxDQUFBLENBQUM7UUFDOUIsT0FBTyxHQUFHLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixPQUFPLEdBQUcsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFBQSxDQUFDO0lBQ0YsaUJBQUksQ0FDQSxjQUFjLEdBQUcsT0FBTztRQUN4Qix3QkFBd0IsR0FBRyxPQUFPLENBQ3JDLENBQUM7SUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLDBCQUEwQixDQUFDLENBQUM7SUFDbEYsaUJBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoQixpQkFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIiwiZmlsZSI6Im5wbWNpLmluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xuaW1wb3J0ICogYXMgcGx1Z2lucyBmcm9tIFwiLi9ucG1jaS5wbHVnaW5zXCI7XG5pbXBvcnQge2Jhc2h9IGZyb20gXCIuL25wbWNpLmJhc2hcIjtcblxuZXhwb3J0IGxldCBpbnN0YWxsID0gKHZlcnNpb25BcmcpID0+IHtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuICAgIHBsdWdpbnMuYmVhdXR5bG9nLmxvZyhcIm5vdyBpbnN0YWxsaW5nIFwiICsgXCJub2RlIFwiLmdyZWVuICsgKFwidmVyc2lvbiBcIiArIHZlcnNpb25BcmcpLnllbGxvdyk7XG4gICAgbGV0IHZlcnNpb246c3RyaW5nO1xuICAgIGlmKHZlcnNpb25BcmcgPT0gXCJsdHNcIil7XG4gICAgICAgIHZlcnNpb24gPSBcIjRcIjtcbiAgICB9IGVsc2UgaWYodmVyc2lvbkFyZyA9PSBcImxlZ2FjeVwiKXtcbiAgICAgICAgdmVyc2lvbiA9IFwiMFwiXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmVyc2lvbiA9IHZlcnNpb25Bcmc7XG4gICAgfTtcbiAgICBiYXNoKFxuICAgICAgICBcIm52bSBpbnN0YWxsIFwiICsgdmVyc2lvbiArXG4gICAgICAgIFwiICYmIG52bSBhbGlhcyBkZWZhdWx0IFwiICsgdmVyc2lvblxuICAgICk7XG4gICAgcGx1Z2lucy5iZWF1dHlsb2cuc3VjY2VzcyhcIk5vZGUgdmVyc2lvbiBcIiArIHZlcnNpb24gKyBcIiBzdWNjZXNzZnVsbHkgaW5zdGFsbGVkIVwiKTtcbiAgICBiYXNoKFwibm9kZSAtdlwiKTtcbiAgICBiYXNoKFwibnBtIC12XCIpO1xuICAgIGRvbmUucmVzb2x2ZSgpO1xuICAgIHJldHVybiBkb25lLnByb21pc2U7XG59Il19
