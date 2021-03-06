var express = require('express');
var expressHandlebars = require('express3-handlebars');

var app = express();
var handlebars = expressHandlebars.create({defaultLayout: 'main'});
var routes = require('./routes')();

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use('/public', express.static('public'));

app.get('/query', routes.query);
app.get('/tables', routes.tables);
app.get('/charts', routes.charts);
app.get('/signup', routes.signup);
app.get('/', routes.home);

app.post('/arduino', routes.arduino);
app.post('/signup', function(req, res){
	res.render('thanks');
});



var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});