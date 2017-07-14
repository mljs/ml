# ml

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Machine learning tools in JavaScript

## Introduction

This library is a compilation of the tools developed in the [mljs](https://github.com/mljs) organization.  
It is mainly maintained for use in the browser. If you are working with Node.js, you might prefer to add
to your dependencies only the libraries that you need, as they are usually published to npm more often.  
We prefix all our npm package names with `ml-` (eg. ml-matrix) so they are easy to find.

## Installation

Node.JS
```
$ npm install ml
```

Bower
```
$ bower install ml
```

Using our CDN in a web page
```html
<script src="https://www.lactame.com/lib/ml/2.0.0/ml.min.js"></script>
```

## Usage

### Node.JS
```js
var ML = require('ml');
```

### Browser with AMD
```js
require(['path/to/ml/dist/ml.min'], function (ML) {
    // ML.Math ...
});
```

### Browser as global
```html
<script src="path/to/ml/dist/ml.min.js" />
<script>
    // ML.Math ...
</script>
```

## Tools

* Root packages
    * Array Utils: [`ML.ArrayUtils`](https://github.com/mljs/array-utils)
    * Bit array operations: [`ML.BitArray`](https://github.com/mljs/bit-array)
    * Hash table: [`ML.HashTable`](https://github.com/mljs/hash-table)
    * Matrix: [`ML.Matrix`](https://github.com/mljs/matrix) (Matrix class)
    * Pad array: [`ML.PadArray`](https://github.com/mljs/pad-array)
    * Regression: [`ML.Regression`](https://github.com/mljs/regression)
    * Binary search: [`ML.binarySearch`](https://github.com/darkskyapp/binary-search)
    * Number comparison functions for sorting: [`ML.numSort`](https://github.com/sindresorhus/num-sort)
* Math: `ML.Math`
    * Distance: [`ML.Math.Distance`](https://github.com/mljs/distance)
    * Similarity: [`ML.Math.Similarity`](https://github.com/mljs/distance)
    * DistanceMatrix: [`ML.Math.DistanceMatrix`](https://github.com/mljs/distance-matrix)
    * Savitzky-Golay filter: [`ML.Math.SG`](https://github.com/mljs/savitzky-golay)
    * Savitzky-Golay generalized: [`ML.Math.SGG`](https://github.com/mljs/savitzky-golay-generalized)
    * Matrix: [`ML.Math.Matrix`](https://github.com/mljs/matrix) (All exports of the `ml-matrix` package)
    * Sparse matrix: [`ML.Math.SparseMatrix`](https://github.com/mljs/sparse-matrix)
    * Kernels: [`ML.Math.Kernel`](https://github.com/mljs/kernel)
* Stat: [`ML.Stat`](https://github.com/mljs/stat)
    * Array: `ML.Stat.array`
    * Matrix: `ML.Stat.matrix`
    * Principal component analysis (PCA): [`ML.Stat.PCA`](https://github.com/mljs/pca)
    * Performance: [`ML.Stat.Performance`](https://github.com/mljs/performance)
* Optimization: `ML.Optimization`
    * BellOptimizer: [`ML.Optimization.BellOptimizer`](https://github.com/mljs/optimize-lorentzian)
    * LevenbergMarquardt: [`ML.Optimization.LevenbergMarquardt`](https://github.com/mljs/levenberg-marquardt)
* Random number generation: `ML.RNG`
    * XORShift-add: [`ML.RNG.XSadd`](https://github.com/mljs/xsadd)
* Clustering: `ML.Clust`
    * Hierarchical clustering: [`ML.Clust.hclust`](https://github.com/mljs/hclust)
    * K-means: [`ML.Clust.kmeans`](https://github.com/mljs/kmeans)
* Supervised learning: `ML.SL`
    * Support vector machines: [`ML.SL.SVM`](https://github.com/mljs/svm)
    * Naive Bayes: [`ML.SL.NaiveBayes`](https://github.com/mljs/naive-bayes)
    * K-Nearest Neighbor: [`ML.SL.KNN`](https://github.com/mljs/knn)
    * Partial least squares (PLS): [`ML.SL.PLS`](https://github.com/mljs/pls)
    * Cross-validation utility: [`ML.SL.CrossValidation`](https://github.com/mljs/cross-validation) (alias [`ML.SL.CV`](https://github.com/mljs/cross-validation))
    * Confusion matrix utility [`ML.SL.ConfusionMatrix`](https://github.com/mljs/confusion-matrix) (alias [`ML.SL.CM`](https://github.com/mljs/confusion-matrix))
* Neural networks: `ML.NN`
    * Self-organizing map / Kohonen networks: [`ML.NN.SOM`](https://github.com/mljs/som)
    * Feedforward Neural Networks: [`ML.NN.FNN`](https://github.com/mljs/feedforward-neural-networks)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ml
[travis-image]: https://img.shields.io/travis/mljs/ml/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/ml
[david-image]: https://img.shields.io/david/mljs/ml.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/ml
[download-image]: https://img.shields.io/npm/dm/ml.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/ml
