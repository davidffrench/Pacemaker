/**
 * Reports list view
 */
Ext.define('Pacemaker.view.user.reports.ReportsList', {
    extend: 'Ext.grid.Panel',
    requires: [
    ],

    xtype: 'reportslist',
    hideHeaders: true,
    autoScroll: true,
    margin: 15,

    initComponent: function() {
        //Instansiate a new ActivityTypes Store. 
        // This is because we need to add an additional record and don't want it to show where this store is used elsewhere
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
            //when the grid view is ready, select the first row. 
            // This will trigger the reports data call to be made through a selectionchange listener in the User controller
            grid.getSelectionModel().select(grid.getStore().first());
        }
    }
});