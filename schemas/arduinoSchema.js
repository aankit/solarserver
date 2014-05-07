var mongoose = require('mongoose');

exports.module = mongoose.model('Reading', {
	measure: String,
	reading: Number
});