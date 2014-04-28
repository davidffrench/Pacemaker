Ext.define('Pacemaker.view.user.UserMain', {
    extend: 'Ext.tab.Panel',
    requires: ['Pacemaker.view.user.Activities'],

    xtype: 'usermain',
    deferredRender: true,
    width: 700,
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
        icon: 'resources/images/chart_bar.png'
    }, {
        title: 'Activites',
        icon: 'resources/images/note.png',
        xtype: 'activities',
        listeners: {
            activate: function(tab) {
                var userMain = tab.up('usermain');
                userMain.fireEvent('activitesTabActivate', userMain, tab);
            }
        }
    }],

    listeners: {
        tabchange: function(tabPanel, newCard, oldCard) {
        }
    }
});