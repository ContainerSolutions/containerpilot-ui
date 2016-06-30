var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('./logger');
var config = require('./config');
var packageJson = require('./../package.json');
var routes = require('./routes');
var path = require('path');
var http = require('http');
var app = express();
var server;

app.use(methodOverride());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/info', function(req, res) {
    res.status(200).send({
        packageName: packageJson.name
    });
});

Object.keys(routes).forEach(function(name) {
    app.use(routes[name]);
});

app.use(function(req, res, next) {
    var err = new Error('Not found');

    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500).send({error: err});
});

//app.listen(config.port);

logger.info('Server started with configurations', config);

server = http.createServer(app).listen(config.port);

require('./services/logs')(server);

module.exports = app;
