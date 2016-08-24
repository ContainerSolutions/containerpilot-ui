var config = require('./../config');
var docker = require('docker-remote-api');
var dockerApiSettings = {
    host: config.dockerRemoteApi.host
};
var dockerRemoteApi = docker(dockerApiSettings);

// TODO write less do more
function retrieve() {
    return dockerRemoteApi;
}

function getContainersInfo(callback) {
    dockerRemoteApi.get('/containers/json', {json: true}, callback);
}

function getContainerLogsSince(id, since, callback) {
    var url = '/containers/' + id + '/logs';
    var options = {
        qs: {
            stderr: 1,
            stdout: 1,
            follow: false,
            // TODO should be defined with env var
            tail: 10,
            since: since
        },
        buffer: true
    };

    dockerRemoteApi.get(url, options, callback);
}

module.exports = {
    retrieve: retrieve,
    getContainersInfo: getContainersInfo,
    getContainerLogsSince: getContainerLogsSince
};
