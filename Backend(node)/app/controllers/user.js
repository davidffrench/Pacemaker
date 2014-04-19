var User     = require('./../models/user');

exports.createUser = function(req, res){
	var user = new User();		// create a new instance of the User model
	user.firstname = req.body.firstname;  // set the users name (comes from the request)
	user.lastname = req.body.lastname;
	user.email = req.body.email;
	user.password = req.body.password;

	// save the bear and check for errors
	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'User created!' });
	});
};