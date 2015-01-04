/**
 * Dashboard main view
 */
Ext.define('Pacemaker.view.user.dashboard.DashboardMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.dashboard.UserInfo',
        'Pacemaker.view.user.dashboard.DashboardStats',
        'Pacemaker.view.general.UserFeed'
    ],

    xtype: 'dashboardmain',
    border: true,
    layout: 'hbox',
    width: '100%',
    height: '100%',

    items: [{
        xtype: 'userinfo',
        width: 250,
        height: '100%'
    }, {
        xtype: 'container',
        width: 680,
        height: '100%',
        items: [{
            xtype: 'dashboardstats',
            margin: 10,
            height: 40
        }, {
            xtype: 'userfeed',
            width: '100%',
            height: 400,
        }]
    }]
});