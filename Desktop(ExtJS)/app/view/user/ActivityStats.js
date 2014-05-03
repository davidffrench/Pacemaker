Ext.define('Pacemaker.view.user.ActivityStats', {
    extend: 'Ext.form.Panel',
    requires: [
    ],

    xtype: 'activitystats',
    layout: 'hbox',

    fieldDefaults: {
        // margin: '10 0 10 0',
        labelWidth : 100,
        width : 120,
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
                itemId : 'distance',
                name: 'distance',
                fieldLabel: 'KM',
                labelAlign: 'top',
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
                itemId : 'duration',
                name: 'duration',
                fieldLabel: 'Duration',
                labelAlign: 'top',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }, {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            margin: '0 0 0 10',
            items: [{
                xtype: 'image',
                src: 'resources/images/location_pin.png',
            }, {
                xtype : 'displayfield',
                itemId : 'location',
                name: 'location',
                fieldLabel: 'Location',
                labelAlign: 'top',
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
                itemId : 'calories',
                name: 'calories',
                fieldLabel: 'Calories Burned',
                labelAlign: 'top',
                margin: '0 0 0 10',
                fieldStyle: 'font-weight:bold;'
            }]
        }];
        this.callParent(arguments);
    }
});