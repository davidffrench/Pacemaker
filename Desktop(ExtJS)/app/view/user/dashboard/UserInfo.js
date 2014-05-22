Ext.define('Pacemaker.view.user.dashboard.UserInfo', {
    extend: 'Ext.form.Panel',
    requires: [
    ],

    xtype: 'userinfo',
    margin: 10,

    initComponent: function() {
        this.items = [{
            xtype: 'displayfield',
            name: 'fullname',
            fieldStyle: {
                'font-size': '28px',
                'color': '#666'
            },
            margin: '10 0 20 0'
        }, {
            xtype: 'displayfield',
            fieldLabel: 'Email',
            name: 'email',
            labelWidth : 50
        }];
        
        this.callParent(arguments);
    }
});