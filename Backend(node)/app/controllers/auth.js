var passport = require('passport');

exports.signup = function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
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
			return res.json(user);
		}
	})(req, res, next);
};

exports.facebookAuth = function(req, res, next) {
	console.log('before facebook auth');
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
