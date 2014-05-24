var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;
var routeSchema	    = require('./route');

var activitySchema	= new Schema({
	activityType: String,
	activityDate: Date,
	location: String,
	distance: Number,
	calories: Number,
	durationHours: Number,
	durationMinutes: Number,
	startTime: Date,
	route: [ routeSchema.schema ]
});

module.exports = mongoose.model('Activity', activitySchema);