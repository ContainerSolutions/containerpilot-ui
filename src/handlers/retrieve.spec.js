var logger = require('./../logger');
var api = require('supertest')(require('./../server'));
var expect = require('chai').expect;
var _ = require('lodash');

describe('retrieve handler', function() {
    it('should groups union by service name', function(done) {
        api.get('/groupContainers')
            .send()
            .expect(200)
            .end(function(err, res) {
                if (err) {
                    return done(err);
                }

                var data = res.body;

                expect(data).to.be.an('Object')
                    .and.property('mysql')
                    .and.be.an('Array')
                    .that.have.length.at.least(1);

                var firstContainer = _.first(data.mysql);

                expect(firstContainer)
                    .to.be.an('Object')
                    .and.have.all.keys(['project', 'name', 'Command', 'containers']);
                expect(firstContainer.containers).to.have.property('length')
                    .and.be.at.least(1);

                logger.data('should be ok', data);
                done();
            });
    });
});
