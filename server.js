var http = require('http');
var handler = require('./lib/controller');

var PORT = 2000;

var server = http.createServer(handler);

server.listen(PORT);
