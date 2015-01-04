/**
 * Authentication layout view
 */
Ext.define("Pacemaker.view.authorization.AuthLayout", {
    extend: 'Ext.container.Container',
    requires: [
		'Ext.tab.Panel',
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
			itemId: 'authTabPanel',
			width: 310,
			height: 500,
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
    },

    resetAndClear: function(){
        this.down('signup').resetAndClear();
        this.down('login').resetAndClear();
    }
});