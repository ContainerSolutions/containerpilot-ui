var config = {};
var logger = require('./logger');

config.port = process.env.PORT || 3000;
config.logLevel = process.env.LOG_LEVEL || 'info';
config.env = process.env.NODE_ENV || 'test';

logger.level = config.logLevel;
//console.log( 'process.env.CONSUL_API_HOST: ',  process.env.CONSUL_API_HOST,' process.env.CONSUL_API_PORT: ', process.env.CONSUL_API_PORT);

// Consul API configurations
var consulApi = {
    host: process.env.CONSUL_API_HOST || '172.17.0.3',
    port: process.env.CONSUL_API_PORT || '8500'
};

consulApi.url = consulApi.host + ':' + consulApi.port;
config.consulApi = consulApi;

// Docker remote API configurations
config.dockerRemoteApi = {
    host: process.env.DOCKER_REMOTE_API_HOST || '/var/run/docker.sock'
};

module.exports = config;
