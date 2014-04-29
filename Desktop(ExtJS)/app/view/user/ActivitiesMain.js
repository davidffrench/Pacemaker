Ext.define('Pacemaker.view.user.ActivitiesMain', {
    extend: 'Ext.container.Container',
    requires: [
        'Pacemaker.view.user.Activities'
    ],

    xtype: 'activitiesmain',
    // layout: {
    //     type: 'hbox'
    // },

    items: [{
        xtype: 'activities'
    }]
});