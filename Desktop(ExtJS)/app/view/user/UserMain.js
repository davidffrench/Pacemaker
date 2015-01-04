/**
 * User main view
 */
Ext.define('Pacemaker.view.user.UserMain', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Pacemaker.view.user.activities.ActivitiesMain',
        'Pacemaker.view.user.reports.ReportsMain',
        'Pacemaker.view.user.friends.FriendsMain',
        'Pacemaker.view.user.dashboard.DashboardMain'
    ],

    xtype: 'usermain',
    // deferredRender: true,
    width: 950,
    height: 550,
    margin: '25 0 0 0',
    items: [{
        title: 'Dashboard',
        icon: 'resources/images/house.png',
        xtype: 'dashboardmain',
        listeners: {
            activate: function(tab) {
                var userMain = tab.up('usermain');
                userMain.fireEvent('dashboardactivate', userMain, tab);
            }
        }
    }, {
        title: 'Reports',
        icon: 'resources/images/chart_bar.png',
        xtype: 'reportsmain'
    }, {
        title: 'Activites',
        icon: 'resources/images/note.png',
        xtype: 'activitiesmain'
    }, {
        title: 'Friends',
        icon: 'resources/images/report_user.png',
        xtype: 'friendsmain',
        listeners: {
            activate: function(tab) {
                this.down('friendslist').getStore().load();
            }
        }
    }]
});