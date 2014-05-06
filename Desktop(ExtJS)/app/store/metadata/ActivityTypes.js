Ext.define('Pacemaker.store.metadata.ActivityTypes', {
    extend: 'Ext.data.Store',
    requires: [ 'Pacemaker.model.metadata.ActivityType'],

    model: 'Pacemaker.model.metadata.ActivityType',
    autoLoad: {addRecords: true}
});