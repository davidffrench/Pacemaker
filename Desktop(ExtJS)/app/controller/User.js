Ext.define('Pacemaker.controller.User', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'userMain',
		selector: 'usermain'
	}, {
		ref: 'activities',
		selector: 'activities'
	}],

    init: function() {
		this.listen({
			component: {
				'usermain': {
					activitesTabActivate: this.activitesActivateHandler
				},
				'activities': {
					deleteActivity: this.deleteActivityHandler
				}
			},
			store: {
				
			}
		});
	},

	activitesActivateHandler: function(tabPanel, tab) {
		this.log();
		
		var userId = Pacemaker.utils.GlobalVars.userId,
            activityStore = this.getActivities().getStore();

        activityStore.getProxy().url = activityStore.getProxy().proxyConfig.url + userId + '/activities';
        activityStore.load();
	},

	deleteActivityHandler: function(grid, store, rec) {
		this.log();

		var userId = Pacemaker.utils.GlobalVars.userId,
			activityId = rec.getId();

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverUrl + '/users/' + userId + '/activities/' + activityId,
			method: 'delete',
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);
				
				store.remove(rec);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
