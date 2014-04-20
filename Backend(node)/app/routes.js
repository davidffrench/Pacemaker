var express = require('express');
var router = express.Router();

var userController = require('./controllers/user');
var activityController = require('./controllers/activity');

router.route('/users')
	.get(userController.users)
	.delete(userController.deleteAllUsers)
	.post(userController.createUser);
router.route('/users/:userId')
	.get(userController.user)
	.delete(userController.deleteUser)
	.put(userController.updateUser);
router.route('/users/:userId/activities')
	.get(activityController.activities)
	.post(activityController.createActivity);
router.route('/users/:userId/activities/:activityId')
	.get(activityController.activity)
	.delete(activityController.deleteActivity)
	.put(activityController.updateActivity);

module.exports = router;
