//var should = require('should');
var io = require('socket.io-client');
var expect = require('chai').expect;
var dockerService = require('./docker');

var socketURL = 'http://localhost:3000';
var options ={
    transports: ['websocket'],
    'force new connection': true
};
var firstContainerId;


describe("Chat Server",function(){

});

describe('get logs of first containter', function () {
    it('get docker containers info', function (done) {
        dockerService.getContainersInfo(function (err, result){
            expect(result).to.be.an('Array');
            firstContainerId = result[0].Id;
            console.log(firstContainerId);
            done();
        });
    });

    it('get first container logs by socket', function(done) {
        var socketClient = io.connect(socketURL, options);

        socketClient.on('connect', function(data) {

            socketClient.emit('logs:get', {
                id: firstContainerId,
                since: Date.now() / 1000 - (60 * 60 * 24) * 1000
            }, function(mess) {
                console.log('socket say: ' + mess);
            });

            socketClient.on('logs:push', function(data) {
                console.log(data);
                done();
            });
        });
    });
});
