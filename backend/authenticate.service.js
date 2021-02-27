var server = require('./server.js');
var routes = ['authenticate'];
var serviceName = "authenticate";
server.start(serviceName, routes);