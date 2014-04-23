Ext.define("Pacemaker.view.authorization.Login", {
    extend: 'Ext.container.Container',
    xtype: 'login',
    requires: ['Ext.form.Panel','Ext.form.Label'],
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: 10,

    items: [{
        xtype: 'panel',
		itemId: 'loginError',
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        hidden: true,
        autoHeight: true,
        border: false,
        bodyStyle: 'border-width:1px;background-color: #FFDDDD;border-color:#FF0000',
        items: [{
            xtype: 'label',
			padding: 5,
            text: "Login Failed. Either you don't have access or your email/password is invalid."
        }]
    }, {
        xtype: 'form',
        // border: false,
        itemId: 'loginForm',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        fieldDefaults: {
            labelAlign: 'top',
            allowBlank: false,
            width: 240
        },
        defaults: {
            listeners: {
                specialkey: function(txtFld, e){
                    if (e.getKey() == e.ENTER && txtFld.up('#loginForm').isValid()) {
                        var loginUrl = this.up('login').down('#login').loginUrl;
                        txtFld.up('login').submitLogin(loginUrl);
                    }
                }
            }
        },
        items: [{
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email',
            // inputType: 'email',
            vtype: 'email'
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
            fieldLabel: 'Password'
        }, {
            xtype: 'button',
            itemId: 'login',
            text: 'Log In',
            loginUrl: '/login',
            formBind: true,
            margin: '5 0 0 0',
            width: 240,
            listeners: {
                click: function(btn){
                    btn.up('login').submitLogin(btn.loginUrl);
                }
            }
        }, {
            xtype: 'label',
            text: 'or',
            margin: 20
        }, {
            xtype: 'button',
            itemId: 'facebooklogin',
            text: 'Log In with Facebook',
            loginUrl: '/auth/facebook',
            icon: 'resources/images/facebook.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('login').submitLogin(btn.loginUrl);
                }
            }
        }, {
            xtype: 'button',
            itemId: 'googlelogin',
            text: 'Log In with Google',
            loginUrl: '/auth/google',
            icon: 'resources/images/google_plus.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('login').submitLogin(btn.loginUrl);
                }
            }
        }, {
            xtype: 'button',
            itemId: 'twitterlogin',
            text: 'Log In with Twitter',
            loginUrl: '/auth/twitter',
            icon: 'resources/images/twitter_1.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('login').submitLogin(btn.loginUrl);
                }
            }
        }]
    }],

    submitLogin: function(loginUrl){
        this.down('#loginError').hide();
        this.fireEvent('loginAttempt', this, this.down('#loginForm').getValues(), loginUrl);
    }
});
