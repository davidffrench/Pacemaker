Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'string', mapping: '_id' },
        { name: 'activityType', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'activityDistance', type: 'int' }
    ],

    // associations: [{
    //     type: 'belongsTo',
    //     model: 'Pacemaker.model.User'
    // }]

    proxy: {
        type: 'ajax',
        url: Pacemaker.utils.GlobalVars.serverUrl + '/users/'
    }
});
