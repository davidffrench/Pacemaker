Ext.define('Pacemaker.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string', mapping: '_id'},
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'email', type: 'string', mapping: 'local.email' },
        { name: 'password', type: 'string', mapping: 'local.password' },
        { name: 'fullname', type: 'string',
            convert: function (newValue, record) {
                return record.get('firstname') + ' ' + record.get('lastname');
            }
        }
    ],

    // associations: [{
    //     type: 'hasMany',
    //     model: 'Pacemaker.model.Activity',
    //     name: 'activities'
    // }],

    proxy: {
        type: 'rest',
        url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users'
    }
});
