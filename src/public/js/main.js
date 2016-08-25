"use strict";

var App = {};

require.config({
    paths: {
        d3                : './libs/d3/d3.min',
        io                : './libs/socket.io-client/socket.io',
        hash              : './libs/object-hash/dist/object_hash',
        jQuery            : './libs/jquery/dist/jquery.min',
        'mCustomScrollbar': './libs/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar'
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
        'mCustomScrollbar': {
            deps: ['jQuery']
        }
    }
});

require(['app'], function (app) {
    app.initialize();
});

