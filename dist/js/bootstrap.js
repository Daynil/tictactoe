var browser_1 = require('angular2/platform/browser');
var common_1 = require('angular2/common');
var app_1 = require('./app');
browser_1.bootstrap(app_1.BaseComponent, [common_1.CORE_DIRECTIVES])
    .then(function (success) { return console.log("bootstrapping success: ", success); }, function (error) { return console.log("bootstrapping error: ", error); });

//# sourceMappingURL=bootstrap.js.map
