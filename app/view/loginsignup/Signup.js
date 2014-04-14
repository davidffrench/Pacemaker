Ext.define("Pacemaker.view.loginsignup.Signup", {
    extend: 'Ext.container.Container',
    xtype: 'signup',
    requires: ['Ext.form.Panel','Ext.form.Label'],
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: 10,
    width: '100%',
    height: '100%',
    items: [{
        xtype: 'panel',
        itemId: 'signupError',
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        hidden: true,
        autoHeight: true,
        border: true,
        bodyStyle: 'border-width:1px;background-color: #FFDDDD;border-color:#FF0000',
        items: [{
            xtype: 'label',
            padding: 5,
            text: "Sign Up Failed"
        }]
    }, {
        xtype: 'form',
        border: false,
        itemId: 'signupForm',
        layout: {
            type: 'vbox'
        },
        fieldDefaults: {
            labelAlign: 'top',
            allowBlank: false
        },
        items: [{
            xtype: 'textfield',
            name: 'fullname',
            fieldLabel: 'Full Name'
        }, {
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password',
            listeners: {
                specialkey: function(txtFld, e){
                    if (e.getKey() == e.ENTER && txtFld.up('#signupForm').isValid()) {
                        txtFld.up('signup').submitSignup();
                    }
                }
            }
        }, {
            xtype: 'button',
            itemId: 'signup',
            text: 'Sign Up with Email',
            width: 100,
            formBind: true,
            listeners: {
                click: function(btn){
                    btn.up('signup').submitSignup();
                }
            }
        }]
    }],

    submitSignup: function(){
        this.down('#signupError').hide();
        this.fireEvent('signupAttempt', this, this.down('#signupForm').getValues());
    }
});
