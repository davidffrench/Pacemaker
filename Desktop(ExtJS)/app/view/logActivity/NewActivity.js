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
    // width: 800,
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
            xtype: 'activitymap'
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
    }
});