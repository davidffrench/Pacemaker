/**
 * Route model
 */
Ext.define('Pacemaker.model.Route', {
    extend: 'Ext.data.Model',

    fields: [
		// convert: null, will stop int from being rounded
        { name: 'latitude', type: 'int', convert: null },
        { name: 'longitude', type: 'int', convert: null }
    ]
});
