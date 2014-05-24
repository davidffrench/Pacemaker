Ext.define('Pacemaker.view.general.UserFeed', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action'
    ],

    xtype: 'userfeed',
    store: 'Feed',
    title: 'Feed',
    // hideHeaders: true,
    autoScroll: true,
    margin: 15,

    initComponent: function() {
        this.columns = [{
            dataIndex: 'userFullname',
            text: 'User',
            flex: 0.8
        }, {
            dataIndex: 'feedText',
            text: 'Information',
            flex: 1
        }, {
            dataIndex: 'feedDate',
            text: 'Time Since',
            flex: 0.6,
            renderer: function(value){
                return Pacemaker.utils.Utility.timeSince(value) + ' ago';
            }
        }];
        
        this.callParent(arguments);
    }
});