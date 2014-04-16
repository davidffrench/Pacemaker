Ext.define('Pacemaker.controller.AppHeader', {
    extend: 'Ext.app.Controller',

    stores:[
		
    ],

    refs: [{
		ref: 'appHeader',
		selector: 'appheader'
	}, {
		ref: 'viewport',
		selector: 'viewport'
	}],

    init: function() {
		this.listen({
			component: {
				'appheader': {
					navitemchange: this.navChangeHandler
				}
			},
			store: {
				
			}
		});
	},

	navChangeHandler: function(appHeader, newSel, oldSel) {
		this.log(newSel.action);
		
		//visually show the new navigation item
		newSel.toggle();
		if(oldSel)
			oldSel.toggle();

		var mainContainer = this.getViewport().down('#appmainctn');
		//destroy container items
		mainContainer.removeAll();
		if(newSel.action === 'openLog'){
			var logActivityView = Ext.create('Pacemaker.view.logActivity.NewActivity');
			mainContainer.insert(logActivityView);
		}
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
