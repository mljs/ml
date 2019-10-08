const savitzkyGolay = require('../dist/ml.js').savitzkyGolay;

let result = savitzkyGolay([1, 2, 3, 4, 5, 4, 3, 2, 1], 1, { derivative: 0 });

console.log(result);
