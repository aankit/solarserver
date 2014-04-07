// web.js
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.get('/data', function(req, res){
	res.send('<h1> Data Tables</h1>')
})

app.get('/charts', function(req, res){
	res.send('Charts live here, links to data tables')
})

app.get('/poetry', function(req, res){
	res.send('plan to run a python script to generate poetry written based on data from the panel')
})

app.get('/', function(req, res) {
  res.send('Here I will introduce the solar panel briefly and have links to data/get involved');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});