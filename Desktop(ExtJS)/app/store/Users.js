Ext.define('Pacemaker.store.Users', {
    extend: 'Ext.data.Store',
    requires: [ 'Pacemaker.model.User'],

    model: 'Pacemaker.model.User'
});