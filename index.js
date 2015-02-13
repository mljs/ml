/*
Core utilities
 */

/*
Math
 */
var Math = exports.Math = {};
Math.Matrix = exports.Matrix = require('ml-matrix');
Math.Distance = require('ml-distance');

var Stat = exports.Stat = {};
Stat.array = require('ml-stat/array');
Stat.matrix = require('ml-stat/matrix');

/*
Neural networks
 */
var NN = exports.NN = exports.nn = {};

NN.SOM = require('ml-som');
