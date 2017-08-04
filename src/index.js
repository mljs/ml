'use strict';

const ML = exports;

// Try to keep this list in the same structure as the README.

// Unsupervised learning
ML.PCA = require('ml-pca');
ML.HClust = require('ml-hclust');
ML.KMeans = require('ml-kmeans');

// Supervised learning
ML.SVM = require('ml-svm');
ML.NaiveBayes = require('ml-naivebayes');
ML.KNN = require('ml-knn');
ML.PLS = require('ml-pls');
ML.CrossValidation = require('ml-cross-validation');
ML.ConfusionMatrix = require('ml-confusion-matrix');

// Artificial neural networks
ML.FNN = require('ml-fnn');
ML.SOM = require('ml-som');

// Regression

// Optimization
ML.levenbergMarquardt = require('ml-levenberg-marquardt');

// Math
ML.Matrix = require('ml-matrix').Matrix;
ML.SparseMatrix = require('ml-sparse-matrix');
ML.Kernel = require('ml-kernel');
ML.Distance = require('ml-distance').distance;
ML.Similarity = require('ml-distance').similarity;
ML.distanceMatrix = require('ml-distance-matrix');
ML.XSadd = require('ml-xsadd');

// Statistics
ML.Performance = require('ml-performance');

// Data preprocessing
ML.savitzkyGolay = require('ml-savitzky-golay');
ML.savitzkyGolayGeneralized = require('ml-savitzky-golay-generalized');

// Utility
ML.BitArray = require('ml-bit-array');
ML.HashTable = require('ml-hash-table');
ML.padArray = require('ml-pad-array');
ML.binarySearch = require('binary-search');
ML.numSort = require('num-sort');

// Undocumented/deprecated packages
ML.ArrayUtils = require('ml-array-utils');
ML.Regression = require('ml-regression');
ML.MatrixUtil = require('ml-matrix');
ML.ArrayStat = require('ml-stat').array;
ML.MatrixStat = require('ml-stat').matrix;
