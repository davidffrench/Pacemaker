Ext.define('Pacemaker.view.user.Activities', {
    extend: 'Ext.grid.Panel',
    xtype: 'activities',

    store: 'Activities',

    columns: [{
        text: 'Type',
        dataIndex: 'activityType',
        flex: 1
    }, {
        text: 'Location',
        dataIndex: 'location',
        flex: 1
    }, {
        text: 'distance',
        dataIndex: 'activityDistance',
        flex: 1
    }]
});