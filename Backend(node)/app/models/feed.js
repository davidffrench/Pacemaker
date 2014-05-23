var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var feedSchema	= new Schema({
	userFirstname: String,
	userLastname: String,
	feedText: String,
	feedDate: Date
});

feedSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

feedSchema.post('save', function () {
	if (this.wasNew){
		global.io.sockets.emit('feedUpdate', JSON.stringify(this));
	}
});

module.exports = mongoose.model('Feed', feedSchema);