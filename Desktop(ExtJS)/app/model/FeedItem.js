/**
 * Feed Item model
 */
Ext.define('Pacemaker.model.FeedItem', {
    extend: 'Ext.data.Model',
    
    fields: [
        { name: 'id', type: 'string', mapping: '_id' },
        { name: 'userFirstname', type: 'string' },
        { name: 'userLastname', type: 'string' },
        { name: 'feedDate', type: 'date' },
        { name: 'feedText', type: 'string' },
        { name: 'userFullname', type: 'string',
            convert: function (newValue, record) {
                return record.get('userFirstname') + ' ' + record.get('userLastname');
            }
        }
    ]
});
