var express = require('express');
var expressHandlebars = require('express3-handlebars');
var routes = require('./routes')();
var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});

app.use(express.bodyParser());
app.use(express.cookieParser());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.put('/arduino', routes.arduino);
app.get('/tables', routes.tables);
app.get('/charts', routes.charts);
app.get('/signup', routes.signup);
app.get('/', routes.home);


app.post('/signup', function(req, res){
	res.render('thanks');
});

app.use('/public', express.static('public'));

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});