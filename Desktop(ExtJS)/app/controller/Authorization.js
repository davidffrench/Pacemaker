Ext.define('Pacemaker.controller.Authorization', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'appHeader',
		selector: 'appheader'
	}],

    init: function() {
		this.listen({
			component: {
				'login': {
					loginAttempt: this.loginHandler
				},
				'signup': {
					signupAttempt: this.signupHandler
				}
			},
			store: {
				
			}
		});
	},

	loginHandler: function(loginView, formValues, loginUrl) {
		this.log(formValues);
		var me = this;

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverUrl + loginUrl,
			method: 'post',
			jsonData: formValues,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				//create our user model and populate with response, save id in global vars
				var userRec = Ext.create('Pacemaker.model.User', result);
				Pacemaker.utils.GlobalVars.userId = result._id;

				//open app now that user has signed up
				me.getAppHeader().setCurrentNavItem();
			},
			failure: function(response, opts) {
				debugger;
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

		//set the url to /signup and save the record
		userRec.getProxy().url = Pacemaker.utils.GlobalVars.serverUrl + signupUrl;
		userRec.save({
			callback : function(record, operation) {
				if (operation.success) {
					var result = Ext.decode(operation.response.responseText);
					//set the newly created userId to the record and in global vars
					userRec.set('id', result._id);
					Pacemaker.utils.GlobalVars.userId = result._id;

					//open app now that user has signed up
					me.getAppHeader().setCurrentNavItem();
				} else {
					var statusCode = operation.error.status;

					if(statusCode === 422){
						var signupError = signupView.down('#signupError');
						//set specific error code text and show error panel
						signupError.down('label').setText('That email is already taken.');
						signupError.show();
					}
				}
			}
		});
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
