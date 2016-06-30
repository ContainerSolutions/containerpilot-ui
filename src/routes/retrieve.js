var Router = require('express').Router;
var retrieveHandler = require('./../handlers/retrieve');


var router = new Router();

router.get('/consul-info', retrieveHandler.getConsulInfo);
router.get('/consul-info/adapted', retrieveHandler.getAdaptedConsulInfo);
router.get('/servicesId', retrieveHandler.servicesId);
router.get('/groupContainers', retrieveHandler.groupContainers);
router.get('/consul-info/getHealthInfo/:serviceName', retrieveHandler.getHealthInfo);
router.get('/docker-info/getContainersDockerInfo', retrieveHandler.getContainersDockerInfo);

module.exports = router;
