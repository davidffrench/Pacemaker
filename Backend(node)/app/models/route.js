var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var routeSchema	= new Schema({
	latitude: Number,
	longitude: Number,
});

module.exports = mongoose.model('Route', routeSchema);