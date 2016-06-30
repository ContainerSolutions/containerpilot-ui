var dockerService = require('./docker');
var logger = require('./../logger');
var fs = require('fs');

module.exports = function (server) {
    var io = require('socket.io')(server);
    io.on('connection', function (socket) {

        socket.on('logs:get', function(data, cb) {
            var containerId = data.id;
            var logsSince = data.since;

            logger.info('Logs are requested for container ', containerId, ' since ', logsSince);

            dockerService.getContainerLogsSince(containerId, logsSince, function(err, buffer) {
                if (err) {
                    logger.info('Error has occurred', err);

                    return;
                }

                var logs = buffer.toString('utf-8');

                if (typeof(cb) === 'function') {
                    cb('i am alive!');
                }

                console.log(logs);
                logs = logs.replace(/�/g,'');
                logs = logs.replace(/2016/g,'<br /> <strong>#</strong>2016');

                socket.emit('logs:push', {
                    data: logs
                });
            });
        });

    });
};