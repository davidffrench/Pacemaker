Ext.define('Pacemaker.view.user.dashboard.DashboardStats', {
    extend: 'Ext.form.Panel',
    requires: [
    ],

    xtype: 'dashboardstats',
    layout: 'hbox',

    fieldDefaults: {
        labelWidth : 100,
        width : 150,
        labelAlign: 'top'
    },

    initComponent: function() {
        this.items = [{
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '0 0 0 10',
            items: [{
                xtype: 'image',
                src: 'resources/images/distance.png',
            }, {
                xtype : 'displayfield',
                itemId : 'totaldistance',
                name: 'totalDistance',
                fieldLabel: 'Total KM',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '0 0 0 10',
            items: [{
                xtype: 'image',
                src: 'resources/images/shoe.png',
            }, {
                xtype : 'displayfield',
                itemId : 'totalactivities',
                name: 'totalActivities',
                fieldLabel: 'Total Activities',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '0 0 0 10',
            items: [{
                xtype: 'image',
                src: 'resources/images/fire.png',
            }, {
                xtype : 'displayfield',
                itemId : 'totalcalories',
                name: 'totalCalories',
                fieldLabel: 'Total Calories',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }];
        this.callParent(arguments);
    },

    resetAndClear: function(){
        this.getForm().reset();
    }
});