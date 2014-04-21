var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var ActivitySchema	= new Schema({
	activityType: String,
	location: String,
	activityDistance: Number,
});

module.exports = mongoose.model('Activity', ActivitySchema);