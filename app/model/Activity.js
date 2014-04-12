Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    
    idgen: 'sequential',
    fields: [
        { name: 'kind', type: 'auto' },
        { name: 'location', type: 'auto' },
        { name: 'distance', type: 'auto' }
    ],

    associations: [{
        type: 'belongsTo',
        model: 'Pacemaker.model.User'
    }]
});
