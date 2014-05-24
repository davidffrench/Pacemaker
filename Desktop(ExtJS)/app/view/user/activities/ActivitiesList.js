Ext.define('Pacemaker.view.user.activities.ActivitiesList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action'
    ],

    xtype: 'activitieslist',
    store: 'Activities',
    hideHeaders: true,
    autoScroll: true,

    initComponent: function() {
        this.columns = [{
            xtype: 'datecolumn',
            dataIndex: 'activityDate',
            format:'m/d',
            flex: 0.55
        }, {
            dataIndex: 'activityType',
            flex: 0.75
        }, {
            xtype: 'numbercolumn',
            dataIndex: 'distance',
            format:'0.00',
            flex: 0.75,
            renderer: function(value){
                return value + ' km.';
            }
        }, {
            xtype:'actioncolumn',
            width:30,
            items: [{
                icon: 'resources/images/delete.png',
                tooltip: 'Delete',
                //on click of delete activity icon
                handler: function(gridView, rowIndex, colIndex) {
                    //fire custom event so controller can send ajax call to add delete activity
                    var rec = gridView.getStore().getAt(rowIndex),
                        activitiesGrid = gridView.up('activitieslist');

                    activitiesGrid.fireEvent('deleteActivity', activitiesGrid, gridView.getStore(), rec);
                }
            }]
        }];
        
        this.callParent(arguments);
    }
});