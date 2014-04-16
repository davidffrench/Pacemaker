Ext.define('Pacemaker.model.metadata.ActivityType', {
    extend: 'Ext.data.Model',
    
    idgen: 'sequential',
    fields: [
        { name: 'itemCd', type: 'auto' },
        { name: 'itemDesc', type: 'auto' }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/ActivityTypes.json'
    }
});
