Ext.define('Pacemaker.model.User', {
    extend: 'Ext.data.Model',
	requires: [ 'Pacemaker.model.Activity' ],

    idgen: 'sequential',
    fields: [
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'password', type: 'string' }
    ],

    associations: [{
        type: 'hasMany',
        model: 'Pacemaker.model.Activity',
        name: 'activities'
    }],

    proxy: {
        type: 'ajax',
        url: 'resources/data/Users.json'
    }
});
