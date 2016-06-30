'use strict';

var config = require('./../config');
var logger = require('./../logger');
var consulService = require('./consul');
var dockerService = require('./docker');
var async = require('async');
var _ = require('lodash');

function getGroupContainers(callback) {
    async.series({
        consulInfo             : consulService.getInfo,
        dockerContainersInfo: dockerService.getContainersInfo

    }, function (err, asyncResults) {

        if (err) {
            return callback(err);
        }

        callback(null, mapDockerGroupWithConsulServices(asyncResults))
    });
}

function mapDockerGroupWithConsulServices(containers) {
    var consulInfo = containers.consulInfo;
    var groupedDockerContainers = groupByProject(containers.dockerContainersInfo);
    var consulServicesArray = [];
    var result = [];
    var tempServices;
    var tempContainers;
    var id;

    for (var i = consulInfo.length - 1; i >= 0; i--) {
        if (consulInfo[i].Services && consulInfo[i].Services.length) {
            tempServices = consulInfo[i].Services;
            for (var j = tempServices.length - 1; j >= 0; j--) {
                id = tempServices[j].ID.split('-');

                consulServicesArray.push({
                    Id          : id[id.length - 1],
                    ConsulId    : tempServices[j].ID,
                    HealthChecks: tempServices[j].HealthChecks,
                    IsPrimary   : id.indexOf('primary') >= 0
                });
            }
        }
    }

    groupedDockerContainers.forEach(function (group) {
        group.approvedContainers = [];

        group.containers.forEach(function (container) {

            for (var j = consulServicesArray.length - 1; j >= 0; j--) {

                if (container.Id && container.Id.indexOf(consulServicesArray[j].Id) === 0) {
                    container.ConsulId = consulServicesArray[j].ConsulId;
                    container.HealthChecks = consulServicesArray[j].HealthChecks;
                    container.IsPrimary = consulServicesArray[j].IsPrimary;
                    group.Command = container.Command;

                    group.approvedContainers.push({
                        Id          : container.Id,
                        ConsulId    : consulServicesArray[j].ConsulId,
                        HealthChecks: consulServicesArray[j].HealthChecks,
                        IsPrimary   : consulServicesArray[j].IsPrimary
                    });
                    j = 0;
                }
            }
        });
    });

    groupedDockerContainers.forEach(function (group) {
        if (group.Command) {
            result.push({
                project   : group.project,
                name      : group.name,
                Command   : group.Command,
                containers: group.approvedContainers
            });
        }
    });

    return result;
}

function groupByProject(containers) {
    var result = [];
    var flag;
    var containerService;
    var containerProject;

    for (var i = 0; i < containers.length; i++) {
        containerService = containers[i].Labels['com.docker.compose.service'];
        containerProject = containers[i].Labels['com.docker.compose.project'];
        flag = true;

        for (var j = 0; j < result.length; j++) {
            if ((result[j].project === containerProject) && (result[j].name === containerService)) {
                result[j].containers.push(containers[i]);
                flag = false;
            }
        }

        if (flag) {
            result.push({
                project   : containerProject,
                name      : containerService,
                containers: [containers[i]]
            })
        }
    }

    return result;
}

module.exports = {
    groupByProject                  : groupByProject,
    getGroupContainers              : getGroupContainers,
    mapDockerGroupWithConsulServices: mapDockerGroupWithConsulServices
};