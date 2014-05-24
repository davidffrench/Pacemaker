Ext.define('Pacemaker.controller.LogActivity', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'newActivity',
		selector: 'newactivity'
	}, {
		ref: 'appHeader',
		selector: 'appheader'
	}],

    init: function() {
		this.listen({
			component: {
				'newactivity': {
					saveActivity: this.saveActivityHandler
				},
				'activitymap': {
					pathPointAdded: this.pathPointAddedHandler
				}
			},
			store: {
				
			}
		});
	},

	saveActivityHandler: function(activityView, submitValues) {
		this.log(submitValues);

		var activityRecord = Ext.create('Pacemaker.model.Activity', submitValues),
			activityRoute = activityRecord.route(),
			routeArr = [];

        //loop over route path and map to new array with instansiated models
        Ext.Array.each(submitValues.route, function(pathPoint, index, routeItSelf) {
            routeArr.push(Ext.create('Pacemaker.model.Route', {
                latitude: pathPoint.lat(),
                longitude: pathPoint.lng()
            }));
        });
		activityRoute.add(routeArr);

		activityRecord.getProxy().url = Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activities/';
		activityRecord.save();

		var appHeader = this.getAppHeader();
		appHeader.setCurrentNavItem(appHeader.down('[action=openMe]'));
	},

	pathPointAddedHandler: function(activityMap, latLng) {
		this.log();

		var distance = activityMap.poly.inKm();
		if(distance)
			this.getNewActivity().down('#distance').setValue(distance);
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
