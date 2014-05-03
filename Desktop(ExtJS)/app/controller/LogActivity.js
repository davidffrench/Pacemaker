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

		var activityRecord = Ext.create('Pacemaker.model.Activity', formValues);

		activityRecord.save();
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
