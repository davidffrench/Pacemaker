Ext.define('Pacemaker.view.logActivity.NewActivity', {
    extend: 'Ext.form.Panel',
    requires: [
        'Pacemaker.view.logActivity.NewActivityDetails',
        'Pacemaker.view.general.ActivityMap'
    ],
    
    xtype: 'newactivity',
    layout: {
        type: 'hbox',
        align: 'center'
    },
    title: 'Enter Activity Details',
    padding: 10,

    fieldDefaults: {
        margin: '10 0 10 0',
        allowBlank: false,
        labelWidth : 100,
        width : 280
    },

    initComponent: function() {
        this.items = [{
            xtype: 'newactivitydetails'
        }, {
            xtype: 'activitymap',
            width: 500,
            height: 500
        }];

        this.buttons = [{
            text: 'Reset',
            listeners: {
                click: function(btn) {
                    btn.up('form').getForm().reset();
                    btn.up('form').down('activitymap').setPath();
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
            var submitValues = this.getValues(false, false, false, true);
            submitValues.route = this.down('activitymap').path.getArray();

            this.fireEvent('saveActivity', this, submitValues);
        }
    }
});