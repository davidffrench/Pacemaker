Ext.define('Pacemaker.store.Feed', {
    extend: 'Ext.data.Store',
    requires: [ 'Pacemaker.model.FeedItem'],

    model: 'Pacemaker.model.FeedItem',
    pageSize: 100
});