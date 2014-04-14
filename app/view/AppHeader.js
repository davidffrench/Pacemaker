Ext.define("Pacemaker.view.AppHeader", {
    extend: 'Ext.toolbar.Toolbar',
	xtype: 'appheader',
	height: 45,

	initComponent: function() {
		this.items = [{
			xtype: 'button',
			text: 'Pacemaker',
			action: 'pacemakerHome',
			width: 80,
			height: '100%',
			scale: 'large',
            listeners: {
                click: function(btn){
                    //TODO fire event, take care of in controller. return to homepage
                }
            }
		},{
			xtype: 'tbfill'
		},{
			xtype: 'button',
			text: 'Logout',
			action: 'logout',
			width: 80,
			height: '100%',
            listeners: {
                click: function(btn){
                    //TODO fire event, take care of in controller. reset app - clear login form, hide logout btn.
                }
            }
		}];
        this.callParent(arguments);
    }
});