Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    
    idgen: 'sequential',
    fields: [
        { name: 'activityType', type: 'auto' },
        { name: 'location', type: 'auto' },
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
