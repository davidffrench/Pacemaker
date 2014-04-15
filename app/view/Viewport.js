Ext.define('Pacemaker.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.Card',
        'Pacemaker.view.AppHeader',
        'Pacemaker.view.authorization.AuthLayout'
    ],

    layout: {
        type: 'border'
    },

    items: [{
        region: 'north',
        xtype: 'appheader'
    },{
        region: 'center',
        xtype: 'panel',
        layout: 'card',
        itemId: 'appMainCard',
        items: [{
            xtype: 'authlayout'
        },{
            xtype: 'container',
            itemId: 'appmain',
            items: [{
                
            }]
        }]
    }]
});