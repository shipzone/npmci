"use strict";
require("typings-global");
var plugins = require("./npmci.plugins");
var paths = require("./npmci.paths");
/**
 * cleans npmci config files
 */
exports.clean = function () {
    var done = plugins.q.defer();
    plugins.smartfile.fs.removeSync(paths.NpmciPackageConfig);
    done.resolve();
    return done.promise;
};

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5wbWNpLmNsZWFuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxRQUFPLGdCQUFnQixDQUFDLENBQUE7QUFDeEIsSUFBWSxPQUFPLFdBQU0saUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxJQUFZLEtBQUssV0FBTSxlQUt2QixDQUFDLENBTHFDO0FBRXRDOztHQUVHO0FBQ1EsYUFBSyxHQUFHO0lBQ2YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDeEIsQ0FBQyxDQUFDIiwiZmlsZSI6Im5wbWNpLmNsZWFuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwidHlwaW5ncy1nbG9iYWxcIjtcbmltcG9ydCAqIGFzIHBsdWdpbnMgZnJvbSBcIi4vbnBtY2kucGx1Z2luc1wiO1xuaW1wb3J0ICogYXMgcGF0aHMgZnJvbSBcIi4vbnBtY2kucGF0aHNcIlxuXG4vKipcbiAqIGNsZWFucyBucG1jaSBjb25maWcgZmlsZXNcbiAqL1xuZXhwb3J0IGxldCBjbGVhbiA9ICgpID0+IHtcbiAgICBsZXQgZG9uZSA9IHBsdWdpbnMucS5kZWZlcigpO1xuICAgIHBsdWdpbnMuc21hcnRmaWxlLmZzLnJlbW92ZVN5bmMocGF0aHMuTnBtY2lQYWNrYWdlQ29uZmlnKTtcbiAgICBkb25lLnJlc29sdmUoKTtcbiAgICByZXR1cm4gZG9uZS5wcm9taXNlO1xufTsiXX0=
