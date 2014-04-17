Ext.define('Pacemaker.Application', {
    name: 'Pacemaker',

    extend: 'Ext.app.Application',

    views: [
        'logActivity.NewActivity',
        'user.UserMain'
    ],

    controllers: [
        'AppHeader'
    ],

    stores: [
        'Users',
        'Activities',
        'metadata.ActivityTypes'
    ]
});
