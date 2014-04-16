Ext.define('Pacemaker.Application', {
    name: 'Pacemaker',

    extend: 'Ext.app.Application',

    views: [
        'logActivity.NewActivity'
    ],

    controllers: [
        'AppHeader'
    ],

    stores: [
        'Users',
        'metadata.ActivityTypes'
    ]
});
