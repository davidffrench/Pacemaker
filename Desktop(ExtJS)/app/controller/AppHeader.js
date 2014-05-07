Ext.define('Pacemaker.controller.AppHeader', {
    extend: 'Ext.app.Controller',

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
		//set mainAppCard activeItem
		this.getViewport().down('#appMainCard').layout.setActiveItem(mainContainer);
		//hide header navigation
		this.getAppHeader().showHeaderItems();

		if(newSel.action === 'openLog'){
			var logActivityView = Ext.create('Pacemaker.view.logActivity.NewActivity');
			mainContainer.insert(logActivityView);
			logActivityView.down('activitymap').renderMap(true);
		} else if(newSel.action === 'openMe'){
			var userMainView = Ext.create('Pacemaker.view.user.UserMain');
			mainContainer.insert(userMainView);
		}
	},

	log: function(message){
		console.log(arguments.callee.caller.$name + ': ' + message);
	}
});
