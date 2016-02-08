var path = require('path');
var express = require('express');
var app = express();


var serveIndex = function(req, res){
	var fileName = path.join(__dirname,'../public/html/index.html');
	res.sendFile(fileName);
}
app.get('/', serveIndex);
module.exports = app;