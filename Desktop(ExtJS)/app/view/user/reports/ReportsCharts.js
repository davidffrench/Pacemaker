Ext.define('Pacemaker.view.user.reports.ReportsCharts', {
	extend: 'Ext.container.Container',
	requires: [
		'Ext.chart.axis.Time',
		'Ext.chart.axis.Numeric',
		'Ext.chart.series.Line'
	],

	xtype: 'reportscharts',
	layout: 'fit',

	// requires: ['Ext.util.Point'],
    initComponent: function() {
		this.items = [{
			xtype: 'chart',
			store: Ext.create('Pacemaker.store.Activities'),
			name: 'distanceChart',
			axes: [{
				type: 'Numeric',
				title: 'KM',
				position: 'left',
				fields: ['distance']
			}, {
				type: 'Time',
				title: 'Activity Date',
				position: 'bottom',
				fields: ['activityDate'],
				dateFormat: 'M d'
				// label: {
				// 	rotate: {
				// 		degrees: 45
				// 	}
				// }
			}],
			series: [{
				type: 'column',
				axis: 'left',
				xField: 'activityDate',
				yField: 'distance',
				// axis: ['left', 'bottom'],
				// highlight: {
				// 	type: 'circle',
				// 	radius: 10,
				// 	fill: 'blue'
				// },
			// listeners: {
			// 	itemmouseover: function(item) {
			// 		var chart = item.series.chart;
			// 		chart.fireEvent('itemmouseover', chart, item.storeItem);
			// 	}
			// }
			}]
		}, {
			html: 'asdsadsadas'
		}];
        

		// this.series = [{
		// 	type: 'line',
		// 	xField: 'country',
		// 	yField: 'consumption',
		// 	axis: ['left', 'bottom'],
		// 	highlight: {
		// 		type: 'circle',
		// 		radius: 10,
		// 		fill: 'blue'
		// 	},
		// // listeners: {
		// // 	itemmouseover: function(item) {
		// // 		var chart = item.series.chart;
		// // 		chart.fireEvent('itemmouseover', chart, item.storeItem);
		// // 	}
		// // }
		// }];

		this.callParent(arguments);
    },

	
	// highlightItem: function(record) {
	// 	// Highlight the item referencing the record
	// 	var series = this.series.get(0); // The line is the first item
	// 	series.unHighlightItem(); // Un-highlight everything
	// 	if (!record) {
	// 		return;
	// 	}
	// 	var items = series.items;
	// 	for (var i = 0; i < items.length; i++) {
	// 		if (items[i].storeItem === record) {
	// 			series.highlightItem(items[i]);
	// 			break;
	// 		}
	// 	}
	// }
});