var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test123@dbh23.mongolab.com:27237/solar');
// mongoose.connect('localhost:solar');

module.exports = mongoose.connection;