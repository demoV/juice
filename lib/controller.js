var juiceData = require('./juiceChartLib.js');
var path = require('path');
var express = require('express');
var app = express();


// var serveIndex = function(req, res){
// 	var fileName = path.join(__dirname,'./public/html/index.html');
// 	res.sendFile(fileName);
// };

var serveSugarlessJuiceData = function(req, res){
	var sugarlessJuiceData = juiceData.getWithoutSugarDrinks();
	res.send(sugarlessJuiceData);
};

app.use(express.static('./public'));
app.get('/', function(req,res){res.redirect('/html/index.html')});
app.get('/withoutSugar', serveSugarlessJuiceData);

module.exports = app;