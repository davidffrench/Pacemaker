Ext.define('Pacemaker.view.user.Activities', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action'
    ],

    xtype: 'activities',
    store: 'Activities',
    hideHeaders: true,
    autoScroll: true,
    // layout: 'fit',

    // features: [{
    //     ftype: 'grouping',
    //     groupHeaderTpl: '{activityDate} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
    //     hideGroupedHeader: true,
    //     startCollapsed: true,
    //     id: 'dateGrouping'
    // }],

    initComponent: function() {
        this.columns = [{
            xtype: 'datecolumn',
            dataIndex: 'activityDate',
            format:'m/d',
            flex: 0.75
        }, {
            dataIndex: 'activityType',
            flex: 1
        }, {
            xtype: 'numbercolumn',
            dataIndex: 'distance',
            format:'0.00',
            flex: 0.65,
            renderer: function(value){
                return value + ' km.';
            }
        }, {
            xtype:'actioncolumn',
            width:30,
            items: [{
                icon: 'resources/images/delete.png',
                tooltip: 'Delete',
                handler: function(gridView, rowIndex, colIndex) {
                    var rec = gridView.getStore().getAt(rowIndex),
                        activitiesGrid = gridView.up('activities');

                    activitiesGrid.fireEvent('deleteActivity', activitiesGrid, gridView.getStore(), rec);
                }
            }]
        }];
        
        this.callParent(arguments);
    }
});