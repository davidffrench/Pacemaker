var User     = require('./../models/user');

exports.createUser = function(req, res){
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

		res.json({ message: 'User created!' });
	});
};

exports.users = function(req, res){
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
};

exports.deleteAllUsers = function(req, res){
	User.remove({}, function(err) {
		res.json('all users removed');
	});
};

exports.user = function(req, res){
	User.findById(req.params.userId, function(err, user) {
		if (err)
			res.send(err);
		res.json(user);
	});
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