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
            defaults: {
                hideLabel: true
            },
            layout: 'vbox',
            items: [{
                xtype: 'displayfield',
                value: 'Km',
                isFormField: false
            }, {
                xtype : 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    src: 'resources/images/distance.png',
                }, {
                    xtype : 'displayfield',
                    itemId : 'distance',
                    name: 'distance',
                    margin: '10 0 0 5',
                    fieldStyle: 'font-weight:bold;'
                }]
            }]
        }, {
            xtype: 'fieldcontainer',
            defaults: {
                hideLabel: true
            },
            layout: 'vbox',
            items: [{
                xtype: 'displayfield',
                value: 'Duration',
                isFormField: false
            }, {
                xtype : 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    src: 'resources/images/clock_select_remain.png',
                }, {
                    xtype : 'displayfield',
                    itemId : 'duration',
                    name: 'duration',
                    margin: '10 0 0 5',
                    fieldStyle: 'font-weight:bold;'
                }]
            }]
        }, {
            xtype: 'fieldcontainer',
            defaults: {
                hideLabel: true
            },
            layout: 'vbox',
            items: [{
                xtype: 'displayfield',
                value: 'Location',
                isFormField: false
            }, {
                xtype : 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    src: 'resources/images/location_pin.png',
                }, {
                    xtype : 'displayfield',
                    itemId : 'location',
                    name: 'location',
                    margin: '10 0 0 5',
                    fieldStyle: 'font-weight:bold;'
                }]
            }]
        }, {
            xtype: 'fieldcontainer',
            defaults: {
                hideLabel: true
            },
            layout: 'vbox',
            items: [{
                xtype: 'displayfield',
                value: 'Calories Burned',
                isFormField: false
            }, {
                xtype : 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'image',
                    src: 'resources/images/fire.png',
                }, {
                    xtype : 'displayfield',
                    itemId : 'calories',
                    name: 'calories',
                    margin: '10 0 0 5',
                    fieldStyle: 'font-weight:bold;'
                }]
            }]
        }];
        this.callParent(arguments);
    }
});