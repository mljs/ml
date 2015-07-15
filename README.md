# ml

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]

Machine learning tools

## Installation

Node.JS
```
$ npm install ml
```

Bower
```
$ bower install ml
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

### Math

`ML.Math`

#### Matrix

`ML.Math.Matrix` or `ML.Matrix`  
See [ml-matrix](https://github.com/mljs/matrix)

#### Distance

`ML.Math.Distance`  
See [ml-distance](https://github.com/mljs/distance)

#### Savitzky-Golay filter

`ML.Math.SG`  
See [ml-savitzkyGolay](https://github.com/mljs/savitzkyGolay)

### Stat

`ML.Stat`

#### Utilities

* Array: `ML.Stat.array`
* Matrix: `ML.Stat.matrix`

See [ml-stat](https://github.com/mljs/stat)

### Supervised learning

`ML.SL`

### Clustering

`ML.Clust.kmeans`  
See [ml-kmeans](https://github.com/mljs/kmeans)

`ML.Clust.hclust`  
See [ml-hclust](https://github.com/mljs/hclust)

#### Support vector machines

`ML.SL.SVM`  
See [ml-svm](https://github.com/mljs/svm)

#### Naive Bayes

`ML.SL.NaiveBayes`
See [ml-naivebayes](https://github.com/mljs/naiveBayes)

#### K-Nearest Neighboor

`ML.SL.KNN`
See [ml-knn](https://github.com/mljs/knn)

#### Partial least squares (PLS)

`ML.SL.PLS`
See [ml-pls](https://github.com/mljs/pls)

### Neural networks

`ML.NN`

#### Self-organizing map

`ML.NN.SOM`  
See [ml-som](https://github.com/mljs/som)

#### Feedforward Neural Networks

`ML.NN.FNN`
See [ml-fnn](https://github.com/mljs/feedforwardNeuralNetworks)

### Array Utils

`ML.ArrayUtils`  
See [ml-array-utils](https://github.com/mljs/ArrayUtils)

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
