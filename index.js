/*
Core utilities
 */

/*
Math
 */
var Math = exports.Math = {};

Math.Matrix = exports.Matrix = require('ml-matrix');
Math.Distance = require('ml-distance');

/*
Neural networks
 */
var nn = exports.nn = {};

nn.SOM = require('ml-som');