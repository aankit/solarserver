var mongoose = require('mongoose');
var arduinoSchema = ('./schemas');
var db = require('./db');

module.exports = {
	foo: function(data){
		console.log(typeof data);
	},
};
