'use strict';

const Matrix = require('ml-matrix');

// Root packages
exports.ArrayUtils = exports.AU = require('ml-array-utils');
exports.BitArray = require('ml-bit-array');
exports.HashTable = require('ml-hash-table');
exports.Matrix = Matrix.default;
exports.PadArray = require('ml-pad-array');
exports.Regression = require('ml-regression');
exports.binarySearch = require('binary-search');
exports.numSort = require('num-sort');


// Math packages
var Math = exports.Math = {};

var distance = require('ml-distance');
Math.Distance = distance.distance;
Math.Similarity = distance.similarity;
Math.DistanceMatrix = require('ml-distance-matrix');
Math.SG = require('ml-savitzky-golay');
Math.SGG = require('ml-savitzky-golay-generalized');
Math.Matrix = Matrix;
Math.SparseMatrix = require('ml-sparse-matrix');
Math.Kernel = require('ml-kernel');


// Statistics packages
var Stat = exports.Stat = {};

Stat.array = require('ml-stat').array;
Stat.matrix = require('ml-stat').matrix;
Stat.PCA = require('ml-pca');
Stat.Performance = require('ml-performance');

// Math packages
var Optimization = exports.Optimization = {};

Optimization.BellOptimizer = require('ml-optimize-lorentzian');
Optimization.LevenbergMarquardt = require('ml-levenberg-marquardt');

// Random number generation
var RNG = exports.RNG = {};
RNG.XSadd = require('ml-xsadd');


// Supervised learning
var SL = exports.SL = {};

SL.CV = require('ml-cross-validation');
SL.CrossValidation = SL.CV; // Alias
SL.CM = require('ml-confusion-matrix');
SL.ConfusionMatrix = SL.CM; // Alias
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
