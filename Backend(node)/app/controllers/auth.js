var passport    = require('passport');
var jwt         = require('jsonwebtoken');
var tokenSecret = require('./../../config/tokenSecret');
var swagger     = require('swagger-node-express');

exports.signup = {
	'spec': {
		path : "/auth/signup",
		notes : "adds a user to the db",
		summary : "Add a new user to the db",
		method: "POST",
		parameters : [swagger.bodyParam("body", "User object that needs to be added to the db", "UserSignup")],
		nickname : "addUser"
	},
	action: function(req, res, next) {

        console.log('before passport');
		passport.authenticate('local-signup', function(err, user, info) {

        	console.log('after passport local');
			if (err)
				return next(err);
			        	console.log('after error');
			if(!user){
				var e = new Error(info);
					e.status = 422;
				return next(e);
			} else {
				        	console.log('user');
				// We are sending the user inside the token
				var token = jwt.sign(user, tokenSecret, { expiresInMinutes: 60*5 });

				return res.json({token: token, user: user});
			}
		})(req, res, next);
	}
};

exports.login = {
	'spec': {
		path : "/auth/login",
		notes : "User login",
		summary : "Logs user into application",
		method: "POST",
		parameters : [swagger.bodyParam("body", "User object that needs to be added to the db", "UserLogin")],
		nickname : "loginUser"
	},
	action: function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err)
				return next(err);
			
			if(!user){
				var e = new Error(info);
					e.status = 422;
				return next(e);
			} else {
				// We are sending the user inside the token
				var token = jwt.sign(user, tokenSecret, { expiresInMinutes: 60*5 });

				return res.json({token: token, user: user});
			}
		})(req, res, next);
	}
};

exports.twitterAuth = function(req, res, next) {
	console.log('before twitter auth');
	console.dir(req.headers);
	passport.authenticate('twitter')(req, res, next);
	console.log('after twitter auth');
};

exports.twitterAuthCallback = function(req, res, next) {
		console.log('before twitter auth callback');
	passport.authenticate('twitter', function(err, user, info) {
		if (err)
			return next(err);
		
		if(!user){
			var e = new Error(info);
				e.status = 422;
			return next(e);
		} else {
			return res.json(user);
		}
	})(req, res, next);
	console.log('after twitter auth callback');

};

exports.facebookAuth = function(req, res, next) {
	console.log('before facebook auth');
	console.dir(req.headers);
	passport.authenticate('facebook', { scope : 'email' })(req, res, next);
	console.log('after facebook auth');
};

exports.facebookAuthCallback = function(req, res, next) {
		console.log('before facebook auth callback');
	passport.authenticate('facebook', function(err, user, info) {
		if (err)
			return next(err);
		
		if(!user){
			var e = new Error(info);
				e.status = 422;
			return next(e);
		} else {
			return res.json(user);
		}
	})(req, res, next);
	console.log('after facebook auth callback');

};
