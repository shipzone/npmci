"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
exports.install = function (versionArg) {
    var done = plugins.q.defer();
    var version;
    if (versionArg = "lts") {
        version = "4";
    }
    else {
        version = versionArg;
    }
    ;
    plugins.beautylog.log("now installing " + "node ".green + ("version " + version).yellow);
    plugins.shelljs.exec("bash -c \"source /usr/local/nvm/nvm.sh && nvm install " +
        version +
        " nvm alias default " +
        version +
        "\"");
    plugins.beautylog.success("Node version " + version + " successfully installed!");
    done.resolve();
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmluc3RhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sZ0JBQWdCLENBQUMsQ0FBQTtBQUN4QixJQUFZLE9BQU8sV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hDLGVBQU8sR0FBRyxVQUFDLFVBQVU7SUFDNUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixJQUFJLE9BQWMsQ0FBQztJQUNuQixFQUFFLENBQUEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUEsQ0FBQztRQUNuQixPQUFPLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE9BQU8sR0FBRyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUFBLENBQUM7SUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pGLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNoQix3REFBd0Q7UUFDeEQsT0FBTztRQUNQLHFCQUFxQjtRQUNyQixPQUFPO1FBQ1AsSUFBSSxDQUNQLENBQUM7SUFDRixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsT0FBTyxHQUFHLDBCQUEwQixDQUFDLENBQUM7SUFDbEYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFBIiwiZmlsZSI6Im5wbWNpLmluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJ0eXBpbmdzLWdsb2JhbFwiO1xyXG5pbXBvcnQgKiBhcyBwbHVnaW5zIGZyb20gXCIuL25wbWNpLnBsdWdpbnNcIjtcclxuZXhwb3J0IGxldCBpbnN0YWxsID0gKHZlcnNpb25BcmcpID0+IHtcclxuICAgIGxldCBkb25lID0gcGx1Z2lucy5xLmRlZmVyKCk7XHJcbiAgICBsZXQgdmVyc2lvbjpzdHJpbmc7XHJcbiAgICBpZih2ZXJzaW9uQXJnID0gXCJsdHNcIil7XHJcbiAgICAgICAgdmVyc2lvbiA9IFwiNFwiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB2ZXJzaW9uID0gdmVyc2lvbkFyZztcclxuICAgIH07XHJcbiAgICBwbHVnaW5zLmJlYXV0eWxvZy5sb2coXCJub3cgaW5zdGFsbGluZyBcIiArIFwibm9kZSBcIi5ncmVlbiArIChcInZlcnNpb24gXCIgKyB2ZXJzaW9uKS55ZWxsb3cpO1xyXG4gICAgcGx1Z2lucy5zaGVsbGpzLmV4ZWMoXHJcbiAgICAgICAgXCJiYXNoIC1jIFxcXCJzb3VyY2UgL3Vzci9sb2NhbC9udm0vbnZtLnNoICYmIG52bSBpbnN0YWxsIFwiK1xyXG4gICAgICAgIHZlcnNpb24gK1xyXG4gICAgICAgIFwiIG52bSBhbGlhcyBkZWZhdWx0IFwiICtcclxuICAgICAgICB2ZXJzaW9uICtcclxuICAgICAgICBcIlxcXCJcIlxyXG4gICAgKTtcclxuICAgIHBsdWdpbnMuYmVhdXR5bG9nLnN1Y2Nlc3MoXCJOb2RlIHZlcnNpb24gXCIgKyB2ZXJzaW9uICsgXCIgc3VjY2Vzc2Z1bGx5IGluc3RhbGxlZCFcIik7XHJcbiAgICBkb25lLnJlc29sdmUoKTtcclxuICAgIHJldHVybiBkb25lLnByb21pc2U7XHJcbn0iXX0=
