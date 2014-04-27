var User     = require('./../models/user');
var Activity = require('./../models/activity');
var swagger  = require('swagger-node-express');

exports.activities = {
	'spec': {
		description : "List all activities for a user",
		path : "/users/{userId}/activities",
		notes : "Returns all users activities",
		summary : "List all users activities",
		method: "GET",
		type : "array",
		items: {
			$ref: "Activity"
		},
		parameters : [swagger.pathParam("userId", "ID of user that activities are retrieved for", "string", null, "5357fc3297dfc3b010000002")],
		nickname : "activities"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);
			res.json(user.activities);
		});
	}
};

exports.createActivity = {
	'spec': {
		path : "/users/{userId}/activities",
		notes : "Creates an activity",
		summary : "Creates an activity for user based on userId",
		method: "POST",
		parameters : [
			swagger.pathParam("userId", "ID of user", "string", null, "5357fc3297dfc3b010000002"),
			swagger.bodyParam("body", "Activity object that needs to be added to the user", "Activity")
		],
		nickname : "createActivity"
	},
	action: function(req, res){
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
	}
};

exports.activity = {
	'spec': {
		path : "/users/{userId}/activities/{activityId}",
		notes : "Returns a single activity",
		summary : "Returns a single activity for user based on userId",
		method: "GET",
		type : "Activity",
		parameters : [
			swagger.pathParam("userId", "ID of user", "string", null, "5357fc3297dfc3b010000002"),
			swagger.pathParam("activityId", "ID of activity that needs to be fetched", "string", null, "535ac04eae2be6a41b000002")
		],
		nickname : "getActivity"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);
			res.json(user.activities.id(req.params.activityId));
		});
	}
};

exports.deleteActivity = {
	'spec': {
		path : "/users/{userId}/activities/{activityId}",
		notes : "Deletes a single activity",
		summary : "Deletes a single activity for user based on userId",
		method: "DELETE",
		parameters : [
			swagger.pathParam("userId", "ID of user", "string", null, "5357fc3297dfc3b010000002"),
			swagger.pathParam("activityId", "ID of activity that needs to be fetched", "string")
		],
		nickname : "getActivity"
	},
	action: function(req, res){
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
	}
};

exports.updateActivity = {
	'spec': {
		path : "/users/{userId}/activities/{activityId}",
		notes : "Updates an activity",
		summary : "Updates an activity for user based on userId",
		method: "POST",
		parameters : [
			swagger.pathParam("userId", "ID of user", "string", null, "5357fc3297dfc3b010000002"),
			swagger.pathParam("activityId", "ID of activity", "string", null, "535ac04eae2be6a41b000002"),
			swagger.bodyParam("body", "Updated activity object", "Activity")
		],
		nickname : "updateActivity"
	},
	action: function(req, res){
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
	}
};