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
            activate: function(tabPanel, newCard, oldCard) {
                var userId = Pacemaker.utils.GlobalVars.userId,
                    activityStore = tabPanel.getStore();
                debugger;
                activityStore.getProxy().url = activityStore.getProxy().proxyConfig.url + userId + '/activities';
                activityStore.load();
            }
        }
    }],

    listeners: {
        tabchange: function(tabPanel, newCard, oldCard) {
        }
    }
});