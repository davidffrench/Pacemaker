Ext.define('Pacemaker.view.user.reports.ReportsMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.reports.ReportsList',
        'Pacemaker.view.user.reports.ReportsHeader',
        'Pacemaker.view.user.reports.ReportsCharts',
        'Pacemaker.view.user.reports.ReportsTotals'
    ],

    xtype: 'reportsmain',
    border: true,
    layout: 'hbox',
    width: '100%',
    height: '100%',

    items: [{
        xtype: 'reportslist',
        width: 100,
        height: '100%'
    }, {
        xtype: 'container',
        width: 800,
        height: '100%',
        items: [{
            xtype: 'reportsheader',
            margin: 10,
            height: 50
        }, {
            xtype: 'reportstotals',
            margin: 10,
            height: 40
        }, {
            xtype: 'reportscharts',
            // width: '100%',
            height: 400,
        }]
    }
    ]
});