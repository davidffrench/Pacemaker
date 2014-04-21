Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'string' },
        { name: 'activityType', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'distance', type: 'int' }
    ],

    // associations: [{
    //     type: 'belongsTo',
    //     model: 'Pacemaker.model.User'
    // }]

    proxy: {
        type: 'ajax',
        url: 'resources/data/Activities.json'
    }
});
