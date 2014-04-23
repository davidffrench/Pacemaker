var express = require('express');

module.exports = function(app, passport){
	var router = express.Router();

	var userController     = require('./controllers/user');
	var activityController = require('./controllers/activity');
	var authController     = require('./controllers/auth');

	router.route('/signup')
		.post(authController.signup);
	router.route('/login')
		.post(authController.login);
	router.route('/auth/facebook')
		.post(authController.facebookAuth);
	router.route('/auth/facebook/callback')
		.post(authController.facebookAuthCallback);
	router.route('/users')
		.all(isLoggedIn)
		.get(userController.users)
		.delete(userController.deleteAllUsers)
		.post(userController.createUser);
	router.route('/users/:userId')
		.all(isLoggedIn)
		.get(userController.user)
		.delete(userController.deleteUser)
		.put(userController.updateUser);
	router.route('/users/:userId/activities')
		.all(isLoggedIn)
		.get(activityController.activities)
		.post(activityController.createActivity);
	router.route('/users/:userId/activities/:activityId')
		.all(isLoggedIn)
		.get(activityController.activity)
		.delete(activityController.deleteActivity)
		.put(activityController.updateActivity);

	return router;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't, return 403
	res.statusCode = 403;
    var e = new Error('Not authorized');
    e.status = 403;
    next(e);
}