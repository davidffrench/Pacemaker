var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var activitySchema	= new Schema({
	activityType: String,
	location: String,
	activityDistance: Number,
});

module.exports = mongoose.model('Activity', activitySchema);