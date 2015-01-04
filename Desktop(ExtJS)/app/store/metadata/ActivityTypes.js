/**
 * Activity Types store
 */
Ext.define('Pacemaker.store.metadata.ActivityTypes', {
    extend: 'Ext.data.Store',
    requires: [ 'Pacemaker.model.metadata.ActivityType'],

    model: 'Pacemaker.model.metadata.ActivityType',
    //adds records to existing records
    autoLoad: {addRecords: true}
});