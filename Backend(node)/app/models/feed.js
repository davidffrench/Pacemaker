var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var feedSchema	= new Schema({
	userFirstname: String,
	userLastname: String,
	feedText: String,
	feedDate: Date
});

/* istanbul ignore next */
feedSchema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

/* istanbul ignore next */
feedSchema.post('save', function () {
	var feed = this;
	if (feed.wasNew){

		var User     = require('./user');
		var feedParent = feed.parent();

		for(i=0; i<feedParent.friends.length; i++){
			var friend = feedParent.friends[i];

			User.findById(friend._id, 'socketId', function(err, friend) {
				if (err)
					res.send(err);

				var friendSocketId = friend.socketId;
				if(friendSocketId)
					global.io.sockets.socket(friendSocketId).emit('feedUpdate', JSON.stringify(feed));
			});
		}
		global.io.sockets.socket(feedParent.socketId).emit('feedUpdate', JSON.stringify(feed));
	}
});

module.exports = mongoose.model('Feed', feedSchema);