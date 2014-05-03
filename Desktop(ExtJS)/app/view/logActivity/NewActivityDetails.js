Ext.define('Pacemaker.view.logActivity.NewActivityDetails', {
    extend: 'Ext.container.Container',
    requires: [
        'Ext.form.field.ComboBox',
        'Ext.form.FieldContainer',
        'Ext.form.field.Time',
        'Ext.form.field.Date'
    ],
    
    xtype: 'newactivitydetails',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    width: 300,
    margin: 10,
    // margin: '25 0 0 0',
    // border: 1,
    defaults: {
        listeners: {
            specialkey: function(txtFld, e){
                if (e.getKey() == e.ENTER && txtFld.up('form').isValid()) {
                    txtFld.up('newactivity').saveActivity();
                }
            }
        }
    },

    initComponent: function() {
        this.items = [{
            xtype : 'combobox',
            itemId : 'typeCombo',
            name: 'activityType',
            fieldLabel : 'Activity Type',
            emptyText : 'Select',
            forceSelection: true,
            
            store : 'metadata.ActivityTypes',

            queryMode: 'local',
            displayField : 'itemDesc',
            valueField : 'itemCd',
        }, {
            xtype : 'textfield',
            itemId : 'location',
            name: 'location',
            fieldLabel : 'Location',
        }, {
            xtype : 'numberfield',
            itemId : 'distance',
            name: 'distance',
            fieldLabel : 'Distance(km)',
            minValue: 0,
        }, {
            xtype : 'datefield',
            itemId : 'activityDate',
            name: 'activityDate',
            fieldLabel : 'Date of Activity',
            maxValue: new Date(),
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Duration',
            name: 'duration',
            combineErrors: false,
            defaults: {
                hideLabel: true
            },
            layout: 'hbox',
            items: [{
                name : 'durationHours',
                xtype: 'numberfield',
                minValue: 0,
                value: 0,
                width: 50,
                margin: 0,
                allowBlank: false
            }, {
                xtype: 'displayfield',
                value: 'hours',
                width: 40,
                margin: 0,
                isFormField: false
            }, {
                name : 'durationMinutes',
                xtype: 'numberfield',
                minValue: 0,
                value: 0,
                width: 50,
                margin: 0,
                allowBlank: false
            }, {
                xtype: 'displayfield',
                value: 'mins',
                width: 40,
                margin: 0,
                isFormField: false
            }]
        }, {
            xtype: 'timefield',
            name: 'startTime',
            fieldLabel: 'Start Time',
            increment: 1,
            value: new Date()
        }, {
            xtype : 'numberfield',
            itemId : 'calories',
            name: 'calories',
            fieldLabel : 'Calories',
            minValue: 0,
        }];
        this.callParent(arguments);


    }
});