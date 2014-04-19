var express = require('express');
var router = express.Router();

var userController = require('./controllers/user');

router.route('/user')
	// create a user (accessed at POST http://localhost:3000/api/user)
	.post(userController.createUser);

module.exports = router;
