var User     = require('./../models/user');
var async    = require('async');

global.io.sockets.on('connection', function (socket) {
	var userId = socket.manager.handshaken[socket.id].query.userId;

	socket.on('disconnect', function() {
		User.findById(userId, function(err, user) {
			if (err)
				res.send(err);
			user.socketId = null;
			user.save();
		});
	});

	User.findById(userId, function(err, user) {
		if (err)
			res.send(err);
		user.socketId = socket.id;
		user.save();

		console.dir(user);
		
		var calls = [];
		var fullFeedList = user.feed;
		// for(i=0; i<user.friends.length; i++){
		// 	calls.push(function(callback) {
		// 		var friend = user.friends[i];
		// 		User.findById(friend._id, function(err, friend) {
		// 			if (err)
		// 				res.send(err);


		// 			console.dir('FRIEND');
		// 			console.dir(friend);
		// 			fullFeedList = fullFeedList.concat(friend.feed);

					
		// 		});
		// 	});
		// 	console.dir(fullFeedList);
		// }
		// async.parallel(calls, function(err, result) {
		// 	/* this code will run after all calls finished the job or
  //              when any of the calls passes an error */
		// 	if (err)
		// 		return console.log(err);
		// 	console.log('async hit');
		// 	console.log(result);
		// });

		socket.emit('feedUpdate', JSON.stringify(fullFeedList));

	});

});
