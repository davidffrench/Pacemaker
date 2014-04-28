Ext.define('Pacemaker.controller.User', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'userMain',
		selector: 'usermain'
	}],

    init: function() {
		this.listen({
			component: {
				'usermain': {
					activitesTabActivate: this.activitesActivateHandler
				}
			},
			store: {
				
			}
		});
	},

	activitesActivateHandler: function(tabPanel, tab) {
		this.log(tabPanel);

		var userId = Pacemaker.utils.GlobalVars.userId,
            activityStore = tab.getStore();

        activityStore.getProxy().url = activityStore.getProxy().proxyConfig.url + userId + '/activities';
        activityStore.load();
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
