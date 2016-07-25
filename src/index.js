'use strict';

// Root packages
exports.ArrayUtils = exports.AU = require('ml-array-utils');
exports.BitArray = require('ml-bit-array');
exports.HashTable = require('ml-hash-table');
exports.Matrix = require('ml-matrix');
exports.PadArray = require('ml-pad-array');
exports.Regression = require('ml-regression');


// Math packages
var Math = exports.Math = {};

var distance = require('ml-distance');
Math.Distance = distance.distance;
Math.Similarity = distance.similarity;
Math.SG = require('ml-savitzky-golay');
Math.Matrix = exports.Matrix;
Math.SparseMatrix = require('ml-sparse-matrix');
Math.BellOptimizer = require('ml-optimize-lorentzian');
Math.CurveFitting = require('ml-curve-fitting');
Math.Kernel = require('ml-kernel');


// Statistics packages
var Stat = exports.Stat = {};

Stat.array = require('ml-stat/array');
Stat.matrix = require('ml-stat/matrix');
Stat.PCA = require('ml-pca');
Stat.Performance = require('ml-performance');


// Random number generation
var RNG = exports.RNG = {};
RNG.XSadd = require('ml-xsadd');


// Supervised learning
var SL = exports.SL = {};

SL.CV = require('ml-cross-validation');
SL.CrossValidation = SL.CV; // Alias
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

