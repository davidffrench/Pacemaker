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
				'usermain': {
					dashboardactivate: this.dashboardActivateHandler
				},
				'activitiesmain': {
					afterlayout: this.activitesActivateHandler
				},
				'activitieslist': {
					deleteActivity: this.deleteActivityHandler,
					selectionchange: this.activityChangeHandler
				},
				'reportslist': {
					selectionchange: this.reportsTypeChangeHandler
				},
				'reportsheader': {
					timeframechanged: this.timeFrameChangeHandler
				},
				'friendslist': {
					addfriend: this.addFriendHandler
				}
			}
		});
	},

	/**
     * Sends requests for dashboard data and updates views
     * @param {Ext.tab.Panel} tabPanel User tabPanel
     * @param {Ext.tab.Tab} tab dashboard tab
     */
	dashboardActivateHandler: function(tabPanel, tab) {
		this.log();
		
		var me = this,
			userModel = Ext.ModelManager.getModel('Pacemaker.model.User'),
			userId = Pacemaker.utils.GlobalVars.userId;
		
		userModel.load(userId, {
			scope: this,
			success: function(record, operation) {
				tab.down('userinfo').loadRecord(record);
			}
		});

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/dashboardStatsData',
			method: 'get',
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				tab.down('[name=totalDistance]').setValue(Ext.util.Format.number(result.totalDistance, '0.00'));
				tab.down('[name=totalActivities]').setValue(result.totalActivities);
				tab.down('[name=totalCalories]').setValue(result.totalCalories);
			}
		});
	},

	/**
     * Sends request for activities grid data
     * @param {Ext.tab.Panel} tabPanel User tabPanel
     * @param {Ext.tab.Tab} tab activities tab
     */
	activitesActivateHandler: function(tabPanel, tab) {
		this.log();
		
		var activityStore = this.getActivitiesList().getStore();
		activityStore.getProxy().url = Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activities/';
        activityStore.load();

		tabPanel.down('activitymap').renderMap(false);
	},

	/**
     * Opens Msg window to confirm activity deletion, deletes activity if ok clicked
     * @param {Ext.grid.Panel} grid Actvities grid
     * @param {Ext.data.Store} store activities store
     * @param {Ext.data.Model} rec activity record
     */
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
					store.sync();
				}
			}
		});
		
	},

	/**
     * If record is selected, load record into stats view and set google maps path. If record not selected, clear and reset view/map
     * @param {Ext.selection.Model} selModel activities grid selection model
     * @param {Ext.data.Model} selected activity record
     */
	activityChangeHandler: function(selModel, selected) {
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

	/**
     * Set report Type value and call getReportsData() function
     * @param {Ext.selection.Model} selModel reports grid selection model
     * @param {Ext.data.Model} selected report record
     */
	reportsTypeChangeHandler: function(selModel, selected){
        var reportsMain = this.getReportsMain();
        reportsMain.down('[name=reportType]').setValue(selected[0].get('itemDesc'));

        this.getReportsData();
    },

	/**
     * Set timeframe text value and call getReportsData() function
     * @param {Ext.container.Container} reportsheader reports header container
     * @param {Ext.btn.Btn} newSel new Selected Button
     * @param {Ext.btn.Btn} oldSel old Selected Button
     */
	timeFrameChangeHandler: function(reportsheader, newSel, oldSel){
		var reportTimeframeText = reportsheader.down('[name=reportTimeframeText]'),
			date = new Date(),
			dateText = ' - ';

		if(newSel.action === 'last30Days'){
			dateText += Ext.Date.format(date, 'M j,Y');
			date.setDate(date.getDate() - 30);
			dateText = Ext.Date.format(date, 'M j,Y') + dateText;
		} else if(newSel.action === 'last3Months'){
			dateText += Ext.Date.format(date, 'M Y');
			date.setMonth(date.getMonth() - 2);
			dateText = Ext.Date.format(date, 'M Y') + dateText;
		} else if(newSel.action === 'currentYear'){
			dateText += Ext.Date.format(date, 'M Y');
			date.setMonth(date.getMonth() - 12);
			dateText = Ext.Date.format(date, 'M Y') + dateText;
		} else if(newSel.action === 'lifetime'){
			dateText += Ext.Date.format(date, 'M Y');
			date.setMonth(date.getMonth() - 240);
			dateText = '13.8 billion years ago' + dateText;
		}
		reportTimeframeText.setValue(dateText);
		reportTimeframeText.startDate = date;

		if(oldSel)
			this.getReportsData();
    },

	/**
     * Send request to get reports data and update view and charts with response
     */
	getReportsData: function(){
		var reportsMain = this.getReportsMain(),
			activityType = reportsMain.down('reportslist').getSelectionModel().getSelection()[0].get('itemCd'),
			reportTimeframeDate = reportsMain.down('[name=reportTimeframeText]').startDate,
			reportTimeframe = reportsMain.down('reportsheader').getReportTimeframe().action,
			chartsStore = reportsMain.down('[name=distanceChart]').getStore(),
			postJSON = {};

		postJSON.activityType = (activityType === 'All') ? undefined : activityType;
		postJSON.startDate = reportTimeframeDate;
		postJSON.timeframeOption = reportTimeframe;
		
		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activitiesReportsData',
			method: 'post',
			jsonData: postJSON,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				reportsMain.down('[name=totalDistance]').setValue(Ext.util.Format.number(result.totals.totalDistance, '0.00'));
				reportsMain.down('[name=totalDuration]').setValue(result.totals.totalDurationHrs + 'hrs ' + result.totals.totalDurationMins + 'mins');
				reportsMain.down('[name=totalCalories]').setValue(result.totals.totalCalories);

				chartsStore.removeAll();
				chartsStore.add(result.activities);
			}
		});
    },

	/**
     * Sends request to add friend and alerts user upon success
     * @param {Ext.grid.Panel} friendsGrid Friends grid
     * @param {Ext.data.Store} store User store
     * @param {Ext.data.Model} friendRec user record
     */
    addFriendHandler: function(friendsGrid, store, friendRec){
		var postJSON = Ext.JSON.encode(friendRec.data);

		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/addFriend',
			method: 'post',
			jsonData: postJSON,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);

				Ext.Msg.alert('Friend Added', 'Friend added successfully');
			}
		});
    },

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
