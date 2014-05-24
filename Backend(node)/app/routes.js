var express = require('express');
var jwt          = require('jsonwebtoken');
var tokenSecret      = require('./../config/tokenSecret');

module.exports = function(app, passport){
	var router = express.Router();

	var userController     = require('./controllers/user');
	var activityController = require('./controllers/activity');
	var authController     = require('./controllers/auth');

	router.route('/auth/signup')
		.post(authController.signup.action);
	router.route('/auth/login')
		.post(authController.login.action);
	router.route('/auth/facebook')
		.post(authController.facebookAuth);
	router.route('/auth/facebook/callback')
		.post(authController.facebookAuthCallback);
	router.route('/auth/twitter')
		.post(authController.twitterAuth);
	router.route('/auth/twitter/callback')
		.post(authController.twitterAuthCallback);
	router.route('/users')
		.all(isLoggedIn)
		.get(userController.users.action)
		.delete(userController.deleteAllUsers)
		.post(userController.createUser.action);
	router.route('/users/:userId')
		.all(isLoggedIn)
		.get(userController.user.action)
		.delete(userController.deleteUser.action)
		.put(userController.updateUser.action);
	router.route('/users/:userId/activities')
		.all(isLoggedIn)
		.get(activityController.activities.action)
		.post(activityController.createActivity.action);
	router.route('/users/:userId/activities/:activityId')
		.all(isLoggedIn)
		.get(activityController.activity.action)
		.delete(activityController.deleteActivity.action)
		.put(activityController.updateActivity.action);
	router.route('/users/:userId/activitiesReportsData')
		.all(isLoggedIn)
		.post(activityController.activitiesReportsData.action);
	router.route('/users/:userId/dashboardStatsData')
		.all(isLoggedIn)
		.get(userController.dashboardStatsData.action);
	router.route('/users/:userId/addFriend')
		.all(isLoggedIn)
		.post(userController.addFriend.action);

	return router;
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	if(req.headers.authorization){
		var token = req.headers.authorization.replace("Bearer ","");

		// verify a token symmetric
		jwt.verify(token, tokenSecret, function(err, decoded) {
			if (err)
				return next(err);
			
			return next();
		});
	} else {
		// if they aren't, return 403
		var e = new Error('Not authorized');
		e.status = 403;
		next(e);
	}
}