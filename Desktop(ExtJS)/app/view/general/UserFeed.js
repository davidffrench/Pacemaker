/**
 * User feed view
 */
Ext.define('Pacemaker.view.general.UserFeed', {
    extend: 'Ext.grid.Panel',
    requires: [
    ],

    xtype: 'userfeed',
    store: 'Feed',
    title: 'Feed',
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
                // render feedDate as time Since now. convience method in Utility
                return Pacemaker.utils.Utility.timeSince(value) + ' ago';
            }
        }];
        
        this.callParent(arguments);
    }
});