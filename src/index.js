'use strict';

// Root packages
exports.ArrayUtils = exports.AU = require('ml-array-utils');
exports.BitArray = require('ml-bit-array');
exports.Matrix = require('ml-matrix');


var Math = exports.Math = {};

var distance = require('ml-distance')
Math.Distance = distance.distance;
Math.Similarity = distance.similarity;
Math.SG = require('ml-savitzky-golay');


var Stat = exports.Stat = {};

Stat.array = require('ml-stat/array');
Stat.matrix = require('ml-stat/matrix');
Stat.PCA = require('ml-pca');


exports.Regression = require('ml-regression');


// Random number generation
var RNG = exports.RNG = {};
RNG.XSadd = require('ml-xsadd');


// Supervised learning
var SL = exports.SL = {};

SL.SVM = require('ml-svm');
SL.KNN = require('ml-knn');
SL.NaiveBayes = require('ml-naivebayes');
SL.PLS = require('ml-pls');


// Clustering
var Clust = exports.Clust = {};

Clust.kmeans = require('ml-kmeans');
Clust.hclust = require('ml-hclust');


// Neural networks
var NN = exports.NN = exports.nn = {};

NN.SOM = require('ml-som');
NN.FNN = require('ml-fnn');
