var server = require('./server.js');
var routes = ['carts'];
var serviceName = "carts";
server.start(serviceName, routes);