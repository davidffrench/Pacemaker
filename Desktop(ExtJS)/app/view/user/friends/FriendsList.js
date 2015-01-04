/**
 * Friends list view
 */
Ext.define('Pacemaker.view.user.friends.FriendsList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action'
    ],

    xtype: 'friendslist',
    store: 'Users',
    hideHeaders: true,
    autoScroll: true,
    //grid plugins
    plugins: {
        //only renders a certain amount of grid rows dependant on store page size
        ptype: 'bufferedrenderer',
        trailingBufferZone: 20,  // Keep 20 rows rendered in the table behind scroll
        leadingBufferZone: 50   // Keep 50 rows rendered in the table ahead of scroll
    },

    initComponent: function() {
        this.columns = [{
            dataIndex: 'fullname',
            flex: 0.5
        }, {
            xtype:'actioncolumn',
            width:30,
            items: [{
                icon: 'resources/images/add.png',
                tooltip: 'Invite User',
                //on click of invite user icon
                handler: function(gridView, rowIndex, colIndex) {
                    //fire custom event so controller can send ajax cll to add friend
                    var rec = gridView.getStore().getAt(rowIndex),
                        friendsList = gridView.up('friendslist');

                    friendsList.fireEvent('addfriend', friendsList, gridView.getStore(), rec);
                }
            }]
        }];

        //top toolbar contains a textfield which is used to filter store from input
        this.tbar = [{
            xtype: 'textfield',
            labelAlign: 'top',
            name: 'fullname',
            fieldLabel: 'Find Users by Name',
            emptyText: 'Search...',
            listeners: {
                change: function(field, newValue, oldValue){
                    //filter the store passed on textfield input. 
                    //If input is contained as a substing of store record fullname field, keep in store otherwise filter out. 
                    field.up('grid').getStore().filterBy(function(record){
                        var fullname = record.get('fullname').toLowerCase();
                        return (fullname.indexOf(newValue.toLowerCase()) != -1);
                    });
                }
            }
        }];
        
        this.callParent(arguments);
    }
});