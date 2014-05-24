Ext.define('Pacemaker.model.User', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'string', mapping: '_id'},
        { name: 'firstname', type: 'string' },
        { name: 'lastname', type: 'string' },
        { name: 'email', type: 'string', mapping: 'local.email' },
        { name: 'password', type: 'string', mapping: 'local.password' },
        { name: 'fullname', type: 'string',
            // new client field fullname, combines firtname and lastname
            convert: function (newValue, record) {
                return record.get('firstname') + ' ' + record.get('lastname');
            }
        }
    ],

    proxy: {
        type: 'rest',
        url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users'
    }
});
