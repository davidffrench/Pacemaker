Ext.define('Pacemaker.model.metadata.ActivityType', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'itemCd', type: 'auto' },
        { name: 'itemDesc', type: 'auto' }
    ],

    proxy: {
        type: 'ajax',
        url: 'resources/data/ActivityTypes.json'
    }
});
