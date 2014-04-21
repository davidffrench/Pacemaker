var User     = require('./../models/user');
var Activity = require('./../models/activity');

exports.activities = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);
		res.json(user.activities);
	});
};

exports.createActivity = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);

		var activity = new Activity({
			activityType     : req.body.activityType,
			location         : req.body.location,
			activityDistance : req.body.activityDistance
		});

		user.activities.push(activity);
		user.save(function (err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'Activity created!' });
		});
	});
};

exports.activity = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);
		res.json(user.activities.id(req.params.activityId));
	});
};

exports.deleteActivity = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);
		user.activities.id(req.params.activityId).remove();
		user.save(function (err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'Activity deleted!' });
		});
	});
};

exports.updateActivity = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);

		var activity = user.activities.id(req.params.activityId);
		if(req.body.activityType)
			activity.activityType = req.body.activityType;
		if(req.body.location)
			activity.location = req.body.location;
		if(req.body.activityDistance)
			activity.activityDistance = req.body.activityDistance;

		user.save(function (err) {
			if (err)
				res.send(err);
			
			res.json({ message: 'Activity updated!' });
		});
	});
};