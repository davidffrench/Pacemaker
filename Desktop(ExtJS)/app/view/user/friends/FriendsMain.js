Ext.define('Pacemaker.view.user.friends.FriendsMain', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Pacemaker.view.user.friends.FriendsList'
    ],

    xtype: 'friendsmain',
    border: true,
    layout: 'hbox',
    width: '100%',
    height: '100%',

    items: [{
        xtype: 'friendslist',
        width: 250,
        height: '100%'
    }, {
        xtype: 'container',
        width: 680,
        height: '100%',
        items: [{
            // xtype: 'activitystats',
            margin: 10,
            height: 40
        }, {
            // xtype: 'activitymap',
            width: '100%',
            height: 440,
        }]
    }]
});