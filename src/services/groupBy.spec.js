var expect = require('chai').expect;
var groupBy = require('./groupBy');

describe('grouping test', function () {
    it('must be grouping by project and service', function (done) {
        var result = groupBy.groupByProject(require('./../mocks/inputGroupByProject.json'));

        expect(result).to.be.an('Array')
            .and.be.deep.eql(require('./../mocks/expectGroupByProject.json'));

        done();
    });

    it('must be grouping by project and service from docker and mapping with consul', function (done) {
        groupBy.getGroupContainers(function (err, result) {
            expect(result).to.be.an('Array');

            done();
        });
    });

    it('must be mapped consul service list and docker group', function (done) {
        var result = groupBy.mapDockerGroupWithConsulServices({
            consulInfo          : require('./../mocks/inputConsulInfo.json'),
            dockerContainersInfo: require('./../mocks/inputGroupByProject.json')
        });

        expect(result).to.be.an('Array')
        .and.be.deep.eql(require('./../mocks/expectMapDockerAndConsulServices.json'));

        done();
    });
});
