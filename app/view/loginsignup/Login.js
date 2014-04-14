Ext.define("Pacemaker.view.loginsignup.Login", {
    extend: 'Ext.container.Container',
    xtype: 'login',
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
		itemId: 'loginError',
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
            text: "Login Failed. Either you don't have access or your email/password is invalid."
        }]
    }, {
        xtype: 'form',
        border: false,
        itemId: 'loginForm',
        layout: {
            type: 'vbox'
        },
        fieldDefaults: {
            labelAlign: 'top',
            allowBlank: false
        },
        items: [{
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
                    if (e.getKey() == e.ENTER && txtFld.up('#loginForm').isValid()) {
                        txtFld.up('login').submitLogin();
                    }
                }
            }
        }, {
            xtype: 'button',
            itemId: 'login',
            text: 'Log In',
            width: 100,
            formBind: true,
            margin: '5 0 0 0',
            listeners: {
                click: function(btn){
                    btn.up('login').submitLogin();
                }
            }
        }]
    }],

    submitLogin: function(){
        this.down('#loginError').hide();
        this.fireEvent('loginAttempt', this, this.down('#loginForm').getValues());
    }
});
