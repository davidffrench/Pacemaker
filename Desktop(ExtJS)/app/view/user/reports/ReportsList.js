Ext.define('Pacemaker.view.user.reports.ReportsList', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Date',
        'Ext.grid.column.Number',
        'Ext.grid.column.Action'
    ],

    xtype: 'reportslist',
    hideHeaders: true,
    autoScroll: true,
    margin: 15,

    initComponent: function() {
        this.store = Ext.create('Pacemaker.store.metadata.ActivityTypes');

        this.columns = [{
            dataIndex: 'itemDesc',
            flex: 1
        }];
        
        this.callParent(arguments);
        //add an additional record to the store
        this.store.add({itemCd: 'All', itemDesc: 'All Activities'});
    },

    listeners: {
        viewready: function(grid){
            grid.getSelectionModel().select(grid.getStore().first());
        }
    }
});