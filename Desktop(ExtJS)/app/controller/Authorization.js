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

	loginHandler: function(loginView, formValues) {
		this.log(formValues);
	},

	signupHandler: function(signupView, formValues) {
		this.log(formValues);
		var me = this;

		var firstName = formValues.fullname.split(' ').slice(0, -1).join(' ');
		var lastName = formValues.fullname.split(' ').slice(-1).join(' ');

		var userRec = Ext.create('Pacemaker.model.User', formValues);
		userRec.set('firstname', firstName);
		userRec.set('lastname', lastName);
		userRec.save({
			callback : function(record, operation) {
				if (operation.success) {
					var result = Ext.decode(operation.response.responseText);
					userRec.set('id', result._id);
					Pacemaker.utils.GlobalVars.userId = result.id;

					me.getAppHeader().setCurrentNavItem();
				} else {
					// failure
				}
			}
		});
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
