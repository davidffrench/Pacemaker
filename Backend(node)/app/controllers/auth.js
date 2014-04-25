var passport    = require('passport');
var jwt         = require('jsonwebtoken');
var tokenSecret = require('./../../config/tokenSecret');

exports.signup = function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
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
};

exports.login = function(req, res, next) {
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
