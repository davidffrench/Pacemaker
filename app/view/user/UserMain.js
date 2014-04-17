Ext.define('Pacemaker.view.user.UserMain', {
    extend: 'Ext.tab.Panel',
    requires: ['Pacemaker.view.user.Activities'],

    xtype: 'usermain',
    width: 700,
    margin: '25 0 0 0',
    items: [{
        title: 'Dashboard',
        icon: 'resources/images/house.png'
    }, {
        title: 'Reports',
        icon: 'resources/images/chart_bar.png'
    }, {
        title: 'Activites',
        icon: 'resources/images/note.png',
        xtype: 'activities'
    }]
});