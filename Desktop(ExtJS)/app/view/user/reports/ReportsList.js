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
    }
});