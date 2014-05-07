Ext.define("Pacemaker.view.user.reports.ReportsHeader", {
    extend: 'Ext.container.Container',
    requires: [],
    
	config: {
		reportTimeframe: null
	},

	applyReportTimeframe: function(newSel, oldSel){
		//if no button is passed in, default to currentYear
		if(!newSel){
			newSel = this.down('button[action=currentYear]');
		}
		return newSel;
	},

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
			defaults: {
				toggleGroup: 'reportsTimeframe',
				listeners: {
					click: function(btn){
						btn.up('reportsheader').setReportTimeframe(btn);
					}
				}
			},
			items: [{
				xtype: 'tbfill'
			},{
				xtype: 'button',
				text: 'Last 30 Days',
				action: 'last30Days',
				border: false
			},{
				xtype: 'button',
				text: 'Last 3 Months',
				action: 'last3Months',
				border: false,
				listeners: {
					click: function(btn){
						btn.up('reportsheader').setReportTimeframe(btn);
					}
				}
			},{
				xtype: 'button',
				text: 'Current Year',
				action: 'currentYear',
				border: false,
				pressed: true,
				listeners: {
					click: function(btn){
						btn.up('reportsheader').setReportTimeframe(btn);
					}
				}
			},{
				xtype: 'button',
				text: 'Forever',
				action: 'lifetime',
				border: false,
				listeners: {
					click: function(btn){
						btn.up('reportsheader').setReportTimeframe(btn);
					}
				}
			}]
		}];
        this.callParent(arguments);

        this.setReportTimeframe();
    }
});