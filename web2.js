// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

var menus = require('./data/menus').data;

app.get('/data', function(req, res){
	res.render('template.ejs', {
		title: 'Data Tables',
		menus: menus
	});
});

app.get('/charts', function(req, res){
	res.render('template.ejs', {
		title: 'Charts',
		menus: menus
	});
});

app.get('/poetry', function(req, res){
	res.render('template.ejs', {
		title: 'Poetry',
		menus: menus
	});
});

app.get('/', function(req, res){
	res.render('template.ejs', {
		title: 'Welcome',
		menus: menus
	});
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});