var express = require('express');
var expressHandlebars = require('express3-handlebars');

var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});

var data = require('./data/data');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var data = require('./data/data');

app.get('/tables', function(req, res){
	res.render('tables', {
		readings: data.readings
	});
});

app.get('/charts', function(req, res){
	res.render('charts');
});

app.get('/signup', function(req, res){
	res.render('signup');
});

app.post('/signup', function(req, res){
	res.render('thanks');
});

app.get('/', function(req, res){
	res.render('index');
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});