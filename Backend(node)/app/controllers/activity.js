var User     = require('./../models/user');
var Activity = require('./../models/activity');
var Feed     = require('./../models/feed');
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
		parameters : [swagger.pathParam("userId", "ID of user that activities are retrieved for", "string", null, "538110b1564830b831000004")],
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
			swagger.pathParam("userId", "ID of user", "string", null, "538110b1564830b831000004"),
			swagger.bodyParam("body", "Activity object that needs to be added to the user", "Activity")
		],
		nickname : "createActivity"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);

			var activity = new Activity({
				activityType    : req.body.activityType,
				activityDate    : req.body.activityDate,
				location        : req.body.location,
				distance        : req.body.distance,
				calories        : req.body.calories,
				durationHours   : req.body.durationHours,
				durationMinutes : req.body.durationMinutes,
				startTime       : req.body.startTime
			});
			for(i=0; i<req.body.route.length; i++){
				activity.route.push(req.body.route[i]);
			}
			user.activities.push(activity);

			var feedItem = new Feed({
				userFirstname   : user.firstname,
				userLastname    : user.lastname,
				feedDate        : new Date(),
				feedText        : ' completed a ' + activity.distance + ' km ' + activity.activityType + ' activity'
			});
			user.feed.push(feedItem);

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
			swagger.pathParam("userId", "ID of user", "string", null, "538110b1564830b831000004"),
			swagger.pathParam("activityId", "ID of activity that needs to be fetched", "string", null, "538110e8564830b831000005")
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
			swagger.pathParam("userId", "ID of user", "string", null, "538110b1564830b831000004"),
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
			swagger.pathParam("userId", "ID of user", "string", null, "538110b1564830b831000004"),
			swagger.pathParam("activityId", "ID of activity", "string", null, "538110e8564830b831000005"),
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
				activity.activityType    = req.body.activityType;
			if(req.body.activityDate)
				activity.activityDate    = req.body.activityDate;
			if(req.body.location)
				activity.location        = req.body.location;
			if(req.body.distance)
				activity.distance        = req.body.distance;
			if(req.body.calories)
				activity.calories        = req.body.calories;
			if(req.body.durationHours)
				activity.durationHours   = req.body.durationHours;
			if(req.body.durationMinutes)
				activity.durationMinutes = req.body.durationMinutes;
			if(req.body.startTime)
				activity.startTime       = req.body.startTime;

			user.save(function (err) {
				if (err)
					res.send(err);
				
				res.json({ message: 'Activity updated!' });
			});
		});
	}
};

exports.activitiesReportsData = {
	'spec': {
		path : "/users/{userId}/activitiesReportsData",
		notes : "Retrieves actvities data for reports",
		summary : "Retrieves actvities data for reports",
		method: "POST",
		parameters : [
			swagger.pathParam("userId", "ID of user", "string", null, "538110b1564830b831000004"),
			swagger.bodyParam("body", "params to retrieve limited reports data", "ActivitiesReportsData")
		],
		nickname : "activitiesReportsData"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);

			var activitiesSubSet = [],
				totalDistance = 0,
				totalDurationHrs = 0,
				totalDurationMins = 0,
				totalCalories = 0,
				activities = user.activities;
				

			//unable to filter subdocument with mongoose, looping over activities to build subset and calculate totals
			for(i=0; i<activities.length; i++){
				var activity = activities[i],
					startDate = new Date(req.body.startDate);
				//do not return the route
				activity.route = undefined;

				if(req.body.activityType){
					if(activity.activityType === req.body.activityType){
						if(startDate < activity.activityDate){
							activitiesSubSet.push(activity);
							if(activity.distance) totalDistance += activity.distance;
							if(activity.durationHours) totalDurationHrs += activity.durationHours;
							if(activity.durationMinutes) totalDurationMins += activity.durationMinutes;
							if(activity.calories) totalCalories += activity.calories;
						}
					}
				} else {
					if(startDate <= activity.activityDate){
						activitiesSubSet.push(activity);
						if(activity.distance) totalDistance += activity.distance;
						if(activity.durationHours) totalDurationHrs += activity.durationHours;
						if(activity.durationMinutes) totalDurationMins += activity.durationMinutes;
						if(activity.calories) totalCalories += activity.calories;
					}
				}
			}

			res.json({
				"totals": {
					"totalDistance": totalDistance,
					"totalDurationHrs": totalDurationHrs,
					"totalDurationMins": totalDurationMins,
					"totalCalories": totalCalories
				},
				"activities": activitiesSubSet
			});
		});
	}
};