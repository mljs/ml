(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ML"] = factory();
	else
		root["ML"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Root packages
	exports.ArrayUtils = exports.AU = __webpack_require__(1);
	exports.BitArray = __webpack_require__(9);
	exports.HashTable = __webpack_require__(11);
	exports.Matrix = __webpack_require__(14);
	exports.PadArray = __webpack_require__(23);
	exports.Regression = __webpack_require__(25);


	// Math packages
	var Math = exports.Math = {};

	var distance = __webpack_require__(38);
	Math.Distance = distance.distance;
	Math.Similarity = distance.similarity;
	Math.SG = __webpack_require__(97);
	Math.Matrix = exports.Matrix;
	Math.SparseMatrix = __webpack_require__(99);
	Math.CurveFitting = __webpack_require__(100);


	// Statistics packages
	var Stat = exports.Stat = {};

	Stat.array = __webpack_require__(6);
	Stat.matrix = __webpack_require__(7);
	Stat.PCA = __webpack_require__(122);
	Stat.Performance = __webpack_require__(123);


	// Random number generation
	var RNG = exports.RNG = {};
	RNG.XSadd = __webpack_require__(125);


	// Supervised learning
	var SL = exports.SL = {};

	SL.SVM = __webpack_require__(126);
	SL.KNN = __webpack_require__(129);
	SL.NaiveBayes = __webpack_require__(132);
	SL.PLS = __webpack_require__(137);


	// Clustering
	var Clust = exports.Clust = {};

	Clust.kmeans = __webpack_require__(141);
	Clust.hclust = __webpack_require__(143);


	// Neural networks
	var NN = exports.NN = exports.nn = {};

	NN.SOM = __webpack_require__(153);
	NN.FNN = __webpack_require__(156);



/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(2);
	exports.getEquallySpacedData = __webpack_require__(3).getEquallySpacedData;
	exports.SNV = __webpack_require__(4).SNV;
	exports.binarySearch = __webpack_require__(8);


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Function that returns an array of points given 1D array as follows:
	 *
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * And receive the number of dimensions of each point.
	 * @param array
	 * @param dimensions
	 * @returns {Array} - Array of points.
	 */
	function coordArrayToPoints(array, dimensions) {
	    if(array.length % dimensions !== 0) {
	        throw new RangeError('Dimensions number must be accordance with the size of the array.');
	    }

	    var length = array.length / dimensions;
	    var pointsArr = new Array(length);

	    var k = 0;
	    for(var i = 0; i < array.length; i += dimensions) {
	        var point = new Array(dimensions);
	        for(var j = 0; j < dimensions; ++j) {
	            point[j] = array[i + j];
	        }

	        pointsArr[k] = point;
	        k++;
	    }

	    return pointsArr;
	}


	/**
	 * Function that given an array as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * Returns an array as follows:
	 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
	 *
	 * And receives the number of dimensions of each coordinate.
	 * @param array
	 * @param dimensions
	 * @returns {Array} - Matrix of coordinates
	 */
	function coordArrayToCoordMatrix(array, dimensions) {
	    if(array.length % dimensions !== 0) {
	        throw new RangeError('Dimensions number must be accordance with the size of the array.');
	    }

	    var coordinatesArray = new Array(dimensions);
	    var points = array.length / dimensions;
	    for (var i = 0; i < coordinatesArray.length; i++) {
	        coordinatesArray[i] = new Array(points);
	    }

	    for(i = 0; i < array.length; i += dimensions) {
	        for(var j = 0; j < dimensions; ++j) {
	            var currentPoint = Math.floor(i / dimensions);
	            coordinatesArray[j][currentPoint] = array[i + j];
	        }
	    }

	    return coordinatesArray;
	}

	/**
	 * Function that receives a coordinate matrix as follows:
	 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
	 *
	 * Returns an array of coordinates as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * @param coordMatrix
	 * @returns {Array}
	 */
	function coordMatrixToCoordArray(coordMatrix) {
	    var coodinatesArray = new Array(coordMatrix.length * coordMatrix[0].length);
	    var k = 0;
	    for(var i = 0; i < coordMatrix[0].length; ++i) {
	        for(var j = 0; j < coordMatrix.length; ++j) {
	            coodinatesArray[k] = coordMatrix[j][i];
	            ++k;
	        }
	    }

	    return coodinatesArray;
	}

	/**
	 * Tranpose a matrix, this method is for coordMatrixToPoints and
	 * pointsToCoordMatrix, that because only transposing the matrix
	 * you can change your representation.
	 *
	 * @param matrix
	 * @returns {Array}
	 */
	function transpose(matrix) {
	    var resultMatrix = new Array(matrix[0].length);
	    for(var i = 0; i < resultMatrix.length; ++i) {
	        resultMatrix[i] = new Array(matrix.length);
	    }

	    for (i = 0; i < matrix.length; ++i) {
	        for(var j = 0; j < matrix[0].length; ++j) {
	            resultMatrix[j][i] = matrix[i][j];
	        }
	    }

	    return resultMatrix;
	}

	/**
	 * Function that transform an array of points into a coordinates array
	 * as follows:
	 * [x1, y1, .. , x2, y2, ..]
	 *
	 * @param points
	 * @returns {Array}
	 */
	function pointsToCoordArray(points) {
	    var coodinatesArray = new Array(points.length * points[0].length);
	    var k = 0;
	    for(var i = 0; i < points.length; ++i) {
	        for(var j = 0; j < points[0].length; ++j) {
	            coodinatesArray[k] = points[i][j];
	            ++k;
	        }
	    }

	    return coodinatesArray;
	}

	/**
	 * Apply the dot product between the smaller vector and a subsets of the
	 * largest one.
	 *
	 * @param firstVector
	 * @param secondVector
	 * @returns {Array} each dot product of size of the difference between the
	 *                  larger and the smallest one.
	 */
	function applyDotProduct(firstVector, secondVector) {
	    var largestVector, smallestVector;
	    if(firstVector.length <= secondVector.length) {
	        smallestVector = firstVector;
	        largestVector = secondVector;
	    } else {
	        smallestVector = secondVector;
	        largestVector = firstVector;
	    }

	    var difference = largestVector.length - smallestVector.length + 1;
	    var dotProductApplied = new Array(difference);

	    for (var i = 0; i < difference; ++i) {
	        var sum = 0;
	        for (var j = 0; j < smallestVector.length; ++j) {
	            sum += smallestVector[j] * largestVector[i + j];
	        }
	        dotProductApplied[i] = sum;
	    }

	    return dotProductApplied;
	}

	module.exports = {
	    coordArrayToPoints: coordArrayToPoints,
	    coordArrayToCoordMatrix: coordArrayToCoordMatrix,
	    coordMatrixToCoordArray: coordMatrixToCoordArray,
	    coordMatrixToPoints: transpose,
	    pointsToCoordArray: pointsToCoordArray,
	    pointsToCoordMatrix: transpose,
	    applyDotProduct: applyDotProduct
	};



/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 *
	 * Function that returns a Number array of equally spaced numberOfPoints
	 * containing a representation of intensities of the spectra arguments x
	 * and y.
	 *
	 * The options parameter contains an object in the following form:
	 * from: starting point
	 * to: last point
	 * numberOfPoints: number of points between from and to
	 * variant: "slot" or "smooth" - smooth is the default option
	 *
	 * The slot variant consist that each point in the new array is calculated
	 * averaging the existing points between the slot that belongs to the current
	 * value. The smooth variant is the same but takes the integral of the range
	 * of the slot and divide by the step size between two points in the new array.
	 *
	 * @param x - sorted increasing x values
	 * @param y
	 * @param options
	 * @returns {Array} new array with the equally spaced data.
	 *
	 */
	function getEquallySpacedData(x, y, options) {
	    if (x.length>1 && x[0]>x[1]) {
	        x=x.reverse();
	        y=y.reverse();
	    }

	    var xLength = x.length;
	    if(xLength !== y.length)
	        throw new RangeError("the x and y vector doesn't have the same size.");

	    if (options === undefined) options = {};

	    var from = options.from === undefined ? x[0] : options.from
	    if (isNaN(from) || !isFinite(from)) {
	        throw new RangeError("'From' value must be a number");
	    }
	    var to = options.to === undefined ? x[x.length - 1] : options.to;
	    if (isNaN(to) || !isFinite(to)) {
	        throw new RangeError("'To' value must be a number");
	    }

	    var reverse = from > to;
	    if(reverse) {
	        var temp = from;
	        from = to;
	        to = temp;
	    }

	    var numberOfPoints = options.numberOfPoints === undefined ? 100 : options.numberOfPoints;
	    if (isNaN(numberOfPoints) || !isFinite(numberOfPoints)) {
	        throw new RangeError("'Number of points' value must be a number");
	    }
	    if(numberOfPoints < 1)
	        throw new RangeError("the number of point must be higher than 1");

	    var algorithm = options.variant === "slot" ? "slot" : "smooth"; // default value: smooth

	    var output = algorithm === "slot" ? getEquallySpacedSlot(x, y, from, to, numberOfPoints) : getEquallySpacedSmooth(x, y, from, to, numberOfPoints);

	    return reverse ? output.reverse() : output;
	}

	/**
	 * function that retrieves the getEquallySpacedData with the variant "smooth"
	 *
	 * @param x
	 * @param y
	 * @param from - Initial point
	 * @param to - Final point
	 * @param numberOfPoints
	 * @returns {Array} - Array of y's equally spaced with the variant "smooth"
	 */
	function getEquallySpacedSmooth(x, y, from, to, numberOfPoints) {
	    var xLength = x.length;

	    var step = (to - from) / (numberOfPoints - 1);
	    var halfStep = step / 2;

	    var start = from - halfStep;
	    var output = new Array(numberOfPoints);

	    var initialOriginalStep = x[1] - x[0];
	    var lastOriginalStep = x[x.length - 1] - x[x.length - 2];

	    // Init main variables
	    var min = start;
	    var max = start + step;

	    var previousX = -Number.MAX_VALUE;
	    var previousY = 0;
	    var nextX = x[0] - initialOriginalStep;
	    var nextY = 0;

	    var currentValue = 0;
	    var slope = 0;
	    var intercept = 0;
	    var sumAtMin = 0;
	    var sumAtMax = 0;

	    var i = 0; // index of input
	    var j = 0; // index of output

	    function getSlope(x0, y0, x1, y1) {
	        return (y1 - y0) / (x1 - x0);
	    }

	    main: while(true) {
	        while (nextX - max >= 0) {
	            // no overlap with original point, just consume current value
	            var add = integral(0, max - previousX, slope, previousY);
	            sumAtMax = currentValue + add;

	            output[j] = (sumAtMax - sumAtMin) / step;
	            j++;

	            if (j === numberOfPoints)
	                break main;

	            min = max;
	            max += step;
	            sumAtMin = sumAtMax;
	        }

	        if(previousX <= min && min <= nextX) {
	            add = integral(0, min - previousX, slope, previousY);
	            sumAtMin = currentValue + add;
	        }

	        currentValue += integral(previousX, nextX, slope, intercept);

	        previousX = nextX;
	        previousY = nextY;

	        if (i < xLength) {
	            nextX = x[i];
	            nextY = y[i];
	            i++;
	        } else if (i === xLength) {
	            nextX += lastOriginalStep;
	            nextY = 0;
	        }
	        // updating parameters
	        slope = getSlope(previousX, previousY, nextX, nextY);
	        intercept = -slope*previousX + previousY;
	    }

	    return output;
	}

	/**
	 * function that retrieves the getEquallySpacedData with the variant "slot"
	 *
	 * @param x
	 * @param y
	 * @param from - Initial point
	 * @param to - Final point
	 * @param numberOfPoints
	 * @returns {Array} - Array of y's equally spaced with the variant "slot"
	 */
	function getEquallySpacedSlot(x, y, from, to, numberOfPoints) {
	    var xLength = x.length;

	    var step = (to - from) / (numberOfPoints - 1);
	    var halfStep = step / 2;
	    var lastStep = x[x.length - 1] - x[x.length - 2];

	    var start = from - halfStep;
	    var output = new Array(numberOfPoints);

	    // Init main variables
	    var min = start;
	    var max = start + step;

	    var previousX = -Number.MAX_VALUE;
	    var previousY = 0;
	    var nextX = x[0];
	    var nextY = y[0];
	    var frontOutsideSpectra = 0;
	    var backOutsideSpectra = true;

	    var currentValue = 0;

	    // for slot algorithm
	    var currentPoints = 0;

	    var i = 1; // index of input
	    var j = 0; // index of output

	    main: while(true) {
	        if (previousX>=nextX) throw (new Error('x must be an increasing serie'));
	        while (previousX - max > 0) {
	            // no overlap with original point, just consume current value
	            if(backOutsideSpectra) {
	                currentPoints++;
	                backOutsideSpectra = false;
	            }

	            output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
	            j++;

	            if (j === numberOfPoints)
	                break main;

	            min = max;
	            max += step;
	            currentValue = 0;
	            currentPoints = 0;
	        }

	        if(previousX > min) {
	            currentValue += previousY;
	            currentPoints++;
	        }

	        if(previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1)
	            currentPoints--;

	        previousX = nextX;
	        previousY = nextY;

	        if (i < xLength) {
	            nextX = x[i];
	            nextY = y[i];
	            i++;
	        } else {
	            nextX += lastStep;
	            nextY = 0;
	            frontOutsideSpectra++;
	        }
	    }

	    return output;
	}
	/**
	 * Function that calculates the integral of the line between two
	 * x-coordinates, given the slope and intercept of the line.
	 *
	 * @param x0
	 * @param x1
	 * @param slope
	 * @param intercept
	 * @returns {number} integral value.
	 */
	function integral(x0, x1, slope, intercept) {
	    return (0.5 * slope * x1 * x1 + intercept * x1) - (0.5 * slope * x0 * x0 + intercept * x0);
	}

	exports.getEquallySpacedData = getEquallySpacedData;
	exports.integral = integral;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.SNV = SNV;
	var Stat = __webpack_require__(5).array;

	/**
	 * Function that applies the standard normal variate (SNV) to an array of values.
	 *
	 * @param data - Array of values.
	 * @returns {Array} - applied the SNV.
	 */
	function SNV(data) {
	    var mean = Stat.mean(data);
	    var std = Stat.standardDeviation(data);
	    var result = data.slice();
	    for (var i = 0; i < data.length; i++) {
	        result[i] = (result[i] - mean) / std;
	    }
	    return result;
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.array = __webpack_require__(6);
	exports.matrix = __webpack_require__(7);


/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function compareNumbers(a, b) {
	    return a - b;
	}

	/**
	 * Computes the sum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.sum = function sum(values) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	        sum += values[i];
	    }
	    return sum;
	};

	/**
	 * Computes the maximum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.max = function max(values) {
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] > max) max = values[i];
	    }
	    return max;
	};

	/**
	 * Computes the minimum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.min = function min(values) {
	    var min = Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	    }
	    return min;
	};

	/**
	 * Computes the min and max of the given values
	 * @param {Array} values
	 * @returns {{min: number, max: number}}
	 */
	exports.minMax = function minMax(values) {
	    var min = Infinity;
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	        if (values[i] > max) max = values[i];
	    }
	    return {
	        min: min,
	        max: max
	    };
	};

	/**
	 * Computes the arithmetic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.arithmeticMean = function arithmeticMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        sum += values[i];
	    }
	    return sum / l;
	};

	/**
	 * {@link arithmeticMean}
	 */
	exports.mean = exports.arithmeticMean;

	/**
	 * Computes the geometric mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.geometricMean = function geometricMean(values) {
	    var mul = 1;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        mul *= values[i];
	    }
	    return Math.pow(mul, 1 / l);
	};

	/**
	 * Computes the mean of the log of the given values
	 * If the return value is exponentiated, it gives the same result as the
	 * geometric mean.
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.logMean = function logMean(values) {
	    var lnsum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        lnsum += Math.log(values[i]);
	    }
	    return lnsum / l;
	};

	/**
	 * Computes the weighted grand mean for a list of means and sample sizes
	 * @param {Array} means - Mean values for each set of samples
	 * @param {Array} samples - Number of original values for each set of samples
	 * @returns {number}
	 */
	exports.grandMean = function grandMean(means, samples) {
	    var sum = 0;
	    var n = 0;
	    var l = means.length;
	    for (var i = 0; i < l; i++) {
	        sum += samples[i] * means[i];
	        n += samples[i];
	    }
	    return sum / n;
	};

	/**
	 * Computes the truncated mean of the given values using a given percentage
	 * @param {Array} values
	 * @param {number} percent - The percentage of values to keep (range: [0,1])
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var k = Math.floor(l * percent);
	    var sum = 0;
	    for (var i = k; i < (l - k); i++) {
	        sum += values[i];
	    }
	    return sum / (l - 2 * k);
	};

	/**
	 * Computes the harmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.harmonicMean = function harmonicMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] === 0) {
	            throw new RangeError('value at index ' + i + 'is zero');
	        }
	        sum += 1 / values[i];
	    }
	    return l / sum;
	};

	/**
	 * Computes the contraharmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.contraHarmonicMean = function contraHarmonicMean(values) {
	    var r1 = 0;
	    var r2 = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        r1 += values[i] * values[i];
	        r2 += values[i];
	    }
	    if (r2 < 0) {
	        throw new RangeError('sum of values is negative');
	    }
	    return r1 / r2;
	};

	/**
	 * Computes the median of the given values
	 * @param {Array} values
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.median = function median(values, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var half = Math.floor(l / 2);
	    if (l % 2 === 0) {
	        return (values[half - 1] + values[half]) * 0.5;
	    } else {
	        return values[half];
	    }
	};

	/**
	 * Computes the variance of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.variance = function variance(values, unbiased) {
	    if (unbiased === undefined) unbiased = true;
	    var theMean = exports.mean(values);
	    var theVariance = 0;
	    var l = values.length;

	    for (var i = 0; i < l; i++) {
	        var x = values[i] - theMean;
	        theVariance += x * x;
	    }

	    if (unbiased) {
	        return theVariance / (l - 1);
	    } else {
	        return theVariance / l;
	    }
	};

	/**
	 * Computes the standard deviation of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.standardDeviation = function standardDeviation(values, unbiased) {
	    return Math.sqrt(exports.variance(values, unbiased));
	};

	exports.standardError = function standardError(values) {
	    return exports.standardDeviation(values) / Math.sqrt(values.length);
	};

	exports.quartiles = function quartiles(values, alreadySorted) {
	    if (typeof(alreadySorted) === 'undefined') alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice();
	        values.sort(compareNumbers);
	    }

	    var quart = values.length / 4;
	    var q1 = values[Math.ceil(quart) - 1];
	    var q2 = exports.median(values, true);
	    var q3 = values[Math.ceil(quart * 3) - 1];

	    return {q1: q1, q2: q2, q3: q3};
	};

	exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
	    return Math.sqrt(exports.pooledVariance(samples, unbiased));
	};

	exports.pooledVariance = function pooledVariance(samples, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var sum = 0;
	    var length = 0, l = samples.length;
	    for (var i = 0; i < l; i++) {
	        var values = samples[i];
	        var vari = exports.variance(values);

	        sum += (values.length - 1) * vari;

	        if (unbiased)
	            length += values.length - 1;
	        else
	            length += values.length;
	    }
	    return sum / length;
	};

	exports.mode = function mode(values) {
	    var l = values.length,
	        itemCount = new Array(l),
	        i;
	    for (i = 0; i < l; i++) {
	        itemCount[i] = 0;
	    }
	    var itemArray = new Array(l);
	    var count = 0;

	    for (i = 0; i < l; i++) {
	        var index = itemArray.indexOf(values[i]);
	        if (index >= 0)
	            itemCount[index]++;
	        else {
	            itemArray[count] = values[i];
	            itemCount[count] = 1;
	            count++;
	        }
	    }

	    var maxValue = 0, maxIndex = 0;
	    for (i = 0; i < count; i++) {
	        if (itemCount[i] > maxValue) {
	            maxValue = itemCount[i];
	            maxIndex = i;
	        }
	    }

	    return itemArray[maxIndex];
	};

	exports.covariance = function covariance(vector1, vector2, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var mean1 = exports.mean(vector1);
	    var mean2 = exports.mean(vector2);

	    if (vector1.length !== vector2.length)
	        throw "Vectors do not have the same dimensions";

	    var cov = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        var x = vector1[i] - mean1;
	        var y = vector2[i] - mean2;
	        cov += x * y;
	    }

	    if (unbiased)
	        return cov / (l - 1);
	    else
	        return cov / l;
	};

	exports.skewness = function skewness(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);

	    var s2 = 0, s3 = 0, l = values.length;
	    for (var i = 0; i < l; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s3 += dev * dev * dev;
	    }
	    var m2 = s2 / l;
	    var m3 = s3 / l;

	    var g = m3 / (Math.pow(m2, 3 / 2.0));
	    if (unbiased) {
	        var a = Math.sqrt(l * (l - 1));
	        var b = l - 2;
	        return (a / b) * g;
	    }
	    else {
	        return g;
	    }
	};

	exports.kurtosis = function kurtosis(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);
	    var n = values.length, s2 = 0, s4 = 0;

	    for (var i = 0; i < n; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s4 += dev * dev * dev * dev;
	    }
	    var m2 = s2 / n;
	    var m4 = s4 / n;

	    if (unbiased) {
	        var v = s2 / (n - 1);
	        var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	        var b = s4 / (v * v);
	        var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));

	        return a * b - 3 * c;
	    }
	    else {
	        return m4 / (m2 * m2) - 3;
	    }
	};

	exports.entropy = function entropy(values, eps) {
	    if (typeof(eps) === 'undefined') eps = 0;
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * Math.log(values[i] + eps);
	    return -sum;
	};

	exports.weightedMean = function weightedMean(values, weights) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * weights[i];
	    return sum;
	};

	exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
	    return Math.sqrt(exports.weightedVariance(values, weights));
	};

	exports.weightedVariance = function weightedVariance(values, weights) {
	    var theMean = exports.weightedMean(values, weights);
	    var vari = 0, l = values.length;
	    var a = 0, b = 0;

	    for (var i = 0; i < l; i++) {
	        var z = values[i] - theMean;
	        var w = weights[i];

	        vari += w * (z * z);
	        b += w;
	        a += w * w;
	    }

	    return vari * (b / (b * b - a));
	};

	exports.center = function center(values, inPlace) {
	    if (typeof(inPlace) === 'undefined') inPlace = false;

	    var result = values;
	    if (!inPlace)
	        result = values.slice();

	    var theMean = exports.mean(result), l = result.length;
	    for (var i = 0; i < l; i++)
	        result[i] -= theMean;
	};

	exports.standardize = function standardize(values, standardDev, inPlace) {
	    if (typeof(standardDev) === 'undefined') standardDev = exports.standardDeviation(values);
	    if (typeof(inPlace) === 'undefined') inPlace = false;
	    var l = values.length;
	    var result = inPlace ? values : new Array(l);
	    for (var i = 0; i < l; i++)
	        result[i] = values[i] / standardDev;
	    return result;
	};

	exports.cumulativeSum = function cumulativeSum(array) {
	    var l = array.length;
	    var result = new Array(l);
	    result[0] = array[0];
	    for (var i = 1; i < l; i++)
	        result[i] = result[i - 1] + array[i];
	    return result;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var arrayStat = __webpack_require__(6);

	// https://github.com/accord-net/framework/blob/development/Sources/Accord.Statistics/Tools.cs

	function entropy(matrix, eps) {
	    if (typeof(eps) === 'undefined') {
	        eps = 0;
	    }
	    var sum = 0,
	        l1 = matrix.length,
	        l2 = matrix[0].length;
	    for (var i = 0; i < l1; i++) {
	        for (var j = 0; j < l2; j++) {
	            sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
	        }
	    }
	    return -sum;
	}

	function mean(matrix, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        theMean, N, i, j;

	    if (dimension === -1) {
	        theMean = [0];
	        N = rows * cols;
	        for (i = 0; i < rows; i++) {
	            for (j = 0; j < cols; j++) {
	                theMean[0] += matrix[i][j];
	            }
	        }
	        theMean[0] /= N;
	    } else if (dimension === 0) {
	        theMean = new Array(cols);
	        N = rows;
	        for (j = 0; j < cols; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < rows; i++) {
	                theMean[j] += matrix[i][j];
	            }
	            theMean[j] /= N;
	        }
	    } else if (dimension === 1) {
	        theMean = new Array(rows);
	        N = cols;
	        for (j = 0; j < rows; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < cols; i++) {
	                theMean[j] += matrix[j][i];
	            }
	            theMean[j] /= N;
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }
	    return theMean;
	}

	function standardDeviation(matrix, means, unbiased) {
	    var vari = variance(matrix, means, unbiased), l = vari.length;
	    for (var i = 0; i < l; i++) {
	        vari[i] = Math.sqrt(vari[i]);
	    }
	    return vari;
	}

	function variance(matrix, means, unbiased) {
	    if (typeof(unbiased) === 'undefined') {
	        unbiased = true;
	    }
	    means = means || mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum1 = 0, sum2 = 0, x = 0;
	        for (var i = 0; i < rows; i++) {
	            x = matrix[i][j] - means[j];
	            sum1 += x;
	            sum2 += x * x;
	        }
	        if (unbiased) {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / (rows - 1);
	        } else {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / rows;
	        }
	    }
	    return vari;
	}

	function median(matrix) {
	    var rows = matrix.length, cols = matrix[0].length;
	    var medians = new Array(cols);

	    for (var i = 0; i < cols; i++) {
	        var data = new Array(rows);
	        for (var j = 0; j < rows; j++) {
	            data[j] = matrix[j][i];
	        }
	        data.sort();
	        var N = data.length;
	        if (N % 2 === 0) {
	            medians[i] = (data[N / 2] + data[(N / 2) - 1]) * 0.5;
	        } else {
	            medians[i] = data[Math.floor(N / 2)];
	        }
	    }
	    return medians;
	}

	function mode(matrix) {
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        modes = new Array(cols),
	        i, j;
	    for (i = 0; i < cols; i++) {
	        var itemCount = new Array(rows);
	        for (var k = 0; k < rows; k++) {
	            itemCount[k] = 0;
	        }
	        var itemArray = new Array(rows);
	        var count = 0;

	        for (j = 0; j < rows; j++) {
	            var index = itemArray.indexOf(matrix[j][i]);
	            if (index >= 0) {
	                itemCount[index]++;
	            } else {
	                itemArray[count] = matrix[j][i];
	                itemCount[count] = 1;
	                count++;
	            }
	        }

	        var maxValue = 0, maxIndex = 0;
	        for (j = 0; j < count; j++) {
	            if (itemCount[j] > maxValue) {
	                maxValue = itemCount[j];
	                maxIndex = j;
	            }
	        }

	        modes[i] = itemArray[maxIndex];
	    }
	    return modes;
	}

	function skewness(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, l = means.length;
	    var skew = new Array(l);

	    for (var j = 0; j < l; j++) {
	        var s2 = 0, s3 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s3 += dev * dev * dev;
	        }

	        var m2 = s2 / n;
	        var m3 = s3 / n;
	        var g = m3 / Math.pow(m2, 3 / 2);

	        if (unbiased) {
	            var a = Math.sqrt(n * (n - 1));
	            var b = n - 2;
	            skew[j] = (a / b) * g;
	        } else {
	            skew[j] = g;
	        }
	    }
	    return skew;
	}

	function kurtosis(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, m = matrix[0].length;
	    var kurt = new Array(m);

	    for (var j = 0; j < m; j++) {
	        var s2 = 0, s4 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s4 += dev * dev * dev * dev;
	        }
	        var m2 = s2 / n;
	        var m4 = s4 / n;

	        if (unbiased) {
	            var v = s2 / (n - 1);
	            var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	            var b = s4 / (v * v);
	            var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));
	            kurt[j] = a * b - 3 * c;
	        } else {
	            kurt[j] = m4 / (m2 * m2) - 3;
	        }
	    }
	    return kurt;
	}

	function standardError(matrix) {
	    var samples = matrix.length;
	    var standardDeviations = standardDeviation(matrix), l = standardDeviations.length;
	    var standardErrors = new Array(l);
	    var sqrtN = Math.sqrt(samples);

	    for (var i = 0; i < l; i++) {
	        standardErrors[i] = standardDeviations[i] / sqrtN;
	    }
	    return standardErrors;
	}

	function covariance(matrix, dimension) {
	    return scatter(matrix, undefined, dimension);
	}

	function scatter(matrix, divisor, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    if (typeof(divisor) === 'undefined') {
	        if (dimension === 0) {
	            divisor = matrix.length - 1;
	        } else if (dimension === 1) {
	            divisor = matrix[0].length - 1;
	        }
	    }
	    var means = mean(matrix, dimension),
	        rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, s, k;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	function correlation(matrix) {
	    var means = mean(matrix),
	        standardDeviations = standardDeviation(matrix, true, means),
	        scores = zScores(matrix, means, standardDeviations),
	        rows = matrix.length,
	        cols = matrix[0].length,
	        i, j;

	    var cor = new Array(cols);
	    for (i = 0; i < cols; i++) {
	        cor[i] = new Array(cols);
	    }
	    for (i = 0; i < cols; i++) {
	        for (j = i; j < cols; j++) {
	            var c = 0;
	            for (var k = 0, l = scores.length; k < l; k++) {
	                c += scores[k][j] * scores[k][i];
	            }
	            c /= rows - 1;
	            cor[i][j] = c;
	            cor[j][i] = c;
	        }
	    }
	    return cor;
	}

	function zScores(matrix, means, standardDeviations) {
	    means = means || mean(matrix);
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix, true, means);
	    return standardize(center(matrix, means, false), standardDeviations, true);
	}

	function center(matrix, means, inPlace) {
	    means = means || mean(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var row = result[i];
	        for (j = 0, jj = row.length; j < jj; j++) {
	            row[j] = matrix[i][j] - means[j];
	        }
	    }
	    return result;
	}

	function standardize(matrix, standardDeviations, inPlace) {
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var resultRow = result[i];
	        var sourceRow = matrix[i];
	        for (j = 0, jj = resultRow.length; j < jj; j++) {
	            if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
	                resultRow[j] = sourceRow[j] / standardDeviations[j];
	            }
	        }
	    }
	    return result;
	}

	function weightedVariance(matrix, weights) {
	    var means = mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum = 0;
	        var a = 0, b = 0;

	        for (var i = 0; i < rows; i++) {
	            var z = matrix[i][j] - means[j];
	            var w = weights[i];

	            sum += w * (z * z);
	            b += w;
	            a += w * w;
	        }

	        vari[j] = sum * (b / (b * b - a));
	    }

	    return vari;
	}

	function weightedMean(matrix, weights, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length,
	        means, i, ii, j, w, row;

	    if (dimension === 0) {
	        means = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            means[i] = 0;
	        }
	        for (i = 0; i < rows; i++) {
	            row = matrix[i];
	            w = weights[i];
	            for (j = 0; j < cols; j++) {
	                means[j] += row[j] * w;
	            }
	        }
	    } else if (dimension === 1) {
	        means = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            means[i] = 0;
	        }
	        for (j = 0; j < rows; j++) {
	            row = matrix[j];
	            w = weights[j];
	            for (i = 0; i < cols; i++) {
	                means[j] += row[i] * w;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    var weightSum = arrayStat.sum(weights);
	    if (weightSum !== 0) {
	        for (i = 0, ii = means.length; i < ii; i++) {
	            means[i] /= weightSum;
	        }
	    }
	    return means;
	}

	function weightedCovariance(matrix, weights, means, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    var s1 = 0, s2 = 0;
	    for (var i = 0, ii = weights.length; i < ii; i++) {
	        s1 += weights[i];
	        s2 += weights[i] * weights[i];
	    }
	    var factor = s1 / (s1 * s1 - s2);
	    return weightedScatter(matrix, weights, means, factor, dimension);
	}

	function weightedScatter(matrix, weights, means, factor, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    if (typeof(factor) === 'undefined') {
	        factor = 1;
	    }
	    var rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, k, s;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	module.exports = {
	    entropy: entropy,
	    mean: mean,
	    standardDeviation: standardDeviation,
	    variance: variance,
	    median: median,
	    mode: mode,
	    skewness: skewness,
	    kurtosis: kurtosis,
	    standardError: standardError,
	    covariance: covariance,
	    scatter: scatter,
	    correlation: correlation,
	    zScores: zScores,
	    center: center,
	    standardize: standardize,
	    weightedVariance: weightedVariance,
	    weightedMean: weightedMean,
	    weightedCovariance: weightedCovariance,
	    weightedScatter: weightedScatter
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Performs a binary search of value in array
	 * @param array - Array in which value will be searched. It must be sorted.
	 * @param value - Value to search in array
	 * @return {number} If value is found, returns its index in array. Otherwise, returns a negative number indicating where the value should be inserted: -(index + 1)
	 */
	function binarySearch(array, value) {
	    var low = 0;
	    var high = array.length - 1;

	    while (low <= high) {
	        var mid = (low + high) >>> 1;
	        var midValue = array[mid];
	        if (midValue < value) {
	            low = mid + 1;
	        } else if (midValue > value) {
	            high = mid - 1;
	        } else {
	            return mid;
	        }
	    }

	    return -(low + 1);
	}

	module.exports = binarySearch;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var eightBits = __webpack_require__(10);

	/**
	 * Count the number of true values in an array
	 * @param {Array} arr
	 * @return {number}
	 */
	function count(arr) {
	    var c = 0;
	    for (var i = 0; i < arr.length; i++) {
	        c += eightBits[arr[i] & 0xff] + eightBits[(arr[i] >> 8) & 0xff] + eightBits[(arr[i] >> 16) & 0xff] + eightBits[(arr[i] >> 24) & 0xff];
	    }
	    return c;
	}

	/**
	 * Logical AND operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function and(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] & arr2[i];
	    return ans;
	}

	/**
	 * Logical OR operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function or(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] | arr2[i];
	    return ans;
	}

	/**
	 * Logical XOR operation
	 * @param {Array} arr1
	 * @param {Array} arr2
	 * @return {Array}
	 */
	function xor(arr1, arr2) {
	    var ans = new Array(arr1.length);
	    for (var i = 0; i < arr1.length; i++)
	        ans[i] = arr1[i] ^ arr2[i];
	    return ans;
	}

	/**
	 * Logical NOT operation
	 * @param {Array} arr
	 * @return {Array}
	 */
	function not(arr) {
	    var ans = new Array(arr.length);
	    for (var i = 0; i < ans.length; i++)
	        ans[i] = ~arr[i];
	    return ans;
	}

	/**
	 * Gets the n value of array arr
	 * @param {Array} arr
	 * @param {number} n
	 * @return {boolean}
	 */
	function getBit(arr, n) {
	    var index = n >> 5; // Same as Math.floor(n/32)
	    var mask = 1 << (31 - n % 32);
	    return Boolean(arr[index] & mask);
	}

	/**
	 * Sets the n value of array arr to the value val
	 * @param {Array} arr
	 * @param {number} n
	 * @param {boolean} val
	 * @return {Array}
	 */
	function setBit(arr, n, val) {
	    var index = n >> 5; // Same as Math.floor(n/32)
	    var mask = 1 << (31 - n % 32);
	    if (val)
	        arr[index] = mask | arr[index];
	    else
	        arr[index] = ~mask & arr[index];
	    return arr;
	}

	/**
	 * Translates an array of numbers to a string of bits
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toBinaryString(arr) {
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        var obj = (arr[i] >>> 0).toString(2);
	        str += '00000000000000000000000000000000'.substr(obj.length) + obj;
	    }
	    return str;
	}

	/**
	 * Creates an array of numbers based on a string of bits
	 * @param {string} str
	 * @returns {Array}
	 */
	function parseBinaryString(str) {
	    var len = str.length / 32;
	    var ans = new Array(len);
	    for (var i = 0; i < len; i++) {
	        ans[i] = parseInt(str.substr(i*32, 32), 2) | 0;
	    }
	    return ans;
	}

	/**
	 * Translates an array of numbers to a hex string
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toHexString(arr) {
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        var obj = (arr[i] >>> 0).toString(16);
	        str += '00000000'.substr(obj.length) + obj;
	    }
	    return str;
	}

	/**
	 * Creates an array of numbers based on a hex string
	 * @param {string} str
	 * @returns {Array}
	 */
	function parseHexString(str) {
	    var len = str.length / 8;
	    var ans = new Array(len);
	    for (var i = 0; i < len; i++) {
	        ans[i] = parseInt(str.substr(i*8, 8), 16) | 0;
	    }
	    return ans;
	}

	/**
	 * Creates a human readable string of the array
	 * @param {Array} arr
	 * @returns {string}
	 */
	function toDebug(arr) {
	    var binary = toBinaryString(arr);
	    var str = '';
	    for (var i = 0; i < arr.length; i++) {
	        str += '0000'.substr((i * 32).toString(16).length) + (i * 32).toString(16) + ':';
	        for (var j = 0; j < 32; j += 4) {
	            str += ' ' + binary.substr(i * 32 + j, 4);
	        }
	        if (i < arr.length - 1) str += '\n';
	    }
	    return str
	}

	module.exports = {
	    count: count,
	    and: and,
	    or: or,
	    xor: xor,
	    not: not,
	    getBit: getBit,
	    setBit: setBit,
	    toBinaryString: toBinaryString,
	    parseBinaryString: parseBinaryString,
	    toHexString: toHexString,
	    parseHexString: parseHexString,
	    toDebug: toDebug
	};


/***/ },
/* 10 */
/***/ function(module, exports) {

	// auxiliary file to create the 256 look at table elements

	var ans = new Array(256);
	for (var i = 0; i < 256; i++) {
	    var num = i;
	    var c = 0;
	    while (num) {
	        num = num & (num - 1);
	        c++;
	    }
	    ans[i] = c;
	}

	module.exports = ans;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const newArray = __webpack_require__(12);

	const primeFinder = __webpack_require__(13);
	const nextPrime = primeFinder.nextPrime;
	const largestPrime = primeFinder.largestPrime;

	const FREE = 0;
	const FULL = 1;
	const REMOVED = 2;

	const defaultInitialCapacity = 150;
	const defaultMinLoadFactor = 1 / 6;
	const defaultMaxLoadFactor = 2 / 3;

	class HashTable {
	    constructor(options = {}) {
	        if (options instanceof HashTable) {
	            this.table = options.table.slice();
	            this.values = options.values.slice();
	            this.state = options.state.slice();
	            this.minLoadFactor = options.minLoadFactor;
	            this.maxLoadFactor = options.maxLoadFactor;
	            this.distinct = options.distinct;
	            this.freeEntries = options.freeEntries;
	            this.lowWaterMark = options.lowWaterMark;
	            this.highWaterMark = options.maxLoadFactor;
	            return;
	        }

	        const initialCapacity = options.initialCapacity === undefined ? defaultInitialCapacity : options.initialCapacity;
	        if (initialCapacity < 0) {
	            throw new RangeError(`initial capacity must not be less than zero: ${initialCapacity}`);
	        }

	        const minLoadFactor = options.minLoadFactor === undefined ? defaultMinLoadFactor : options.minLoadFactor;
	        const maxLoadFactor = options.maxLoadFactor === undefined ? defaultMaxLoadFactor : options.maxLoadFactor;
	        if (minLoadFactor < 0 || minLoadFactor >= 1) {
	            throw new RangeError(`invalid minLoadFactor: ${minLoadFactor}`);
	        }
	        if (maxLoadFactor <= 0 || maxLoadFactor >= 1) {
	            throw new RangeError(`invalid maxLoadFactor: ${maxLoadFactor}`);
	        }
	        if (minLoadFactor >= maxLoadFactor) {
	            throw new RangeError(`minLoadFactor (${minLoadFactor}) must be smaller than maxLoadFactor (${maxLoadFactor})`);
	        }

	        let capacity = initialCapacity;
	        // User wants to put at least capacity elements. We need to choose the size based on the maxLoadFactor to
	        // avoid the need to rehash before this capacity is reached.
	        // actualCapacity * maxLoadFactor >= capacity
	        capacity = (capacity / maxLoadFactor) | 0;
	        capacity = nextPrime(capacity);
	        if (capacity === 0) capacity = 1;

	        this.table = newArray(capacity, 0);
	        this.values = newArray(capacity, 0);
	        this.state = newArray(capacity, 0);

	        this.minLoadFactor = minLoadFactor;
	        if (capacity === largestPrime) {
	            this.maxLoadFactor = 1;
	        } else {
	            this.maxLoadFactor = maxLoadFactor;
	        }

	        this.distinct = 0;
	        this.freeEntries = capacity;

	        this.lowWaterMark = 0;
	        this.highWaterMark = chooseHighWaterMark(capacity, this.maxLoadFactor);
	    }

	    clone() {
	        return new HashTable(this);
	    }

	    get size() {
	        return this.distinct;
	    }

	    get(key) {
	        const i = this.indexOfKey(key);
	        if (i < 0) return 0;
	        return this.values[i];
	    }

	    set(key, value) {
	        let i = this.indexOfInsertion(key);
	        if (i < 0) {
	            i = -i - 1;
	            this.values[i] = value;
	            return false;
	        }

	        if (this.distinct > this.highWaterMark) {
	            const newCapacity = chooseGrowCapacity(this.distinct + 1, this.minLoadFactor, this.maxLoadFactor);
	            this.rehash(newCapacity);
	            return this.set(key, value);
	        }

	        this.table[i] = key;
	        this.values[i] = value;
	        if (this.state[i] === FREE) this.freeEntries--;
	        this.state[i] = FULL;
	        this.distinct++;

	        if (this.freeEntries < 1) {
	            const newCapacity = chooseGrowCapacity(this.distinct + 1, this.minLoadFactor, this.maxLoadFactor);
	            this.rehash(newCapacity);
	        }

	        return true;
	    }
	    
	    remove(key, noRehash) {
	        const i = this.indexOfKey(key);
	        if (i < 0) return false;

	        this.state[i] = REMOVED;
	        this.distinct--;

	        if (!noRehash) this.maybeShrinkCapacity();

	        return true;
	    }

	    delete(key, noRehash) {
	        const i = this.indexOfKey(key);
	        if (i < 0) return false;

	        this.state[i] = FREE;
	        this.distinct--;

	        if (!noRehash) this.maybeShrinkCapacity();

	        return true;
	    }

	    maybeShrinkCapacity() {
	        if (this.distinct < this.lowWaterMark) {
	            const newCapacity = chooseShrinkCapacity(this.distinct, this.minLoadFactor, this.maxLoadFactor);
	            this.rehash(newCapacity);
	        }
	    }

	    containsKey(key) {
	        return this.indexOfKey(key) >= 0;
	    }

	    indexOfKey(key) {
	        const table = this.table;
	        const state = this.state;
	        const length = this.table.length;

	        const hash = key & 0x7fffffff;
	        let i = hash % length;
	        let decrement = hash % (length - 2);
	        if (decrement === 0) decrement = 1;

	        while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
	            i -= decrement;
	            if (i < 0) i += length;
	        }

	        if (state[i] === FREE) return -1;
	        return i;
	    }

	    containsValue(value) {
	        return this.indexOfValue(value) >= 0;
	    }

	    indexOfValue(value) {
	        const values = this.values;
	        const state = this.state;

	        for (var i = 0; i < state.length; i++) {
	            if (state[i] === FULL && values[i] === value) {
	                return i;
	            }
	        }

	        return -1;
	    }

	    indexOfInsertion(key) {
	        const table = this.table;
	        const state = this.state;
	        const length = table.length;


	        const hash = key & 0x7fffffff;
	        let i = hash % length;
	        let decrement = hash % (length - 2);
	        if (decrement === 0) decrement = 1;

	        while (state[i] === FULL && table[i] !== key) {
	            i -= decrement;
	            if (i < 0) i += length;
	        }

	        if (state[i] === REMOVED) {
	            const j = i;
	            while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
	                i -= decrement;
	                if (i < 0) i += length;
	            }
	            if (state[i] === FREE) i = j;
	        }

	        if (state[i] === FULL) {
	            return -i - 1;
	        }

	        return i;
	    }

	    ensureCapacity(minCapacity) {
	        if (this.table.length < minCapacity) {
	            const newCapacity = nextPrime(minCapacity);
	            this.rehash(newCapacity);
	        }
	    }

	    rehash(newCapacity) {
	        const oldCapacity = this.table.length;

	        if (newCapacity <= this.distinct) throw new Error('Unexpected');

	        const oldTable = this.table;
	        const oldValues = this.values;
	        const oldState = this.state;

	        const newTable = newArray(newCapacity, 0);
	        const newValues = newArray(newCapacity, 0);
	        const newState = newArray(newCapacity, 0);

	        this.lowWaterMark = chooseLowWaterMark(newCapacity, this.minLoadFactor);
	        this.highWaterMark = chooseHighWaterMark(newCapacity, this.maxLoadFactor);

	        this.table = newTable;
	        this.values = newValues;
	        this.state = newState;
	        this.freeEntries = newCapacity - this.distinct;

	        for (var i = 0; i < oldCapacity; i++) {
	            if (oldState[i] === FULL) {
	                var element = oldTable[i];
	                var index = this.indexOfInsertion(element);
	                newTable[index] = element;
	                newValues[index] = oldValues[i];
	                newState[index] = FULL;
	            }
	        }
	    }

	    forEachKey(callback) {
	        for (var i = 0; i < this.state.length; i++) {
	            if (this.state[i] === FULL) {
	                if (!callback(this.table[i])) return false;
	            }
	        }
	        return true;
	    }

	    forEachValue(callback) {
	        for (var i = 0; i < this.state.length; i++) {
	            if (this.state[i] === FULL) {
	                if (!callback(this.values[i])) return false;
	            }
	        }
	        return true;
	    }

	    forEachPair(callback) {
	        for (var i = 0; i < this.state.length; i++) {
	            if (this.state[i] === FULL) {
	                if (!callback(this.table[i], this.values[i])) return false;
	            }
	        }
	        return true;
	    }
	}

	module.exports = HashTable;

	function chooseLowWaterMark(capacity, minLoad) {
	    return (capacity * minLoad) | 0;
	}

	function chooseHighWaterMark(capacity, maxLoad) {
	    return Math.min(capacity - 2, (capacity * maxLoad) | 0);
	}

	function chooseGrowCapacity(size, minLoad, maxLoad) {
	    return nextPrime(Math.max(size + 1, (4 * size / (3 * minLoad + maxLoad)) | 0));
	}

	function chooseShrinkCapacity(size, minLoad, maxLoad) {
	    return nextPrime(Math.max(size + 1, (4 * size / (minLoad + 3 * maxLoad)) | 0));
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = newArray

	function newArray (n, value) {
	  n = n || 0
	  var array = new Array(n)
	  for (var i = 0; i < n; i++) {
	    array[i] = value
	  }
	  return array
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	const binarySearch = __webpack_require__(8);

	const largestPrime = 0x7fffffff;

	const primeNumbers = [
	    //chunk #0
	    largestPrime, // 2^31-1

	    //chunk #1
	    5, 11, 23, 47, 97, 197, 397, 797, 1597, 3203, 6421, 12853, 25717, 51437, 102877, 205759,
	    411527, 823117, 1646237, 3292489, 6584983, 13169977, 26339969, 52679969, 105359939,
	    210719881, 421439783, 842879579, 1685759167,

	    //chunk #2
	    433, 877, 1759, 3527, 7057, 14143, 28289, 56591, 113189, 226379, 452759, 905551, 1811107,
	    3622219, 7244441, 14488931, 28977863, 57955739, 115911563, 231823147, 463646329, 927292699,
	    1854585413,

	    //chunk #3
	    953, 1907, 3821, 7643, 15287, 30577, 61169, 122347, 244703, 489407, 978821, 1957651, 3915341,
	    7830701, 15661423, 31322867, 62645741, 125291483, 250582987, 501165979, 1002331963,
	    2004663929,

	    //chunk #4
	    1039, 2081, 4177, 8363, 16729, 33461, 66923, 133853, 267713, 535481, 1070981, 2141977, 4283963,
	    8567929, 17135863, 34271747, 68543509, 137087021, 274174111, 548348231, 1096696463,

	    //chunk #5
	    31, 67, 137, 277, 557, 1117, 2237, 4481, 8963, 17929, 35863, 71741, 143483, 286973, 573953,
	    1147921, 2295859, 4591721, 9183457, 18366923, 36733847, 73467739, 146935499, 293871013,
	    587742049, 1175484103,

	    //chunk #6
	    599, 1201, 2411, 4831, 9677, 19373, 38747, 77509, 155027, 310081, 620171, 1240361, 2480729,
	    4961459, 9922933, 19845871, 39691759, 79383533, 158767069, 317534141, 635068283, 1270136683,

	    //chunk #7
	    311, 631, 1277, 2557, 5119, 10243, 20507, 41017, 82037, 164089, 328213, 656429, 1312867,
	    2625761, 5251529, 10503061, 21006137, 42012281, 84024581, 168049163, 336098327, 672196673,
	    1344393353,

	    //chunk #8
	    3, 7, 17, 37, 79, 163, 331, 673, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899,
	    701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557,
	    359339171, 718678369, 1437356741,

	    //chunk #9
	    43, 89, 179, 359, 719, 1439, 2879, 5779, 11579, 23159, 46327, 92657, 185323, 370661, 741337,
	    1482707, 2965421, 5930887, 11861791, 23723597, 47447201, 94894427, 189788857, 379577741,
	    759155483, 1518310967,

	    //chunk #10
	    379, 761, 1523, 3049, 6101, 12203, 24407, 48817, 97649, 195311, 390647, 781301, 1562611,
	    3125257, 6250537, 12501169, 25002389, 50004791, 100009607, 200019221, 400038451, 800076929,
	    1600153859,

	    //chunk #11
	    13, 29, 59, 127, 257, 521, 1049, 2099, 4201, 8419, 16843, 33703, 67409, 134837, 269683,
	    539389, 1078787, 2157587, 4315183, 8630387, 17260781, 34521589, 69043189, 138086407,
	    276172823, 552345671, 1104691373,

	    //chunk #12
	    19, 41, 83, 167, 337, 677,
	    1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899,
	    701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557,
	    359339171, 718678369, 1437356741,

	    //chunk #13
	    53, 107, 223, 449, 907, 1823, 3659, 7321, 14653, 29311, 58631, 117269,
	    234539, 469099, 938207, 1876417, 3752839, 7505681, 15011389, 30022781,
	    60045577, 120091177, 240182359, 480364727, 960729461, 1921458943
	];

	primeNumbers.sort((a, b) => a - b);

	function nextPrime(value) {
	    let index = binarySearch(primeNumbers, value);
	    if (index < 0) {
	        index = -index - 1;
	    }
	    return primeNumbers[index];
	}

	exports.nextPrime = nextPrime;
	exports.largestPrime = largestPrime;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(15);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(16);


/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Real matrix
	 */
	class Matrix extends Array {
	    /**
	     * @constructor
	     * @param {number|Array|Matrix} nRows - Number of rows of the new matrix,
	     * 2D array containing the data or Matrix instance to clone
	     * @param {number} [nColumns] - Number of columns of the new matrix
	     */
	    constructor(nRows, nColumns) {
	        if (Matrix.isMatrix(nRows)) {
	            return nRows.clone();
	        } else if (Number.isInteger(nRows) && nRows > 0) { // Create an empty matrix
	            super(nRows);
	            if (Number.isInteger(nColumns) && nColumns > 0) {
	                for (var i = 0; i < nRows; i++) {
	                    this[i] = new Array(nColumns);
	                }
	            } else {
	                throw new TypeError('nColumns must be a positive integer');
	            }
	        } else if (Array.isArray(nRows)) { // Copy the values from the 2D array
	            var matrix = nRows;
	            nRows = matrix.length;
	            nColumns = matrix[0].length;
	            if (typeof nColumns !== 'number' || nColumns === 0) {
	                throw new TypeError('Data must be a 2D array with at least one element');
	            }
	            super(nRows);
	            for (var i = 0; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                }
	                this[i] = [].concat(matrix[i]);
	            }
	        } else {
	            throw new TypeError('First argument must be a positive number or an array');
	        }
	        this.rows = nRows;
	        this.columns = nColumns;
	    }

	    // Native array methods should return instances of Array, not Matrix
	    static get [Symbol.species]() {
	        return Array;
	    }

	    /**
	     * Constructs a Matrix with the chosen dimensions from a 1D array
	     * @param {number} newRows - Number of rows
	     * @param {number} newColumns - Number of columns
	     * @param {Array} newData - A 1D array containing data for the matrix
	     * @returns {Matrix} - The new matrix
	     */
	    static from1DArray(newRows, newColumns, newData) {
	        var length = newRows * newColumns;
	        if (length !== newData.length) {
	            throw new RangeError('Data length does not match given dimensions');
	        }
	        var newMatrix = new Matrix(newRows, newColumns);
	        for (var row = 0; row < newRows; row++) {
	            for (var column = 0; column < newColumns; column++) {
	                newMatrix[row][column] = newData[row * newColumns + column];
	            }
	        }
	        return newMatrix;
	    }

	    /**
	     * Creates a row vector, a matrix with only one row.
	     * @param {Array} newData - A 1D array containing data for the vector
	     * @returns {Matrix} - The new matrix
	     */
	    static rowVector(newData) {
	        var vector = new Matrix(1, newData.length);
	        for (var i = 0; i < newData.length; i++) {
	            vector[0][i] = newData[i];
	        }
	        return vector;
	    }

	    /**
	     * Creates a column vector, a matrix with only one column.
	     * @param {Array} newData - A 1D array containing data for the vector
	     * @returns {Matrix} - The new matrix
	     */
	    static columnVector(newData) {
	        var vector = new Matrix(newData.length, 1);
	        for (var i = 0; i < newData.length; i++) {
	            vector[i][0] = newData[i];
	        }
	        return vector;
	    }

	    /**
	     * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	     * @param {number} rows - Number of rows
	     * @param {number} columns - Number of columns
	     * @returns {Matrix} - The new matrix
	     */
	    static empty(rows, columns) {
	        return new Matrix(rows, columns);
	    }

	    /**
	     * Creates a matrix with the given dimensions. Values will be set to zero.
	     * @param {number} rows - Number of rows
	     * @param {number} columns - Number of columns
	     * @returns {Matrix} - The new matrix
	     */
	    static zeros(rows, columns) {
	        return Matrix.empty(rows, columns).fill(0);
	    }

	    /**
	     * Creates a matrix with the given dimensions. Values will be set to one.
	     * @param {number} rows - Number of rows
	     * @param {number} columns - Number of columns
	     * @returns {Matrix} - The new matrix
	     */
	    static ones(rows, columns) {
	        return Matrix.empty(rows, columns).fill(1);
	    }

	    /**
	     * Creates a matrix with the given dimensions. Values will be randomly set.
	     * @param {number} rows - Number of rows
	     * @param {number} columns - Number of columns
	     * @param {function} [rng] - Random number generator (default: Math.random)
	     * @returns {Matrix} The new matrix
	     */
	    static rand(rows, columns, rng) {
	        if (rng === undefined) rng = Math.random;
	        var matrix = Matrix.empty(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                matrix[i][j] = rng();
	            }
	        }
	        return matrix;
	    }

	    /**
	     * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.
	     * @param {number} rows - Number of rows
	     * @param {number} [columns] - Number of columns (Default: rows)
	     * @returns {Matrix} - The new identity matrix
	     */
	    static eye(rows, columns) {
	        if (columns === undefined) columns = rows;
	        var min = Math.min(rows, columns);
	        var matrix = Matrix.zeros(rows, columns);
	        for (var i = 0; i < min; i++) {
	            matrix[i][i] = 1;
	        }
	        return matrix;
	    }

	    /**
	     * Creates a diagonal matrix based on the given array.
	     * @param {Array} data - Array containing the data for the diagonal
	     * @param {number} [rows] - Number of rows (Default: data.length)
	     * @param {number} [columns] - Number of columns (Default: rows)
	     * @returns {Matrix} - The new diagonal matrix
	     */
	    static diag(data, rows, columns) {
	        var l = data.length;
	        if (rows === undefined) rows = l;
	        if (columns === undefined) columns = rows;
	        var min = Math.min(l, rows, columns);
	        var matrix = Matrix.zeros(rows, columns);
	        for (var i = 0; i < min; i++) {
	            matrix[i][i] = data[i];
	        }
	        return matrix;
	    }

	    /**
	     * Returns a matrix whose elements are the minimum between matrix1 and matrix2
	     * @param matrix1
	     * @param matrix2
	     * @returns {Matrix}
	     */
	    static min(matrix1, matrix2) {
	        var rows = matrix1.length;
	        var columns = matrix1[0].length;
	        var result = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for(var j = 0; j < columns; j++) {
	                result[i][j] = Math.min(matrix1[i][j], matrix2[i][j]);
	            }
	        }
	        return result;
	    }

	    /**
	     * Returns a matrix whose elements are the maximum between matrix1 and matrix2
	     * @param matrix1
	     * @param matrix2
	     * @returns {Matrix}
	     */
	    static max(matrix1, matrix2) {
	        var rows = matrix1.length;
	        var columns = matrix1[0].length;
	        var result = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for(var j = 0; j < columns; j++) {
	                result[i][j] = Math.max(matrix1[i][j], matrix2[i][j]);
	            }
	        }
	        return result;
	    }

	    /**
	     * Check that the provided value is a Matrix and tries to instantiate one if not
	     * @param value - The value to check
	     * @returns {Matrix}
	     */
	    static checkMatrix(value) {
	        return Matrix.isMatrix(value) ? value : new Matrix(value);
	    }

	    /**
	     * Returns true if the argument is a Matrix, false otherwise
	     * @param value - The value to check
	     * @return {boolean}
	     */
	    static isMatrix(value) {
	        return (value != null) && (value.klass === 'Matrix');
	    }

	    /**
	     * @property {number} - The number of elements in the matrix.
	     */
	    get size() {
	        return this.rows * this.columns;
	    }

	    /**
	     * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	     * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	     * @returns {Matrix} this
	     */
	    apply(callback) {
	        if (typeof callback !== 'function') {
	            throw new TypeError('callback must be a function');
	        }
	        var ii = this.rows;
	        var jj = this.columns;
	        for (var i = 0; i < ii; i++) {
	            for (var j = 0; j < jj; j++) {
	                callback.call(this, i, j);
	            }
	        }
	        return this;
	    }

	    /**
	     * Creates an exact and independent copy of the matrix
	     * @returns {Matrix}
	     */
	    clone() {
	        var newMatrix = new Matrix(this.rows, this.columns);
	        for (var row = 0; row < this.rows; row++) {
	            for (var column = 0; column < this.columns; column++) {
	                newMatrix[row][column] = this[row][column];
	            }
	        }
	        return newMatrix;
	    }

	    /**
	     * Returns a new 1D array filled row by row with the matrix values
	     * @returns {Array}
	     */
	    to1DArray() {
	        var array = new Array(this.size);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                array[i * this.columns + j] = this[i][j];
	            }
	        }
	        return array;
	    }

	    /**
	     * Returns a 2D array containing a copy of the data
	     * @returns {Array}
	     */
	    to2DArray() {
	        var copy = new Array(this.rows);
	        for (var i = 0; i < this.rows; i++) {
	            copy[i] = [].concat(this[i]);
	        }
	        return copy;
	    }

	    /**
	     * @returns {boolean} true if the matrix has one row
	     */
	    isRowVector() {
	        return this.rows === 1;
	    }

	    /**
	     * @returns {boolean} true if the matrix has one column
	     */
	    isColumnVector() {
	        return this.columns === 1;
	    }

	    /**
	     * @returns {boolean} true if the matrix has one row or one column
	     */
	    isVector() {
	        return (this.rows === 1) || (this.columns === 1);
	    }

	    /**
	     * @returns {boolean} true if the matrix has the same number of rows and columns
	     */
	    isSquare() {
	        return this.rows === this.columns;
	    }

	    /**
	     * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	     */
	    isSymmetric() {
	        if (this.isSquare()) {
	            for (var i = 0; i < this.rows; i++) {
	                for (var j = 0; j <= i; j++) {
	                    if (this[i][j] !== this[j][i]) {
	                        return false;
	                    }
	                }
	            }
	            return true;
	        }
	        return false;
	    }

	    /**
	     * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	     * @param {number} rowIndex - Index of the row
	     * @param {number} columnIndex - Index of the column
	     * @param {number} value - The new value for the element
	     * @returns {Matrix} this
	     */
	    set(rowIndex, columnIndex, value) {
	        this[rowIndex][columnIndex] = value;
	        return this;
	    }

	    /**
	     * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	     * @param {number} rowIndex - Index of the row
	     * @param {number} columnIndex - Index of the column
	     * @returns {number}
	     */
	    get(rowIndex, columnIndex) {
	        return this[rowIndex][columnIndex];
	    }

	    /**
	     * Fills the matrix with a given value. All elements will be set to this value.
	     * @param {number} value - New value
	     * @returns {Matrix} this
	     */
	    fill(value) {
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] = value;
	            }
	        }
	        return this;
	    }

	    /**
	     * Negates the matrix. All elements will be multiplied by (-1)
	     * @returns {Matrix} this
	     */
	    neg() {
	        return this.mulS(-1);
	    }

	    /**
	     * Returns a new array from the given row index
	     * @param {number} index - Row index
	     * @returns {Array}
	     */
	    getRow(index) {
	        checkRowIndex(this, index);
	        return [].concat(this[index]);
	    }

	    /**
	     * Returns a new row vector from the given row index
	     * @param {number} index - Row index
	     * @returns {Matrix}
	     */
	    getRowVector(index) {
	        return Matrix.rowVector(this.getRow(index));
	    }

	    /**
	     * Sets a row at the given index
	     * @param {number} index - Row index
	     * @param {Array|Matrix} array - Array or vector
	     * @returns {Matrix} this
	     */
	    setRow(index, array) {
	        checkRowIndex(this, index);
	        array = checkRowVector(this, array, true);
	        this[index] = array;
	        return this;
	    }

	    /**
	     * Removes a row from the given index
	     * @param {number} index - Row index
	     * @returns {Matrix} this
	     */
	    removeRow(index) {
	        checkRowIndex(this, index);
	        if (this.rows === 1)
	            throw new RangeError('A matrix cannot have less than one row');
	        this.splice(index, 1);
	        this.rows -= 1;
	        return this;
	    }

	    /**
	     * Adds a row at the given index
	     * @param {number} [index = this.rows] - Row index
	     * @param {Array|Matrix} array - Array or vector
	     * @returns {Matrix} this
	     */
	    addRow(index, array) {
	        if (array === undefined) {
	            array = index;
	            index = this.rows;
	        }
	        checkRowIndex(this, index, true);
	        array = checkRowVector(this, array, true);
	        this.splice(index, 0, array);
	        this.rows += 1;
	        return this;
	    }

	    /**
	     * Swaps two rows
	     * @param {number} row1 - First row index
	     * @param {number} row2 - Second row index
	     * @returns {Matrix} this
	     */
	    swapRows(row1, row2) {
	        checkRowIndex(this, row1);
	        checkRowIndex(this, row2);
	        var temp = this[row1];
	        this[row1] = this[row2];
	        this[row2] = temp;
	        return this;
	    }

	    /**
	     * Returns a new array from the given column index
	     * @param {number} index - Column index
	     * @returns {Array}
	     */
	    getColumn(index) {
	        checkColumnIndex(this, index);
	        var column = new Array(this.rows);
	        for (var i = 0; i < this.rows; i++) {
	            column[i] = this[i][index];
	        }
	        return column;
	    }

	    /**
	     * Returns a new column vector from the given column index
	     * @param {number} index - Column index
	     * @returns {Matrix}
	     */
	    getColumnVector(index) {
	        return Matrix.columnVector(this.getColumn(index));
	    }

	    /**
	     * Sets a column at the given index
	     * @param {number} index - Column index
	     * @param {Array|Matrix} array - Array or vector
	     * @returns {Matrix} this
	     */
	    setColumn(index, array) {
	        checkColumnIndex(this, index);
	        array = checkColumnVector(this, array);
	        for (var i = 0; i < this.rows; i++) {
	            this[i][index] = array[i];
	        }
	        return this;
	    }

	    /**
	     * Removes a column from the given index
	     * @param {number} index - Column index
	     * @returns {Matrix} this
	     */
	    removeColumn(index) {
	        checkColumnIndex(this, index);
	        if (this.columns === 1)
	            throw new RangeError('A matrix cannot have less than one column');
	        for (var i = 0; i < this.rows; i++) {
	            this[i].splice(index, 1);
	        }
	        this.columns -= 1;
	        return this;
	    }

	    /**
	     * Adds a column at the given index
	     * @param {number} [index = this.columns] - Column index
	     * @param {Array|Matrix} array - Array or vector
	     * @returns {Matrix} this
	     */
	    addColumn(index, array) {
	        if (typeof array === 'undefined') {
	            array = index;
	            index = this.columns;
	        }
	        checkColumnIndex(this, index, true);
	        array = checkColumnVector(this, array);
	        for (var i = 0; i < this.rows; i++) {
	            this[i].splice(index, 0, array[i]);
	        }
	        this.columns += 1;
	        return this;
	    }

	    /**
	     * Swaps two columns
	     * @param {number} column1 - First column index
	     * @param {number} column2 - Second column index
	     * @returns {Matrix} this
	     */
	    swapColumns(column1, column2) {
	        checkColumnIndex(this, column1);
	        checkColumnIndex(this, column2);
	        var temp, row;
	        for (var i = 0; i < this.rows; i++) {
	            row = this[i];
	            temp = row[column1];
	            row[column1] = row[column2];
	            row[column2] = temp;
	        }
	        return this;
	    }

	    /**
	     * Adds the values of a vector to each row
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    addRowVector(vector) {
	        vector = checkRowVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] += vector[j];
	            }
	        }
	        return this;
	    }

	    /**
	     * Subtracts the values of a vector from each row
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    subRowVector(vector) {
	        vector = checkRowVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] -= vector[j];
	            }
	        }
	        return this;
	    }

	    /**
	     * Multiplies the values of a vector with each row
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    mulRowVector(vector) {
	        vector = checkRowVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] *= vector[j];
	            }
	        }
	        return this;
	    }

	    /**
	     * Divides the values of each row by those of a vector
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    divRowVector(vector) {
	        vector = checkRowVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] /= vector[j];
	            }
	        }
	        return this;
	    }

	    /**
	     * Adds the values of a vector to each column
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    addColumnVector(vector) {
	        vector = checkColumnVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] += vector[i];
	            }
	        }
	        return this;
	    }

	    /**
	     * Subtracts the values of a vector from each column
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    subColumnVector(vector) {
	        vector = checkColumnVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] -= vector[i];
	            }
	        }
	        return this;
	    }

	    /**
	     * Multiplies the values of a vector with each column
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    mulColumnVector(vector) {
	        vector = checkColumnVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] *= vector[i];
	            }
	        }
	        return this;
	    }

	    /**
	     * Divides the values of each column by those of a vector
	     * @param {Array|Matrix} vector - Array or vector
	     * @returns {Matrix} this
	     */
	    divColumnVector(vector) {
	        vector = checkColumnVector(this, vector);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                this[i][j] /= vector[i];
	            }
	        }
	        return this;
	    }

	    /**
	     * Multiplies the values of a row with a scalar
	     * @param {number} index - Row index
	     * @param {number} value
	     * @returns {Matrix} this
	     */
	    mulRow(index, value) {
	        checkRowIndex(this, index);
	        for (var i = 0; i < this.columns; i++) {
	            this[index][i] *= value;
	        }
	        return this;
	    }

	    /**
	     * Multiplies the values of a column with a scalar
	     * @param {number} index - Column index
	     * @param {number} value
	     * @returns {Matrix} this
	     */
	    mulColumn(index, value) {
	        checkColumnIndex(this, index);
	        for (var i = 0; i < this.rows; i++) {
	            this[i][index] *= value;
	        }
	    }

	    /**
	     * Returns the maximum value of the matrix
	     * @returns {number}
	     */
	    max() {
	        var v = this[0][0];
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                if (this[i][j] > v) {
	                    v = this[i][j];
	                }
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the maximum value
	     * @returns {Array}
	     */
	    maxIndex() {
	        var v = this[0][0];
	        var idx = [0, 0];
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                if (this[i][j] > v) {
	                    v = this[i][j];
	                    idx[0] = i;
	                    idx[1] = j;
	                }
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns the minimum value of the matrix
	     * @returns {number}
	     */
	    min() {
	        var v = this[0][0];
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                if (this[i][j] < v) {
	                    v = this[i][j];
	                }
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the minimum value
	     * @returns {Array}
	     */
	    minIndex() {
	        var v = this[0][0];
	        var idx = [0, 0];
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                if (this[i][j] < v) {
	                    v = this[i][j];
	                    idx[0] = i;
	                    idx[1] = j;
	                }
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns the maximum value of one row
	     * @param {number} row - Row index
	     * @returns {number}
	     */
	    maxRow(row) {
	        checkRowIndex(this, row);
	        var v = this[row][0];
	        for (var i = 1; i < this.columns; i++) {
	            if (this[row][i] > v) {
	                v = this[row][i];
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the maximum value of one row
	     * @param {number} row - Row index
	     * @returns {Array}
	     */
	    maxRowIndex(row) {
	        checkRowIndex(this, row);
	        var v = this[row][0];
	        var idx = [row, 0];
	        for (var i = 1; i < this.columns; i++) {
	            if (this[row][i] > v) {
	                v = this[row][i];
	                idx[1] = i;
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns the minimum value of one row
	     * @param {number} row - Row index
	     * @returns {number}
	     */
	    minRow(row) {
	        checkRowIndex(this, row);
	        var v = this[row][0];
	        for (var i = 1; i < this.columns; i++) {
	            if (this[row][i] < v) {
	                v = this[row][i];
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the maximum value of one row
	     * @param {number} row - Row index
	     * @returns {Array}
	     */
	    minRowIndex(row) {
	        checkRowIndex(this, row);
	        var v = this[row][0];
	        var idx = [row, 0];
	        for (var i = 1; i < this.columns; i++) {
	            if (this[row][i] < v) {
	                v = this[row][i];
	                idx[1] = i;
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns the maximum value of one column
	     * @param {number} column - Column index
	     * @returns {number}
	     */
	    maxColumn(column) {
	        checkColumnIndex(this, column);
	        var v = this[0][column];
	        for (var i = 1; i < this.rows; i++) {
	            if (this[i][column] > v) {
	                v = this[i][column];
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the maximum value of one column
	     * @param {number} column - Column index
	     * @returns {Array}
	     */
	    maxColumnIndex(column) {
	        checkColumnIndex(this, column);
	        var v = this[0][column];
	        var idx = [0, column];
	        for (var i = 1; i < this.rows; i++) {
	            if (this[i][column] > v) {
	                v = this[i][column];
	                idx[0] = i;
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns the minimum value of one column
	     * @param {number} column - Column index
	     * @returns {number}
	     */
	    minColumn(column) {
	        checkColumnIndex(this, column);
	        var v = this[0][column];
	        for (var i = 1; i < this.rows; i++) {
	            if (this[i][column] < v) {
	                v = this[i][column];
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the index of the minimum value of one column
	     * @param {number} column - Column index
	     * @returns {Array}
	     */
	    minColumnIndex(column) {
	        checkColumnIndex(this, column);
	        var v = this[0][column];
	        var idx = [0, column];
	        for (var i = 1; i < this.rows; i++) {
	            if (this[i][column] < v) {
	                v = this[i][column];
	                idx[0] = i;
	            }
	        }
	        return idx;
	    }

	    /**
	     * Returns an array containing the diagonal values of the matrix
	     * @returns {Array}
	     */
	    diag() {
	        var min = Math.min(this.rows, this.columns);
	        var diag = new Array(min);
	        for (var i = 0; i < min; i++) {
	            diag[i] = this[i][i];
	        }
	        return diag;
	    }

	    /**
	     * Returns the sum of all elements of the matrix
	     * @returns {number}
	     */
	    sum() {
	        var v = 0;
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                v += this[i][j];
	            }
	        }
	        return v;
	    }

	    /**
	     * Returns the mean of all elements of the matrix
	     * @returns {number}
	     */
	    mean() {
	        return this.sum() / this.size;
	    }

	    /**
	     * Returns the product of all elements of the matrix
	     * @returns {number}
	     */
	    prod() {
	        var prod = 1;
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                prod *= this[i][j];
	            }
	        }
	        return prod;
	    }

	    /**
	     * Computes the cumulative sum of the matrix elements (in place, row by row)
	     * @returns {Matrix} this
	     */
	    cumulativeSum() {
	        var sum = 0;
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                sum += this[i][j];
	                this[i][j] = sum;
	            }
	        }
	        return this;
	    }

	    /**
	     * Computes the dot (scalar) product between the matrix and another
	     * @param {Matrix} vector2 vector
	     * @returns {number}
	     */
	    dot(vector2) {
	        if (Matrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
	        var vector1 = this.to1DArray();
	        if (vector1.length !== vector2.length) {
	            throw new RangeError('vectors do not have the same size');
	        }
	        var dot = 0;
	        for (var i = 0; i < vector1.length; i++) {
	            dot += vector1[i] * vector2[i];
	        }
	        return dot;
	    }

	    /**
	     * Returns the matrix product between this and other
	     * @param {Matrix} other
	     * @returns {Matrix}
	     */
	    mmul(other) {
	        other = Matrix.checkMatrix(other);
	        if (this.columns !== other.rows)
	            console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	        var m = this.rows;
	        var n = this.columns;
	        var p = other.columns;

	        var result = new Matrix(m, p);

	        var Bcolj = new Array(n);
	        for (var j = 0; j < p; j++) {
	            for (var k = 0; k < n; k++)
	                Bcolj[k] = other[k][j];

	            for (var i = 0; i < m; i++) {
	                var Arowi = this[i];

	                var s = 0;
	                for (k = 0; k < n; k++)
	                    s += Arowi[k] * Bcolj[k];

	                result[i][j] = s;
	            }
	        }
	        return result;
	    }

	    /**
	     * Returns the Kronecker product (also known as tensor product) between this and other
	     * See https://en.wikipedia.org/wiki/Kronecker_product
	     * @param {Matrix} other
	     * @return {Matrix}
	     */
	    kroneckerProduct(other) {
	        other = Matrix.checkMatrix(other);

	        var m = this.rows;
	        var n = this.columns;
	        var p = other.rows;
	        var q = other.columns;

	        var result = new Matrix(m * p, n * q);
	        for (var i = 0; i < m; i++) {
	            for (var j = 0; j < n; j++) {
	                for (var k = 0; k < p; k++) {
	                    for (var l = 0; l < q; l++) {
	                        result[p * i + k][q * j + l] = this[i][j] * other[k][l];
	                    }
	                }
	            }
	        }
	        return result;
	    }

	    /**
	     * Transposes the matrix and returns a new one containing the result
	     * @returns {Matrix}
	     */
	    transpose() {
	        var result = new Matrix(this.columns, this.rows);
	        for (var i = 0; i < this.rows; i++) {
	            for (var j = 0; j < this.columns; j++) {
	                result[j][i] = this[i][j];
	            }
	        }
	        return result;
	    }

	    /**
	     * Sorts the rows (in place)
	     * @param {function} compareFunction - usual Array.prototype.sort comparison function
	     * @returns {Matrix} this
	     */
	    sortRows(compareFunction) {
	        if (compareFunction === undefined) compareFunction = compareNumbers;
	        for (var i = 0; i < this.rows; i++) {
	            this[i].sort(compareFunction);
	        }
	        return this;
	    }

	    /**
	     * Sorts the columns (in place)
	     * @param {function} compareFunction - usual Array.prototype.sort comparison function
	     * @returns {Matrix} this
	     */
	    sortColumns(compareFunction) {
	        if (compareFunction === undefined) compareFunction = compareNumbers;
	        for (var i = 0; i < this.columns; i++) {
	            this.setColumn(i, this.getColumn(i).sort(compareFunction));
	        }
	        return this;
	    }

	    /**
	     * Returns a subset of the matrix
	     * @param {number} startRow - First row index
	     * @param {number} endRow - Last row index
	     * @param {number} startColumn - First column index
	     * @param {number} endColumn - Last column index
	     * @returns {Matrix}
	     */
	    subMatrix(startRow, endRow, startColumn, endColumn) {
	        if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns)) {
	            throw new RangeError('Argument out of range');
	        }
	        var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	        for (var i = startRow; i <= endRow; i++) {
	            for (var j = startColumn; j <= endColumn; j++) {
	                newMatrix[i - startRow][j - startColumn] = this[i][j];
	            }
	        }
	        return newMatrix;
	    }

	    /**
	     * Returns a subset of the matrix based on an array of row indices
	     * @param {Array} indices - Array containing the row indices
	     * @param {number} [startColumn = 0] - First column index
	     * @param {number} [endColumn = this.columns-1] - Last column index
	     * @returns {Matrix}
	     */
	    subMatrixRow(indices, startColumn, endColumn) {
	        if (startColumn === undefined) startColumn = 0;
	        if (endColumn === undefined) endColumn = this.columns - 1;
	        if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns)) {
	            throw new RangeError('Argument out of range');
	        }

	        var newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);
	        for (var i = 0; i < indices.length; i++) {
	            for (var j = startColumn; j <= endColumn; j++) {
	                if (indices[i] < 0 || indices[i] >= this.rows) {
	                    throw new RangeError('Row index out of range: ' + indices[i]);
	                }
	                newMatrix[i][j - startColumn] = this[indices[i]][j];
	            }
	        }
	        return newMatrix;
	    }

	    /**
	     * Returns a subset of the matrix based on an array of column indices
	     * @param {Array} indices - Array containing the column indices
	     * @param {number} [startRow = 0] - First row index
	     * @param {number} [endRow = this.rows-1] - Last row index
	     * @returns {Matrix}
	     */
	    subMatrixColumn(indices, startRow, endRow) {
	        if (startRow === undefined) startRow = 0;
	        if (endRow === undefined) endRow = this.rows - 1;
	        if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows)) {
	            throw new RangeError('Argument out of range');
	        }

	        var newMatrix = new Matrix(endRow - startRow + 1, indices.length);
	        for (var i = 0; i < indices.length; i++) {
	            for (var j = startRow; j <= endRow; j++) {
	                if (indices[i] < 0 || indices[i] >= this.columns) {
	                    throw new RangeError('Column index out of range: ' + indices[i]);
	                }
	                newMatrix[j - startRow][i] = this[j][indices[i]];
	            }
	        }
	        return newMatrix;
	    }

	    /**
	     * Returns the trace of the matrix (sum of the diagonal elements)
	     * @returns {number}
	     */
	    trace() {
	        var min = Math.min(this.rows, this.columns);
	        var trace = 0;
	        for (var i = 0; i < min; i++) {
	            trace += this[i][i];
	        }
	        return trace;
	    }
	}

	Matrix.prototype.klass = 'Matrix';

	module.exports = Matrix;

	/**
	 * @private
	 * Check that a row index is not out of bounds
	 * @param {Matrix} matrix
	 * @param {number} index
	 * @param {boolean} [outer]
	 */
	function checkRowIndex(matrix, index, outer) {
	    var max = outer ? matrix.rows : matrix.rows - 1;
	    if (index < 0 || index > max)
	        throw new RangeError('Row index out of range');
	}

	/**
	 * @private
	 * Check that the provided vector is an array with the right length
	 * @param {Matrix} matrix
	 * @param {Array|Matrix} vector
	 * @param {boolean} copy
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	function checkRowVector(matrix, vector, copy) {
	    if (Matrix.isMatrix(vector)) {
	        vector = vector.to1DArray();
	    } else if (copy) {
	        vector = [].concat(vector);
	    }
	    if (vector.length !== matrix.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	}

	/**
	 * @private
	 * Check that the provided vector is an array with the right length
	 * @param {Matrix} matrix
	 * @param {Array|Matrix} vector
	 * @param {boolean} copy
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	function checkColumnVector(matrix, vector, copy) {
	    if (Matrix.isMatrix(vector)) {
	        vector = vector.to1DArray();
	    } else if (copy) {
	        vector = [].concat(vector);
	    }
	    if (vector.length !== matrix.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	}

	/**
	 * @private
	 * Check that a column index is not out of bounds
	 * @param {Matrix} matrix
	 * @param {number} index
	 * @param {boolean} [outer]
	 */
	function checkColumnIndex(matrix, index, outer) {
	    var max = outer ? matrix.columns : matrix.columns - 1;
	    if (index < 0 || index > max)
	        throw new RangeError('Column index out of range');
	}

	/**
	 * @private
	 * Check that two matrices have the same dimensions
	 * @param {Matrix} matrix
	 * @param {Matrix} otherMatrix
	 */
	function checkDimensions(matrix, otherMatrix) {
	    if (matrix.rows !== otherMatrix.length ||
	        matrix.columns !== otherMatrix[0].length) {
	        throw new RangeError('Matrices dimensions must be equal');
	    }
	}

	function compareNumbers(a, b) {
	    return a - b;
	}

	/*
	Synonyms
	 */

	Matrix.random = Matrix.rand;
	Matrix.diagonal = Matrix.diag;
	Matrix.prototype.diagonal = Matrix.prototype.diag;
	Matrix.identity = Matrix.eye;
	Matrix.prototype.negate = Matrix.prototype.neg;
	Matrix.prototype.tensorProduct = Matrix.prototype.kroneckerProduct;

	/*
	Add dynamically instance and static methods for mathematical operations
	 */

	var inplaceOperator = `
	(function %name%(value) {
	    if (typeof value === 'number') return this.%name%S(value);
	    return this.%name%M(value);
	})
	`;

	var inplaceOperatorScalar = `
	(function %name%S(value) {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this[i][j] = this[i][j] %op% value;
	        }
	    }
	    return this;
	})
	`;

	var inplaceOperatorMatrix = `
	(function %name%M(matrix) {
	    checkDimensions(this, matrix);
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this[i][j] = this[i][j] %op% matrix[i][j];
	        }
	    }
	    return this;
	})
	`;

	var staticOperator = `
	(function %name%(matrix, value) {
	    var newMatrix = new Matrix(matrix);
	    return newMatrix.%name%(value);
	})
	`;

	var inplaceMethod = `
	(function %name%() {
	    for (var i = 0; i < this.rows; i++) {
	        for (var j = 0; j < this.columns; j++) {
	            this[i][j] = %method%(this[i][j]);
	        }
	    }
	    return this;
	})
	`;

	var staticMethod = `
	(function %name%(matrix) {
	    var newMatrix = new Matrix(matrix);
	    return newMatrix.%name%();
	})
	`;

	var operators = [
	    // Arithmetic operators
	    ['+', 'add'],
	    ['-', 'sub', 'subtract'],
	    ['*', 'mul', 'multiply'],
	    ['/', 'div', 'divide'],
	    ['%', 'mod', 'modulus'],
	    // Bitwise operators
	    ['&', 'and'],
	    ['|', 'or'],
	    ['^', 'xor'],
	    ['<<', 'leftShift'],
	    ['>>', 'signPropagatingRightShift'],
	    ['>>>', 'rightShift', 'zeroFillRightShift']
	];

	for (var operator of operators) {
	    for (var i = 1; i < operator.length; i++) {
	        Matrix.prototype[operator[i]] = eval(fillTemplateFunction(inplaceOperator, {name: operator[i], op: operator[0]}));
	        Matrix.prototype[operator[i] + 'S'] = eval(fillTemplateFunction(inplaceOperatorScalar, {name: operator[i] + 'S', op: operator[0]}));
	        Matrix.prototype[operator[i] + 'M'] = eval(fillTemplateFunction(inplaceOperatorMatrix, {name: operator[i] + 'M', op: operator[0]}));

	        Matrix[operator[i]] = eval(fillTemplateFunction(staticOperator, {name: operator[i]}));
	    }
	}

	var methods = [
	    ['~', 'not']
	];

	[
	    'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil',
	    'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p',
	    'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
	].forEach(function (mathMethod) {
	    methods.push(['Math.' + mathMethod, mathMethod]);
	});

	for (var method of methods) {
	    for (var i = 1; i < method.length; i++) {
	        Matrix.prototype[method[i]] = eval(fillTemplateFunction(inplaceMethod, {name: method[i], method: method[0]}));
	        Matrix[method[i]] = eval(fillTemplateFunction(staticMethod, {name: method[i]}));
	    }
	}

	function fillTemplateFunction(template, values) {
	    for (var i in values) {
	        template = template.replace(new RegExp('%' + i + '%', 'g'), values[i]);
	    }
	    return template;
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(15);

	var SingularValueDecomposition = __webpack_require__(17);
	var EigenvalueDecomposition = __webpack_require__(19);
	var LuDecomposition = __webpack_require__(20);
	var QrDecomposition = __webpack_require__(21);
	var CholeskyDecomposition = __webpack_require__(22);

	function inverse(matrix) {
	    matrix = Matrix.checkMatrix(matrix);
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.inverse = Matrix.inv = inverse;
	Matrix.prototype.inverse = Matrix.prototype.inv = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    leftHandSide = Matrix.checkMatrix(leftHandSide);
	    rightHandSide = Matrix.checkMatrix(rightHandSide);
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.solve = solve;
	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(15);
	var util = __webpack_require__(18);
	var hypotenuse = util.hypotenuse;
	var getFilled2DArray = util.getFilled2DArray;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    var a;
	    if (m < n) {
	        if (!autoTranspose) {
	            a = value.clone();
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = value.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    } else {
	        a = value.clone();
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = getFilled2DArray(m, nu, 0),
	        V = getFilled2DArray(n, n, 0),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        if (!Matrix.isMatrix(this.U)) {
	            this.U = new Matrix(this.U);
	        }
	        return this.U;
	    },
	    get rightSingularVectors() {
	        if (!Matrix.isMatrix(this.V)) {
	            this.V = new Matrix(this.V);
	        }
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }

	        var U = this.U;
	        var V = this.rightSingularVectors;

	        var VL = V.mmul(Ls),
	            vrows = V.rows,
	            urows = U.length,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var V = this.V;
	        var e = this.threshold,
	            vrows = V.length,
	            vcols = V[0].length,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var U = this.U;

	        var urows = U.length,
	            ucols = U[0].length,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    if (Math.abs(a) > Math.abs(b)) {
	        var r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        var r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};

	// For use in the decomposition algorithms. With big matrices, access time is
	// too long on elements from array subclass
	// todo check when it is fixed in v8
	// http://jsperf.com/access-and-write-array-subclass
	exports.getEmpty2DArray = function (rows, columns) {
	    var array = new Array(rows);
	    for (var i = 0; i < rows; i++) {
	        array[i] = new Array(columns);
	    }
	    return array;
	};

	exports.getFilled2DArray = function (rows, columns, value) {
	    var array = new Array(rows);
	    for (var i = 0; i < rows; i++) {
	        array[i] = new Array(columns);
	        for (var j = 0; j < columns; j++) {
	            array[i][j] = value;
	        }
	    }
	    return array;
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Matrix = __webpack_require__(15);
	const util = __webpack_require__(18);
	const hypotenuse = util.hypotenuse;
	const getFilled2DArray = util.getFilled2DArray;

	const defaultOptions = {
	    assumeSymmetric: false
	};

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix, options) {
	    options = Object.assign({}, defaultOptions, options);
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix, options);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = getFilled2DArray(n, n, 0),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    var isSymmetric = false;
	    if (options.assumeSymmetric) {
	        isSymmetric = true;
	    } else {
	        isSymmetric = matrix.isSymmetric();
	    }

	    if (isSymmetric) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value.get(i, j);
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = getFilled2DArray(n, n, 0),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value.get(i, j);
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        if (!Matrix.isMatrix(this.V)) {
	            this.V = new Matrix(this.V);
	        }
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(15);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularMatrix() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularMatrix() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(15);
	var hypotenuse = __webpack_require__(18).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularMatrix() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalMatrix() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(15);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get lowerTriangularMatrix() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var extend = __webpack_require__(24);

	var defaultOptions = {
	    size: 1,
	    value: 0
	};

	/**
	 * Case when the entry is an array
	 * @param data
	 * @param options
	 * @returns {Array}
	 */
	function arrayCase(data, options) {
	    var len = data.length;
	    if (typeof options.size === 'number')
	        options.size = [options.size, options.size];

	    var cond = len + options.size[0] + options.size[1];

	    var output;
	    if (options.output) {
	        if (options.output.length !== cond)
	            throw new RangeError('Wrong output size');
	        output = options.output;
	    }
	    else
	        output = new Array(cond);

	    var i;

	    // circular option
	    if (options.value === 'circular') {
	        for (i = 0; i < cond; i++) {
	            if (i < options.size[0])
	                output[i] = data[((len - (options.size[0] % len)) + i) % len];
	            else if (i < (options.size[0] + len))
	                output[i] = data[i - options.size[0]];
	            else
	                output[i] = data[(i - options.size[0]) % len];
	        }
	    }

	    // replicate option
	    else if (options.value === 'replicate') {
	        for (i = 0; i < cond; i++) {
	            if (i < options.size[0])
	                output[i] = data[0];
	            else if (i < (options.size[0] + len))
	                output[i] = data[i - options.size[0]];
	            else
	                output[i] = data[len - 1];
	        }
	    }

	    // symmetric option
	    else if (options.value === 'symmetric') {
	        if ((options.size[0] > len) || (options.size[1] > len))
	            throw new RangeError('expanded value should not be bigger than the data length');
	        for (i = 0; i < cond; i++) {
	            if (i < options.size[0])
	                output[i] = data[options.size[0] - 1 - i];
	            else if (i < (options.size[0] + len))
	                output[i] = data[i - options.size[0]];
	            else
	                output[i] = data[2*len + options.size[0] - i - 1];
	        }
	    }

	    // default option
	    else {
	        for (i = 0; i < cond; i++) {
	            if (i < options.size[0])
	                output[i] = options.value;
	            else if (i < (options.size[0] + len))
	                output[i] = data[i - options.size[0]];
	            else
	                output[i] = options.value;
	        }
	    }

	    return output;
	}

	/**
	 * Case when the entry is a matrix
	 * @param data
	 * @param options
	 * @returns {Array}
	 */
	function matrixCase(data, options) {
	    var row = data.length;
	    var col = data[0].length;
	    if (options.size[0] === undefined)
	        options.size = [options.size, options.size, options.size, options.size];
	    throw new Error('matrix not supported yet, sorry');
	}

	/**
	 * Pads and array
	 * @param {Array <number>} data
	 * @param {object} options
	 */
	function padArray (data, options) {
	    options = extend({}, defaultOptions, options);

	    if (Array.isArray(data)) {
	        if (Array.isArray(data[0]))
	            return matrixCase(data, options);
	        else
	            return arrayCase(data, options);
	    }
	    else
	        throw new TypeError('data should be an array');
	}

	module.exports = padArray;


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.SimpleLinearRegression = exports.SLR = __webpack_require__(26);
	exports.NonLinearRegression = exports.NLR = {
	    PolynomialRegression: __webpack_require__(29),
	    PotentialRegression: __webpack_require__(30),
	    ExpRegression: __webpack_require__(31),
	    PowerRegression: __webpack_require__(32)
	};
	exports.KernelRidgeRegression = exports.KRR = __webpack_require__(33);
	//exports.MultipleLinearRegression = exports.MLR = require('./regression/multiple-linear-regression');
	//exports.MultivariateLinearRegression = exports.MVLR = require('./regression/multivariate-linear-regression');


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var maybeToPrecision = __webpack_require__(27).maybeToPrecision;
	const BaseRegression = __webpack_require__(28);


	class SimpleLinearRegression extends BaseRegression {

	    constructor(x, y, options) {
	        options = options || {};
	        super();
	        if(x===true){
	            this.slope = y.slope;
	            this.intercept = y.intercept;
	            if(y.r){
	                this.r = y.r;
	                this.r2 = y.r2;
	            }
	        }
	        else{
	            var n = x.length;
	            if (n !== y.length) {
	                throw new RangeError('input and output array have a different length');
	            }

	            var xSum = 0;
	            var ySum = 0;

	            var xSquared = 0;
	            var ySquared = 0;
	            var xY = 0;

	            for (var i = 0; i < n; i++) {
	                xSum += x[i];
	                ySum += y[i];
	                xSquared += x[i] * x[i];
	                ySquared += y[i] * y[i];
	                xY += x[i] * y[i];
	            }

	            var numerator = (n * xY - xSum * ySum);


	            this.slope = numerator / (n * xSquared - xSum * xSum);
	            this.intercept = (1 / n) * ySum - this.slope * (1 / n) * xSum;
	            this.coefficients = [this.intercept, this.slope];
	            if(options.computeCoefficient){
	                this.r = this.rCoefficient(x,y);
	                this.r2 = this.r*this.r;
	            }
	        }

	    }
	    
	    toJSON() {
	        var out = {
	            name: "simpleLinearRegression",
	            slope: this.slope,
	            intercept: this.intercept
	        }
	        if (this.r) {
	            out. r=this.r;
	            out.r2 = this.r2;
	        }

	        return out;
	    }

	    _compute(input) {
	        return this.slope * input + this.intercept;
	    };

	    computeX(input) {
	        return (input - this.intercept) / this.slope;
	    };

	    toString(precision) {
	        var result = 'y = ';
	        if (this.slope) {
	            var xFactor = maybeToPrecision(this.slope, precision);
	            result += (xFactor == 1 ? '' : xFactor) + 'x';
	            if (this.intercept) {
	                var absIntercept = Math.abs(this.intercept);
	                var operator = absIntercept === this.intercept ? '+' : '-';
	                result += ' ' + operator + ' ' + maybeToPrecision(absIntercept, precision);
	            }
	        } else {
	            result += maybeToPrecision(this.intercept, precision);
	        }
	        return result;
	    };

	    static load(json) {
	        if (json.name !== 'simpleLinearRegression') {
	            throw new TypeError('not a SLR model');
	        }
	        return new SimpleLinearRegression(true, json);
	    }
	}

	module.exports = SimpleLinearRegression;


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	exports.maybeToPrecision = function maybeToPrecision(value, digits) {
	    if (digits) return value.toPrecision(digits);
	    else return value.toString();
	};


/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	class BaseRegression {
	    compute(x) {
	        var y2;
	        if(Array.isArray(x)){
	            y2 = new Array(x.length);
	            for(var i=0;i<x.length;i++){
	                y2[i]=this._compute(x[i]);
	            }
	        }
	        else if(Number.isFinite(x)){
	                y2 = this._compute(x);
	        } else {
	            throw new TypeError('x must be a number or array')
	        }
	        return y2;
	    }

	    _compute(x) {
	        throw new Error('_compute not implemented');
	    }
	    
	    /**
	     * Return the correlation coefficient of determination (r).
	     * @param x
	     * @param y
	     * @returns {number}
	     */
	    rCoefficient(x, y) {
	        let n = x.length;
	        var y2 = new Array(n);
	        for (var i = 0; i < n; i++) {
	            y2[i]=this._compute(x[i]);
	        }
	        var xSum = 0;
	        var ySum = 0;

	        var xSquared = 0;
	        var ySquared = 0;
	        var xY = 0;

	        for (var i = 0; i < n; i++) {
	            xSum += y2[i];
	            ySum += y[i];
	            xSquared += y2[i] * y2[i];
	            ySquared += y[i] * y[i];
	            xY += y2[i] * y[i];
	        }

	        return (n*xY-xSum*ySum)/Math.sqrt((n*xSquared-xSum*xSum)*(n*ySquared-ySum*ySum));
	    }
	}

	module.exports = BaseRegression;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Function that return a constants of the M degree polynomial that
	 * fit the given points, this constants is given from lower to higher
	 * order of the polynomial.
	 *
	 * @param {Vector} X - Vector of the x positions of the points.
	 * @param {Vector} Y - Vector of the y positions of the points.
	 * @param {Number|BigNumber} M - Degree of the polynomial.
	 * @param {Vector} constants - Vector of constants of the function.
	 * Created by acastillo on 5/12/16.
	 */

	const maybeToPrecision = __webpack_require__(27).maybeToPrecision;
	const BaseRegression = __webpack_require__(28);
	var Matrix = __webpack_require__(14);


	class PolynomialRegression extends BaseRegression{
	    /**
	     * @constructor
	     * @param x: Independent variable
	     * @param y: Dependent variable
	     * @param M: Maximum degree of the polynomial
	     * @param options
	     */
	    constructor(x, y, M, options) {
	        super();
	        let opt = options||{};
	        if (x === true) { // reloading model
	            this.coefficients = outputs.coefficients;
	            this.powers = outputs.powers;
	            this.M = outputs.M;
	            if(y.r){
	                this.r = y.r;
	                this.r2 = y.r2;
	            }
	        } else {
	            var n = x.length;
	            if (n !== y.length) {
	                throw new RangeError('input and output array have a different length');
	            }
	            if(Array.isArray(M)){
	                var powers = M;
	                M = powers.length;
	            }
	            else{
	                M++;
	                var powers = new Array(M);
	                for( k = 0; k < M; k++) {
	                    powers[k]=k;
	                }
	            }
	            var F = new Matrix(n, M);
	            var Y = new Matrix([y]);
	            var k,i;
	            for( k = 0; k < M; k++) {
	                for(i=0; i< n;i++){
	                    if(powers[k]==0)
	                        F[i][k]=1;
	                    else{
	                        F[i][k]=Math.pow(x[i],powers[k]);
	                    }
	                }
	            }

	            var FT = F.transpose();
	            var A = FT.mmul(F);
	            var B = FT.mmul(Y.transpose());

	            this.coefficients = A.solve(B);
	            this.powers = powers;
	            this.M = M-1;
	            if(opt.computeCoefficient){
	                this.r = this.rCoefficient(x,y);
	                this.r2 = this.r*this.r;
	            }
	        }
	    }

	    _compute(x) {
	        var y =0;
	        for(var  k = 0; k < this.powers.length; k++) {
	            y+=this.coefficients[k]*Math.pow(x,this.powers[k]);
	        }
	        return y;
	    }

	    toJSON() {
	        var out = {name: 'polynomialRegression',
	            coefficients: this.coefficients,
	            powers: this.powers,
	            M: this.M
	        };

	        if(this.r){
	            out.r = this.r;
	            out.r2=this.r2;
	        }
	        return out;
	    }

	    toString(precision){
	        var fn =  "",str;
	        for(var  k = 0; k < this.coefficients.length ; k++) {
	            str="";
	            if(this.coefficients[k]!=0) {
	                if (this.powers[k] == 0)
	                    str = maybeToPrecision(this.coefficients[k], precision);
	                else {
	                    if (this.powers[k] == 1)
	                        str = maybeToPrecision(this.coefficients[k], precision) + "*x";
	                    else {
	                        str = maybeToPrecision(this.coefficients[k], precision) + "*x^" + this.powers[k];
	                    }
	                }
	                if (this.coefficients[k] > 0)
	                    str= "+"+str;
	            }
	            fn=str+fn;
	        }
	        if(fn.charAt(0)=='+'){
	            fn.splice(0,1);
	        }

	        return fn;
	    }

	    static load(json) {
	        if (json.name !== 'polynomialRegression') {
	            throw new TypeError('not a polynomial regression model');
	        }
	        return new PolynomialRegression(true, json);
	    }
	}

	module.exports = PolynomialRegression;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * Function that calculate the potential fit in the form f(x) = A*x^M
	 * with a given M and return de A coefficient.
	 *
	 * @param {Vector} X - Vector of the x positions of the points.
	 * @param {Vector} Y - Vector of the x positions of the points.
	 * @param {Number, BigNumber} M - The exponent of the potential fit.
	 * @return {Number|BigNumber} A - The A coefficient of the potential fit.
	 * Created by acastillo on 5/12/16.
	 */

	const maybeToPrecision = __webpack_require__(27).maybeToPrecision;
	const PolynomialRegression = __webpack_require__(29);
	const BaseRegression = __webpack_require__(28);

	class PotentialRegression extends BaseRegression{
	    /**
	     * @constructor
	     * @param x: Independent variable
	     * @param y: Dependent variable
	     * @param options
	     */
	    constructor(x, y, M,options) {
	        super();
	        let opt = options||{};
	        if (x === true) { // reloading model
	            this.A = outputs.A;
	            this.M = outputs.M;
	            if(y.r){
	                this.r = y.r;
	                this.r2 = y.r2;
	            }
	        } else {
	            var n = x.length;
	            if (n !== y.length) {
	                throw new RangeError('input and output array have a different length');
	            }

	            var linear = new PolynomialRegression(x, y, [M] ,{computeCoefficient:true});
	            this.A = linear.coefficients[0];
	            this.M = M;
	            if(opt.computeCoefficient){
	                this.r = this.rCoefficient(x,y);
	                this.r2 = this.r*this.r;
	            }
	        }
	    }

	    _compute(x) {
	        return this.A*Math.pow(x,this.M);
	    }

	    toJSON() {
	        var out = {name: 'potentialRegression', A: this.A, M: this.M};
	        if(this.r){
	            out.r = this.r;
	            out.r2=this.r2;
	        }
	        return out;
	    }

	    toString(precision){
	        return maybeToPrecision(this.A, precision)+"*x^"+this.M;
	    }

	    static load(json) {
	        if (json.name !== 'potentialRegression') {
	            throw new TypeError('not a potential regression model');
	        }
	        return new PowerRegression(true, json);
	    }
	}

	module.exports = PotentialRegression;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * Function that calculate the linear fit in the form f(x) = Ce^(A * x) and
	 * return the A and C coefficient of the given formula.
	 *
	 * @param {Vector} X - Vector of the x positions of the points.
	 * @param {Vector} Y - Vector of the y positions of the points.
	 * @return {Object} coefficients - The A and C coefficients.
	 *
	 * Created by acastillo on 5/12/16.
	 */

	const maybeToPrecision = __webpack_require__(27).maybeToPrecision;
	const SimpleLinearRegression = __webpack_require__(26);
	const BaseRegression = __webpack_require__(28);

	class ExpRegression extends BaseRegression{
	    /**
	     * @constructor
	     * @param x: Independent variable
	     * @param y: Dependent variable
	     * @param options
	     */
	    constructor(x, y, options) {
	        super();
	        let opt = options||{};
	        if (x === true) { // reloading model
	            this.A = outputs.A;
	            this.C = outputs.C;
	            if(y.r){
	                this.r = y.r;
	                this.r2 = y.r2;
	            }
	        } else {
	            var n = x.length;
	            if (n !== y.length) {
	                throw new RangeError('input and output array have a different length');
	            }
	            var yl = new Array(n);
	            for (var i = 0; i < n; i++) {
	                yl[i]=Math.log(y[i]);
	            }

	            var linear = new SimpleLinearRegression(x, yl, {computeCoefficient:false});
	            this.A = linear.slope;
	            this.C = Math.exp(linear.intercept);
	            if(opt.computeCoefficient){
	                this.r = this.rCoefficient(x,y);
	                this.r2 = this.r*this.r;
	            }
	        }
	    }

	    _compute(newInputs) {
	        return this.C*Math.exp(newInputs*this.A);
	    }

	    toJSON() {
	        var out = {name: 'expRegression', A: this.A, C: this.C};
	        if(this.r){
	            out.r = this.r;
	            out.r2=this.r2;
	        }
	        return out;
	    }

	    toString(precision){
	        return maybeToPrecision(this.C, precision)+"*exp("+maybeToPrecision(this.A, precision)+"*x)";
	    }

	    static load(json) {
	        if (json.name !== 'expRegression') {
	            throw new TypeError('not a exp regression model');
	        }
	        return new expRegression(true, json);
	    }
	}



	module.exports = ExpRegression;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This class implements the power regression f(x)=A*x^B
	 * Created by acastillo on 5/12/16.
	 */

	const maybeToPrecision = __webpack_require__(27).maybeToPrecision;
	const SimpleLinearRegression = __webpack_require__(26);
	const BaseRegression = __webpack_require__(28);

	class PowerRegression extends BaseRegression{
	    /**
	     * @constructor
	     * @param x: Independent variable
	     * @param y: Dependent variable
	     * @param options
	     */
	    constructor(x, y, options) {
	        super();
	        let opt = options||{};
	        if (x === true) { // reloading model
	            this.A = outputs.A;
	            this.B = outputs.B;
	            if(y.r){
	                this.r = y.r;
	                this.r2 = y.r2;
	            }
	        } else {
	            var n = x.length;
	            if (n !== y.length) {
	                throw new RangeError('input and output array have a different length');
	            }
	            var xl = new Array(n), yl = new Array(n);
	            for (var i = 0; i < n; i++) {
	                xl[i]=Math.log(x[i]);
	                yl[i]=Math.log(y[i]);
	            }

	            var linear = new SimpleLinearRegression(xl, yl, {computeCoefficient:false});
	            this.A = Math.exp(linear.intercept);
	            this.B = linear.slope;
	            if(opt.computeCoefficient){
	                this.r = this.rCoefficient(x,y);
	                this.r2 = this.r*this.r;
	            }
	        }
	    }

	    _compute(newInputs) {
	        return this.A*Math.pow(newInputs,this.B);
	    }

	    toJSON() {
	        var out = {name: 'powerRegression', A: this.A, B: this.B};
	        if(this.r){
	            out.r = this.r;
	            out.r2=this.r2;
	        }
	        return out;
	    }

	    toString(precision){
	        return maybeToPrecision(this.A, precision)+"*x^"+maybeToPrecision(this.B, precision);
	    }

	    static load(json) {
	        if (json.name !== 'powerRegression') {
	            throw new TypeError('not a power regression model');
	        }
	        return new PowerRegression(true, json);
	    }
	}

	module.exports = PowerRegression;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Matrix = __webpack_require__(14);
	const Kernel = __webpack_require__(34);

	const BaseRegression = __webpack_require__(28);

	const defaultOptions = {
	    lambda: 0.1,
	    kernelType: 'gaussian',
	    kernelOptions: {},
	    computeCoefficient:false
	};

	// Implements the Kernel ridge regression algorithm.
	// http://www.ics.uci.edu/~welling/classnotes/papers_class/Kernel-Ridge.pdf
	class KernelRidgeRegression extends BaseRegression {
	    constructor(inputs, outputs, options) {
	        super();
	        if (inputs === true) { // reloading model
	            this.alpha = outputs.alpha;
	            this.inputs = outputs.inputs;
	            this.kernelType = outputs.kernelType;
	            this.kernelOptions = outputs.kernelOptions;
	            this.kernel = new Kernel(outputs.kernelType, outputs.kernelOptions);
	            if(outputs.r){
	                this.r = outputs.r;
	                this.r2 = outputs.r2;
	            }
	        } else {
	            options = Object.assign({}, defaultOptions, options);

	            const kernelFunction = new Kernel(options.kernelType, options.kernelOptions);
	            const K = kernelFunction.compute(inputs);
	            const n = inputs.length;
	            K.add(Matrix.eye(n, n).mul(options.lambda));

	            this.alpha = K.solve(outputs);
	            this.inputs = inputs;
	            this.kernelType = options.kernelType;
	            this.kernelOptions = options.kernelOptions;
	            this.kernel = kernelFunction;

	            if(options.computeCoefficient){
	                this.r = this.rCoefficient(inputs, outputs);
	                this.r2 = this.r*this.r;
	            }
	        }
	    }

	    _compute(newInputs) {
	        return this.kernel.compute([newInputs], this.inputs).mmul(this.alpha)[0];
	    }

	    toJSON() {
	        return {
	            name: 'kernelRidgeRegression',
	            alpha: this.alpha,
	            inputs: this.inputs,
	            kernelType: this.kernelType,
	            kernelOptions: this.kernelOptions
	        };
	    }

	    static load(json) {
	        if (json.name !== 'kernelRidgeRegression') {
	            throw new TypeError('not a KRR model');
	        }
	        return new KernelRidgeRegression(true, json);
	    }
	}

	module.exports = KernelRidgeRegression;


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Matrix = __webpack_require__(14);

	const GaussianKernel = __webpack_require__(35);
	const PolynomialKernel = __webpack_require__(37);

	class Kernel {
	    constructor (type, options) {
	        if (typeof type === 'string') {
	            switch (type.toLowerCase()) {
	                case 'gaussian':
	                case 'rbf':
	                    this.kernelFunction = new GaussianKernel(options);
	                    break;
	                case 'polynomial':
	                case 'poly':
	                    this.kernelFunction = new PolynomialKernel(options);
	                    break;
	                default:
	                    throw new Error('unsupported kernel type: ' + type);
	            }
	        } else if (typeof type === 'object' && typeof type.compute === 'function') {
	            this.kernelFunction = type;
	        } else {
	            throw new TypeError('first argument must be a valid kernel type or instance');
	        }
	    }

	    compute(inputs, landmarks) {
	        if (landmarks === undefined) {
	            landmarks = inputs;
	        }
	        const kernelMatrix = new Matrix(inputs.length, landmarks.length);
	        if (inputs === landmarks) { // fast path, matrix is symmetric
	            for (var i = 0; i < inputs.length; i++) {
	                for (var j = i; j < inputs.length; j++) {
	                    kernelMatrix[i][j] = kernelMatrix[j][i] = this.kernelFunction.compute(inputs[i], inputs[j]);
	                }
	            }
	        } else {
	            for (var i = 0; i < inputs.length; i++) {
	                for (var j = 0; j < landmarks.length; j++) {
	                    kernelMatrix[i][j] = this.kernelFunction.compute(inputs[i], landmarks[j]);
	                }
	            }
	        }
	        return kernelMatrix;
	    }
	}

	module.exports = Kernel;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const squaredEuclidean = __webpack_require__(36).squared;

	const defaultOptions = {
	    sigma: 1
	};

	class GaussianKernel {
	    constructor(options) {
	        options = Object.assign({}, defaultOptions, options);
	        this.sigma = options.sigma;
	        this.divisor = 2 * options.sigma * options.sigma;
	    }

	    compute(x, y) {
	        const distance = squaredEuclidean(x, y);
	        return Math.exp(-distance / this.divisor);
	    }
	}

	module.exports = GaussianKernel;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	function squaredEuclidean(p, q) {
	    var d = 0;
	    for (var i = 0; i < p.length; i++) {
	        d += (p[i] - q[i]) * (p[i] - q[i]);
	    }
	    return d;
	}

	function euclidean(p, q) {
	    return Math.sqrt(squaredEuclidean(p, q));
	}

	module.exports = euclidean;
	euclidean.squared = squaredEuclidean;


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	const defaultOptions = {
	    degree: 1,
	    constant: 1,
	    scale: 1
	};

	class PolynomialKernel {
	    constructor(options) {
	        options = Object.assign({}, defaultOptions, options);

	        this.degree = options.degree;
	        this.constant = options.constant;
	        this.scale = options.scale;
	    }

	    compute(x, y) {
	        var sum = 0;
	        for (var i = 0; i < x.length; i++) {
	            sum += x[i] * y[i];
	        }
	        return Math.pow(this.scale * sum + this.constant, this.degree);
	    }
	}

	module.exports = PolynomialKernel;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.distance = __webpack_require__(39);
	exports.similarity = __webpack_require__(84);

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.additiveSymmetric = __webpack_require__(40);
	exports.avg = __webpack_require__(41);
	exports.bhattacharyya = __webpack_require__(42);
	exports.canberra = __webpack_require__(43);
	exports.chebyshev = __webpack_require__(44);
	exports.clark = __webpack_require__(45);
	exports.czekanowski = __webpack_require__(46);
	exports.dice = __webpack_require__(47);
	exports.divergence = __webpack_require__(48);
	exports.euclidean = __webpack_require__(49);
	exports.fidelity = __webpack_require__(50);
	exports.gower = __webpack_require__(51);
	exports.harmonicMean = __webpack_require__(52);
	exports.hellinger = __webpack_require__(53);
	exports.innerProduct = __webpack_require__(54);
	exports.intersection = __webpack_require__(55);
	exports.jaccard = __webpack_require__(56);
	exports.jeffreys = __webpack_require__(57);
	exports.jensenDifference = __webpack_require__(58);
	exports.jensenShannon = __webpack_require__(59);
	exports.kdivergence = __webpack_require__(60);
	exports.kulczynski = __webpack_require__(61);
	exports.kullbackLeibler = __webpack_require__(62);
	exports.kumarHassebrook = __webpack_require__(63);
	exports.kumarJohnson = __webpack_require__(64);
	exports.lorentzian = __webpack_require__(65);
	exports.manhattan = __webpack_require__(66);
	exports.matusita = __webpack_require__(67);
	exports.minkowski = __webpack_require__(68);
	exports.motyka = __webpack_require__(69);
	exports.neyman = __webpack_require__(70);
	exports.pearson = __webpack_require__(71);
	exports.probabilisticSymmetric = __webpack_require__(72);
	exports.ruzicka = __webpack_require__(73);
	exports.soergel = __webpack_require__(74);
	exports.sorensen = __webpack_require__(75);
	exports.squared = __webpack_require__(76);
	exports.squaredChord = __webpack_require__(77);
	exports.squaredEuclidean = __webpack_require__(49).squared;
	exports.taneja = __webpack_require__(78);
	exports.tanimoto = __webpack_require__(79);
	exports.topsoe = __webpack_require__(81);
	exports.tree = __webpack_require__(82);
	exports.waveHedges = __webpack_require__(83);


/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function additiveSymmetric(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i]) * (a[i] + b[i])) / (a[i] * b[i]);
	    }
	    return 2 * d;
	};


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function avg(a, b) {
	    var ii = a.length,
	        max = 0,
	        ans = 0,
	        aux = 0;
	    for (var i = 0; i < ii ; i++) {
	        aux = Math.abs(a[i] - b[i]);
	        ans += aux;
	        if (max < aux) {
	            max = aux;
	        }
	    }
	    return (max + ans) / 2;
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = function bhattacharyya(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return - Math.log(ans);
	};


/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = function canberra(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
	    }
	    return ans;
	};


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function chebyshev(a, b) {
	    var ii = a.length,
	        max = 0,
	        aux = 0;
	    for (var i = 0; i < ii ; i++) {
	        aux = Math.abs(a[i] - b[i]);
	        if (max < aux) {
	            max = aux;
	        }
	    }
	    return max;
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	module.exports = function clark(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.sqrt(((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i])));
	    }
	    return 2 * d;
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = function czekanowski(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i], b[i]);
	        down += a[i] + b[i];
	    }
	    return 1 - (2 * up / down);
	};


/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = function dice(a, b) {
	    var ii = a.length,
	        p = 0,
	        q1 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * a[i];
	        q1 += b[i] * b[i];
	        q2 += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return q2 / (p + q1);
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function divergence(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / ((a[i] + b[i]) * (a[i] + b[i]));
	    }
	    return 2 * d;
	};


/***/ },
/* 49 */
/***/ function(module, exports) {

	'use strict';

	function squaredEuclidean(p, q) {
	    var d = 0;
	    for (var i = 0; i < p.length; i++) {
	        d += (p[i] - q[i]) * (p[i] - q[i]);
	    }
	    return d;
	}

	function euclidean(p, q) {
	    return Math.sqrt(squaredEuclidean(p, q));
	}

	module.exports = euclidean;
	euclidean.squared = squaredEuclidean;


/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function fidelity(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return ans;
	};


/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function gower(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.abs(a[i] - b[i]);
	    }
	    return ans / ii;
	};


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function harmonicMean(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] * b[i]) / (a[i] + b[i]);
	    }
	    return 2 * ans;
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = function hellinger(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return 2 * Math.sqrt(1 - ans);
	};


/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function innerProduct(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * b[i];
	    }
	    return ans;
	};


/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function intersection(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.min(a[i], b[i]);
	    }
	    return 1 - ans;
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = function jaccard(a, b) {
	    var ii = a.length,
	        p1 = 0,
	        p2 = 0,
	        q1 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p1 += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q1 += b[i] * b[i];
	        q2 += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return q2 / (p2 + q1 - p1);
	};


/***/ },
/* 57 */
/***/ function(module, exports) {

	module.exports = function jeffreys(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
	    }
	    return ans;
	};


/***/ },
/* 58 */
/***/ function(module, exports) {

	module.exports = function jensenDifference(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += ((a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2) - ((a[i] + b[i]) / 2) * Math.log((a[i] + b[i]) / 2);
	    }
	    return ans;
	};


/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function jensenShannon(a, b) {
	    var ii = a.length,
	        p = 0,
	        q = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
	        q += b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
	    }
	    return (p + q) / 2;
	};


/***/ },
/* 60 */
/***/ function(module, exports) {

	module.exports = function kdivergence(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
	    }
	    return ans;
	};


/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function kulczynski(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += Math.min(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function kullbackLeibler(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(a[i] / b[i]);
	    }
	    return ans;
	};


/***/ },
/* 63 */
/***/ function(module, exports) {

	module.exports = function kumarHassebrook(a, b) {
	    var ii = a.length,
	        p = 0,
	        p2 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q2 += b[i] * b[i];
	    }
	    return p / (p2 + q2 - p);
	};


/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = function kumarJohnson(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.pow(a[i] * a[i] - b[i] * b[i],2) / (2 * Math.pow(a[i] * b[i],1.5));
	    }
	    return ans;
	};


/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function lorentzian(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.log(Math.abs(a[i] - b[i]) + 1);
	    }
	    return ans;
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	module.exports = function manhattan(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.abs(a[i] - b[i]);
	    }
	    return d;
	};


/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = function matusita(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += Math.sqrt(a[i] * b[i]);
	    }
	    return Math.sqrt(2 - 2 * ans);
	};


/***/ },
/* 68 */
/***/ function(module, exports) {

	module.exports = function minkowski(a, b, p) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += Math.pow(Math.abs(a[i] - b[i]),p);
	    }
	    return Math.pow(d,(1/p));
	};


/***/ },
/* 69 */
/***/ function(module, exports) {

	module.exports = function motyka(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i], b[i]);
	        down += a[i] + b[i];
	    }
	    return 1 - (up / down);
	};


/***/ },
/* 70 */
/***/ function(module, exports) {

	module.exports = function pearson(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / a[i];
	    }
	    return d;
	};


/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function pearson(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / b[i];
	    }
	    return d;
	};


/***/ },
/* 72 */
/***/ function(module, exports) {

	module.exports = function probabilisticSymmetric(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
	    }
	    return 2 * d;
	};


/***/ },
/* 73 */
/***/ function(module, exports) {

	module.exports = function ruzicka(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.min(a[i],b[i]);
	        down += Math.max(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 74 */
/***/ function(module, exports) {

	module.exports = function soergel(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += Math.max(a[i],b[i]);
	    }
	    return up / down;
	};


/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function sorensen(a, b) {
	    var ii = a.length,
	        up = 0,
	        down = 0;
	    for (var i = 0; i < ii ; i++) {
	        up += Math.abs(a[i] - b[i]);
	        down += a[i] + b[i];
	    }
	    return up / down;
	};


/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function squared(a, b) {
	    var i = 0,
	        ii = a.length,
	        d = 0;
	    for (; i < ii; i++) {
	        d += ((a[i] - b[i]) * (a[i] - b[i])) / (a[i] + b[i]);
	    }
	    return d;
	};


/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function squaredChord(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) * (Math.sqrt(a[i]) - Math.sqrt(b[i]));
	    }
	    return ans;
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	module.exports = function taneja(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
	    }
	    return ans;
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var tanimotoS = __webpack_require__(80);

	module.exports = function tanimoto(a, b, bitvector) {
	    if (bitvector)
	        return 1 - tanimotoS(a, b, bitvector);
	    else {
	        var ii = a.length,
	            p = 0,
	            q = 0,
	            m = 0;
	        for (var i = 0; i < ii ; i++) {
	            p += a[i];
	            q += b[i];
	            m += Math.min(a[i],b[i]);
	        }
	        return (p + q - 2 * m) / (p + q - m);
	    }
	};


/***/ },
/* 80 */
/***/ function(module, exports) {

	module.exports = function tanimoto(a, b, bitvector) {
	    if (bitvector) {
	        var inter = 0,
	            union = 0;
	        for (var j = 0; j < a.length; j++) {
	            inter += a[j] && b[j];
	            union += a[j] || b[j];
	        }
	        if (union === 0)
	            return 1;
	        return inter / union;
	    }
	    else {
	        var ii = a.length,
	            p = 0,
	            q = 0,
	            m = 0;
	        for (var i = 0; i < ii ; i++) {
	            p += a[i];
	            q += b[i];
	            m += Math.min(a[i],b[i]);
	        }
	        return 1 - (p + q - 2 * m) / (p + q - m);
	    }
	};


/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = function topsoe(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i])) + b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
	    }
	    return ans;
	};


/***/ },
/* 82 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * Function that creates the tree
	 * @param {Array <number>} X - chemical shifts of the signal
	 * @param {Array <number>} Y - intensity of the signal
	 * @param {number} from - the low limit of x
	 * @param {number} to - the top limit of x
	 * @param {number} minWindow - smallest range to accept in x
	 * @param {number} threshold - smallest range to accept in y
	 * @returns {{sum: number, center: number, left: {json}, right: {json}}}
	 * left and right have the same structure than the parent, or have a
	 * undefined value if are leafs
	 */
	function createTree (X, Y, from, to, minWindow, threshold) {
	    minWindow = minWindow || 0.16;
	    threshold = threshold || 0.01;
	    if ((to - from) < minWindow)
	        return undefined;
	    var sum = 0;
	    for (var i = 0; X[i] < to; i++) {
	        if (X[i] > from)
	            sum += Y[i];
	    }
	    if (sum < threshold) {
	        return undefined;
	    }
	    var center = 0;
	    for (var j = 0; X[j] < to; j++) {
	        if (X[i] > from)
	            center += X[j] * Y[j];
	    }
	    center = center / sum;
	    if (((center - from) < 10e-6) || ((to - center) < 10e-6)) return undefined;
	    if ((center - from) < (minWindow /4)) {
	        return createTree(X, Y, center, to, minWindow, threshold);
	    }
	    else {
	        if ((to - center) < (minWindow / 4)) {
	            return createTree(X, Y, from, center, minWindow, threshold);
	        }
	        else {
	            return {
	                'sum': sum,
	                'center': center,
	                'left': createTree(X, Y, from, center, minWindow, threshold),
	                'right': createTree(X, Y, center, to, minWindow, threshold)
	            };
	        }
	    }
	}

	/**
	 * Similarity between two nodes
	 * @param {{sum: number, center: number, left: {json}, right: {json}}} a - tree A node
	 * @param {{sum: number, center: number, left: {json}, right: {json}}} b - tree B node
	 * @param {number} alpha - weights the relative importance of intensity vs. shift match
	 * @param {number} beta - weights the relative importance of node matching and children matching
	 * @param {number} gamma - controls the attenuation of the effect of chemical shift differences
	 * @returns {number} similarity measure between tree nodes
	 */
	function S(a, b, alpha, beta, gamma) {
	    if (a === undefined || b === undefined) {
	        return 0;
	    }
	    else {
	        var C = (alpha*Math.min(a.sum, b.sum)/Math.max(a.sum, b.sum)+ (1-alpha)*Math.exp(-gamma*Math.abs(a.center - b.center)));
	    }
	    return beta*C + (1-beta)*(S(a.left, b.left, alpha, beta, gamma)+S(a.right, b.right, alpha, beta, gamma));
	}

	/**
	 * @type {number} alpha - weights the relative importance of intensity vs. shift match
	 * @type {number} beta - weights the relative importance of node matching and children matching
	 * @type {number} gamma - controls the attenuation of the effect of chemical shift differences
	 * @type {number} minWindow - smallest range to accept in x
	 * @type {number} threshold - smallest range to accept in y
	 */
	var defaultOptions = {
	    minWindow: 0.16,
	    threshold : 0.01,
	    alpha: 0.1,
	    beta: 0.33,
	    gamma: 0.001
	};

	/**
	 * Builds a tree based in the spectra and compares this trees
	 * @param {{x: Array<number>, y: Array<number>}} A - first spectra to be compared
	 * @param {{x: Array<number>, y: Array<number>}} B - second spectra to be compared
	 * @param {number} from - the low limit of x
	 * @param {number} to - the top limit of x
	 * @param {{minWindow: number, threshold: number, alpha: number, beta: number, gamma: number}} options
	 * @returns {number} similarity measure between the spectra
	 */
	function tree(A, B, from, to, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!options.hasOwnProperty(o)) {
	            options[o] = defaultOptions[o];
	        }
	    var Atree, Btree;
	    if (A.sum)
	        Atree = A;
	    else
	        Atree = createTree(A.x, A.y, from, to, options.minWindow, options.threshold);
	    if (B.sum)
	        Btree = B;
	    else
	        Btree = createTree(B.x, B.y, from, to, options.minWindow, options.threshold);
	    return S(Atree, Btree, options.alpha, options.beta, options.gamma);
	}

	module.exports = {
	    calc: tree,
	    createTree: createTree
	};

/***/ },
/* 83 */
/***/ function(module, exports) {

	module.exports = function waveHedges(a, b) {
	    var ii = a.length,
	        ans = 0;
	    for (var i = 0; i < ii ; i++) {
	        ans += 1 - (Math.min(a[i], b[i]) / Math.max(a[i], b[i]));
	    }
	    return ans;
	};


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.cosine = __webpack_require__(85);
	exports.czekanowski = __webpack_require__(86);
	exports.dice = __webpack_require__(87);
	exports.intersection = __webpack_require__(88);
	exports.jaccard = __webpack_require__(89);
	exports.kulczynski = __webpack_require__(90);
	exports.motyka = __webpack_require__(91);
	exports.pearson = __webpack_require__(92);
	exports.squaredChord = __webpack_require__(96);
	exports.tanimoto = __webpack_require__(80);


/***/ },
/* 85 */
/***/ function(module, exports) {

	module.exports = function cosine(a, b) {
	    var ii = a.length,
	        p = 0,
	        p2 = 0,
	        q2 = 0;
	    for (var i = 0; i < ii ; i++) {
	        p += a[i] * b[i];
	        p2 += a[i] * a[i];
	        q2 += b[i] * b[i];
	    }
	    return p / (Math.sqrt(p2) * Math.sqrt(q2));
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var czekanowskiD = __webpack_require__(46);

	module.exports = function czekanowski(a, b) {
	    return 1 - czekanowskiD(a,b);
	};


/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var diceD = __webpack_require__(47);

	module.exports = function dice(a, b) {
	    return 1 - diceD(a,b);
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var intersectionD = __webpack_require__(55);

	module.exports = function intersection(a, b) {
	    return 1 - intersectionD(a,b);
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var jaccardD = __webpack_require__(56);

	module.exports = function jaccard(a, b) {
	    return 1 - jaccardD(a, b);
	};


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var kulczynskiD = __webpack_require__(61);

	module.exports = function kulczynski(a, b) {
	    return 1 / kulczynskiD(a, b);
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var motykaD = __webpack_require__(69);

	module.exports = function motyka(a, b) {
	    return 1 - motykaD(a,b);
	};


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var stat=__webpack_require__(93).array;
	var cosine=__webpack_require__(85);

	module.exports = function pearson(a, b) {
	    var avgA=stat.mean(a);
	    var avgB=stat.mean(b);

	    var newA=new Array(a.length);
	    var newB=new Array(b.length);
	    for (var i=0; i<newA.length; i++) {
	        newA[i]=a[i]-avgA;
	        newB[i]=b[i]-avgB;
	    }

	    return cosine(newA, newB);
	};


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.array = __webpack_require__(94);
	exports.matrix = __webpack_require__(95);


/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	function compareNumbers(a, b) {
	    return a - b;
	}

	/**
	 * Computes the sum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.sum = function sum(values) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	        sum += values[i];
	    }
	    return sum;
	};

	/**
	 * Computes the maximum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.max = function max(values) {
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] > max) max = values[i];
	    }
	    return max;
	};

	/**
	 * Computes the minimum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.min = function min(values) {
	    var min = Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	    }
	    return min;
	};

	/**
	 * Computes the min and max of the given values
	 * @param {Array} values
	 * @returns {{min: number, max: number}}
	 */
	exports.minMax = function minMax(values) {
	    var min = Infinity;
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	        if (values[i] > max) max = values[i];
	    }
	    return {
	        min: min,
	        max: max
	    };
	};

	/**
	 * Computes the arithmetic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.arithmeticMean = function arithmeticMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        sum += values[i];
	    }
	    return sum / l;
	};

	/**
	 * {@link arithmeticMean}
	 */
	exports.mean = exports.arithmeticMean;

	/**
	 * Computes the geometric mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.geometricMean = function geometricMean(values) {
	    var mul = 1;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        mul *= values[i];
	    }
	    return Math.pow(mul, 1 / l);
	};

	/**
	 * Computes the mean of the log of the given values
	 * If the return value is exponentiated, it gives the same result as the
	 * geometric mean.
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.logMean = function logMean(values) {
	    var lnsum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        lnsum += Math.log(values[i]);
	    }
	    return lnsum / l;
	};

	/**
	 * Computes the weighted grand mean for a list of means and sample sizes
	 * @param {Array} means - Mean values for each set of samples
	 * @param {Array} samples - Number of original values for each set of samples
	 * @returns {number}
	 */
	exports.grandMean = function grandMean(means, samples) {
	    var sum = 0;
	    var n = 0;
	    var l = means.length;
	    for (var i = 0; i < l; i++) {
	        sum += samples[i] * means[i];
	        n += samples[i];
	    }
	    return sum / n;
	};

	/**
	 * Computes the truncated mean of the given values using a given percentage
	 * @param {Array} values
	 * @param {number} percent - The percentage of values to keep (range: [0,1])
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var k = Math.floor(l * percent);
	    var sum = 0;
	    for (var i = k; i < (l - k); i++) {
	        sum += values[i];
	    }
	    return sum / (l - 2 * k);
	};

	/**
	 * Computes the harmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.harmonicMean = function harmonicMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] === 0) {
	            throw new RangeError('value at index ' + i + 'is zero');
	        }
	        sum += 1 / values[i];
	    }
	    return l / sum;
	};

	/**
	 * Computes the contraharmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.contraHarmonicMean = function contraHarmonicMean(values) {
	    var r1 = 0;
	    var r2 = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        r1 += values[i] * values[i];
	        r2 += values[i];
	    }
	    if (r2 < 0) {
	        throw new RangeError('sum of values is negative');
	    }
	    return r1 / r2;
	};

	/**
	 * Computes the median of the given values
	 * @param {Array} values
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.median = function median(values, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var half = Math.floor(l / 2);
	    if (l % 2 === 0) {
	        return (values[half - 1] + values[half]) * 0.5;
	    } else {
	        return values[half];
	    }
	};

	/**
	 * Computes the variance of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.variance = function variance(values, unbiased) {
	    if (unbiased === undefined) unbiased = true;
	    var theMean = exports.mean(values);
	    var theVariance = 0;
	    var l = values.length;

	    for (var i = 0; i < l; i++) {
	        var x = values[i] - theMean;
	        theVariance += x * x;
	    }

	    if (unbiased) {
	        return theVariance / (l - 1);
	    } else {
	        return theVariance / l;
	    }
	};

	/**
	 * Computes the standard deviation of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.standardDeviation = function standardDeviation(values, unbiased) {
	    return Math.sqrt(exports.variance(values, unbiased));
	};

	exports.standardError = function standardError(values) {
	    return exports.standardDeviation(values) / Math.sqrt(values.length);
	};

	exports.quartiles = function quartiles(values, alreadySorted) {
	    if (typeof(alreadySorted) === 'undefined') alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice();
	        values.sort(compareNumbers);
	    }

	    var quart = values.length / 4;
	    var q1 = values[Math.ceil(quart) - 1];
	    var q2 = exports.median(values, true);
	    var q3 = values[Math.ceil(quart * 3) - 1];

	    return {q1: q1, q2: q2, q3: q3};
	};

	exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
	    return Math.sqrt(exports.pooledVariance(samples, unbiased));
	};

	exports.pooledVariance = function pooledVariance(samples, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var sum = 0;
	    var length = 0, l = samples.length;
	    for (var i = 0; i < l; i++) {
	        var values = samples[i];
	        var vari = exports.variance(values);

	        sum += (values.length - 1) * vari;

	        if (unbiased)
	            length += values.length - 1;
	        else
	            length += values.length;
	    }
	    return sum / length;
	};

	exports.mode = function mode(values) {
	    var l = values.length,
	        itemCount = new Array(l),
	        i;
	    for (i = 0; i < l; i++) {
	        itemCount[i] = 0;
	    }
	    var itemArray = new Array(l);
	    var count = 0;

	    for (i = 0; i < l; i++) {
	        var index = itemArray.indexOf(values[i]);
	        if (index >= 0)
	            itemCount[index]++;
	        else {
	            itemArray[count] = values[i];
	            itemCount[count] = 1;
	            count++;
	        }
	    }

	    var maxValue = 0, maxIndex = 0;
	    for (i = 0; i < count; i++) {
	        if (itemCount[i] > maxValue) {
	            maxValue = itemCount[i];
	            maxIndex = i;
	        }
	    }

	    return itemArray[maxIndex];
	};

	exports.covariance = function covariance(vector1, vector2, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var mean1 = exports.mean(vector1);
	    var mean2 = exports.mean(vector2);

	    if (vector1.length !== vector2.length)
	        throw "Vectors do not have the same dimensions";

	    var cov = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        var x = vector1[i] - mean1;
	        var y = vector2[i] - mean2;
	        cov += x * y;
	    }

	    if (unbiased)
	        return cov / (l - 1);
	    else
	        return cov / l;
	};

	exports.skewness = function skewness(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);

	    var s2 = 0, s3 = 0, l = values.length;
	    for (var i = 0; i < l; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s3 += dev * dev * dev;
	    }
	    var m2 = s2 / l;
	    var m3 = s3 / l;

	    var g = m3 / (Math.pow(m2, 3 / 2.0));
	    if (unbiased) {
	        var a = Math.sqrt(l * (l - 1));
	        var b = l - 2;
	        return (a / b) * g;
	    }
	    else {
	        return g;
	    }
	};

	exports.kurtosis = function kurtosis(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);
	    var n = values.length, s2 = 0, s4 = 0;

	    for (var i = 0; i < n; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s4 += dev * dev * dev * dev;
	    }
	    var m2 = s2 / n;
	    var m4 = s4 / n;

	    if (unbiased) {
	        var v = s2 / (n - 1);
	        var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	        var b = s4 / (v * v);
	        var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));

	        return a * b - 3 * c;
	    }
	    else {
	        return m4 / (m2 * m2) - 3;
	    }
	};

	exports.entropy = function entropy(values, eps) {
	    if (typeof(eps) === 'undefined') eps = 0;
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * Math.log(values[i] + eps);
	    return -sum;
	};

	exports.weightedMean = function weightedMean(values, weights) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * weights[i];
	    return sum;
	};

	exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
	    return Math.sqrt(exports.weightedVariance(values, weights));
	};

	exports.weightedVariance = function weightedVariance(values, weights) {
	    var theMean = exports.weightedMean(values, weights);
	    var vari = 0, l = values.length;
	    var a = 0, b = 0;

	    for (var i = 0; i < l; i++) {
	        var z = values[i] - theMean;
	        var w = weights[i];

	        vari += w * (z * z);
	        b += w;
	        a += w * w;
	    }

	    return vari * (b / (b * b - a));
	};

	exports.center = function center(values, inPlace) {
	    if (typeof(inPlace) === 'undefined') inPlace = false;

	    var result = values;
	    if (!inPlace)
	        result = values.slice();

	    var theMean = exports.mean(result), l = result.length;
	    for (var i = 0; i < l; i++)
	        result[i] -= theMean;
	};

	exports.standardize = function standardize(values, standardDev, inPlace) {
	    if (typeof(standardDev) === 'undefined') standardDev = exports.standardDeviation(values);
	    if (typeof(inPlace) === 'undefined') inPlace = false;
	    var l = values.length;
	    var result = inPlace ? values : new Array(l);
	    for (var i = 0; i < l; i++)
	        result[i] = values[i] / standardDev;
	    return result;
	};

	exports.cumulativeSum = function cumulativeSum(array) {
	    var l = array.length;
	    var result = new Array(l);
	    result[0] = array[0];
	    for (var i = 1; i < l; i++)
	        result[i] = result[i - 1] + array[i];
	    return result;
	};


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var arrayStat = __webpack_require__(94);

	// https://github.com/accord-net/framework/blob/development/Sources/Accord.Statistics/Tools.cs

	function entropy(matrix, eps) {
	    if (typeof(eps) === 'undefined') {
	        eps = 0;
	    }
	    var sum = 0,
	        l1 = matrix.length,
	        l2 = matrix[0].length;
	    for (var i = 0; i < l1; i++) {
	        for (var j = 0; j < l2; j++) {
	            sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
	        }
	    }
	    return -sum;
	}

	function mean(matrix, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        theMean, N, i, j;

	    if (dimension === -1) {
	        theMean = [0];
	        N = rows * cols;
	        for (i = 0; i < rows; i++) {
	            for (j = 0; j < cols; j++) {
	                theMean[0] += matrix[i][j];
	            }
	        }
	        theMean[0] /= N;
	    } else if (dimension === 0) {
	        theMean = new Array(cols);
	        N = rows;
	        for (j = 0; j < cols; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < rows; i++) {
	                theMean[j] += matrix[i][j];
	            }
	            theMean[j] /= N;
	        }
	    } else if (dimension === 1) {
	        theMean = new Array(rows);
	        N = cols;
	        for (j = 0; j < rows; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < cols; i++) {
	                theMean[j] += matrix[j][i];
	            }
	            theMean[j] /= N;
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }
	    return theMean;
	}

	function standardDeviation(matrix, means, unbiased) {
	    var vari = variance(matrix, means, unbiased), l = vari.length;
	    for (var i = 0; i < l; i++) {
	        vari[i] = Math.sqrt(vari[i]);
	    }
	    return vari;
	}

	function variance(matrix, means, unbiased) {
	    if (typeof(unbiased) === 'undefined') {
	        unbiased = true;
	    }
	    means = means || mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum1 = 0, sum2 = 0, x = 0;
	        for (var i = 0; i < rows; i++) {
	            x = matrix[i][j] - means[j];
	            sum1 += x;
	            sum2 += x * x;
	        }
	        if (unbiased) {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / (rows - 1);
	        } else {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / rows;
	        }
	    }
	    return vari;
	}

	function median(matrix) {
	    var rows = matrix.length, cols = matrix[0].length;
	    var medians = new Array(cols);

	    for (var i = 0; i < cols; i++) {
	        var data = new Array(rows);
	        for (var j = 0; j < rows; j++) {
	            data[j] = matrix[j][i];
	        }
	        data.sort();
	        var N = data.length;
	        if (N % 2 === 0) {
	            medians[i] = (data[N / 2] + data[(N / 2) - 1]) * 0.5;
	        } else {
	            medians[i] = data[Math.floor(N / 2)];
	        }
	    }
	    return medians;
	}

	function mode(matrix) {
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        modes = new Array(cols),
	        i, j;
	    for (i = 0; i < cols; i++) {
	        var itemCount = new Array(rows);
	        for (var k = 0; k < rows; k++) {
	            itemCount[k] = 0;
	        }
	        var itemArray = new Array(rows);
	        var count = 0;

	        for (j = 0; j < rows; j++) {
	            var index = itemArray.indexOf(matrix[j][i]);
	            if (index >= 0) {
	                itemCount[index]++;
	            } else {
	                itemArray[count] = matrix[j][i];
	                itemCount[count] = 1;
	                count++;
	            }
	        }

	        var maxValue = 0, maxIndex = 0;
	        for (j = 0; j < count; j++) {
	            if (itemCount[j] > maxValue) {
	                maxValue = itemCount[j];
	                maxIndex = j;
	            }
	        }

	        modes[i] = itemArray[maxIndex];
	    }
	    return modes;
	}

	function skewness(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, l = means.length;
	    var skew = new Array(l);

	    for (var j = 0; j < l; j++) {
	        var s2 = 0, s3 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s3 += dev * dev * dev;
	        }

	        var m2 = s2 / n;
	        var m3 = s3 / n;
	        var g = m3 / Math.pow(m2, 3 / 2);

	        if (unbiased) {
	            var a = Math.sqrt(n * (n - 1));
	            var b = n - 2;
	            skew[j] = (a / b) * g;
	        } else {
	            skew[j] = g;
	        }
	    }
	    return skew;
	}

	function kurtosis(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, m = matrix[0].length;
	    var kurt = new Array(m);

	    for (var j = 0; j < m; j++) {
	        var s2 = 0, s4 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s4 += dev * dev * dev * dev;
	        }
	        var m2 = s2 / n;
	        var m4 = s4 / n;

	        if (unbiased) {
	            var v = s2 / (n - 1);
	            var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	            var b = s4 / (v * v);
	            var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));
	            kurt[j] = a * b - 3 * c;
	        } else {
	            kurt[j] = m4 / (m2 * m2) - 3;
	        }
	    }
	    return kurt;
	}

	function standardError(matrix) {
	    var samples = matrix.length;
	    var standardDeviations = standardDeviation(matrix), l = standardDeviations.length;
	    var standardErrors = new Array(l);
	    var sqrtN = Math.sqrt(samples);

	    for (var i = 0; i < l; i++) {
	        standardErrors[i] = standardDeviations[i] / sqrtN;
	    }
	    return standardErrors;
	}

	function covariance(matrix, dimension) {
	    return scatter(matrix, undefined, dimension);
	}

	function scatter(matrix, divisor, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    if (typeof(divisor) === 'undefined') {
	        if (dimension === 0) {
	            divisor = matrix.length - 1;
	        } else if (dimension === 1) {
	            divisor = matrix[0].length - 1;
	        }
	    }
	    var means = mean(matrix, dimension),
	        rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, s, k;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	function correlation(matrix) {
	    var means = mean(matrix),
	        standardDeviations = standardDeviation(matrix, true, means),
	        scores = zScores(matrix, means, standardDeviations),
	        rows = matrix.length,
	        cols = matrix[0].length,
	        i, j;

	    var cor = new Array(cols);
	    for (i = 0; i < cols; i++) {
	        cor[i] = new Array(cols);
	    }
	    for (i = 0; i < cols; i++) {
	        for (j = i; j < cols; j++) {
	            var c = 0;
	            for (var k = 0, l = scores.length; k < l; k++) {
	                c += scores[k][j] * scores[k][i];
	            }
	            c /= rows - 1;
	            cor[i][j] = c;
	            cor[j][i] = c;
	        }
	    }
	    return cor;
	}

	function zScores(matrix, means, standardDeviations) {
	    means = means || mean(matrix);
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix, true, means);
	    return standardize(center(matrix, means, false), standardDeviations, true);
	}

	function center(matrix, means, inPlace) {
	    means = means || mean(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var row = result[i];
	        for (j = 0, jj = row.length; j < jj; j++) {
	            row[j] = matrix[i][j] - means[j];
	        }
	    }
	    return result;
	}

	function standardize(matrix, standardDeviations, inPlace) {
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var resultRow = result[i];
	        var sourceRow = matrix[i];
	        for (j = 0, jj = resultRow.length; j < jj; j++) {
	            if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
	                resultRow[j] = sourceRow[j] / standardDeviations[j];
	            }
	        }
	    }
	    return result;
	}

	function weightedVariance(matrix, weights) {
	    var means = mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum = 0;
	        var a = 0, b = 0;

	        for (var i = 0; i < rows; i++) {
	            var z = matrix[i][j] - means[j];
	            var w = weights[i];

	            sum += w * (z * z);
	            b += w;
	            a += w * w;
	        }

	        vari[j] = sum * (b / (b * b - a));
	    }

	    return vari;
	}

	function weightedMean(matrix, weights, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length,
	        means, i, ii, j, w, row;

	    if (dimension === 0) {
	        means = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            means[i] = 0;
	        }
	        for (i = 0; i < rows; i++) {
	            row = matrix[i];
	            w = weights[i];
	            for (j = 0; j < cols; j++) {
	                means[j] += row[j] * w;
	            }
	        }
	    } else if (dimension === 1) {
	        means = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            means[i] = 0;
	        }
	        for (j = 0; j < rows; j++) {
	            row = matrix[j];
	            w = weights[j];
	            for (i = 0; i < cols; i++) {
	                means[j] += row[i] * w;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    var weightSum = arrayStat.sum(weights);
	    if (weightSum !== 0) {
	        for (i = 0, ii = means.length; i < ii; i++) {
	            means[i] /= weightSum;
	        }
	    }
	    return means;
	}

	function weightedCovariance(matrix, weights, means, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    var s1 = 0, s2 = 0;
	    for (var i = 0, ii = weights.length; i < ii; i++) {
	        s1 += weights[i];
	        s2 += weights[i] * weights[i];
	    }
	    var factor = s1 / (s1 * s1 - s2);
	    return weightedScatter(matrix, weights, means, factor, dimension);
	}

	function weightedScatter(matrix, weights, means, factor, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    if (typeof(factor) === 'undefined') {
	        factor = 1;
	    }
	    var rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, k, s;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	module.exports = {
	    entropy: entropy,
	    mean: mean,
	    standardDeviation: standardDeviation,
	    variance: variance,
	    median: median,
	    mode: mode,
	    skewness: skewness,
	    kurtosis: kurtosis,
	    standardError: standardError,
	    covariance: covariance,
	    scatter: scatter,
	    correlation: correlation,
	    zScores: zScores,
	    center: center,
	    standardize: standardize,
	    weightedVariance: weightedVariance,
	    weightedMean: weightedMean,
	    weightedCovariance: weightedCovariance,
	    weightedScatter: weightedScatter
	};


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var squaredChordD = __webpack_require__(77);

	module.exports = function squaredChord(a, b) {
	    return 1 - squaredChordD(a, b);
	};


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(14);
	var padArray = __webpack_require__(23);
	var extend = __webpack_require__(98);

	var defaultOptions = {
	    windowSize: 5,
	    derivative: 1,
	    polynomial: 2,
	    pad: 'none',
	    padValue: 'replicate'
	};

	/**
	 * Savitzky-Golay filter
	 * @param {Array <number>} data
	 * @param {number} h
	 * @param {Object} options
	 * @returns {Array}
	 */
	function SavitzkyGolay (data, h, options) {
	    options = extend({}, defaultOptions, options);
	    if ((options.windowSize % 2 === 0) || (options.windowSize < 5) || !(Number.isInteger(options.windowSize)))
	        throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
	    if ((options.derivative < 0) || !(Number.isInteger(options.derivative)))
	        throw new RangeError('Derivative should be a positive integer');
	    if ((options.polynomial < 1) || !(Number.isInteger(options.polynomial)))
	        throw new RangeError('Polynomial should be a positive integer');

	    var C, norm;
	    var step = Math.floor(options.windowSize / 2);

	    if (options.pad === 'pre') {
	        data = padArray(data, {size: step, value: options.padValue});
	    }

	    var ans =  new Array(data.length - 2*step);

	    if ((options.windowSize === 5) && (options.polynomial === 2) && ((options.derivative === 1) || (options.derivative === 2))) {
	        if (options.derivative === 1) {
	            C = [-2,-1,0,1,2];
	            norm = 10;
	        }
	        else {
	            C = [2, -1, -2, -1, 2];
	            norm = 7;
	        }
	    }
	    else {
	        var J = Matrix.ones(options.windowSize, options.polynomial + 1);
	        var inic = -(options.windowSize - 1) / 2;
	        for (var i = 0; i < J.length; i++) {
	            for (var j = 0; j < J[i].length; j++) {
	                if ((inic + 1 !== 0) || (j !== 0))
	                    J[i][j] = Math.pow((inic + i), j);
	            }
	        }
	        var Jtranspose = J.transpose();
	        var Jinv = (Jtranspose.mmul(J)).inverse();
	        C = Jinv.mmul(Jtranspose);
	        C = C[options.derivative];
	        norm = 1;
	    }
	    var det = norm * Math.pow(h, options.derivative);
	    for (var k = step; k < (data.length - step); k++) {
	        var d = 0;
	        for (var l = 0; l < C.length; l++)
	            d += C[l] * data[l + k - step] / det;
	        ans[k - step] = d;
	    }

	    if (options.pad === 'post') {
	        ans = padArray(ans, {size: step, value: options.padValue});
	    }

	    return ans;
	}

	module.exports = SavitzkyGolay;


/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict';

	var hasOwn = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;

	var isArray = function isArray(arr) {
		if (typeof Array.isArray === 'function') {
			return Array.isArray(arr);
		}

		return toStr.call(arr) === '[object Array]';
	};

	var isPlainObject = function isPlainObject(obj) {
		if (!obj || toStr.call(obj) !== '[object Object]') {
			return false;
		}

		var hasOwnConstructor = hasOwn.call(obj, 'constructor');
		var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
		// Not own constructor property must be Object
		if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
			return false;
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		var key;
		for (key in obj) {/**/}

		return typeof key === 'undefined' || hasOwn.call(obj, key);
	};

	module.exports = function extend() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0],
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if (typeof target === 'boolean') {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		} else if ((typeof target !== 'object' && typeof target !== 'function') || target == null) {
			target = {};
		}

		for (; i < length; ++i) {
			options = arguments[i];
			// Only deal with non-null/undefined values
			if (options != null) {
				// Extend the base object
				for (name in options) {
					src = target[name];
					copy = options[name];

					// Prevent never-ending loop
					if (target !== copy) {
						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && isArray(src) ? src : [];
							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = extend(deep, clone, copy);

						// Don't bring in undefined values
						} else if (typeof copy !== 'undefined') {
							target[name] = copy;
						}
					}
				}
			}
		}

		// Return the modified object
		return target;
	};



/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	const HashTable = __webpack_require__(11);

	class SparseMatrix {
	    constructor(rows, columns, options = {}) {
	        if (rows instanceof SparseMatrix) { // clone
	            const other = rows;
	            this._init(other.rows, other.columns, other.elements.clone(), other.threshold);
	            return;
	        }

	        if (Array.isArray(rows)) {
	            const matrix = rows;
	            rows = matrix.length;
	            options = columns || {};
	            columns = matrix[0].length;
	            this._init(rows, columns, new HashTable(options), options.threshold);
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    var value = matrix[i][j];
	                    if (this.threshold && Math.abs(value) < this.threshold) value = 0;
	                    if (value !== 0) {
	                        this.elements.set(i * columns + j, matrix[i][j]);
	                    }
	                }
	            }
	        } else {
	            this._init(rows, columns, new HashTable(options), options.threshold);
	        }
	    }

	    _init(rows, columns, elements, threshold) {
	        this.rows = rows;
	        this.columns = columns;
	        this.elements = elements;
	        this.threshold = threshold || 0;
	    }
	    
	    static eye(rows = 1, columns = rows) {
	        const min = Math.min(rows, columns);
	        const matrix = new SparseMatrix(rows, columns, {initialCapacity: min});
	        for (var i = 0; i < min; i++) {
	            matrix.set(i, i, 1);
	        }
	        return matrix;
	    }

	    clone() {
	        return new SparseMatrix(this);
	    }
	    
	    to2DArray() {
	        const copy = new Array(this.rows);
	        for (var i = 0; i < this.rows; i++) {
	            copy[i] = new Array(this.columns);
	            for (var j = 0; j < this.columns; j++) {
	                copy[i][j] = this.get(i, j);
	            }
	        }
	        return copy;
	    }

	    isSquare() {
	        return this.rows === this.columns;
	    }

	    isSymmetric() {
	        if (!this.isSquare()) return false;

	        var symmetric = true;
	        this.forEachNonZero((i, j, v) => {
	            if (this.get(j, i) !== v) {
	                symmetric = false;
	                return false;
	            }
	            return v;
	        });
	        return symmetric;
	    }

	    get cardinality() {
	        return this.elements.size;
	    }

	    get size() {
	        return this.rows * this.columns;
	    }

	    get(row, column) {
	        return this.elements.get(row * this.columns + column);
	    }

	    set(row, column, value) {
	        if (this.threshold && Math.abs(value) < this.threshold) value = 0;
	        if (value === 0) {
	            this.elements.remove(row * this.columns + column);
	        } else {
	            this.elements.set(row * this.columns + column, value);
	        }
	        return this;
	    }
	    
	    mmul(other) {
	        if (this.columns !== other.rows)
	            console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');
	        
	        const m = this.rows;
	        const p = other.columns;
	        
	        const result = new SparseMatrix(m, p);
	        this.forEachNonZero((i, j, v1) => {
	            other.forEachNonZero((k, l, v2) => {
	                if (j === k) {
	                    result.set(i, l, result.get(i, l) + v1 * v2);
	                }
	                return v2;
	            });
	            return v1;
	        });
	        return result;
	    }

	    kroneckerProduct(other) {
	        const m = this.rows;
	        const n = this.columns;
	        const p = other.rows;
	        const q = other.columns;

	        const result = new SparseMatrix(m * p, n * q, {
	            initialCapacity: this.cardinality * other.cardinality
	        });
	        this.forEachNonZero((i, j, v1) => {
	            other.forEachNonZero((k, l, v2) => {
	                result.set(p * i + k, q * j + l, v1 * v2);
	                return v2;
	            });
	            return v1;
	        });
	        return result;
	    }

	    forEachNonZero(callback) {
	        this.elements.forEachPair((key, value) => {
	            const i = (key / this.columns) | 0;
	            const j = key % this.columns;
	            let r = callback(i, j, value);
	            if (r === false) return false; // stop iteration
	            if (this.threshold && Math.abs(r) < this.threshold) r = 0;
	            if (r !== value) {
	                if (r === 0) {
	                    this.elements.remove(key, true);
	                } else {
	                    this.elements.set(key, r);
	                }
	            }
	            return true;
	        });
	        this.elements.maybeShrinkCapacity();
	        return this;
	    }

	    getNonZeros() {
	        const cardinality = this.cardinality;
	        const rows = new Array(cardinality);
	        const columns = new Array(cardinality);
	        const values = new Array(cardinality);
	        var idx = 0;
	        this.forEachNonZero((i, j, value) => {
	            rows[idx] = i;
	            columns[idx] = j;
	            values[idx] = value;
	            idx++;
	            return value;
	        });
	        return {rows, columns, values};
	    }

	    setThreshold(newThreshold) {
	        if (newThreshold !== 0 && newThreshold !== this.threshold) {
	            this.threshold = newThreshold;
	            this.forEachNonZero((i, j, v) => v);
	        }
	        return this;
	    }
	}

	SparseMatrix.prototype.klass = 'Matrix';

	SparseMatrix.identity = SparseMatrix.eye;
	SparseMatrix.prototype.tensorProduct = SparseMatrix.prototype.kroneckerProduct;

	module.exports = SparseMatrix;

	/*
	 Add dynamically instance and static methods for mathematical operations
	 */

	var inplaceOperator = `
	(function %name%(value) {
	    if (typeof value === 'number') return this.%name%S(value);
	    return this.%name%M(value);
	})
	`;

	var inplaceOperatorScalar = `
	(function %name%S(value) {
	    this.forEachNonZero((i, j, v) => v %op% value);
	    return this;
	})
	`;

	var inplaceOperatorMatrix = `
	(function %name%M(matrix) {
	    matrix.forEachNonZero((i, j, v) => {
	        this.set(i, j, this.get(i, j) %op% v);
	        return v;
	    });
	    return this;
	})
	`;

	var staticOperator = `
	(function %name%(matrix, value) {
	    var newMatrix = new SparseMatrix(matrix);
	    return newMatrix.%name%(value);
	})
	`;

	var inplaceMethod = `
	(function %name%() {
	    this.forEachNonZero((i, j, v) => %method%(v));
	    return this;
	})
	`;

	var staticMethod = `
	(function %name%(matrix) {
	    var newMatrix = new SparseMatrix(matrix);
	    return newMatrix.%name%();
	})
	`;

	var operators = [
	    // Arithmetic operators
	    ['+', 'add'],
	    ['-', 'sub', 'subtract'],
	    ['*', 'mul', 'multiply'],
	    ['/', 'div', 'divide'],
	    ['%', 'mod', 'modulus'],
	    // Bitwise operators
	    ['&', 'and'],
	    ['|', 'or'],
	    ['^', 'xor'],
	    ['<<', 'leftShift'],
	    ['>>', 'signPropagatingRightShift'],
	    ['>>>', 'rightShift', 'zeroFillRightShift']
	];

	for (var operator of operators) {
	    for (var i = 1; i < operator.length; i++) {
	        SparseMatrix.prototype[operator[i]] = eval(fillTemplateFunction(inplaceOperator, {name: operator[i], op: operator[0]}));
	        SparseMatrix.prototype[operator[i] + 'S'] = eval(fillTemplateFunction(inplaceOperatorScalar, {name: operator[i] + 'S', op: operator[0]}));
	        SparseMatrix.prototype[operator[i] + 'M'] = eval(fillTemplateFunction(inplaceOperatorMatrix, {name: operator[i] + 'M', op: operator[0]}));

	        SparseMatrix[operator[i]] = eval(fillTemplateFunction(staticOperator, {name: operator[i]}));
	    }
	}

	var methods = [
	    ['~', 'not']
	];

	[
	    'abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil',
	    'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p',
	    'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'
	].forEach(function (mathMethod) {
	    methods.push(['Math.' + mathMethod, mathMethod]);
	});

	for (var method of methods) {
	    for (var i = 1; i < method.length; i++) {
	        SparseMatrix.prototype[method[i]] = eval(fillTemplateFunction(inplaceMethod, {name: method[i], method: method[0]}));
	        SparseMatrix[method[i]] = eval(fillTemplateFunction(staticMethod, {name: method[i]}));
	    }
	}

	function fillTemplateFunction(template, values) {
	    for (var i in values) {
	        template = template.replace(new RegExp('%' + i + '%', 'g'), values[i]);
	    }
	    return template;
	}


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var LM = __webpack_require__(101);
	var math = LM.Matrix.algebra;
	var Matrix = __webpack_require__(113);

	/**
	 * This function calculates the spectrum as a sum of lorentzian functions. The Lorentzian
	 * parameters are divided in 3 batches. 1st: centers; 2nd: heights; 3th: widths;
	 * @param t Ordinate values
	 * @param p Lorentzian parameters
	 * @param c Constant parameters(Not used)
	 * @returns {*}
	 */
	function sumOfLorentzians(t,p,c){
	    var nL = p.length/3,factor,i, j,p2, cols = t.rows;
	    var result = Matrix.zeros(t.length,1);

	    for(i=0;i<nL;i++){
	        p2 = Math.pow(p[i+nL*2][0]/2,2);
	        factor = p[i+nL][0]*p2;
	        for(j=0;j<cols;j++){
	            result[j][0]+=factor/(Math.pow(t[j][0]-p[i][0],2)+p2);
	        }
	    }
	    return result;
	}

	/**
	 * This function calculates the spectrum as a sum of gaussian functions. The Gaussian
	 * parameters are divided in 3 batches. 1st: centers; 2nd: height; 3th: std's;
	 * @param t Ordinate values
	 * @param p Gaussian parameters
	 * @param c Constant parameters(Not used)
	 * @returns {*}
	 */
	function sumOfGaussians(t,p,c){
	    var nL = p.length/3,factor,i, j, cols = t.rows;
	    var result = Matrix.zeros(t.length,1);

	    for(i=0;i<nL;i++){
	        factor = p[i+nL*2][0]*p[i+nL*2][0]/2;
	        for(j=0;j<cols;j++){
	            result[j][0]+=p[i+nL][0]*Math.exp(-(t[i][0]-p[i][0])*(t[i][0]-p[i][0])/factor);
	        }
	    }
	    return result;
	}
	/**
	 * Single 4 parameter lorentzian function
	 * @param t Ordinate values
	 * @param p Lorentzian parameters
	 * @param c Constant parameters(Not used)
	 * @returns {*}
	 */
	function singleLorentzian(t,p,c){
	    var factor = p[1][0]*Math.pow(p[2][0]/2,2);
	    var rows = t.rows;
	    var result = new Matrix(t.rows, t.columns);
	    for(var i=0;i<rows;i++){
	        result[i][0]=factor/(Math.pow(t[i][0]-p[0][0],2)+Math.pow(p[2][0]/2,2));
	    }
	    return result;
	}

	/**
	 * Single 3 parameter gaussian function
	 * @param t Ordinate values
	 * @param p Gaussian parameters [mean, height, std]
	 * @param c Constant parameters(Not used)
	 * @returns {*}
	 */
	function singleGaussian(t,p,c){
	    var factor2 = p[2][0]*p[2][0]/2;
	    var rows = t.rows;
	    var result = new Matrix(t.rows, t.columns);
	    for(var i=0;i<rows;i++){
	        result[i][0]=p[1][0]*Math.exp(-(t[i][0]-p[0][0])*(t[i][0]-p[0][0])/factor2);
	    }
	    return result;
	}

	/**
	 * * Fits a set of points to a Lorentzian function. Returns the center of the peak, the width at half height, and the height of the signal.
	 * @param data,[y]
	 * @returns {*[]}
	 */
	function optimizeSingleLorentzian(xy, peak, opts) {
	    opts = opts || {};
	    var xy2 = parseData(xy, opts.percentage||0);

	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];
	    var nbPoints = t.rows, i;

	    var weight = [nbPoints / Math.sqrt(y_data.dot(y_data))];

	    var opts=Object.create(opts.LMOptions || [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2,    11,    9,        1 ]);
	    //var opts = [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2,    11,    9,        1 ];
	    var consts = [ ];
	    var dt = Math.abs(t[0][0]-t[1][0]);// optional vector of constants
	    var dx = new Matrix([[-dt/10000],[-1e-3],[-dt/10000]]);//-Math.abs(t[0][0]-t[1][0])/100;
	    var p_init = new Matrix([[peak.x],[1],[peak.width]]);
	    var p_min = new Matrix([[peak.x-dt],[0.75],[peak.width/4]]);
	    var p_max = new Matrix([[peak.x+dt],[1.25],[peak.width*4]]);

	    var p_fit = LM.optimize(singleLorentzian,p_init,t,y_data,weight,dx,p_min,p_max,consts,opts);


	    p_fit = p_fit.p;
	    return [p_fit[0],[p_fit[1][0]*maxY],p_fit[2]];

	}

	/**
	 * Fits a set of points to a gaussian bell. Returns the mean of the peak, the std and the height of the signal.
	 * @param data,[y]
	 * @returns {*[]}
	 */
	function optimizeSingleGaussian(xy, peak, opts) {
	    opts = opts || {};
	    var xy2 = parseData(xy, opts.percentage||0);

	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];

	    var nbPoints = t.rows, i;



	    var weight = [nbPoints / Math.sqrt(y_data.dot(y_data))];

	    var opts=Object.create(opts.LMOptions || [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2,    11,    9,        1 ]);
	    //var opts = [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2,    11,    9,        1 ];
	    var consts = [ ];                         // optional vector of constants
	    var dt = Math.abs(t[0][0]-t[1][0]);
	    var dx = new Matrix([[-dt/10000],[-1e-3],[-dt/10000]]);//-Math.abs(t[0][0]-t[1][0])/100;

	    var dx = new Matrix([[-Math.abs(t[0][0]-t[1][0])/1000],[-1e-3],[-peak.width/1000]]);
	    var p_init = new Matrix([[peak.x],[1],[peak.width]]);
	    var p_min = new Matrix([[peak.x-dt],[0.75],[peak.width/4]]);
	    var p_max = new Matrix([[peak.x+dt],[1.25],[peak.width*4]]);
	    //var p_min = new Matrix([[peak.x-peak.width/4],[0.75],[peak.width/3]]);
	    //var p_max = new Matrix([[peak.x+peak.width/4],[1.25],[peak.width*3]]);

	    var p_fit = LM.optimize(singleGaussian,p_init,t,y_data,weight,dx,p_min,p_max,consts,opts);
	    p_fit = p_fit.p;
	    return [p_fit[0],[p_fit[1][0]*maxY],p_fit[2]];
	}

	/*
	 peaks on group should sorted
	 */
	function optimizeLorentzianTrain(xy, group, opts){
	    var xy2 = parseData(xy);
	    //console.log(xy2[0].rows);
	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];
	    var currentIndex = 0;
	    var nbPoints = t.length;
	    var nextX;
	    var tI, yI, maxY;
	    var result=[], current;
	    for(var i=0; i<group.length;i++){
	        nextX = group[i].x-group[i].width*1.5;
	        //console.log(group[i]);
	        while(t[currentIndex++]<nextX&&currentIndex<nbPoints);
	        nextX = group[i].x+group[i].width*1.5;
	        tI = [];
	        yI = [];
	        while(t[currentIndex]<=nextX&&currentIndex<nbPoints){
	            tI.push(t[currentIndex][0]);
	            yI.push(y_data[currentIndex][0]*maxY);
	            currentIndex++;
	        }

	        current=optimizeSingleLorentzian([tI, yI], group[i], opts);
	        if(current){
	            result.push({"x":current[0][0],"y":current[1][0],"width":current[2][0],"opt":true});
	        }
	        else{
	            result.push({"x":group[i].x,"y":group[i].y,"width":group[i].width,"opt":false});
	        }
	    }

	    return result;

	}

	function optimizeGaussianTrain(xy, group, opts){
	    var xy2 = parseData(xy);
	    //console.log(xy2[0].rows);
	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];
	    var currentIndex = 0;
	    var nbPoints = t.length;
	    var nextX;
	    var tI, yI, maxY;
	    var result=[], current;
	    for(var i=0; i<group.length;i++){
	        nextX = group[i].x-group[i].width*1.5;
	        //console.log(group[i]);
	        while(t[currentIndex++]<nextX&&currentIndex<nbPoints);
	        nextX = group[i].x+group[i].width*1.5;
	        tI = [];
	        yI = [];
	        while(t[currentIndex]<=nextX&&currentIndex<nbPoints){
	            tI.push(t[currentIndex][0]);
	            yI.push(y_data[currentIndex][0]*maxY);
	            currentIndex++;
	        }

	        current=optimizeSingleGaussian([tI, yI], group[i], opts);
	        if(current){
	            result.push({"x":current[0][0],"y":current[1][0],"width":current[2][0],"opt":true});
	        }
	        else{
	            result.push({"x":group[i].x,"y":group[i].y,"width":group[i].width,"opt":false});
	        }
	    }

	    return result;
	}



	/**
	 *
	 * @param xy A two column matrix containing the x and y data to be fitted
	 * @param group A set of initial lorentzian parameters to be optimized [center, heigth, half_width_at_half_height]
	 * @returns {Array} A set of final lorentzian parameters [center, heigth, hwhh*2]
	 */
	function optimizeLorentzianSum(xy, group, opts){
	    var xy2 = parseData(xy);

	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];
	    var nbPoints = t.rows, i;

	    var weight = [nbPoints / math.sqrt(y_data.dot(y_data))];
	    var opts=Object.create(opts || [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2, 11, 9, 1 ]);
	    var consts = [ ];// optional vector of constants

	    var nL = group.length;
	    var p_init = new Matrix(nL*3,1);
	    var p_min =  new Matrix(nL*3,1);
	    var p_max =  new Matrix(nL*3,1);
	    var dx = new Matrix(nL*3,1);
	    var dt = Math.abs(t[0][0]-t[1][0]);
	    for( i=0;i<nL;i++){
	        p_init[i][0] = group[i].x;
	        p_init[i+nL][0] = 1;
	        p_init[i+2*nL][0] = group[i].width;

	        p_min[i][0] = group[i].x-dt;//-group[i].width/4;
	        p_min[i+nL][0] = 0;
	        p_min[i+2*nL][0] = group[i].width/4;

	        p_max[i][0] = group[i].x+dt;//+group[i].width/4;
	        p_max[i+nL][0] = 1.5;
	        p_max[i+2*nL][0] = group[i].width*4;

	        dx[i][0] = -dt/1000;
	        dx[i+nL][0] = -1e-3;
	        dx[i+2*nL][0] = -dt/1000;
	    }

	    var dx = -Math.abs(t[0][0]-t[1][0])/10000;
	    var p_fit = LM.optimize(sumOfLorentzians, p_init, t, y_data, weight, dx, p_min, p_max, consts, opts);
	    p_fit=p_fit.p;
	    //Put back the result in the correct format
	    var result = new Array(nL);
	    for( i=0;i<nL;i++){
	        result[i]=[p_fit[i],[p_fit[i+nL][0]*maxY],p_fit[i+2*nL]];
	    }

	    return result;

	}

	/**
	 *
	 * @param xy A two column matrix containing the x and y data to be fitted
	 * @param group A set of initial lorentzian parameters to be optimized [center, heigth, half_width_at_half_height]
	 * @returns {Array} A set of final lorentzian parameters [center, heigth, hwhh*2]
	 */
	function optimizeGaussianSum(xy, group, opts){
	    var xy2 = parseData(xy);

	    if(xy2===null||xy2[0].rows<3){
	        return null; //Cannot run an optimization with less than 3 points
	    }

	    var t = xy2[0];
	    var y_data = xy2[1];
	    var maxY = xy2[2];
	    var nbPoints = t.rows,i;

	    var weight = new Matrix(nbPoints,1);//[nbPoints / math.sqrt(y_data.dot(y_data))];
	    var k = nbPoints / math.sqrt(y_data.dot(y_data));
	    for(i=0;i<nbPoints;i++){
	        weight[i][0]=k;///(y_data[i][0]);
	        //weight[i][0]=k*(2-y_data[i][0]);
	    }

	    var opts=Object.create(opts || [  3,    100, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2,    11,    9,        2 ]);
	    //var opts=[  3,    100, 1e-5, 1e-6, 1e-6, 1e-6, 1e-6,    11,    9,        1 ];
	    var consts = [ ];// optional vector of constants

	    var nL = group.length;
	    var p_init = new Matrix(nL*3,1);
	    var p_min =  new Matrix(nL*3,1);
	    var p_max =  new Matrix(nL*3,1);
	    var dx = new Matrix(nL*3,1);
	    var dt = Math.abs(t[0][0]-t[1][0]);
	    for( i=0;i<nL;i++){
	        p_init[i][0] = group[i].x;
	        p_init[i+nL][0] = group[i].y/maxY;
	        p_init[i+2*nL][0] = group[i].width;

	        p_min[i][0] = group[i].x-dt;
	        p_min[i+nL][0] = group[i].y*0.8/maxY;
	        p_min[i+2*nL][0] = group[i].width/2;

	        p_max[i][0] = group[i].x+dt;
	        p_max[i+nL][0] = group[i].y*1.2/maxY;
	        p_max[i+2*nL][0] = group[i].width*2;

	        dx[i][0] = -dt/1000;
	        dx[i+nL][0] = -1e-3;
	        dx[i+2*nL][0] = -dt/1000;
	    }
	    //console.log(t);
	    var p_fit = LM.optimize(sumOfLorentzians,p_init,t,y_data,weight,dx,p_min,p_max,consts,opts);
	    p_fit = p_fit.p;
	    //Put back the result in the correct format
	    var result = new Array(nL);
	    for( i=0;i<nL;i++){
	        result[i]=[p_fit[i],[p_fit[i+nL][0]*maxY],p_fit[i+2*nL]];
	    }

	    return result;

	}
	/**
	 *
	 * Converts the given input to the required x, y column matrices. y data is normalized to max(y)=1
	 * @param xy
	 * @returns {*[]}
	 */
	function parseData(xy, threshold){
	    var nbSeries = xy.length;
	    var t = null;
	    var y_data = null, x,y;
	    var maxY = 0, i,j;

	    if(nbSeries==2){
	        //Looks like row wise matrix [x,y]
	        var nbPoints = xy[0].length;
	        //if(nbPoints<3)
	        //    throw new Exception(nbPoints);
	        //else{
	        t = new Array(nbPoints);//new Matrix(nbPoints,1);
	        y_data = new Array(nbPoints);//new Matrix(nbPoints,1);
	        x = xy[0];
	        y = xy[1];
	        if(typeof x[0] === "number"){
	            for(i=0;i<nbPoints;i++){
	                t[i]=x[i];
	                y_data[i]=y[i];
	                if(y[i]>maxY)
	                    maxY = y[i];
	            }
	        }
	        else{
	            //It is a colum matrix
	            if(typeof x[0] === "object"){
	                for(i=0;i<nbPoints;i++){
	                    t[i]=x[i][0];
	                    y_data[i]=y[i][0];
	                    if(y[i][0]>maxY)
	                        maxY = y[i][0];
	                }
	            }

	        }

	        //}
	    }
	    else{
	        //Looks like a column wise matrix [[x],[y]]
	        var nbPoints = nbSeries;
	        //if(nbPoints<3)
	        //    throw new SizeException(nbPoints);
	        //else {
	        t = new Array(nbPoints);//new Matrix(nbPoints, 1);
	        y_data = new Array(nbPoints);//new Matrix(nbPoints, 1);
	        for (i = 0; i < nbPoints; i++) {
	            t[i] = xy[i][0];
	            y_data[i] = xy[i][1];
	            if(y_data[i]>maxY)
	                maxY = y_data[i];
	        }
	        //}
	    }
	    for (i = 0; i < nbPoints; i++) {
	        y_data[i]/=maxY;
	    }
	    if(threshold){
	        for (i = nbPoints-1; i >=0; i--) {
	            if(y_data[i]<threshold) {
	                y_data.splice(i,1);
	                t.splice(i,1);
	            }
	        }
	    }
	    if(t.length>0)
	        return [(new Matrix([t])).transpose(),(new Matrix([y_data])).transpose(),maxY];
	    return null;
	}

	function sizeException(nbPoints) {
	    return new RangeError("Not enough points to perform the optimization: "+nbPoints +"< 3");
	}

	module.exports.optimizeSingleLorentzian = optimizeSingleLorentzian;
	module.exports.optimizeLorentzianSum = optimizeLorentzianSum;
	module.exports.optimizeSingleGaussian = optimizeSingleGaussian;
	module.exports.optimizeGaussianSum = optimizeGaussianSum;
	module.exports.singleGaussian = singleGaussian;
	module.exports.singleLorentzian = singleLorentzian;
	module.exports.optimizeGaussianTrain = optimizeGaussianTrain;
	module.exports.optimizeLorentzianTrain = optimizeLorentzianTrain;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(102);
	module.exports.Matrix = __webpack_require__(103);
	module.exports.Matrix.algebra = __webpack_require__(112);


/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by acastillo on 8/5/15.
	 */
	var Matrix = __webpack_require__(103);
	var math = __webpack_require__(112);

	var DEBUG = false;
	/** Levenberg Marquardt curve-fitting: minimize sum of weighted squared residuals
	 ----------  INPUT  VARIABLES  -----------
	 func   = function of n independent variables, 't', and m parameters, 'p',
	 returning the simulated model: y_hat = func(t,p,c)
	 p      = n-vector of initial guess of parameter values
	 t      = m-vectors or matrix of independent variables (used as arg to func)
	 y_dat  = m-vectors or matrix of data to be fit by func(t,p)
	 weight = weighting vector for least squares fit ( weight >= 0 ) ...
	 inverse of the standard measurement errors
	 Default:  sqrt(d.o.f. / ( y_dat' * y_dat ))
	 dp     = fractional increment of 'p' for numerical derivatives
	 dp(j)>0 central differences calculated
	 dp(j)<0 one sided 'backwards' differences calculated
	 dp(j)=0 sets corresponding partials to zero; i.e. holds p(j) fixed
	 Default:  0.001;
	 p_min  = n-vector of lower bounds for parameter values
	 p_max  = n-vector of upper bounds for parameter values
	 c      = an optional matrix of values passed to func(t,p,c)
	 opts   = vector of algorithmic parameters
	 parameter    defaults    meaning
	 opts(1)  =  prnt            3        >1 intermediate results; >2 plots
	 opts(2)  =  MaxIter      10*Npar     maximum number of iterations
	 opts(3)  =  epsilon_1       1e-3     convergence tolerance for gradient
	 opts(4)  =  epsilon_2       1e-3     convergence tolerance for parameters
	 opts(5)  =  epsilon_3       1e-3     convergence tolerance for Chi-square
	 opts(6)  =  epsilon_4       1e-2     determines acceptance of a L-M step
	 opts(7)  =  lambda_0        1e-2     initial value of L-M paramter
	 opts(8)  =  lambda_UP_fac   11       factor for increasing lambda
	 opts(9)  =  lambda_DN_fac    9       factor for decreasing lambda
	 opts(10) =  Update_Type      1       1: Levenberg-Marquardt lambda update
	 2: Quadratic update
	 3: Nielsen's lambda update equations

	 ----------  OUTPUT  VARIABLES  -----------
	 p       = least-squares optimal estimate of the parameter values
	 X2      = Chi squared criteria
	 sigma_p = asymptotic standard error of the parameters
	 sigma_y = asymptotic standard error of the curve-fit
	 corr    = correlation matrix of the parameters
	 R_sq    = R-squared cofficient of multiple determination
	 cvg_hst = convergence history

	 Henri Gavin, Dept. Civil & Environ. Engineering, Duke Univ. 22 Sep 2013
	 modified from: http://octave.sourceforge.net/optim/function/leasqr.html
	 using references by
	 Press, et al., Numerical Recipes, Cambridge Univ. Press, 1992, Chapter 15.
	 Sam Roweis       http://www.cs.toronto.edu/~roweis/notes/lm.pdf
	 Manolis Lourakis http://www.ics.forth.gr/~lourakis/levmar/levmar.pdf
	 Hans Nielson     http://www2.imm.dtu.dk/~hbn/publ/TR9905.ps
	 Mathworks        optimization toolbox reference manual
	 K. Madsen, H.B., Nielsen, and O. Tingleff
	 http://www2.imm.dtu.dk/pubdb/views/edoc_download.php/3215/pdf/imm3215.pdf
	 */
	var LM = {

	    optimize: function(func,p,t,y_dat,weight,dp,p_min,p_max,c,opts){

	        var tensor_parameter = 0;			// set to 1 of parameter is a tensor

	        var iteration  = 0;			// iteration counter
	        //func_calls = 0;			// running count of function evaluations

	        if((typeof p[0])!="object"){
	            for(var i=0;i< p.length;i++){
	                p[i]=[p[i]];
	            }

	        }
	        //p = p(:); y_dat = y_dat(:);		// make column vectors
	        var i,k;
	        var eps = 2^-52;
	        var Npar   = p.length;//length(p); 			// number of parameters
	        var Npnt   = y_dat.length;//length(y_dat);		// number of data points
	        var p_old  = Matrix.zeros(Npar,1);		// previous set of parameters
	        var y_old  = Matrix.zeros(Npnt,1);		// previous model, y_old = y_hat(t;p_old)
	        var X2     = 1e-2/eps;			// a really big initial Chi-sq value
	        var X2_old = 1e-2/eps;			// a really big initial Chi-sq value
	        var J =  Matrix.zeros(Npnt,Npar);


	        if (t.length != y_dat.length) {
	            console.log('lm.m error: the length of t must equal the length of y_dat');

	            length_t = t.length;
	            length_y_dat = y_dat.length;
	            var X2 = 0, corr = 0, sigma_p = 0, sigma_y = 0, R_sq = 0, cvg_hist = 0;
	            if (!tensor_parameter) {
	                return;
	            }
	        }

	        weight = weight||Math.sqrt((Npnt-Npar+1)/(math.multiply(math.transpose(y_dat),y_dat)));
	        dp = dp || 0.001;
	        p_min   = p_min || math.multiply(Math.abs(p),-100);
	        p_max   = p_max || math.multiply(Math.abs(p),100);
	        c = c || 1;
	        // Algorithmic Paramters
	        //prnt MaxIter  eps1  eps2  epx3  eps4  lam0  lamUP lamDN UpdateType
	        opts = opts ||[  3,10*Npar, 1e-3, 1e-3, 1e-3, 1e-2, 1e-2, 11, 9, 1 ];

	        var prnt          = opts[0];	// >1 intermediate results; >2 plots
	        var MaxIter       = opts[1];	// maximum number of iterations
	        var epsilon_1     = opts[2];	// convergence tolerance for gradient
	        var epsilon_2     = opts[3];	// convergence tolerance for parameter
	        var epsilon_3     = opts[4];	// convergence tolerance for Chi-square
	        var epsilon_4     = opts[5];	// determines acceptance of a L-M step
	        var lambda_0      = opts[6];	// initial value of damping paramter, lambda
	        var lambda_UP_fac = opts[7];	// factor for increasing lambda
	        var lambda_DN_fac = opts[8];	// factor for decreasing lambda
	        var Update_Type   = opts[9];	// 1: Levenberg-Marquardt lambda update
	        // 2: Quadratic update
	        // 3: Nielsen's lambda update equations

	        if ( tensor_parameter && prnt == 3 ) prnt = 2;


	        if(!dp.length || dp.length == 1){
	            var dp_array = new Array(Npar);
	            for(var i=0;i<Npar;i++)
	                dp_array[i]=[dp];
	            dp=dp_array;
	        }

	        // indices of the parameters to be fit
	        var idx   = [];
	        for(i=0;i<dp.length;i++){
	            if(dp[i][0]!=0){
	                idx.push(i);
	            }
	        }

	        var Nfit = idx.length;			// number of parameters to fit
	        var stop = false;				// termination flag

	        var weight_sq = null;
	        //console.log(weight);
	        if ( !weight.length || weight.length < Npnt )	{
	            // squared weighting vector
	            //weight_sq = ( weight(1)*ones(Npnt,1) ).^2;
	            //console.log("weight[0] "+typeof weight[0]);
	            var tmp = math.multiply(Matrix.ones(Npnt,1),weight[0]);
	            weight_sq = math.dotMultiply(tmp,tmp);
	        }
	        else{
	            //weight_sq = (weight(:)).^2;
	            weight_sq = math.dotMultiply(weight,weight);
	        }


	        // initialize Jacobian with finite difference calculation
	        //console.log("J "+weight_sq);
	        var result = this.lm_matx(func,t,p_old,y_old,1,J,p,y_dat,weight_sq,dp,c);
	        var JtWJ = result.JtWJ,JtWdy=result.JtWdy,X2=result.Chi_sq,y_hat=result.y_hat,J=result.J;
	        //[JtWJ,JtWdy,X2,y_hat,J] = this.lm_matx(func,t,p_old,y_old,1,J,p,y_dat,weight_sq,dp,c);
	        //console.log(JtWJ);

	        if ( Math.max(Math.abs(JtWdy)) < epsilon_1 ){
	            console.log(' *** Your Initial Guess is Extremely Close to Optimal ***')
	            console.log(' *** epsilon_1 = ', epsilon_1);
	            stop = true;
	        }


	        switch(Update_Type){
	            case 1: // Marquardt: init'l lambda
	                lambda  = lambda_0;
	                break;
	            default:    // Quadratic and Nielsen
	                lambda  = lambda_0 * Math.max(math.diag(JtWJ));
	                nu=2;
	        }
	        //console.log(X2);
	        X2_old = X2; // previous value of X2
	        //console.log(MaxIter+" "+Npar);
	        //var cvg_hst = Matrix.ones(MaxIter,Npar+3);		// initialize convergence history
	        var h = null;
	        while ( !stop && iteration <= MaxIter ) {		// --- Main Loop
	            iteration = iteration + 1;
	            // incremental change in parameters
	            switch(Update_Type){
	                case 1:					// Marquardt
	                    //h = ( JtWJ + lambda * math.diag(math.diag(JtWJ)) ) \ JtWdy;
	                    //h = math.multiply(math.inv(JtWdy),math.add(JtWJ,math.multiply(lambda,math.diag(math.diag(Npar)))));
	                    h = math.solve(math.add(JtWJ,math.multiply(math.diag(math.diag(JtWJ)),lambda)),JtWdy);
	                    break;
	                default:					// Quadratic and Nielsen
	                    //h = ( JtWJ + lambda * math.eye(Npar) ) \ JtWdy;

	                    h = math.solve(math.add(JtWJ,math.multiply( Matrix.eye(Npar),lambda)),JtWdy);
	            }

	            /*for(var k=0;k< h.length;k++){
	             h[k]=[h[k]];
	             }*/
	            //console.log("h "+h);
	            //h=math.matrix(h);
	            //  big = max(abs(h./p)) > 2;
	            //this is a big step
	            // --- Are parameters [p+h] much better than [p] ?
	            var hidx = new Array(idx.length);
	            for(k=0;k<idx.length;k++){
	                hidx[k]=h[idx[k]];
	            }
	            var p_try = math.add(p, hidx);// update the [idx] elements

	            for(k=0;k<p_try.length;k++){
	                p_try[k][0]=Math.min(Math.max(p_min[k][0],p_try[k][0]),p_max[k][0]);
	            }
	            // p_try = Math.min(Math.max(p_min,p_try),p_max);           // apply constraints

	            var delta_y = math.subtract(y_dat, func(t,p_try,c));       // residual error using p_try
	            //func_calls = func_calls + 1;
	            //X2_try = delta_y' * ( delta_y .* weight_sq );  // Chi-squared error criteria

	            var X2_try = math.multiply(math.transpose(delta_y),math.dotMultiply(delta_y,weight_sq));

	            if ( Update_Type == 2 ){  			  // Quadratic
	                //    One step of quadratic line update in the h direction for minimum X2
	                //var alpha =  JtWdy'*h / ( (X2_try - X2)/2 + 2*JtWdy'*h ) ;
	                var JtWdy_th = math.multiply(math.transpose(JtWdy),h);
	                var alpha =  math.multiply(JtWdy_th,math.inv(math.add(math.multiply(math.subtract(X2_try - X2),1/2)),math.multiply(JtWdy_th,2)));//JtWdy'*h / ( (X2_try - X2)/2 + 2*JtWdy'*h ) ;

	                h = math.multiply(alpha, h);
	                for(var k=0;k<idx.length;k++){
	                    hidx[k]=h[idx[k]];
	                }

	                p_try = math.add(p ,hidx);                     // update only [idx] elements
	                p_try = math.min(math.max(p_min,p_try),p_max);          // apply constraints

	                delta_y = math.subtract(y_dat, func(t,p_try,c));      // residual error using p_try
	                // func_calls = func_calls + 1;
	                //X2_try = delta_y' * ( delta_y .* weight_sq ); // Chi-squared error criteria
	                X2_try = math.multiply(math.transpose(delta_y), mat.dotMultiply(delta_y, weight_sq));
	            }

	            //rho = (X2 - X2_try) / ( 2*h' * (lambda * h + JtWdy) ); // Nielsen
	            var rho = (X2-X2_try)/math.multiply(math.multiply(math.transpose(h),2),math.add(math.multiply(lambda, h),JtWdy));
	            //console.log("rho "+rho);
	            if ( rho > epsilon_4 ) {		// it IS significantly better
	                //console.log("Here");
	                dX2 = X2 - X2_old;
	                X2_old = X2;
	                p_old = p;
	                y_old = y_hat;
	                p = p_try;			// accept p_try

	                result = this.lm_matx(func, t, p_old, y_old, dX2, J, p, y_dat, weight_sq, dp, c);
	                JtWJ = result.JtWJ,JtWdy=result.JtWdy,X2=result.Chi_sq,y_hat=result.y_hat,J=result.J;
	                // decrease lambda ==> Gauss-Newton method

	                switch (Update_Type) {
	                    case 1:							// Levenberg
	                        lambda = Math.max(lambda / lambda_DN_fac, 1.e-7);
	                        break;
	                    case 2:							// Quadratic
	                        lambda = Math.max(lambda / (1 + alpha), 1.e-7);
	                        break;
	                    case 3:							// Nielsen
	                        lambda = math.multiply(Math.max(1 / 3, 1 - (2 * rho - 1) ^ 3),lambda);
	                        nu = 2;
	                        break;
	                }
	            }
	            else {					// it IS NOT better
	                X2 = X2_old;			// do not accept p_try
	                if (iteration%(2 * Npar)==0) {	// rank-1 update of Jacobian
	                    result = this.lm_matx(func, t, p_old, y_old, -1, J, p, y_dat, weight_sq, dp, c);
	                    JtWJ = result.JtWJ,JtWdy=result.JtWdy,dX2=result.Chi_sq,y_hat=result.y_hat,J=result.J;
	                }

	                // increase lambda  ==> gradient descent method
	                switch (Update_Type) {
	                    case 1:							// Levenberg
	                        lambda = Math.min(lambda * lambda_UP_fac, 1.e7);
	                        break;
	                    case 2:							// Quadratic
	                        lambda = lambda + Math.abs((X2_try - X2) / 2 / alpha);
	                        break;
	                    case 3:						// Nielsen
	                        lambda = lambda * nu;
	                        nu = 2 * nu;
	                        break;
	                }
	            }
	        }// --- End of Main Loop

	        // --- convergence achieved, find covariance and confidence intervals

	        // equal weights for paramter error analysis
	        weight_sq = math.multiply(math.multiply(math.transpose(delta_y),delta_y), Matrix.ones(Npnt,1));

	        weight_sq.apply(function(i,j){
	            weight_sq[i][j] = (Npnt-Nfit+1)/weight_sq[i][j];
	        });
	        //console.log(weight_sq);
	        result = this.lm_matx(func,t,p_old,y_old,-1,J,p,y_dat,weight_sq,dp,c);
	        JtWJ = result.JtWJ,JtWdy=result.JtWdy,X2=result.Chi_sq,y_hat=result.y_hat,J=result.J;

	        /*if nargout > 2				// standard error of parameters
	         covar = inv(JtWJ);
	         sigma_p = sqrt(diag(covar));
	         end

	         if nargout > 3				// standard error of the fit
	         //  sigma_y = sqrt(diag(J * covar * J'));	// slower version of below
	         sigma_y = zeros(Npnt,1);
	         for i=1:Npnt
	         sigma_y(i) = J(i,:) * covar * J(i,:)';
	         end
	         sigma_y = sqrt(sigma_y);
	         end

	         if nargout > 4				// parameter correlation matrix
	         corr = covar ./ [sigma_p*sigma_p'];
	         end

	         if nargout > 5				// coefficient of multiple determination
	         R_sq = corrcoef([y_dat y_hat]);
	         R_sq = R_sq(1,2).^2;
	         end

	         if nargout > 6				// convergence history
	         cvg_hst = cvg_hst(1:iteration,:);
	         end*/

	        // endfunction  # ---------------------------------------------------------- LM

	        return { p:p, X2:X2};
	    },

	    lm_FD_J:function(func,t,p,y,dp,c) {
	        // J = lm_FD_J(func,t,p,y,{dp},{c})
	        //
	        // partial derivatives (Jacobian) dy/dp for use with lm.m
	        // computed via Finite Differences
	        // Requires n or 2n function evaluations, n = number of nonzero values of dp
	        // -------- INPUT VARIABLES ---------
	        // func = function of independent variables, 't', and parameters, 'p',
	        //        returning the simulated model: y_hat = func(t,p,c)
	        // t  = m-vector of independent variables (used as arg to func)
	        // p  = n-vector of current parameter values
	        // y  = func(t,p,c) n-vector initialised by user before each call to lm_FD_J
	        // dp = fractional increment of p for numerical derivatives
	        //      dp(j)>0 central differences calculated
	        //      dp(j)<0 one sided differences calculated
	        //      dp(j)=0 sets corresponding partials to zero; i.e. holds p(j) fixed
	        //      Default:  0.001;
	        // c  = optional vector of constants passed to y_hat = func(t,p,c)
	        //---------- OUTPUT VARIABLES -------
	        // J  = Jacobian Matrix J(i,j)=dy(i)/dp(j)	i=1:n; j=1:m

	        //   Henri Gavin, Dept. Civil & Environ. Engineering, Duke Univ. November 2005
	        //   modified from: ftp://fly.cnuce.cnr.it/pub/software/octave/leasqr/
	        //   Press, et al., Numerical Recipes, Cambridge Univ. Press, 1992, Chapter 15.

	        var m = y.length;			// number of data points
	        var n = p.length;			// number of parameters

	        dp = dp || math.multiply( Matrix.ones(n, 1), 0.001);

	        var ps = p.clone();//JSON.parse(JSON.stringify(p));
	        //var ps = $.extend(true, [], p);
	        var J = new Matrix(m,n), del =new Array(n);         // initialize Jacobian to Zero

	        for (var j = 0;j < n; j++) {
	            //console.log(j+" "+dp[j]+" "+p[j]+" "+ps[j]+" "+del[j]);
	            del[j] = dp[j]*(1+Math.abs(p[j][0]));  // parameter perturbation
	            p[j] = [ps[j][0]+del[j]];	      // perturb parameter p(j)
	            //console.log(j+" "+dp[j]+" "+p[j]+" "+ps[j]+" "+del[j]);

	            if (del[j] != 0){
	                y1 = func(t, p, c);
	                //func_calls = func_calls + 1;
	                if (dp[j][0] < 0) {		// backwards difference
	                    //J(:,j) = math.dotDivide(math.subtract(y1, y),del[j]);//. / del[j];
	                    //console.log(del[j]);
	                    //console.log(y);
	                    var column = math.dotDivide(math.subtract(y1, y),del[j]);
	                    for(var k=0;k< m;k++){
	                        J[k][j]=column[k][0];
	                    }
	                    //console.log(column);
	                }
	                else{
	                    p[j][0] = ps[j][0] - del[j];
	                    //J(:,j) = (y1 - feval(func, t, p, c)). / (2. * del[j]);
	                    var column = math.dotDivide(math.subtract(y1,func(t,p,c)),2*del[j]);
	                    for(var k=0;k< m;k++){
	                        J[k][j]=column[k][0];
	                    }

	                }			// central difference, additional func call
	            }

	            p[j] = ps[j];		// restore p(j)

	        }
	        //console.log("lm_FD_J: "+ JSON.stringify(J));
	        return J;

	    },

	    // endfunction # -------------------------------------------------- LM_FD_J
	    lm_Broyden_J: function(p_old,y_old,J,p,y){
	        // J = lm_Broyden_J(p_old,y_old,J,p,y)
	        // carry out a rank-1 update to the Jacobian matrix using Broyden's equation
	        //---------- INPUT VARIABLES -------
	        // p_old = previous set of parameters
	        // y_old = model evaluation at previous set of parameters, y_hat(t;p_old)
	        // J  = current version of the Jacobian matrix
	        // p     = current  set of parameters
	        // y     = model evaluation at current  set of parameters, y_hat(t;p)
	        //---------- OUTPUT VARIABLES -------
	        // J = rank-1 update to Jacobian Matrix J(i,j)=dy(i)/dp(j)	i=1:n; j=1:m
	        //console.log(p+" X "+ p_old)
	        var h  = math.subtract(p, p_old);

	        //console.log("hhh "+h);
	        var h_t = math.transpose(h);
	        h_t.div(math.multiply(h_t,h));

	        //console.log(h_t);
	        //J = J + ( y - y_old - J*h )*h' / (h'*h);	// Broyden rank-1 update eq'n
	        J = math.add(J, math.multiply(math.subtract(y, math.add(y_old,math.multiply(J,h))),h_t));
	        return J;
	        // endfunction # ---------------------------------------------- LM_Broyden_J
	    },

	    lm_matx : function (func,t,p_old,y_old,dX2,J,p,y_dat,weight_sq,dp,c,iteration){
	        // [JtWJ,JtWdy,Chi_sq,y_hat,J] = this.lm_matx(func,t,p_old,y_old,dX2,J,p,y_dat,weight_sq,{da},{c})
	        //
	        // Evaluate the linearized fitting matrix, JtWJ, and vector JtWdy,
	        // and calculate the Chi-squared error function, Chi_sq
	        // Used by Levenberg-Marquard algorithm, lm.m
	        // -------- INPUT VARIABLES ---------
	        // func   = function ofpn independent variables, p, and m parameters, p,
	        //         returning the simulated model: y_hat = func(t,p,c)
	        // t      = m-vectors or matrix of independent variables (used as arg to func)
	        // p_old  = n-vector of previous parameter values
	        // y_old  = m-vector of previous model ... y_old = y_hat(t;p_old);
	        // dX2    = previous change in Chi-squared criteria
	        // J   = m-by-n Jacobian of model, y_hat, with respect to parameters, p
	        // p      = n-vector of current  parameter values
	        // y_dat  = n-vector of data to be fit by func(t,p,c)
	        // weight_sq = square of the weighting vector for least squares fit ...
	        //	    inverse of the standard measurement errors
	        // dp     = fractional increment of 'p' for numerical derivatives
	        //          dp(j)>0 central differences calculated
	        //          dp(j)<0 one sided differences calculated
	        //          dp(j)=0 sets corresponding partials to zero; i.e. holds p(j) fixed
	        //          Default:  0.001;
	        // c      = optional vector of constants passed to y_hat = func(t,p,c)
	        //---------- OUTPUT VARIABLES -------
	        // JtWJ	 = linearized Hessian matrix (inverse of covariance matrix)
	        // JtWdy   = linearized fitting vector
	        // Chi_sq = Chi-squared criteria: weighted sum of the squared residuals WSSR
	        // y_hat  = model evaluated with parameters 'p'
	        // J   = m-by-n Jacobian of model, y_hat, with respect to parameters, p

	        //   Henri Gavin, Dept. Civil & Environ. Engineering, Duke Univ. November 2005
	        //   modified from: ftp://fly.cnuce.cnr.it/pub/software/octave/leasqr/
	        //   Press, et al., Numerical Recipes, Cambridge Univ. Press, 1992, Chapter 15.


	        var Npnt = y_dat.length;		// number of data points
	        var Npar = p.length;		// number of parameters

	        dp = dp || 0.001;


	        //var JtWJ = new Matrix.zeros(Npar);
	        //var JtWdy  = new Matrix.zeros(Npar,1);

	        var y_hat = func(t,p,c);	// evaluate model using parameters 'p'
	        //func_calls = func_calls + 1;
	        //console.log(J);
	        if ( (iteration%(2*Npar))==0 || dX2 > 0 ) {
	            //console.log("Par");
	            J = this.lm_FD_J(func, t, p, y_hat, dp, c);		// finite difference
	        }
	        else{
	            //console.log("ImPar");
	            J = this.lm_Broyden_J(p_old, y_old, J, p, y_hat); // rank-1 update
	        }
	        var delta_y = math.subtract(y_dat, y_hat);	// residual error between model and data
	        //console.log(delta_y[0][0]);
	        //console.log(delta_y.rows+" "+delta_y.columns+" "+JSON.stringify(weight_sq));
	        //var Chi_sq = delta_y' * ( delta_y .* weight_sq ); 	// Chi-squared error criteria
	        var Chi_sq = math.multiply(math.transpose(delta_y),math.dotMultiply(delta_y,weight_sq));
	        //JtWJ  = J' * ( J .* ( weight_sq * ones(1,Npar) ) );
	        var Jt = math.transpose(J);

	        //console.log(weight_sq);

	        var JtWJ = math.multiply(Jt, math.dotMultiply(J,math.multiply(weight_sq, Matrix.ones(1,Npar))));

	        //JtWdy = J' * ( weight_sq .* delta_y );
	        var JtWdy = math.multiply(Jt, math.dotMultiply(weight_sq,delta_y));


	        return {JtWJ:JtWJ,JtWdy:JtWdy,Chi_sq:Chi_sq,y_hat:y_hat,J:J};
	        // endfunction  # ------------------------------------------------------ LM_MATX
	    }



	};

	module.exports = LM;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(104);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(105);


/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);

	var SingularValueDecomposition = __webpack_require__(106);
	var EigenvalueDecomposition = __webpack_require__(108);
	var LuDecomposition = __webpack_require__(109);
	var QrDecomposition = __webpack_require__(110);
	var CholeskyDecomposition = __webpack_require__(111);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);
	var hypotenuse = __webpack_require__(107).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 107 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);
	var hypotenuse = __webpack_require__(107).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);
	var hypotenuse = __webpack_require__(107).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(104);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by acastillo on 8/24/15.
	 */
	/**
	 * Non in-place function definitions, compatible with mathjs code *
	 */

	'use strict';

	var Matrix = __webpack_require__(103);

	function matrix(A,B){
	    return new Matrix(A,B);
	}

	function ones(rows, cols){
	    return Matrix.ones(rows,cols);
	}

	function eye(rows, cols){
	    return Matrix.eye(rows, cols);
	}

	function zeros(rows, cols){
	    return Matrix.zeros(rows, cols);
	}

	function random(rows, cols){
	    return Matrix.rand(rows,cols);
	}

	function transpose(A){
	    if(typeof A == 'number')
	        return A;
	    var result = A.clone();
	    return result.transpose();
	}

	function add(A, B){
	    if(typeof A == 'number'&&typeof B === 'number')
	        return A+B;
	    if(typeof A == 'number')
	        return this.add(B,A);

	    var result = A.clone();
	    return result.add(B);

	}

	function subtract(A, B){
	    if(typeof A == 'number'&&typeof B === 'number')
	        return A-B;
	    if(typeof A == 'number')
	        return this.subtract(B,A);
	    var result = A.clone();
	    return result.sub(B);
	}

	function multiply(A, B){
	    if(typeof A == 'number'&&typeof B === 'number')
	        return A*B;
	    if(typeof A == 'number')
	        return this.multiply(B,A);

	    var result = A.clone();

	    if(typeof B === 'number')
	        result.mul(B);
	    else
	        result = result.mmul(B);

	    if(result.rows==1&&result.columns==1)
	        return result[0][0];
	    else
	        return result;

	}

	function dotMultiply(A, B){
	    var result = A.clone();
	    return result.mul(B);
	}

	function dotDivide(A, B){
	    var result = A.clone();
	    return result.div(B);
	}

	function diag(A){
	    var diag = null;
	    var rows = A.rows, cols = A.columns, j, r;
	    //It is an array
	    if(typeof cols === "undefined" && (typeof A)=='object'){
	        if(A[0]&&A[0].length){
	            rows = A.length;
	            cols = A[0].length;
	            r = Math.min(rows,cols);
	            diag = Matrix.zeros(cols, cols);
	            for (j = 0; j < cols; j++) {
	                diag[j][j]=A[j][j];
	            }
	        }
	        else{
	            cols = A.length;
	            diag = Matrix.zeros(cols, cols);
	            for (j = 0; j < cols; j++) {
	                diag[j][j]=A[j];
	            }
	        }

	    }
	    if(rows == 1){
	        diag = Matrix.zeros(cols, cols);
	        for (j = 0; j < cols; j++) {
	            diag[j][j]=A[0][j];
	        }
	    }
	    else{
	        if(rows>0 && cols > 0){
	            r = Math.min(rows,cols);
	            diag = new Array(r);
	            for (j = 0; j < r; j++) {
	                diag[j] = A[j][j];
	            }
	        }
	    }
	    return diag;
	}

	function min(A, B){
	    if(typeof A==='number' && typeof B ==='number')
	        return Math.min(A,B);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (A[i][j] < B[i][j]) {
	                result[i][j] = A[i][j];
	            }
	            else{
	                result[i][j] = B[i][j];
	            }
	        }
	    }
	    return result;
	}

	function max(A, B){
	    if(typeof A==='number' && typeof B ==='number')
	        return Math.max(A,B);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (A[i][j] > B[i][j]) {
	                result[i][j] = A[i][j];
	            }
	            else{
	                result[i][j] = B[i][j];
	            }
	        }
	    }
	    return result;
	}

	function sqrt(A){
	    if(typeof A==='number' )
	        return Math.sqrt(A);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[i][j] = Math.sqrt(A[i][j]);

	        }
	    }
	    return result;
	}

	function abs(A){
	    if(typeof A==='number' )
	        return Math.abs(A);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[i][j] = Math.abs(A[i][j]);

	        }
	    }
	    return result;
	}

	function exp(A){
	    if(typeof A==='number' )
	        return Math.sqrt(A);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[i][j] = Math.exp(A[i][j]);
	        }
	    }
	    return result;
	}

	function dotPow(A, b){
	    if(typeof A==='number' )
	        return Math.pow(A,b);
	    //console.log(A);
	    var ii = A.rows, jj = A.columns;
	    var result = new Matrix(ii,jj);
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[i][j] = Math.pow(A[i][j],b);
	        }
	    }
	    return result;
	}

	function solve(A, B){
	    return A.solve(B);
	}

	function inv(A){
	    if(typeof A ==="number")
	        return 1/A;
	    return A.inverse();
	}

	module.exports = {
	    transpose:transpose,
	    add:add,
	    subtract:subtract,
	    multiply:multiply,
	    dotMultiply:dotMultiply,
	    dotDivide:dotDivide,
	    diag:diag,
	    min:min,
	    max:max,
	    solve:solve,
	    inv:inv,
	    sqrt:sqrt,
	    exp:exp,
	    dotPow:dotPow,
	    abs:abs,
	    matrix:matrix,
	    ones:ones,
	    zeros:zeros,
	    random:random,
	    eye:eye
	};


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(114);
	module.exports.Decompositions = module.exports.DC = __webpack_require__(115);


/***/ },
/* 114 */
/***/ function(module, exports) {

	'use strict';

	var Asplice = Array.prototype.splice,
	    Aconcat = Array.prototype.concat;

	// For performance : http://jsperf.com/clone-array-slice-vs-while-vs-for
	function slice(arr) {
	    var i = 0,
	        ii = arr.length,
	        result = new Array(ii);
	    for (; i < ii; i++) {
	        result[i] = arr[i];
	    }
	    return result;
	}

	/**
	 * Real matrix.
	 * @constructor
	 * @param {number|Array} nRows - Number of rows of the new matrix or a 2D array containing the data.
	 * @param {number|boolean} [nColumns] - Number of columns of the new matrix or a boolean specifying if the input array should be cloned
	 */
	function Matrix(nRows, nColumns) {
	    var i = 0, rows, columns, matrix, newInstance;
	    if (Array.isArray(nRows)) {
	        newInstance = nColumns;
	        matrix = newInstance ? slice(nRows) : nRows;
	        nRows = matrix.length;
	        nColumns = matrix[0].length;
	        if (typeof nColumns === 'undefined') {
	            throw new TypeError('Data must be a 2D array');
	        }
	        if (nRows > 0 && nColumns > 0) {
	            for (; i < nRows; i++) {
	                if (matrix[i].length !== nColumns) {
	                    throw new RangeError('Inconsistent array dimensions');
	                } else if (newInstance) {
	                    matrix[i] = slice(matrix[i]);
	                }
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else if (typeof nRows === 'number') { // Create empty matrix
	        if (nRows > 0 && nColumns > 0) {
	            matrix = new Array(nRows);
	            for (; i < nRows; i++) {
	                matrix[i] = new Array(nColumns);
	            }
	        } else {
	            throw new RangeError('Invalid dimensions: ' + nRows + 'x' + nColumns);
	        }
	    } else {
	        throw new TypeError('Invalid arguments');
	    }

	    Object.defineProperty(matrix, 'rows', {writable: true, value: nRows});
	    Object.defineProperty(matrix, 'columns', {writable: true, value: nColumns});

	    matrix.__proto__ = Matrix.prototype;

	    return matrix;
	}

	/**
	 * Constructs a Matrix with the chosen dimensions from a 1D array.
	 * @param {number} newRows - Number of rows
	 * @param {number} newColumns - Number of columns
	 * @param {Array} newData - A 1D array containing data for the matrix
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.from1DArray = function from1DArray(newRows, newColumns, newData) {
	    var length, data, i = 0;

	    length = newRows * newColumns;
	    if (length !== newData.length)
	        throw new RangeError('Data length does not match given dimensions');

	    data = new Array(newRows);
	    for (; i < newRows; i++) {
	        data[i] = newData.slice(i * newColumns, (i + 1) * newColumns);
	    }
	    return new Matrix(data);
	};

	/**
	 * Creates a row vector, a matrix with only one row.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.rowVector = function rowVector(newData) {
	    return new Matrix([newData]);
	};

	/**
	 * Creates a column vector, a matrix with only one column.
	 * @param {Array} newData - A 1D array containing data for the vector
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.columnVector = function columnVector(newData) {
	    var l = newData.length, vector = new Array(l);
	    for (var i = 0; i < l; i++)
	        vector[i] = [newData[i]];
	    return new Matrix(vector);
	};

	/**
	 * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.empty = function empty(rows, columns) {
	    return new Matrix(rows, columns);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to zero.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.zeros = function zeros(rows, columns) {
	    return Matrix.empty(rows, columns).fill(0);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be set to one.
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.ones = function ones(rows, columns) {
	    return Matrix.empty(rows, columns).fill(1);
	};

	/**
	 * Creates a matrix with the given dimensions. Values will be randomly set using Math.random().
	 * @param {number} rows - Number of rows
	 * @param {number} columns - Number of columns
	 * @returns {Matrix} The new matrix
	 */
	Matrix.rand = function rand(rows, columns) {
	    var matrix = Matrix.empty(rows, columns);
	    for (var i = 0, ii = matrix.rows; i < ii; i++) {
	        for (var j = 0, jj = matrix.columns; j < jj; j++) {
	            matrix[i][j] = Math.random();
	        }
	    }
	    return matrix;
	};

	/**
	 * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and other will be 0.
	 * @param {number} n - Number of rows and columns
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.eye = function eye(n) {
	    var matrix = Matrix.zeros(n, n), l = matrix.rows;
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = 1;
	    }
	    return matrix;
	};

	/**
	 * Creates a diagonal matrix based on the given array.
	 * @param {Array} data - Array containing the data for the diagonal
	 * @returns {Matrix} - The new matrix
	 */
	Matrix.diag = function diag(data) {
	    var l = data.length, matrix = Matrix.zeros(l, l);
	    for (var i = 0; i < l; i++) {
	        matrix[i][i] = data[i];
	    }
	    return matrix;
	};

	/**
	 * Creates an array of indices between two values
	 * @param {number} from
	 * @param {number} to
	 * @returns {Array}
	 */
	Matrix.indices = function indices(from, to) {
	    var vector = new Array(to - from);
	    for (var i = 0; i < vector.length; i++)
	        vector[i] = from++;
	    return vector;
	};

	// TODO DOC
	Matrix.stack = function stack(arg1) {
	    var i, j, k;
	    if (Matrix.isMatrix(arg1)) {
	        var rows = 0,
	            cols = 0;
	        for (i = 0; i < arguments.length; i++) {
	            rows += arguments[i].rows;
	            if (arguments[i].columns > cols)
	                cols = arguments[i].columns;
	        }

	        var r = Matrix.zeros(rows, cols);
	        var c = 0;
	        for (i = 0; i < arguments.length; i++) {
	            var current = arguments[i];
	            for (j = 0; j < current.rows; j++) {
	                for (k = 0; k < current.columns; k++)
	                    r[c][k] = current[j][k];
	                c++;
	            }
	        }
	        return r;
	    }
	    else if (Array.isArray(arg1)) {
	        var matrix = Matrix.empty(arguments.length, arg1.length);
	        for (i = 0; i < arguments.length; i++)
	            matrix.setRow(i, arguments[i]);
	        return matrix;
	    }
	};

	// TODO DOC
	Matrix.expand = function expand(base, count) {
	    var expansion = [];
	    for (var i = 0; i < count.length; i++)
	        for (var j = 0; j < count[i]; j++)
	            expansion.push(base[i]);
	    return new Matrix(expansion);
	};

	/**
	 * Check that the provided value is a Matrix and tries to instantiate one if not
	 * @param value - The value to check
	 * @returns {Matrix}
	 * @throws {TypeError}
	 */
	Matrix.checkMatrix = function checkMatrix(value) {
	    if (!value) {
	        throw new TypeError('Argument has to be a matrix');
	    }
	    if (value.klass !== 'Matrix') {
	        value = new Matrix(value);
	    }
	    return value;
	};

	/**
	 * Returns true if the argument is a Matrix, false otherwise
	 * @param value - The value to check
	 * @returns {boolean}
	 */
	Matrix.isMatrix = function isMatrix(value) {
	    return value ? value.klass === 'Matrix' : false;
	};

	/**
	 * @property {string} - The name of this class.
	 */
	Object.defineProperty(Matrix.prototype, 'klass', {
	    get: function klass() {
	        return 'Matrix';
	    }
	});

	/**
	 * @property {number} - The number of elements in the matrix.
	 */
	Object.defineProperty(Matrix.prototype, 'size', {
	    get: function size() {
	        return this.rows * this.columns;
	    }
	});

	/**
	 * @private
	 * Internal check that a row index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkRowIndex = function checkRowIndex(index) {
	    if (index < 0 || index > this.rows - 1)
	        throw new RangeError('Row index out of range.');
	};

	/**
	 * @private
	 * Internal check that a column index is not out of bounds
	 * @param {number} index
	 */
	Matrix.prototype.checkColumnIndex = function checkColumnIndex(index) {
	    if (index < 0 || index > this.columns - 1)
	        throw new RangeError('Column index out of range.');
	};

	/**
	 * @private
	 * Internal check that two matrices have the same dimensions
	 * @param {Matrix} otherMatrix
	 */
	Matrix.prototype.checkDimensions = function checkDimensions(otherMatrix) {
	    if ((this.rows !== otherMatrix.rows) || (this.columns !== otherMatrix.columns))
	        throw new RangeError('Matrices dimensions must be equal.');
	};

	/**
	 * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
	 * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.apply = function apply(callback) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            callback.call(this, i, j);
	        }
	    }
	    return this;
	};

	/**
	 * Creates an exact and independent copy of the matrix
	 * @returns {Matrix}
	 */
	Matrix.prototype.clone = function clone() {
	    return new Matrix(this.to2DArray());
	};

	/**
	 * Returns a new 1D array filled row by row with the matrix values
	 * @returns {Array}
	 */
	Matrix.prototype.to1DArray = function to1DArray() {
	    return Aconcat.apply([], this);
	};

	/**
	 * Returns a 2D array containing a copy of the data
	 * @returns {Array}
	 */
	Matrix.prototype.to2DArray = function to2DArray() {
	    var l = this.rows, copy = new Array(l);
	    for (var i = 0; i < l; i++) {
	        copy[i] = slice(this[i]);
	    }
	    return copy;
	};

	/**
	 * @returns {boolean} true if the matrix has one row
	 */
	Matrix.prototype.isRowVector = function isRowVector() {
	    return this.rows === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one column
	 */
	Matrix.prototype.isColumnVector = function isColumnVector() {
	    return this.columns === 1;
	};

	/**
	 * @returns {boolean} true if the matrix has one row or one column
	 */
	Matrix.prototype.isVector = function isVector() {
	    return (this.rows === 1) || (this.columns === 1);
	};

	/**
	 * @returns {boolean} true if the matrix has the same number of rows and columns
	 */
	Matrix.prototype.isSquare = function isSquare() {
	    return this.rows === this.columns;
	};

	/**
	 * @returns {boolean} true if the matrix is square and has the same values on both sides of the diagonal
	 */
	Matrix.prototype.isSymmetric = function isSymmetric() {
	    if (this.isSquare()) {
	        var l = this.rows;
	        for (var i = 0; i < l; i++) {
	            for (var j = 0; j <= i; j++) {
	                if (this[i][j] !== this[j][i]) {
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	    return false;
	};

	/**
	 * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @param {number} value - The new value for the element
	 * @returns {Matrix} this
	 */
	Matrix.prototype.set = function set(rowIndex, columnIndex, value) {
	    this[rowIndex][columnIndex] = value;
	    return this;
	};

	/**
	 * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
	 * @param {number} rowIndex - Index of the row
	 * @param {number} columnIndex - Index of the column
	 * @returns {number}
	 */
	Matrix.prototype.get = function get(rowIndex, columnIndex) {
	    return this[rowIndex][columnIndex];
	};

	/**
	 * Fills the matrix with a given value. All elements will be set to this value.
	 * @param {number} value - New value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.fill = function fill(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = value;
	        }
	    }
	    return this;
	};

	/**
	 * Negates the matrix. All elements will be multiplied by (-1)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.neg = function neg() {
	    return this.mulS(-1);
	};

	/**
	 * Adds a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.add = function add(value) {
	    if (typeof value === 'number')
	        return this.addS(value);
	    value = Matrix.checkMatrix(value);
	        return this.addM(value);
	};

	/**
	 * Adds a scalar to each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addS = function addS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += value;
	        }
	    }
	    return this;
	};

	/**
	 * Adds the value of each element of matrix to the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addM = function addM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sub = function sub(value) {
	    if (typeof value === 'number')
	        return this.subS(value);
	    value = Matrix.checkMatrix(value);
	        return this.subM(value);
	};

	/**
	 * Subtracts a scalar from each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subS = function subS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= value;
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the value of each element of matrix from the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subM = function subM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mul = function mul(value) {
	    if (typeof value === 'number')
	        return this.mulS(value);
	    value = Matrix.checkMatrix(value);
	        return this.mulM(value);
	};

	/**
	 * Multiplies a scalar with each element of the matrix
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulS = function mulS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= value;
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the value of each element of matrix with the corresponding element of this
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulM = function mulM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides by a scalar or values from another matrix (in place)
	 * @param {number|Matrix} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.div = function div(value) {
	    if (typeof value === 'number')
	        return this.divS(value);
	    value = Matrix.checkMatrix(value);
	        return this.divM(value);
	};

	/**
	 * Divides each element of the matrix by a scalar
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divS = function divS(value) {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= value;
	        }
	    }
	    return this;
	};

	/**
	 * Divides each element of this by the corresponding element of matrix
	 * @param {Matrix} matrix
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divM = function divM(matrix) {
	    this.checkDimensions(matrix);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= matrix[i][j];
	        }
	    }
	    return this;
	};

	/**
	 * Returns a new array from the given row index
	 * @param {number} index - Row index
	 * @returns {Array}
	 */
	Matrix.prototype.getRow = function getRow(index) {
	    this.checkRowIndex(index);
	    return slice(this[index]);
	};

	/**
	 * Returns a new row vector from the given row index
	 * @param {number} index - Row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getRowVector = function getRowVector(index) {
	    return Matrix.rowVector(this.getRow(index));
	};

	/**
	 * Sets a row at the given index
	 * @param {number} index - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setRow = function setRow(index, array) {
	    this.checkRowIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    this[index] = slice(array);
	    return this;
	};

	/**
	 * Removes a row from the given index
	 * @param {number} index - Row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeRow = function removeRow(index) {
	    this.checkRowIndex(index);
	    if (this.rows === 1)
	        throw new RangeError('A matrix cannot have less than one row');
	    Asplice.call(this, index, 1);
	    this.rows -= 1;
	    return this;
	};

	/**
	 * Adds a row at the given index
	 * @param {number} [index = this.rows] - Row index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRow = function addRow(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.rows;
	    }
	    if (index < 0 || index > this.rows)
	        throw new RangeError('Row index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    if (array.length !== this.columns)
	        throw new RangeError('Invalid row size');
	    Asplice.call(this, index, 0, slice(array));
	    this.rows += 1;
	    return this;
	};

	/**
	 * Swaps two rows
	 * @param {number} row1 - First row index
	 * @param {number} row2 - Second row index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapRows = function swapRows(row1, row2) {
	    this.checkRowIndex(row1);
	    this.checkRowIndex(row2);
	    var temp = this[row1];
	    this[row1] = this[row2];
	    this[row2] = temp;
	    return this;
	};

	/**
	 * Returns a new array from the given column index
	 * @param {number} index - Column index
	 * @returns {Array}
	 */
	Matrix.prototype.getColumn = function getColumn(index) {
	    this.checkColumnIndex(index);
	    var l = this.rows, column = new Array(l);
	    for (var i = 0; i < l; i++) {
	        column[i] = this[i][index];
	    }
	    return column;
	};

	/**
	 * Returns a new column vector from the given column index
	 * @param {number} index - Column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.getColumnVector = function getColumnVector(index) {
	    return Matrix.columnVector(this.getColumn(index));
	};

	/**
	 * Sets a column at the given index
	 * @param {number} index - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.setColumn = function setColumn(index, array) {
	    this.checkColumnIndex(index);
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i][index] = array[i];
	    }
	    return this;
	};

	/**
	 * Removes a column from the given index
	 * @param {number} index - Column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.removeColumn = function removeColumn(index) {
	    this.checkColumnIndex(index);
	    if (this.columns === 1)
	        throw new RangeError('A matrix cannot have less than one column');
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].splice(index, 1);
	    }
	    this.columns -= 1;
	    return this;
	};

	/**
	 * Adds a column at the given index
	 * @param {number} [index = this.columns] - Column index
	 * @param {Array|Matrix} array - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumn = function addColumn(index, array) {
	    if (typeof array === 'undefined') {
	        array = index;
	        index = this.columns;
	    }
	    if (index < 0 || index > this.columns)
	        throw new RangeError('Column index out of range.');
	    if (Matrix.isMatrix(array)) array = array.to1DArray();
	    var l = this.rows;
	    if (array.length !== l)
	        throw new RangeError('Invalid column size');
	    for (var i = 0; i < l; i++) {
	        this[i].splice(index, 0, array[i]);
	    }
	    this.columns += 1;
	    return this;
	};

	/**
	 * Swaps two columns
	 * @param {number} column1 - First column index
	 * @param {number} column2 - Second column index
	 * @returns {Matrix} this
	 */
	Matrix.prototype.swapColumns = function swapColumns(column1, column2) {
	    this.checkRowIndex(column1);
	    this.checkRowIndex(column2);
	    var l = this.rows, temp, row;
	    for (var i = 0; i < l; i++) {
	        row = this[i];
	        temp = row[column1];
	        row[column1] = row[column2];
	        row[column2] = temp;
	    }
	    return this;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkRowVector = function checkRowVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.columns)
	        throw new RangeError('vector size must be the same as the number of columns');
	    return vector;
	};

	/**
	 * @private
	 * Internal check that the provided vector is an array with the right length
	 * @param {Array|Matrix} vector
	 * @returns {Array}
	 * @throws {RangeError}
	 */
	Matrix.prototype.checkColumnVector = function checkColumnVector(vector) {
	    if (Matrix.isMatrix(vector))
	        vector = vector.to1DArray();
	    if (vector.length !== this.rows)
	        throw new RangeError('vector size must be the same as the number of rows');
	    return vector;
	};

	/**
	 * Adds the values of a vector to each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addRowVector = function addRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subRowVector = function subRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each row
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRowVector = function mulRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each row by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divRowVector = function divRowVector(vector) {
	    vector = this.checkRowVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[j];
	        }
	    }
	    return this;
	};

	/**
	 * Adds the values of a vector to each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.addColumnVector = function addColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] += vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Subtracts the values of a vector from each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.subColumnVector = function subColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] -= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a vector with each column
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumnVector = function mulColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] *= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Divides the values of each column by those of a vector
	 * @param {Array|Matrix} vector - Array or vector
	 * @returns {Matrix} this
	 */
	Matrix.prototype.divColumnVector = function divColumnVector(vector) {
	    vector = this.checkColumnVector(vector);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] /= vector[i];
	        }
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a row with a scalar
	 * @param {number} index - Row index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulRow = function mulRow(index, value) {
	    this.checkRowIndex(index);
	    var i = 0, l = this.columns;
	    for (; i < l; i++) {
	        this[index][i] *= value;
	    }
	    return this;
	};

	/**
	 * Multiplies the values of a column with a scalar
	 * @param {number} index - Column index
	 * @param {number} value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.mulColumn = function mulColumn(index, value) {
	    this.checkColumnIndex(index);
	    var i = 0, l = this.rows;
	    for (; i < l; i++) {
	        this[i][index] *= value;
	    }
	};

	/**
	 * A matrix index
	 * @typedef {Object} MatrixIndex
	 * @property {number} row
	 * @property {number} column
	 */

	/**
	 * Returns the maximum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.max = function max() {
	    var v = -Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxIndex = function maxIndex() {
	    var v = -Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] > v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.min = function min() {
	    var v = Infinity;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	            }
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minIndex = function minIndex() {
	    var v = Infinity;
	    var idx = {};
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            if (this[i][j] < v) {
	                v = this[i][j];
	                idx.row = i;
	                idx.column = j;
	            }
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.maxRow = function maxRow(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxRowIndex = function maxRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = -Infinity;
	    var idx = {
	            row: index
	        };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] > v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one row
	 * @param {number} index - Row index
	 * @returns {number}
	 */
	Matrix.prototype.minRow = function minRow(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one row
	 * @param {number} index - Row index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minRowIndex = function minRowIndex(index) {
	    this.checkRowIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: index,
	        column: 0
	    };
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        if (this[index][i] < v) {
	            v = this[index][i];
	            idx.column = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.maxColumn = function maxColumn(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the maximum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.maxColumnIndex = function maxColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = -Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] > v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {number}
	 */
	Matrix.prototype.minColumn = function minColumn(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the index of the minimum value of one column
	 * @param {number} index - Column index
	 * @returns {MatrixIndex}
	 */
	Matrix.prototype.minColumnIndex = function minColumnIndex(index) {
	    this.checkColumnIndex(index);
	    var v = Infinity;
	    var idx = {
	        row: 0,
	        column: index
	    };
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        if (this[i][index] < v) {
	            v = this[i][index];
	            idx.row = i;
	        }
	    }
	    return idx;
	};

	/**
	 * Returns an array containing the diagonal values of the matrix
	 * @returns {Array}
	 */
	Matrix.prototype.diag = function diag() {
	    if (!this.isSquare())
	        throw new TypeError('Only square matrices have a diagonal.');
	    var diag = new Array(this.rows);
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        diag[i] = this[i][i];
	    }
	    return diag;
	};

	/**
	 * Returns the sum of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.sum = function sum() {
	    var v = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            v += this[i][j];
	        }
	    }
	    return v;
	};

	/**
	 * Returns the mean of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.mean = function mean() {
	    return this.sum() / this.size;
	};

	/**
	 * Returns the product of all elements of the matrix
	 * @returns {number}
	 */
	Matrix.prototype.prod = function prod() {
	    var prod = 1;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            prod *= this[i][j];
	        }
	    }
	    return prod;
	};

	/**
	 * Computes the cumulative sum of the matrix elements (in place, row by row)
	 * @returns {Matrix} this
	 */
	Matrix.prototype.cumulativeSum = function cumulativeSum() {
	    var sum = 0;
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            sum += this[i][j];
	            this[i][j] = sum;
	        }
	    }
	    return this;
	};

	/**
	 * Computes the dot (scalar) product between the matrix and another
	 * @param {Matrix} other vector
	 * @returns {number}
	 */
	Matrix.prototype.dot = function dot(other) {
	    if (this.size !== other.size)
	        throw new RangeError('vectors do not have the same size');
	    var vector1 = this.to1DArray();
	    var vector2 = other.to1DArray();
	    var dot = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        dot += vector1[i] * vector2[i];
	    }
	    return dot;
	};

	/**
	 * Returns the matrix product between this and other
	 * @returns {Matrix}
	 */
	Matrix.prototype.mmul = function mmul(other) {
	    if (!Matrix.isMatrix(other))
	        throw new TypeError('parameter "other" must be a matrix');
	    if (this.columns !== other.rows)
	        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');

	    var m = this.rows, n = this.columns, p = other.columns;
	    var result = new Matrix(m, p);

	    var Bcolj = new Array(n);
	    var i, j, k;
	    for (j = 0; j < p; j++) {
	        for (k = 0; k < n; k++)
	            Bcolj[k] = other[k][j];

	        for (i = 0; i < m; i++) {
	            var Arowi = this[i];

	            var s = 0;
	            for (k = 0; k < n; k++)
	                s += Arowi[k] * Bcolj[k];

	            result[i][j] = s;
	        }
	    }
	    return result;
	};

	/**
	 * Sorts the rows (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortRows = function sortRows(compareFunction) {
	    for (var i = 0, ii = this.rows; i < ii; i++) {
	        this[i].sort(compareFunction);
	    }
	    return this;
	};

	/**
	 * Sorts the columns (in place)
	 * @param {function} compareFunction - usual Array.prototype.sort comparison function
	 * @returns {Matrix} this
	 */
	Matrix.prototype.sortColumns = function sortColumns(compareFunction) {
	    for (var i = 0, ii = this.columns; i < ii; i++) {
	        this.setColumn(i, this.getColumn(i).sort(compareFunction));
	    }
	    return this;
	};

	/**
	 * Transposes the matrix and returns a new one containing the result
	 * @returns {Matrix}
	 */
	Matrix.prototype.transpose = function transpose() {
	    var result = new Matrix(this.columns, this.rows);
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            result[j][i] = this[i][j];
	        }
	    }
	    return result;
	};

	/**
	 * Returns a subset of the matrix
	 * @param {number} startRow - First row index
	 * @param {number} endRow - Last row index
	 * @param {number} startColumn - First column index
	 * @param {number} endColumn - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrix = function subMatrix(startRow, endRow, startColumn, endColumn) {
	    if ((startRow > endRow) || (startColumn > endColumn) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range');
	    var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);
	    for (var i = startRow; i <= endRow; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            newMatrix[i - startRow][j - startColumn] = this[i][j];
	        }
	    }
	    return newMatrix;
	};

	/**
	 * Returns a subset of the matrix based on an array of row indices
	 * @param {Array} indices - Array containing the row indices
	 * @param {number} [startColumn = 0] - First column index
	 * @param {number} [endColumn = this.columns-1] - Last column index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixRow = function subMatrixRow(indices, startColumn, endColumn) {
	    if (typeof startColumn === 'undefined') {
	        startColumn = 0;
	        endColumn = this.columns - 1;
	    } else if (typeof endColumn === 'undefined') {
	        endColumn = this.columns - 1;
	    }
	    if ((startColumn > endColumn) || (startColumn < 0) || (startColumn >= this.columns) || (endColumn < 0) || (endColumn >= this.columns))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, rows = this.rows,
	        X = new Matrix(l, endColumn - startColumn + 1);
	    for (var i = 0; i < l; i++) {
	        for (var j = startColumn; j <= endColumn; j++) {
	            if ((indices[i] < 0) || (indices[i] >= rows))
	                throw new RangeError('Argument out of range.');
	            X[i][j - startColumn] = this[indices[i]][j];
	        }
	    }
	    return X;
	};

	/**
	 * Returns a subset of the matrix based on an array of column indices
	 * @param {Array} indices - Array containing the column indices
	 * @param {number} [startRow = 0] - First row index
	 * @param {number} [endRow = this.rows-1] - Last row index
	 * @returns {Matrix}
	 */
	Matrix.prototype.subMatrixColumn = function subMatrixColumn(indices, startRow, endRow) {
	    if (typeof startRow === 'undefined') {
	        startRow = 0;
	        endRow = this.rows - 1;
	    } else if (typeof endRow === 'undefined') {
	        endRow = this.rows - 1;
	    }
	    if ((startRow > endRow) || (startRow < 0) || (startRow >= this.rows) || (endRow < 0) || (endRow >= this.rows))
	        throw new RangeError('Argument out of range.');
	    var l = indices.length, columns = this.columns,
	        X = new Matrix(endRow - startRow + 1, l);
	    for (var i = 0; i < l; i++) {
	        for (var j = startRow; j <= endRow; j++) {
	            if ((indices[i] < 0) || (indices[i] >= columns))
	                throw new RangeError('Argument out of range.');
	            X[j - startRow][i] = this[j][indices[i]];
	        }
	    }
	    return X;
	};

	/**
	 * Returns the trace of the matrix (sum of the diagonal elements)
	 * @returns {number}
	 */
	Matrix.prototype.trace = function trace() {
	    if (!this.isSquare())
	        throw new TypeError('The matrix is not square');
	    var trace = 0, i = 0, l = this.rows;
	    for (; i < l; i++) {
	        trace += this[i][i];
	    }
	    return trace;
	};

	/**
	 * Sets each element of the matrix to its absolute value
	 * @returns {Matrix} this
	 */
	Matrix.prototype.abs = function abs() {
	    var ii = this.rows, jj = this.columns;
	    for (var i = 0; i < ii; i++) {
	        for (var j = 0; j < jj; j++) {
	            this[i][j] = Math.abs(this[i][j]);
	        }
	    }
	};

	module.exports = Matrix;


/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);

	var SingularValueDecomposition = __webpack_require__(116);
	var EigenvalueDecomposition = __webpack_require__(118);
	var LuDecomposition = __webpack_require__(119);
	var QrDecomposition = __webpack_require__(120);
	var CholeskyDecomposition = __webpack_require__(121);

	function inverse(matrix) {
	    return solve(matrix, Matrix.eye(matrix.rows));
	}

	Matrix.prototype.inverse = function () {
	    return inverse(this);
	};

	function solve(leftHandSide, rightHandSide) {
	    return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
	}

	Matrix.prototype.solve = function (other) {
	    return solve(this, other);
	};

	module.exports = {
	    SingularValueDecomposition: SingularValueDecomposition,
	    SVD: SingularValueDecomposition,
	    EigenvalueDecomposition: EigenvalueDecomposition,
	    EVD: EigenvalueDecomposition,
	    LuDecomposition: LuDecomposition,
	    LU: LuDecomposition,
	    QrDecomposition: QrDecomposition,
	    QR: QrDecomposition,
	    CholeskyDecomposition: CholeskyDecomposition,
	    CHO: CholeskyDecomposition,
	    inverse: inverse,
	    solve: solve
	};


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);
	var hypotenuse = __webpack_require__(117).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/SingularValueDecomposition.cs
	function SingularValueDecomposition(value, options) {
	    if (!(this instanceof SingularValueDecomposition)) {
	        return new SingularValueDecomposition(value, options);
	    }
	    value = Matrix.checkMatrix(value);

	    options = options || {};

	    var a = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        nu = Math.min(m, n);

	    var wantu = true, wantv = true;
	    if (options.computeLeftSingularVectors === false)
	        wantu = false;
	    if (options.computeRightSingularVectors === false)
	        wantv = false;
	    var autoTranspose = options.autoTranspose === true;

	    var swapped = false;
	    if (m < n) {
	        if (!autoTranspose) {
	            console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
	        } else {
	            a = a.transpose();
	            m = a.rows;
	            n = a.columns;
	            swapped = true;
	            var aux = wantu;
	            wantu = wantv;
	            wantv = aux;
	        }
	    }

	    var s = new Array(Math.min(m + 1, n)),
	        U = Matrix.zeros(m, nu),
	        V = Matrix.zeros(n, n),
	        e = new Array(n),
	        work = new Array(m);

	    var nct = Math.min(m - 1, n);
	    var nrt = Math.max(0, Math.min(n - 2, m));

	    var i, j, k, p, t, ks, f, cs, sn, max, kase,
	        scale, sp, spm1, epm1, sk, ek, b, c, shift, g;

	    for (k = 0, max = Math.max(nct, nrt); k < max; k++) {
	        if (k < nct) {
	            s[k] = 0;
	            for (i = k; i < m; i++) {
	                s[k] = hypotenuse(s[k], a[i][k]);
	            }
	            if (s[k] !== 0) {
	                if (a[k][k] < 0) {
	                    s[k] = -s[k];
	                }
	                for (i = k; i < m; i++) {
	                    a[i][k] /= s[k];
	                }
	                a[k][k] += 1;
	            }
	            s[k] = -s[k];
	        }

	        for (j = k + 1; j < n; j++) {
	            if ((k < nct) && (s[k] !== 0)) {
	                t = 0;
	                for (i = k; i < m; i++) {
	                    t += a[i][k] * a[i][j];
	                }
	                t = -t / a[k][k];
	                for (i = k; i < m; i++) {
	                    a[i][j] += t * a[i][k];
	                }
	            }
	            e[j] = a[k][j];
	        }

	        if (wantu && (k < nct)) {
	            for (i = k; i < m; i++) {
	                U[i][k] = a[i][k];
	            }
	        }

	        if (k < nrt) {
	            e[k] = 0;
	            for (i = k + 1; i < n; i++) {
	                e[k] = hypotenuse(e[k], e[i]);
	            }
	            if (e[k] !== 0) {
	                if (e[k + 1] < 0)
	                    e[k] = -e[k];
	                for (i = k + 1; i < n; i++) {
	                    e[i] /= e[k];
	                }
	                e[k + 1] += 1;
	            }
	            e[k] = -e[k];
	            if ((k + 1 < m) && (e[k] !== 0)) {
	                for (i = k + 1; i < m; i++) {
	                    work[i] = 0;
	                }
	                for (j = k + 1; j < n; j++) {
	                    for (i = k + 1; i < m; i++) {
	                        work[i] += e[j] * a[i][j];
	                    }
	                }
	                for (j = k + 1; j < n; j++) {
	                    t = -e[j] / e[k + 1];
	                    for (i = k + 1; i < m; i++) {
	                        a[i][j] += t * work[i];
	                    }
	                }
	            }
	            if (wantv) {
	                for (i = k + 1; i < n; i++) {
	                    V[i][k] = e[i];
	                }
	            }
	        }
	    }

	    p = Math.min(n, m + 1);
	    if (nct < n) {
	        s[nct] = a[nct][nct];
	    }
	    if (m < p) {
	        s[p - 1] = 0;
	    }
	    if (nrt + 1 < p) {
	        e[nrt] = a[nrt][p - 1];
	    }
	    e[p - 1] = 0;

	    if (wantu) {
	        for (j = nct; j < nu; j++) {
	            for (i = 0; i < m; i++) {
	                U[i][j] = 0;
	            }
	            U[j][j] = 1;
	        }
	        for (k = nct - 1; k >= 0; k--) {
	            if (s[k] !== 0) {
	                for (j = k + 1; j < nu; j++) {
	                    t = 0;
	                    for (i = k; i < m; i++) {
	                        t += U[i][k] * U[i][j];
	                    }
	                    t = -t / U[k][k];
	                    for (i = k; i < m; i++) {
	                        U[i][j] += t * U[i][k];
	                    }
	                }
	                for (i = k; i < m; i++) {
	                    U[i][k] = -U[i][k];
	                }
	                U[k][k] = 1 + U[k][k];
	                for (i = 0; i < k - 1; i++) {
	                    U[i][k] = 0;
	                }
	            } else {
	                for (i = 0; i < m; i++) {
	                    U[i][k] = 0;
	                }
	                U[k][k] = 1;
	            }
	        }
	    }

	    if (wantv) {
	        for (k = n - 1; k >= 0; k--) {
	            if ((k < nrt) && (e[k] !== 0)) {
	                for (j = k + 1; j < n; j++) {
	                    t = 0;
	                    for (i = k + 1; i < n; i++) {
	                        t += V[i][k] * V[i][j];
	                    }
	                    t = -t / V[k + 1][k];
	                    for (i = k + 1; i < n; i++) {
	                        V[i][j] += t * V[i][k];
	                    }
	                }
	            }
	            for (i = 0; i < n; i++) {
	                V[i][k] = 0;
	            }
	            V[k][k] = 1;
	        }
	    }

	    var pp = p - 1,
	        iter = 0,
	        eps = Math.pow(2, -52);
	    while (p > 0) {
	        for (k = p - 2; k >= -1; k--) {
	            if (k === -1) {
	                break;
	            }
	            if (Math.abs(e[k]) <= eps * (Math.abs(s[k]) + Math.abs(s[k + 1]))) {
	                e[k] = 0;
	                break;
	            }
	        }
	        if (k === p - 2) {
	            kase = 4;
	        } else {
	            for (ks = p - 1; ks >= k; ks--) {
	                if (ks === k) {
	                    break;
	                }
	                t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);
	                if (Math.abs(s[ks]) <= eps * t) {
	                    s[ks] = 0;
	                    break;
	                }
	            }
	            if (ks === k) {
	                kase = 3;
	            } else if (ks === p - 1) {
	                kase = 1;
	            } else {
	                kase = 2;
	                k = ks;
	            }
	        }

	        k++;

	        switch (kase) {
	            case 1: {
	                f = e[p - 2];
	                e[p - 2] = 0;
	                for (j = p - 2; j >= k; j--) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    if (j !== k) {
	                        f = -sn * e[j - 1];
	                        e[j - 1] = cs * e[j - 1];
	                    }
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][p - 1];
	                            V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
	                            V[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 2 : {
	                f = e[k - 1];
	                e[k - 1] = 0;
	                for (j = k; j < p; j++) {
	                    t = hypotenuse(s[j], f);
	                    cs = s[j] / t;
	                    sn = f / t;
	                    s[j] = t;
	                    f = -sn * e[j];
	                    e[j] = cs * e[j];
	                    if (wantu) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][k - 1];
	                            U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                break;
	            }
	            case 3 : {
	                scale = Math.max(Math.max(Math.max(Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2])), Math.abs(e[p - 2])), Math.abs(s[k])), Math.abs(e[k]));
	                sp = s[p - 1] / scale;
	                spm1 = s[p - 2] / scale;
	                epm1 = e[p - 2] / scale;
	                sk = s[k] / scale;
	                ek = e[k] / scale;
	                b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
	                c = (sp * epm1) * (sp * epm1);
	                shift = 0;
	                if ((b !== 0) || (c !== 0)) {
	                    shift = Math.sqrt(b * b + c);
	                    if (b < 0) {
	                        shift = -shift;
	                    }
	                    shift = c / (b + shift);
	                }
	                f = (sk + sp) * (sk - sp) + shift;
	                g = sk * ek;
	                for (j = k; j < p - 1; j++) {
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    if (j !== k) {
	                        e[j - 1] = t;
	                    }
	                    f = cs * s[j] + sn * e[j];
	                    e[j] = cs * e[j] - sn * s[j];
	                    g = sn * s[j + 1];
	                    s[j + 1] = cs * s[j + 1];
	                    if (wantv) {
	                        for (i = 0; i < n; i++) {
	                            t = cs * V[i][j] + sn * V[i][j + 1];
	                            V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
	                            V[i][j] = t;
	                        }
	                    }
	                    t = hypotenuse(f, g);
	                    cs = f / t;
	                    sn = g / t;
	                    s[j] = t;
	                    f = cs * e[j] + sn * s[j + 1];
	                    s[j + 1] = -sn * e[j] + cs * s[j + 1];
	                    g = sn * e[j + 1];
	                    e[j + 1] = cs * e[j + 1];
	                    if (wantu && (j < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = cs * U[i][j] + sn * U[i][j + 1];
	                            U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
	                            U[i][j] = t;
	                        }
	                    }
	                }
	                e[p - 2] = f;
	                iter = iter + 1;
	                break;
	            }
	            case 4: {
	                if (s[k] <= 0) {
	                    s[k] = (s[k] < 0 ? -s[k] : 0);
	                    if (wantv) {
	                        for (i = 0; i <= pp; i++) {
	                            V[i][k] = -V[i][k];
	                        }
	                    }
	                }
	                while (k < pp) {
	                    if (s[k] >= s[k + 1]) {
	                        break;
	                    }
	                    t = s[k];
	                    s[k] = s[k + 1];
	                    s[k + 1] = t;
	                    if (wantv && (k < n - 1)) {
	                        for (i = 0; i < n; i++) {
	                            t = V[i][k + 1];
	                            V[i][k + 1] = V[i][k];
	                            V[i][k] = t;
	                        }
	                    }
	                    if (wantu && (k < m - 1)) {
	                        for (i = 0; i < m; i++) {
	                            t = U[i][k + 1];
	                            U[i][k + 1] = U[i][k];
	                            U[i][k] = t;
	                        }
	                    }
	                    k++;
	                }
	                iter = 0;
	                p--;
	                break;
	            }
	        }
	    }

	    if (swapped) {
	        var tmp = V;
	        V = U;
	        U = tmp;
	    }

	    this.m = m;
	    this.n = n;
	    this.s = s;
	    this.U = U;
	    this.V = V;
	}

	SingularValueDecomposition.prototype = {
	    get condition() {
	        return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
	    },
	    get norm2() {
	        return this.s[0];
	    },
	    get rank() {
	        var eps = Math.pow(2, -52),
	            tol = Math.max(this.m, this.n) * this.s[0] * eps,
	            r = 0,
	            s = this.s;
	        for (var i = 0, ii = s.length; i < ii; i++) {
	            if (s[i] > tol) {
	                r++;
	            }
	        }
	        return r;
	    },
	    get diagonal() {
	        return this.s;
	    },
	    // https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
	    get threshold() {
	        return (Math.pow(2, -52) / 2) * Math.max(this.m, this.n) * this.s[0];
	    },
	    get leftSingularVectors() {
	        return this.U;
	    },
	    get rightSingularVectors() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        return Matrix.diag(this.s);
	    },
	    solve: function (value) {

	        var Y = value,
	            e = this.threshold,
	            scols = this.s.length,
	            Ls = Matrix.zeros(scols, scols),
	            i;

	        for (i = 0; i < scols; i++) {
	            if (Math.abs(this.s[i]) <= e) {
	                Ls[i][i] = 0;
	            } else {
	                Ls[i][i] = 1 / this.s[i];
	            }
	        }


	        var VL = this.V.mmul(Ls),
	            vrows = this.V.rows,
	            urows = this.U.rows,
	            VLU = Matrix.zeros(vrows, urows),
	            j, k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < scols; k++) {
	                    sum += VL[i][k] * this.U[j][k];
	                }
	                VLU[i][j] = sum;
	            }
	        }

	        return VLU.mmul(Y);
	    },
	    solveForDiagonal: function (value) {
	        return this.solve(Matrix.diag(value));
	    },
	    inverse: function () {
	        var e = this.threshold,
	            vrows = this.V.rows,
	            vcols = this.V.columns,
	            X = new Matrix(vrows, this.s.length),
	            i, j;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < vcols; j++) {
	                if (Math.abs(this.s[j]) > e) {
	                    X[i][j] = this.V[i][j] / this.s[j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }

	        var urows = this.U.rows,
	            ucols = this.U.columns,
	            Y = new Matrix(vrows, urows),
	            k, sum;

	        for (i = 0; i < vrows; i++) {
	            for (j = 0; j < urows; j++) {
	                sum = 0;
	                for (k = 0; k < ucols; k++) {
	                    sum += X[i][k] * this.U[j][k];
	                }
	                Y[i][j] = sum;
	            }
	        }

	        return Y;
	    }
	};

	module.exports = SingularValueDecomposition;


/***/ },
/* 117 */
/***/ function(module, exports) {

	'use strict';

	exports.hypotenuse = function hypotenuse(a, b) {
	    var r;
	    if (Math.abs(a) > Math.abs(b)) {
	        r = b / a;
	        return Math.abs(a) * Math.sqrt(1 + r * r);
	    }
	    if (b !== 0) {
	        r = a / b;
	        return Math.abs(b) * Math.sqrt(1 + r * r);
	    }
	    return 0;
	};


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);
	var hypotenuse = __webpack_require__(117).hypotenuse;

	// https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
	function EigenvalueDecomposition(matrix) {
	    if (!(this instanceof EigenvalueDecomposition)) {
	        return new EigenvalueDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);
	    if (!matrix.isSquare()) {
	        throw new Error('Matrix is not a square matrix');
	    }

	    var n = matrix.columns,
	        V = Matrix.zeros(n, n),
	        d = new Array(n),
	        e = new Array(n),
	        value = matrix,
	        i, j;

	    if (matrix.isSymmetric()) {
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                V[i][j] = value[i][j];
	            }
	        }
	        tred2(n, e, d, V);
	        tql2(n, e, d, V);
	    }
	    else {
	        var H = Matrix.zeros(n, n),
	            ort = new Array(n);
	        for (j = 0; j < n; j++) {
	            for (i = 0; i < n; i++) {
	                H[i][j] = value[i][j];
	            }
	        }
	        orthes(n, H, ort, V);
	        hqr2(n, e, d, V, H);
	    }

	    this.n = n;
	    this.e = e;
	    this.d = d;
	    this.V = V;
	}

	EigenvalueDecomposition.prototype = {
	    get realEigenvalues() {
	        return this.d;
	    },
	    get imaginaryEigenvalues() {
	        return this.e;
	    },
	    get eigenvectorMatrix() {
	        return this.V;
	    },
	    get diagonalMatrix() {
	        var n = this.n,
	            e = this.e,
	            d = this.d,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                X[i][j] = 0;
	            }
	            X[i][i] = d[i];
	            if (e[i] > 0) {
	                X[i][i + 1] = e[i];
	            }
	            else if (e[i] < 0) {
	                X[i][i - 1] = e[i];
	            }
	        }
	        return X;
	    }
	};

	function tred2(n, e, d, V) {

	    var f, g, h, i, j, k,
	        hh, scale;

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	    }

	    for (i = n - 1; i > 0; i--) {
	        scale = 0;
	        h = 0;
	        for (k = 0; k < i; k++) {
	            scale = scale + Math.abs(d[k]);
	        }

	        if (scale === 0) {
	            e[i] = d[i - 1];
	            for (j = 0; j < i; j++) {
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	                V[j][i] = 0;
	            }
	        } else {
	            for (k = 0; k < i; k++) {
	                d[k] /= scale;
	                h += d[k] * d[k];
	            }

	            f = d[i - 1];
	            g = Math.sqrt(h);
	            if (f > 0) {
	                g = -g;
	            }

	            e[i] = scale * g;
	            h = h - f * g;
	            d[i - 1] = f - g;
	            for (j = 0; j < i; j++) {
	                e[j] = 0;
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                V[j][i] = f;
	                g = e[j] + V[j][j] * f;
	                for (k = j + 1; k <= i - 1; k++) {
	                    g += V[k][j] * d[k];
	                    e[k] += V[k][j] * f;
	                }
	                e[j] = g;
	            }

	            f = 0;
	            for (j = 0; j < i; j++) {
	                e[j] /= h;
	                f += e[j] * d[j];
	            }

	            hh = f / (h + h);
	            for (j = 0; j < i; j++) {
	                e[j] -= hh * d[j];
	            }

	            for (j = 0; j < i; j++) {
	                f = d[j];
	                g = e[j];
	                for (k = j; k <= i - 1; k++) {
	                    V[k][j] -= (f * e[k] + g * d[k]);
	                }
	                d[j] = V[i - 1][j];
	                V[i][j] = 0;
	            }
	        }
	        d[i] = h;
	    }

	    for (i = 0; i < n - 1; i++) {
	        V[n - 1][i] = V[i][i];
	        V[i][i] = 1;
	        h = d[i + 1];
	        if (h !== 0) {
	            for (k = 0; k <= i; k++) {
	                d[k] = V[k][i + 1] / h;
	            }

	            for (j = 0; j <= i; j++) {
	                g = 0;
	                for (k = 0; k <= i; k++) {
	                    g += V[k][i + 1] * V[k][j];
	                }
	                for (k = 0; k <= i; k++) {
	                    V[k][j] -= g * d[k];
	                }
	            }
	        }

	        for (k = 0; k <= i; k++) {
	            V[k][i + 1] = 0;
	        }
	    }

	    for (j = 0; j < n; j++) {
	        d[j] = V[n - 1][j];
	        V[n - 1][j] = 0;
	    }

	    V[n - 1][n - 1] = 1;
	    e[0] = 0;
	}

	function tql2(n, e, d, V) {

	    var g, h, i, j, k, l, m, p, r,
	        dl1, c, c2, c3, el1, s, s2,
	        iter;

	    for (i = 1; i < n; i++) {
	        e[i - 1] = e[i];
	    }

	    e[n - 1] = 0;

	    var f = 0,
	        tst1 = 0,
	        eps = Math.pow(2, -52);

	    for (l = 0; l < n; l++) {
	        tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
	        m = l;
	        while (m < n) {
	            if (Math.abs(e[m]) <= eps * tst1) {
	                break;
	            }
	            m++;
	        }

	        if (m > l) {
	            iter = 0;
	            do {
	                iter = iter + 1;

	                g = d[l];
	                p = (d[l + 1] - g) / (2 * e[l]);
	                r = hypotenuse(p, 1);
	                if (p < 0) {
	                    r = -r;
	                }

	                d[l] = e[l] / (p + r);
	                d[l + 1] = e[l] * (p + r);
	                dl1 = d[l + 1];
	                h = g - d[l];
	                for (i = l + 2; i < n; i++) {
	                    d[i] -= h;
	                }

	                f = f + h;

	                p = d[m];
	                c = 1;
	                c2 = c;
	                c3 = c;
	                el1 = e[l + 1];
	                s = 0;
	                s2 = 0;
	                for (i = m - 1; i >= l; i--) {
	                    c3 = c2;
	                    c2 = c;
	                    s2 = s;
	                    g = c * e[i];
	                    h = c * p;
	                    r = hypotenuse(p, e[i]);
	                    e[i + 1] = s * r;
	                    s = e[i] / r;
	                    c = p / r;
	                    p = c * d[i] - s * g;
	                    d[i + 1] = h + s * (c * g + s * d[i]);

	                    for (k = 0; k < n; k++) {
	                        h = V[k][i + 1];
	                        V[k][i + 1] = s * V[k][i] + c * h;
	                        V[k][i] = c * V[k][i] - s * h;
	                    }
	                }

	                p = -s * s2 * c3 * el1 * e[l] / dl1;
	                e[l] = s * p;
	                d[l] = c * p;

	            }
	            while (Math.abs(e[l]) > eps * tst1);
	        }
	        d[l] = d[l] + f;
	        e[l] = 0;
	    }

	    for (i = 0; i < n - 1; i++) {
	        k = i;
	        p = d[i];
	        for (j = i + 1; j < n; j++) {
	            if (d[j] < p) {
	                k = j;
	                p = d[j];
	            }
	        }

	        if (k !== i) {
	            d[k] = d[i];
	            d[i] = p;
	            for (j = 0; j < n; j++) {
	                p = V[j][i];
	                V[j][i] = V[j][k];
	                V[j][k] = p;
	            }
	        }
	    }
	}

	function orthes(n, H, ort, V) {

	    var low = 0,
	        high = n - 1,
	        f, g, h, i, j, m,
	        scale;

	    for (m = low + 1; m <= high - 1; m++) {
	        scale = 0;
	        for (i = m; i <= high; i++) {
	            scale = scale + Math.abs(H[i][m - 1]);
	        }

	        if (scale !== 0) {
	            h = 0;
	            for (i = high; i >= m; i--) {
	                ort[i] = H[i][m - 1] / scale;
	                h += ort[i] * ort[i];
	            }

	            g = Math.sqrt(h);
	            if (ort[m] > 0) {
	                g = -g;
	            }

	            h = h - ort[m] * g;
	            ort[m] = ort[m] - g;

	            for (j = m; j < n; j++) {
	                f = 0;
	                for (i = high; i >= m; i--) {
	                    f += ort[i] * H[i][j];
	                }

	                f = f / h;
	                for (i = m; i <= high; i++) {
	                    H[i][j] -= f * ort[i];
	                }
	            }

	            for (i = 0; i <= high; i++) {
	                f = 0;
	                for (j = high; j >= m; j--) {
	                    f += ort[j] * H[i][j];
	                }

	                f = f / h;
	                for (j = m; j <= high; j++) {
	                    H[i][j] -= f * ort[j];
	                }
	            }

	            ort[m] = scale * ort[m];
	            H[m][m - 1] = scale * g;
	        }
	    }

	    for (i = 0; i < n; i++) {
	        for (j = 0; j < n; j++) {
	            V[i][j] = (i === j ? 1 : 0);
	        }
	    }

	    for (m = high - 1; m >= low + 1; m--) {
	        if (H[m][m - 1] !== 0) {
	            for (i = m + 1; i <= high; i++) {
	                ort[i] = H[i][m - 1];
	            }

	            for (j = m; j <= high; j++) {
	                g = 0;
	                for (i = m; i <= high; i++) {
	                    g += ort[i] * V[i][j];
	                }

	                g = (g / ort[m]) / H[m][m - 1];
	                for (i = m; i <= high; i++) {
	                    V[i][j] += g * ort[i];
	                }
	            }
	        }
	    }
	}

	function hqr2(nn, e, d, V, H) {
	    var n = nn - 1,
	        low = 0,
	        high = nn - 1,
	        eps = Math.pow(2, -52),
	        exshift = 0,
	        norm = 0,
	        p = 0,
	        q = 0,
	        r = 0,
	        s = 0,
	        z = 0,
	        iter = 0,
	        i, j, k, l, m, t, w, x, y,
	        ra, sa, vr, vi,
	        notlast, cdivres;

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            d[i] = H[i][i];
	            e[i] = 0;
	        }

	        for (j = Math.max(i - 1, 0); j < nn; j++) {
	            norm = norm + Math.abs(H[i][j]);
	        }
	    }

	    while (n >= low) {
	        l = n;
	        while (l > low) {
	            s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);
	            if (s === 0) {
	                s = norm;
	            }
	            if (Math.abs(H[l][l - 1]) < eps * s) {
	                break;
	            }
	            l--;
	        }

	        if (l === n) {
	            H[n][n] = H[n][n] + exshift;
	            d[n] = H[n][n];
	            e[n] = 0;
	            n--;
	            iter = 0;
	        } else if (l === n - 1) {
	            w = H[n][n - 1] * H[n - 1][n];
	            p = (H[n - 1][n - 1] - H[n][n]) / 2;
	            q = p * p + w;
	            z = Math.sqrt(Math.abs(q));
	            H[n][n] = H[n][n] + exshift;
	            H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
	            x = H[n][n];

	            if (q >= 0) {
	                z = (p >= 0) ? (p + z) : (p - z);
	                d[n - 1] = x + z;
	                d[n] = d[n - 1];
	                if (z !== 0) {
	                    d[n] = x - w / z;
	                }
	                e[n - 1] = 0;
	                e[n] = 0;
	                x = H[n][n - 1];
	                s = Math.abs(x) + Math.abs(z);
	                p = x / s;
	                q = z / s;
	                r = Math.sqrt(p * p + q * q);
	                p = p / r;
	                q = q / r;

	                for (j = n - 1; j < nn; j++) {
	                    z = H[n - 1][j];
	                    H[n - 1][j] = q * z + p * H[n][j];
	                    H[n][j] = q * H[n][j] - p * z;
	                }

	                for (i = 0; i <= n; i++) {
	                    z = H[i][n - 1];
	                    H[i][n - 1] = q * z + p * H[i][n];
	                    H[i][n] = q * H[i][n] - p * z;
	                }

	                for (i = low; i <= high; i++) {
	                    z = V[i][n - 1];
	                    V[i][n - 1] = q * z + p * V[i][n];
	                    V[i][n] = q * V[i][n] - p * z;
	                }
	            } else {
	                d[n - 1] = x + p;
	                d[n] = x + p;
	                e[n - 1] = z;
	                e[n] = -z;
	            }

	            n = n - 2;
	            iter = 0;
	        } else {
	            x = H[n][n];
	            y = 0;
	            w = 0;
	            if (l < n) {
	                y = H[n - 1][n - 1];
	                w = H[n][n - 1] * H[n - 1][n];
	            }

	            if (iter === 10) {
	                exshift += x;
	                for (i = low; i <= n; i++) {
	                    H[i][i] -= x;
	                }
	                s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
	                x = y = 0.75 * s;
	                w = -0.4375 * s * s;
	            }

	            if (iter === 30) {
	                s = (y - x) / 2;
	                s = s * s + w;
	                if (s > 0) {
	                    s = Math.sqrt(s);
	                    if (y < x) {
	                        s = -s;
	                    }
	                    s = x - w / ((y - x) / 2 + s);
	                    for (i = low; i <= n; i++) {
	                        H[i][i] -= s;
	                    }
	                    exshift += s;
	                    x = y = w = 0.964;
	                }
	            }

	            iter = iter + 1;

	            m = n - 2;
	            while (m >= l) {
	                z = H[m][m];
	                r = x - z;
	                s = y - z;
	                p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
	                q = H[m + 1][m + 1] - z - r - s;
	                r = H[m + 2][m + 1];
	                s = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                p = p / s;
	                q = q / s;
	                r = r / s;
	                if (m === l) {
	                    break;
	                }
	                if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
	                    break;
	                }
	                m--;
	            }

	            for (i = m + 2; i <= n; i++) {
	                H[i][i - 2] = 0;
	                if (i > m + 2) {
	                    H[i][i - 3] = 0;
	                }
	            }

	            for (k = m; k <= n - 1; k++) {
	                notlast = (k !== n - 1);
	                if (k !== m) {
	                    p = H[k][k - 1];
	                    q = H[k + 1][k - 1];
	                    r = (notlast ? H[k + 2][k - 1] : 0);
	                    x = Math.abs(p) + Math.abs(q) + Math.abs(r);
	                    if (x !== 0) {
	                        p = p / x;
	                        q = q / x;
	                        r = r / x;
	                    }
	                }

	                if (x === 0) {
	                    break;
	                }

	                s = Math.sqrt(p * p + q * q + r * r);
	                if (p < 0) {
	                    s = -s;
	                }

	                if (s !== 0) {
	                    if (k !== m) {
	                        H[k][k - 1] = -s * x;
	                    } else if (l !== m) {
	                        H[k][k - 1] = -H[k][k - 1];
	                    }

	                    p = p + s;
	                    x = p / s;
	                    y = q / s;
	                    z = r / s;
	                    q = q / p;
	                    r = r / p;

	                    for (j = k; j < nn; j++) {
	                        p = H[k][j] + q * H[k + 1][j];
	                        if (notlast) {
	                            p = p + r * H[k + 2][j];
	                            H[k + 2][j] = H[k + 2][j] - p * z;
	                        }

	                        H[k][j] = H[k][j] - p * x;
	                        H[k + 1][j] = H[k + 1][j] - p * y;
	                    }

	                    for (i = 0; i <= Math.min(n, k + 3); i++) {
	                        p = x * H[i][k] + y * H[i][k + 1];
	                        if (notlast) {
	                            p = p + z * H[i][k + 2];
	                            H[i][k + 2] = H[i][k + 2] - p * r;
	                        }

	                        H[i][k] = H[i][k] - p;
	                        H[i][k + 1] = H[i][k + 1] - p * q;
	                    }

	                    for (i = low; i <= high; i++) {
	                        p = x * V[i][k] + y * V[i][k + 1];
	                        if (notlast) {
	                            p = p + z * V[i][k + 2];
	                            V[i][k + 2] = V[i][k + 2] - p * r;
	                        }

	                        V[i][k] = V[i][k] - p;
	                        V[i][k + 1] = V[i][k + 1] - p * q;
	                    }
	                }
	            }
	        }
	    }

	    if (norm === 0) {
	        return;
	    }

	    for (n = nn - 1; n >= 0; n--) {
	        p = d[n];
	        q = e[n];

	        if (q === 0) {
	            l = n;
	            H[n][n] = 1;
	            for (i = n - 1; i >= 0; i--) {
	                w = H[i][i] - p;
	                r = 0;
	                for (j = l; j <= n; j++) {
	                    r = r + H[i][j] * H[j][n];
	                }

	                if (e[i] < 0) {
	                    z = w;
	                    s = r;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        H[i][n] = (w !== 0) ? (-r / w) : (-r / (eps * norm));
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
	                        t = (x * s - z * r) / q;
	                        H[i][n] = t;
	                        H[i + 1][n] = (Math.abs(x) > Math.abs(z)) ? ((-r - w * t) / x) : ((-s - y * t) / z);
	                    }

	                    t = Math.abs(H[i][n]);
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        } else if (q < 0) {
	            l = n - 1;

	            if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
	                H[n - 1][n - 1] = q / H[n][n - 1];
	                H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
	            } else {
	                cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
	                H[n - 1][n - 1] = cdivres[0];
	                H[n - 1][n] = cdivres[1];
	            }

	            H[n][n - 1] = 0;
	            H[n][n] = 1;
	            for (i = n - 2; i >= 0; i--) {
	                ra = 0;
	                sa = 0;
	                for (j = l; j <= n; j++) {
	                    ra = ra + H[i][j] * H[j][n - 1];
	                    sa = sa + H[i][j] * H[j][n];
	                }

	                w = H[i][i] - p;

	                if (e[i] < 0) {
	                    z = w;
	                    r = ra;
	                    s = sa;
	                } else {
	                    l = i;
	                    if (e[i] === 0) {
	                        cdivres = cdiv(-ra, -sa, w, q);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                    } else {
	                        x = H[i][i + 1];
	                        y = H[i + 1][i];
	                        vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
	                        vi = (d[i] - p) * 2 * q;
	                        if (vr === 0 && vi === 0) {
	                            vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
	                        }
	                        cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
	                        H[i][n - 1] = cdivres[0];
	                        H[i][n] = cdivres[1];
	                        if (Math.abs(x) > (Math.abs(z) + Math.abs(q))) {
	                            H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
	                            H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
	                        } else {
	                            cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
	                            H[i + 1][n - 1] = cdivres[0];
	                            H[i + 1][n] = cdivres[1];
	                        }
	                    }

	                    t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));
	                    if ((eps * t) * t > 1) {
	                        for (j = i; j <= n; j++) {
	                            H[j][n - 1] = H[j][n - 1] / t;
	                            H[j][n] = H[j][n] / t;
	                        }
	                    }
	                }
	            }
	        }
	    }

	    for (i = 0; i < nn; i++) {
	        if (i < low || i > high) {
	            for (j = i; j < nn; j++) {
	                V[i][j] = H[i][j];
	            }
	        }
	    }

	    for (j = nn - 1; j >= low; j--) {
	        for (i = low; i <= high; i++) {
	            z = 0;
	            for (k = low; k <= Math.min(j, high); k++) {
	                z = z + V[i][k] * H[k][j];
	            }
	            V[i][j] = z;
	        }
	    }
	}

	function cdiv(xr, xi, yr, yi) {
	    var r, d;
	    if (Math.abs(yr) > Math.abs(yi)) {
	        r = yi / yr;
	        d = yr + r * yi;
	        return [(xr + r * xi) / d, (xi - r * xr) / d];
	    }
	    else {
	        r = yr / yi;
	        d = yi + r * yr;
	        return [(r * xr + xi) / d, (r * xi - xr) / d];
	    }
	}

	module.exports = EigenvalueDecomposition;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
	function LuDecomposition(matrix) {
	    if (!(this instanceof LuDecomposition)) {
	        return new LuDecomposition(matrix);
	    }
	    matrix = Matrix.checkMatrix(matrix);

	    var lu = matrix.clone(),
	        rows = lu.rows,
	        columns = lu.columns,
	        pivotVector = new Array(rows),
	        pivotSign = 1,
	        i, j, k, p, s, t, v,
	        LUrowi, LUcolj, kmax;

	    for (i = 0; i < rows; i++) {
	        pivotVector[i] = i;
	    }

	    LUcolj = new Array(rows);

	    for (j = 0; j < columns; j++) {

	        for (i = 0; i < rows; i++) {
	            LUcolj[i] = lu[i][j];
	        }

	        for (i = 0; i < rows; i++) {
	            LUrowi = lu[i];
	            kmax = Math.min(i, j);
	            s = 0;
	            for (k = 0; k < kmax; k++) {
	                s += LUrowi[k] * LUcolj[k];
	            }
	            LUrowi[j] = LUcolj[i] -= s;
	        }

	        p = j;
	        for (i = j + 1; i < rows; i++) {
	            if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
	                p = i;
	            }
	        }

	        if (p !== j) {
	            for (k = 0; k < columns; k++) {
	                t = lu[p][k];
	                lu[p][k] = lu[j][k];
	                lu[j][k] = t;
	            }

	            v = pivotVector[p];
	            pivotVector[p] = pivotVector[j];
	            pivotVector[j] = v;

	            pivotSign = -pivotSign;
	        }

	        if (j < rows && lu[j][j] !== 0) {
	            for (i = j + 1; i < rows; i++) {
	                lu[i][j] /= lu[j][j];
	            }
	        }
	    }

	    this.LU = lu;
	    this.pivotVector = pivotVector;
	    this.pivotSign = pivotSign;
	}

	LuDecomposition.prototype = {
	    isSingular: function () {
	        var data = this.LU,
	            col = data.columns;
	        for (var j = 0; j < col; j++) {
	            if (data[j][j] === 0) {
	                return true;
	            }
	        }
	        return false;
	    },
	    get determinant() {
	        var data = this.LU;
	        if (!data.isSquare())
	            throw new Error('Matrix must be square');
	        var determinant = this.pivotSign, col = data.columns;
	        for (var j = 0; j < col; j++)
	            determinant *= data[j][j];
	        return determinant;
	    },
	    get lowerTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i > j) {
	                    X[i][j] = data[i][j];
	                } else if (i === j) {
	                    X[i][j] = 1;
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get upperTriangularFactor() {
	        var data = this.LU,
	            rows = data.rows,
	            columns = data.columns,
	            X = new Matrix(rows, columns);
	        for (var i = 0; i < rows; i++) {
	            for (var j = 0; j < columns; j++) {
	                if (i <= j) {
	                    X[i][j] = data[i][j];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get pivotPermutationVector() {
	        return this.pivotVector.slice();
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var lu = this.LU,
	            rows = lu.rows;

	        if (rows !== value.rows)
	            throw new Error('Invalid matrix dimensions');
	        if (this.isSingular())
	            throw new Error('LU matrix is singular');

	        var count = value.columns,
	            X = value.subMatrixRow(this.pivotVector, 0, count - 1),
	            columns = lu.columns,
	            i, j, k;

	        for (k = 0; k < columns; k++) {
	            for (i = k + 1; i < columns; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        for (k = columns - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= lu[k][k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * lu[i][k];
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = LuDecomposition;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);
	var hypotenuse = __webpack_require__(117).hypotenuse;

	//https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
	function QrDecomposition(value) {
	    if (!(this instanceof QrDecomposition)) {
	        return new QrDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);

	    var qr = value.clone(),
	        m = value.rows,
	        n = value.columns,
	        rdiag = new Array(n),
	        i, j, k, s;

	    for (k = 0; k < n; k++) {
	        var nrm = 0;
	        for (i = k; i < m; i++) {
	            nrm = hypotenuse(nrm, qr[i][k]);
	        }
	        if (nrm !== 0) {
	            if (qr[k][k] < 0) {
	                nrm = -nrm;
	            }
	            for (i = k; i < m; i++) {
	                qr[i][k] /= nrm;
	            }
	            qr[k][k] += 1;
	            for (j = k + 1; j < n; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * qr[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    qr[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        rdiag[k] = -nrm;
	    }

	    this.QR = qr;
	    this.Rdiag = rdiag;
	}

	QrDecomposition.prototype = {
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var qr = this.QR,
	            m = qr.rows;

	        if (value.rows !== m)
	            throw new Error('Matrix row dimensions must agree');
	        if (!this.isFullRank())
	            throw new Error('Matrix is rank deficient');

	        var count = value.columns,
	            X = value.clone(),
	            n = qr.columns,
	            i, j, k, s;

	        for (k = 0; k < n; k++) {
	            for (j = 0; j < count; j++) {
	                s = 0;
	                for (i = k; i < m; i++) {
	                    s += qr[i][k] * X[i][j];
	                }
	                s = -s / qr[k][k];
	                for (i = k; i < m; i++) {
	                    X[i][j] += s * qr[i][k];
	                }
	            }
	        }
	        for (k = n - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                X[k][j] /= this.Rdiag[k];
	            }
	            for (i = 0; i < k; i++) {
	                for (j = 0; j < count; j++) {
	                    X[i][j] -= X[k][j] * qr[i][k];
	                }
	            }
	        }

	        return X.subMatrix(0, n - 1, 0, count - 1);
	    },
	    isFullRank: function () {
	        var columns = this.QR.columns;
	        for (var i = 0; i < columns; i++) {
	            if (this.Rdiag[i] === 0) {
	                return false;
	            }
	        }
	        return true;
	    },
	    get upperTriangularFactor() {
	        var qr = this.QR,
	            n = qr.columns,
	            X = new Matrix(n, n),
	            i, j;
	        for (i = 0; i < n; i++) {
	            for (j = 0; j < n; j++) {
	                if (i < j) {
	                    X[i][j] = qr[i][j];
	                } else if (i === j) {
	                    X[i][j] = this.Rdiag[i];
	                } else {
	                    X[i][j] = 0;
	                }
	            }
	        }
	        return X;
	    },
	    get orthogonalFactor() {
	        var qr = this.QR,
	            rows = qr.rows,
	            columns = qr.columns,
	            X = new Matrix(rows, columns),
	            i, j, k, s;

	        for (k = columns - 1; k >= 0; k--) {
	            for (i = 0; i < rows; i++) {
	                X[i][k] = 0;
	            }
	            X[k][k] = 1;
	            for (j = k; j < columns; j++) {
	                if (qr[k][k] !== 0) {
	                    s = 0;
	                    for (i = k; i < rows; i++) {
	                        s += qr[i][k] * X[i][j];
	                    }

	                    s = -s / qr[k][k];

	                    for (i = k; i < rows; i++) {
	                        X[i][j] += s * qr[i][k];
	                    }
	                }
	            }
	        }
	        return X;
	    }
	};

	module.exports = QrDecomposition;


/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(114);

	// https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
	function CholeskyDecomposition(value) {
	    if (!(this instanceof CholeskyDecomposition)) {
	        return new CholeskyDecomposition(value);
	    }
	    value = Matrix.checkMatrix(value);
	    if (!value.isSymmetric())
	        throw new Error('Matrix is not symmetric');

	    var a = value,
	        dimension = a.rows,
	        l = new Matrix(dimension, dimension),
	        positiveDefinite = true,
	        i, j, k;

	    for (j = 0; j < dimension; j++) {
	        var Lrowj = l[j];
	        var d = 0;
	        for (k = 0; k < j; k++) {
	            var Lrowk = l[k];
	            var s = 0;
	            for (i = 0; i < k; i++) {
	                s += Lrowk[i] * Lrowj[i];
	            }
	            Lrowj[k] = s = (a[j][k] - s) / l[k][k];
	            d = d + s * s;
	        }

	        d = a[j][j] - d;

	        positiveDefinite &= (d > 0);
	        l[j][j] = Math.sqrt(Math.max(d, 0));
	        for (k = j + 1; k < dimension; k++) {
	            l[j][k] = 0;
	        }
	    }

	    if (!positiveDefinite) {
	        throw new Error('Matrix is not positive definite');
	    }

	    this.L = l;
	}

	CholeskyDecomposition.prototype = {
	    get leftTriangularFactor() {
	        return this.L;
	    },
	    solve: function (value) {
	        value = Matrix.checkMatrix(value);

	        var l = this.L,
	            dimension = l.rows;

	        if (value.rows !== dimension) {
	            throw new Error('Matrix dimensions do not match');
	        }

	        var count = value.columns,
	            B = value.clone(),
	            i, j, k;

	        for (k = 0; k < dimension; k++) {
	            for (j = 0; j < count; j++) {
	                for (i = 0; i < k; i++) {
	                    B[k][j] -= B[i][j] * l[k][i];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        for (k = dimension - 1; k >= 0; k--) {
	            for (j = 0; j < count; j++) {
	                for (i = k + 1; i < dimension; i++) {
	                    B[k][j] -= B[i][j] * l[i][k];
	                }
	                B[k][j] /= l[k][k];
	            }
	        }

	        return B;
	    }
	};

	module.exports = CholeskyDecomposition;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Matrix = __webpack_require__(14);
	const EVD = Matrix.DC.EVD;
	const SVD = Matrix.DC.SVD;
	const Stat = __webpack_require__(5).matrix;
	const mean = Stat.mean;
	const stdev = Stat.standardDeviation;

	const defaultOptions = {
	    isCovarianceMatrix: false,
	    center: true,
	    scale: false
	};

	class PCA {
	    /**
	     * Creates new PCA (Principal Component Analysis) from the dataset
	     * @param {Matrix} dataset
	     * @param {Object} options - options for the PCA algorithm
	     * @param {boolean} reload - for load purposes
	     * @param {Object} model - for load purposes
	     * @constructor
	     * */
	    constructor(dataset, options, reload, model) {
	        if (reload) {
	            this.center = model.center;
	            this.scale = model.scale;
	            this.means = model.means;
	            this.stdevs = model.stdevs;
	            this.U = Matrix.checkMatrix(model.U);
	            this.S = model.S;
	            return;
	        }

	        options = Object.assign({}, defaultOptions, options);

	        this.center = false;
	        this.scale = false;
	        this.means = null;
	        this.stdevs = null;

	        if (options.isCovarianceMatrix) { // user provided a covariance matrix instead of dataset
	            this._computeFromCovarianceMatrix(dataset);
	            return;
	        }

	        var useCovarianceMatrix;
	        if (typeof options.useCovarianceMatrix === 'boolean') {
	            useCovarianceMatrix = options.useCovarianceMatrix;
	        } else {
	            useCovarianceMatrix = dataset.length > dataset[0].length;
	        }
	        
	        if (useCovarianceMatrix) { // user provided a dataset but wants us to compute and use the covariance matrix
	            dataset = this._adjust(dataset, options);
	            const covarianceMatrix = dataset.transpose().mmul(dataset).div(dataset.rows - 1);
	            this._computeFromCovarianceMatrix(covarianceMatrix);
	        } else {
	            dataset = this._adjust(dataset, options);
	            var svd = new SVD(dataset, {
	                computeLeftSingularVectors: false,
	                computeRightSingularVectors: true,
	                autoTranspose: true
	            });

	            this.U = svd.rightSingularVectors;

	            const singularValues = svd.diagonal;
	            const eigenvalues = new Array(singularValues.length);
	            for (var i = 0; i < singularValues.length; i++) {
	                eigenvalues[i] = singularValues[i] * singularValues[i] / (dataset.length - 1);
	            }
	            this.S = eigenvalues;
	        }
	    }

	    /**
	     * Load a PCA model from JSON
	     * @oaram {Object} model
	     * @return {PCA}
	     */
	    static load(model) {
	        if (model.name !== 'PCA')
	            throw new RangeError('Invalid model: ' + model.name);
	        return new PCA(null, null, true, model);
	    }

	    /**
	     * Exports the current model to an Object
	     * @return {Object} model
	     */
	    toJSON() {
	        return {
	            name: 'PCA',
	            center: this.center,
	            scale: this.scale,
	            means: this.means,
	            stdevs: this.stdevs,
	            U: this.U,
	            S: this.S,
	        };
	    }

	    /**
	     * Projects the dataset into new space of k dimensions.
	     * @param {Matrix} dataset
	     * @return {Matrix} dataset projected in the PCA space.
	     */
	    predict(dataset) {
	        dataset = new Matrix(dataset);

	        if (this.center) {
	            dataset.subRowVector(this.means);
	            if (this.scale) {
	                dataset.divRowVector(this.stdevs);
	            }
	        }
	        
	        return dataset.mmul(this.U);
	    }

	    /**
	     * Returns the proportion of variance for each component.
	     * @return {[number]}
	     */
	    getExplainedVariance() {
	        var sum = 0;
	        for (var i = 0; i < this.S.length; i++) {
	            sum += this.S[i];
	        }
	        return this.S.map(value => value / sum);
	    }

	    /**
	     * Returns the cumulative proportion of variance.
	     * @return {[number]}
	     */
	    getCumulativeVariance() {
	        var explained = this.getExplainedVariance();
	        for (var i = 1; i < explained.length; i++) {
	            explained[i] += explained[i - 1];
	        }
	        return explained;
	    }

	    /**
	     * Returns the Eigenvectors of the covariance matrix.
	     * @returns {Matrix}
	     */
	    getEigenvectors() {
	        return this.U;
	    }

	    /**
	     * Returns the Eigenvalues (on the diagonal).
	     * @returns {[number]}
	     */
	    getEigenvalues() {
	        return this.S;
	    }

	    /**
	     * Returns the standard deviations of the principal components
	     * @returns {[number]}
	     */
	    getStandardDeviations() {
	        return this.S.map(x => Math.sqrt(x));
	    }

	    /**
	     * Returns the loadings matrix
	     * @return {Matrix}
	     */
	    getLoadings() {
	        return this.U.transpose();
	    }

	    _adjust(dataset, options) {
	        this.center = !!options.center;
	        this.scale = !!options.scale;

	        dataset = new Matrix(dataset);

	        if (this.center) {
	            const means = mean(dataset);
	            const stdevs = this.scale ? stdev(dataset, means, true) : null;
	            this.means = means;
	            dataset.subRowVector(means);
	            if (this.scale) {
	                for (var i = 0; i < stdevs.length; i++) {
	                    if (stdevs[i] === 0) {
	                        throw new RangeError('Cannot scale the dataset (standard deviation is zero at index ' + i);
	                    }
	                }
	                this.stdevs = stdevs;
	                dataset.divRowVector(stdevs);
	            }
	        }

	        return dataset;
	    }

	    _computeFromCovarianceMatrix(dataset) {
	        const evd = new EVD(dataset, {assumeSymmetric: true});
	        this.U = evd.eigenvectorMatrix;
	        for (var i = 0; i < this.U.length; i++) {
	            this.U[i].reverse();
	        }
	        this.S = evd.realEigenvalues.reverse();
	    }
	}

	module.exports = PCA;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const measures = __webpack_require__(124);

	class Performance {
	    /**
	     *
	     * @param prediction - The prediction matrix
	     * @param target - The target matrix (values: truthy for same class, falsy for different class)
	     * @param options
	     *
	     * @option    all    True if the entire matrix must be used. False to ignore the diagonal and lower part (default is false, for similarity/distance matrices)
	     * @option    max    True if the max value corresponds to a perfect match (like in similarity matrices), false if it is the min value (default is false, like in distance matrices. All values will be multiplied by -1)
	     */
	    constructor(prediction, target, options) {
	        options = options || {};
	        if (prediction.length !== target.length || prediction[0].length !== target[0].length) {
	            throw new Error('dimensions of prediction and target do not match');
	        }
	        const rows = prediction.length;
	        const columns = prediction[0].length;
	        const isDistance = !options.max;

	        const predP = [];

	        if (options.all) {
	            for (var i = 0; i < rows; i++) {
	                for (var j = 0; j < columns; j++) {
	                    predP.push({
	                        pred: prediction[i][j],
	                        targ: target[i][j]
	                    });
	                }
	            }
	        } else {
	            if (rows < 3 || rows !== columns) {
	                throw new Error('When "all" option is false, the prediction matrix must be square and have at least 3 columns');
	            }
	            for (var i = 0; i < rows - 1; i++) {
	                for (var j = i + 1; j < columns; j++) {
	                    predP.push({
	                        pred: prediction[i][j],
	                        targ: target[i][j]
	                    });
	                }
	            }
	        }

	        if (isDistance) {
	            predP.sort((a, b) => a.pred - b.pred);
	        } else {
	            predP.sort((a, b) => b.pred - a.pred);
	        }
	        
	        const cutoffs = this.cutoffs = [isDistance ? Number.MIN_VALUE : Number.MAX_VALUE];
	        const fp = this.fp = [0];
	        const tp = this.tp = [0];

	        var nPos = 0;
	        var nNeg = 0;

	        var currentPred = predP[0].pred;
	        var nTp = 0;
	        var nFp = 0;
	        for (var i = 0; i < predP.length; i++) {
	            if (predP[i].pred !== currentPred) {
	                cutoffs.push(currentPred);
	                fp.push(nFp);
	                tp.push(nTp);
	                currentPred = predP[i].pred;
	            }
	            if (predP[i].targ) {
	                nPos++;
	                nTp++;
	            } else {
	                nNeg++;
	                nFp++;
	            }
	        }
	        cutoffs.push(currentPred);
	        fp.push(nFp);
	        tp.push(nTp);

	        const l = cutoffs.length;
	        const fn = this.fn = new Array(l);
	        const tn = this.tn = new Array(l);
	        const nPosPred = this.nPosPred = new Array(l);
	        const nNegPred = this.nNegPred = new Array(l);

	        for (var i = 0; i < l; i++) {
	            fn[i] = nPos - tp[i];
	            tn[i] = nNeg - fp[i];

	            nPosPred[i] = tp[i] + fp[i];
	            nNegPred[i] = tn[i] + fn[i];
	        }

	        this.nPos = nPos;
	        this.nNeg = nNeg;
	        this.nSamples = nPos + nNeg;
	    }

	    /**
	     * Computes a measure from the prediction object.
	     *
	     * Many measures are available and can be combined :
	     * To create a ROC curve, you need fpr and tpr
	     * To create a DET curve, you need fnr and fpr
	     * To create a Lift chart, you need rpp and lift
	     *
	     * Possible measures are : threshold (Threshold), acc (Accuracy), err (Error rate),
	     * fpr (False positive rate), tpr (True positive rate), fnr (False negative rate), tnr (True negative rate), ppv (Positive predictive value),
	     * npv (Negative predictive value), pcfall (Prediction-conditioned fallout), pcmiss (Prediction-conditioned miss), lift (Lift value), rpp (Rate of positive predictions), rnp (Rate of negative predictions)
	     *
	     * @param measure - The short name of the measure
	     *
	     * @return [number]
	     */
	    getMeasure(measure) {
	        if (typeof measure !== 'string') {
	            throw new Error('No measure specified');
	        }
	        if (!measures[measure]) {
	            throw new Error(`The specified measure (${measure}) does not exist`);
	        }
	        return measures[measure](this);
	    }

	    /**
	     * Returns the area under the ROC curve
	     */
	    getAURC() {
	        const l = this.cutoffs.length;
	        const x = new Array(l);
	        const y = new Array(l);
	        for (var i = 0; i < l; i++) {
	            x[i] = this.fp[i] / this.nNeg;
	            y[i] = this.tp[i] / this.nPos;
	        }
	        var auc = 0;
	        for (i = 1; i < l; i++) {
	            auc += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
	        }
	        return auc;
	    }

	    /**
	     * Returns the area under the DET curve
	     */
	    getAUDC() {
	        const l = this.cutoffs.length;
	        const x = new Array(l);
	        const y = new Array(l);
	        for (var i = 0; i < l; i++) {
	            x[i] = this.fn[i] / this.nPos;
	            y[i] = this.fp[i] / this.nNeg;
	        }
	        var auc = 0;
	        for (i = 1; i < l; i++) {
	            auc += 0.5 * (x[i] + x[i - 1]) * (y[i] - y[i - 1]);
	        }
	        return auc;
	    }

	    getDistribution(options) {
	        options = options || {};
	        var cutLength = this.cutoffs.length;
	        var cutLow = options.xMin || Math.floor(this.cutoffs[cutLength - 1] * 100) / 100;
	        var cutHigh = options.xMax || Math.ceil(this.cutoffs[1] * 100) / 100;
	        var interval = options.interval || Math.floor(((cutHigh - cutLow) / 20 * 10000000) - 1) / 10000000; // Trick to avoid the precision problem of float numbers

	        var xLabels = [];
	        var interValues = [];
	        var intraValues = [];
	        var interCumPercent = [];
	        var intraCumPercent = [];

	        var nTP = this.tp[cutLength - 1], currentTP = 0;
	        var nFP = this.fp[cutLength - 1], currentFP = 0;

	        for (var i = cutLow, j = (cutLength - 1); i <= cutHigh; i += interval) {
	            while (this.cutoffs[j] < i)
	                j--;

	            xLabels.push(i);

	            var thisTP = nTP - currentTP - this.tp[j];
	            var thisFP = nFP - currentFP - this.fp[j];

	            currentTP += thisTP;
	            currentFP += thisFP;

	            interValues.push(thisFP);
	            intraValues.push(thisTP);

	            interCumPercent.push(100 - (nFP - this.fp[j]) / nFP * 100);
	            intraCumPercent.push(100 - (nTP - this.tp[j]) / nTP * 100);
	        }

	        return {
	            xLabels: xLabels,
	            interValues: interValues,
	            intraValues: intraValues,
	            interCumPercent: interCumPercent,
	            intraCumPercent: intraCumPercent
	        };
	    }
	}

	Performance.names = {
	    acc: 'Accuracy',
	    err: 'Error rate',
	    fpr: 'False positive rate',
	    tpr: 'True positive rate',
	    fnr: 'False negative rate',
	    tnr: 'True negative rate',
	    ppv: 'Positive predictive value',
	    npv: 'Negative predictive value',
	    pcfall: 'Prediction-conditioned fallout',
	    pcmiss: 'Prediction-conditioned miss',
	    lift: 'Lift value',
	    rpp: 'Rate of positive predictions',
	    rnp: 'Rate of negative predictions',
	    threshold: 'Threshold'
	};

	module.exports = Performance;


/***/ },
/* 124 */
/***/ function(module, exports) {

	'use strict';

	// Accuracy
	exports.acc = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.tn[i] + pred.tp[i]) / (l - 1);
	    }
	    return result;
	};

	// Error rate
	exports.err = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.fn[i] + pred.fp[i] / (l - 1));
	    }
	    return result;
	};

	// False positive rate
	exports.fpr = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.fp[i] / pred.nNeg;
	    }
	    return result;
	};

	// True positive rate
	exports.tpr = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.tp[i] / pred.nPos;
	    }
	    return result;
	};

	// False negative rate
	exports.fnr = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.fn[i] / pred.nPos;
	    }
	    return result;
	};

	// True negative rate
	exports.tnr = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.tn[i] / pred.nNeg;
	    }
	    return result;
	};

	// Positive predictive value
	exports.ppv = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.fp[i] + pred.tp[i] !== 0) ? (pred.tp[i] / (pred.fp[i] + pred.tp[i])) : 0;
	    }
	    return result;
	};

	// Negative predictive value
	exports.npv = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.fn[i] + pred.tn[i] !== 0) ? (pred.tn[i] / (pred.fn[i] + pred.tn[i])) : 0;
	    }
	    return result;
	};

	// Prediction conditioned fallout
	exports.pcfall = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.fp[i] + pred.tp[i] !== 0) ? 1 - (pred.tp[i] / (pred.fp[i] + pred.tp[i])) : 1;
	    }
	    return result;
	};

	// Prediction conditioned miss
	exports.pcmiss = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.fn[i] + pred.tn[i] !== 0) ? 1 - (pred.tn[i] / (pred.fn[i] + pred.tn[i])) : 1;
	    }
	    return result;
	};

	// Lift value
	exports.lift = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = (pred.nPosPred[i] !== 0) ? ((pred.tp[i] / pred.nPos) / (pred.nPosPred[i] / pred.nSamples)) : 0;
	    }
	    return result;
	};

	// Rate of positive predictions
	exports.rpp = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.nPosPred[i] / pred.nSamples;
	    }
	    return result;
	};

	// Rate of negative predictions
	exports.rnp = pred => {
	    const l = pred.cutoffs.length;
	    const result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        result[i] = pred.nNegPred[i] / pred.nSamples;
	    }
	    return result;
	};

	// Threshold
	exports.threshold = pred => {
	    const clone = pred.cutoffs.slice();
	    clone[0] = clone[1]; // Remove the infinite value
	    return clone;
	};


/***/ },
/* 125 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var LOOP = 8;
	var FLOAT_MUL = 1 / 16777216;

	function multiply_uint32(n, m) {
	    n >>>= 0;
	    m >>>= 0;
	    var nlo = n & 0xffff;
	    var nhi = n - nlo;
	    return (nhi * m >>> 0) + nlo * m >>> 0;
	}

	var XSadd = (function () {
	    function XSadd() {
	        var seed = arguments.length <= 0 || arguments[0] === undefined ? Date.now() : arguments[0];

	        _classCallCheck(this, XSadd);

	        this.state = new Uint32Array(4);
	        this.init(seed);
	    }

	    _createClass(XSadd, [{
	        key: "init",
	        value: function init(seed) {
	            this.state[0] = seed;
	            this.state[1] = 0;
	            this.state[2] = 0;
	            this.state[3] = 0;
	            for (var i = 1; i < LOOP; i++) {
	                this.state[i & 3] ^= i + multiply_uint32(1812433253, this.state[i - 1 & 3] ^ this.state[i - 1 & 3] >>> 30 >>> 0) >>> 0;
	            }
	            period_certification(this);
	            for (var i = 0; i < LOOP; i++) {
	                next_state(this);
	            }
	        }

	        /**
	         * Returns a 32-bit integer r (0 <= r < 2^32)
	         */
	    }, {
	        key: "getUint32",
	        value: function getUint32() {
	            next_state(this);
	            return this.state[3] + this.state[2] >>> 0;
	        }

	        /**
	         * Returns a floating point number r (0.0 <= r < 1.0)
	         */
	    }, {
	        key: "getFloat",
	        value: function getFloat() {
	            return (this.getUint32() >>> 8) * FLOAT_MUL;
	        }
	    }, {
	        key: "random",
	        get: function get() {
	            if (!this._random) {
	                this._random = this.getFloat.bind(this);
	            }
	            return this._random;
	        }
	    }]);

	    return XSadd;
	})();

	exports["default"] = XSadd;

	function period_certification(xsadd) {
	    if (xsadd.state[0] === 0 && xsadd.state[1] === 0 && xsadd.state[2] === 0 && xsadd.state[3] === 0) {
	        xsadd.state[0] = 88; // X
	        xsadd.state[1] = 83; // S
	        xsadd.state[2] = 65; // A
	        xsadd.state[3] = 68; // D
	    }
	}

	var sh1 = 15;
	var sh2 = 18;
	var sh3 = 11;
	function next_state(xsadd) {
	    var t = xsadd.state[0];
	    t ^= t << sh1;
	    t ^= t >>> sh2;
	    t ^= xsadd.state[3] << sh3;
	    xsadd.state[0] = xsadd.state[1];
	    xsadd.state[1] = xsadd.state[2];
	    xsadd.state[2] = xsadd.state[3];
	    xsadd.state[3] = t;
	}
	module.exports = exports["default"];


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(127);
	exports.kernel = __webpack_require__(128).kernel;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var kernel = __webpack_require__(128).kernel;
	var getKernel = __webpack_require__(128).getKernel;

	/**
	 * Parameters to implement function
	 * @type {{C: number, tol: number, max_passes: number, par: number, k: string}}
	 * @param {number} C - regularization parameter
	 * @param {number} tol - numerical tolerance
	 * @param {number} max_passes - max number of times to iterate over alphas without
	 * changing
	 * @param {string} k - the kind of kernel
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * of the kernel
	 */
	var defaultOptions = {
	    C: 10,
	    tol: 10e-2,
	    max_passes: 100,
	    par: 2,
	    k: 'lineal'
	};

	/**
	 * Function to calculate the estimated prediction
	 * @param {Array <number>} x - point where calculate the function prediction
	 * @param {Array <Array <number>>} X - training data point in the form (x1, x2)
	 * @param {Array <number>} Y - training data labels in the domain {1,-1}
	 * @param {Array <number>} alpha - Lagrange multipliers
	 * @param {number} b - threshold of the function
	 * @param {string} k - the kind of kernel
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * of the kernel
	 * @returns {number}
	 */
	function f(x, X, Y, alpha, b, kernel, par) {
	    var m = X.length;
	    var aux = b;
	    for (var i = 0; i < m; i++) {
	        b += alpha[i]*Y[i]*kernel(X[i],x, par)
	    }
	    return aux;
	}

	/**
	 * Simplified version of the Sequential Minimal Optimization algorithm for training
	 * support vector machines
	 * @param {{json}} options - parameters to implement function
	 * @constructor
	 */
	function SVM(options) {
	    options = options || {};
	    this.options = {};
	    for (var o in defaultOptions) {
	        if (options.hasOwnProperty(o)) {
	            this.options[o] = options[o];
	        } else {
	            this.options[o] = defaultOptions[o];
	        }
	    }
	    this.kernel = getKernel(this.options.k);
	    this.b = 0;
	}

	/**
	 * Train the SVM model
	 * @param {Array <Array <number>>} X - training data point in the form (x1, x2)
	 * @param {Array <number>} Y - training data labels in the domain {1,-1}
	 */
	SVM.prototype.train = function (X, Y) {
	    var m = Y.length;
	    var alpha = new Array(m);
	    for (var a = 0; a < m; a++)
	        alpha[a] = 0;
	    if (X.length !== m)
	        throw new TypeError('Arrays should have the same length');
	    var b = 0,
	        b1 = 0,
	        b2 = 0,
	        iter = 0,
	        Ei = 0,
	        Ej = 0,
	        ai = 0,
	        aj = 0,
	        L = 0,
	        H = 0,
	        eta = 0;

	    while (iter < this.options.max_passes) {
	        var numChange = 0;
	        for (var i = 0; i < m; i++) {
	            Ei = f(X[i],X,Y,alpha,b,this.kernel,this.options.par) - Y[i];
	            if (((Y[i]*Ei < -this.options.tol) && (alpha[i] < this.options.C)) || ((Y[i]*Ei > this.options.tol) && (alpha[i] > 0))) {
	                var j = 0;
	                do {
	                    j = Math.ceil(Math.random()*(m - 1));
	                }
	                while (j === i);
	                Ej = f(X[j],X,Y,alpha,b,this.kernel,this.options.par) - Y[j];
	                ai = alpha[i];
	                aj = alpha[j];
	                if (Y[i] === Y[j]) {
	                    L = Math.max(0, ai+aj-this.options.C);
	                    H = Math.min(this.options.C, ai+aj);
	                }
	                else  {
	                    L = Math.max(0, ai-aj);
	                    H = Math.min(this.options.C, this.options.C-ai+aj);
	                }
	                if (L !== H) {
	                    eta = 2*this.kernel(X[i],X[j], this.options.par) - this.kernel(X[i],X[i], this.options.par) - this.kernel(X[j],X[j], this.options.par);
	                    if (eta < 0) {
	                        alpha[j] = alpha[j] - (Y[j]*(Ei - Ej)) / eta;
	                        if (alpha[j] > H)
	                            alpha[j] = H;
	                        else if (alpha[j] < L)
	                            alpha[j] = L;
	                        if (Math.abs(aj - alpha[j]) >= 10e-5) {
	                            alpha[i] = alpha[i] + Y[i]*Y[j]*(aj - alpha[j]);
	                            b1 = b - Ei - Y[i]*(alpha[i] - ai)*this.kernel(X[i],X[i], this.options.par) - Y[j]*(alpha[j] - aj)*this.kernel(X[i],X[j], this.options.par);
	                            b2 = b - Ej - Y[i]*(alpha[i] - ai)*this.kernel(X[i],X[j], this.options.par) - Y[j]*(alpha[j] - aj)*this.kernel(X[j],X[j], this.options.par);
	                            if ((alpha[i] < this.options.C) && (alpha[i] > 0))
	                                b = b1;
	                            else if ((alpha[j] < this.options.C) && (alpha[j] > 0))
	                                b = b2;
	                            else
	                                b = (b1 + b2) / 2;
	                            numChange += 1;
	                        }
	                    }
	                }
	            }
	        }
	        if (numChange == 0)
	            iter += 1;
	        else
	            iter = 0;
	    }
	    this.b = b;
	    var s = X[0].length;
	    this.W = new Array(s);
	    for (var r = 0; r < s; r++) {
	        this.W[r] = 0;
	        for (var w = 0; w < m; w++)
	            this.W[r] += Y[w]*alpha[w]*X[w][r];
	    }
	    this.alphas = alpha.splice();
	};

	/**
	 * Recreates a SVM based in the exported model
	 * @param {{name: string, ,options: {json} ,alpha: Array<number>, b: number}} model
	 * @returns {SVM}
	 */
	SVM.load = function (model) {
	    if (model.name === 'SVM') {
	        var svm = new SVM(model.options);
	        svm.W = model.W.slice();
	        svm.b = model.b;
	        return svm;
	    } else {
	        throw new TypeError('expecting a SVM model');
	    }
	};

	/**
	 * Let's have a JSON to recreate the model
	 * @returns {{name: String("SVM"), ,options: {json} ,alpha: Array<number>, b: number}}
	 * name identifier, options to recreate model, the Lagrange multipliers and the
	 * threshold of the objective function
	 */
	SVM.prototype.export = function () {
	    var model = {
	        name: 'SVM'
	    };
	    model.options = this.options;
	    model.W = this.W;
	    model.b = this.b;
	    return model;
	};

	/**
	 * Return the Lagrange multipliers
	 * @returns {Array <number>}
	 */
	SVM.prototype.getAlphas = function () {
	    return this.alphas.slice();
	};

	/**
	 * Returns the threshold of the model function
	 * @returns {number} threshold of the function
	 */
	SVM.prototype.getThreshold = function () {
	    return this.b;
	};

	/**
	 * Use the train model to make predictions
	 * @param {Array} p - An array or a single dot to have the prediction
	 * @returns {*} An array or a single {-1, 1} value of the prediction
	 */
	SVM.prototype.predict = function (p) {
	    var ev;
	    if (Array.isArray(p) && (Array.isArray(p[0]) || (typeof p[0] === 'object'))) {
	        var ans = new Array(p.length);
	        for (var i = 0; i < ans.length; i++) {
	            ev = this.b;
	            for (var j = 0; j < this.W.length; j++)
	                ev += this.W[j]*p[j];
	            if (ev < 0)
	                ans[i] = -1;
	            else
	                ans[i] = 1;
	        }
	        return ans;
	    }
	    else {
	        ev = this.b;
	        for (var e = 0; e < this.W.length; e++)
	            ev += this.W[e]*p[e];
	        if (ev < 0)
	            return -1;
	        else
	            return 1;
	    }
	};

	module.exports = SVM;

/***/ },
/* 128 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Kernel function to return the dot product for different spaces
	 * @param {Array <number>} x1 - input first vector
	 * @param {Array <number>} x2 - input second vector
	 * @param {string} func - the kind of transformation
	 * @param {number} par - parameter used in the polynomial and the radial function
	 * @return {number} calculus of the dot product using the function
	 * */
	function kernel(x1,x2,func,par) {
	    return getKernel(func)(x1, x2, par);
	}

	/**
	 * The dot product between the p1 and p2 vectors
	 * @param {Array <number>} p1 - first vector to get dot product
	 * @param {Array <number>} p2 - second vector to get dot product
	 * @returns {number} dot product between the p1 and p2 vectors
	 */
	function dot(p1, p2) {
	    var l = p1.length;
	    var prod = 0;

	    for (var i = 0; i < l; i++) {
	        prod += p1[i] * p2[i];
	    }

	    return prod;
	}

	function getKernel(func) {
	    func = (typeof func === 'undefined') ? 'lineal' : func;

	    switch(func) {
	        case 'lineal':
	            return kernelLineal;
	        case 'polynomial':
	            return kernelPolynomial;
	        case 'radial':
	            return kernelRadial;
	        default:
	            throw new TypeError('Function kernel undefined: ' + func);
	    }
	}

	function kernelLineal(x1,x2) {
	    return dot(x1,x2);
	}

	function kernelPolynomial(x1, x2, par) {
	    par = (typeof par === 'undefined') ? 2 : par;
	    return Math.pow((dot(x1, x2) + 1), par);
	}

	function kernelRadial(x1, x2, par) {
	    par = (typeof par === 'undefined') ? 2 : par;
	    var l = x1.length;
	    var rest = new Array(l);
	    for (var i = 0; i < l; i++) {
	        rest[i] = x1[i] - x2[i];
	    }
	    var norm = dot(rest, rest);
	    return Math.exp((norm)/(-2*par*par));
	}

	module.exports = {
	    kernel: kernel,
	    getKernel: getKernel,
	    lineal : kernelLineal,
	    polynomial : kernelPolynomial,
	    radial : kernelRadial
	};


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(130);

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = KNN;

	var KDTree = __webpack_require__(131).kdTree;
	var Distances = __webpack_require__(38);

	/**
	 * K-Nearest neighboor constructor.
	 *
	 * @param reload - loading purposes.
	 * @param model - loading purposes
	 * @constructor
	 */
	function KNN(reload, model) {
	    if(reload) {
	        this.kdtree = model.kdtree;
	        this.k = model.k;
	        this.classes = model.classes;
	    }
	}

	/**
	 * Function that trains the KNN with the given trainingSet and trainingLabels.
	 * The third argument is an object with the following options.
	 *  * distance: that represent the distance function applied (default: euclidean)
	 *  * k: the number of neighboors to take in count for classify (default: number of features + 1)
	 *
	 * @param trainingSet
	 * @param trainingLabels
	 * @param options
	 */
	KNN.prototype.train = function (trainingSet, trainingLabels, options) {
	    if(options === undefined) options = {};
	    if(options.distance === undefined) options.distance = Distances.distance.euclidean;
	    if(options.k === undefined) options.k = trainingSet[0].length + 1;

	    var classes = 0;
	    var exist = new Array(1000);
	    var j = 0;
	    for(var i = 0; i < trainingLabels.length; ++i) {
	        if(exist.indexOf(trainingLabels[i]) === -1) {
	            classes++;
	            exist[j] = trainingLabels[i];
	            j++;
	        }
	    }

	    // copy dataset
	    var points = new Array(trainingSet.length);
	    for(i = 0; i < points.length; ++i) {
	        points[i] = trainingSet[i].slice();
	    }

	    this.features = trainingSet[0].length;
	    for(i = 0; i < trainingLabels.length; ++i) {
	        points[i].push(trainingLabels[i]);
	    }

	    var dimensions = new Array(trainingSet[0].length);
	    for(i = 0; i < dimensions.length; ++i) {
	        dimensions[i] = i;
	    }

	    this.kdtree = new KDTree(points, options.distance, dimensions);
	    this.k = options.k;
	    this.classes = classes;
	};

	/**
	 * Function that returns the predictions given the dataset.
	 * 
	 * @param dataset
	 * @returns {Array}
	 */
	KNN.prototype.predict = function (dataset) {
	    var predictions = new Array(dataset.length);
	    for(var i = 0; i < dataset.length; ++i) {
	        predictions[i] = this.getSinglePrediction(dataset[i]);
	    }

	    return predictions;
	};

	/**
	 * function that returns a prediction for a single case.
	 * @param currentCase
	 * @returns {number}
	 */
	KNN.prototype.getSinglePrediction = function (currentCase) {
	    var nearestPoints = this.kdtree.nearest(currentCase, this.k);
	    var pointsPerClass = new Array(this.classes);
	    var predictedClass = -1;
	    var maxPoints = -1;
	    var lastElement = nearestPoints[0][0].length - 1;

	    for(var i = 0; i < pointsPerClass.length; ++i) {
	        pointsPerClass[i] = 0;
	    }

	    for(i = 0; i < nearestPoints.length; ++i) {
	        var currentClass = nearestPoints[i][0][lastElement];
	        var currentPoints = ++pointsPerClass[currentClass];
	        if(currentPoints > maxPoints) {
	            predictedClass = currentClass;
	            maxPoints = currentPoints;
	        }
	    }

	    return predictedClass;
	};

	/**
	 * function that returns a KNN classifier with the given model.
	 *
	 * @param model
	 */
	KNN.load = function (model) {
	    if(model.modelName !== "KNN")
	        throw new RangeError("The given model is invalid!");

	    return new KNN(true, model);
	};

	/**
	 * function that exports the current KNN classifier.
	 */
	KNN.prototype.export = function () {
	    return {
	        modelName: "KNN",
	        kdtree: this.kdtree,
	        k: this.k,
	        classes: this.classes
	    };
	};

/***/ },
/* 131 */
/***/ function(module, exports) {

	'use strict';

	/**
	* k-d Tree JavaScript - V 1.01
	*
	* https://github.com/ubilabs/kd-tree-javascript
	*
	* @author Mircea Pricop <pricop@ubilabs.net>, 2012
	* @author Martin Kleppe <kleppe@ubilabs.net>, 2012
	* @author Ubilabs http://ubilabs.net, 2012
	* @license MIT License <http://www.opensource.org/licenses/mit-license.php>
	*/


	function Node(obj, dimension, parent) {
	    this.obj = obj;
	    this.left = null;
	    this.right = null;
	    this.parent = parent;
	    this.dimension = dimension;
	}

	function kdTree(points, metric, dimensions) {

	    var self = this;

	    function buildTree(points, depth, parent) {
	        var dim = depth % dimensions.length,
	            median,
	            node;

	        if (points.length === 0) {
	            return null;
	        }
	        if (points.length === 1) {
	            return new Node(points[0], dim, parent);
	        }

	        points.sort(function (a, b) {
	            return a[dimensions[dim]] - b[dimensions[dim]];
	        });

	        median = Math.floor(points.length / 2);
	        node = new Node(points[median], dim, parent);
	        node.left = buildTree(points.slice(0, median), depth + 1, node);
	        node.right = buildTree(points.slice(median + 1), depth + 1, node);

	        return node;
	    }

	    // Reloads a serialied tree
	    function loadTree (data) {
	        // Just need to restore the `parent` parameter
	        self.root = data;

	        function restoreParent (root) {
	            if (root.left) {
	                root.left.parent = root;
	                restoreParent(root.left);
	            }

	            if (root.right) {
	                root.right.parent = root;
	                restoreParent(root.right);
	            }
	        }

	        restoreParent(self.root);
	    }

	    // If points is not an array, assume we're loading a pre-built tree
	    if (!Array.isArray(points)) loadTree(points, metric, dimensions);
	    else this.root = buildTree(points, 0, null);

	    // Convert to a JSON serializable structure; this just requires removing
	    // the `parent` property
	    this.toJSON = function (src) {
	        if (!src) src = this.root;
	        var dest = new Node(src.obj, src.dimension, null);
	        if (src.left) dest.left = self.toJSON(src.left);
	        if (src.right) dest.right = self.toJSON(src.right);
	        return dest;
	    };

	    this.insert = function (point) {
	        function innerSearch(node, parent) {

	            if (node === null) {
	                return parent;
	            }

	            var dimension = dimensions[node.dimension];
	            if (point[dimension] < node.obj[dimension]) {
	                return innerSearch(node.left, node);
	            } else {
	                return innerSearch(node.right, node);
	            }
	        }

	        var insertPosition = innerSearch(this.root, null),
	            newNode,
	            dimension;

	        if (insertPosition === null) {
	            this.root = new Node(point, 0, null);
	            return;
	        }

	        newNode = new Node(point, (insertPosition.dimension + 1) % dimensions.length, insertPosition);
	        dimension = dimensions[insertPosition.dimension];

	        if (point[dimension] < insertPosition.obj[dimension]) {
	            insertPosition.left = newNode;
	        } else {
	            insertPosition.right = newNode;
	        }
	    };

	    this.remove = function (point) {
	        var node;

	        function nodeSearch(node) {
	            if (node === null) {
	                return null;
	            }

	            if (node.obj === point) {
	                return node;
	            }

	            var dimension = dimensions[node.dimension];

	            if (point[dimension] < node.obj[dimension]) {
	                return nodeSearch(node.left, node);
	            } else {
	                return nodeSearch(node.right, node);
	            }
	        }

	        function removeNode(node) {
	            var nextNode,
	                nextObj,
	                pDimension;

	            function findMin(node, dim) {
	                var dimension,
	                    own,
	                    left,
	                    right,
	                    min;

	                if (node === null) {
	                    return null;
	                }

	                dimension = dimensions[dim];

	                if (node.dimension === dim) {
	                    if (node.left !== null) {
	                        return findMin(node.left, dim);
	                    }
	                    return node;
	                }

	                own = node.obj[dimension];
	                left = findMin(node.left, dim);
	                right = findMin(node.right, dim);
	                min = node;

	                if (left !== null && left.obj[dimension] < own) {
	                    min = left;
	                }
	                if (right !== null && right.obj[dimension] < min.obj[dimension]) {
	                    min = right;
	                }
	                return min;
	            }

	            if (node.left === null && node.right === null) {
	                if (node.parent === null) {
	                    self.root = null;
	                    return;
	                }

	                pDimension = dimensions[node.parent.dimension];

	                if (node.obj[pDimension] < node.parent.obj[pDimension]) {
	                    node.parent.left = null;
	                } else {
	                    node.parent.right = null;
	                }
	                return;
	            }

	            // If the right subtree is not empty, swap with the minimum element on the
	            // node's dimension. If it is empty, we swap the left and right subtrees and
	            // do the same.
	            if (node.right !== null) {
	                nextNode = findMin(node.right, node.dimension);
	                nextObj = nextNode.obj;
	                removeNode(nextNode);
	                node.obj = nextObj;
	            } else {
	                nextNode = findMin(node.left, node.dimension);
	                nextObj = nextNode.obj;
	                removeNode(nextNode);
	                node.right = node.left;
	                node.left = null;
	                node.obj = nextObj;
	            }

	        }

	        node = nodeSearch(self.root);

	        if (node === null) { return; }

	        removeNode(node);
	    };

	    this.nearest = function (point, maxNodes, maxDistance) {
	        var i,
	            result,
	            bestNodes;

	        bestNodes = new BinaryHeap(
	            function (e) { return -e[1]; }
	        );

	        function nearestSearch(node) {
	            var bestChild,
	                dimension = dimensions[node.dimension],
	                ownDistance = metric(point, node.obj),
	                linearPoint = {},
	                linearDistance,
	                otherChild,
	                i;

	            function saveNode(node, distance) {
	                bestNodes.push([node, distance]);
	                if (bestNodes.size() > maxNodes) {
	                    bestNodes.pop();
	                }
	            }

	            for (i = 0; i < dimensions.length; i += 1) {
	                if (i === node.dimension) {
	                    linearPoint[dimensions[i]] = point[dimensions[i]];
	                } else {
	                    linearPoint[dimensions[i]] = node.obj[dimensions[i]];
	                }
	            }

	            linearDistance = metric(linearPoint, node.obj);

	            if (node.right === null && node.left === null) {
	                if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	                    saveNode(node, ownDistance);
	                }
	                return;
	            }

	            if (node.right === null) {
	                bestChild = node.left;
	            } else if (node.left === null) {
	                bestChild = node.right;
	            } else {
	                if (point[dimension] < node.obj[dimension]) {
	                    bestChild = node.left;
	                } else {
	                    bestChild = node.right;
	                }
	            }

	            nearestSearch(bestChild);

	            if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
	                saveNode(node, ownDistance);
	            }

	            if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
	                if (bestChild === node.left) {
	                    otherChild = node.right;
	                } else {
	                    otherChild = node.left;
	                }
	                if (otherChild !== null) {
	                    nearestSearch(otherChild);
	                }
	            }
	        }

	        if (maxDistance) {
	            for (i = 0; i < maxNodes; i += 1) {
	                bestNodes.push([null, maxDistance]);
	            }
	        }

	        if(self.root)
	            nearestSearch(self.root);

	        result = [];

	        for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
	            if (bestNodes.content[i][0]) {
	                result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
	            }
	        }
	        return result;
	    };

	    this.balanceFactor = function () {
	        function height(node) {
	            if (node === null) {
	                return 0;
	            }
	            return Math.max(height(node.left), height(node.right)) + 1;
	        }

	        function count(node) {
	            if (node === null) {
	                return 0;
	            }
	            return count(node.left) + count(node.right) + 1;
	        }

	        return height(self.root) / (Math.log(count(self.root)) / Math.log(2));
	    };
	}

	// Binary heap implementation from:
	// http://eloquentjavascript.net/appendix2.html

	function BinaryHeap(scoreFunction){
	    this.content = [];
	    this.scoreFunction = scoreFunction;
	}

	BinaryHeap.prototype = {
	    push: function(element) {
	        // Add the new element to the end of the array.
	        this.content.push(element);
	        // Allow it to bubble up.
	        this.bubbleUp(this.content.length - 1);
	    },

	    pop: function() {
	        // Store the first element so we can return it later.
	        var result = this.content[0];
	        // Get the element at the end of the array.
	        var end = this.content.pop();
	        // If there are any elements left, put the end element at the
	        // start, and let it sink down.
	        if (this.content.length > 0) {
	            this.content[0] = end;
	            this.sinkDown(0);
	        }
	        return result;
	    },

	    peek: function() {
	        return this.content[0];
	    },

	    remove: function(node) {
	        var len = this.content.length;
	        // To remove a value, we must search through the array to find
	        // it.
	        for (var i = 0; i < len; i++) {
	            if (this.content[i] == node) {
	                // When it is found, the process seen in 'pop' is repeated
	                // to fill up the hole.
	                var end = this.content.pop();
	                if (i != len - 1) {
	                    this.content[i] = end;
	                    if (this.scoreFunction(end) < this.scoreFunction(node))
	                        this.bubbleUp(i);
	                    else
	                        this.sinkDown(i);
	                }
	                return;
	            }
	        }
	        throw new Error("Node not found.");
	    },

	    size: function() {
	        return this.content.length;
	    },

	    bubbleUp: function(n) {
	        // Fetch the element that has to be moved.
	        var element = this.content[n];
	        // When at 0, an element can not go up any further.
	        while (n > 0) {
	            // Compute the parent element's index, and fetch it.
	            var parentN = Math.floor((n + 1) / 2) - 1,
	                parent = this.content[parentN];
	            // Swap the elements if the parent is greater.
	            if (this.scoreFunction(element) < this.scoreFunction(parent)) {
	                this.content[parentN] = element;
	                this.content[n] = parent;
	                // Update 'n' to continue at the new position.
	                n = parentN;
	            }
	            // Found a parent that is less, no need to move it further.
	            else {
	                break;
	            }
	        }
	    },

	    sinkDown: function(n) {
	        // Look up the target element and its score.
	        var length = this.content.length,
	            element = this.content[n],
	            elemScore = this.scoreFunction(element);

	        while(true) {
	            // Compute the indices of the child elements.
	            var child2N = (n + 1) * 2, child1N = child2N - 1;
	            // This is used to store the new position of the element,
	            // if any.
	            var swap = null;
	            // If the first child exists (is inside the array)...
	            if (child1N < length) {
	                // Look it up and compute its score.
	                var child1 = this.content[child1N],
	                    child1Score = this.scoreFunction(child1);
	                // If the score is less than our element's, we need to swap.
	                if (child1Score < elemScore)
	                    swap = child1N;
	            }
	            // Do the same checks for the other child.
	            if (child2N < length) {
	                var child2 = this.content[child2N],
	                    child2Score = this.scoreFunction(child2);
	                if (child2Score < (swap == null ? elemScore : child1Score)){
	                    swap = child2N;
	                }
	            }

	            // If the element needs to be moved, swap it, and continue.
	            if (swap != null) {
	                this.content[n] = this.content[swap];
	                this.content[swap] = element;
	                n = swap;
	            }
	            // Otherwise, we are done.
	            else {
	                break;
	            }
	        }
	    }
	};

	this.kdTree = kdTree;

	exports.kdTree = kdTree;
	exports.BinaryHeap = BinaryHeap;


/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = exports = __webpack_require__(133).NaiveBayes;
	exports.separateClasses = __webpack_require__(133).separateClasses;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(14);
	var Stat = __webpack_require__(134);

	module.exports.NaiveBayes = NaiveBayes;
	module.exports.separateClasses = separateClasses;

	/**
	 * Constructor for the Naive Bayes classifier, the parameters here is just for loading purposes.
	 *
	 * @param reload
	 * @param model
	 * @constructor
	 */
	function NaiveBayes(reload, model) {
	    if(reload) {
	        this.means = model.means;
	        this.calculateProbabilities = model.calculateProbabilities;
	    }
	}

	/**
	 * Function that trains the classifier with a matrix that represents the training set and an array that
	 * represents the label of each row in the training set. the labels must be numbers between 0 to n-1 where
	 * n represents the number of classes.
	 *
	 * WARNING: in the case that one class, all the cases in one or more features have the same value, the
	 * Naive Bayes classifier will not work well.
	 * @param trainingSet
	 * @param trainingLabels
	 */
	NaiveBayes.prototype.train = function (trainingSet, trainingLabels) {
	    var C1 = Math.sqrt(2*Math.PI); // constant to precalculate the squared root
	    if(!Matrix.isMatrix(trainingSet)) trainingSet = new Matrix(trainingSet);
	    else trainingSet = trainingSet.clone();

	    if(trainingSet.rows !== trainingLabels.length)
	        throw new RangeError("the size of the training set and the training labels must be the same.");

	    var separatedClasses = separateClasses(trainingSet, trainingLabels);
	    var calculateProbabilities = new Array(separatedClasses.length);
	    this.means = new Array(separatedClasses.length);
	    for(var i = 0; i < separatedClasses.length; ++i) {
	        var means = Stat.matrix.mean(separatedClasses[i]);
	        var std = Stat.matrix.standardDeviation(separatedClasses[i], means);

	        var logPriorProbability = Math.log(separatedClasses[i].rows / trainingSet.rows);
	        calculateProbabilities[i] = new Array(means.length + 1);

	        calculateProbabilities[i][0] = logPriorProbability;
	        for(var j = 1; j < means.length + 1; ++j) {
	            var currentStd = std[j - 1];
	            calculateProbabilities[i][j] = [(1 / (C1 * currentStd)), -2*currentStd*currentStd];
	        }

	        this.means[i] = means;
	    }

	    this.calculateProbabilities = calculateProbabilities;
	};

	/**
	 * function that predicts each row of the dataset (must be a matrix).
	 *
	 * @param dataset
	 * @returns {Array}
	 */
	NaiveBayes.prototype.predict = function (dataset) {
	    if(dataset[0].length === this.calculateProbabilities[0].length)
	        throw new RangeError('the dataset must have the same features as the training set');

	    var predictions = new Array(dataset.length);

	    for(var i = 0; i < predictions.length; ++i) {
	        predictions[i] = getCurrentClass(dataset[i], this.means, this.calculateProbabilities);
	    }

	    return predictions;
	};

	/**
	 * Function the retrieves a prediction with one case.
	 *
	 * @param currentCase
	 * @param mean - Precalculated means of each class trained
	 * @param classes - Precalculated value of each class (Prior probability and probability function of each feature)
	 * @returns {number}
	 */
	function getCurrentClass(currentCase, mean, classes) {
	    var maxProbability = 0;
	    var predictedClass = -1;

	    // going through all precalculated values for the classes
	    for(var i = 0; i < classes.length; ++i) {
	        var currentProbability = classes[i][0]; // initialize with the prior probability
	        for(var j = 1; j < classes[0][1].length + 1; ++j) {
	            currentProbability += calculateLogProbability(currentCase[j - 1], mean[i][j - 1], classes[i][j][0], classes[i][j][1]);
	        }

	        currentProbability = Math.exp(currentProbability);
	        if(currentProbability > maxProbability) {
	            maxProbability = currentProbability;
	            predictedClass = i;
	        }
	    }

	    return predictedClass;
	}

	/**
	 * Function that export the NaiveBayes model.
	 * @returns {{modelName: string, means: *, calculateProbabilities: *}}
	 */
	NaiveBayes.prototype.export = function () {
	    return {
	        modelName: "NaiveBayes",
	        means: this.means,
	        calculateProbabilities: this.calculateProbabilities
	    };
	};

	/**
	 * Function that create a Naive Bayes classifier with the given model.
	 * @param model
	 * @returns {NaiveBayes}
	 */
	NaiveBayes.load = function (model) {
	    if(model.modelName !== 'NaiveBayes')
	        throw new RangeError("The given model is invalid!");

	    return new NaiveBayes(true, model);
	};

	/**
	 * function that retrieves the probability of the feature given the class.
	 * @param value - value of the feature.
	 * @param mean - mean of the feature for the given class.
	 * @param C1 - precalculated value of (1 / (sqrt(2*pi) * std)).
	 * @param C2 - precalculated value of (2 * std^2) for the denominator of the exponential.
	 * @returns {number}
	 */
	function calculateLogProbability(value, mean, C1, C2) {
	    var value = value - mean;
	    return Math.log(C1 * Math.exp((value * value) / C2))
	}

	/**
	 * Function that retuns an array of matrices of the cases that belong to each class.
	 * @param X - dataset
	 * @param y - predictions
	 * @returns {Array}
	 */
	function separateClasses(X, y) {
	    var features = X.columns;

	    var classes = 0;
	    var totalPerClasses = new Array(100); // max upperbound of classes
	    for (var i = 0; i < y.length; i++) {
	        if(totalPerClasses[y[i]] === undefined) {
	            totalPerClasses[y[i]] = 0;
	            classes++;
	        }
	        totalPerClasses[y[i]]++;
	    }
	    var separatedClasses = new Array(classes);
	    var currentIndex = new Array(classes);
	    for(i = 0; i < classes; ++i) {
	        separatedClasses[i] = new Matrix(totalPerClasses[i], features);
	        currentIndex[i] = 0;
	    }
	    for(i = 0; i < X.rows; ++i) {
	        separatedClasses[y[i]].setRow(currentIndex[y[i]], X.getRow(i));
	        currentIndex[y[i]]++;
	    }
	    return separatedClasses;
	}


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.array = __webpack_require__(135);
	exports.matrix = __webpack_require__(136);


/***/ },
/* 135 */
/***/ function(module, exports) {

	'use strict';

	function compareNumbers(a, b) {
	    return a - b;
	}

	/**
	 * Computes the sum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.sum = function sum(values) {
	    var sum = 0;
	    for (var i = 0; i < values.length; i++) {
	        sum += values[i];
	    }
	    return sum;
	};

	/**
	 * Computes the maximum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.max = function max(values) {
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] > max) max = values[i];
	    }
	    return max;
	};

	/**
	 * Computes the minimum of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.min = function min(values) {
	    var min = Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	    }
	    return min;
	};

	/**
	 * Computes the min and max of the given values
	 * @param {Array} values
	 * @returns {{min: number, max: number}}
	 */
	exports.minMax = function minMax(values) {
	    var min = Infinity;
	    var max = -Infinity;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] < min) min = values[i];
	        if (values[i] > max) max = values[i];
	    }
	    return {
	        min: min,
	        max: max
	    };
	};

	/**
	 * Computes the arithmetic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.arithmeticMean = function arithmeticMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        sum += values[i];
	    }
	    return sum / l;
	};

	/**
	 * {@link arithmeticMean}
	 */
	exports.mean = exports.arithmeticMean;

	/**
	 * Computes the geometric mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.geometricMean = function geometricMean(values) {
	    var mul = 1;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        mul *= values[i];
	    }
	    return Math.pow(mul, 1 / l);
	};

	/**
	 * Computes the mean of the log of the given values
	 * If the return value is exponentiated, it gives the same result as the
	 * geometric mean.
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.logMean = function logMean(values) {
	    var lnsum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        lnsum += Math.log(values[i]);
	    }
	    return lnsum / l;
	};

	/**
	 * Computes the weighted grand mean for a list of means and sample sizes
	 * @param {Array} means - Mean values for each set of samples
	 * @param {Array} samples - Number of original values for each set of samples
	 * @returns {number}
	 */
	exports.grandMean = function grandMean(means, samples) {
	    var sum = 0;
	    var n = 0;
	    var l = means.length;
	    for (var i = 0; i < l; i++) {
	        sum += samples[i] * means[i];
	        n += samples[i];
	    }
	    return sum / n;
	};

	/**
	 * Computes the truncated mean of the given values using a given percentage
	 * @param {Array} values
	 * @param {number} percent - The percentage of values to keep (range: [0,1])
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var k = Math.floor(l * percent);
	    var sum = 0;
	    for (var i = k; i < (l - k); i++) {
	        sum += values[i];
	    }
	    return sum / (l - 2 * k);
	};

	/**
	 * Computes the harmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.harmonicMean = function harmonicMean(values) {
	    var sum = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        if (values[i] === 0) {
	            throw new RangeError('value at index ' + i + 'is zero');
	        }
	        sum += 1 / values[i];
	    }
	    return l / sum;
	};

	/**
	 * Computes the contraharmonic mean of the given values
	 * @param {Array} values
	 * @returns {number}
	 */
	exports.contraHarmonicMean = function contraHarmonicMean(values) {
	    var r1 = 0;
	    var r2 = 0;
	    var l = values.length;
	    for (var i = 0; i < l; i++) {
	        r1 += values[i] * values[i];
	        r2 += values[i];
	    }
	    if (r2 < 0) {
	        throw new RangeError('sum of values is negative');
	    }
	    return r1 / r2;
	};

	/**
	 * Computes the median of the given values
	 * @param {Array} values
	 * @param {boolean} [alreadySorted=false]
	 * @returns {number}
	 */
	exports.median = function median(values, alreadySorted) {
	    if (alreadySorted === undefined) alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice().sort(compareNumbers);
	    }
	    var l = values.length;
	    var half = Math.floor(l / 2);
	    if (l % 2 === 0) {
	        return (values[half - 1] + values[half]) * 0.5;
	    } else {
	        return values[half];
	    }
	};

	/**
	 * Computes the variance of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.variance = function variance(values, unbiased) {
	    if (unbiased === undefined) unbiased = true;
	    var theMean = exports.mean(values);
	    var theVariance = 0;
	    var l = values.length;

	    for (var i = 0; i < l; i++) {
	        var x = values[i] - theMean;
	        theVariance += x * x;
	    }

	    if (unbiased) {
	        return theVariance / (l - 1);
	    } else {
	        return theVariance / l;
	    }
	};

	/**
	 * Computes the standard deviation of the given values
	 * @param {Array} values
	 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
	 * @returns {number}
	 */
	exports.standardDeviation = function standardDeviation(values, unbiased) {
	    return Math.sqrt(exports.variance(values, unbiased));
	};

	exports.standardError = function standardError(values) {
	    return exports.standardDeviation(values) / Math.sqrt(values.length);
	};

	exports.quartiles = function quartiles(values, alreadySorted) {
	    if (typeof(alreadySorted) === 'undefined') alreadySorted = false;
	    if (!alreadySorted) {
	        values = values.slice();
	        values.sort(compareNumbers);
	    }

	    var quart = values.length / 4;
	    var q1 = values[Math.ceil(quart) - 1];
	    var q2 = exports.median(values, true);
	    var q3 = values[Math.ceil(quart * 3) - 1];

	    return {q1: q1, q2: q2, q3: q3};
	};

	exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
	    return Math.sqrt(exports.pooledVariance(samples, unbiased));
	};

	exports.pooledVariance = function pooledVariance(samples, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var sum = 0;
	    var length = 0, l = samples.length;
	    for (var i = 0; i < l; i++) {
	        var values = samples[i];
	        var vari = exports.variance(values);

	        sum += (values.length - 1) * vari;

	        if (unbiased)
	            length += values.length - 1;
	        else
	            length += values.length;
	    }
	    return sum / length;
	};

	exports.mode = function mode(values) {
	    var l = values.length,
	        itemCount = new Array(l),
	        i;
	    for (i = 0; i < l; i++) {
	        itemCount[i] = 0;
	    }
	    var itemArray = new Array(l);
	    var count = 0;

	    for (i = 0; i < l; i++) {
	        var index = itemArray.indexOf(values[i]);
	        if (index >= 0)
	            itemCount[index]++;
	        else {
	            itemArray[count] = values[i];
	            itemCount[count] = 1;
	            count++;
	        }
	    }

	    var maxValue = 0, maxIndex = 0;
	    for (i = 0; i < count; i++) {
	        if (itemCount[i] > maxValue) {
	            maxValue = itemCount[i];
	            maxIndex = i;
	        }
	    }

	    return itemArray[maxIndex];
	};

	exports.covariance = function covariance(vector1, vector2, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var mean1 = exports.mean(vector1);
	    var mean2 = exports.mean(vector2);

	    if (vector1.length !== vector2.length)
	        throw "Vectors do not have the same dimensions";

	    var cov = 0, l = vector1.length;
	    for (var i = 0; i < l; i++) {
	        var x = vector1[i] - mean1;
	        var y = vector2[i] - mean2;
	        cov += x * y;
	    }

	    if (unbiased)
	        return cov / (l - 1);
	    else
	        return cov / l;
	};

	exports.skewness = function skewness(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);

	    var s2 = 0, s3 = 0, l = values.length;
	    for (var i = 0; i < l; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s3 += dev * dev * dev;
	    }
	    var m2 = s2 / l;
	    var m3 = s3 / l;

	    var g = m3 / (Math.pow(m2, 3 / 2.0));
	    if (unbiased) {
	        var a = Math.sqrt(l * (l - 1));
	        var b = l - 2;
	        return (a / b) * g;
	    }
	    else {
	        return g;
	    }
	};

	exports.kurtosis = function kurtosis(values, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var theMean = exports.mean(values);
	    var n = values.length, s2 = 0, s4 = 0;

	    for (var i = 0; i < n; i++) {
	        var dev = values[i] - theMean;
	        s2 += dev * dev;
	        s4 += dev * dev * dev * dev;
	    }
	    var m2 = s2 / n;
	    var m4 = s4 / n;

	    if (unbiased) {
	        var v = s2 / (n - 1);
	        var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	        var b = s4 / (v * v);
	        var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));

	        return a * b - 3 * c;
	    }
	    else {
	        return m4 / (m2 * m2) - 3;
	    }
	};

	exports.entropy = function entropy(values, eps) {
	    if (typeof(eps) === 'undefined') eps = 0;
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * Math.log(values[i] + eps);
	    return -sum;
	};

	exports.weightedMean = function weightedMean(values, weights) {
	    var sum = 0, l = values.length;
	    for (var i = 0; i < l; i++)
	        sum += values[i] * weights[i];
	    return sum;
	};

	exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
	    return Math.sqrt(exports.weightedVariance(values, weights));
	};

	exports.weightedVariance = function weightedVariance(values, weights) {
	    var theMean = exports.weightedMean(values, weights);
	    var vari = 0, l = values.length;
	    var a = 0, b = 0;

	    for (var i = 0; i < l; i++) {
	        var z = values[i] - theMean;
	        var w = weights[i];

	        vari += w * (z * z);
	        b += w;
	        a += w * w;
	    }

	    return vari * (b / (b * b - a));
	};

	exports.center = function center(values, inPlace) {
	    if (typeof(inPlace) === 'undefined') inPlace = false;

	    var result = values;
	    if (!inPlace)
	        result = values.slice();

	    var theMean = exports.mean(result), l = result.length;
	    for (var i = 0; i < l; i++)
	        result[i] -= theMean;
	};

	exports.standardize = function standardize(values, standardDev, inPlace) {
	    if (typeof(standardDev) === 'undefined') standardDev = exports.standardDeviation(values);
	    if (typeof(inPlace) === 'undefined') inPlace = false;
	    var l = values.length;
	    var result = inPlace ? values : new Array(l);
	    for (var i = 0; i < l; i++)
	        result[i] = values[i] / standardDev;
	    return result;
	};

	exports.cumulativeSum = function cumulativeSum(array) {
	    var l = array.length;
	    var result = new Array(l);
	    result[0] = array[0];
	    for (var i = 1; i < l; i++)
	        result[i] = result[i - 1] + array[i];
	    return result;
	};


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var arrayStat = __webpack_require__(135);

	// https://github.com/accord-net/framework/blob/development/Sources/Accord.Statistics/Tools.cs

	function entropy(matrix, eps) {
	    if (typeof(eps) === 'undefined') {
	        eps = 0;
	    }
	    var sum = 0,
	        l1 = matrix.length,
	        l2 = matrix[0].length;
	    for (var i = 0; i < l1; i++) {
	        for (var j = 0; j < l2; j++) {
	            sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
	        }
	    }
	    return -sum;
	}

	function mean(matrix, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        theMean, N, i, j;

	    if (dimension === -1) {
	        theMean = [0];
	        N = rows * cols;
	        for (i = 0; i < rows; i++) {
	            for (j = 0; j < cols; j++) {
	                theMean[0] += matrix[i][j];
	            }
	        }
	        theMean[0] /= N;
	    } else if (dimension === 0) {
	        theMean = new Array(cols);
	        N = rows;
	        for (j = 0; j < cols; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < rows; i++) {
	                theMean[j] += matrix[i][j];
	            }
	            theMean[j] /= N;
	        }
	    } else if (dimension === 1) {
	        theMean = new Array(rows);
	        N = cols;
	        for (j = 0; j < rows; j++) {
	            theMean[j] = 0;
	            for (i = 0; i < cols; i++) {
	                theMean[j] += matrix[j][i];
	            }
	            theMean[j] /= N;
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }
	    return theMean;
	}

	function standardDeviation(matrix, means, unbiased) {
	    var vari = variance(matrix, means, unbiased), l = vari.length;
	    for (var i = 0; i < l; i++) {
	        vari[i] = Math.sqrt(vari[i]);
	    }
	    return vari;
	}

	function variance(matrix, means, unbiased) {
	    if (typeof(unbiased) === 'undefined') {
	        unbiased = true;
	    }
	    means = means || mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum1 = 0, sum2 = 0, x = 0;
	        for (var i = 0; i < rows; i++) {
	            x = matrix[i][j] - means[j];
	            sum1 += x;
	            sum2 += x * x;
	        }
	        if (unbiased) {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / (rows - 1);
	        } else {
	            vari[j] = (sum2 - ((sum1 * sum1) / rows)) / rows;
	        }
	    }
	    return vari;
	}

	function median(matrix) {
	    var rows = matrix.length, cols = matrix[0].length;
	    var medians = new Array(cols);

	    for (var i = 0; i < cols; i++) {
	        var data = new Array(rows);
	        for (var j = 0; j < rows; j++) {
	            data[j] = matrix[j][i];
	        }
	        data.sort();
	        var N = data.length;
	        if (N % 2 === 0) {
	            medians[i] = (data[N / 2] + data[(N / 2) - 1]) * 0.5;
	        } else {
	            medians[i] = data[Math.floor(N / 2)];
	        }
	    }
	    return medians;
	}

	function mode(matrix) {
	    var rows = matrix.length,
	        cols = matrix[0].length,
	        modes = new Array(cols),
	        i, j;
	    for (i = 0; i < cols; i++) {
	        var itemCount = new Array(rows);
	        for (var k = 0; k < rows; k++) {
	            itemCount[k] = 0;
	        }
	        var itemArray = new Array(rows);
	        var count = 0;

	        for (j = 0; j < rows; j++) {
	            var index = itemArray.indexOf(matrix[j][i]);
	            if (index >= 0) {
	                itemCount[index]++;
	            } else {
	                itemArray[count] = matrix[j][i];
	                itemCount[count] = 1;
	                count++;
	            }
	        }

	        var maxValue = 0, maxIndex = 0;
	        for (j = 0; j < count; j++) {
	            if (itemCount[j] > maxValue) {
	                maxValue = itemCount[j];
	                maxIndex = j;
	            }
	        }

	        modes[i] = itemArray[maxIndex];
	    }
	    return modes;
	}

	function skewness(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, l = means.length;
	    var skew = new Array(l);

	    for (var j = 0; j < l; j++) {
	        var s2 = 0, s3 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s3 += dev * dev * dev;
	        }

	        var m2 = s2 / n;
	        var m3 = s3 / n;
	        var g = m3 / Math.pow(m2, 3 / 2);

	        if (unbiased) {
	            var a = Math.sqrt(n * (n - 1));
	            var b = n - 2;
	            skew[j] = (a / b) * g;
	        } else {
	            skew[j] = g;
	        }
	    }
	    return skew;
	}

	function kurtosis(matrix, unbiased) {
	    if (typeof(unbiased) === 'undefined') unbiased = true;
	    var means = mean(matrix);
	    var n = matrix.length, m = matrix[0].length;
	    var kurt = new Array(m);

	    for (var j = 0; j < m; j++) {
	        var s2 = 0, s4 = 0;
	        for (var i = 0; i < n; i++) {
	            var dev = matrix[i][j] - means[j];
	            s2 += dev * dev;
	            s4 += dev * dev * dev * dev;
	        }
	        var m2 = s2 / n;
	        var m4 = s4 / n;

	        if (unbiased) {
	            var v = s2 / (n - 1);
	            var a = (n * (n + 1)) / ((n - 1) * (n - 2) * (n - 3));
	            var b = s4 / (v * v);
	            var c = ((n - 1) * (n - 1)) / ((n - 2) * (n - 3));
	            kurt[j] = a * b - 3 * c;
	        } else {
	            kurt[j] = m4 / (m2 * m2) - 3;
	        }
	    }
	    return kurt;
	}

	function standardError(matrix) {
	    var samples = matrix.length;
	    var standardDeviations = standardDeviation(matrix), l = standardDeviations.length;
	    var standardErrors = new Array(l);
	    var sqrtN = Math.sqrt(samples);

	    for (var i = 0; i < l; i++) {
	        standardErrors[i] = standardDeviations[i] / sqrtN;
	    }
	    return standardErrors;
	}

	function covariance(matrix, dimension) {
	    return scatter(matrix, undefined, dimension);
	}

	function scatter(matrix, divisor, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    if (typeof(divisor) === 'undefined') {
	        if (dimension === 0) {
	            divisor = matrix.length - 1;
	        } else if (dimension === 1) {
	            divisor = matrix[0].length - 1;
	        }
	    }
	    var means = mean(matrix, dimension),
	        rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, s, k;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                s /= divisor;
	                cov[i][j] = s;
	                cov[j][i] = s;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	function correlation(matrix) {
	    var means = mean(matrix),
	        standardDeviations = standardDeviation(matrix, true, means),
	        scores = zScores(matrix, means, standardDeviations),
	        rows = matrix.length,
	        cols = matrix[0].length,
	        i, j;

	    var cor = new Array(cols);
	    for (i = 0; i < cols; i++) {
	        cor[i] = new Array(cols);
	    }
	    for (i = 0; i < cols; i++) {
	        for (j = i; j < cols; j++) {
	            var c = 0;
	            for (var k = 0, l = scores.length; k < l; k++) {
	                c += scores[k][j] * scores[k][i];
	            }
	            c /= rows - 1;
	            cor[i][j] = c;
	            cor[j][i] = c;
	        }
	    }
	    return cor;
	}

	function zScores(matrix, means, standardDeviations) {
	    means = means || mean(matrix);
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix, true, means);
	    return standardize(center(matrix, means, false), standardDeviations, true);
	}

	function center(matrix, means, inPlace) {
	    means = means || mean(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var row = result[i];
	        for (j = 0, jj = row.length; j < jj; j++) {
	            row[j] = matrix[i][j] - means[j];
	        }
	    }
	    return result;
	}

	function standardize(matrix, standardDeviations, inPlace) {
	    if (typeof(standardDeviations) === 'undefined') standardDeviations = standardDeviation(matrix);
	    var result = matrix,
	        l = matrix.length,
	        i, j, jj;

	    if (!inPlace) {
	        result = new Array(l);
	        for (i = 0; i < l; i++) {
	            result[i] = new Array(matrix[i].length);
	        }
	    }

	    for (i = 0; i < l; i++) {
	        var resultRow = result[i];
	        var sourceRow = matrix[i];
	        for (j = 0, jj = resultRow.length; j < jj; j++) {
	            if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
	                resultRow[j] = sourceRow[j] / standardDeviations[j];
	            }
	        }
	    }
	    return result;
	}

	function weightedVariance(matrix, weights) {
	    var means = mean(matrix);
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length;
	    var vari = new Array(cols);

	    for (var j = 0; j < cols; j++) {
	        var sum = 0;
	        var a = 0, b = 0;

	        for (var i = 0; i < rows; i++) {
	            var z = matrix[i][j] - means[j];
	            var w = weights[i];

	            sum += w * (z * z);
	            b += w;
	            a += w * w;
	        }

	        vari[j] = sum * (b / (b * b - a));
	    }

	    return vari;
	}

	function weightedMean(matrix, weights, dimension) {
	    if (typeof(dimension) === 'undefined') {
	        dimension = 0;
	    }
	    var rows = matrix.length;
	    if (rows === 0) return [];
	    var cols = matrix[0].length,
	        means, i, ii, j, w, row;

	    if (dimension === 0) {
	        means = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            means[i] = 0;
	        }
	        for (i = 0; i < rows; i++) {
	            row = matrix[i];
	            w = weights[i];
	            for (j = 0; j < cols; j++) {
	                means[j] += row[j] * w;
	            }
	        }
	    } else if (dimension === 1) {
	        means = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            means[i] = 0;
	        }
	        for (j = 0; j < rows; j++) {
	            row = matrix[j];
	            w = weights[j];
	            for (i = 0; i < cols; i++) {
	                means[j] += row[i] * w;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    var weightSum = arrayStat.sum(weights);
	    if (weightSum !== 0) {
	        for (i = 0, ii = means.length; i < ii; i++) {
	            means[i] /= weightSum;
	        }
	    }
	    return means;
	}

	function weightedCovariance(matrix, weights, means, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    var s1 = 0, s2 = 0;
	    for (var i = 0, ii = weights.length; i < ii; i++) {
	        s1 += weights[i];
	        s2 += weights[i] * weights[i];
	    }
	    var factor = s1 / (s1 * s1 - s2);
	    return weightedScatter(matrix, weights, means, factor, dimension);
	}

	function weightedScatter(matrix, weights, means, factor, dimension) {
	    dimension = dimension || 0;
	    means = means || weightedMean(matrix, weights, dimension);
	    if (typeof(factor) === 'undefined') {
	        factor = 1;
	    }
	    var rows = matrix.length;
	    if (rows === 0) {
	        return [[]];
	    }
	    var cols = matrix[0].length,
	        cov, i, j, k, s;

	    if (dimension === 0) {
	        cov = new Array(cols);
	        for (i = 0; i < cols; i++) {
	            cov[i] = new Array(cols);
	        }
	        for (i = 0; i < cols; i++) {
	            for (j = i; j < cols; j++) {
	                s = 0;
	                for (k = 0; k < rows; k++) {
	                    s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else if (dimension === 1) {
	        cov = new Array(rows);
	        for (i = 0; i < rows; i++) {
	            cov[i] = new Array(rows);
	        }
	        for (i = 0; i < rows; i++) {
	            for (j = i; j < rows; j++) {
	                s = 0;
	                for (k = 0; k < cols; k++) {
	                    s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
	                }
	                cov[i][j] = s * factor;
	                cov[j][i] = s * factor;
	            }
	        }
	    } else {
	        throw new Error('Invalid dimension');
	    }

	    return cov;
	}

	module.exports = {
	    entropy: entropy,
	    mean: mean,
	    standardDeviation: standardDeviation,
	    variance: variance,
	    median: median,
	    mode: mode,
	    skewness: skewness,
	    kurtosis: kurtosis,
	    standardError: standardError,
	    covariance: covariance,
	    scatter: scatter,
	    correlation: correlation,
	    zScores: zScores,
	    center: center,
	    standardize: standardize,
	    weightedVariance: weightedVariance,
	    weightedMean: weightedMean,
	    weightedCovariance: weightedCovariance,
	    weightedScatter: weightedScatter
	};


/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = exports = __webpack_require__(138);
	exports.Utils = __webpack_require__(139);
	exports.OPLS = __webpack_require__(140);


/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(14);
	var Utils = __webpack_require__(139);

	class PLS {
	    constructor(X, Y) {
	        if (X === true) {
	            const model = Y;
	            this.meanX = model.meanX;
	            this.stdDevX = model.stdDevX;
	            this.meanY = model.meanY;
	            this.stdDevY = model.stdDevY;
	            this.PBQ = Matrix.checkMatrix(model.PBQ);
	            this.R2X = model.R2X;
	        } else {
	            if (X.length !== Y.length)
	                throw new RangeError('The number of X rows must be equal to the number of Y rows');

	            const resultX = Utils.featureNormalize(X);
	            this.X = resultX.result;
	            this.meanX = resultX.means;
	            this.stdDevX = resultX.std;

	            const resultY = Utils.featureNormalize(Y);
	            this.Y = resultY.result;
	            this.meanY = resultY.means;
	            this.stdDevY = resultY.std;
	        }
	    }

	    /**
	     * Fits the model with the given data and predictions, in this function is calculated the
	     * following outputs:
	     *
	     * T - Score matrix of X
	     * P - Loading matrix of X
	     * U - Score matrix of Y
	     * Q - Loading matrix of Y
	     * B - Matrix of regression coefficient
	     * W - Weight matrix of X
	     *
	     * @param {Object} options - recieves the latentVectors and the tolerance of each step of the PLS
	     */
	    train(options) {
	        if(options === undefined) options = {};

	        var latentVectors = options.latentVectors;
	        if (latentVectors === undefined) {
	            latentVectors = Math.min(this.X.length - 1, this.X[0].length);
	        }

	        var tolerance = options.tolerance;
	        if (tolerance === undefined) {
	            tolerance = 1e-5;
	        }
	        
	        var X = this.X;
	        var Y = this.Y;

	        var rx = X.rows;
	        var cx = X.columns;
	        var ry = Y.rows;
	        var cy = Y.columns;

	        var ssqXcal = X.clone().mul(X).sum(); // for the r²
	        var sumOfSquaresY = Y.clone().mul(Y).sum();

	        var n = latentVectors; //Math.max(cx, cy); // components of the pls
	        var T = Matrix.zeros(rx, n);
	        var P = Matrix.zeros(cx, n);
	        var U = Matrix.zeros(ry, n);
	        var Q = Matrix.zeros(cy, n);
	        var B = Matrix.zeros(n, n);
	        var W = P.clone();
	        var k = 0;

	        while(Utils.norm(Y) > tolerance && k < n) {
	            var transposeX = X.transpose();
	            var transposeY = Y.transpose();

	            var tIndex = maxSumColIndex(X.clone().mulM(X));
	            var uIndex = maxSumColIndex(Y.clone().mulM(Y));

	            var t1 = X.getColumnVector(tIndex);
	            var u = Y.getColumnVector(uIndex);
	            var t = Matrix.zeros(rx, 1);

	            while(Utils.norm(t1.clone().sub(t)) > tolerance) {
	                var w = transposeX.mmul(u);
	                w.div(Utils.norm(w));
	                t = t1;
	                t1 = X.mmul(w);
	                var q = transposeY.mmul(t1);
	                q.div(Utils.norm(q));
	                u = Y.mmul(q);
	            }

	            t = t1;
	            var num = transposeX.mmul(t);
	            var den = (t.transpose().mmul(t))[0][0];
	            var p = num.div(den);
	            var pnorm = Utils.norm(p);
	            p.div(pnorm);
	            t.mul(pnorm);
	            w.mul(pnorm);

	            num = u.transpose().mmul(t);
	            den = (t.transpose().mmul(t))[0][0];
	            var b = (num.div(den))[0][0];
	            X.sub(t.mmul(p.transpose()));
	            Y.sub(t.clone().mul(b).mmul(q.transpose()));

	            T.setColumn(k, t);
	            P.setColumn(k, p);
	            U.setColumn(k, u);
	            Q.setColumn(k, q);
	            W.setColumn(k, w);

	            B[k][k] = b;
	            k++;
	        }

	        k--;
	        T = T.subMatrix(0, T.rows - 1, 0, k);
	        P = P.subMatrix(0, P.rows - 1, 0, k);
	        U = U.subMatrix(0, U.rows - 1, 0, k);
	        Q = Q.subMatrix(0, Q.rows - 1, 0, k);
	        W = W.subMatrix(0, W.rows - 1, 0, k);
	        B = B.subMatrix(0, k, 0, k);

	        // TODO: review of R2Y
	        //this.R2Y = t.transpose().mmul(t).mul(q[k][0]*q[k][0]).divS(ssqYcal)[0][0];

	        this.ssqYcal = sumOfSquaresY;
	        this.E = X;
	        this.F = Y;
	        this.T = T;
	        this.P = P;
	        this.U = U;
	        this.Q = Q;
	        this.W = W;
	        this.B = B;
	        this.PBQ = P.mmul(B).mmul(Q.transpose());
	        this.R2X = t.transpose().mmul(t).mmul(p.transpose().mmul(p)).div(ssqXcal)[0][0];
	    }

	    /**
	     * Predicts the behavior of the given dataset.
	     * @param dataset - data to be predicted.
	     * @returns {Matrix} - predictions of each element of the dataset.
	     */
	    predict(dataset) {
	        var X = Matrix.checkMatrix(dataset);
	        X = X.subRowVector(this.meanX).divRowVector(this.stdDevX);
	        var Y = X.mmul(this.PBQ);
	        Y = Y.mulRowVector(this.stdDevY).addRowVector(this.meanY);
	        return Y;
	    }

	    /**
	     * Returns the explained variance on training of the PLS model
	     * @return {number}
	     */
	    getExplainedVariance() {
	        return this.R2X;
	    }
	    
	    toJSON() {
	        return {
	            name: 'PLS',
	            R2X: this.R2X,
	            meanX: this.meanX,
	            stdDevX: this.stdDevX,
	            meanY: this.meanY,
	            stdDevY: this.stdDevY,
	            PBQ: this.PBQ,
	        };
	    }

	    /**
	     * Load a PLS model from a JSON Object
	     * @param model
	     * @return {PLS} - PLS object from the given model
	     */
	    static load(model) {
	        if (model.name !== 'PLS')
	            throw new RangeError('Invalid model: ' + model.name);
	        return new PLS(true, model);
	    }
	}

	module.exports = PLS;

	/**
	 * Retrieves the sum at the column of the given matrix.
	 * @param matrix
	 * @param column
	 * @returns {number}
	 */
	function getColSum(matrix, column) {
	    var sum = 0;
	    for (var i = 0; i < matrix.rows; i++) {
	        sum += matrix[i][column];
	    }
	    return sum;
	}

	/**
	 * Function that returns the index where the sum of each
	 * column vector is maximum.
	 * @param {Matrix} data
	 * @returns {number} index of the maximum
	 */
	function maxSumColIndex(data) {
	    var maxIndex = 0;
	    var maxSum = -Infinity;
	    for(var i = 0; i < data.columns; ++i) {
	        var currentSum = getColSum(data, i);
	        if(currentSum > maxSum) {
	            maxSum = currentSum;
	            maxIndex = i;
	        }
	    }
	    return maxIndex;
	}


/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const Matrix = __webpack_require__(14);
	const Stat = __webpack_require__(5);

	/**
	 * Function that given vector, returns his norm
	 * @param {Vector} X
	 * @returns {number} Norm of the vector
	 */
	function norm(X) {
	    return Math.sqrt(X.clone().apply(pow2array).sum());
	}

	/**
	 * Function that pow 2 each element of a Matrix or a Vector,
	 * used in the apply method of the Matrix object
	 * @param i - index i.
	 * @param j - index j.
	 * @return The Matrix object modified at the index i, j.
	 * */
	function pow2array(i, j) {
	    this[i][j] = this[i][j] * this[i][j];
	    return this;
	}

	/**
	 * Function that normalize the dataset and return the means and
	 * standard deviation of each feature.
	 * @param dataset
	 * @returns {{result: Matrix, means: (*|number), std: Matrix}} dataset normalized, means
	 *                                                             and standard deviations
	 */
	function featureNormalize(dataset) {
	    var means = Stat.matrix.mean(dataset);
	    var std = Stat.matrix.standardDeviation(dataset, means, true);
	    var result = Matrix.checkMatrix(dataset).subRowVector(means);
	    return {result: result.divRowVector(std), means: means, std: std};
	}

	module.exports = {
	    norm: norm,
	    pow2array: pow2array,
	    featureNormalize: featureNormalize
	};


/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Matrix = __webpack_require__(14);
	var Utils = __webpack_require__(139);

	module.exports = OPLS;

	function OPLS(dataset, predictions, numberOSC) {
	    var X = new Matrix(dataset);
	    var y = new Matrix(predictions);

	    X = Utils.featureNormalize(X).result;
	    y = Utils.featureNormalize(y).result;

	    var rows = X.rows;
	    var columns = X.columns;

	    var sumOfSquaresX = X.clone().mul(X).sum();
	    var w = X.transpose().mmul(y);
	    w.div(Utils.norm(w));

	    var orthoW = new Array(numberOSC);
	    var orthoT = new Array(numberOSC);
	    var orthoP = new Array(numberOSC);
	    for (var i = 0; i < numberOSC; i++) {
	        var t = X.mmul(w);

	        var numerator = X.transpose().mmul(t);
	        var denominator = t.transpose().mmul(t)[0][0];
	        var p =  numerator.div(denominator);

	        numerator = w.transpose().mmul(p)[0][0];
	        denominator = w.transpose().mmul(w)[0][0];
	        var wOsc = p.sub(w.clone().mul(numerator / denominator));
	        wOsc.div(Utils.norm(wOsc));

	        var tOsc = X.mmul(wOsc);

	        numerator = X.transpose().mmul(tOsc);
	        denominator = tOsc.transpose().mmul(tOsc)[0][0];
	        var pOsc = numerator.div(denominator);

	        X.sub(tOsc.mmul(pOsc.transpose()));
	        orthoW[i] = wOsc.getColumn(0);
	        orthoT[i] = tOsc.getColumn(0);
	        orthoP[i] = pOsc.getColumn(0);
	    }

	    this.Xosc = X;

	    var sumOfSquaresXosx = this.Xosc.clone().mul(this.Xosc).sum();
	    this.R2X = 1 - sumOfSquaresXosx/sumOfSquaresX;

	    this.W = orthoW;
	    this.T = orthoT;
	    this.P = orthoP;
	    this.numberOSC = numberOSC;
	}

	OPLS.prototype.correctDataset = function (dataset) {
	    var X = new Matrix(dataset);

	    var sumOfSquaresX = X.clone().mul(X).sum();
	    for (var i = 0; i < this.numberOSC; i++) {
	        var currentW = this.W.getColumnVector(i);
	        var currentP = this.P.getColumnVector(i);

	        var t = X.mmul(currentW);
	        X.sub(t.mmul(currentP));
	    }
	    var sumOfSquaresXosx = X.clone().mul(X).sum();

	    var R2X = 1 - sumOfSquaresXosx / sumOfSquaresX;

	    return {
	        datasetOsc: X,
	        R2Dataset: R2X
	    };
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(142);

/***/ },
/* 142 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Calculates the squared distance between two vectors
	 * @param {Array<number>} vec1 - the x vector
	 * @param {Array<number>} vec2 - the y vector
	 * @returns {number} sum - the calculated distance
	 */
	function squaredDistance(vec1, vec2) {
	    var sum = 0;
	    var dim = vec1.length;
	    for (var i = 0; i < dim; i++)
	        sum += (vec1[i] - vec2[i]) * (vec1[i] - vec2[i]);
	    return sum;
	}

	/**
	 * Calculates the sum of squared errors
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @param {Array <number>} clusterID - the cluster identifier for each data dot
	 * @returns {number} the sum of squared errors
	 */
	function computeSSE(data, centers, clusterID) {
	    var sse = 0;
	    var nData = data.length;
	    var c = 0;
	    for (var i = 0; i < nData;i++) {
	        c = clusterID[i];
	        sse += squaredDistance(data[i], centers[c]);
	    }
	    return sse;
	}

	/**
	 * Updates the cluster identifier based in the new data
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @returns {Array} the cluster identifier for each data dot
	 */
	function updateClusterID (data, centers) {
	    var nData = data.length;
	    var k = centers.length;
	    var aux = 0;
	    var clusterID = new Array(nData);
	    for (var i = 0; i < nData; i++)
	        clusterID[i] = 0;
	    var d = new Array(nData);
	    for (var i = 0; i < nData; i++) {
	        d[i] = new Array(k);
	        for (var j = 0; j < k; j++) {
	            aux = squaredDistance(data[i], centers[j]);
	            d[i][j] = new Array(2);
	            d[i][j][0] = aux;
	            d[i][j][1] = j;
	        }
	        var min = d[i][0][0];
	        var id = 0;
	        for (var j = 0; j < k; j++)
	            if (d[i][j][0] < min) {
	                min  = d[i][j][0];
	                id = d[i][j][1];
	            }
	        clusterID[i] = id;
	    }
	    return clusterID;
	}

	/**
	 * Update the center values based in the new configurations of the clusters
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <number>} clusterID - the cluster identifier for each data dot
	 * @param K - number of clusters
	 * @returns {Array} he K centers in format (x,y)
	 */
	function updateCenters(data, clusterID, K) {
	    var nDim = data[0].length;
	    var nData = data.length;
	    var centers = new Array(K);
	    for (var i = 0; i < K; i++) {
	        centers[i] = new Array(nDim);
	        for (var j = 0; j < nDim; j++)
	            centers[i][j] = 0;
	    }

	    for (var k = 0; k < K; k++) {
	        var cluster = [];
	        for (var i = 0; i < nData;i++)
	            if (clusterID[i] == k)
	                cluster.push(data[i]);
	        for (var d = 0; d < nDim; d++) {
	            var x = [];
	            for (var i = 0; i < nData; i++)
	                if (clusterID[i] == k)
	                    x.push(data[i][d]);
	            var sum = 0;
	            var l = x.length;
	            for (var i = 0; i < l; i++)
	                sum += x[i];
	            centers[k][d] = sum / l;
	        }
	    }
	    return centers;
	}

	/**
	 * K-means algorithm
	 * @param {Array <Array <number>>} data - the (x,y) points to cluster
	 * @param {Array <Array <number>>} centers - the K centers in format (x,y)
	 * @param {Object} props - properties
	 * @param {number} maxIter - maximum of iterations allowed
	 * @param {number} tol - the error tolerance
	 * @param {boolean} withIter - store clusters and centroids for each iteration
	 * @returns {Object} the cluster identifier for each data dot and centroids
	 */
	function kmeans(data, centers, props) {
	    var maxIter, tol, withIter;
	    if (typeof props === "undefined") {
	        maxIter = 100;
	        tol = 1e-6;
	        withIter = false;
	    } else {
	        maxIter = (typeof props.maxIter === "undefined") ? 100 : props.maxIter;
	        tol = (typeof props.tol === "undefined") ? 1e-6 : props.tol;
	        withIter = (typeof props.withIter === "undefined") ? false : props.withIter;
	    }

	    var nData = data.length;
	    if (nData == 0) {
	        return [];
	    }
	    var K = centers.length;
	    var clusterID = new Array(nData);
	    for (var i = 0; i < nData; i++)
	        clusterID[i] = 0;
	    if (K >= nData) {
	        for (var i = 0; i < nData; i++)
	            clusterID[i] = i;
	        return clusterID;
	    }
	    var lastDistance;
	    lastDistance = 1e100;
	    var curDistance = 0;
	    var iterations = [];
	    for (var iter = 0; iter < maxIter; iter++) {
	        clusterID = updateClusterID(data, centers);
	        centers = updateCenters(data, clusterID, K);
	        curDistance = computeSSE(data, centers, clusterID);
	        if (withIter) {
	            iterations.push({
	                "clusters": clusterID,
	                "centroids": centers
	            });
	        }

	        if ((lastDistance - curDistance < tol) || ((lastDistance - curDistance)/lastDistance < tol)) {
	            if (withIter) {
	                return {
	                    "clusters": clusterID,
	                    "centroids": centers,
	                    "iterations": iterations
	                };
	            } else {
	                return {
	                    "clusters": clusterID,
	                    "centroids": centers
	                };
	            }
	        }
	        lastDistance = curDistance;
	    }
	    if (withIter) {
	        return {
	            "clusters": clusterID,
	            "centroids": centers,
	            "iterations": iterations
	        };
	    } else {
	        return {
	            "clusters": clusterID,
	            "centroids": centers
	        };
	    }
	}

	module.exports = kmeans;


/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	exports.agnes = __webpack_require__(144);
	exports.diana = __webpack_require__(152);
	//exports.birch = require('./birch');
	//exports.cure = require('./cure');
	//exports.chameleon = require('./chameleon');

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var euclidean = __webpack_require__(145);
	var ClusterLeaf = __webpack_require__(146);
	var Cluster = __webpack_require__(147);

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function simpleLink(cluster1, cluster2, disFun) {
	    var m = 10e100;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.min(d,m);
	        }
	    return m;
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function completeLink(cluster1, cluster2, disFun) {
	    var m = -1;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.max(d,m);
	        }
	    return m;
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function averageLink(cluster1, cluster2, disFun) {
	    var m = 0;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = 0; j < cluster2.length; j++)
	            m += disFun(cluster1[i], cluster2[j]);
	    return m / (cluster1.length * cluster2.length);
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {*}
	 */
	function centroidLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2]);
	}

	/**
	 * @param cluster1
	 * @param cluster2
	 * @param disFun
	 * @returns {number}
	 */
	function wardLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2])*cluster1.length*cluster2.length / (cluster1.length+cluster2.length);
	}

	var defaultOptions = {
	    disFunc: euclidean,
	    kind: 'single'
	};

	/**
	 * Continuously merge nodes that have the least dissimilarity
	 * @param {Array <Array <number>>} data - Array of points to be clustered
	 * @param {json} options
	 * @constructor
	 */
	function agnes(data, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!(options.hasOwnProperty(o)))
	            options[o] = defaultOptions[o];
	    var len = data.length;

	    // allows to use a string or a given function
	    if (typeof options.kind === "string") {
	        switch (options.kind) {
	            case 'single':
	                options.kind = simpleLink;
	                break;
	            case 'complete':
	                options.kind = completeLink;
	                break;
	            case 'average':
	                options.kind = averageLink;
	                break;
	            case 'centroid':
	                options.kind = centroidLink;
	                break;
	            case 'ward':
	                options.kind = wardLink;
	                break;
	            default:
	                throw new RangeError('Unknown kind of similarity');
	        }
	    }
	    else if (typeof options.kind !== "function")
	        throw new TypeError('Undefined kind of similarity');

	    var list = new Array(len);
	    for (var i = 0; i < data.length; i++)
	        list[i] = new ClusterLeaf(i);
	    var min  = 10e5,
	        d = {},
	        dis = 0;

	    while (list.length > 1) {

	        // calculates the minimum distance
	        d = {};
	        min = 10e5;
	        for (var j = 0; j < list.length; j++)
	            for (var k = j + 1; k < list.length; k++) {
	                var fData, sData;
	                if (list[j] instanceof ClusterLeaf)
	                    fData = [data[list[j].index]];
	                else {
	                    fData = new Array(list[j].index.length);
	                    for (var e = 0; e < fData.length; e++)
	                        fData[e] = data[list[j].index[e].index];
	                }
	                if (list[k] instanceof ClusterLeaf)
	                    sData = [data[list[k].index]];
	                else {
	                    sData = new Array(list[k].index.length);
	                    for (var f = 0; f < sData.length; f++)
	                        sData[f] = data[list[k].index[f].index];
	                }
	                dis = options.kind(fData, sData, options.disFunc).toFixed(4);
	                if (dis in d) {
	                    d[dis].push([list[j], list[k]]);
	                }
	                else {
	                    d[dis] = [[list[j], list[k]]];
	                }
	                min = Math.min(dis, min);
	            }

	        // cluster dots
	        var dmin = d[min.toFixed(4)];
	        var clustered = new Array(dmin.length);
	        var aux,
	            count = 0;
	        while (dmin.length > 0) {
	            aux = dmin.shift();
	            for (var q = 0; q < dmin.length; q++) {
	                var int = dmin[q].filter(function(n) {
	                    //noinspection JSReferencingMutableVariableFromClosure
	                    return aux.indexOf(n) !== -1
	                });
	                if (int.length > 0) {
	                    var diff = dmin[q].filter(function(n) {
	                        //noinspection JSReferencingMutableVariableFromClosure
	                        return aux.indexOf(n) === -1
	                    });
	                    aux = aux.concat(diff);
	                    dmin.splice(q-- ,1);
	                }
	            }
	            clustered[count++] = aux;
	        }
	        clustered.length = count;

	        for (var ii = 0; ii < clustered.length; ii++) {
	            var obj = new Cluster();
	            obj.children = clustered[ii].concat();
	            obj.distance = min;
	            obj.index = new Array(len);
	            var indCount = 0;
	            for (var jj = 0; jj < clustered[ii].length; jj++) {
	                if (clustered[ii][jj] instanceof ClusterLeaf)
	                    obj.index[indCount++] = clustered[ii][jj];
	                else {
	                    indCount += clustered[ii][jj].index.length;
	                    obj.index = clustered[ii][jj].index.concat(obj.index);
	                }
	                list.splice((list.indexOf(clustered[ii][jj])), 1);
	            }
	            obj.index.length = indCount;
	            list.push(obj);
	        }
	    }
	    return list[0];
	}

	module.exports = agnes;

/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';

	function squaredEuclidean(p, q) {
	    var d = 0;
	    for (var i = 0; i < p.length; i++) {
	        d += (p[i] - q[i]) * (p[i] - q[i]);
	    }
	    return d;
	}

	function euclidean(p, q) {
	    return Math.sqrt(squaredEuclidean(p, q));
	}

	module.exports = euclidean;
	euclidean.squared = squaredEuclidean;


/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Cluster = __webpack_require__(147);
	var util = __webpack_require__(148);

	function ClusterLeaf (index) {
	    Cluster.call(this);
	    this.index = index;
	    this.distance = 0;
	    this.children = undefined;
	}

	util.inherits(ClusterLeaf, Cluster);

	module.exports = ClusterLeaf;


/***/ },
/* 147 */
/***/ function(module, exports) {

	'use strict';

	function Cluster () {
	    this.children = [];
	    this.distance = -1;
	    this.index = [];
	}

	/**
	 * Creates an array of values where maximum distance smaller than the threshold
	 * @param {number} threshold
	 * @return {Array <Cluster>}
	 */
	Cluster.prototype.cut = function (threshold) {
	    if (threshold < 0) throw new RangeError('Threshold too small');
	    var root = new Cluster();
	    root.children = this.children;
	    root.distance = this.distance;
	    root.index = this.index;
	    var list = [root];
	    var ans = [];
	    while (list.length > 0) {
	        var aux = list.shift();
	        if (threshold >= aux.distance)
	            ans.push(aux);
	        else
	            list = list.concat(aux.children);
	    }
	    return ans;
	};

	/**
	 * Merge the leaves in the minimum way to have 'minGroups' number of clusters
	 * @param {number} minGroups
	 * @return {Cluster}
	 */
	Cluster.prototype.group = function (minGroups) {
	    if (minGroups < 1) throw new RangeError('Number of groups too small');
	    var root = new Cluster();
	    root.children = this.children;
	    root.distance = this.distance;
	    root.index = this.index;
	    if (minGroups === 1)
	        return root;
	    var list = [root];
	    var aux;
	    while (list.length < minGroups && list.length !== 0) {
	        aux = list.shift();
	        list = list.concat(aux.children);
	    }
	    if (list.length === 0) throw new RangeError('Number of groups too big');
	    for (var i = 0; i < list.length; i++)
	        if (list[i].distance === aux.distance) {
	            list.concat(list[i].children.slice(1));
	            list[i] = list[i].children[0];
	        }
	    for (var j = 0; j < list.length; j++)
	        if (list[j].distance !== 0) {
	            var obj = list[j];
	            obj.children = obj.index;
	        }
	    return root;
	};

	module.exports = Cluster;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(150);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(151);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(149)))

/***/ },
/* 149 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 150 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 151 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var euclidean = __webpack_require__(145);
	var ClusterLeaf = __webpack_require__(146);
	var Cluster = __webpack_require__(147);

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function simpleLink(cluster1, cluster2, disFun) {
	    var m = 10e100;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.min(d,m);
	        }
	    return m;
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function completeLink(cluster1, cluster2, disFun) {
	    var m = -1;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = i; j < cluster2.length; j++) {
	            var d = disFun(cluster1[i], cluster2[j]);
	            m = Math.max(d,m);
	        }
	    return m;
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function averageLink(cluster1, cluster2, disFun) {
	    var m = 0;
	    for (var i = 0; i < cluster1.length; i++)
	        for (var j = 0; j < cluster2.length; j++)
	            m += disFun(cluster1[i], cluster2[j]);
	    return m / (cluster1.length * cluster2.length);
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function centroidLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2]);
	}

	/**
	 * @param {Array <Array <number>>} cluster1
	 * @param {Array <Array <number>>} cluster2
	 * @param {function} disFun
	 * @returns {number}
	 */
	function wardLink(cluster1, cluster2, disFun) {
	    var x1 = 0,
	        y1 = 0,
	        x2 = 0,
	        y2 = 0;
	    for (var i = 0; i < cluster1.length; i++) {
	        x1 += cluster1[i][0];
	        y1 += cluster1[i][1];
	    }
	    for (var j = 0; j < cluster2.length; j++) {
	        x2 += cluster2[j][0];
	        y2 += cluster2[j][1];
	    }
	    x1 /= cluster1.length;
	    y1 /= cluster1.length;
	    x2 /= cluster2.length;
	    y2 /= cluster2.length;
	    return disFun([x1,y1], [x2,y2])*cluster1.length*cluster2.length / (cluster1.length+cluster2.length);
	}

	/**
	 * Returns the most distant point and his distance
	 * @param {Array <Array <number>>} splitting - Clusters to split
	 * @param {Array <Array <number>>} data - Original data
	 * @param {function} disFun - Distance function
	 * @returns {{d: number, p: number}} - d: maximum difference between points, p: the point more distant
	 */
	function diff(splitting, data, disFun) {
	    var ans = {
	        d:0,
	        p:0
	    };

	    var Ci = new Array(splitting[0].length);
	    for (var e = 0; e < splitting[0].length; e++)
	        Ci[e] = data[splitting[0][e]];
	    var Cj = new Array(splitting[1].length);
	    for (var f = 0; f < splitting[1].length; f++)
	        Cj[f] = data[splitting[1][f]];

	    var dist, ndist;
	    for (var i = 0; i < Ci.length; i++) {
	        dist = 0;
	        for (var j = 0; j < Ci.length; j++)
	            if (i !== j)
	                dist += disFun(Ci[i], Ci[j]);
	        dist /= (Ci.length - 1);
	        ndist = 0;
	        for (var k = 0; k < Cj.length; k++)
	            ndist += disFun(Ci[i], Cj[k]);
	        ndist /= Cj.length;
	        if ((dist - ndist) > ans.d) {
	            ans.d = (dist - ndist);
	            ans.p = i;
	        }
	    }
	    return ans;
	}

	var defaultOptions = {
	    dist: euclidean,
	    kind: 'single'
	};

	/**
	 * Intra-cluster distance
	 * @param {Array} index
	 * @param {Array} data
	 * @param {function} disFun
	 * @returns {number}
	 */
	function intrDist(index, data, disFun) {
	    var dist = 0,
	        count = 0;
	    for (var i = 0; i < index.length; i++)
	        for (var j = i; j < index.length; j++) {
	            dist += disFun(data[index[i].index], data[index[j].index]);
	            count++
	        }
	    return dist / count;
	}

	/**
	 * Splits the higher level clusters
	 * @param {Array <Array <number>>} data - Array of points to be clustered
	 * @param {json} options
	 * @constructor
	 */
	function diana(data, options) {
	    options = options || {};
	    for (var o in defaultOptions)
	        if (!(options.hasOwnProperty(o)))
	            options[o] = defaultOptions[o];
	    if (typeof options.kind === "string") {
	        switch (options.kind) {
	            case 'single':
	                options.kind = simpleLink;
	                break;
	            case 'complete':
	                options.kind = completeLink;
	                break;
	            case 'average':
	                options.kind = averageLink;
	                break;
	            case 'centroid':
	                options.kind = centroidLink;
	                break;
	            case 'ward':
	                options.kind = wardLink;
	                break;
	            default:
	                throw new RangeError('Unknown kind of similarity');
	        }
	    }
	    else if (typeof options.kind !== "function")
	        throw new TypeError('Undefined kind of similarity');
	    var tree = new Cluster();
	    tree.children = new Array(data.length);
	    tree.index = new Array(data.length);
	    for (var ind = 0; ind < data.length; ind++) {
	        tree.children[ind] = new ClusterLeaf(ind);
	        tree.index[ind] = new ClusterLeaf(ind);
	    }

	    tree.distance = intrDist(tree.index, data, options.dist);
	    var m, M, clId,
	        dist, rebel;
	    var list = [tree];
	    while (list.length > 0) {
	        M = 0;
	        clId = 0;
	        for (var i = 0; i < list.length; i++) {
	            m = 0;
	            for (var j = 0; j < list[i].length; j++) {
	                for (var l = (j + 1); l < list[i].length; l++) {
	                    m = Math.max(options.dist(data[list[i].index[j].index], data[list[i].index[l].index]), m);
	                }
	            }
	            if (m > M) {
	                M = m;
	                clId = i;
	            }
	        }
	        M = 0;
	        if (list[clId].index.length === 2) {
	            list[clId].children = [list[clId].index[0], list[clId].index[1]];
	            list[clId].distance = options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]);
	        }
	        else if (list[clId].index.length === 3) {
	            list[clId].children = [list[clId].index[0], list[clId].index[1], list[clId].index[2]];
	            var d = [
	                options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]),
	                options.dist(data[list[clId].index[1].index], data[list[clId].index[2].index])
	            ];
	            list[clId].distance = (d[0] + d[1]) / 2;
	        }
	        else {
	            var C = new Cluster();
	            var sG = new Cluster();
	            var splitting = [new Array(list[clId].index.length), []];
	            for (var spl = 0; spl < splitting[0].length; spl++)
	                splitting[0][spl] = spl;
	            for (var ii = 0; ii < splitting[0].length; ii++) {
	                dist = 0;
	                for (var jj = 0; jj < splitting[0].length; jj++)
	                    if (ii !== jj)
	                        dist += options.dist(data[list[clId].index[splitting[0][jj]].index], data[list[clId].index[splitting[0][ii]].index]);
	                dist /= (splitting[0].length - 1);
	                if (dist > M) {
	                    M = dist;
	                    rebel = ii;
	                }
	            }
	            splitting[1] = [rebel];
	            splitting[0].splice(rebel, 1);
	            dist = diff(splitting, data, options.dist);
	            while (dist.d > 0) {
	                splitting[1].push(splitting[0][dist.p]);
	                splitting[0].splice(dist.p, 1);
	                dist = diff(splitting, data, options.dist);
	            }
	            var fData = new Array(splitting[0].length);
	            C.index = new Array(splitting[0].length);
	            for (var e = 0; e < fData.length; e++) {
	                fData[e] = data[list[clId].index[splitting[0][e]].index];
	                C.index[e] = list[clId].index[splitting[0][e]];
	                C.children[e] = list[clId].index[splitting[0][e]];
	            }
	            var sData = new Array(splitting[1].length);
	            sG.index = new Array(splitting[1].length);
	            for (var f = 0; f < sData.length; f++) {
	                sData[f] = data[list[clId].index[splitting[1][f]].index];
	                sG.index[f] = list[clId].index[splitting[1][f]];
	                sG.children[f] = list[clId].index[splitting[1][f]];
	            }
	            C.distance = intrDist(C.index, data, options.dist);
	            sG.distance = intrDist(sG.index, data, options.dist);
	            list.push(C);
	            list.push(sG);
	            list[clId].children = [C, sG];
	        }
	        list.splice(clId, 1);
	    }
	    return tree;
	}

	module.exports = diana;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var NodeSquare = __webpack_require__(154),
	    NodeHexagonal = __webpack_require__(155);

	var defaultOptions = {
	    fields: 3,
	    randomizer: Math.random,
	    distance: squareEuclidean,
	    iterations: 10,
	    learningRate: 0.1,
	    gridType: 'rect',
	    torus: true,
	    method: 'random'
	};

	function SOM(x, y, options, reload) {

	    this.x = x;
	    this.y = y;

	    options = options || {};
	    this.options = {};
	    for (var i in defaultOptions) {
	        if (options.hasOwnProperty(i)) {
	            this.options[i] = options[i];
	        } else {
	            this.options[i] = defaultOptions[i];
	        }
	    }

	    if (typeof this.options.fields === 'number') {
	        this.numWeights = this.options.fields;
	    } else if (Array.isArray(this.options.fields)) {
	        this.numWeights = this.options.fields.length;
	        var converters = getConverters(this.options.fields);
	        this.extractor = converters.extractor;
	        this.creator = converters.creator;
	    } else {
	        throw new Error('Invalid fields definition');
	    }

	    if (this.options.gridType === 'rect') {
	        this.nodeType = NodeSquare;
	        this.gridDim = {
	            x: x,
	            y: y
	        };
	    } else {
	        this.nodeType = NodeHexagonal;
	        var hx = this.x - Math.floor(this.y / 2);
	        this.gridDim = {
	            x: hx,
	            y: this.y,
	            z: -(0 - hx - this.y)
	        };
	    }

	    this.torus = this.options.torus;
	    this.distanceMethod = this.torus ? 'getDistanceTorus' : 'getDistance';

	    this.distance = this.options.distance;

	    this.maxDistance = getMaxDistance(this.distance, this.numWeights);

	    if (reload === true) { // For model loading
	        this.done = true;
	        return;
	    }
	    if (!(x > 0 && y > 0)) {
	        throw new Error('x and y must be positive');
	    }

	    this.times = {
	        findBMU: 0,
	        adjust: 0
	    };

	    this.randomizer = this.options.randomizer;

	    this.iterationCount = 0;
	    this.iterations = this.options.iterations;

	    this.startLearningRate = this.learningRate = this.options.learningRate;

	    this.mapRadius = Math.floor(Math.max(x, y) / 2);

	    this.algorithmMethod = this.options.method;

	    this._initNodes();

	    this.done = false;
	}

	SOM.load = function loadModel(model, distance) {
	    if (model.name === 'SOM') {
	        var x = model.data.length,
	            y = model.data[0].length;
	        if (distance) {
	            model.options.distance = distance;
	        } else if (model.options.distance) {
	            model.options.distance = eval('(' + model.options.distance + ')');
	        }
	        var som = new SOM(x, y, model.options, true);
	        som.nodes = new Array(x);
	        for (var i = 0; i < x; i++) {
	            som.nodes[i] = new Array(y);
	            for (var j = 0; j < y; j++) {
	                som.nodes[i][j] = new som.nodeType(i, j, model.data[i][j], som);
	            }
	        }
	        return som;
	    } else {
	        throw new Error('expecting a SOM model');
	    }
	};

	SOM.prototype.export = function exportModel(includeDistance) {
	    if (!this.done) {
	        throw new Error('model is not ready yet');
	    }
	    var model = {
	        name: 'SOM'
	    };
	    model.options = {
	        fields: this.options.fields,
	        gridType: this.options.gridType,
	        torus: this.options.torus
	    };
	    model.data = new Array(this.x);
	    for (var i = 0; i < this.x; i++) {
	        model.data[i] = new Array(this.y);
	        for (var j = 0; j < this.y; j++) {
	            model.data[i][j] = this.nodes[i][j].weights;
	        }
	    }
	    if (includeDistance) {
	        model.options.distance = this.distance.toString();
	    }
	    return model;
	};

	SOM.prototype._initNodes = function initNodes() {
	    var now = Date.now(),
	        i, j, k;
	    this.nodes = new Array(this.x);
	    for (i = 0; i < this.x; i++) {
	        this.nodes[i] = new Array(this.y);
	        for (j = 0; j < this.y; j++) {
	            var weights = new Array(this.numWeights);
	            for (k = 0; k < this.numWeights; k++) {
	                weights[k] = this.randomizer();
	            }
	            this.nodes[i][j] = new this.nodeType(i, j, weights, this);
	        }
	    }
	    this.times.initNodes = Date.now() - now;
	};

	SOM.prototype.setTraining = function setTraining(trainingSet) {
	    if (this.trainingSet) {
	        throw new Error('training set has already been set');
	    }
	    var now = Date.now();
	    var convertedSet = trainingSet;
	    var i, l = trainingSet.length;
	    if (this.extractor) {
	        convertedSet = new Array(l);
	        for (i = 0; i < l; i++) {
	            convertedSet[i] = this.extractor(trainingSet[i]);
	        }
	    }
	    this.numIterations = this.iterations * l;

	    if (this.algorithmMethod === 'random') {
	        this.timeConstant = this.numIterations / Math.log(this.mapRadius);
	    } else {
	        this.timeConstant = l / Math.log(this.mapRadius);
	    }
	    this.trainingSet = convertedSet;
	    this.times.setTraining = Date.now() - now;
	};

	SOM.prototype.trainOne = function trainOne() {
	    if (this.done) {

	        return false;

	    } else if (this.numIterations-- > 0) {

	        var neighbourhoodRadius,
	            trainingValue,
	            trainingSetFactor;

	        if (this.algorithmMethod === 'random') { // Pick a random value of the training set at each step
	            neighbourhoodRadius = this.mapRadius * Math.exp(-this.iterationCount / this.timeConstant);
	            trainingValue = getRandomValue(this.trainingSet, this.randomizer);
	            this._adjust(trainingValue, neighbourhoodRadius);
	            this.learningRate = this.startLearningRate * Math.exp(-this.iterationCount / this.numIterations);
	        } else { // Get next input vector
	            trainingSetFactor = -Math.floor(this.iterationCount / this.trainingSet.length);
	            neighbourhoodRadius = this.mapRadius * Math.exp(trainingSetFactor / this.timeConstant);
	            trainingValue = this.trainingSet[this.iterationCount % this.trainingSet.length];
	            this._adjust(trainingValue, neighbourhoodRadius);
	            if (((this.iterationCount + 1) % this.trainingSet.length) === 0) {
	                this.learningRate = this.startLearningRate * Math.exp(trainingSetFactor / Math.floor(this.numIterations / this.trainingSet.length));
	            }
	        }

	        this.iterationCount++;

	        return true;

	    } else {

	        this.done = true;
	        return false;

	    }
	};

	SOM.prototype._adjust = function adjust(trainingValue, neighbourhoodRadius) {
	    var now = Date.now(),
	        x, y, dist, influence;

	    var bmu = this._findBestMatchingUnit(trainingValue);

	    var now2 = Date.now();
	    this.times.findBMU += now2 - now;

	    var radiusLimit = Math.floor(neighbourhoodRadius);
	    var xMin = bmu.x - radiusLimit,
	        xMax = bmu.x + radiusLimit,
	        yMin = bmu.y - radiusLimit,
	        yMax = bmu.y + radiusLimit;

	    for (x = xMin; x <= xMax; x++) {
	        var theX = x;
	        if (x < 0) {
	            theX += this.x;
	        } else if (x >= this.x) {
	            theX -= this.x;
	        }
	        for (y = yMin; y <= yMax; y++) {
	            var theY = y;
	            if (y < 0) {
	                theY += this.y;
	            } else if (y >= this.y) {
	                theY -= this.y;
	            }

	            dist = bmu[this.distanceMethod](this.nodes[theX][theY]);

	            if (dist < neighbourhoodRadius) {
	                influence = Math.exp(-dist / (2 * neighbourhoodRadius));
	                this.nodes[theX][theY].adjustWeights(trainingValue, this.learningRate, influence);
	            }

	        }
	    }

	    this.times.adjust += (Date.now() - now2);

	};

	SOM.prototype.train = function train(trainingSet) {
	    if (!this.done) {
	        this.setTraining(trainingSet);
	        while (this.trainOne()) {
	        }
	    }
	};

	SOM.prototype.getConvertedNodes = function getConvertedNodes() {
	    var result = new Array(this.x);
	    for (var i = 0; i < this.x; i++) {
	        result[i] = new Array(this.y);
	        for (var j = 0; j < this.y; j++) {
	            var node = this.nodes[i][j];
	            result[i][j] = this.creator ? this.creator(node.weights) : node.weights;
	        }
	    }
	    return result;
	};

	SOM.prototype._findBestMatchingUnit = function findBestMatchingUnit(candidate) {

	    var bmu,
	        lowest = Infinity,
	        dist;

	    for (var i = 0; i < this.x; i++) {
	        for (var j = 0; j < this.y; j++) {
	            dist = this.distance(this.nodes[i][j].weights, candidate);
	            if (dist < lowest) {
	                lowest = dist;
	                bmu = this.nodes[i][j];
	            }
	        }
	    }

	    return bmu;

	};

	SOM.prototype.predict = function predict(data, computePosition) {
	    if (typeof data === 'boolean') {
	        computePosition = data;
	        data = null;
	    }
	    if (!data) {
	        data = this.trainingSet;
	    }
	    if (Array.isArray(data) && (Array.isArray(data[0]) || (typeof data[0] === 'object'))) { // predict a dataset
	        var self = this;
	        return data.map(function (element) {
	            return self._predict(element, computePosition);
	        });
	    } else { // predict a single element
	        return this._predict(data, computePosition);
	    }
	};

	SOM.prototype._predict = function _predict(element, computePosition) {
	    if (!Array.isArray(element)) {
	        element = this.extractor(element);
	    }
	    var bmu = this._findBestMatchingUnit(element);
	    var result = [bmu.x, bmu.y];
	    if (computePosition) {
	        result[2] = bmu.getPosition(element);
	    }
	    return result;
	};

	// As seen in http://www.scholarpedia.org/article/Kohonen_network
	SOM.prototype.getQuantizationError = function getQuantizationError() {
	    var fit = this.getFit(),
	        l = fit.length,
	        sum = 0;
	    for (var i = 0; i < l; i++) {
	        sum += fit[i];
	    }
	    return sum / l;
	};

	SOM.prototype.getFit = function getFit(dataset) {
	    if (!dataset) {
	        dataset = this.trainingSet;
	    }
	    var l = dataset.length,
	        bmu,
	        result = new Array(l);
	    for (var i = 0; i < l; i++) {
	        bmu = this._findBestMatchingUnit(dataset[i]);
	        result[i] = Math.sqrt(this.distance(dataset[i], bmu.weights));
	    }
	    return result;
	};

	function getConverters(fields) {
	    var l = fields.length,
	        normalizers = new Array(l),
	        denormalizers = new Array(l);
	    for (var i = 0; i < l; i++) {
	        normalizers[i] = getNormalizer(fields[i].range);
	        denormalizers[i] = getDenormalizer(fields[i].range);
	    }
	    return {
	        extractor: function extractor(value) {
	            var result = new Array(l);
	            for (var i = 0; i < l; i++) {
	                result[i] = normalizers[i](value[fields[i].name]);
	            }
	            return result;
	        },
	        creator: function creator(value) {
	            var result = {};
	            for (var i = 0; i < l; i++) {
	                result[fields[i].name] = denormalizers[i](value[i]);
	            }
	            return result;
	        }
	    };
	}

	function getNormalizer(minMax) {
	    return function normalizer(value) {
	        return (value - minMax[0]) / (minMax[1] - minMax[0]);
	    };
	}

	function getDenormalizer(minMax) {
	    return function denormalizer(value) {
	        return (minMax[0] + value * (minMax[1] - minMax[0]));
	    };
	}

	function squareEuclidean(a, b) {
	    var d = 0;
	    for (var i = 0, ii = a.length; i < ii; i++) {
	        d += (a[i] - b[i]) * (a[i] - b[i]);
	    }
	    return d;
	}

	function getRandomValue(arr, randomizer) {
	    return arr[Math.floor(randomizer() * arr.length)];
	}

	function getMaxDistance(distance, numWeights) {
	    var zero = new Array(numWeights),
	        one = new Array(numWeights);
	    for (var i = 0; i < numWeights; i++) {
	        zero[i] = 0;
	        one[i] = 1;
	    }
	    return distance(zero, one);
	}

	module.exports = SOM;

/***/ },
/* 154 */
/***/ function(module, exports) {

	function NodeSquare(x, y, weights, som) {
	    this.x = x;
	    this.y = y;
	    this.weights = weights;
	    this.som = som;
	    this.neighbors = {};
	}

	NodeSquare.prototype.adjustWeights = function adjustWeights(target, learningRate, influence) {
	    for (var i = 0, ii = this.weights.length; i < ii; i++) {
	        this.weights[i] += learningRate * influence * (target[i] - this.weights[i]);
	    }
	};

	NodeSquare.prototype.getDistance = function getDistance(otherNode) {
	    return Math.max(Math.abs(this.x - otherNode.x), Math.abs(this.y - otherNode.y));
	};

	NodeSquare.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
	    var distX = Math.abs(this.x - otherNode.x),
	        distY = Math.abs(this.y - otherNode.y);
	    return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY));
	};

	NodeSquare.prototype.getNeighbors = function getNeighbors(xy) {
	    if (!this.neighbors[xy]) {
	        this.neighbors[xy] = new Array(2);

	        // left or bottom neighbor
	        var v;
	        if (this[xy] > 0) {
	            v = this[xy] - 1;
	        } else if (this.som.torus) {
	            v = this.som.gridDim[xy] - 1
	        }
	        if (typeof v !== 'undefined') {
	            var x, y;
	            if (xy === 'x') {
	                x = v;
	                y = this.y;
	            } else {
	                x = this.x;
	                y = v;
	            }
	            this.neighbors[xy][0] = this.som.nodes[x][y];
	        }

	        // top or right neighbor
	        var w;
	        if (this[xy] < (this.som.gridDim[xy] - 1)) {
	            w = this[xy] + 1;
	        } else if (this.som.torus) {
	            w = 0;
	        }
	        if (typeof w !== 'undefined') {
	            if (xy === 'x') {
	                x = w;
	                y = this.y;
	            } else {
	                x = this.x;
	                y = w;
	            }
	            this.neighbors[xy][1] = this.som.nodes[x][y];
	        }
	    }
	    return this.neighbors[xy];
	};

	NodeSquare.prototype.getPos = function getPos(xy, element) {
	    var neighbors = this.getNeighbors(xy),
	        distance = this.som.distance,
	        bestNeighbor,
	        direction;
	    if(neighbors[0]) {
	        if (neighbors[1]) {
	            var dist1 = distance(element, neighbors[0].weights),
	                dist2 = distance(element, neighbors[1].weights);
	            if(dist1 < dist2) {
	                bestNeighbor = neighbors[0];
	                direction = -1;
	            } else {
	                bestNeighbor = neighbors[1];
	                direction = 1;
	            }
	        } else {
	            bestNeighbor = neighbors[0];
	            direction = -1;
	        }
	    } else {
	        bestNeighbor = neighbors[1];
	        direction = 1;
	    }
	    var simA = 1 - distance(element, this.weights),
	        simB = 1 - distance(element, bestNeighbor.weights);
	    var factor = ((simA - simB) / (2 - simA - simB));
	    return 0.5 + 0.5 * factor * direction;
	};

	NodeSquare.prototype.getPosition = function getPosition(element) {
	    return [
	        this.getPos('x', element),
	        this.getPos('y', element)
	    ];
	};

	module.exports = NodeSquare;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	var NodeSquare = __webpack_require__(154);

	function NodeHexagonal(x, y, weights, som) {

	    NodeSquare.call(this, x, y, weights, som);

	    this.hX = x - Math.floor(y / 2);
	    this.z = 0 - this.hX - y;

	}

	NodeHexagonal.prototype = new NodeSquare;
	NodeHexagonal.prototype.constructor = NodeHexagonal;

	NodeHexagonal.prototype.getDistance = function getDistanceHexagonal(otherNode) {
	    return Math.max(Math.abs(this.hX - otherNode.hX), Math.abs(this.y - otherNode.y), Math.abs(this.z - otherNode.z));
	};

	NodeHexagonal.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
	    var distX = Math.abs(this.hX - otherNode.hX),
	        distY = Math.abs(this.y - otherNode.y),
	        distZ = Math.abs(this.z - otherNode.z);
	    return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY), Math.min(distZ, this.som.gridDim.z - distZ));
	};

	NodeHexagonal.prototype.getPosition = function getPosition() {
	    throw new Error('Unimplemented : cannot get position of the points for hexagonal grid');
	};

	module.exports = NodeHexagonal;

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(157);


/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Layer = __webpack_require__(158);
	var Matrix = __webpack_require__(14);

	module.exports = FeedforwardNeuralNetwork;

	/**
	 * Function that returns a random number between two numbers (inclusive)
	 * @param {number} min - lower bound
	 * @param {number} max - upper bound.
	 * @returns {number} random number
	 */
	function randomIntegerFromInterval(min, max) {
	    return Math.floor(Math.random()*(max - min + 1) + min);
	}

	/**
	 * Constructor for the FNN (Feedforward Neural Networks) that takes an Array of Numbers,
	 * those numbers corresponds to the size of each layer in the FNN, the first and the last number of the array corresponds to the input and the
	 * output layer respectively.
	 *
	 * @param reload - for load purposes.
	 * @param model - for load purposes.
	 * @constructor
	 */
	function FeedforwardNeuralNetwork(reload, model) {
	    if(reload) {
	        this.layers = model.layers;
	        this.inputSize = model.inputSize;
	        this.outputSize = model.outputSize;
	    }
	}

	/**
	 * Build the Neural Network with an array that represent each hidden layer size.
	 *
	 * @param {Array} layersSize - Array of sizes of each layer.
	 */
	FeedforwardNeuralNetwork.prototype.buildNetwork = function (layersSize) {
	    layersSize.push(this.outputSize);

	    this.layers = new Array(layersSize.length);

	    for (var i = 0; i < layersSize.length; ++i) {
	        var inSize = (i == 0) ? this.inputSize : layersSize[i - 1];
	        this.layers[i] = new Layer(inSize, layersSize[i]);
	    }

	    this.layers[this.layers.length - 1].isSigmoid = false;
	};

	/**
	 * Function that applies a forward propagation over the Neural Network
	 * with one case of the dataset.
	 * @param {Array} input - case of the dataset.
	 * @returns {Array} result of the forward propagation.
	 */
	FeedforwardNeuralNetwork.prototype.forwardNN = function (input) {
	    var results = input.slice();

	    for(var i = 0; i < this.layers.length; ++i) {
	        results = this.layers[i].forward(results);
	    }

	    return results;
	};

	/**
	 * Function that makes one iteration (epoch) over the Neural Network with one element
	 * of the dataset with corresponding prediction; the other two arguments are the
	 * learning rate and the momentum that is the regularization term for the parameters
	 * of each perceptron in the Neural Network.
	 * @param {Array} data - Element of the dataset.
	 * @param {Array} prediction - Prediction over the data object.
	 * @param {Number} learningRate
	 * @param momentum - the regularization term.
	 */
	FeedforwardNeuralNetwork.prototype.iteration = function (data, prediction, learningRate, momentum) {
	    var forwardResult = this.forwardNN(data);
	    var error = new Array(forwardResult.length);

	    if(typeof(prediction) === 'number')
	        prediction = [prediction];

	    for (var i = 0; i < error.length; i++) {
	        error[i] = prediction[i] - forwardResult[i];
	    }

	    var lengthLayers = this.layers.length;

	    for(i = 0; i < lengthLayers; ++i) {
	        error = this.layers[lengthLayers - 1 - i].train(error, learningRate, momentum);
	    }
	};

	/**
	 * Method that train the neural network with a given training set with corresponding
	 * predictions. The options argument has an array of the number of perceptrons that we want in each hidden layer, the
	 * number of iterations (default 50) that we want to perform, the learning rate and the momentum that is the
	 * regularization term (default 0.1 for both) for the parameters of each perceptron in the Neural Network.
	 *
	 * options:
	 * * hiddenLayers - Array of number with each hidden layer size.
	 * * iterations - Number
	 * * learningRate - Number
	 * * momentum - Number
	 *
	 * @param {Matrix} trainingSet
	 * @param {Matrix} predictions
	 * @param {Number} options
	 */
	FeedforwardNeuralNetwork.prototype.train = function (trainingSet, predictions, options) {
	    if(options === undefined) options = {};

	    if(trainingSet.length !== predictions.length)
	        throw new RangeError("the training and prediction set must have the same size.");

	    this.inputSize = trainingSet[0].length;
	    this.outputSize = predictions[0].length;

	    var hiddenLayers = options.hiddenLayers === undefined ? [10] : options.hiddenLayers;
	    var iterations = options.iterations === undefined ? 50 : options.iterations;
	    var learningRate = options.learningRate === undefined ? 0.1 : options.learningRate;
	    var momentum = options.momentum === undefined ? 0.1 : options.momentum;

	    this.buildNetwork(options.hiddenLayers);

	    for(var i = 0; i < iterations; ++i) {
	        for(var j = 0; j < predictions.length; ++j) {
	            var index = randomIntegerFromInterval(0, predictions.length - 1);
	            this.iteration(trainingSet[index], predictions[index], learningRate, momentum);
	        }
	    }
	};

	/**
	 * Function that with a dataset, gives all the predictions for this dataset.
	 * @param {Matrix} dataset.
	 * @returns {Array} predictions
	 */
	FeedforwardNeuralNetwork.prototype.predict = function (dataset) {
	    if(dataset[0].length !== this.inputSize)
	        throw new RangeError("The dataset columns must have the same size of the " +
	                             "input layer");
	    var result = new Array(dataset.length);
	    for (var i = 0; i < dataset.length; i++) {
	        result[i] = this.forwardNN(dataset[i]);
	    }

	    result = new Matrix(result);
	    return result.columns === 1 ? result.getColumn(0) : result;
	};

	/**
	 * function that loads a object model into the Neural Network.
	 * @param model
	 * @returns {FeedforwardNeuralNetwork} with the provided model.
	 */
	FeedforwardNeuralNetwork.load = function (model) {
	    if(model.modelName !== "FNN")
	        throw new RangeError("The given model is invalid!");

	    return new FeedforwardNeuralNetwork(true, model);
	};

	/**
	 * Function that exports the actual Neural Network to an object.
	 * @returns {{modelName: string, layers: *, inputSize: *, outputSize: *}}
	 */
	FeedforwardNeuralNetwork.prototype.export = function () {
	    return {
	        modelName: "FNN",
	        layers: this.layers,
	        inputSize: this.inputSize,
	        outputSize: this.outputSize
	    };
	};


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Matrix = __webpack_require__(14);

	module.exports = Layer;

	/**
	 * Function that create a random array of numbers between value depending
	 * on the input and output size given the following formula:
	 *
	 *    sqrt(6) / sqrt(l_in + l_out);
	 *
	 * Taken from the coursera course of machine learning from Andrew Ng,
	 * Exercise 4, Page 7 of the exercise PDF.
	 *
	 * @param numberOfWeights - size of the array.
	 * @param inputSize - number of input of the current layer
	 * @param outputSize - number of output of the current layer
	 * @returns {Array} random array of numbers.
	 */
	function randomInitialzeWeights(numberOfWeights, inputSize, outputSize) {
	    var epsilon = 2.449489742783 / Math.sqrt(inputSize + outputSize);
	    return Matrix.rand(1, numberOfWeights).mul(2 * epsilon).sub(epsilon).getRow(0);
	}

	/**
	 * Function that calculates the sigmoid (logistic) function.
	 * @param value
	 * @returns {number}
	 */
	function sigmoid(value) {
	    return 1.0 / (1 + Math.exp(-value));
	}

	/**
	 * Function that calculates the derivate of the sigmoid function.
	 * @param value
	 * @returns {number}
	 */
	function sigmoidGradient(value) {
	    return value * (1 - value);
	}

	/**
	 * Constructor that creates a layer for the neural network given the number of inputs
	 * and outputs.
	 * @param inputSize
	 * @param outputSize
	 * @constructor
	 */
	function Layer(inputSize, outputSize) {
	    this.output = Matrix.zeros(1, outputSize).getRow(0);
	    this.input = Matrix.zeros(1, inputSize + 1).getRow(0); //+1 for bias term
	    this.deltaWeights = Matrix.zeros(1, (1 + inputSize) * outputSize).getRow(0);
	    this.weights = randomInitialzeWeights(this.deltaWeights.length, inputSize, outputSize);
	    this.isSigmoid = true;
	}

	/**
	 * Function that performs the forward propagation for the current layer
	 * @param {Array} input - output from the previous layer.
	 * @returns {Array} output - output for the next layer.
	 */
	Layer.prototype.forward = function (input) {
	    this.input = input.slice();
	    this.input.push(1); // bias
	    var offs = 0; // offset used to get the current weights in the current perceptron
	    this.output = Matrix.zeros(1, this.output.length).getRow(0);

	    for(var i = 0; i < this.output.length; ++i) {
	        for(var j = 0 ; j < this.input.length; ++j) {
	            this.output[i] += this.weights[offs + j] * this.input[j];
	        }
	        if(this.isSigmoid)
	            this.output[i] = sigmoid(this.output[i]);

	        offs += this.input.length;
	    }

	    return this.output.slice();
	};

	/**
	 * Function that performs the backpropagation algorithm for the current layer.
	 * @param {Array} error - errors from the previous layer.
	 * @param {Number} learningRate - Learning rate for the actual layer.
	 * @param {Number} momentum - The regularizarion term.
	 * @returns {Array} the error for the next layer.
	 */
	Layer.prototype.train = function (error, learningRate, momentum) {
	    var offs = 0;
	    var nextError = Matrix.zeros(1, this.input.length).getRow(0);//new Array(this.input.length);

	    for(var i = 0; i < this.output.length; ++i) {
	        var delta = error[i];

	        if(this.isSigmoid)
	            delta *= sigmoidGradient(this.output[i]);

	        for(var j = 0; j < this.input.length; ++j) {
	            var index = offs + j;
	            nextError[j] += this.weights[index] * delta;

	            var deltaWeight = this.input[j] * delta * learningRate;
	            this.weights[index] += this.deltaWeights[index] * momentum + deltaWeight;
	            this.deltaWeights[index] = deltaWeight;
	        }

	        offs += this.input.length;
	    }

	    return nextError;
	};


/***/ }
/******/ ])
});
;