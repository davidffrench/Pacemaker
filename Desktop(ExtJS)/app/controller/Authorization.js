/**
 * Authorization controller
 */
Ext.define('Pacemaker.controller.Authorization', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'appHeader',
		selector: 'appheader'
	}, {
		ref: 'viewport',
		selector: 'viewport'
	}],

    init: function() {
		this.listen({
			component: {
				'login': {
					loginAttempt: this.loginHandler
				},
				'signup': {
					signupAttempt: this.signupHandler
				},
				'appheader': {
					logout: this.logoutHandler
				}
			}
		});

		//add Authorization header to all requests
		Ext.Ajax.on("beforerequest", function(conn, options, eOpts){
			options.headers = {
				'Authorization': 'Bearer ' + Pacemaker.utils.GlobalVars.apiToken
			};
		});
	},

	/**
     * Sends login request with formValues as POST body. On success, assigns userId and token to global vars and calls socketConnect() function
     * @param {Ext.container.Container} loginView login container
     * @param {object} formValues form values
     * @param {string} loginUrl url for type of login
     */
	loginHandler: function(loginView, formValues, loginUrl) {
		this.log(formValues);
		var me = this;

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverApiUrl + loginUrl,
			method: 'post',
			jsonData: formValues,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				//create our user model and populate with response, save token & id in global vars
				var userRec = Ext.create('Pacemaker.model.User', result);
				Pacemaker.utils.GlobalVars.userId = result.user._id;
				Pacemaker.utils.GlobalVars.apiToken = result.token;

				//open app now that user has signed up
				me.getAppHeader().setCurrentNavItem();

				me.socketConnect();
			},
			failure: function(response, opts) {
				var result = Ext.decode(response.responseText),
					statusCode = response.status;

				if(statusCode === 422){
					var loginError = loginView.down('#loginError');
					//set specific error code text and show error panel
					loginError.down('label').setText(result.message);
					loginError.show();
				}
			}
		});
	},

	/**
     * Sends signup request with formValues as POST body. On success, assigns userId and token to global vars and calls socketConnect() function
     * @param {Ext.container.Container} signupView signup container
     * @param {object} formValues form values
     * @param {string} signupUrl url for type of sign up
     */
	signupHandler: function(signupView, formValues, signupUrl) {
		this.log(formValues);
		var me = this;

		//split the fullname into first and last name
		var firstName = formValues.fullname.split(' ').slice(0, -1).join(' ');
		var lastName = formValues.fullname.split(' ').slice(-1).join(' ');

		//create our user model and populate with form values
		var userRec = Ext.create('Pacemaker.model.User', formValues);
		userRec.set('firstname', firstName);
		userRec.set('lastname', lastName);

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverApiUrl + signupUrl,
			method: 'post',
			jsonData: Ext.JSON.encode(userRec.data),
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);
				//set the newly created userId to the record. save apitToken & userId in global vars
				userRec.set('id', result.user._id);
				Pacemaker.utils.GlobalVars.userId = result.user._id;
				Pacemaker.utils.GlobalVars.apiToken = result.token;

				//open app now that user has signed up
				me.getAppHeader().setCurrentNavItem();

				me.socketConnect();
			},
			failure: function(response, opts) {
				var result = Ext.decode(response.responseText),
					statusCode = response.status;

				if(statusCode === 422){
					var signupError = signupView.down('#signupError');
					//set specific error code text and show error panel
					signupError.down('label').setText('That email is already taken.');
					signupError.show();
				}
			}
		});
	},

	/**
     * Creates socket and assigns to global vars. Adds feedUpdate listener to socket which will update the feedStore
     */
	socketConnect: function() {
		this.log();

		var me = this;

		Pacemaker.utils.GlobalVars.socket = io.connect(Pacemaker.utils.GlobalVars.serverUrl, { query: "userId=" + Pacemaker.utils.GlobalVars.userId });

		Pacemaker.utils.GlobalVars.socket.on('feedUpdate', function (data) {
			var result = Ext.JSON.decode(data);

			var feedStore = me.getStore('Feed');

			feedStore.add(result);
			feedStore.sort('feedDate', 'DESC');
		});
	},

	/**
     * Disconnects socket
     */
	socketDisconnect: function() {
		this.log();

		Pacemaker.utils.GlobalVars.socket.disconnect();
	},

	/**
     * Clears global vars, resets forms, hides navigation buttons, redirects to login view, calls socketDisconnect()
     */
	logoutHandler: function(appHeaderView) {
		this.log();

		var mainContainer = this.getViewport().down('#appmainctn'),
			authLayout = this.getViewport().down('authlayout');

		//destroy container items
		mainContainer.removeAll();
		//reset login and signup forms
		authLayout.resetAndClear();
		//hide header navigation
		this.getAppHeader().hideHeaderItems();
		//set authLayout activeItem
		this.getViewport().down('#appMainCard').layout.setActiveItem(authLayout);
		//set authentication tab to login
		authLayout.down('#authTabPanel').layout.setActiveItem(authLayout.down('login'));

		this.socketDisconnect();
		//reset global vars for apiToken and userId
		Pacemaker.utils.GlobalVars.userId = null;
		Pacemaker.utils.GlobalVars.apiToken = null;
		Pacemaker.utils.GlobalVars.socket = null;
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
