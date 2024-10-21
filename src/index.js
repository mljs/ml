/* eslint-disable import/newline-after-import */
/* eslint-disable import/order */
/* eslint-disable import/first */

// Try to keep this list in the same structure as the README.

// Unsupervised learning
export { PCA } from 'ml-pca';

// Supervised learning

export { default as KNN } from 'ml-knn';
export { PLS, KOPLS, OPLS, oplsNipals } from 'ml-pls';

export { ConfusionMatrix } from 'ml-confusion-matrix';

// Artificial neural networks
export { default as FNN } from 'ml-fnn';
export { default as SOM } from 'ml-som';

// Regression
export {
  SimpleLinearRegression,
  PolynomialRegression,
  MultivariateLinearRegression,
  PowerRegression,
  ExponentialRegression,
  TheilSenRegression,
  RobustPolynomialRegression,
} from 'ml-regression';

// Optimization
export { levenbergMarquardt } from 'ml-levenberg-marquardt';

// Math
import * as MatrixLib from 'ml-matrix';
const {
  Matrix,
  SVD,
  EVD,
  CholeskyDecomposition,
  LuDecomposition,
  QrDecomposition,
} = MatrixLib;
export {
  Matrix,
  SVD,
  EVD,
  CholeskyDecomposition,
  LuDecomposition,
  QrDecomposition,
};

export { SparseMatrix } from 'ml-sparse-matrix';
export { default as Kernel } from 'ml-kernel';
export { distance as Distance, similarity as Similarity } from 'ml-distance';
export { default as distanceMatrix } from 'ml-distance-matrix';
export { XSadd } from 'ml-xsadd';
export { nGMCA } from 'ml-ngmca';

// Statistics
export { default as Performance } from 'ml-performance';

// Data preprocessing
export { default as savitzkyGolay } from 'ml-savitzky-golay';

// Utility
export { default as BitArray } from 'ml-bit-array';
export { default as HashTable } from 'ml-hash-table';
export { default as padArray } from 'ml-pad-array';
export { default as binarySearch } from 'binary-search';
export { Random } from 'ml-random';

import min from 'ml-array-min';
import max from 'ml-array-max';
import median from 'ml-array-median';
import mean from 'ml-array-mean';
import mode from 'ml-array-mode';
import normed from 'ml-array-normed';
import rescale from 'ml-array-rescale';
import sequentialFill from 'ml-array-sequential-fill';
import sum from 'ml-array-sum';
import standardDeviation from 'ml-array-standard-deviation';
import variance from 'ml-array-variance';
export const Array = {
  min,
  max,
  median,
  mean,
  mode,
  normed,
  rescale,
  sequentialFill,
  standardDeviation,
  sum,
  variance,
};

import centroidsMerge from 'ml-array-xy-centroids-merge';
import closestX from 'ml-arrayxy-closestx';
import covariance from 'ml-array-xy-covariance';
import maxMerge from 'ml-array-xy-max-merge';
import maxY from 'ml-array-xy-max-y';
import sortX from 'ml-array-xy-sort-x';
import uniqueX from 'ml-arrayxy-uniquex';
import weightedMerge from 'ml-array-xy-weighted-merge';
import equallySpaced from 'ml-array-xy-equally-spaced';
import filterX from 'ml-array-xy-filter-x';
export const ArrayXY = {
  centroidsMerge,
  closestX,
  covariance,
  maxMerge,
  maxY,
  sortX,
  uniqueX,
  weightedMerge,
  equallySpaced,
  filterX,
};
export { DecisionTreeClassifier, DecisionTreeRegression } from 'ml-cart';
export {
  RandomForestClassifier,
  RandomForestRegression,
} from 'ml-random-forest';
export * as HClust from 'ml-hclust';
export * as KMeans from 'ml-kmeans';
export * as NaiveBayes from 'ml-naivebayes';
export * as CrossValidation from 'ml-cross-validation';
export * as FCNNLS from 'ml-fcnnls';
export * as MatrixLib from 'ml-matrix';
export * as GSD from 'ml-gsd';
