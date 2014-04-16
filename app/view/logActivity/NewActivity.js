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
    items: [{
        xtype : 'combobox',
        itemId : 'typeCombo',
        fieldLabel : 'Activity Type',
        labelWidth : 100,
        width : 280,
        emptyText : 'Select',

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
        fieldLabel : 'Location',
        labelWidth : 100,
        width : 280
    }, {
        xtype : 'textfield',
        itemId : 'distance',
        fieldLabel : 'Distance',
        labelWidth : 100,
        width : 280
    }],
    buttons: [{
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
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    
                }
            }
        }
    }]
});