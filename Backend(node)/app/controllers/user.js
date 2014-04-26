var User    = require('./../models/user');
var swagger = require('swagger-node-express');

exports.createUser = {
	'spec': {
		path : "/users",
		notes : "adds a user to the db",
		summary : "Add a new user to the db",
		method: "POST",
		parameters : [swagger.bodyParam("User", "User object that needs to be added to the db", "UserSignUp")],
		nickname : "addUser"
	},
	"action": function(req, res){
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
	'action': function(req, res){
		User.find(function(err, users) {
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
	'action': function(req, res){
		User.findById(req.params.userId, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	}
};

exports.deleteUser = function(req, res){
	User.remove({
		_id: req.params.userId
	}, function(err, bear) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
};

exports.updateUser = function(req, res){
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
};