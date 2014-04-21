Ext.define('Pacemaker.view.logActivity.NewActivity', {
    extend: 'Ext.form.Panel',
    requires: ['Ext.form.field.ComboBox'],
    
    xtype: 'newactivity',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    width: 400,
    margin: '25 0 0 0',
    // border: 1,
    title: 'Enter Activity Details',
    fieldDefaults: {
        margin: '10 0 10 0',
        allowBlank: false
    },
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
            labelWidth : 100,
            width : 280,
            emptyText : 'Select',
            forceSelection: true,
            
            store : 'metadata.ActivityTypes',

            queryMode: 'local',
            displayField : 'itemDesc',
            valueField : 'itemCd',
            // listeners: {
            //     change: function(combo, value) {
            //     }
            // }
        }, {
            xtype : 'textfield',
            itemId : 'location',
            name: 'location',
            fieldLabel : 'Location',
            labelWidth : 100,
            width : 280
        }, {
            xtype : 'textfield',
            itemId : 'distance',
            name: 'activityDistance',
            fieldLabel : 'Distance',
            labelWidth : 100,
            width : 280
        }];

        this.buttons = [{
            text: 'Reset',
            listeners: {
                click: function(btn) {
                    this.up('form').getForm().reset();
                }
            }
        }, {
            text: 'Save',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            listeners: {
                click: function(btn) {
                    this.up('newactivity').saveActivity();
                }
            }
        }];

        this.callParent(arguments);


    },

    saveActivity: function(){
        var form = this.getForm();
        if (form.isValid()) {
            this.fireEvent('saveActivity', this, this.getValues());
        }
    }
});