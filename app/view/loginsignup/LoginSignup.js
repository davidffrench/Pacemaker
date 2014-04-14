Ext.define("Pacemaker.view.loginsignup.LoginSignup", {
    extend: 'Ext.container.Container',
    requires: [
		'Pacemaker.view.loginsignup.Login',
		'Pacemaker.view.loginsignup.Signup'
    ],

	xtype: 'loginsignup',
	layout: {
		type: 'vbox',
		align: 'center'
	},

	initComponent: function() {
		this.items = [{
			xtype: 'tabpanel',
			width: 260,
			height: 400,
			padding: 20,
			items: [{
				xtype: 'signup',
				title: 'Sign Up'
			}, {
				xtype: 'login',
				title: 'Log In'
			}]
        }];
        this.callParent(arguments);
    }
});