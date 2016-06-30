var config = require('./../config');
var logger = require('./../logger');
var consul = require('consul');
var consulApiSettings = {
    host: config.consulApi.host,
    port: config.consulApi.port
};
var consulApi = consul(consulApiSettings);
var async = require('async');
var _ = require('lodash');

function getNodes(callback) {
    consulApi.catalog.node.list(function(err, data) {
        if (err) {
            return callback(err);
        }

        logger.info('Received nodes:', data);
        callback(null, data);
    });
}

function splitRetrieveServicesHealthChecks(services, callback) {
    var tasks = [];

    Object.keys(services).forEach(function(key) {
        var service = services[key];
        var serviceName = service.Service;

        function postponedTask(cb) {
            getServicesHealthChecks(serviceName, function(err, serviceHealthChecks) {
                if (err) {
                    return cb(err);
                }

                service.HealthChecks = serviceHealthChecks[0].Checks;
                cb(null, service);
            });
        }

        tasks.push(postponedTask);
    });

    async.parallel(tasks, callback);
}

function getServicesByNode(id, callback) {
    consulApi.catalog.node.services(id, function(err, data) {
        if (err) {
            return callback(err);
        }

        logger.info('Received node registered services', data);
        callback(null, data);
    });
}

function getNodeHealthChecks(id, callback) {
    consulApi.health.node(id, function(err, data) {
        if (err) {
            return callback(err);
        }

        logger.info('Received node health checks:', data);
        callback(null, data);
    });
}

function getServicesHealthChecks(serviceName, callback) {
    consulApi.health.service(serviceName, function(err, data) {
        if (err) {
            return callback(err);
        }

        logger.info('Received services health checks:', data);
        callback(null, data);
    });
}

function composeDataAboutServices(nodeId, callback) {
    async.waterfall([

        function(cb) {
            getServicesByNode(nodeId, cb);
        },

        function(data, cb) {
            splitRetrieveServicesHealthChecks(data.Services, cb);
        }

    ], callback);
}

function splitRetrieveNodes(list, callback) {
    async.map(list, function(node, eachCb) {
        var nodeId = node.Node;

        async.setImmediate(function() {
            async.parallel({

                Info: function(cb) {
                    cb(null, node);
                },

                Services: function(cb) {
                    composeDataAboutServices(nodeId, cb);
                },

                HealthChecks: function(cb) {
                    getNodeHealthChecks(nodeId, cb);
                }

            }, eachCb);
        });
    }, callback);
}

function getInfo(callback) {
    async.waterfall([

        getNodes,

        splitRetrieveNodes

    ], callback);
}

function adaptedDemoPrototype(data, cb) {
    var allAvailableServices = data[0].Services;

    var mysqlGroup = {
        name: 'MySQL',
        children: []
    };
    var mysqlServiceTypePattern = /mysql/;

    // TODO How to determine which replication related to which primary?
    var dataForChart = {
        name: 'chart',
        children: [
            mysqlGroup,
            {
                name: 'MongoDB MOCK',
                children: [{
                    name: 'mongod-fe3783fg',
                    size: 500
                }]
            }
        ]
    };

    _.forOwn(allAvailableServices, function(elem) {
        if (mysqlServiceTypePattern.test(elem.Service)) {
            mysqlGroup.children.push({
                name: elem.ID,
                size: 500
            });
        }
    });

    cb(null, dataForChart);
}

function getAdaptedConsulInfo(callback) {
    async.waterfall([

        getInfo,

        adaptedDemoPrototype

    ], callback);
}



module.exports = {
    getInfo: getInfo,
    getAdaptedConsulInfo: getAdaptedConsulInfo,
    getServicesHealthChecks: getServicesHealthChecks
};
