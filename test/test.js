'use strict';

var ML = require('..');

describe('ML', function () {

    it('check main namespaces', function () {
        ML.should.have.properties([
            'Math',
            'Matrix',
            'Stat',
            'SL',
            'NN',
            'ArrayUtils',
            'Decomposition'
        ]);
    });

    it('check Math', function () {
        ML.Math.should.have.properties([
            'Distance',
            'Matrix',
            'SG'
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
            'SVM',
            'KNN',
            'NaiveBayes',
            'PLS'
        ]);
    });

    it('check Clust', function () {
        ML.Clust.should.have.properties([
            'kmeans',
            'hclust'
        ]);
    });

    it('check NN', function () {
        ML.NN.should.have.properties([
            'SOM',
            'FNN'
        ]);
    });

    it('check ArrayUtils', function () {
        ML.AU.should.have.properties([
            'coordArrayToPoints',
            'coordArrayToCoordMatrix',
            'coordMatrixToCoordArray',
            'coordMatrixToPoints',
            'pointsToCoordArray',
            'pointsToCoordMatrix',
            'applyDotProduct',
            'getEquallySpacedData',
            'SNV'
        ]);
    });

    it('check Decomposition', function () {
        ML.Decomposition.should.have.properties([
            'PCA'
        ]);
    });
});
