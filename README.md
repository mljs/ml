# ml

  [![NPM version][npm-image]][npm-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Machine learning tools

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
<script src="https://www.lactame.com/lib/ml/0.3.10/ml.min.js"></script>
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

### Root packages

#### Matrix

`ML.Matrix`  
See [ml-matrix](https://github.com/mljs/matrix)

### Array Utils

`ML.ArrayUtils`   
See [ml-array-utils](https://github.com/mljs/array-utils)

### Bit array operations

`ML.BitArray`   
See [ml-bit-array](https://github.com/mljs/bit-array)

### Math

`ML.Math`

#### Distance

`ML.Math.Distance`  
See [ml-distance](https://github.com/mljs/distance)

#### Savitzky-Golay filter

`ML.Math.SG`  
See [ml-savitzkyGolay](https://github.com/mljs/savitzky-golay)

### Stat

`ML.Stat`

#### Utilities

* Array: `ML.Stat.array`
* Matrix: `ML.Stat.matrix`

See [ml-stat](https://github.com/mljs/stat)

#### PCA

`ML.Stat.PCA`   
See [ml-pca](https://github.com/mljs/pca)

### Random number generation

`ML.RNG`

#### XORShift-add

`ML.RNG.XSadd`
See [ml-xsadd](https://github.com/mljs/xsadd)

### Clustering

`ML.Clust`

#### Hierarchical clustering

`ML.Clust.hclust`  
See [ml-hclust](https://github.com/mljs/hclust)

#### K-means

`ML.Clust.kmeans`  
See [ml-kmeans](https://github.com/mljs/kmeans)

### Supervised learning

`ML.SL`

#### Support vector machines

`ML.SL.SVM`  
See [ml-svm](https://github.com/mljs/svm)

#### Naive Bayes

`ML.SL.NaiveBayes`   
See [ml-naivebayes](https://github.com/mljs/naive-bayes)

#### K-Nearest Neighboor

`ML.SL.KNN`   
See [ml-knn](https://github.com/mljs/knn)

#### Partial least squares (PLS)

`ML.SL.PLS`   
See [ml-pls](https://github.com/mljs/pls)

### Neural networks

`ML.NN`

#### Self-organizing map / Kohonen networks

`ML.NN.SOM`  
See [ml-som](https://github.com/mljs/som)

#### Feedforward Neural Networks

`ML.NN.FNN`   
See [ml-fnn](https://github.com/mljs/feedforward-neural-networks)

## License

  [MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/ml
[david-image]: https://img.shields.io/david/mljs/ml.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/ml
[download-image]: https://img.shields.io/npm/dm/ml.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/ml
