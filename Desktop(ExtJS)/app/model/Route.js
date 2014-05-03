Ext.define('Pacemaker.model.Route', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'latitude', type: 'int', convert: null },
        { name: 'longitude', type: 'int', convert: null }
    ]
});
