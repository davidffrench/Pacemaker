Ext.define('Pacemaker.view.user.reports.ReportsMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.reports.ReportsList'
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
    }, 
    // {
    //     xtype: 'container',
    //     width: 680,
    //     height: '100%',
    //     items: [{
    //         xtype: 'activitystats',
    //         margin: 10,
    //         height: 40
    //     }, {
    //         xtype: 'activitymap',
    //         width: '100%',
    //         height: 440,
    //     }]
    // }
    ]
});