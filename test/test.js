'use strict';

var ML = require('..');

describe('ML', function () {

    it('check main namespaces', function () {
        ML.should.have.properties([
            'Math',
            'Matrix',
            'Stat',
            'SL',
            'NN'
        ]);
    });

    it('check Math', function () {
        ML.Math.should.have.properties([
            'Distance',
            'Matrix'
        ]);
    });

    it('check Stat', function () {
        ML.Stat.should.have.properties([
            'array',
            'matrix'
        ]);
    });

    it('check SL', function () {
        ML.SL.should.have.properties([
            'SVM'
        ]);
    });

    it('check NN', function () {
        ML.NN.should.have.properties([
            'SOM'
        ]);
    });

});
