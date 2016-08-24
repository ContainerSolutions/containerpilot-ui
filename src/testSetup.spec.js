'use strict';

var logger = require('winston');
var sinon = require('sinon');
var chai = require('chai');
var sinonChai = require('sinon-chai');
var nock = require('nock');
var api = require('supertest')(require('./server'));
var packageJson = require('./../package.json');
var expect = chai.expect;

before(function() {
    chai.use(sinonChai);

    logger.remove(logger.transports.Console);

    sinon.stub.returnsWithResolve = function(data) {
        return this.returns(Promise.resolve(data));
    };

    sinon.stub.returnsWithReject = function(err) {
        return this.returns(Promise.reject(err));
    };
});

beforeEach(function() {
    this.sandbox = sinon.sandbox.create();
});

afterEach(function() {
    this.sandbox.restore();
    nock.cleanAll();
});

describe('server successfully started', function() {
    it('should returns package name', function(done) {
        api.get('/info')
            .send()
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                var body = res.body;

                expect(body).to.be.an('Object')
                    .and.have.property('packageName')
                    .and.be.equals(packageJson.name);
                done();
            });
    });

    it('should returns not found', function(done) {
        api.get('/undef/route')
            .send()
            .expect(404)
            .end(done);
    });
});
