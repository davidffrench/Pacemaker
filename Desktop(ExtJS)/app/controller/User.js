Ext.define('Pacemaker.controller.User', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'userMain',
		selector: 'usermain'
	}, {
		ref: 'activitiesMain',
		selector: 'activitiesmain'
	}, {
		ref: 'activities',
		selector: 'activities'
	}, {
		ref: 'activityStats',
		selector: 'activitystats'
	}],

    init: function() {
		this.listen({
			component: {
				'usermain': {
					activitesTabActivate: this.activitesActivateHandler
				},
				'activities': {
					deleteActivity: this.deleteActivityHandler,
					selectionchange: this.activityChangeHandler
				}
			},
			store: {
				
			}
		});
	},

	activitesActivateHandler: function(tabPanel, tab) {
		this.log();
		
		var activityStore = this.getActivities().getStore();
        activityStore.load();

		tabPanel.down('activitymap').renderMap();
	},

	deleteActivityHandler: function(grid, store, rec) {
		this.log();
		
		Ext.Msg.show({
			title: 'Remove Activity',
			msg: 'Are you sure that you want to proceed? This activity will be removed',
			buttons: Ext.Msg.OKCANCEL,
			icon: Ext.Msg.WARNING,
			fn: function(btn){
				if(btn === 'ok'){
					//delete user - could also use rec.destroy()
					store.remove(rec);
				}
			}
		});
		
	},

	activityChangeHandler: function( selModel, selected) {
		this.log();

		var rec = selModel.getSelection()[0],
			activityStats = this.getActivityStats();

		activityStats.loadRecord(rec);
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
