Ext.define("Pacemaker.view.authorization.AuthLayout", {
    extend: 'Ext.container.Container',
    requires: [
		'Pacemaker.view.authorization.Login',
		'Pacemaker.view.authorization.Signup'
    ],

	xtype: 'authlayout',
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
			border: 1,
			tabWidth: '50%',
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