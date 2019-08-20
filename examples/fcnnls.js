const { fcnnlsVector } = require('../dist/ml.js').FCNNLS;

// Example that allows to calculate the contribution of pure
// spectra in a mixture.

// columns correspond to pure sample
let matrix = [[1, 1, 1], [1, 1, 0], [1, 0, 0]];

let mixture = [5, 3, 1];

let result = fcnnlsVector(matrix, mixture);
console.log(result);

// should be close to 1,2,2
