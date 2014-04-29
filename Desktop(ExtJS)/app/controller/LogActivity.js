Ext.define('Pacemaker.controller.LogActivity', {
    extend: 'Ext.app.Controller',

	refs: [{
		ref: 'newActivity',
		selector: 'newactivity'
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

	saveActivityHandler: function(activityView, formValues) {
		this.log(formValues);

		var userId = Pacemaker.utils.GlobalVars.userId;
		
		Ext.Ajax.request({
			url: Pacemaker.utils.GlobalVars.serverUrl + '/users/' + userId + '/activities',
			method: 'post',
			jsonData: formValues,
			success: function(response, opts) {
				var result = Ext.decode(response.responseText);
				console.dir(result);
			},
			failure: function(response, opts) {
				console.log('server-side failure with status code ' + response.status);
			}
		});
	},

	pathPointAddedHandler: function(activityMap, latLng) {
		this.log();

		var distance = activityMap.poly.inKm();
		debugger;
		if(distance)
			this.getNewActivity().down('#distance').setValue(distance);
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
