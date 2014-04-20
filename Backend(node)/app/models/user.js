var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;
var ActivitySchema	= require('./activity');

var UserSchema		= new Schema({
	firstname: String,
	lastname: String,
	email: String,
	password: String,
	activities: [ ActivitySchema.schema ]
});

module.exports = mongoose.model('User', UserSchema);