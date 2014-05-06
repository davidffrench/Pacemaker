Ext.define('Pacemaker.view.user.UserMain', {
    extend: 'Ext.tab.Panel',
    requires: [
        'Pacemaker.view.user.activities.ActivitiesMain',
        'Pacemaker.view.user.reports.ReportsMain'
    ],

    xtype: 'usermain',
    // deferredRender: true,
    width: 950,
    height: 550,
    margin: '25 0 0 0',
    items: [{
        title: 'Dashboard',
        icon: 'resources/images/house.png',
        listeners: {
            activate: function(tabPanel, newCard, oldCard) {
            }
        }
    }, {
        title: 'Reports',
        icon: 'resources/images/chart_bar.png',
        xtype: 'reportsmain',
        listeners: {
            activate: function(tabPanel, newCard, oldCard) {
                // this.down('reportstotals').doLayout();
            }
        }
    }, {
        title: 'Activites',
        icon: 'resources/images/note.png',
        xtype: 'activitiesmain',
        listeners: {
            activate: function(tab) {
                // this.down('activitystats').doLayout();
            }
        }
    }],

    // listeners: {
    //     tabchange: function(tabPanel, newCard, oldCard) {
    //     }
    // }
});