Ext.define('Pacemaker.view.user.reports.ReportsCharts', {
	extend: 'Ext.panel.Panel',
	requires: [
		'Ext.chart.axis.Time',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Column'
	],

	xtype: 'reportscharts',
	layout: 'fit',

    initComponent: function() {
		this.items = [{
			xtype: 'chart',
			store: Ext.create('Pacemaker.store.Activities'),
			name: 'distanceChart',
			title: 'Distance',
			axes: [{
				type: 'Numeric',
				title: 'KM',
				position: 'left',
				fields: ['distance'],
				grid: true
			}, {
				type: 'Time',
				title: 'Activity Date',
				position: 'bottom',
				fields: ['activityDate'],
				dateFormat: 'M d'
			}],
			series: [{
				type: 'column',
				axis: 'left',
				xField: 'activityDate',
				yField: 'distance',
				highlight: true,
				//tooltip on mouse hoverover of column which represents a store record
				tips: {
					trackMouse: true,
					width: 150,
					renderer: function(storeItem, item) {
						//What displays on tooltip. Gets data from current store record. Display calories burned and duration
						this.setTitle('Calories Burned: ' + storeItem.get('calories') + '<br>' + 'Duration: ' +storeItem.get('duration'));
					}
				},
			}]
		}];

		//right aligned button on top toolbar.
		this.tbar = ['->', {
			text: 'Save Chart',
			handler: function() {
				//on click, display a confirmation box, if choice is yes save the cart as a png
				var distanceChart = this.up('reportscharts').down('[name=distanceChart]');
				Ext.MessageBox.confirm('Confirm Download', 'Would you like to download the chart as an image?', function(choice){
					if(choice == 'yes'){
						distanceChart.save({
							type: 'image/png'
						});
					}
				});
			}
		}];

		this.callParent(arguments);
    },
});