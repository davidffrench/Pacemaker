var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var ActivitySchema	= new Schema({
	type: String,
	location: String,
	distance: String,
});

module.exports = mongoose.model('Activity', ActivitySchema);