// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID'      : '1441758512732279', // your App ID
		'clientSecret'  : '35771a4f11e24f3f571123c90ee891e6', // your App Secret
		'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey'     : 'your-consumer-key-here',
		'consumerSecret'  : 'your-client-secret-here',
		'callbackURL'     : 'http://localhost:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID'      : 'your-secret-clientID-here',
		'clientSecret'  : 'your-client-secret-here',
		'callbackURL'   : 'http://localhost:3000/auth/google/callback'
	}

};