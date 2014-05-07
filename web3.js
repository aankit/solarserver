var db = require('db.js');
var arduino = require('arduino');
var express = require('express');
var expressHandlebars = require('express3-handlebars');

var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});
var data = require('./data/data');

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({secret: 'solar'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var data = require('./data/data');

//create schema
var arduinoSchema = mongoose.Schema({
	pin: float,
	reading: float
});

var Arduino = mongoose.model('Arduino', arduinoSchema);

//ok this part needs to come from a post request
var arduino = new Arduino({
	pin: 1,
	reading: 255
});

arduino.save(function (err){
	if (err) return console.error(err);

});

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

var signInRoutes = require('./routes/login');
app.get('/signup', loginRoutes.get);
app.post('/signup', loginRoutes.post);

app.get('/', function(req, res){
	res.render('index');
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});