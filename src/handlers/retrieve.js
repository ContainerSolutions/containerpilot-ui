'use strict';

var consulService = require('./../services/consul');
var dockerService = require('./../services/docker');
//var groupBy = require('./../services/groupBy');
var groupByService = require('./../services/groupBy');
var _ = require('lodash');

function getConsulInfo(req, res, next) {
    consulService.getInfo(function (err, data) {
        if (err) {
            return next(err);
        }

        res.status(200).send(data);
    });
}

function getHealthInfo(req, res, next) {
    var serviceName = req.params.serviceName;

    consulService.getServicesHealthChecks(serviceName, function (err, data) {
        if (err) {
            return next(err);
        }

        res.status(200).send(data);
    });
}

function getContainersDockerInfo(req, res, next) {
    dockerService.getContainersInfo(function (err, data) {
        if (err) {
            return next(err);
        }

        res.status(200).send(data);
    });
}

function getAdaptedConsulInfo(req, res, next) {
    consulService.getAdaptedConsulInfo(function (err, data) {
        if (err) {
            return next(err);
        }

        res.status(200).send(data);
    });
}

function getContainers(req, res, next) {
    dockerService.getContainers(function (err, data) {
        if (err) {
            return next(err);
        }

        res.status(200).send(data);
    });
}

function servicesId(req, res, next) {
    consulService.getInfo(function (err, data) {
        var result = [];
        var tempArray;
        var id;

        if (err) {
            return next(err);
        }

        for (var i = data.length - 1; i >= 0; i--) {
            if (data[i].Services && data[i].Services.length) {
                tempArray = data[i].Services;
                for (var j = tempArray.length - 1; j >= 0; j--) {
                    id = tempArray[j].ID.split('-');

                    result.push({
                        id       : id[id.length - 1],
                        isPrimary: id.indexOf('primary') >= 0
                    });
                }
            }
        }

        res.status(200).send(result);
    });
}

function groupContainers(req, res, next) {
    groupByService.getGroupContainers(function(err, data) {
        if (err) {
            return next(err);
        }

        var groupedDataByServiceName = _.groupBy(data, 'name');

        res.status(200).send(groupedDataByServiceName);
    });
}

module.exports = {
    getConsulInfo          : getConsulInfo,
    getAdaptedConsulInfo   : getAdaptedConsulInfo,
    getHealthInfo          : getHealthInfo,
    getContainersDockerInfo: getContainersDockerInfo,
    groupContainers        : groupContainers,
    servicesId             : servicesId
};
