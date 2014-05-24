Ext.define('Pacemaker.Application', {
    name: 'Pacemaker',
    requires: [
        'Pacemaker.utils.GlobalVars',
        'Pacemaker.utils.Utility'
    ],

    extend: 'Ext.app.Application',

    views: [
        'logActivity.NewActivity',
        'user.UserMain'
    ],

    controllers: [
        'AppHeader',
        'Authorization',
        'LogActivity',
        'User'
    ],

    stores: [
        'Users',
        'Activities',
        'Feed',
        'metadata.ActivityTypes'
    ]
});
