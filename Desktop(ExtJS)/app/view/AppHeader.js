Ext.define("Pacemaker.view.AppHeader", {
    extend: 'Ext.container.Container',
    requires: ['Ext.button.Split'],
    
	config: {
		currentNavItem: null
	},

	applyCurrentNavItem: function(newSel, oldSel){
		//if no nav item is passed in, default to openFeed
		if(!newSel){
			newSel = this.down('button[action=openFeed]');
		}
		return newSel;
	},

	updateCurrentNavItem: function(newSel, oldSel){
		this.fireEvent('navitemchange', this, newSel, oldSel);
	},

	xtype: 'appheader',
	height: 45,
	layout: 'hbox',

	initComponent: function() {
		this.items = [{
			xtype: 'button',
			text: 'Pacemaker',
			action: 'pacemakerHome',
			height: '100%',
			scale: 'large',
			border: false,
            listeners: {
                click: function(btn){
                    //TODO fire event, take care of in controller. return to homepage
                }
            }
		},{
			xtype: 'button',
			text: 'FEED',
			action: 'openFeed',
			icon: 'resources/images/application_view_list.png',
			height: '100%',
			scale: 'large',
			padding: '0 10 0 10',
			border: false,
			hidden: true,
            listeners: {
                click: function(btn){
                    btn.up('appheader').setCurrentNavItem(btn);
                }
            }
		},{
			xtype: 'button',
			text: 'ME',
			action: 'openMe',
			icon: 'resources/images/user_orange.png',
			height: '100%',
			scale: 'large',
			padding: '0 10 0 10',
			border: false,
			hidden: true,
            listeners: {
                click: function(btn){
                    btn.up('appheader').setCurrentNavItem(btn);
                }
            }
		},{
			xtype: 'button',
			text: 'LOG',
			action: 'openLog',
			icon: 'resources/images/add.png',
			height: '100%',
			scale: 'large',
			padding: '0 10 0 10',
			border: false,
			hidden: true,
            listeners: {
                click: function(btn){
                    btn.up('appheader').setCurrentNavItem(btn);
                }
            }
		},{
			xtype: 'tbfill'
		},{
			xtype: 'splitbutton',
			icon: 'resources/images/gear_in.png',
			action: 'logout',
			height: '100%',
			scale: 'large',
			border: false,
			hidden: true,
			menu: {
				items: [{
					text: 'Log Out',
					action: 'logout',
					listeners: {
						click: function(btn){
							btn.up('appheader').fireEvent('logout', this);
						}
					}
				}]
			},
            listeners: {
                click: function(btn){
                    //TODO fire event, take care of in controller. open settings page
                }
            }
		}];
        this.callParent(arguments);
    },

    hideHeaderItems: function(){
		this.down('[action=openFeed]').hide();
		this.down('[action=openMe]').hide();
		this.down('[action=openLog]').hide();
		this.down('[action=logout]').hide();
    },

    showHeaderItems: function(){
		this.down('[action=openFeed]').show();
		this.down('[action=openMe]').show();
		this.down('[action=openLog]').show();
		this.down('[action=logout]').show();
    }
});