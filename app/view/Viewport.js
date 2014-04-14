Ext.define('Pacemaker.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['Ext.layout.container.Border',
               'Pacemaker.view.loginsignup.LoginSignup',
               'Pacemaker.view.AppHeader',
               'Ext.layout.container.Card'],

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
            xtype: 'loginsignup'
        },{
            xtype: 'container',
            itemId: 'appmain',
            items: [{
                
            }]
        }]
    }]
});