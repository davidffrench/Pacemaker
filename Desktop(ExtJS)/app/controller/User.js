Ext.define('Pacemaker.controller.User', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'userMain',
		selector: 'usermain'
	}, {
		ref: 'activitiesMain',
		selector: 'activitiesmain'
	}, {
		ref: 'activitiesList',
		selector: 'activitieslist'
	}, {
		ref: 'activityStats',
		selector: 'activitystats'
	}, {
		ref: 'activityMap',
		selector: 'activitymap'
	}, {
		ref: 'reportsMain',
		selector: 'reportsmain'
	}],

    init: function() {
		this.listen({
			component: {
				'activitiesmain': {
					afterlayout: this.activitesActivateHandler
				},
				'activitieslist': {
					deleteActivity: this.deleteActivityHandler,
					selectionchange: this.activityChangeHandler
				},
				'reportslist': {
					selectionchange: this.reportsTypeChangeHandler
				}
			},
			store: {
				
			}
		});
	},

	activitesActivateHandler: function(tabPanel, tab) {
		this.log();
		
		var activityStore = this.getActivitiesList().getStore();
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
			activityStats = this.getActivityStats(),
			activityMap = this.getActivityMap();

		if(rec){
			activityStats.loadRecord(rec);
			activityMap.setPath(rec.route());
		} else {
			activityStats.resetAndClear();
			activityMap.setPath();
		}
	},

	reportsTypeChangeHandler: function(selModel, selected){
        var reportsMain = this.getReportsMain();
        reportsMain.down('[name=reportType]').setValue(selected[0].get('itemDesc'));

        var activityType = selected[0].get('itemCd'),
			postJSON = activityType === 'All' ? {} : {"activityType": activityType};

        Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activitiesReportsData',
			method: 'post',
			jsonData: postJSON,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				reportsMain.down('[name=totalDistance]').setValue(Ext.util.Format.number(result.totals.totalDistance, '0.00'));
				reportsMain.down('[name=totalDuration]').setValue(result.totals.totalDurationHrs + 'hrs ' + result.totals.totalDurationMins + 'mins');
				reportsMain.down('[name=totalCalories]').setValue(result.totals.totalCalories);
			},
			failure: function(response, opts) {
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

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
