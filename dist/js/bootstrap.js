var browser_1 = require('angular2/platform/browser');
var app_1 = require('./app');
browser_1.bootstrap(app_1.BaseComponent)
    .then(function (success) { return console.log("bootstrapping success: ", success); }, function (error) { return console.log("bootstrapping error: ", error); });

//# sourceMappingURL=bootstrap.js.map
