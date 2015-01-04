/**
 * Reports header view
 */
Ext.define("Pacemaker.view.user.reports.ReportsHeader", {
    extend: 'Ext.container.Container',
    requires: [],
    
	//encapsulate the time frame for reports. Only accessible through getters and setters
	config: {
		reportTimeframe: null
	},

	//Run on setReportTimeframe(), before item is set. Used for validation etc
	applyReportTimeframe: function(newSel, oldSel){
		//if no button is passed in, default to currentYear
		if(!newSel){
			newSel = this.down('button[action=currentYear]');
		}
		return newSel;
	},

	//Run after reportTimeframe is successfully set.
	updateReportTimeframe: function(newSel, oldSel){
		this.fireEvent('timeframechanged', this, newSel, oldSel);
	},

	xtype: 'reportsheader',
	layout: 'vbox',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			layout: 'hbox',
			width: '100%',
			items: [{
				xtype: 'displayfield',
				hideLabel: true,
				name: 'reportType',
				fieldStyle: 'font-size: 22px;'
			}, {
				xtype: 'tbfill'
			}, {
				xtype: 'displayfield',
				hideLabel: true,
				name: 'reportTimeframeText'
			}]
		}, {
			xtype: 'container',
			layout: 'hbox',
			width: '100%',
			//defaults for all items under this container
			defaults: {
				toggleGroup: 'reportsTimeframe',
				border: false,
				listeners: {
					click: function(btn){
						//On button click, change the reports time frame to the clicked button
						btn.up('reportsheader').setReportTimeframe(btn);
					}
				}
			},
			items: [{
				xtype: 'tbfill'
			},{
				xtype: 'button',
				text: 'Last 30 Days',
				action: 'last30Days'
			},{
				xtype: 'button',
				text: 'Last 3 Months',
				action: 'last3Months'
			},{
				xtype: 'button',
				text: 'Current Year',
				action: 'currentYear',
				pressed: true
			},{
				xtype: 'button',
				text: 'Forever',
				action: 'lifetime'
			}]
		}];
        this.callParent(arguments);

        //set report timeframe when this view is instansiated
        this.setReportTimeframe();
    }
});