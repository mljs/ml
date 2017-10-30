# ml.js - Machine learning tools in JavaScript

## Introduction

This library is a compilation of the tools developed in the [mljs](https://github.com/mljs) organization.  
It is mainly maintained for use in the browser. If you are working with Node.js, you might prefer to add
to your dependencies only the libraries that you need, as they are usually published to npm more often.  
We prefix all our npm package names with `ml-` (eg. ml-matrix) so they are easy to find.

To include the ml.js library in a web page:
```html
<script src="https://www.lactame.com/lib/ml/2.2.0/ml.min.js"></script>
```
It will be available as the global `ML` variable. The package is in UMD format and can be "required" within webpack or requireJS.

:warning: The structure in which the libraries are organized has changed significantly on master If you are using v2.2, please refer to https://github.com/mljs/ml/tree/v2.2.0

## List of included libraries

### Unsupervised learning

* Principal component analysis (PCA): [`ML.PCA`](https://github.com/mljs/pca)
* Hierarchical clustering: [`ML.HClust`](https://github.com/mljs/hclust)
* K-means clustering: [`ML.KMeans`](https://github.com/mljs/kmeans)

### Supervised learning

* Support vector machines: [`ML.SVM`](https://github.com/mljs/svm)
* Naive Bayes: [`ML.NaiveBayes`](https://github.com/mljs/naive-bayes)
* K-Nearest Neighbor (KNN): [`ML.KNN`](https://github.com/mljs/knn)
* Partial least squares (PLS): [`ML.PLS`](https://github.com/mljs/pls)
* Cross-validation: [`ML.CrossValidation`](https://github.com/mljs/cross-validation)
* Confusion matrix: [`ML.ConfusionMatrix`](https://github.com/mljs/confusion-matrix)

### Artificial neural networks (ANN)

* Feedforward Neural Networks: [`ML.FNN`](https://github.com/mljs/feedforward-neural-networks)
* Self-organizing map / Kohonen networks: [`ML.SOM`](https://github.com/mljs/som)

### Regression

* TBD

### Optimization

* Levenberg-Marquardt: [`ML.levenbergMarquardt`](https://github.com/mljs/levenberg-marquardt)

### Math

* Matrix: [`ML.Matrix`](https://github.com/mljs/matrix) (Matrix class)
* Sparse matrix: [`ML.SparseMatrix`](https://github.com/mljs/sparse-matrix)
* Kernels: [`ML.Kernel`](https://github.com/mljs/kernel)
* Distance functions: [`ML.Distance`](https://github.com/mljs/distance)
* Similarity functions: [`ML.Similarity`](https://github.com/mljs/distance)
* Distance matrix: [`ML.distanceMatrix`](https://github.com/mljs/distance-matrix)
* XORShift-add RNG: [`ML.XSadd`](https://github.com/mljs/xsadd)

### Statistics

* Performance (ROC curve): [`ML.Performance`](https://github.com/mljs/performance)

### Data preprocessing

* Principal component analysis (PCA): [`ML.PCA`](https://github.com/mljs/pca)
* Savitzky-Golay filter: [`ML.savitzkyGolay`](https://github.com/mljs/savitzky-golay)
* Savitzky-Golay generalized: [`ML.savitzkyGolayGeneralized`](https://github.com/mljs/savitzky-golay-generalized)

### Utility

* Bit array operations: [`ML.BitArray`](https://github.com/mljs/bit-array)
* Hash table: [`ML.HashTable`](https://github.com/mljs/hash-table)
* Pad array: [`ML.padArray`](https://github.com/mljs/pad-array)
* Binary search: [`ML.binarySearch`](https://github.com/darkskyapp/binary-search)
* Number comparison functions for sorting: [`ML.numSort`](https://github.com/sindresorhus/num-sort)

## License

  [MIT](./LICENSE)
