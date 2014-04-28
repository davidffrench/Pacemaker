var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var activitySchema	= new Schema({
	activityType: String,
	activityDate: Date,
	location: String,
	distance: Number,
	calories: Number,
	durationHours: Number,
	durationMinutes: Number,
	startTime: Date
});

module.exports = mongoose.model('Activity', activitySchema);