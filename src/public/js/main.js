"use strict";

require.config({
    paths: {
        'd3'                : './libs/d3/d3.min',
        'io'                : './libs/socket.io-client/socket.io',
        'hash'              : './libs/object-hash/dist/object_hash',
        mCustomScrollbar     : './libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min',
        'jQuery'            : './libs/jquery/dist/jquery.min'
    },
    shim : {
        'jQuery'          : {
            exports: 'jQuery'
        },
        'hash'            : {
            exports: 'hash'
        },
        'd3'              : {
            exports: 'd3'
        },
        'io'              : {
            exports: 'io'
        },

        'app': ['jQuery', 'hash', 'd3', 'io']
    }
});

require(['app'], function (app) {
    app.initialize();
});

