Ext.define('Pacemaker.view.user.ActivitiesMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.Activities',
        'Pacemaker.view.user.ActivityStats'
    ],

    xtype: 'activitiesmain',
    border: true,
    layout: 'hbox',
    width: '100%',
    height: '100%',

    items: [{
        xtype: 'activities',
        width: 250,
        height: '100%'
    }, {
        xtype: 'container',
        width: 680,
        height: '100%',
        items: [{
            xtype: 'activitystats',
            margin: 10,
            height: 60
        }, {
            xtype: 'activitymap',
            width: '100%',
            height: 420,
        }]
    }]
});