Ext.define('Pacemaker.model.Activity', {
    extend: 'Ext.data.Model',
    requires: [ 'Pacemaker.model.Route'],
    
    fields: [
        { name: 'id', type: 'string', mapping: '_id' },
        { name: 'activityType', type: 'string' },
        { name: 'activityDate', type: 'date' },
        { name: 'location', type: 'string' },
        { name: 'distance', type: 'int', convert: null },
        { name: 'calories', type: 'int' },
        { name: 'durationHours', type: 'int' },
        { name: 'durationMinutes', type: 'int' },
        { name: 'startTime', type: 'date' },
        { name: 'duration', type: 'string',
            convert: function (newValue, record) {
                return record.get('durationHours') + 'hr ' + record.get('durationMinutes') + 'm';
            }
        }
    ],

    associations: [{
        type: 'hasMany',
        model: 'Pacemaker.model.Route',
        name: 'route'
    }],

    proxy: {
        type: 'rest',
        url: Pacemaker.utils.GlobalVars.serverApiUrl + '/users/' + Pacemaker.utils.GlobalVars.userId + '/activities/',
        writer:{
            type: 'json',
            //override to save associated route with model.save()
            getRecordData: function(record) {
                Ext.apply(record.data, record.getAssociatedData());
                return record.data;
            }
        }
    }
});
