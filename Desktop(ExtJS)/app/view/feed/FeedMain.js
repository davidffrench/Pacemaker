Ext.define('Pacemaker.view.feed.FeedMain', {
    extend: 'Ext.container.Container',
    requires: [
        'Pacemaker.view.general.UserFeed'
    ],

    xtype: 'feedmain',
    width: 950,
    height: 550,
    margin: '25 0 0 0',
    items: [{
        xtype: 'userfeed'
    }]
});