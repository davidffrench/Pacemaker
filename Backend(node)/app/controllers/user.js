var User    = require('./../models/user');
var swagger = require('swagger-node-express');

exports.createUser = {
	'spec': {
		path : "/users",
		notes : "adds a user to the db",
		summary : "Add a new user to the db",
		method: "POST",
		parameters : [swagger.bodyParam("User", "User object that needs to be added to the db", "UserSignup")],
		nickname : "addUser"
	},
	action: function(req, res){
		var user = new User({	// create a new instance of the User model
			firstname : req.body.firstname,  // set the users name (comes from the request)
			lastname  : req.body.lastname,
			email     : req.body.email,
			password  : req.body.password
		});

		// save the user and check for errors
		user.save(function(err) {
			if (err)
				res.send(err);

			res.json(user);
		});
	}
};

exports.users = {
	'spec': {
		description : "List all users",
		path : "/users",
		notes : "Returns all users",
		summary : "List all users",
		method: "GET",
		type : "array",
		items: {
			$ref: "User"
		},
		nickname : "users"
	},
	action: function(req, res){
		User.find(null, '-activities', function(err, users) {
			if (err)
				res.send(err);

			res.json(users);
		});
	}
};

exports.deleteAllUsers = function(req, res){
	User.remove({}, function(err) {
		res.json('all users removed');
	});
};

exports.user = {
	'spec': {
		description : "gets a single user by Id",
		path : "/users/{userId}",
		method: "GET",
		summary : "Find user by ID",
		notes : "Returns a user based on ID",
		type : "User",
		nickname : "getUserById",
		produces : ["application/json"],
		parameters : [swagger.pathParam("userId", "ID of user that needs to be fetched", "string", null, "5357fc3297dfc3b010000002")],
	},
	action: function(req, res){
		User.findById(req.params.userId, '-activities', function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	}
};

exports.deleteUser = {
	'spec': {
		description : "delete a single user by Id",
		path : "/users/{userId}",
		method: "DELETE",
		summary : "Delete user by ID",
		notes : "Deletes a user based on ID",
		type : "User",
		nickname : "deleteUserById",
		produces : ["application/json"],
		parameters : [swagger.pathParam("userId", "ID of user that needs to be deleted", "string")],
	},
	action: function(req, res){
		User.remove({
			_id: req.params.userId
		}, function(err, bear) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	}
};

exports.updateUser = {
	'spec': {
		path : "/users/{userId}",
		notes : "Updates a user",
		summary : "Updates a user by ID",
		method: "PUT",
		parameters : [
			swagger.pathParam("userId", "ID of user that needs to be deleted", "string"),
			swagger.bodyParam("body", "Updated User object", "UserFlat")
		],
		// parameters: [{
		// 	"name": "userId",
		// 	"description": "ID of user that needs to be deleted",
		// 	"required": true,
		// 	"type": "string",
		// 	"paramType": "path"
		// }, {
		// 	"name": "body",
		// 	"description": "User object that needs to be added to the db",
		// 	"required": true,
		// 	"type": "UserFlat",
		// 	"paramType": "body"
		// }],
		nickname : "updateUser"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);

			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.email = req.body.email;
			user.password = req.body.password;
			user.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'User updated!' });
			});
		});
	}
};

exports.addFriend = {
	'spec': {
		path : "/users/{userId}/addFriend",
		notes : "add friend to the user",
		summary : "Adds a friend to the user",
		method: "POST",
		parameters : [swagger.bodyParam("User", "Friend that needs to be added to the user", "UserSignup")],
		nickname : "addFriend"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);

			User.findById(req.body.id, function(err, friend) {
				if (err)
					res.send(err);
				
				user.friends.push(friend);
				user.save(function (err) {
					if (err)
						res.send(err);
					
					res.json({ message: 'Friend added!' });
				});
			});
		});
	}
};

exports.dashboardStatsData = {
	'spec': {
		path : "/users/{userId}/dashboardStatsData",
		notes : "Retrieves actvities data for reports",
		summary : "Retrieves actvities data for reports",
		method: "GET",
		// parameters : [swagger.bodyParam("User", "Friend that needs to be added to the user", "UserSignup")],
		nickname : "dashboardStatsData"
	},
	action: function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);

			var totalDistance = 0,
				totalCalories = 0,
				activities = user.activities,
				totalActivities = activities.length;

			//unable to filter subdocument with mongoose, looping over activities to build subset and calculate totals
			for(i=0; i<activities.length; i++){
				var activity = activities[i];

				if(activity.distance) totalDistance += activity.distance;
				if(activity.calories) totalCalories += activity.calories;
			}

			res.json({
				"totalDistance": totalDistance,
				"totalCalories": totalCalories,
				"totalActivities": totalActivities
			});
		});
	}
};