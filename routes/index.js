var data = require('../data/data');
var csv = require('csv');
var dbFunctions = require('../dbFunctions');
var mongoose = require('mongoose');
var db = require('../db');

var triStar = mongoose.model('Reading', {
	timestamp: Date,
	measure: String,
	reading: Number
});

module.exports = function(){
	
	var functions = {};
	
	functions.query = function(req, res) {
		if(req.query.measure && req.query.measure !== 'all'){
			triStar.find({'measure':req.query.measure},
				function(err, results){
				if(err) return handleError(err);
				// res.json(results)
				res.render('tables', {
					readings: results
				});
			});
		} else {
					triStar.find(function(err, results){
			if(err) return handleError(err);
			console.log(results);
			res.render('tables', {
				readings: results
			});
		});
		}
	};

	functions.tables = function(req, res){
		triStar.find(function(err, results){
			if(err) return handleError(err);
			console.log(results);
			res.render('query', {
				readings: results
			});
		});
	};


	functions.custom = function(req, res){

	};

	functions.charts = function(req, res){
		res.render('charts');
	};

	functions.signup = function(req, res){
		res.render('signup');
	};

	functions.home = function(req, res){
		res.render('index');
	};

	functions.arduino = function(req, res){
		var body = '';
		// we want to get the data as utf8 strings
		// If you don't set an encoding, then you'll get Buffer objects
		//req.setEncoding('utf8');

		// Readable streams emit 'data' events once a listener is added
		req.on('data', function (chunk) {
			body += chunk;
		});

		//the end event tells you that you have entire body
		req.on('end', function () {
			var data;
			try {
				data = JSON.parse(body);
			} catch (err) {
				// uh oh!  bad json!
				res.statusCode = 400;
				return res.end('error: ' + err.message);
			}
			// write back something interesting to the user:
			csv()
			.from.string(data)
			.to.array( function(d){
				for(var i=0;i<d.length;i++){
					var measure;
					var reading;
					for(var j=0;j<d[i].length;j++){
						if (isNaN(d[i][j])) {
							live_measure = d[i][j];
						} else {
							live_reading = parseInt(d[i][j], 10);
						}
					}
					var arduinoData = {
						timestamp: Date.now(),
						measure: live_measure,
						reading: live_reading
					};
					ad = new triStar(arduinoData);
					ad.save(function(err, reading){
						if(err){
							console.log(err);
						}
					});
				}
			});
			//console.log(dataRec);
			res.end();
		});
		res.status(200);
	};

	return functions;
};