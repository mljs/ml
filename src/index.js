/*
Core utilities
 */

/*
Math
 */
var Math = exports.Math = {};
Math.Matrix = exports.Matrix = require('ml-matrix');
Math.Distance = require('ml-distance');
Math.SG = require('ml-savitzky-golay');

var Stat = exports.Stat = {};
Stat.array = require('ml-stat/array');
Stat.matrix = require('ml-stat/matrix');

/*
Decomposition
*/
var Decomposition = exports.Decomposition = {};
Decomposition.PCA = require('ml-pca');

/*
Supervised learning
 */
var SL = exports.SL = {};

SL.SVM = require('ml-svm');
SL.KNN = require('ml-knn');
SL.NaiveBayes = require('ml-naivebayes');
SL.PLS = require('ml-pls');

/*
 Clustering
 */
var Clust = exports.Clust = {};

Clust.kmeans = require('ml-kmeans');
Clust.hclust= require('ml-hclust');

/*
Neural networks
 */
var NN = exports.NN = exports.nn = {};

NN.SOM = require('ml-som');
NN.FNN = require('ml-fnn');

/*
Array Utils
*/
var ArrayUtils = exports.ArrayUtils = exports.AU = require('ml-array-utils');
