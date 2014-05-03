Ext.define('Pacemaker.store.Activities', {
    extend: 'Ext.data.Store',
    requires: [ 'Pacemaker.model.Activity'],

    model: 'Pacemaker.model.Activity',
    autoSync: true
});