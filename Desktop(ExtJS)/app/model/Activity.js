Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'string', mapping: '_id' },
        { name: 'activityType', type: 'string' },
        { name: 'activityDate', type: 'date' },
        { name: 'location', type: 'string' },
        { name: 'distance', type: 'int' },
        { name: 'calories', type: 'int' },
        { name: 'durationHours', type: 'int' },
        { name: 'durationMinutes', type: 'int' },
        { name: 'startTime', type: 'date' },
        { name: 'duration', type: 'string',
            convert: function (newValue, record) {
                return record.get('durationHours') + 'hrs ' + record.get('durationMinutes') + 'm';
            }
        }
    ],

    // associations: [{
    //     type: 'belongsTo',
    //     model: 'Pacemaker.model.User'
    // }]

    proxy: {
        type: 'rest',
        url: Pacemaker.utils.GlobalVars.serverUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activities/'
    }
});
