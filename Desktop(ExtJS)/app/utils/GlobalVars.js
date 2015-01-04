/**
 * Global Variables singleton
 */
Ext.define('Pacemaker.utils.GlobalVars', {
    singleton: true,

    serverUrl: 'http://localhost:3000',
    serverApiUrl: 'http://localhost:3000/api',

    userId: null,

    apiToken: null,

    socket: null
});