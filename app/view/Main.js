Ext.define('Pacemaker.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'panel',
        title: 'west',
        width: 150
    },
    // {
    //     region: 'center',
    //     xtype: 'form',
    // }
    {
        region: 'center',
        xtype: 'grid',
        store: 'Users',
        columns: [{
            text: 'First Name',
            dataIndex: 'firstname',
            flex: 1
        },{
            text: 'Last Name',
            dataIndex: 'lastname',
            flex: 1
        }]
    }
    ]
});