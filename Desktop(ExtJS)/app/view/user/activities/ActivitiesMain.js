/**
 * Activities main view
 */
Ext.define('Pacemaker.view.user.activities.ActivitiesMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.activities.ActivitiesList',
        'Pacemaker.view.user.activities.ActivityStats'
    ],

    xtype: 'activitiesmain',
    border: true,
    layout: 'hbox',
    width: '100%',
    height: '100%',

    items: [{
        xtype: 'activitieslist',
        width: 250,
        height: '100%'
    }, {
        xtype: 'container',
        width: 680,
        height: '100%',
        items: [{
            xtype: 'activitystats',
            margin: 10,
            height: 40
        }, {
            xtype: 'activitymap',
            width: '100%',
            height: 440,
        }]
    }]
});