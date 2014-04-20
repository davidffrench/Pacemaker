var express = require('express');
var router = express.Router();

var userController = require('./controllers/user');
var activityController = require('./controllers/activity');

router.route('/users')
	.get(userController.users)
	.delete(userController.deleteAllUsers)
	.post(userController.createUser);
router.route('/users/:id')
	.get(userController.user)
	.delete(userController.deleteUser)
	.put(userController.updateUser);
router.route('/users/:userId/activities')
	.get(userController.user)
	.delete(userController.deleteUser)
	.put(userController.updateUser);

module.exports = router;
