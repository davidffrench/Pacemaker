module.exports = function(app, express){
	var swagger = require('swagger-node-express');
	var subpath = express();

	var userController     = require('./../app/controllers/user');
	var activityController = require('./../app/controllers/activity');
	var authController     = require('./../app/controllers/auth');
	var models             = require('./models.js');

	app.use(subpath);
	swagger.setAppHandler(subpath);

	swagger.configureSwaggerPaths("", "/api-docs", "");

	swagger.addModels(models)
		.addGet(userController.users)
		.addGet(userController.user)
		.addPost(authController.signup)
		.addPost(authController.login);

	swagger.configure("http://localhost:3000", "0.1");
};