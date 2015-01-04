/**
 * Reports totals view
 */
Ext.define('Pacemaker.view.user.reports.ReportsTotals', {
    extend: 'Ext.form.Panel',
    requires: [
    ],

    xtype: 'reportstotals',
    layout: 'hbox',

    //field properties applied to all fields in this form
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
                fieldLabel: 'KM',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '0 0 0 10',
            items: [{
                xtype: 'image',
                src: 'resources/images/clock_select_remain.png',
            }, {
                xtype : 'displayfield',
                itemId : 'totalduration',
                name: 'totalDuration',
                fieldLabel: 'Duration',
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
                fieldLabel: 'Calories Burned',
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