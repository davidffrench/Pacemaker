module.exports = function(app, express){
	var swagger = require('swagger-node-express');
	var bodyParser   = require('body-parser');
	var subpath = express();

	var userController     = require('./../app/controllers/user');
	var activityController = require('./../app/controllers/activity');
	var authController     = require('./../app/controllers/auth');
	var models             = require('./models.js');
	var allowCrossDomain   = require('./../app/middleware/cors');

	app.use(subpath);
	swagger.setAppHandler(subpath);

	subpath.use(allowCrossDomain);
	subpath.use(bodyParser.json());
	subpath.use(bodyParser.urlencoded());
	// // This is a sample validator.  It simply says that for _all_ POST, DELETE, PUT
	// // methods, the header `api_key` OR query param `api_key` must be equal
	// // to the string literal `special-key`.  All other HTTP ops are A-OK
	// swagger.addValidator(
	//   function validate(req, path, httpMethod) {
	//     //  example, only allow POST for api_key="special-key"
	//     if ("POST" == httpMethod || "DELETE" == httpMethod || "PUT" == httpMethod) {
	//       // var apiKey = req.headers["api_key"];
	//       // if (!apiKey) {
	//         // apiKey = url.parse(req.url,true).query["api_key"]; }
	//       // if ("special-key" == apiKey) {
	//         return true;
	//       // }
	//       // return false;
	//     }
	//     return true;
	//   }
	// );

	// swagger.configureDeclaration("pet", {
	//   description : "Operations about Pets",
	//   authorizations : ["oauth2"],
	//   produces: ["application/json"]
	// });

	// set api info
	swagger.setApiInfo({
		title: "Pacemaker API",
		description: "This is the API documentation for Pacemaker. You can use Pacemaker at <a href=\"http://pacemaker.davidffrench.com\">http://pacemaker.davidffrench.com</a>.  For this sample, you can use the api key \"special-key\" to test the authorization filters",
		// termsOfServiceUrl: "http://helloreverb.com/terms/",
		contact: "davidffrench@gmail.com",
		// license: "Apache 2.0",
		// licenseUrl: "http://www.apache.org/licenses/LICENSE-2.0.html"
	});

	// swagger.setAuthorizations({
	//   apiKey: {
	//     type: "apiKey",
	//     passAs: "header"
	//   }
	// });

	swagger.configureSwaggerPaths("", "/api-docs", "");

	swagger.addModels(models)
		.addGet(userController.users)
		.addGet(userController.user)
		.addPut(userController.updateUser)
		.addDelete(userController.deleteUser)
		.addGet(activityController.activities)
		.addPost(activityController.createActivity)
		.addGet(activityController.activity)
		.addPut(activityController.updateActivity)
		.addDelete(activityController.deleteActivity)
		.addPost(authController.signup)
		.addPost(authController.login)
		.addPost(activityController.activitiesReportsData);

	swagger.configure("http://localhost:3000", "0.1");
};