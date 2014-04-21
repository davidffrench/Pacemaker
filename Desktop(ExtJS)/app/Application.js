Ext.define('Pacemaker.Application', {
    name: 'Pacemaker',
    requires: ['Pacemaker.utils.GlobalVars'],

    extend: 'Ext.app.Application',

    views: [
        'logActivity.NewActivity',
        'user.UserMain'
    ],

    controllers: [
        'AppHeader',
        'Authorization',
        'LogActivity'
    ],

    stores: [
        'Users',
        'Activities',
        'metadata.ActivityTypes'
    ]
});
