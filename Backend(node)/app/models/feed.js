var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var feedSchema	= new Schema({
	userFirstname: String,
	userLastname: String,
	feedText: String,
	feedDate: Date
});

module.exports = mongoose.model('Feed', feedSchema);