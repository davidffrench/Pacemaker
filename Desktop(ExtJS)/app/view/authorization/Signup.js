Ext.define("Pacemaker.view.authorization.Signup", {
    extend: 'Ext.container.Container',
    xtype: 'signup',
    requires: ['Ext.form.Panel','Ext.form.Label'],
    layout: {
        type: 'vbox',
        align: 'center'
    },
    padding: 10,

    items: [{
        xtype: 'panel',
        itemId: 'signupError',
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
            text: "Sign Up Failed"
        }]
    }, {
        xtype: 'form',
        border: false,
        itemId: 'signupForm',
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
                    if (e.getKey() == e.ENTER && txtFld.up('#signupForm').isValid()) {
                        var signupUrl = this.up('signup').down('#signup').signupUrl;
                        txtFld.up('signup').submitSignup(signupUrl);
                    }
                }
            }
        },
        items: [{
            xtype: 'textfield',
            name: 'fullname',
            fieldLabel: 'Full Name'
        }, {
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
            itemId: 'signup',
            text: 'Sign Up with Email',
            signupUrl: '/signup',
            formBind: true,
            margin: '5 0 0 0',
            width: 240,
            listeners: {
                click: function(btn){
                    btn.up('signup').submitSignup(btn.signupUrl);
                }
            }
        }, {
            xtype: 'label',
            text: 'or',
            margin: 20
        }, {
            xtype: 'button',
            itemId: 'facebooksignup',
            text: 'Sign Up with Facebook',
            signupUrl: '/auth/facebook',
            icon: 'resources/images/facebook.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('signup').submitSignup(btn.signupUrl);
                }
            }
        }, {
            xtype: 'button',
            itemId: 'googlesignup',
            text: 'Sign Up with Google',
            signupUrl: '/auth/google',
            icon: 'resources/images/google_plus.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('signup').submitSignup(btn.signupUrl);
                }
            }
        }, {
            xtype: 'button',
            itemId: 'twittersignup',
            text: 'Sign Up with Twitter',
            signupUrl: '/auth/twitter',
            icon: 'resources/images/twitter_1.png',
            margin: '5 0 5 0',
            width: 200,
            listeners: {
                click: function(btn){
                    btn.up('signup').submitSignup(btn.signupUrl);
                }
            }
        }]
    }],

    submitSignup: function(signupUrl){
        this.down('#signupError').hide();
        this.fireEvent('signupAttempt', this, this.down('#signupForm').getValues(), signupUrl);
    },

    resetAndClear: function(){
        this.down('#signupForm').getForm().reset();
    }
});
