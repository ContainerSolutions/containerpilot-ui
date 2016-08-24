var logger = require('./../logger');
var api = require('supertest')(require('./../server'));
var service = require('./consul');
var expect = require('chai').expect;
var _ = require('lodash');

describe('consul service', function() {
    function assertMethodOutput(err, data) {
        if (err) {
            return this.done(err);
        }
        logger.data('consul service test received data', data);

        var healthCheckProps = ['Node', 'CheckID', 'Name', 'Status', 'Notes', 'Output', 'ServiceID', 'ServiceName'];

        expect(data).to.be.an('Array')
            .and.have.length.at.least(1);

        var sampleNode = _.sample(data);
        expect(sampleNode).to.be.an('Object')
            .and.have.all.keys(['Info', 'Services', 'HealthChecks']);
        expect(sampleNode.Info).to.be.an('Object')
            .and.have.all.keys(['Node', 'Address']);
        expect(sampleNode.HealthChecks).to.be.an('Array')
            .and.have.length.at.least(1);
        expect(sampleNode.Services).to.be.an('Array')
            .and.have.length.at.least(1);

        var sampleNodeHealthCheck = _.sample(sampleNode.HealthChecks);
        expect(sampleNodeHealthCheck).to.be.an('Object')
            .and.have.all.keys(healthCheckProps);

        var sampleServiceInNode = _.sample(sampleNode.Services);
        expect(sampleServiceInNode).to.be.an('Object')
            .and.have.all.keys(['ID', 'Service', 'Tags', 'Address', 'Port', 'HealthChecks']);

        var sampleHealthCheckFromSampleServiceInNode = _.sample(sampleServiceInNode.HealthChecks);
        expect(sampleHealthCheckFromSampleServiceInNode).to.be.an('Object')
            .and.have.all.keys(healthCheckProps);
        this.done();
    }

    it('should retrieve info about node and his services with health checks for them', function(done) {
        service.getInfo(assertMethodOutput.bind({
            done: done
        }));
    });

    it('should retrieve same info etc... from http route', function(done) {
        api.get('/consul-info')
            .send()
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }
                var data = res.body;

                assertMethodOutput.apply({
                    done: done
                }, [err, data]);
            });
    });

    it('should retrieve adapted info from http route', function(done) {
        api.get('/consul-info/adapted')
            .send()
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                done();
            });
    });
});
