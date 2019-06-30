/**
 * ml - Machine learning tools
 * @version v4.0.0
 * @link https://github.com/mljs/ml
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.ML = {}));
}(this, function (exports) { 'use strict';

  const toString = Object.prototype.toString;

  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  var src = isAnyArray;

  /**
   * Computes the maximum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function max(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var max = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] > max) max = input[i];
    }

    return max;
  }

  /**
   * Computes the minimum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function min(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var min = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] < min) min = input[i];
    }

    return min;
  }

  function rescale(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!src(input)) {
      throw new TypeError('input must be an array');
    } else if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var output;

    if (options.output !== undefined) {
      if (!src(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    var currentMin = min(input);
    var currentMax = max(input);

    if (currentMin === currentMax) {
      throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
    }

    var _options$min = options.min,
        minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
        _options$max = options.max,
        maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

    if (minValue >= maxValue) {
      throw new RangeError('min option must be smaller than max option');
    }

    var factor = (maxValue - minValue) / (currentMax - currentMin);

    for (var i = 0; i < input.length; i++) {
      output[i] = (input[i] - currentMin) * factor + minValue;
    }

    return output;
  }

  /**
   * @private
   * Check that a row index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */
  function checkRowIndex(matrix, index, outer) {
    var max = outer ? matrix.rows : matrix.rows - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Row index out of range');
    }
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

    if (index < 0 || index > max) {
      throw new RangeError('Column index out of range');
    }
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkRowVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.columns) {
      throw new RangeError('vector size must be the same as the number of columns');
    }

    return vector;
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkColumnVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.rows) {
      throw new RangeError('vector size must be the same as the number of rows');
    }

    return vector;
  }
  function checkIndices(matrix, rowIndices, columnIndices) {
    return {
      row: checkRowIndices(matrix, rowIndices),
      column: checkColumnIndices(matrix, columnIndices)
    };
  }
  function checkRowIndices(matrix, rowIndices) {
    if (typeof rowIndices !== 'object') {
      throw new TypeError('unexpected type for row indices');
    }

    var rowOut = rowIndices.some(r => {
      return r < 0 || r >= matrix.rows;
    });

    if (rowOut) {
      throw new RangeError('row indices are out of range');
    }

    if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
    return rowIndices;
  }
  function checkColumnIndices(matrix, columnIndices) {
    if (typeof columnIndices !== 'object') {
      throw new TypeError('unexpected type for column indices');
    }

    var columnOut = columnIndices.some(c => {
      return c < 0 || c >= matrix.columns;
    });

    if (columnOut) {
      throw new RangeError('column indices are out of range');
    }

    if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
    return columnIndices;
  }
  function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
    if (arguments.length !== 5) {
      throw new RangeError('expected 4 arguments');
    }

    checkNumber('startRow', startRow);
    checkNumber('endRow', endRow);
    checkNumber('startColumn', startColumn);
    checkNumber('endColumn', endColumn);

    if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
      throw new RangeError('Submatrix indices are out of range');
    }
  }
  function newArray(length) {
    let value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var array = [];

    for (var i = 0; i < length; i++) {
      array.push(value);
    }

    return array;
  }

  function checkNumber(name, value) {
    if (typeof value !== 'number') {
      throw new TypeError("".concat(name, " must be a number"));
    }
  }

  function sumByRow(matrix) {
    var sum = newArray(matrix.rows);

    for (var i = 0; i < matrix.rows; ++i) {
      for (var j = 0; j < matrix.columns; ++j) {
        sum[i] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumByColumn(matrix) {
    var sum = newArray(matrix.columns);

    for (var i = 0; i < matrix.rows; ++i) {
      for (var j = 0; j < matrix.columns; ++j) {
        sum[j] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumAll(matrix) {
    var v = 0;

    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.columns; j++) {
        v += matrix.get(i, j);
      }
    }

    return v;
  }
  function productByRow(matrix) {
    var sum = newArray(matrix.rows, 1);

    for (var i = 0; i < matrix.rows; ++i) {
      for (var j = 0; j < matrix.columns; ++j) {
        sum[i] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productByColumn(matrix) {
    var sum = newArray(matrix.columns, 1);

    for (var i = 0; i < matrix.rows; ++i) {
      for (var j = 0; j < matrix.columns; ++j) {
        sum[j] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productAll(matrix) {
    var v = 1;

    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.columns; j++) {
        v *= matrix.get(i, j);
      }
    }

    return v;
  }
  function varianceByRow(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (var i = 0; i < rows; i++) {
      var sum1 = 0;
      var sum2 = 0;
      var x = 0;

      for (var j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean[i];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / cols) / cols);
      }
    }

    return variance;
  }
  function varianceByColumn(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (var j = 0; j < cols; j++) {
      var sum1 = 0;
      var sum2 = 0;
      var x = 0;

      for (var i = 0; i < rows; i++) {
        x = matrix.get(i, j) - mean[j];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / rows) / rows);
      }
    }

    return variance;
  }
  function varianceAll(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const size = rows * cols;
    var sum1 = 0;
    var sum2 = 0;
    var x = 0;

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean;
        sum1 += x;
        sum2 += x * x;
      }
    }

    if (unbiased) {
      return (sum2 - sum1 * sum1 / size) / (size - 1);
    } else {
      return (sum2 - sum1 * sum1 / size) / size;
    }
  }
  function centerByRow(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[i]);
      }
    }
  }
  function centerByColumn(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[j]);
      }
    }
  }
  function centerAll(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean);
      }
    }
  }
  function getScaleByRow(matrix) {
    const scale = [];

    for (let i = 0; i < matrix.rows; i++) {
      let sum = 0;

      for (let j = 0; j < matrix.columns; j++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByRow(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[i]);
      }
    }
  }
  function getScaleByColumn(matrix) {
    const scale = [];

    for (let j = 0; j < matrix.columns; j++) {
      let sum = 0;

      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByColumn(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[j]);
      }
    }
  }
  function getScaleAll(matrix) {
    const divider = matrix.size - 1;
    let sum = 0;

    for (let j = 0; j < matrix.columns; j++) {
      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / divider;
      }
    }

    return Math.sqrt(sum);
  }
  function scaleAll(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale);
      }
    }
  }

  function inspectMatrix() {
    const indent = ' '.repeat(2);
    const indentData = ' '.repeat(4);
    return "".concat(this.constructor.name, " {\n").concat(indent, "[\n").concat(indentData).concat(inspectData(this, indentData), "\n").concat(indent, "]\n").concat(indent, "rows: ").concat(this.rows, "\n").concat(indent, "columns: ").concat(this.columns, "\n}");
  }
  const maxRows = 15;
  const maxColumns = 10;
  const maxNumSize = 8;

  function inspectData(matrix, indent) {
    const {
      rows,
      columns
    } = matrix;
    const maxI = Math.min(rows, maxRows);
    const maxJ = Math.min(columns, maxColumns);
    const result = [];

    for (var i = 0; i < maxI; i++) {
      let line = [];

      for (var j = 0; j < maxJ; j++) {
        line.push(formatNumber(matrix.get(i, j)));
      }

      result.push("".concat(line.join(' ')));
    }

    if (maxJ !== columns) {
      result[result.length - 1] += " ... ".concat(columns - maxColumns, " more columns");
    }

    if (maxI !== rows) {
      result.push("... ".concat(rows - maxRows, " more rows"));
    }

    return result.join("\n".concat(indent));
  }

  function formatNumber(num) {
    const numStr = String(num);

    if (numStr.length <= maxNumSize) {
      return numStr.padEnd(maxNumSize, ' ');
    }

    const precise = num.toPrecision(maxNumSize - 2);

    if (precise.length <= maxNumSize) {
      return precise;
    }

    const exponential = num.toExponential(maxNumSize - 2);
    const eIndex = exponential.indexOf('e');
    const e = exponential.substring(eIndex);
    return exponential.substring(0, maxNumSize - e.length) + e;
  }

  function installMathOperations(AbstractMatrix, Matrix) {
    AbstractMatrix.prototype.add = function add(value) {
      if (typeof value === 'number') return this.addS(value);
      return this.addM(value);
    };

    AbstractMatrix.prototype.addS = function addS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.addM = function addM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.add = function add(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.add(value);
    };

    AbstractMatrix.prototype.sub = function sub(value) {
      if (typeof value === 'number') return this.subS(value);
      return this.subM(value);
    };

    AbstractMatrix.prototype.subS = function subS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.subM = function subM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.sub = function sub(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.sub(value);
    };

    AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
    AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
    AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
    AbstractMatrix.subtract = AbstractMatrix.sub;

    AbstractMatrix.prototype.mul = function mul(value) {
      if (typeof value === 'number') return this.mulS(value);
      return this.mulM(value);
    };

    AbstractMatrix.prototype.mulS = function mulS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.mulM = function mulM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mul = function mul(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.mul(value);
    };

    AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
    AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
    AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
    AbstractMatrix.multiply = AbstractMatrix.mul;

    AbstractMatrix.prototype.div = function div(value) {
      if (typeof value === 'number') return this.divS(value);
      return this.divM(value);
    };

    AbstractMatrix.prototype.divS = function divS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.divM = function divM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.div = function div(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.div(value);
    };

    AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
    AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
    AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
    AbstractMatrix.divide = AbstractMatrix.div;

    AbstractMatrix.prototype.mod = function mod(value) {
      if (typeof value === 'number') return this.modS(value);
      return this.modM(value);
    };

    AbstractMatrix.prototype.modS = function modS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.modM = function modM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mod = function mod(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.mod(value);
    };

    AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
    AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
    AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
    AbstractMatrix.modulus = AbstractMatrix.mod;

    AbstractMatrix.prototype.and = function and(value) {
      if (typeof value === 'number') return this.andS(value);
      return this.andM(value);
    };

    AbstractMatrix.prototype.andS = function andS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.andM = function andM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.and = function and(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.and(value);
    };

    AbstractMatrix.prototype.or = function or(value) {
      if (typeof value === 'number') return this.orS(value);
      return this.orM(value);
    };

    AbstractMatrix.prototype.orS = function orS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.orM = function orM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.or = function or(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.or(value);
    };

    AbstractMatrix.prototype.xor = function xor(value) {
      if (typeof value === 'number') return this.xorS(value);
      return this.xorM(value);
    };

    AbstractMatrix.prototype.xorS = function xorS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.xorM = function xorM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.xor = function xor(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.xor(value);
    };

    AbstractMatrix.prototype.leftShift = function leftShift(value) {
      if (typeof value === 'number') return this.leftShiftS(value);
      return this.leftShiftM(value);
    };

    AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.leftShift = function leftShift(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.leftShift(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
      if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
      return this.signPropagatingRightShiftM(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.signPropagatingRightShift(value);
    };

    AbstractMatrix.prototype.rightShift = function rightShift(value) {
      if (typeof value === 'number') return this.rightShiftS(value);
      return this.rightShiftM(value);
    };

    AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.rightShift = function rightShift(matrix, value) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.rightShift(value);
    };

    AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
    AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
    AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
    AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

    AbstractMatrix.prototype.not = function not() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, ~this.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.not = function not(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.not();
    };

    AbstractMatrix.prototype.abs = function abs() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.abs(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.abs = function abs(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.abs();
    };

    AbstractMatrix.prototype.acos = function acos() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acos = function acos(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.acos();
    };

    AbstractMatrix.prototype.acosh = function acosh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acosh = function acosh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.acosh();
    };

    AbstractMatrix.prototype.asin = function asin() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asin = function asin(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.asin();
    };

    AbstractMatrix.prototype.asinh = function asinh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asinh = function asinh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.asinh();
    };

    AbstractMatrix.prototype.atan = function atan() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atan = function atan(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.atan();
    };

    AbstractMatrix.prototype.atanh = function atanh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atanh = function atanh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.atanh();
    };

    AbstractMatrix.prototype.cbrt = function cbrt() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cbrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cbrt = function cbrt(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.cbrt();
    };

    AbstractMatrix.prototype.ceil = function ceil() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.ceil(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.ceil = function ceil(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.ceil();
    };

    AbstractMatrix.prototype.clz32 = function clz32() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.clz32(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.clz32 = function clz32(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.clz32();
    };

    AbstractMatrix.prototype.cos = function cos() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cos = function cos(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.cos();
    };

    AbstractMatrix.prototype.cosh = function cosh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cosh = function cosh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.cosh();
    };

    AbstractMatrix.prototype.exp = function exp() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.exp(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.exp = function exp(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.exp();
    };

    AbstractMatrix.prototype.expm1 = function expm1() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.expm1(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.expm1 = function expm1(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.expm1();
    };

    AbstractMatrix.prototype.floor = function floor() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.floor(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.floor = function floor(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.floor();
    };

    AbstractMatrix.prototype.fround = function fround() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.fround(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.fround = function fround(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.fround();
    };

    AbstractMatrix.prototype.log = function log() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log = function log(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.log();
    };

    AbstractMatrix.prototype.log1p = function log1p() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log1p(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log1p = function log1p(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.log1p();
    };

    AbstractMatrix.prototype.log10 = function log10() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log10(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log10 = function log10(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.log10();
    };

    AbstractMatrix.prototype.log2 = function log2() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log2(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log2 = function log2(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.log2();
    };

    AbstractMatrix.prototype.round = function round() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.round(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.round = function round(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.round();
    };

    AbstractMatrix.prototype.sign = function sign() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sign(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sign = function sign(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.sign();
    };

    AbstractMatrix.prototype.sin = function sin() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sin = function sin(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.sin();
    };

    AbstractMatrix.prototype.sinh = function sinh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sinh = function sinh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.sinh();
    };

    AbstractMatrix.prototype.sqrt = function sqrt() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sqrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sqrt = function sqrt(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.sqrt();
    };

    AbstractMatrix.prototype.tan = function tan() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tan = function tan(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.tan();
    };

    AbstractMatrix.prototype.tanh = function tanh() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tanh = function tanh(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.tanh();
    };

    AbstractMatrix.prototype.trunc = function trunc() {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.trunc(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.trunc = function trunc(matrix) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.trunc();
    };

    AbstractMatrix.pow = function pow(matrix, arg0) {
      var newMatrix = new Matrix(matrix);
      return newMatrix.pow(arg0);
    };

    AbstractMatrix.prototype.pow = function pow(value) {
      if (typeof value === 'number') return this.powS(value);
      return this.powM(value);
    };

    AbstractMatrix.prototype.powS = function powS(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), value));
        }
      }

      return this;
    };

    AbstractMatrix.prototype.powM = function powM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
        }
      }

      return this;
    };
  }

  class AbstractMatrix {
    static from1DArray(newRows, newColumns, newData) {
      var length = newRows * newColumns;

      if (length !== newData.length) {
        throw new RangeError('data length does not match given dimensions');
      }

      var newMatrix = new Matrix(newRows, newColumns);

      for (var row = 0; row < newRows; row++) {
        for (var column = 0; column < newColumns; column++) {
          newMatrix.set(row, column, newData[row * newColumns + column]);
        }
      }

      return newMatrix;
    }

    static rowVector(newData) {
      var vector = new Matrix(1, newData.length);

      for (var i = 0; i < newData.length; i++) {
        vector.set(0, i, newData[i]);
      }

      return vector;
    }

    static columnVector(newData) {
      var vector = new Matrix(newData.length, 1);

      for (var i = 0; i < newData.length; i++) {
        vector.set(i, 0, newData[i]);
      }

      return vector;
    }

    static zeros(rows, columns) {
      return new Matrix(rows, columns);
    }

    static ones(rows, columns) {
      return new Matrix(rows, columns).fill(1);
    }

    static rand(rows, columns) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        random = Math.random
      } = options;
      var matrix = new Matrix(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          matrix.set(i, j, random());
        }
      }

      return matrix;
    }

    static randInt(rows, columns) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1000,
        random = Math.random
      } = options;
      if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
      if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
      if (min >= max) throw new RangeError('min must be smaller than max');
      var interval = max - min;
      var matrix = new Matrix(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          var value = min + Math.round(random() * interval);
          matrix.set(i, j, value);
        }
      }

      return matrix;
    }

    static eye(rows, columns, value) {
      if (columns === undefined) columns = rows;
      if (value === undefined) value = 1;
      var min = Math.min(rows, columns);
      var matrix = this.zeros(rows, columns);

      for (var i = 0; i < min; i++) {
        matrix.set(i, i, value);
      }

      return matrix;
    }

    static diag(data, rows, columns) {
      var l = data.length;
      if (rows === undefined) rows = l;
      if (columns === undefined) columns = rows;
      var min = Math.min(l, rows, columns);
      var matrix = this.zeros(rows, columns);

      for (var i = 0; i < min; i++) {
        matrix.set(i, i, data[i]);
      }

      return matrix;
    }

    static min(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      var rows = matrix1.rows;
      var columns = matrix1.columns;
      var result = new Matrix(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static max(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      var rows = matrix1.rows;
      var columns = matrix1.columns;
      var result = new this(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static checkMatrix(value) {
      return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
    }

    static isMatrix(value) {
      return value != null && value.klass === 'Matrix';
    }

    get size() {
      return this.rows * this.columns;
    }

    apply(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          callback.call(this, i, j);
        }
      }

      return this;
    }

    to1DArray() {
      var array = [];

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          array.push(this.get(i, j));
        }
      }

      return array;
    }

    to2DArray() {
      var copy = [];

      for (var i = 0; i < this.rows; i++) {
        copy.push([]);

        for (var j = 0; j < this.columns; j++) {
          copy[i].push(this.get(i, j));
        }
      }

      return copy;
    }

    toJSON() {
      return this.to2DArray();
    }

    isRowVector() {
      return this.rows === 1;
    }

    isColumnVector() {
      return this.columns === 1;
    }

    isVector() {
      return this.rows === 1 || this.columns === 1;
    }

    isSquare() {
      return this.rows === this.columns;
    }

    isSymmetric() {
      if (this.isSquare()) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j <= i; j++) {
            if (this.get(i, j) !== this.get(j, i)) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }

    isEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isEchelonForm = true;
      let checked = false;

      while (i < this.rows && isEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isEchelonForm = false;
            checked = true;
          }
        }

        i++;
      }

      return isEchelonForm;
    }

    isReducedEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isReducedEchelonForm = true;
      let checked = false;

      while (i < this.rows && isReducedEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isReducedEchelonForm = false;
            checked = true;
          }
        }

        for (let k = j + 1; k < this.rows; k++) {
          if (this.get(i, k) !== 0) {
            isReducedEchelonForm = false;
          }
        }

        i++;
      }

      return isReducedEchelonForm;
    }

    echelonForm() {
      let result = this.clone();
      let h = 0;
      let k = 0;

      while (h < result.rows && k < result.columns) {
        let iMax = h;

        for (let i = h; i < result.rows; i++) {
          if (result.get(i, k) > result.get(iMax, k)) {
            iMax = i;
          }
        }

        if (result.get(iMax, k) === 0) {
          k++;
        } else {
          result.swapRows(h, iMax);
          let tmp = result.get(h, k);

          for (let j = k; j < result.columns; j++) {
            result.set(h, j, result.get(h, j) / tmp);
          }

          for (let i = h + 1; i < result.rows; i++) {
            let factor = result.get(i, k) / result.get(h, k);
            result.set(i, k, 0);

            for (let j = k + 1; j < result.columns; j++) {
              result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
            }
          }

          h++;
          k++;
        }
      }

      return result;
    }

    reducedEchelonForm() {
      let result = this.echelonForm();
      let m = result.columns;
      let n = result.rows;
      let h = n - 1;

      while (h >= 0) {
        if (result.maxRow(h) === 0) {
          h--;
        } else {
          let p = 0;
          let pivot = false;

          while (p < n && pivot === false) {
            if (result.get(h, p) === 1) {
              pivot = true;
            } else {
              p++;
            }
          }

          for (let i = 0; i < h; i++) {
            let factor = result.get(i, p);

            for (let j = p; j < m; j++) {
              let tmp = result.get(i, j) - factor * result.get(h, j);
              result.set(i, j, tmp);
            }
          }

          h--;
        }
      }

      return result;
    }

    set() {
      throw new Error('set method is unimplemented');
    }

    get() {
      throw new Error('get method is unimplemented');
    }

    repeat() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        rows = 1,
        columns = 1
      } = options;

      if (!Number.isInteger(rows) || rows <= 0) {
        throw new TypeError('rows must be a positive integer');
      }

      if (!Number.isInteger(columns) || columns <= 0) {
        throw new TypeError('columns must be a positive integer');
      }

      var matrix = new Matrix(this.rows * rows, this.columns * columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          matrix.setSubMatrix(this, this.rows * i, this.columns * j);
        }
      }

      return matrix;
    }

    fill(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, value);
        }
      }

      return this;
    }

    neg() {
      return this.mulS(-1);
    }

    getRow(index) {
      checkRowIndex(this, index);
      var row = [];

      for (var i = 0; i < this.columns; i++) {
        row.push(this.get(index, i));
      }

      return row;
    }

    getRowVector(index) {
      return Matrix.rowVector(this.getRow(index));
    }

    setRow(index, array) {
      checkRowIndex(this, index);
      array = checkRowVector(this, array);

      for (var i = 0; i < this.columns; i++) {
        this.set(index, i, array[i]);
      }

      return this;
    }

    swapRows(row1, row2) {
      checkRowIndex(this, row1);
      checkRowIndex(this, row2);

      for (var i = 0; i < this.columns; i++) {
        var temp = this.get(row1, i);
        this.set(row1, i, this.get(row2, i));
        this.set(row2, i, temp);
      }

      return this;
    }

    getColumn(index) {
      checkColumnIndex(this, index);
      var column = [];

      for (var i = 0; i < this.rows; i++) {
        column.push(this.get(i, index));
      }

      return column;
    }

    getColumnVector(index) {
      return Matrix.columnVector(this.getColumn(index));
    }

    setColumn(index, array) {
      checkColumnIndex(this, index);
      array = checkColumnVector(this, array);

      for (var i = 0; i < this.rows; i++) {
        this.set(i, index, array[i]);
      }

      return this;
    }

    swapColumns(column1, column2) {
      checkColumnIndex(this, column1);
      checkColumnIndex(this, column2);

      for (var i = 0; i < this.rows; i++) {
        var temp = this.get(i, column1);
        this.set(i, column1, this.get(i, column2));
        this.set(i, column2, temp);
      }

      return this;
    }

    addRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[j]);
        }
      }

      return this;
    }

    subRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[j]);
        }
      }

      return this;
    }

    mulRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[j]);
        }
      }

      return this;
    }

    divRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[j]);
        }
      }

      return this;
    }

    addColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[i]);
        }
      }

      return this;
    }

    subColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[i]);
        }
      }

      return this;
    }

    mulColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[i]);
        }
      }

      return this;
    }

    divColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[i]);
        }
      }

      return this;
    }

    mulRow(index, value) {
      checkRowIndex(this, index);

      for (var i = 0; i < this.columns; i++) {
        this.set(index, i, this.get(index, i) * value);
      }

      return this;
    }

    mulColumn(index, value) {
      checkColumnIndex(this, index);

      for (var i = 0; i < this.rows; i++) {
        this.set(i, index, this.get(i, index) * value);
      }

      return this;
    }

    max() {
      var v = this.get(0, 0);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    maxIndex() {
      var v = this.get(0, 0);
      var idx = [0, 0];

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    min() {
      var v = this.get(0, 0);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    minIndex() {
      var v = this.get(0, 0);
      var idx = [0, 0];

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    maxRow(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    maxRowIndex(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);
      var idx = [row, 0];

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    minRow(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    minRowIndex(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);
      var idx = [row, 0];

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    maxColumn(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    maxColumnIndex(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);
      var idx = [0, column];

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    minColumn(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    minColumnIndex(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);
      var idx = [0, column];

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    diag() {
      var min = Math.min(this.rows, this.columns);
      var diag = [];

      for (var i = 0; i < min; i++) {
        diag.push(this.get(i, i));
      }

      return diag;
    }

    norm() {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'frobenius';
      var result = 0;

      if (type === 'max') {
        return this.max();
      } else if (type === 'frobenius') {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.columns; j++) {
            result = result + this.get(i, j) * this.get(i, j);
          }
        }

        return Math.sqrt(result);
      } else {
        throw new RangeError("unknown norm type: ".concat(type));
      }
    }

    cumulativeSum() {
      var sum = 0;

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          sum += this.get(i, j);
          this.set(i, j, sum);
        }
      }

      return this;
    }

    dot(vector2) {
      if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
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

    mmul(other) {
      other = Matrix.checkMatrix(other);
      var m = this.rows;
      var n = this.columns;
      var p = other.columns;
      var result = new Matrix(m, p);
      var Bcolj = new Float64Array(n);

      for (var j = 0; j < p; j++) {
        for (var k = 0; k < n; k++) {
          Bcolj[k] = other.get(k, j);
        }

        for (var i = 0; i < m; i++) {
          var s = 0;

          for (k = 0; k < n; k++) {
            s += this.get(i, k) * Bcolj[k];
          }

          result.set(i, j, s);
        }
      }

      return result;
    }

    strassen2x2(other) {
      other = Matrix.checkMatrix(other);
      var result = new Matrix(2, 2);
      const a11 = this.get(0, 0);
      const b11 = other.get(0, 0);
      const a12 = this.get(0, 1);
      const b12 = other.get(0, 1);
      const a21 = this.get(1, 0);
      const b21 = other.get(1, 0);
      const a22 = this.get(1, 1);
      const b22 = other.get(1, 1); // Compute intermediate values.

      const m1 = (a11 + a22) * (b11 + b22);
      const m2 = (a21 + a22) * b11;
      const m3 = a11 * (b12 - b22);
      const m4 = a22 * (b21 - b11);
      const m5 = (a11 + a12) * b22;
      const m6 = (a21 - a11) * (b11 + b12);
      const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

      const c00 = m1 + m4 - m5 + m7;
      const c01 = m3 + m5;
      const c10 = m2 + m4;
      const c11 = m1 - m2 + m3 + m6;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      return result;
    }

    strassen3x3(other) {
      other = Matrix.checkMatrix(other);
      var result = new Matrix(3, 3);
      const a00 = this.get(0, 0);
      const a01 = this.get(0, 1);
      const a02 = this.get(0, 2);
      const a10 = this.get(1, 0);
      const a11 = this.get(1, 1);
      const a12 = this.get(1, 2);
      const a20 = this.get(2, 0);
      const a21 = this.get(2, 1);
      const a22 = this.get(2, 2);
      const b00 = other.get(0, 0);
      const b01 = other.get(0, 1);
      const b02 = other.get(0, 2);
      const b10 = other.get(1, 0);
      const b11 = other.get(1, 1);
      const b12 = other.get(1, 2);
      const b20 = other.get(2, 0);
      const b21 = other.get(2, 1);
      const b22 = other.get(2, 2);
      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
      const m2 = (a00 - a10) * (-b01 + b11);
      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
      const m5 = (a10 + a11) * (-b00 + b01);
      const m6 = a00 * b00;
      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
      const m8 = (-a00 + a20) * (b02 - b12);
      const m9 = (a20 + a21) * (-b00 + b02);
      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
      const m13 = (a02 - a22) * (b11 - b21);
      const m14 = a02 * b20;
      const m15 = (a21 + a22) * (-b20 + b21);
      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
      const m17 = (a02 - a12) * (b12 - b22);
      const m18 = (a11 + a12) * (-b20 + b22);
      const m19 = a01 * b10;
      const m20 = a12 * b21;
      const m21 = a10 * b02;
      const m22 = a20 * b01;
      const m23 = a22 * b22;
      const c00 = m6 + m14 + m19;
      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
      const c11 = m2 + m4 + m5 + m6 + m20;
      const c12 = m14 + m16 + m17 + m18 + m21;
      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
      const c21 = m12 + m13 + m14 + m15 + m22;
      const c22 = m6 + m7 + m8 + m9 + m23;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(0, 2, c02);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      result.set(1, 2, c12);
      result.set(2, 0, c20);
      result.set(2, 1, c21);
      result.set(2, 2, c22);
      return result;
    }

    mmulStrassen(y) {
      y = Matrix.checkMatrix(y);
      var x = this.clone();
      var r1 = x.rows;
      var c1 = x.columns;
      var r2 = y.rows;
      var c2 = y.columns;

      if (c1 !== r2) {
        // eslint-disable-next-line no-console
        console.warn("Multiplying ".concat(r1, " x ").concat(c1, " and ").concat(r2, " x ").concat(c2, " matrix: dimensions do not match."));
      } // Put a matrix into the top left of a matrix of zeros.
      // `rows` and `cols` are the dimensions of the output matrix.


      function embed(mat, rows, cols) {
        var r = mat.rows;
        var c = mat.columns;

        if (r === rows && c === cols) {
          return mat;
        } else {
          var resultat = AbstractMatrix.zeros(rows, cols);
          resultat = resultat.setSubMatrix(mat, 0, 0);
          return resultat;
        }
      } // Make sure both matrices are the same size.
      // This is exclusively for simplicity:
      // this algorithm can be implemented with matrices of different sizes.


      var r = Math.max(r1, r2);
      var c = Math.max(c1, c2);
      x = embed(x, r, c);
      y = embed(y, r, c); // Our recursive multiplication function.

      function blockMult(a, b, rows, cols) {
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512) {
          return a.mmul(b); // a is equivalent to this
        } // Apply dynamic padding.


        if (rows % 2 === 1 && cols % 2 === 1) {
          a = embed(a, rows + 1, cols + 1);
          b = embed(b, rows + 1, cols + 1);
        } else if (rows % 2 === 1) {
          a = embed(a, rows + 1, cols);
          b = embed(b, rows + 1, cols);
        } else if (cols % 2 === 1) {
          a = embed(a, rows, cols + 1);
          b = embed(b, rows, cols + 1);
        }

        var halfRows = parseInt(a.rows / 2, 10);
        var halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

        var a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        var b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        var a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
        var b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
        var a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
        var b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
        var a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
        var b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

        var m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
        var m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
        var m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
        var m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
        var m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
        var m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
        var m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

        var c11 = AbstractMatrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        var c12 = AbstractMatrix.add(m3, m5);
        var c21 = AbstractMatrix.add(m2, m4);
        var c22 = AbstractMatrix.sub(m1, m2);
        c22.add(m3);
        c22.add(m6); // Crop output to the desired size (undo dynamic padding).

        var resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0);
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
      }

      return blockMult(x, y, r, c);
    }

    scaleRows() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      var newMatrix = new Matrix(this.rows, this.columns);

      for (var i = 0; i < this.rows; i++) {
        const row = this.getRow(i);
        rescale(row, {
          min,
          max,
          output: row
        });
        newMatrix.setRow(i, row);
      }

      return newMatrix;
    }

    scaleColumns() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      var newMatrix = new Matrix(this.rows, this.columns);

      for (var i = 0; i < this.columns; i++) {
        const column = this.getColumn(i);
        rescale(column, {
          min: min,
          max: max,
          output: column
        });
        newMatrix.setColumn(i, column);
      }

      return newMatrix;
    }

    flipRows() {
      const middle = Math.ceil(this.columns / 2);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < middle; j++) {
          var first = this.get(i, j);
          var last = this.get(i, this.columns - 1 - j);
          this.set(i, j, last);
          this.set(i, this.columns - 1 - j, first);
        }
      }

      return this;
    }

    flipColumns() {
      const middle = Math.ceil(this.rows / 2);

      for (var j = 0; j < this.columns; j++) {
        for (var i = 0; i < middle; i++) {
          var first = this.get(i, j);
          var last = this.get(this.rows - 1 - i, j);
          this.set(i, j, last);
          this.set(this.rows - 1 - i, j, first);
        }
      }

      return this;
    }

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
              result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
            }
          }
        }
      }

      return result;
    }

    transpose() {
      var result = new Matrix(this.columns, this.rows);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          result.set(j, i, this.get(i, j));
        }
      }

      return result;
    }

    sortRows() {
      let compareFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : compareNumbers;

      for (var i = 0; i < this.rows; i++) {
        this.setRow(i, this.getRow(i).sort(compareFunction));
      }

      return this;
    }

    sortColumns() {
      let compareFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : compareNumbers;

      for (var i = 0; i < this.columns; i++) {
        this.setColumn(i, this.getColumn(i).sort(compareFunction));
      }

      return this;
    }

    subMatrix(startRow, endRow, startColumn, endColumn) {
      checkRange(this, startRow, endRow, startColumn, endColumn);
      var newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);

      for (var i = startRow; i <= endRow; i++) {
        for (var j = startColumn; j <= endColumn; j++) {
          newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
        }
      }

      return newMatrix;
    }

    subMatrixRow(indices, startColumn, endColumn) {
      if (startColumn === undefined) startColumn = 0;
      if (endColumn === undefined) endColumn = this.columns - 1;

      if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
        throw new RangeError('Argument out of range');
      }

      var newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);

      for (var i = 0; i < indices.length; i++) {
        for (var j = startColumn; j <= endColumn; j++) {
          if (indices[i] < 0 || indices[i] >= this.rows) {
            throw new RangeError("Row index out of range: ".concat(indices[i]));
          }

          newMatrix.set(i, j - startColumn, this.get(indices[i], j));
        }
      }

      return newMatrix;
    }

    subMatrixColumn(indices, startRow, endRow) {
      if (startRow === undefined) startRow = 0;
      if (endRow === undefined) endRow = this.rows - 1;

      if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
        throw new RangeError('Argument out of range');
      }

      var newMatrix = new Matrix(endRow - startRow + 1, indices.length);

      for (var i = 0; i < indices.length; i++) {
        for (var j = startRow; j <= endRow; j++) {
          if (indices[i] < 0 || indices[i] >= this.columns) {
            throw new RangeError("Column index out of range: ".concat(indices[i]));
          }

          newMatrix.set(j - startRow, i, this.get(j, indices[i]));
        }
      }

      return newMatrix;
    }

    setSubMatrix(matrix, startRow, startColumn) {
      matrix = Matrix.checkMatrix(matrix);
      var endRow = startRow + matrix.rows - 1;
      var endColumn = startColumn + matrix.columns - 1;
      checkRange(this, startRow, endRow, startColumn, endColumn);

      for (var i = 0; i < matrix.rows; i++) {
        for (var j = 0; j < matrix.columns; j++) {
          this.set(startRow + i, startColumn + j, matrix.get(i, j));
        }
      }

      return this;
    }

    selection(rowIndices, columnIndices) {
      var indices = checkIndices(this, rowIndices, columnIndices);
      var newMatrix = new Matrix(rowIndices.length, columnIndices.length);

      for (var i = 0; i < indices.row.length; i++) {
        var rowIndex = indices.row[i];

        for (var j = 0; j < indices.column.length; j++) {
          var columnIndex = indices.column[j];
          newMatrix.set(i, j, this.get(rowIndex, columnIndex));
        }
      }

      return newMatrix;
    }

    trace() {
      var min = Math.min(this.rows, this.columns);
      var trace = 0;

      for (var i = 0; i < min; i++) {
        trace += this.get(i, i);
      }

      return trace;
    }

    clone() {
      var newMatrix = new Matrix(this.rows, this.columns);

      for (var row = 0; row < this.rows; row++) {
        for (var column = 0; column < this.columns; column++) {
          newMatrix.set(row, column, this.get(row, column));
        }
      }

      return newMatrix;
    }

    sum(by) {
      switch (by) {
        case 'row':
          return sumByRow(this);

        case 'column':
          return sumByColumn(this);

        case undefined:
          return sumAll(this);

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

    product(by) {
      switch (by) {
        case 'row':
          return productByRow(this);

        case 'column':
          return productByColumn(this);

        case undefined:
          return productAll(this);

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

    mean(by) {
      const sum = this.sum(by);

      switch (by) {
        case 'row':
          {
            for (let i = 0; i < this.rows; i++) {
              sum[i] /= this.columns;
            }

            return sum;
          }

        case 'column':
          {
            for (let i = 0; i < this.columns; i++) {
              sum[i] /= this.rows;
            }

            return sum;
          }

        case undefined:
          return sum / this.size;

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

    variance(by) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        unbiased = true,
        mean = this.mean(by)
      } = options;

      if (typeof unbiased !== 'boolean') {
        throw new TypeError('unbiased must be a boolean');
      }

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByRow(this, unbiased, mean);
          }

        case 'column':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByColumn(this, unbiased, mean);
          }

        case undefined:
          {
            if (typeof mean !== 'number') {
              throw new TypeError('mean must be a number');
            }

            return varianceAll(this, unbiased, mean);
          }

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

    standardDeviation(by, options) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      const variance = this.variance(by, options);

      if (by === undefined) {
        return Math.sqrt(variance);
      } else {
        for (var i = 0; i < variance.length; i++) {
          variance[i] = Math.sqrt(variance[i]);
        }

        return variance;
      }
    }

    center(by) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        center = this.mean(by)
      } = options;

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByRow(this, center);
            return this;
          }

        case 'column':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByColumn(this, center);
            return this;
          }

        case undefined:
          {
            if (typeof center !== 'number') {
              throw new TypeError('center must be a number');
            }

            centerAll(this, center);
            return this;
          }

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

    scale(by) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      let scale = options.scale;

      switch (by) {
        case 'row':
          {
            if (scale === undefined) {
              scale = getScaleByRow(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByRow(this, scale);
            return this;
          }

        case 'column':
          {
            if (scale === undefined) {
              scale = getScaleByColumn(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByColumn(this, scale);
            return this;
          }

        case undefined:
          {
            if (scale === undefined) {
              scale = getScaleAll(this);
            } else if (typeof scale !== 'number') {
              throw new TypeError('scale must be a number');
            }

            scaleAll(this, scale);
            return this;
          }

        default:
          throw new Error("invalid option: ".concat(by));
      }
    }

  }
  AbstractMatrix.prototype.klass = 'Matrix';

  if (typeof Symbol !== 'undefined') {
    AbstractMatrix.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspectMatrix;
  }

  function compareNumbers(a, b) {
    return a - b;
  } // Synonyms


  AbstractMatrix.random = AbstractMatrix.rand;
  AbstractMatrix.randomInt = AbstractMatrix.randInt;
  AbstractMatrix.diagonal = AbstractMatrix.diag;
  AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
  AbstractMatrix.identity = AbstractMatrix.eye;
  AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
  AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
  class Matrix extends AbstractMatrix {
    constructor(nRows, nColumns) {
      super();

      if (Matrix.isMatrix(nRows)) {
        return nRows.clone();
      } else if (Number.isInteger(nRows) && nRows > 0) {
        // Create an empty matrix
        this.data = [];

        if (Number.isInteger(nColumns) && nColumns > 0) {
          for (let i = 0; i < nRows; i++) {
            this.data.push(new Float64Array(nColumns));
          }
        } else {
          throw new TypeError('nColumns must be a positive integer');
        }
      } else if (Array.isArray(nRows)) {
        // Copy the values from the 2D array
        const arrayData = nRows;
        nRows = arrayData.length;
        nColumns = arrayData[0].length;

        if (typeof nColumns !== 'number' || nColumns === 0) {
          throw new TypeError('Data must be a 2D array with at least one element');
        }

        this.data = [];

        for (let i = 0; i < nRows; i++) {
          if (arrayData[i].length !== nColumns) {
            throw new RangeError('Inconsistent array dimensions');
          }

          this.data.push(Float64Array.from(arrayData[i]));
        }
      } else {
        throw new TypeError('First argument must be a positive number or an array');
      }

      this.rows = nRows;
      this.columns = nColumns;
      return this;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

    removeRow(index) {
      checkRowIndex(this, index);

      if (this.rows === 1) {
        throw new RangeError('A matrix cannot have less than one row');
      }

      this.data.splice(index, 1);
      this.rows -= 1;
      return this;
    }

    addRow(index, array) {
      if (array === undefined) {
        array = index;
        index = this.rows;
      }

      checkRowIndex(this, index, true);
      array = Float64Array.from(checkRowVector(this, array));
      this.data.splice(index, 0, array);
      this.rows += 1;
      return this;
    }

    removeColumn(index) {
      checkColumnIndex(this, index);

      if (this.columns === 1) {
        throw new RangeError('A matrix cannot have less than one column');
      }

      for (var i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns - 1);

        for (let j = 0; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        for (let j = index + 1; j < this.columns; j++) {
          newRow[j - 1] = this.data[i][j];
        }

        this.data[i] = newRow;
      }

      this.columns -= 1;
      return this;
    }

    addColumn(index, array) {
      if (typeof array === 'undefined') {
        array = index;
        index = this.columns;
      }

      checkColumnIndex(this, index, true);
      array = checkColumnVector(this, array);

      for (var i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns + 1);
        let j = 0;

        for (; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        newRow[j++] = array[i];

        for (; j < this.columns + 1; j++) {
          newRow[j] = this.data[i][j - 1];
        }

        this.data[i] = newRow;
      }

      this.columns += 1;
      return this;
    }

  }
  installMathOperations(AbstractMatrix, Matrix);

  class BaseView extends AbstractMatrix {
    constructor(matrix, rows, columns) {
      super();
      this.matrix = matrix;
      this.rows = rows;
      this.columns = columns;
    }

  }

  class MatrixColumnView extends BaseView {
    constructor(matrix, column) {
      checkColumnIndex(matrix, column);
      super(matrix, matrix.rows, 1);
      this.column = column;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(rowIndex, this.column, value);
      return this;
    }

    get(rowIndex) {
      return this.matrix.get(rowIndex, this.column);
    }

  }

  class MatrixColumnSelectionView extends BaseView {
    constructor(matrix, columnIndices) {
      columnIndices = checkColumnIndices(matrix, columnIndices);
      super(matrix, matrix.rows, columnIndices.length);
      this.columnIndices = columnIndices;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
    }

  }

  class MatrixFlipColumnView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.rows, matrix.columns);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
    }

  }

  class MatrixFlipRowView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.rows, matrix.columns);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
    }

  }

  class MatrixRowView extends BaseView {
    constructor(matrix, row) {
      checkRowIndex(matrix, row);
      super(matrix, 1, matrix.columns);
      this.row = row;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(this.row, columnIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(this.row, columnIndex);
    }

  }

  class MatrixRowSelectionView extends BaseView {
    constructor(matrix, rowIndices) {
      rowIndices = checkRowIndices(matrix, rowIndices);
      super(matrix, rowIndices.length, matrix.columns);
      this.rowIndices = rowIndices;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
    }

  }

  class MatrixSelectionView extends BaseView {
    constructor(matrix, rowIndices, columnIndices) {
      var indices = checkIndices(matrix, rowIndices, columnIndices);
      super(matrix, indices.row.length, indices.column.length);
      this.rowIndices = indices.row;
      this.columnIndices = indices.column;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
    }

  }

  class MatrixSubView extends BaseView {
    constructor(matrix, startRow, endRow, startColumn, endColumn) {
      checkRange(matrix, startRow, endRow, startColumn, endColumn);
      super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
      this.startRow = startRow;
      this.startColumn = startColumn;
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(this.startRow + rowIndex, this.startColumn + columnIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(this.startRow + rowIndex, this.startColumn + columnIndex);
    }

  }

  class MatrixTransposeView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.columns, matrix.rows);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(columnIndex, rowIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(columnIndex, rowIndex);
    }

  }

  class WrapperMatrix1D extends AbstractMatrix {
    constructor(data) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        rows = 1
      } = options;

      if (data.length % rows !== 0) {
        throw new Error('the data length is not divisible by the number of rows');
      }

      super();
      this.rows = rows;
      this.columns = data.length / rows;
      this.data = data;
    }

    set(rowIndex, columnIndex, value) {
      var index = this._calculateIndex(rowIndex, columnIndex);

      this.data[index] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      var index = this._calculateIndex(rowIndex, columnIndex);

      return this.data[index];
    }

    _calculateIndex(row, column) {
      return row * this.columns + column;
    }

  }

  class WrapperMatrix2D extends AbstractMatrix {
    constructor(data) {
      super();
      this.data = data;
      this.rows = data.length;
      this.columns = data[0].length;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

  }

  function wrap(array, options) {
    if (Array.isArray(array)) {
      if (array[0] && Array.isArray(array[0])) {
        return new WrapperMatrix2D(array);
      } else {
        return new WrapperMatrix1D(array, options);
      }
    } else {
      throw new Error('the argument is not an array');
    }
  }

  class LuDecomposition {
    constructor(matrix) {
      matrix = WrapperMatrix2D.checkMatrix(matrix);
      var lu = matrix.clone();
      var rows = lu.rows;
      var columns = lu.columns;
      var pivotVector = new Float64Array(rows);
      var pivotSign = 1;
      var i, j, k, p, s, t, v;
      var LUcolj, kmax;

      for (i = 0; i < rows; i++) {
        pivotVector[i] = i;
      }

      LUcolj = new Float64Array(rows);

      for (j = 0; j < columns; j++) {
        for (i = 0; i < rows; i++) {
          LUcolj[i] = lu.get(i, j);
        }

        for (i = 0; i < rows; i++) {
          kmax = Math.min(i, j);
          s = 0;

          for (k = 0; k < kmax; k++) {
            s += lu.get(i, k) * LUcolj[k];
          }

          LUcolj[i] -= s;
          lu.set(i, j, LUcolj[i]);
        }

        p = j;

        for (i = j + 1; i < rows; i++) {
          if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
            p = i;
          }
        }

        if (p !== j) {
          for (k = 0; k < columns; k++) {
            t = lu.get(p, k);
            lu.set(p, k, lu.get(j, k));
            lu.set(j, k, t);
          }

          v = pivotVector[p];
          pivotVector[p] = pivotVector[j];
          pivotVector[j] = v;
          pivotSign = -pivotSign;
        }

        if (j < rows && lu.get(j, j) !== 0) {
          for (i = j + 1; i < rows; i++) {
            lu.set(i, j, lu.get(i, j) / lu.get(j, j));
          }
        }
      }

      this.LU = lu;
      this.pivotVector = pivotVector;
      this.pivotSign = pivotSign;
    }

    isSingular() {
      var data = this.LU;
      var col = data.columns;

      for (var j = 0; j < col; j++) {
        if (data.get(j, j) === 0) {
          return true;
        }
      }

      return false;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      var lu = this.LU;
      var rows = lu.rows;

      if (rows !== value.rows) {
        throw new Error('Invalid matrix dimensions');
      }

      if (this.isSingular()) {
        throw new Error('LU matrix is singular');
      }

      var count = value.columns;
      var X = value.subMatrixRow(this.pivotVector, 0, count - 1);
      var columns = lu.columns;
      var i, j, k;

      for (k = 0; k < columns; k++) {
        for (i = k + 1; i < columns; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      for (k = columns - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / lu.get(k, k));
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      return X;
    }

    get determinant() {
      var data = this.LU;

      if (!data.isSquare()) {
        throw new Error('Matrix must be square');
      }

      var determinant = this.pivotSign;
      var col = data.columns;

      for (var j = 0; j < col; j++) {
        determinant *= data.get(j, j);
      }

      return determinant;
    }

    get lowerTriangularMatrix() {
      var data = this.LU;
      var rows = data.rows;
      var columns = data.columns;
      var X = new Matrix(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          if (i > j) {
            X.set(i, j, data.get(i, j));
          } else if (i === j) {
            X.set(i, j, 1);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get upperTriangularMatrix() {
      var data = this.LU;
      var rows = data.rows;
      var columns = data.columns;
      var X = new Matrix(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          if (i <= j) {
            X.set(i, j, data.get(i, j));
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }

  }

  function hypotenuse(a, b) {
    var r = 0;

    if (Math.abs(a) > Math.abs(b)) {
      r = b / a;
      return Math.abs(a) * Math.sqrt(1 + r * r);
    }

    if (b !== 0) {
      r = a / b;
      return Math.abs(b) * Math.sqrt(1 + r * r);
    }

    return 0;
  }

  class QrDecomposition {
    constructor(value) {
      value = WrapperMatrix2D.checkMatrix(value);
      var qr = value.clone();
      var m = value.rows;
      var n = value.columns;
      var rdiag = new Float64Array(n);
      var i, j, k, s;

      for (k = 0; k < n; k++) {
        var nrm = 0;

        for (i = k; i < m; i++) {
          nrm = hypotenuse(nrm, qr.get(i, k));
        }

        if (nrm !== 0) {
          if (qr.get(k, k) < 0) {
            nrm = -nrm;
          }

          for (i = k; i < m; i++) {
            qr.set(i, k, qr.get(i, k) / nrm);
          }

          qr.set(k, k, qr.get(k, k) + 1);

          for (j = k + 1; j < n; j++) {
            s = 0;

            for (i = k; i < m; i++) {
              s += qr.get(i, k) * qr.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < m; i++) {
              qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
            }
          }
        }

        rdiag[k] = -nrm;
      }

      this.QR = qr;
      this.Rdiag = rdiag;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      var qr = this.QR;
      var m = qr.rows;

      if (value.rows !== m) {
        throw new Error('Matrix row dimensions must agree');
      }

      if (!this.isFullRank()) {
        throw new Error('Matrix is rank deficient');
      }

      var count = value.columns;
      var X = value.clone();
      var n = qr.columns;
      var i, j, k, s;

      for (k = 0; k < n; k++) {
        for (j = 0; j < count; j++) {
          s = 0;

          for (i = k; i < m; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < m; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }

      for (k = n - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / this.Rdiag[k]);
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
          }
        }
      }

      return X.subMatrix(0, n - 1, 0, count - 1);
    }

    isFullRank() {
      var columns = this.QR.columns;

      for (var i = 0; i < columns; i++) {
        if (this.Rdiag[i] === 0) {
          return false;
        }
      }

      return true;
    }

    get upperTriangularMatrix() {
      var qr = this.QR;
      var n = qr.columns;
      var X = new Matrix(n, n);
      var i, j;

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i < j) {
            X.set(i, j, qr.get(i, j));
          } else if (i === j) {
            X.set(i, j, this.Rdiag[i]);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get orthogonalMatrix() {
      var qr = this.QR;
      var rows = qr.rows;
      var columns = qr.columns;
      var X = new Matrix(rows, columns);
      var i, j, k, s;

      for (k = columns - 1; k >= 0; k--) {
        for (i = 0; i < rows; i++) {
          X.set(i, k, 0);
        }

        X.set(k, k, 1);

        for (j = k; j < columns; j++) {
          if (qr.get(k, k) !== 0) {
            s = 0;

            for (i = k; i < rows; i++) {
              s += qr.get(i, k) * X.get(i, j);
            }

            s = -s / qr[k][k];

            for (i = k; i < rows; i++) {
              X.set(i, j, X.get(i, j) + s * qr.get(i, k));
            }
          }
        }
      }

      return X;
    }

  }

  class SingularValueDecomposition {
    constructor(value) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      value = WrapperMatrix2D.checkMatrix(value);
      var m = value.rows;
      var n = value.columns;
      const {
        computeLeftSingularVectors = true,
        computeRightSingularVectors = true,
        autoTranspose = false
      } = options;
      var wantu = Boolean(computeLeftSingularVectors);
      var wantv = Boolean(computeRightSingularVectors);
      var swapped = false;
      var a;

      if (m < n) {
        if (!autoTranspose) {
          a = value.clone(); // eslint-disable-next-line no-console

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

      var nu = Math.min(m, n);
      var ni = Math.min(m + 1, n);
      var s = new Float64Array(ni);
      var U = new Matrix(m, nu);
      var V = new Matrix(n, n);
      var e = new Float64Array(n);
      var work = new Float64Array(m);
      var si = new Float64Array(ni);

      for (let i = 0; i < ni; i++) si[i] = i;

      var nct = Math.min(m - 1, n);
      var nrt = Math.max(0, Math.min(n - 2, m));
      var mrc = Math.max(nct, nrt);

      for (let k = 0; k < mrc; k++) {
        if (k < nct) {
          s[k] = 0;

          for (let i = k; i < m; i++) {
            s[k] = hypotenuse(s[k], a.get(i, k));
          }

          if (s[k] !== 0) {
            if (a.get(k, k) < 0) {
              s[k] = -s[k];
            }

            for (let i = k; i < m; i++) {
              a.set(i, k, a.get(i, k) / s[k]);
            }

            a.set(k, k, a.get(k, k) + 1);
          }

          s[k] = -s[k];
        }

        for (let j = k + 1; j < n; j++) {
          if (k < nct && s[k] !== 0) {
            let t = 0;

            for (let i = k; i < m; i++) {
              t += a.get(i, k) * a.get(i, j);
            }

            t = -t / a.get(k, k);

            for (let i = k; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * a.get(i, k));
            }
          }

          e[j] = a.get(k, j);
        }

        if (wantu && k < nct) {
          for (let i = k; i < m; i++) {
            U.set(i, k, a.get(i, k));
          }
        }

        if (k < nrt) {
          e[k] = 0;

          for (let i = k + 1; i < n; i++) {
            e[k] = hypotenuse(e[k], e[i]);
          }

          if (e[k] !== 0) {
            if (e[k + 1] < 0) {
              e[k] = 0 - e[k];
            }

            for (let i = k + 1; i < n; i++) {
              e[i] /= e[k];
            }

            e[k + 1] += 1;
          }

          e[k] = -e[k];

          if (k + 1 < m && e[k] !== 0) {
            for (let i = k + 1; i < m; i++) {
              work[i] = 0;
            }

            for (let i = k + 1; i < m; i++) {
              for (let j = k + 1; j < n; j++) {
                work[i] += e[j] * a.get(i, j);
              }
            }

            for (let j = k + 1; j < n; j++) {
              let t = -e[j] / e[k + 1];

              for (let i = k + 1; i < m; i++) {
                a.set(i, j, a.get(i, j) + t * work[i]);
              }
            }
          }

          if (wantv) {
            for (let i = k + 1; i < n; i++) {
              V.set(i, k, e[i]);
            }
          }
        }
      }

      let p = Math.min(n, m + 1);

      if (nct < n) {
        s[nct] = a.get(nct, nct);
      }

      if (m < p) {
        s[p - 1] = 0;
      }

      if (nrt + 1 < p) {
        e[nrt] = a.get(nrt, p - 1);
      }

      e[p - 1] = 0;

      if (wantu) {
        for (let j = nct; j < nu; j++) {
          for (let i = 0; i < m; i++) {
            U.set(i, j, 0);
          }

          U.set(j, j, 1);
        }

        for (let k = nct - 1; k >= 0; k--) {
          if (s[k] !== 0) {
            for (let j = k + 1; j < nu; j++) {
              let t = 0;

              for (let i = k; i < m; i++) {
                t += U.get(i, k) * U.get(i, j);
              }

              t = -t / U.get(k, k);

              for (let i = k; i < m; i++) {
                U.set(i, j, U.get(i, j) + t * U.get(i, k));
              }
            }

            for (let i = k; i < m; i++) {
              U.set(i, k, -U.get(i, k));
            }

            U.set(k, k, 1 + U.get(k, k));

            for (let i = 0; i < k - 1; i++) {
              U.set(i, k, 0);
            }
          } else {
            for (let i = 0; i < m; i++) {
              U.set(i, k, 0);
            }

            U.set(k, k, 1);
          }
        }
      }

      if (wantv) {
        for (let k = n - 1; k >= 0; k--) {
          if (k < nrt && e[k] !== 0) {
            for (let j = k + 1; j < n; j++) {
              let t = 0;

              for (let i = k + 1; i < n; i++) {
                t += V.get(i, k) * V.get(i, j);
              }

              t = -t / V.get(k + 1, k);

              for (let i = k + 1; i < n; i++) {
                V.set(i, j, V.get(i, j) + t * V.get(i, k));
              }
            }
          }

          for (let i = 0; i < n; i++) {
            V.set(i, k, 0);
          }

          V.set(k, k, 1);
        }
      }

      var pp = p - 1;
      var eps = Number.EPSILON;

      while (p > 0) {
        let k, kase;

        for (k = p - 2; k >= -1; k--) {
          if (k === -1) {
            break;
          }

          const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));

          if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
            e[k] = 0;
            break;
          }
        }

        if (k === p - 2) {
          kase = 4;
        } else {
          let ks;

          for (ks = p - 1; ks >= k; ks--) {
            if (ks === k) {
              break;
            }

            let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);

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
          case 1:
            {
              let f = e[p - 2];
              e[p - 2] = 0;

              for (let j = p - 2; j >= k; j--) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;

                if (j !== k) {
                  f = -sn * e[j - 1];
                  e[j - 1] = cs * e[j - 1];
                }

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                    V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                    V.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 2:
            {
              let f = e[k - 1];
              e[k - 1] = 0;

              for (let j = k; j < p; j++) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                f = -sn * e[j];
                e[j] = cs * e[j];

                if (wantu) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                    U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                    U.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 3:
            {
              const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
              const sp = s[p - 1] / scale;
              const spm1 = s[p - 2] / scale;
              const epm1 = e[p - 2] / scale;
              const sk = s[k] / scale;
              const ek = e[k] / scale;
              const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
              const c = sp * epm1 * (sp * epm1);
              let shift = 0;

              if (b !== 0 || c !== 0) {
                if (b < 0) {
                  shift = 0 - Math.sqrt(b * b + c);
                } else {
                  shift = Math.sqrt(b * b + c);
                }

                shift = c / (b + shift);
              }

              let f = (sk + sp) * (sk - sp) + shift;
              let g = sk * ek;

              for (let j = k; j < p - 1; j++) {
                let t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                let cs = f / t;
                let sn = g / t;

                if (j !== k) {
                  e[j - 1] = t;
                }

                f = cs * s[j] + sn * e[j];
                e[j] = cs * e[j] - sn * s[j];
                g = sn * s[j + 1];
                s[j + 1] = cs * s[j + 1];

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                    V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                    V.set(i, j, t);
                  }
                }

                t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                cs = f / t;
                sn = g / t;
                s[j] = t;
                f = cs * e[j] + sn * s[j + 1];
                s[j + 1] = -sn * e[j] + cs * s[j + 1];
                g = sn * e[j + 1];
                e[j + 1] = cs * e[j + 1];

                if (wantu && j < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                    U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                    U.set(i, j, t);
                  }
                }
              }

              e[p - 2] = f;
              break;
            }

          case 4:
            {
              if (s[k] <= 0) {
                s[k] = s[k] < 0 ? -s[k] : 0;

                if (wantv) {
                  for (let i = 0; i <= pp; i++) {
                    V.set(i, k, -V.get(i, k));
                  }
                }
              }

              while (k < pp) {
                if (s[k] >= s[k + 1]) {
                  break;
                }

                let t = s[k];
                s[k] = s[k + 1];
                s[k + 1] = t;

                if (wantv && k < n - 1) {
                  for (let i = 0; i < n; i++) {
                    t = V.get(i, k + 1);
                    V.set(i, k + 1, V.get(i, k));
                    V.set(i, k, t);
                  }
                }

                if (wantu && k < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = U.get(i, k + 1);
                    U.set(i, k + 1, U.get(i, k));
                    U.set(i, k, t);
                  }
                }

                k++;
              }
              p--;
              break;
            }
          // no default
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

    solve(value) {
      var Y = value;
      var e = this.threshold;
      var scols = this.s.length;
      var Ls = Matrix.zeros(scols, scols);

      for (let i = 0; i < scols; i++) {
        if (Math.abs(this.s[i]) <= e) {
          Ls.set(i, i, 0);
        } else {
          Ls.set(i, i, 1 / this.s[i]);
        }
      }

      var U = this.U;
      var V = this.rightSingularVectors;
      var VL = V.mmul(Ls);
      var vrows = V.rows;
      var urows = U.rows;
      var VLU = Matrix.zeros(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < scols; k++) {
            sum += VL.get(i, k) * U.get(j, k);
          }

          VLU.set(i, j, sum);
        }
      }

      return VLU.mmul(Y);
    }

    solveForDiagonal(value) {
      return this.solve(Matrix.diag(value));
    }

    inverse() {
      var V = this.V;
      var e = this.threshold;
      var vrows = V.rows;
      var vcols = V.columns;
      var X = new Matrix(vrows, this.s.length);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < vcols; j++) {
          if (Math.abs(this.s[j]) > e) {
            X.set(i, j, V.get(i, j) / this.s[j]);
          }
        }
      }

      var U = this.U;
      var urows = U.rows;
      var ucols = U.columns;
      var Y = new Matrix(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < ucols; k++) {
            sum += X.get(i, k) * U.get(j, k);
          }

          Y.set(i, j, sum);
        }
      }

      return Y;
    }

    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }

    get norm2() {
      return this.s[0];
    }

    get rank() {
      var tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
      var r = 0;
      var s = this.s;

      for (var i = 0, ii = s.length; i < ii; i++) {
        if (s[i] > tol) {
          r++;
        }
      }

      return r;
    }

    get diagonal() {
      return Array.from(this.s);
    }

    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }

    get leftSingularVectors() {
      return this.U;
    }

    get rightSingularVectors() {
      return this.V;
    }

    get diagonalMatrix() {
      return Matrix.diag(this.s);
    }

  }

  function inverse(matrix) {
    let useSVD = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    matrix = WrapperMatrix2D.checkMatrix(matrix);

    if (useSVD) {
      return new SingularValueDecomposition(matrix).inverse();
    } else {
      return solve(matrix, Matrix.eye(matrix.rows));
    }
  }
  function solve(leftHandSide, rightHandSide) {
    let useSVD = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);

    if (useSVD) {
      return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
      return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
  }

  function determinant(matrix) {
    matrix = Matrix.checkMatrix(matrix);

    if (matrix.isSquare()) {
      var a, b, c, d;

      if (matrix.columns === 2) {
        // 2 x 2 matrix
        a = matrix.get(0, 0);
        b = matrix.get(0, 1);
        c = matrix.get(1, 0);
        d = matrix.get(1, 1);
        return a * d - b * c;
      } else if (matrix.columns === 3) {
        // 3 x 3 matrix
        var subMatrix0, subMatrix1, subMatrix2;
        subMatrix0 = new MatrixSelectionView(matrix, [1, 2], [1, 2]);
        subMatrix1 = new MatrixSelectionView(matrix, [1, 2], [0, 2]);
        subMatrix2 = new MatrixSelectionView(matrix, [1, 2], [0, 1]);
        a = matrix.get(0, 0);
        b = matrix.get(0, 1);
        c = matrix.get(0, 2);
        return a * determinant(subMatrix0) - b * determinant(subMatrix1) + c * determinant(subMatrix2);
      } else {
        // general purpose determinant using the LU decomposition
        return new LuDecomposition(matrix).determinant;
      }
    } else {
      throw Error('determinant can only be calculated for a square matrix');
    }
  }

  function xrange(n, exception) {
    var range = [];

    for (var i = 0; i < n; i++) {
      if (i !== exception) {
        range.push(i);
      }
    }

    return range;
  }

  function dependenciesOneRow(error, matrix, index) {
    let thresholdValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10e-10;
    let thresholdError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10e-10;

    if (error > thresholdError) {
      return new Array(matrix.rows + 1).fill(0);
    } else {
      var returnArray = matrix.addRow(index, [0]);

      for (var i = 0; i < returnArray.rows; i++) {
        if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
          returnArray.set(i, 0, 0);
        }
      }

      return returnArray.to1DArray();
    }
  }

  function linearDependencies(matrix) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      thresholdValue = 10e-10,
      thresholdError = 10e-10
    } = options;
    matrix = Matrix.checkMatrix(matrix);
    var n = matrix.rows;
    var results = new Matrix(n, n);

    for (var i = 0; i < n; i++) {
      var b = Matrix.columnVector(matrix.getRow(i));
      var Abis = matrix.subMatrixRow(xrange(n, i)).transpose();
      var svd = new SingularValueDecomposition(Abis);
      var x = svd.solve(b);
      var error = Matrix.sub(b, Abis.mmul(x)).abs().max();
      results.setRow(i, dependenciesOneRow(error, x, i, thresholdValue, thresholdError));
    }

    return results;
  }

  function pseudoInverse(matrix) {
    let threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.EPSILON;
    matrix = Matrix.checkMatrix(matrix);
    var svdSolution = new SingularValueDecomposition(matrix, {
      autoTranspose: true
    });
    var U = svdSolution.leftSingularVectors;
    var V = svdSolution.rightSingularVectors;
    var s = svdSolution.diagonal;

    for (var i = 0; i < s.length; i++) {
      if (Math.abs(s[i]) > threshold) {
        s[i] = 1.0 / s[i];
      } else {
        s[i] = 0.0;
      }
    }

    return V.mmul(Matrix.diag(s).mmul(U.transpose()));
  }

  function covariance(xMatrix) {
    let yMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : xMatrix;
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    xMatrix = Matrix.checkMatrix(xMatrix);
    let yIsSame = false;

    if (typeof yMatrix === 'object' && !Matrix.isMatrix(yMatrix) && !Array.isArray(yMatrix)) {
      options = yMatrix;
      yMatrix = xMatrix;
      yIsSame = true;
    } else {
      yMatrix = Matrix.checkMatrix(yMatrix);
    }

    if (xMatrix.rows !== yMatrix.rows) {
      throw new TypeError('Both matrices must have the same number of rows');
    }

    const {
      center = true
    } = options;

    if (center) {
      xMatrix = xMatrix.center('column');

      if (!yIsSame) {
        yMatrix = yMatrix.center('column');
      }
    }

    const covariance = xMatrix.transpose().mmul(yMatrix);

    for (let i = 0; i < covariance.rows; i++) {
      for (let j = 0; j < covariance.columns; j++) {
        covariance.set(i, j, covariance.get(i, j) * (1 / (xMatrix.rows - 1)));
      }
    }

    return covariance;
  }

  function correlation(xMatrix) {
    let yMatrix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : xMatrix;
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    xMatrix = Matrix.checkMatrix(xMatrix);
    let yIsSame = false;

    if (typeof yMatrix === 'object' && !Matrix.isMatrix(yMatrix) && !Array.isArray(yMatrix)) {
      options = yMatrix;
      yMatrix = xMatrix;
      yIsSame = true;
    } else {
      yMatrix = Matrix.checkMatrix(yMatrix);
    }

    if (xMatrix.rows !== yMatrix.rows) {
      throw new TypeError('Both matrices must have the same number of rows');
    }

    const {
      center = true,
      scale = true
    } = options;

    if (center) {
      xMatrix.center('column');

      if (!yIsSame) {
        yMatrix.center('column');
      }
    }

    if (scale) {
      xMatrix.scale('column');

      if (!yIsSame) {
        yMatrix.scale('column');
      }
    }

    const sdx = xMatrix.standardDeviation('column', {
      unbiased: true
    });
    const sdy = yIsSame ? sdx : yMatrix.standardDeviation('column', {
      unbiased: true
    });
    const correlation = xMatrix.transpose().mmul(yMatrix);

    for (let i = 0; i < correlation.rows; i++) {
      for (let j = 0; j < correlation.columns; j++) {
        correlation.set(i, j, correlation.get(i, j) * (1 / (sdx[i] * sdy[j])) * (1 / (xMatrix.rows - 1)));
      }
    }

    return correlation;
  }

  class EigenvalueDecomposition {
    constructor(matrix) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        assumeSymmetric = false
      } = options;
      matrix = WrapperMatrix2D.checkMatrix(matrix);

      if (!matrix.isSquare()) {
        throw new Error('Matrix is not a square matrix');
      }

      var n = matrix.columns;
      var V = new Matrix(n, n);
      var d = new Float64Array(n);
      var e = new Float64Array(n);
      var value = matrix;
      var i, j;
      var isSymmetric = false;

      if (assumeSymmetric) {
        isSymmetric = true;
      } else {
        isSymmetric = matrix.isSymmetric();
      }

      if (isSymmetric) {
        for (i = 0; i < n; i++) {
          for (j = 0; j < n; j++) {
            V.set(i, j, value.get(i, j));
          }
        }

        tred2(n, e, d, V);
        tql2(n, e, d, V);
      } else {
        var H = new Matrix(n, n);
        var ort = new Float64Array(n);

        for (j = 0; j < n; j++) {
          for (i = 0; i < n; i++) {
            H.set(i, j, value.get(i, j));
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

    get realEigenvalues() {
      return Array.from(this.d);
    }

    get imaginaryEigenvalues() {
      return Array.from(this.e);
    }

    get eigenvectorMatrix() {
      return this.V;
    }

    get diagonalMatrix() {
      var n = this.n;
      var e = this.e;
      var d = this.d;
      var X = new Matrix(n, n);
      var i, j;

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          X.set(i, j, 0);
        }

        X.set(i, i, d[i]);

        if (e[i] > 0) {
          X.set(i, i + 1, e[i]);
        } else if (e[i] < 0) {
          X.set(i, i - 1, e[i]);
        }
      }

      return X;
    }

  }

  function tred2(n, e, d, V) {
    var f, g, h, i, j, k, hh, scale;

    for (j = 0; j < n; j++) {
      d[j] = V.get(n - 1, j);
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
          d[j] = V.get(i - 1, j);
          V.set(i, j, 0);
          V.set(j, i, 0);
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
          V.set(j, i, f);
          g = e[j] + V.get(j, j) * f;

          for (k = j + 1; k <= i - 1; k++) {
            g += V.get(k, j) * d[k];
            e[k] += V.get(k, j) * f;
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
            V.set(k, j, V.get(k, j) - (f * e[k] + g * d[k]));
          }

          d[j] = V.get(i - 1, j);
          V.set(i, j, 0);
        }
      }

      d[i] = h;
    }

    for (i = 0; i < n - 1; i++) {
      V.set(n - 1, i, V.get(i, i));
      V.set(i, i, 1);
      h = d[i + 1];

      if (h !== 0) {
        for (k = 0; k <= i; k++) {
          d[k] = V.get(k, i + 1) / h;
        }

        for (j = 0; j <= i; j++) {
          g = 0;

          for (k = 0; k <= i; k++) {
            g += V.get(k, i + 1) * V.get(k, j);
          }

          for (k = 0; k <= i; k++) {
            V.set(k, j, V.get(k, j) - g * d[k]);
          }
        }
      }

      for (k = 0; k <= i; k++) {
        V.set(k, i + 1, 0);
      }
    }

    for (j = 0; j < n; j++) {
      d[j] = V.get(n - 1, j);
      V.set(n - 1, j, 0);
    }

    V.set(n - 1, n - 1, 1);
    e[0] = 0;
  }

  function tql2(n, e, d, V) {
    var g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2;

    for (i = 1; i < n; i++) {
      e[i - 1] = e[i];
    }

    e[n - 1] = 0;
    var f = 0;
    var tst1 = 0;
    var eps = Number.EPSILON;

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

        do {
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
              h = V.get(k, i + 1);
              V.set(k, i + 1, s * V.get(k, i) + c * h);
              V.set(k, i, c * V.get(k, i) - s * h);
            }
          }

          p = -s * s2 * c3 * el1 * e[l] / dl1;
          e[l] = s * p;
          d[l] = c * p;
        } while (Math.abs(e[l]) > eps * tst1);
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
          p = V.get(j, i);
          V.set(j, i, V.get(j, k));
          V.set(j, k, p);
        }
      }
    }
  }

  function orthes(n, H, ort, V) {
    var low = 0;
    var high = n - 1;
    var f, g, h, i, j, m;
    var scale;

    for (m = low + 1; m <= high - 1; m++) {
      scale = 0;

      for (i = m; i <= high; i++) {
        scale = scale + Math.abs(H.get(i, m - 1));
      }

      if (scale !== 0) {
        h = 0;

        for (i = high; i >= m; i--) {
          ort[i] = H.get(i, m - 1) / scale;
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
            f += ort[i] * H.get(i, j);
          }

          f = f / h;

          for (i = m; i <= high; i++) {
            H.set(i, j, H.get(i, j) - f * ort[i]);
          }
        }

        for (i = 0; i <= high; i++) {
          f = 0;

          for (j = high; j >= m; j--) {
            f += ort[j] * H.get(i, j);
          }

          f = f / h;

          for (j = m; j <= high; j++) {
            H.set(i, j, H.get(i, j) - f * ort[j]);
          }
        }

        ort[m] = scale * ort[m];
        H.set(m, m - 1, scale * g);
      }
    }

    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        V.set(i, j, i === j ? 1 : 0);
      }
    }

    for (m = high - 1; m >= low + 1; m--) {
      if (H.get(m, m - 1) !== 0) {
        for (i = m + 1; i <= high; i++) {
          ort[i] = H.get(i, m - 1);
        }

        for (j = m; j <= high; j++) {
          g = 0;

          for (i = m; i <= high; i++) {
            g += ort[i] * V.get(i, j);
          }

          g = g / ort[m] / H.get(m, m - 1);

          for (i = m; i <= high; i++) {
            V.set(i, j, V.get(i, j) + g * ort[i]);
          }
        }
      }
    }
  }

  function hqr2(nn, e, d, V, H) {
    var n = nn - 1;
    var low = 0;
    var high = nn - 1;
    var eps = Number.EPSILON;
    var exshift = 0;
    var norm = 0;
    var p = 0;
    var q = 0;
    var r = 0;
    var s = 0;
    var z = 0;
    var iter = 0;
    var i, j, k, l, m, t, w, x, y;
    var ra, sa, vr, vi;
    var notlast, cdivres;

    for (i = 0; i < nn; i++) {
      if (i < low || i > high) {
        d[i] = H.get(i, i);
        e[i] = 0;
      }

      for (j = Math.max(i - 1, 0); j < nn; j++) {
        norm = norm + Math.abs(H.get(i, j));
      }
    }

    while (n >= low) {
      l = n;

      while (l > low) {
        s = Math.abs(H.get(l - 1, l - 1)) + Math.abs(H.get(l, l));

        if (s === 0) {
          s = norm;
        }

        if (Math.abs(H.get(l, l - 1)) < eps * s) {
          break;
        }

        l--;
      }

      if (l === n) {
        H.set(n, n, H.get(n, n) + exshift);
        d[n] = H.get(n, n);
        e[n] = 0;
        n--;
        iter = 0;
      } else if (l === n - 1) {
        w = H.get(n, n - 1) * H.get(n - 1, n);
        p = (H.get(n - 1, n - 1) - H.get(n, n)) / 2;
        q = p * p + w;
        z = Math.sqrt(Math.abs(q));
        H.set(n, n, H.get(n, n) + exshift);
        H.set(n - 1, n - 1, H.get(n - 1, n - 1) + exshift);
        x = H.get(n, n);

        if (q >= 0) {
          z = p >= 0 ? p + z : p - z;
          d[n - 1] = x + z;
          d[n] = d[n - 1];

          if (z !== 0) {
            d[n] = x - w / z;
          }

          e[n - 1] = 0;
          e[n] = 0;
          x = H.get(n, n - 1);
          s = Math.abs(x) + Math.abs(z);
          p = x / s;
          q = z / s;
          r = Math.sqrt(p * p + q * q);
          p = p / r;
          q = q / r;

          for (j = n - 1; j < nn; j++) {
            z = H.get(n - 1, j);
            H.set(n - 1, j, q * z + p * H.get(n, j));
            H.set(n, j, q * H.get(n, j) - p * z);
          }

          for (i = 0; i <= n; i++) {
            z = H.get(i, n - 1);
            H.set(i, n - 1, q * z + p * H.get(i, n));
            H.set(i, n, q * H.get(i, n) - p * z);
          }

          for (i = low; i <= high; i++) {
            z = V.get(i, n - 1);
            V.set(i, n - 1, q * z + p * V.get(i, n));
            V.set(i, n, q * V.get(i, n) - p * z);
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
        x = H.get(n, n);
        y = 0;
        w = 0;

        if (l < n) {
          y = H.get(n - 1, n - 1);
          w = H.get(n, n - 1) * H.get(n - 1, n);
        }

        if (iter === 10) {
          exshift += x;

          for (i = low; i <= n; i++) {
            H.set(i, i, H.get(i, i) - x);
          }

          s = Math.abs(H.get(n, n - 1)) + Math.abs(H.get(n - 1, n - 2));
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
              H.set(i, i, H.get(i, i) - s);
            }

            exshift += s;
            x = y = w = 0.964;
          }
        }

        iter = iter + 1;
        m = n - 2;

        while (m >= l) {
          z = H.get(m, m);
          r = x - z;
          s = y - z;
          p = (r * s - w) / H.get(m + 1, m) + H.get(m, m + 1);
          q = H.get(m + 1, m + 1) - z - r - s;
          r = H.get(m + 2, m + 1);
          s = Math.abs(p) + Math.abs(q) + Math.abs(r);
          p = p / s;
          q = q / s;
          r = r / s;

          if (m === l) {
            break;
          }

          if (Math.abs(H.get(m, m - 1)) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H.get(m - 1, m - 1)) + Math.abs(z) + Math.abs(H.get(m + 1, m + 1))))) {
            break;
          }

          m--;
        }

        for (i = m + 2; i <= n; i++) {
          H.set(i, i - 2, 0);

          if (i > m + 2) {
            H.set(i, i - 3, 0);
          }
        }

        for (k = m; k <= n - 1; k++) {
          notlast = k !== n - 1;

          if (k !== m) {
            p = H.get(k, k - 1);
            q = H.get(k + 1, k - 1);
            r = notlast ? H.get(k + 2, k - 1) : 0;
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
              H.set(k, k - 1, -s * x);
            } else if (l !== m) {
              H.set(k, k - 1, -H.get(k, k - 1));
            }

            p = p + s;
            x = p / s;
            y = q / s;
            z = r / s;
            q = q / p;
            r = r / p;

            for (j = k; j < nn; j++) {
              p = H.get(k, j) + q * H.get(k + 1, j);

              if (notlast) {
                p = p + r * H.get(k + 2, j);
                H.set(k + 2, j, H.get(k + 2, j) - p * z);
              }

              H.set(k, j, H.get(k, j) - p * x);
              H.set(k + 1, j, H.get(k + 1, j) - p * y);
            }

            for (i = 0; i <= Math.min(n, k + 3); i++) {
              p = x * H.get(i, k) + y * H.get(i, k + 1);

              if (notlast) {
                p = p + z * H.get(i, k + 2);
                H.set(i, k + 2, H.get(i, k + 2) - p * r);
              }

              H.set(i, k, H.get(i, k) - p);
              H.set(i, k + 1, H.get(i, k + 1) - p * q);
            }

            for (i = low; i <= high; i++) {
              p = x * V.get(i, k) + y * V.get(i, k + 1);

              if (notlast) {
                p = p + z * V.get(i, k + 2);
                V.set(i, k + 2, V.get(i, k + 2) - p * r);
              }

              V.set(i, k, V.get(i, k) - p);
              V.set(i, k + 1, V.get(i, k + 1) - p * q);
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
        H.set(n, n, 1);

        for (i = n - 1; i >= 0; i--) {
          w = H.get(i, i) - p;
          r = 0;

          for (j = l; j <= n; j++) {
            r = r + H.get(i, j) * H.get(j, n);
          }

          if (e[i] < 0) {
            z = w;
            s = r;
          } else {
            l = i;

            if (e[i] === 0) {
              H.set(i, n, w !== 0 ? -r / w : -r / (eps * norm));
            } else {
              x = H.get(i, i + 1);
              y = H.get(i + 1, i);
              q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
              t = (x * s - z * r) / q;
              H.set(i, n, t);
              H.set(i + 1, n, Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z);
            }

            t = Math.abs(H.get(i, n));

            if (eps * t * t > 1) {
              for (j = i; j <= n; j++) {
                H.set(j, n, H.get(j, n) / t);
              }
            }
          }
        }
      } else if (q < 0) {
        l = n - 1;

        if (Math.abs(H.get(n, n - 1)) > Math.abs(H.get(n - 1, n))) {
          H.set(n - 1, n - 1, q / H.get(n, n - 1));
          H.set(n - 1, n, -(H.get(n, n) - p) / H.get(n, n - 1));
        } else {
          cdivres = cdiv(0, -H.get(n - 1, n), H.get(n - 1, n - 1) - p, q);
          H.set(n - 1, n - 1, cdivres[0]);
          H.set(n - 1, n, cdivres[1]);
        }

        H.set(n, n - 1, 0);
        H.set(n, n, 1);

        for (i = n - 2; i >= 0; i--) {
          ra = 0;
          sa = 0;

          for (j = l; j <= n; j++) {
            ra = ra + H.get(i, j) * H.get(j, n - 1);
            sa = sa + H.get(i, j) * H.get(j, n);
          }

          w = H.get(i, i) - p;

          if (e[i] < 0) {
            z = w;
            r = ra;
            s = sa;
          } else {
            l = i;

            if (e[i] === 0) {
              cdivres = cdiv(-ra, -sa, w, q);
              H.set(i, n - 1, cdivres[0]);
              H.set(i, n, cdivres[1]);
            } else {
              x = H.get(i, i + 1);
              y = H.get(i + 1, i);
              vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
              vi = (d[i] - p) * 2 * q;

              if (vr === 0 && vi === 0) {
                vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
              }

              cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
              H.set(i, n - 1, cdivres[0]);
              H.set(i, n, cdivres[1]);

              if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
                H.set(i + 1, n - 1, (-ra - w * H.get(i, n - 1) + q * H.get(i, n)) / x);
                H.set(i + 1, n, (-sa - w * H.get(i, n) - q * H.get(i, n - 1)) / x);
              } else {
                cdivres = cdiv(-r - y * H.get(i, n - 1), -s - y * H.get(i, n), z, q);
                H.set(i + 1, n - 1, cdivres[0]);
                H.set(i + 1, n, cdivres[1]);
              }
            }

            t = Math.max(Math.abs(H.get(i, n - 1)), Math.abs(H.get(i, n)));

            if (eps * t * t > 1) {
              for (j = i; j <= n; j++) {
                H.set(j, n - 1, H.get(j, n - 1) / t);
                H.set(j, n, H.get(j, n) / t);
              }
            }
          }
        }
      }
    }

    for (i = 0; i < nn; i++) {
      if (i < low || i > high) {
        for (j = i; j < nn; j++) {
          V.set(i, j, H.get(i, j));
        }
      }
    }

    for (j = nn - 1; j >= low; j--) {
      for (i = low; i <= high; i++) {
        z = 0;

        for (k = low; k <= Math.min(j, high); k++) {
          z = z + V.get(i, k) * H.get(k, j);
        }

        V.set(i, j, z);
      }
    }
  }

  function cdiv(xr, xi, yr, yi) {
    var r, d;

    if (Math.abs(yr) > Math.abs(yi)) {
      r = yi / yr;
      d = yr + r * yi;
      return [(xr + r * xi) / d, (xi - r * xr) / d];
    } else {
      r = yr / yi;
      d = yi + r * yr;
      return [(r * xr + xi) / d, (r * xi - xr) / d];
    }
  }

  class CholeskyDecomposition {
    constructor(value) {
      value = WrapperMatrix2D.checkMatrix(value);

      if (!value.isSymmetric()) {
        throw new Error('Matrix is not symmetric');
      }

      var a = value;
      var dimension = a.rows;
      var l = new Matrix(dimension, dimension);
      var positiveDefinite = true;
      var i, j, k;

      for (j = 0; j < dimension; j++) {
        var d = 0;

        for (k = 0; k < j; k++) {
          var s = 0;

          for (i = 0; i < k; i++) {
            s += l.get(k, i) * l.get(j, i);
          }

          s = (a.get(j, k) - s) / l.get(k, k);
          l.set(j, k, s);
          d = d + s * s;
        }

        d = a.get(j, j) - d;
        positiveDefinite &= d > 0;
        l.set(j, j, Math.sqrt(Math.max(d, 0)));

        for (k = j + 1; k < dimension; k++) {
          l.set(j, k, 0);
        }
      }

      if (!positiveDefinite) {
        throw new Error('Matrix is not positive definite');
      }

      this.L = l;
    }

    solve(value) {
      value = WrapperMatrix2D.checkMatrix(value);
      var l = this.L;
      var dimension = l.rows;

      if (value.rows !== dimension) {
        throw new Error('Matrix dimensions do not match');
      }

      var count = value.columns;
      var B = value.clone();
      var i, j, k;

      for (k = 0; k < dimension; k++) {
        for (j = 0; j < count; j++) {
          for (i = 0; i < k; i++) {
            B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(k, i));
          }

          B.set(k, j, B.get(k, j) / l.get(k, k));
        }
      }

      for (k = dimension - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          for (i = k + 1; i < dimension; i++) {
            B.set(k, j, B.get(k, j) - B.get(i, j) * l.get(i, k));
          }

          B.set(k, j, B.get(k, j) / l.get(k, k));
        }
      }

      return B;
    }

    get lowerTriangularMatrix() {
      return this.L;
    }

  }



  var MatrixLib = /*#__PURE__*/Object.freeze({
    AbstractMatrix: AbstractMatrix,
    'default': Matrix,
    Matrix: Matrix,
    wrap: wrap,
    WrapperMatrix1D: WrapperMatrix1D,
    WrapperMatrix2D: WrapperMatrix2D,
    solve: solve,
    inverse: inverse,
    determinant: determinant,
    linearDependencies: linearDependencies,
    pseudoInverse: pseudoInverse,
    covariance: covariance,
    correlation: correlation,
    SingularValueDecomposition: SingularValueDecomposition,
    SVD: SingularValueDecomposition,
    EigenvalueDecomposition: EigenvalueDecomposition,
    EVD: EigenvalueDecomposition,
    CholeskyDecomposition: CholeskyDecomposition,
    CHO: CholeskyDecomposition,
    LuDecomposition: LuDecomposition,
    LU: LuDecomposition,
    QrDecomposition: QrDecomposition,
    QR: QrDecomposition,
    MatrixColumnView: MatrixColumnView,
    MatrixColumnSelectionView: MatrixColumnSelectionView,
    MatrixFlipColumnView: MatrixFlipColumnView,
    MatrixFlipRowView: MatrixFlipRowView,
    MatrixRowView: MatrixRowView,
    MatrixRowSelectionView: MatrixRowSelectionView,
    MatrixSelectionView: MatrixSelectionView,
    MatrixSubView: MatrixSubView,
    MatrixTransposeView: MatrixTransposeView
  });

  /**
   * Computes the mean of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function mean(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var sum = 0;

    for (var i = 0; i < input.length; i++) {
      sum += input[i];
    }

    return sum / input.length;
  }

  /**
   * @private
   * return an array of probabilities of each class
   * @param {Array} array - contains the classes
   * @param {number} numberOfClasses
   * @return {Matrix} - rowVector of probabilities.
   */

  function toDiscreteDistribution(array, numberOfClasses) {
    var counts = new Array(numberOfClasses).fill(0);

    for (var i = 0; i < array.length; ++i) {
      counts[array[i]] += 1 / array.length;
    }

    return Matrix.rowVector(counts);
  }
  /**
   * @private
   * Retrieves the impurity of array of predictions
   * @param {Array} array - predictions.
   * @return {number} Gini impurity
   */

  function giniImpurity(array) {
    if (array.length === 0) {
      return 0;
    }

    var probabilities = toDiscreteDistribution(array, getNumberOfClasses(array)).getRow(0);
    var sum = 0.0;

    for (var i = 0; i < probabilities.length; ++i) {
      sum += probabilities[i] * probabilities[i];
    }

    return 1 - sum;
  }
  /**
   * @private
   * Return the number of classes given the array of predictions.
   * @param {Array} array - predictions.
   * @return {number} Number of classes.
   */

  function getNumberOfClasses(array) {
    return array.filter(function (val, i, arr) {
      return arr.indexOf(val) === i;
    }).length;
  }
  /**
   * @private
   * Calculates the Gini Gain of an array of predictions and those predictions splitted by a feature.
   * @para {Array} array - Predictions
   * @param {object} splitted - Object with elements "greater" and "lesser" that contains an array of predictions splitted.
   * @return {number} - Gini Gain.
   */

  function giniGain(array, splitted) {
    var splitsImpurity = 0.0;
    var splits = ['greater', 'lesser'];

    for (var i = 0; i < splits.length; ++i) {
      var currentSplit = splitted[splits[i]];
      splitsImpurity += giniImpurity(currentSplit) * currentSplit.length / array.length;
    }

    return giniImpurity(array) - splitsImpurity;
  }
  /**
   * @private
   * Calculates the squared error of a predictions values.
   * @param {Array} array - predictions values
   * @return {number} squared error.
   */

  function squaredError(array) {
    var l = array.length;
    var m = mean(array);
    var squaredError = 0.0;

    for (var i = 0; i < l; ++i) {
      var currentElement = array[i];
      squaredError += (currentElement - m) * (currentElement - m);
    }

    return squaredError;
  }
  /**
   * @private
   * Calculates the sum of squared error of the two arrays that contains the splitted values.
   * @param {Array} array - this argument is no necessary but is used to fit with the main interface.
   * @param {object} splitted - Object with elements "greater" and "lesser" that contains an array of predictions splitted.
   * @return {number} - sum of squared errors.
   */

  function regressionError(array, splitted) {
    var error = 0.0;
    var splits = ['greater', 'lesser'];

    for (var i = 0; i < splits.length; ++i) {
      var currentSplit = splitted[splits[i]];
      error += squaredError(currentSplit);
    }

    return error;
  }
  /**
   * @private
   * Split the training set and values from a given column of the training set if is less than a value
   * @param {Matrix} X - Training set.
   * @param {Array} y - Training values.
   * @param {number} column - Column to split.
   * @param {number} value - value to split the Training set and values.
   * @return {object} - Object that contains the splitted values.
   */

  function matrixSplitter(X, y, column, value) {
    var lesserX = [];
    var greaterX = [];
    var lesserY = [];
    var greaterY = [];

    for (var i = 0; i < X.rows; ++i) {
      if (X.get(i, column) < value) {
        lesserX.push(X.getRow(i));
        lesserY.push(y[i]);
      } else {
        greaterX.push(X.getRow(i));
        greaterY.push(y[i]);
      }
    }

    return {
      greaterX: greaterX,
      greaterY: greaterY,
      lesserX: lesserX,
      lesserY: lesserY
    };
  }
  /**
   * @private
   * Calculates the mean between two values
   * @param {number} a
   * @param {number} b
   * @return {number}
   */

  function mean$1(a, b) {
    return (a + b) / 2;
  }
  /**
   * @private
   * Returns a list of tuples that contains the i-th element of each array.
   * @param {Array} a
   * @param {Array} b
   * @return {Array} list of tuples.
   */

  function zip(a, b) {
    if (a.length !== b.length) {
      throw new TypeError("Error on zip: the size of a: ".concat(a.length, " is different from b: ").concat(b.length));
    }

    var ret = new Array(a.length);

    for (var i = 0; i < a.length; ++i) {
      ret[i] = [a[i], b[i]];
    }

    return ret;
  }

  const gainFunctions = {
    gini: giniGain,
    regression: regressionError
  };
  const splitFunctions = {
    mean: mean$1
  };
  class TreeNode {
    /**
     * @private
     * Constructor for a tree node given the options received on the main classes (DecisionTreeClassifier, DecisionTreeRegression)
     * @param {object|TreeNode} options for loading
     * @constructor
     */
    constructor(options) {
      // options parameters
      this.kind = options.kind;
      this.gainFunction = options.gainFunction;
      this.splitFunction = options.splitFunction;
      this.minNumSamples = options.minNumSamples;
      this.maxDepth = options.maxDepth;
    }
    /**
     * @private
     * Function that retrieve the best feature to make the split.
     * @param {Matrix} XTranspose - Training set transposed
     * @param {Array} y - labels or values (depending of the decision tree)
     * @return {object} - return tree values, the best gain, column and the split value.
     */


    bestSplit(XTranspose, y) {
      // Depending in the node tree class, we set the variables to check information gain (to classify)
      // or error (for regression)
      var bestGain = this.kind === 'classifier' ? -Infinity : Infinity;
      var check = this.kind === 'classifier' ? (a, b) => a > b : (a, b) => a < b;
      var maxColumn;
      var maxValue;

      for (var i = 0; i < XTranspose.rows; ++i) {
        var currentFeature = XTranspose.getRow(i);
        var splitValues = this.featureSplit(currentFeature, y);

        for (var j = 0; j < splitValues.length; ++j) {
          var currentSplitVal = splitValues[j];
          var splitted = this.split(currentFeature, y, currentSplitVal);
          var gain = gainFunctions[this.gainFunction](y, splitted);

          if (check(gain, bestGain)) {
            maxColumn = i;
            maxValue = currentSplitVal;
            bestGain = gain;
          }
        }
      }

      return {
        maxGain: bestGain,
        maxColumn: maxColumn,
        maxValue: maxValue
      };
    }
    /**
     * @private
     * Makes the split of the training labels or values from the training set feature given a split value.
     * @param {Array} x - Training set feature
     * @param {Array} y - Training set value or label
     * @param {number} splitValue
     * @return {object}
     */


    split(x, y, splitValue) {
      var lesser = [];
      var greater = [];

      for (var i = 0; i < x.length; ++i) {
        if (x[i] < splitValue) {
          lesser.push(y[i]);
        } else {
          greater.push(y[i]);
        }
      }

      return {
        greater: greater,
        lesser: lesser
      };
    }
    /**
     * @private
     * Calculates the possible points to split over the tree given a training set feature and corresponding labels or values.
     * @param {Array} x - Training set feature
     * @param {Array} y - Training set value or label
     * @return {Array} possible split values.
     */


    featureSplit(x, y) {
      var splitValues = [];
      var arr = zip(x, y);
      arr.sort(function (a, b) {
        return a[0] - b[0];
      });

      for (var i = 1; i < arr.length; ++i) {
        if (arr[i - 1][1] !== arr[i][1]) {
          splitValues.push(splitFunctions[this.splitFunction](arr[i - 1][0], arr[i][0]));
        }
      }

      return splitValues;
    }
    /**
     * @private
     * Calculate the predictions of a leaf tree node given the training labels or values
     * @param {Array} y
     */


    calculatePrediction(y) {
      if (this.kind === 'classifier') {
        this.distribution = toDiscreteDistribution(y, getNumberOfClasses(y));

        if (this.distribution.columns === 0) {
          throw new TypeError('Error on calculate the prediction');
        }
      } else {
        this.distribution = mean(y);
      }
    }
    /**
     * @private
     * Train a node given the training set and labels, because it trains recursively, it also receive
     * the current depth of the node, parent gain to avoid infinite recursion and boolean value to check if
     * the training set is transposed.
     * @param {Matrix} X - Training set (could be transposed or not given transposed).
     * @param {Array} y - Training labels or values.
     * @param {number} currentDepth - Current depth of the node.
     * @param {number} parentGain - parent node gain or error.
     */


    train(X, y, currentDepth, parentGain) {
      if (X.rows <= this.minNumSamples) {
        this.calculatePrediction(y);
        return;
      }

      if (parentGain === undefined) parentGain = 0.0;
      var XTranspose = X.transpose();
      var split = this.bestSplit(XTranspose, y);
      this.splitValue = split.maxValue;
      this.splitColumn = split.maxColumn;
      this.gain = split.maxGain;
      var splittedMatrix = matrixSplitter(X, y, this.splitColumn, this.splitValue);

      if (currentDepth < this.maxDepth && this.gain > 0.01 && this.gain !== parentGain && splittedMatrix.lesserX.length > 0 && splittedMatrix.greaterX.length > 0) {
        this.left = new TreeNode(this);
        this.right = new TreeNode(this);
        var lesserX = new Matrix(splittedMatrix.lesserX);
        var greaterX = new Matrix(splittedMatrix.greaterX);
        this.left.train(lesserX, splittedMatrix.lesserY, currentDepth + 1, this.gain);
        this.right.train(greaterX, splittedMatrix.greaterY, currentDepth + 1, this.gain);
      } else {
        this.calculatePrediction(y);
      }
    }
    /**
     * @private
     * Calculates the prediction of a given element.
     * @param {Array} row
     * @return {number|Array} prediction
     *          * if a node is a classifier returns an array of probabilities of each class.
     *          * if a node is for regression returns a number with the prediction.
     */


    classify(row) {
      if (this.right && this.left) {
        if (row[this.splitColumn] < this.splitValue) {
          return this.left.classify(row);
        } else {
          return this.right.classify(row);
        }
      }

      return this.distribution;
    }
    /**
     * @private
     * Set the parameter of the current node and their children.
     * @param {object} node - parameters of the current node and the children.
     */


    setNodeParameters(node) {
      if (node.distribution !== undefined) {
        this.distribution = node.distribution.constructor === Array ? new Matrix(node.distribution) : node.distribution;
      } else {
        this.distribution = undefined;
        this.splitValue = node.splitValue;
        this.splitColumn = node.splitColumn;
        this.gain = node.gain;
        this.left = new TreeNode(this);
        this.right = new TreeNode(this);

        if (node.left !== {}) {
          this.left.setNodeParameters(node.left);
        }

        if (node.right !== {}) {
          this.right.setNodeParameters(node.right);
        }
      }
    }

  }

  const defaultOptions = {
    gainFunction: 'gini',
    splitFunction: 'mean',
    minNumSamples: 3,
    maxDepth: Infinity
  };
  class DecisionTreeClassifier {
    /**
     * Create new Decision Tree Classifier with CART implementation with the given options
     * @param {object} options
     * @param {string} [options.gainFunction="gini"] - gain function to get the best split, "gini" the only one supported.
     * @param {string} [options.splitFunction="mean"] - given two integers from a split feature, get the value to split, "mean" the only one supported.
     * @param {number} [options.minNumSamples=3] - minimum number of samples to create a leaf node to decide a class.
     * @param {number} [options.maxDepth=Infinity] - Max depth of the tree.
     * @param {object} model - for load purposes.
     * @constructor
     */
    constructor(options, model) {
      if (options === true) {
        this.options = model.options;
        this.root = new TreeNode(model.options);
        this.root.setNodeParameters(model.root);
      } else {
        this.options = Object.assign({}, defaultOptions, options);
        this.options.kind = 'classifier';
      }
    }
    /**
     * Train the decision tree with the given training set and labels.
     * @param {Matrix|MatrixTransposeView|Array} trainingSet
     * @param {Array} trainingLabels
     */


    train(trainingSet, trainingLabels) {
      this.root = new TreeNode(this.options);
      trainingSet = Matrix.checkMatrix(trainingSet);
      this.root.train(trainingSet, trainingLabels, 0, null);
    }
    /**
     * Predicts the output given the matrix to predict.
     * @param {Matrix|MatrixTransposeView|Array} toPredict
     * @return {Array} predictions
     */


    predict(toPredict) {
      toPredict = Matrix.checkMatrix(toPredict);
      var predictions = new Array(toPredict.rows);

      for (var i = 0; i < toPredict.rows; ++i) {
        predictions[i] = this.root.classify(toPredict.getRow(i)).maxRowIndex(0)[1];
      }

      return predictions;
    }
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      return {
        options: this.options,
        root: this.root,
        name: 'DTClassifier'
      };
    }
    /**
     * Load a Decision tree classifier with the given model.
     * @param {object} model
     * @return {DecisionTreeClassifier}
     */


    static load(model) {
      if (model.name !== 'DTClassifier') {
        throw new RangeError("Invalid model: ".concat(model.name));
      }

      return new DecisionTreeClassifier(true, model);
    }

  }

  const defaultOptions$1 = {
    gainFunction: 'regression',
    splitFunction: 'mean',
    minNumSamples: 3,
    maxDepth: Infinity
  };
  class DecisionTreeRegression {
    /**
     * Create new Decision Tree Regression with CART implementation with the given options.
     * @param {object} options
     * @param {string} [options.gainFunction="regression"] - gain function to get the best split, "regression" the only one supported.
     * @param {string} [options.splitFunction="mean"] - given two integers from a split feature, get the value to split, "mean" the only one supported.
     * @param {number} [options.minNumSamples=3] - minimum number of samples to create a leaf node to decide a class.
     * @param {number} [options.maxDepth=Infinity] - Max depth of the tree.
     * @param {object} model - for load purposes.
     */
    constructor(options, model) {
      if (options === true) {
        this.options = model.options;
        this.root = new TreeNode(model.options);
        this.root.setNodeParameters(model.root);
      } else {
        this.options = Object.assign({}, defaultOptions$1, options);
        this.options.kind = 'regression';
      }
    }
    /**
     * Train the decision tree with the given training set and values.
     * @param {Matrix|MatrixTransposeView|Array} trainingSet
     * @param {Array} trainingValues
     */


    train(trainingSet, trainingValues) {
      this.root = new TreeNode(this.options);

      if (typeof trainingSet[0] !== 'undefined' && trainingSet[0].length === undefined) {
        trainingSet = Matrix.columnVector(trainingSet);
      } else {
        trainingSet = Matrix.checkMatrix(trainingSet);
      }

      this.root.train(trainingSet, trainingValues, 0);
    }
    /**
     * Predicts the values given the matrix to predict.
     * @param {Matrix|MatrixTransposeView|Array} toPredict
     * @return {Array} predictions
     */


    predict(toPredict) {
      if (typeof toPredict[0] !== 'undefined' && toPredict[0].length === undefined) {
        toPredict = Matrix.columnVector(toPredict);
      }

      toPredict = Matrix.checkMatrix(toPredict);
      var predictions = new Array(toPredict.rows);

      for (var i = 0; i < toPredict.rows; ++i) {
        predictions[i] = this.root.classify(toPredict.getRow(i));
      }

      return predictions;
    }
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      return {
        options: this.options,
        root: this.root,
        name: 'DTRegression'
      };
    }
    /**
     * Load a Decision tree regression with the given model.
     * @param {object} model
     * @return {DecisionTreeRegression}
     */


    static load(model) {
      if (model.name !== 'DTRegression') {
        throw new RangeError("Invalid model:".concat(model.name));
      }

      return new DecisionTreeRegression(true, model);
    }

  }

  const SMALLEST_UNSAFE_INTEGER = 0x20000000000000;
  const LARGEST_SAFE_INTEGER = SMALLEST_UNSAFE_INTEGER - 1;
  const UINT32_MAX = -1 >>> 0;
  const UINT32_SIZE = UINT32_MAX + 1;
  const INT32_SIZE = UINT32_SIZE / 2;
  const INT32_MAX = INT32_SIZE - 1;
  const UINT21_SIZE = 1 << 21;
  const UINT21_MAX = UINT21_SIZE - 1;
  /**
   * Returns a value within [-0x80000000, 0x7fffffff]
   */

  function int32(engine) {
    return engine.next() | 0;
  }

  function add(distribution, addend) {
    if (addend === 0) {
      return distribution;
    } else {
      return engine => distribution(engine) + addend;
    }
  }
  /**
   * Returns a value within [-0x20000000000000, 0x1fffffffffffff]
   */


  function int53(engine) {
    const high = engine.next() | 0;
    const low = engine.next() >>> 0;
    return (high & UINT21_MAX) * UINT32_SIZE + low + (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0);
  }
  /**
   * Returns a value within [-0x20000000000000, 0x20000000000000]
   */


  function int53Full(engine) {
    while (true) {
      const high = engine.next() | 0;

      if (high & 0x400000) {
        if ((high & 0x7fffff) === 0x400000 && (engine.next() | 0) === 0) {
          return SMALLEST_UNSAFE_INTEGER;
        }
      } else {
        const low = engine.next() >>> 0;
        return (high & UINT21_MAX) * UINT32_SIZE + low + (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0);
      }
    }
  }
  /**
   * Returns a value within [0, 0xffffffff]
   */


  function uint32(engine) {
    return engine.next() >>> 0;
  }
  /**
   * Returns a value within [0, 0x1fffffffffffff]
   */


  function uint53(engine) {
    const high = engine.next() & UINT21_MAX;
    const low = engine.next() >>> 0;
    return high * UINT32_SIZE + low;
  }
  /**
   * Returns a value within [0, 0x20000000000000]
   */


  function uint53Full(engine) {
    while (true) {
      const high = engine.next() | 0;

      if (high & UINT21_SIZE) {
        if ((high & UINT21_MAX) === 0 && (engine.next() | 0) === 0) {
          return SMALLEST_UNSAFE_INTEGER;
        }
      } else {
        const low = engine.next() >>> 0;
        return (high & UINT21_MAX) * UINT32_SIZE + low;
      }
    }
  }

  function isPowerOfTwoMinusOne(value) {
    return (value + 1 & value) === 0;
  }

  function bitmask(masking) {
    return engine => engine.next() & masking;
  }

  function downscaleToLoopCheckedRange(range) {
    const extendedRange = range + 1;
    const maximum = extendedRange * Math.floor(UINT32_SIZE / extendedRange);
    return engine => {
      let value = 0;

      do {
        value = engine.next() >>> 0;
      } while (value >= maximum);

      return value % extendedRange;
    };
  }

  function downscaleToRange(range) {
    if (isPowerOfTwoMinusOne(range)) {
      return bitmask(range);
    } else {
      return downscaleToLoopCheckedRange(range);
    }
  }

  function isEvenlyDivisibleByMaxInt32(value) {
    return (value | 0) === 0;
  }

  function upscaleWithHighMasking(masking) {
    return engine => {
      const high = engine.next() & masking;
      const low = engine.next() >>> 0;
      return high * UINT32_SIZE + low;
    };
  }

  function upscaleToLoopCheckedRange(extendedRange) {
    const maximum = extendedRange * Math.floor(SMALLEST_UNSAFE_INTEGER / extendedRange);
    return engine => {
      let ret = 0;

      do {
        const high = engine.next() & UINT21_MAX;
        const low = engine.next() >>> 0;
        ret = high * UINT32_SIZE + low;
      } while (ret >= maximum);

      return ret % extendedRange;
    };
  }

  function upscaleWithinU53(range) {
    const extendedRange = range + 1;

    if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
      const highRange = (extendedRange / UINT32_SIZE | 0) - 1;

      if (isPowerOfTwoMinusOne(highRange)) {
        return upscaleWithHighMasking(highRange);
      }
    }

    return upscaleToLoopCheckedRange(extendedRange);
  }

  function upscaleWithinI53AndLoopCheck(min, max) {
    return engine => {
      let ret = 0;

      do {
        const high = engine.next() | 0;
        const low = engine.next() >>> 0;
        ret = (high & UINT21_MAX) * UINT32_SIZE + low + (high & UINT21_SIZE ? -SMALLEST_UNSAFE_INTEGER : 0);
      } while (ret < min || ret > max);

      return ret;
    };
  }
  /**
   * Returns a Distribution to return a value within [min, max]
   * @param min The minimum integer value, inclusive. No less than -0x20000000000000.
   * @param max The maximum integer value, inclusive. No greater than 0x20000000000000.
   */


  function integer(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);

    if (min < -SMALLEST_UNSAFE_INTEGER || !isFinite(min)) {
      throw new RangeError("Expected min to be at least ".concat(-SMALLEST_UNSAFE_INTEGER));
    } else if (max > SMALLEST_UNSAFE_INTEGER || !isFinite(max)) {
      throw new RangeError("Expected max to be at most ".concat(SMALLEST_UNSAFE_INTEGER));
    }

    const range = max - min;

    if (range <= 0 || !isFinite(range)) {
      return () => min;
    } else if (range === UINT32_MAX) {
      if (min === 0) {
        return uint32;
      } else {
        return add(int32, min + INT32_SIZE);
      }
    } else if (range < UINT32_MAX) {
      return add(downscaleToRange(range), min);
    } else if (range === LARGEST_SAFE_INTEGER) {
      return add(uint53, min);
    } else if (range < LARGEST_SAFE_INTEGER) {
      return add(upscaleWithinU53(range), min);
    } else if (max - 1 - min === LARGEST_SAFE_INTEGER) {
      return add(uint53Full, min);
    } else if (min === -SMALLEST_UNSAFE_INTEGER && max === SMALLEST_UNSAFE_INTEGER) {
      return int53Full;
    } else if (min === -SMALLEST_UNSAFE_INTEGER && max === LARGEST_SAFE_INTEGER) {
      return int53;
    } else if (min === -LARGEST_SAFE_INTEGER && max === SMALLEST_UNSAFE_INTEGER) {
      return add(int53, 1);
    } else if (max === SMALLEST_UNSAFE_INTEGER) {
      return add(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
    } else {
      return upscaleWithinI53AndLoopCheck(min, max);
    }
  }
  // has 2**x chars, for faster uniform distribution


  const DEFAULT_STRING_POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

  function string() {
    let pool = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STRING_POOL;
    const poolLength = pool.length;

    if (!poolLength) {
      throw new Error("Expected pool not to be an empty string");
    }

    const distribution = integer(0, poolLength - 1);
    return (engine, length) => {
      let result = "";

      for (let i = 0; i < length; ++i) {
        const j = distribution(engine);
        result += pool.charAt(j);
      }

      return result;
    };
  }

  const LOWER_HEX_POOL = "0123456789abcdef";
  const lowerHex = string(LOWER_HEX_POOL);
  const upperHex = string(LOWER_HEX_POOL.toUpperCase());

  const stringRepeat = (() => {
    try {
      if ("x".repeat(3) === "xxx") {
        return (pattern, count) => pattern.repeat(count);
      }
    } catch (_) {// nothing to do here
    }

    return (pattern, count) => {
      let result = "";

      while (count > 0) {
        if (count & 1) {
          result += pattern;
        }

        count >>= 1;
        pattern += pattern;
      }

      return result;
    };
  })();
  /**
   * An int32-producing Engine that uses `Math.random()`
   */


  const nativeMath = {
    next() {
      return Math.random() * UINT32_SIZE | 0;
    }

  }; // tslint:disable:unified-signatures
  /**
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array
   */


  const I32Array = (() => {
    try {
      const buffer = new ArrayBuffer(4);
      const view = new Int32Array(buffer);
      view[0] = INT32_SIZE;

      if (view[0] === -INT32_SIZE) {
        return Int32Array;
      }
    } catch (_) {// nothing to do here
    }

    return Array;
  })();
  /**
   * Returns an array of random int32 values, based on current time
   * and a random number engine
   *
   * @param engine an Engine to pull random values from, default `nativeMath`
   * @param length the length of the Array, minimum 1, default 16
   */

  function createEntropy() {
    let engine = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : nativeMath;
    let length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 16;
    const array = [];
    array.push(new Date().getTime() | 0);

    for (let i = 1; i < length; ++i) {
      array[i] = engine.next() | 0;
    }

    return array;
  }
  /**
   * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
   */


  const imul = (() => {
    try {
      if (Math.imul(UINT32_MAX, 5) === -5) {
        return Math.imul;
      }
    } catch (_) {// nothing to do here
    }

    const UINT16_MAX = 0xffff;
    return (a, b) => {
      const ah = a >>> 16 & UINT16_MAX;
      const al = a & UINT16_MAX;
      const bh = b >>> 16 & UINT16_MAX;
      const bl = b & UINT16_MAX; // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value

      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    };
  })();

  const ARRAY_SIZE = 624;
  const ARRAY_MAX = ARRAY_SIZE - 1;
  const M = 397;
  const ARRAY_SIZE_MINUS_M = ARRAY_SIZE - M;
  const A = 0x9908b0df;
  /**
   * An Engine that is a pseudorandom number generator using the Mersenne
   * Twister algorithm based on the prime 2**19937 − 1
   *
   * See http://en.wikipedia.org/wiki/Mersenne_twister
   */

  class MersenneTwister19937 {
    /**
     * MersenneTwister19937 should not be instantiated directly.
     * Instead, use the static methods `seed`, `seedWithArray`, or `autoSeed`.
     */
    constructor() {
      this.data = new I32Array(ARRAY_SIZE);
      this.index = 0; // integer within [0, 624]

      this.uses = 0;
    }
    /**
     * Returns a MersenneTwister19937 seeded with an initial int32 value
     * @param initial the initial seed value
     */


    static seed(initial) {
      return new MersenneTwister19937().seed(initial);
    }
    /**
     * Returns a MersenneTwister19937 seeded with zero or more int32 values
     * @param source A series of int32 values
     */


    static seedWithArray(source) {
      return new MersenneTwister19937().seedWithArray(source);
    }
    /**
     * Returns a MersenneTwister19937 seeded with the current time and
     * a series of natively-generated random values
     */


    static autoSeed() {
      return MersenneTwister19937.seedWithArray(createEntropy());
    }
    /**
     * Returns the next int32 value of the sequence
     */


    next() {
      if ((this.index | 0) >= ARRAY_SIZE) {
        refreshData(this.data);
        this.index = 0;
      }

      const value = this.data[this.index];
      this.index = this.index + 1 | 0;
      this.uses += 1;
      return temper(value) | 0;
    }
    /**
     * Returns the number of times that the Engine has been used.
     *
     * This can be provided to an unused MersenneTwister19937 with the same
     * seed, bringing it to the exact point that was left off.
     */


    getUseCount() {
      return this.uses;
    }
    /**
     * Discards one or more items from the engine
     * @param count The count of items to discard
     */


    discard(count) {
      if (count <= 0) {
        return this;
      }

      this.uses += count;

      if ((this.index | 0) >= ARRAY_SIZE) {
        refreshData(this.data);
        this.index = 0;
      }

      while (count + this.index > ARRAY_SIZE) {
        count -= ARRAY_SIZE - this.index;
        refreshData(this.data);
        this.index = 0;
      }

      this.index = this.index + count | 0;
      return this;
    }

    seed(initial) {
      let previous = 0;
      this.data[0] = previous = initial | 0;

      for (let i = 1; i < ARRAY_SIZE; i = i + 1 | 0) {
        this.data[i] = previous = imul(previous ^ previous >>> 30, 0x6c078965) + i | 0;
      }

      this.index = ARRAY_SIZE;
      this.uses = 0;
      return this;
    }

    seedWithArray(source) {
      this.seed(0x012bd6aa);
      seedWithArray(this.data, source);
      return this;
    }

  }

  function refreshData(data) {
    let k = 0;
    let tmp = 0;

    for (; (k | 0) < ARRAY_SIZE_MINUS_M; k = k + 1 | 0) {
      tmp = data[k] & INT32_SIZE | data[k + 1 | 0] & INT32_MAX;
      data[k] = data[k + M | 0] ^ tmp >>> 1 ^ (tmp & 0x1 ? A : 0);
    }

    for (; (k | 0) < ARRAY_MAX; k = k + 1 | 0) {
      tmp = data[k] & INT32_SIZE | data[k + 1 | 0] & INT32_MAX;
      data[k] = data[k - ARRAY_SIZE_MINUS_M | 0] ^ tmp >>> 1 ^ (tmp & 0x1 ? A : 0);
    }

    tmp = data[ARRAY_MAX] & INT32_SIZE | data[0] & INT32_MAX;
    data[ARRAY_MAX] = data[M - 1] ^ tmp >>> 1 ^ (tmp & 0x1 ? A : 0);
  }

  function temper(value) {
    value ^= value >>> 11;
    value ^= value << 7 & 0x9d2c5680;
    value ^= value << 15 & 0xefc60000;
    return value ^ value >>> 18;
  }

  function seedWithArray(data, source) {
    let i = 1;
    let j = 0;
    const sourceLength = source.length;
    let k = Math.max(sourceLength, ARRAY_SIZE) | 0;
    let previous = data[0] | 0;

    for (; (k | 0) > 0; --k) {
      data[i] = previous = (data[i] ^ imul(previous ^ previous >>> 30, 0x0019660d)) + (source[j] | 0) + (j | 0) | 0;
      i = i + 1 | 0;
      ++j;

      if ((i | 0) > ARRAY_MAX) {
        data[0] = data[ARRAY_MAX];
        i = 1;
      }

      if (j >= sourceLength) {
        j = 0;
      }
    }

    for (k = ARRAY_MAX; (k | 0) > 0; --k) {
      data[i] = previous = (data[i] ^ imul(previous ^ previous >>> 30, 0x5d588b65)) - i | 0;
      i = i + 1 | 0;

      if ((i | 0) > ARRAY_MAX) {
        data[0] = data[ARRAY_MAX];
        i = 1;
      }
    }

    data[0] = INT32_SIZE;
  }

  function checkFloat(n) {
    return n > 0.0 && n <= 1.0;
  }
  /**
   * Select n with replacement elements on the training set and values, where n is the size of the training set.
   * @ignore
   * @param {Matrix} trainingSet
   * @param {Array} trainingValue
   * @param {number} seed - seed for the random selection, must be a 32-bit integer.
   * @return {object} with new X and y.
   */

  function examplesBaggingWithReplacement(trainingSet, trainingValue, seed) {
    var engine;
    var distribution = integer(0, trainingSet.rows - 1);

    if (seed === undefined) {
      engine = MersenneTwister19937.autoSeed();
    } else if (Number.isInteger(seed)) {
      engine = MersenneTwister19937.seed(seed);
    } else {
      throw new RangeError("Expected seed must be undefined or integer not ".concat(seed));
    }

    var Xr = new Array(trainingSet.rows);
    var yr = new Array(trainingSet.rows);

    for (var i = 0; i < trainingSet.rows; ++i) {
      var index = distribution(engine);
      Xr[i] = trainingSet.getRow(index);
      yr[i] = trainingValue[index];
    }

    return {
      X: new Matrix(Xr),
      y: yr
    };
  }
  /**
   * selects n features from the training set with or without replacement, returns the new training set and the indexes used.
   * @ignore
   * @param {Matrix} trainingSet
   * @param {number} n - features.
   * @param {boolean} replacement
   * @param {number} seed - seed for the random selection, must be a 32-bit integer.
   * @return {object}
   */

  function featureBagging(trainingSet, n, replacement, seed) {
    if (trainingSet.columns < n) {
      throw new RangeError('N should be less or equal to the number of columns of X');
    }

    var distribution = integer(0, trainingSet.columns - 1);
    var engine;

    if (seed === undefined) {
      engine = MersenneTwister19937.autoSeed();
    } else if (Number.isInteger(seed)) {
      engine = MersenneTwister19937.seed(seed);
    } else {
      throw new RangeError("Expected seed must be undefined or integer not ".concat(seed));
    }

    var toRet = new Matrix(trainingSet.rows, n);

    if (replacement) {
      var usedIndex = new Array(n);

      for (var i = 0; i < n; ++i) {
        var index = distribution(engine);
        usedIndex[i] = index;
        toRet.setColumn(i, trainingSet.getColumn(index));
      }
    } else {
      usedIndex = new Set();
      index = distribution(engine);

      for (i = 0; i < n; ++i) {
        while (usedIndex.has(index)) {
          index = distribution(engine);
        }

        toRet.setColumn(i, trainingSet.getColumn(index));
        usedIndex.add(index);
      }

      usedIndex = Array.from(usedIndex);
    }

    return {
      X: toRet,
      usedIndex: usedIndex
    };
  }

  /**
   * @class RandomForestBase
   */

  class RandomForestBase {
    /**
     * Create a new base random forest for a classifier or regression model.
     * @constructor
     * @param {object} options
     * @param {number|String} [options.maxFeatures] - the number of features used on each estimator.
     *        * if is an integer it selects maxFeatures elements over the sample features.
     *        * if is a float between (0, 1), it takes the percentage of features.
     * @param {boolean} [options.replacement] - use replacement over the sample features.
     * @param {number} [options.seed] - seed for feature and samples selection, must be a 32-bit integer.
     * @param {number} [options.nEstimators] - number of estimator to use.
     * @param {object} [options.treeOptions] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
     * @param {boolean} [options.isClassifier] - boolean to check if is a classifier or regression model (used by subclasses).
     * @param {boolean} [options.useSampleBagging] - use bagging over training samples.
     * @param {object} model - for load purposes.
     */
    constructor(options, model) {
      if (options === true) {
        this.replacement = model.replacement;
        this.maxFeatures = model.maxFeatures;
        this.nEstimators = model.nEstimators;
        this.treeOptions = model.treeOptions;
        this.isClassifier = model.isClassifier;
        this.seed = model.seed;
        this.n = model.n;
        this.indexes = model.indexes;
        this.useSampleBagging = model.useSampleBagging;
        var Estimator = this.isClassifier ? DecisionTreeClassifier : DecisionTreeRegression;
        this.estimators = model.estimators.map(est => Estimator.load(est));
      } else {
        this.replacement = options.replacement;
        this.maxFeatures = options.maxFeatures;
        this.nEstimators = options.nEstimators;
        this.treeOptions = options.treeOptions;
        this.isClassifier = options.isClassifier;
        this.seed = options.seed;
        this.useSampleBagging = options.useSampleBagging;
      }
    }
    /**
     * Train the decision tree with the given training set and labels.
     * @param {Matrix|Array} trainingSet
     * @param {Array} trainingValues
     */


    train(trainingSet, trainingValues) {
      trainingSet = Matrix.checkMatrix(trainingSet);
      this.maxFeatures = this.maxFeatures || trainingSet.columns;

      if (checkFloat(this.maxFeatures)) {
        this.n = Math.floor(trainingSet.columns * this.maxFeatures);
      } else if (Number.isInteger(this.maxFeatures)) {
        if (this.maxFeatures > trainingSet.columns) {
          throw new RangeError("The maxFeatures parameter should be less than ".concat(trainingSet.columns));
        } else {
          this.n = this.maxFeatures;
        }
      } else {
        throw new RangeError("Cannot process the maxFeatures parameter ".concat(this.maxFeatures));
      }

      if (this.isClassifier) {
        var Estimator = DecisionTreeClassifier;
      } else {
        Estimator = DecisionTreeRegression;
      }

      this.estimators = new Array(this.nEstimators);
      this.indexes = new Array(this.nEstimators);

      for (var i = 0; i < this.nEstimators; ++i) {
        var res = this.useSampleBagging ? examplesBaggingWithReplacement(trainingSet, trainingValues, this.seed) : {
          X: trainingSet,
          y: trainingValues
        };
        var X = res.X;
        var y = res.y;
        res = featureBagging(X, this.n, this.replacement, this.seed);
        X = res.X;
        this.indexes[i] = res.usedIndex;
        this.estimators[i] = new Estimator(this.treeOptions);
        this.estimators[i].train(X, y);
      }
    }
    /**
     * Method that returns the way the algorithm generates the predictions, for example, in classification
     * you can return the mode of all predictions retrieved by the trees, or in case of regression you can
     * use the mean or the median.
     * @abstract
     * @param {Array} values - predictions of the estimators.
     * @return {number} prediction.
     */
    // eslint-disable-next-line no-unused-vars


    selection(values) {
      throw new Error("Abstract method 'selection' not implemented!");
    }
    /**
     * Predicts the output given the matrix to predict.
     * @param {Matrix|Array} toPredict
     * @return {Array} predictions
     */


    predict(toPredict) {
      var predictionValues = new Array(this.nEstimators);
      toPredict = Matrix.checkMatrix(toPredict);

      for (var i = 0; i < this.nEstimators; ++i) {
        var X = new MatrixColumnSelectionView(toPredict, this.indexes[i]); // get features for estimator

        predictionValues[i] = this.estimators[i].predict(X);
      }

      predictionValues = new MatrixTransposeView(new WrapperMatrix2D(predictionValues));
      var predictions = new Array(predictionValues.rows);

      for (i = 0; i < predictionValues.rows; ++i) {
        predictions[i] = this.selection(predictionValues.getRow(i));
      }

      return predictions;
    }
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      return {
        indexes: this.indexes,
        n: this.n,
        replacement: this.replacement,
        maxFeatures: this.maxFeatures,
        nEstimators: this.nEstimators,
        treeOptions: this.treeOptions,
        isClassifier: this.isClassifier,
        seed: this.seed,
        estimators: this.estimators.map(est => est.toJSON()),
        useSampleBagging: this.useSampleBagging
      };
    }

  }

  const defaultOptions$2 = {
    maxFeatures: 1.0,
    replacement: true,
    nEstimators: 10,
    seed: 42,
    useSampleBagging: false
  };
  /**
   * @class RandomForestClassifier
   * @augments RandomForestBase
   */

  class RandomForestClassifier extends RandomForestBase {
    /**
     * Create a new base random forest for a classifier or regression model.
     * @constructor
     * @param {object} options
     * @param {number} [options.maxFeatures=1.0] - the number of features used on each estimator.
     *        * if is an integer it selects maxFeatures elements over the sample features.
     *        * if is a float between (0, 1), it takes the percentage of features.
     * @param {boolean} [options.replacement=true] - use replacement over the sample features.
     * @param {number} [options.seed=42] - seed for feature and samples selection, must be a 32-bit integer.
     * @param {number} [options.nEstimators=10] - number of estimator to use.
     * @param {object} [options.treeOptions={}] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
     * @param {boolean} [options.useSampleBagging=false] - use bagging over training samples.
     * @param {object} model - for load purposes.
     */
    constructor(options, model) {
      if (options === true) {
        super(true, model.baseModel);
      } else {
        options = Object.assign({}, defaultOptions$2, options);
        options.isClassifier = true;
        super(options);
      }
    }
    /**
     * retrieve the prediction given the selection method.
     * @param {Array} values - predictions of the estimators.
     * @return {number} prediction
     */


    selection(values) {
      return mode(values);
    }
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      var baseModel = super.toJSON();
      return {
        baseModel: baseModel,
        name: 'RFClassifier'
      };
    }
    /**
     * Load a Decision tree classifier with the given model.
     * @param {object} model
     * @return {RandomForestClassifier}
     */


    static load(model) {
      if (model.name !== 'RFClassifier') {
        throw new RangeError("Invalid model: ".concat(model.name));
      }

      return new RandomForestClassifier(true, model);
    }

  }
  /**
   * Return the most repeated element on the array.
   * @param {Array} arr
   * @return {number} mode
   */

  function mode(arr) {
    return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var medianQuickselect_min = createCommonjsModule(function (module) {
    (function () {
      function a(d) {
        for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
          if (f <= e) return d[j];
          if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

          for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
            do h++; while (d[e] > d[h]);

            do i--; while (d[i] > d[e]);

            if (i < h) break;
            b(d, h, i);
          }

          b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
        }
      }

      var b = function b(d, e, f) {
        var _ref;

        return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
      },
          c = function c(d, e) {
        return ~~((d + e) / 2);
      };

       module.exports ? module.exports = a : window.median = a;
    })();
  });

  /**
   * Computes the median of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function median(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    return medianQuickselect_min(input.slice());
  }

  const selectionMethods = {
    mean: mean,
    median: median
  };
  const defaultOptions$3 = {
    maxFeatures: 1.0,
    replacement: false,
    nEstimators: 10,
    treeOptions: {},
    selectionMethod: 'mean',
    seed: 42,
    useSampleBagging: false
  };
  /**
   * @class RandomForestRegression
   * @augments RandomForestBase
   */

  class RandomForestRegression extends RandomForestBase {
    /**
     * Create a new base random forest for a classifier or regression model.
     * @constructor
     * @param {object} options
     * @param {number} [options.maxFeatures=1.0] - the number of features used on each estimator.
     *        * if is an integer it selects maxFeatures elements over the sample features.
     *        * if is a float between (0, 1), it takes the percentage of features.
     * @param {boolean} [options.replacement=true] - use replacement over the sample features.
     * @param {number} [options.seed=42] - seed for feature and samples selection, must be a 32-bit integer.
     * @param {number} [options.nEstimators=10] - number of estimator to use.
     * @param {object} [options.treeOptions={}] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
     * @param {string} [options.selectionMethod="mean"] - the way to calculate the prediction from estimators, "mean" and "median" are supported.
     * @param {boolean} [options.useSampleBagging=false] - use bagging over training samples.
     * @param {object} model - for load purposes.
     */
    constructor(options, model) {
      if (options === true) {
        super(true, model.baseModel);
        this.selectionMethod = model.selectionMethod;
      } else {
        options = Object.assign({}, defaultOptions$3, options);

        if (!(options.selectionMethod === 'mean' || options.selectionMethod === 'median')) {
          throw new RangeError("Unsupported selection method ".concat(options.selectionMethod));
        }

        options.isClassifier = false;
        super(options);
        this.selectionMethod = options.selectionMethod;
      }
    }
    /**
     * retrieve the prediction given the selection method.
     * @param {Array} values - predictions of the estimators.
     * @return {number} prediction
     */


    selection(values) {
      return selectionMethods[this.selectionMethod](values);
    }
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      var baseModel = super.toJSON();
      return {
        baseModel: baseModel,
        selectionMethod: this.selectionMethod,
        name: 'RFRegression'
      };
    }
    /**
     * Load a Decision tree classifier with the given model.
     * @param {object} model
     * @return {RandomForestRegression}
     */


    static load(model) {
      if (model.name !== 'RFRegression') {
        throw new RangeError("Invalid model: ".concat(model.name));
      }

      return new RandomForestRegression(true, model);
    }

  }

  /**
   * Creates new PCA (Principal Component Analysis) from the dataset
   * @param {Matrix} dataset - dataset or covariance matrix
   * @param {Object} [options]
   * @param {boolean} [options.isCovarianceMatrix=false] - true if the dataset is a covariance matrix
   * @param {boolean} [options.useCovarianceMatrix=false] - force the use of the covariance matrix instead of singular value decomposition.
   * @param {boolean} [options.center=true] - should the data be centered (subtract the mean)
   * @param {boolean} [options.scale=false] - should the data be scaled (divide by the standard deviation)
   * */

  class PCA {
    constructor(dataset) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (dataset === true) {
        const model = options;
        this.center = model.center;
        this.scale = model.scale;
        this.means = model.means;
        this.stdevs = model.stdevs;
        this.U = Matrix.checkMatrix(model.U);
        this.S = model.S;
        return;
      }

      dataset = new Matrix(dataset);
      const {
        isCovarianceMatrix = false,
        center = true,
        scale = false
      } = options;
      this.center = center;
      this.scale = scale;
      this.means = null;
      this.stdevs = null;

      if (isCovarianceMatrix) {
        // user provided a covariance matrix instead of dataset
        this._computeFromCovarianceMatrix(dataset);

        return;
      }

      var useCovarianceMatrix;

      if (typeof options.useCovarianceMatrix === 'boolean') {
        useCovarianceMatrix = options.useCovarianceMatrix;
      } else {
        useCovarianceMatrix = dataset.rows > dataset.columns;
      }

      if (useCovarianceMatrix) {
        // user provided a dataset but wants us to compute and use the covariance matrix
        this._adjust(dataset);

        const covarianceMatrix = new MatrixTransposeView(dataset).mmul(dataset).div(dataset.rows - 1);

        this._computeFromCovarianceMatrix(covarianceMatrix);
      } else {
        this._adjust(dataset);

        var svd = new SingularValueDecomposition(dataset, {
          computeLeftSingularVectors: false,
          computeRightSingularVectors: true,
          autoTranspose: true
        });
        this.U = svd.rightSingularVectors;
        const singularValues = svd.diagonal;
        const eigenvalues = [];

        for (const singularValue of singularValues) {
          eigenvalues.push(singularValue * singularValue / (dataset.rows - 1));
        }

        this.S = eigenvalues;
      }
    }
    /**
     * Load a PCA model from JSON
     * @param {Object} model
     * @return {PCA}
     */


    static load(model) {
      if (typeof model.name !== 'string') {
        throw new TypeError('model must have a name property');
      }

      if (model.name !== 'PCA') {
        throw new RangeError("invalid model: ".concat(model.name));
      }

      return new PCA(true, model);
    }
    /**
     * Project the dataset into the PCA space
     * @param {Matrix} dataset
     * @param {Object} options
     * @return {Matrix} dataset projected in the PCA space
     */


    predict(dataset) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const {
        nComponents = this.U.columns
      } = options;
      dataset = new Matrix(dataset);

      if (this.center) {
        dataset.subRowVector(this.means);

        if (this.scale) {
          dataset.divRowVector(this.stdevs);
        }
      }

      var predictions = dataset.mmul(this.U);
      return predictions.subMatrix(0, predictions.rows - 1, 0, nComponents - 1);
    }
    /**
     * Returns the proportion of variance for each component
     * @return {[number]}
     */


    getExplainedVariance() {
      var sum = 0;

      for (const s of this.S) {
        sum += s;
      }

      return this.S.map(value => value / sum);
    }
    /**
     * Returns the cumulative proportion of variance
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
     * Returns the Eigenvectors of the covariance matrix
     * @returns {Matrix}
     */


    getEigenvectors() {
      return this.U;
    }
    /**
     * Returns the Eigenvalues (on the diagonal)
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
    /**
     * Export the current model to a JSON object
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
        S: this.S
      };
    }

    _adjust(dataset) {
      if (this.center) {
        const mean = dataset.mean('column');
        const stdevs = this.scale ? dataset.standardDeviation('column', {
          mean
        }) : null;
        this.means = mean;
        dataset.subRowVector(mean);

        if (this.scale) {
          for (var i = 0; i < stdevs.length; i++) {
            if (stdevs[i] === 0) {
              throw new RangeError("Cannot scale the dataset (standard deviation is zero at index ".concat(i));
            }
          }

          this.stdevs = stdevs;
          dataset.divRowVector(stdevs);
        }
      }
    }

    _computeFromCovarianceMatrix(dataset) {
      const evd = new EigenvalueDecomposition(dataset, {
        assumeSymmetric: true
      });
      this.U = evd.eigenvectorMatrix;
      this.U.flipRows();
      this.S = evd.realEigenvalues;
      this.S.reverse();
    }

  }

  function squaredEuclidean(p, q) {
    let d = 0;

    for (let i = 0; i < p.length; i++) {
      d += (p[i] - q[i]) * (p[i] - q[i]);
    }

    return d;
  }
  function euclidean(p, q) {
    return Math.sqrt(squaredEuclidean(p, q));
  }

  var euclidean$1 = /*#__PURE__*/Object.freeze({
    squaredEuclidean: squaredEuclidean,
    euclidean: euclidean
  });

  /**
   * Computes a distance/similarity matrix given an array of data and a distance/similarity function.
   * @param {Array} data An array of data
   * @param {function} distanceFn  A function that accepts two arguments and computes a distance/similarity between them
   * @return {Array<Array>} The similarity matrix. The similarity matrix is square and has a size equal to the length of
   * the data array
   */

  function distanceMatrix(data, distanceFn) {
    const length = data.length;
    let result = Array.from({
      length
    }).map(() => Array.from({
      length
    })); // Compute upper distance matrix

    for (let i = 0; i < length; i++) {
      for (let j = 0; j <= i; j++) {
        result[i][j] = distanceFn(data[i], data[j]);
      }
    } // Copy to lower distance matrix


    for (let i = 0; i < length; i++) {
      for (let j = i + 1; j < length; j++) {
        result[i][j] = result[j][i];
      }
    }

    return result;
  }

  var src$1 = distanceMatrix;

  var heap = createCommonjsModule(function (module, exports) {
    // Generated by CoffeeScript 1.8.0
    (function () {
      var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

      floor = Math.floor, min = Math.min;
      /*
      Default comparison function to be used
       */

      defaultCmp = function defaultCmp(x, y) {
        if (x < y) {
          return -1;
        }

        if (x > y) {
          return 1;
        }

        return 0;
      };
      /*
      Insert item x in list a, and keep it sorted assuming a is sorted.
      
      If x is already in a, insert it to the right of the rightmost x.
      
      Optional args lo (default 0) and hi (default a.length) bound the slice
      of a to be searched.
       */


      insort = function insort(a, x, lo, hi, cmp) {
        var mid;

        if (lo == null) {
          lo = 0;
        }

        if (cmp == null) {
          cmp = defaultCmp;
        }

        if (lo < 0) {
          throw new Error('lo must be non-negative');
        }

        if (hi == null) {
          hi = a.length;
        }

        while (lo < hi) {
          mid = floor((lo + hi) / 2);

          if (cmp(x, a[mid]) < 0) {
            hi = mid;
          } else {
            lo = mid + 1;
          }
        }

        return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
      };
      /*
      Push item onto heap, maintaining the heap invariant.
       */


      heappush = function heappush(array, item, cmp) {
        if (cmp == null) {
          cmp = defaultCmp;
        }

        array.push(item);
        return _siftdown(array, 0, array.length - 1, cmp);
      };
      /*
      Pop the smallest item off the heap, maintaining the heap invariant.
       */


      heappop = function heappop(array, cmp) {
        var lastelt, returnitem;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        lastelt = array.pop();

        if (array.length) {
          returnitem = array[0];
          array[0] = lastelt;

          _siftup(array, 0, cmp);
        } else {
          returnitem = lastelt;
        }

        return returnitem;
      };
      /*
      Pop and return the current smallest value, and add the new item.
      
      This is more efficient than heappop() followed by heappush(), and can be
      more appropriate when using a fixed size heap. Note that the value
      returned may be larger than item! That constrains reasonable use of
      this routine unless written as part of a conditional replacement:
          if item > array[0]
            item = heapreplace(array, item)
       */


      heapreplace = function heapreplace(array, item, cmp) {
        var returnitem;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        returnitem = array[0];
        array[0] = item;

        _siftup(array, 0, cmp);

        return returnitem;
      };
      /*
      Fast version of a heappush followed by a heappop.
       */


      heappushpop = function heappushpop(array, item, cmp) {
        var _ref;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        if (array.length && cmp(array[0], item) < 0) {
          _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];

          _siftup(array, 0, cmp);
        }

        return item;
      };
      /*
      Transform list into a heap, in-place, in O(array.length) time.
       */


      heapify = function heapify(array, cmp) {
        var i, _i, _len, _ref1, _results, _results1;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        _ref1 = function () {
          _results1 = [];

          for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
            _results1.push(_j);
          }

          return _results1;
        }.apply(this).reverse();

        _results = [];

        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          i = _ref1[_i];

          _results.push(_siftup(array, i, cmp));
        }

        return _results;
      };
      /*
      Update the position of the given item in the heap.
      This function should be called every time the item is being modified.
       */


      updateItem = function updateItem(array, item, cmp) {
        var pos;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        pos = array.indexOf(item);

        if (pos === -1) {
          return;
        }

        _siftdown(array, 0, pos, cmp);

        return _siftup(array, pos, cmp);
      };
      /*
      Find the n largest elements in a dataset.
       */


      nlargest = function nlargest(array, n, cmp) {
        var elem, result, _i, _len, _ref;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        result = array.slice(0, n);

        if (!result.length) {
          return result;
        }

        heapify(result, cmp);
        _ref = array.slice(n);

        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          elem = _ref[_i];
          heappushpop(result, elem, cmp);
        }

        return result.sort(cmp).reverse();
      };
      /*
      Find the n smallest elements in a dataset.
       */


      nsmallest = function nsmallest(array, n, cmp) {
        var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        if (n * 10 <= array.length) {
          result = array.slice(0, n).sort(cmp);

          if (!result.length) {
            return result;
          }

          los = result[result.length - 1];
          _ref = array.slice(n);

          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];

            if (cmp(elem, los) < 0) {
              insort(result, elem, 0, null, cmp);
              result.pop();
              los = result[result.length - 1];
            }
          }

          return result;
        }

        heapify(array, cmp);
        _results = [];

        for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
          _results.push(heappop(array, cmp));
        }

        return _results;
      };

      _siftdown = function _siftdown(array, startpos, pos, cmp) {
        var newitem, parent, parentpos;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        newitem = array[pos];

        while (pos > startpos) {
          parentpos = pos - 1 >> 1;
          parent = array[parentpos];

          if (cmp(newitem, parent) < 0) {
            array[pos] = parent;
            pos = parentpos;
            continue;
          }

          break;
        }

        return array[pos] = newitem;
      };

      _siftup = function _siftup(array, pos, cmp) {
        var childpos, endpos, newitem, rightpos, startpos;

        if (cmp == null) {
          cmp = defaultCmp;
        }

        endpos = array.length;
        startpos = pos;
        newitem = array[pos];
        childpos = 2 * pos + 1;

        while (childpos < endpos) {
          rightpos = childpos + 1;

          if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
            childpos = rightpos;
          }

          array[pos] = array[childpos];
          pos = childpos;
          childpos = 2 * pos + 1;
        }

        array[pos] = newitem;
        return _siftdown(array, startpos, pos, cmp);
      };

      Heap = function () {
        Heap.push = heappush;
        Heap.pop = heappop;
        Heap.replace = heapreplace;
        Heap.pushpop = heappushpop;
        Heap.heapify = heapify;
        Heap.updateItem = updateItem;
        Heap.nlargest = nlargest;
        Heap.nsmallest = nsmallest;

        function Heap(cmp) {
          this.cmp = cmp != null ? cmp : defaultCmp;
          this.nodes = [];
        }

        Heap.prototype.push = function (x) {
          return heappush(this.nodes, x, this.cmp);
        };

        Heap.prototype.pop = function () {
          return heappop(this.nodes, this.cmp);
        };

        Heap.prototype.peek = function () {
          return this.nodes[0];
        };

        Heap.prototype.contains = function (x) {
          return this.nodes.indexOf(x) !== -1;
        };

        Heap.prototype.replace = function (x) {
          return heapreplace(this.nodes, x, this.cmp);
        };

        Heap.prototype.pushpop = function (x) {
          return heappushpop(this.nodes, x, this.cmp);
        };

        Heap.prototype.heapify = function () {
          return heapify(this.nodes, this.cmp);
        };

        Heap.prototype.updateItem = function (x) {
          return updateItem(this.nodes, x, this.cmp);
        };

        Heap.prototype.clear = function () {
          return this.nodes = [];
        };

        Heap.prototype.empty = function () {
          return this.nodes.length === 0;
        };

        Heap.prototype.size = function () {
          return this.nodes.length;
        };

        Heap.prototype.clone = function () {
          var heap;
          heap = new Heap();
          heap.nodes = this.nodes.slice(0);
          return heap;
        };

        Heap.prototype.toArray = function () {
          return this.nodes.slice(0);
        };

        Heap.prototype.insert = Heap.prototype.push;
        Heap.prototype.top = Heap.prototype.peek;
        Heap.prototype.front = Heap.prototype.peek;
        Heap.prototype.has = Heap.prototype.contains;
        Heap.prototype.copy = Heap.prototype.clone;
        return Heap;
      }();

      (function (root, factory) {
        {
          return module.exports = factory();
        }
      })(this, function () {
        return Heap;
      });
    }).call(commonjsGlobal);
  });

  var heap$1 = heap;

  class Cluster {
    constructor() {
      this.children = [];
      this.distance = -1;
      this.index = [];
    }
    /**
     * Creates an array of values where maximum distance smaller than the threshold
     * @param {number} threshold
     * @return {Array <Cluster>}
     */


    cut(threshold) {
      if (threshold < 0) throw new RangeError('Threshold too small');
      var root = new Cluster();
      root.children = this.children;
      root.distance = this.distance;
      root.index = this.index;
      var list = [root];
      var ans = [];

      while (list.length > 0) {
        var aux = list.shift();

        if (threshold >= aux.distance) {
          ans.push(aux);
        } else {
          list = list.concat(aux.children);
        }
      }

      return ans;
    }
    /**
     * Merge the leaves in the minimum way to have 'minGroups' number of clusters
     * @param {number} minGroups - Them minimum number of children the first level of the tree should have
     * @return {Cluster}
     */


    group(minGroups) {
      if (!Number.isInteger(minGroups) || minGroups < 1) {
        throw new RangeError('Number of groups must be a positive integer');
      }

      const heap = new heap$1(function (a, b) {
        return b.distance - a.distance;
      });
      heap.push(this);

      while (heap.size() < minGroups) {
        var first = heap.pop();

        if (first.children.length === 0) {
          break;
        }

        first.children.forEach(child => heap.push(child));
      }

      var root = new Cluster();
      root.children = heap.toArray();
      root.distance = this.distance;
      return root;
    }
    /**
     * Traverses the tree depth-first and provide callback to be called on each individual node
     * @param {function} cb - The callback to be called on each node encounter
     * @type {Cluster}
     */


    traverse(cb) {
      function visit(root, callback) {
        callback(root);

        if (root.children) {
          for (var i = root.children.length - 1; i >= 0; i--) {
            visit(root.children[i], callback);
          }
        }
      }

      visit(this, cb);
    }

  }

  class ClusterLeaf extends Cluster {
    constructor(index) {
      super();
      this.index = index;
      this.distance = 0;
      this.children = [];
    }

  }

  /**
   * @private
   * @param cluster1
   * @param cluster2
   * @param disFun
   * @returns {number}
   */

  function simpleLink(cluster1, cluster2, disFun) {
    var m = 10e100;

    for (var i = 0; i < cluster1.length; i++) {
      for (var j = 0; j < cluster2.length; j++) {
        var d = disFun[cluster1[i]][cluster2[j]];
        m = Math.min(d, m);
      }
    }

    return m;
  }
  /**
   * @private
   * @param cluster1
   * @param cluster2
   * @param disFun
   * @returns {number}
   */


  function completeLink(cluster1, cluster2, disFun) {
    var m = -1;

    for (var i = 0; i < cluster1.length; i++) {
      for (var j = 0; j < cluster2.length; j++) {
        var d = disFun[cluster1[i]][cluster2[j]];
        m = Math.max(d, m);
      }
    }

    return m;
  }
  /**
   * @private
   * @param cluster1
   * @param cluster2
   * @param disFun
   * @returns {number}
   */


  function averageLink(cluster1, cluster2, disFun) {
    var m = 0;

    for (var i = 0; i < cluster1.length; i++) {
      for (var j = 0; j < cluster2.length; j++) {
        m += disFun[cluster1[i]][cluster2[j]];
      }
    }

    return m / (cluster1.length * cluster2.length);
  }
  /**
   * @private
   * @param cluster1
   * @param cluster2
   * @param disFun
   * @returns {*}
   */


  function centroidLink(cluster1, cluster2, disFun) {
    var dist = new Array(cluster1.length * cluster2.length);

    for (var i = 0; i < cluster1.length; i++) {
      for (var j = 0; j < cluster2.length; j++) {
        dist[i * cluster2.length + j] = disFun[cluster1[i]][cluster2[j]];
      }
    }

    return median$1(dist);
  }
  /**
   * @private
   * @param cluster1
   * @param cluster2
   * @param disFun
   * @returns {number}
   */


  function wardLink(cluster1, cluster2, disFun) {
    return centroidLink(cluster1, cluster2, disFun) * cluster1.length * cluster2.length / (cluster1.length + cluster2.length);
  }

  function compareNumbers$1(a, b) {
    return a - b;
  }

  function median$1(values, alreadySorted) {
    if (alreadySorted === undefined) alreadySorted = false;

    if (!alreadySorted) {
      values = [].concat(values).sort(compareNumbers$1);
    }

    var l = values.length;
    var half = Math.floor(l / 2);

    if (l % 2 === 0) {
      return (values[half - 1] + values[half]) * 0.5;
    } else {
      return values[half];
    }
  }
  /**
   * Continuously merge nodes that have the least dissimilarity
   * @param {Array<Array<number>>} distance - Array of points to be clustered
   * @param {object} [options]
   * @param {Function} [options.distanceFunction]
   * @param {string} [options.method]
   * @param {boolean} [options.isDistanceMatrix]
   * @option isDistanceMatrix: Is the input a distance matrix?
   * @constructor
   */


  function agnes(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      distanceFunction = euclidean,
      method = 'single',
      isDistanceMatrix = false
    } = options;
    let methodFunc;
    var len = data.length;
    var distance = data; // If source

    if (!isDistanceMatrix) {
      distance = src$1(data, distanceFunction);
    } // allows to use a string or a given function


    if (typeof method === 'string') {
      switch (method) {
        case 'single':
          methodFunc = simpleLink;
          break;

        case 'complete':
          methodFunc = completeLink;
          break;

        case 'average':
          methodFunc = averageLink;
          break;

        case 'centroid':
          methodFunc = centroidLink;
          break;

        case 'ward':
          methodFunc = wardLink;
          break;

        default:
          throw new RangeError("unknown clustering method: ".concat(method));
      }
    } else if (typeof method !== 'function') {
      throw new TypeError('method must be a string or function');
    }

    var list = new Array(len);

    for (var i = 0; i < distance.length; i++) {
      list[i] = new ClusterLeaf(i);
    }

    var min = 10e5;
    var d = {};
    var dis = 0;

    while (list.length > 1) {
      // calculates the minimum distance
      d = {};
      min = 10e5;

      for (var j = 0; j < list.length; j++) {
        for (var k = j + 1; k < list.length; k++) {
          var fdistance, sdistance;

          if (list[j] instanceof ClusterLeaf) {
            fdistance = [list[j].index];
          } else {
            fdistance = new Array(list[j].index.length);

            for (var e = 0; e < fdistance.length; e++) {
              fdistance[e] = list[j].index[e].index;
            }
          }

          if (list[k] instanceof ClusterLeaf) {
            sdistance = [list[k].index];
          } else {
            sdistance = new Array(list[k].index.length);

            for (var f = 0; f < sdistance.length; f++) {
              sdistance[f] = list[k].index[f].index;
            }
          }

          dis = methodFunc(fdistance, sdistance, distance).toFixed(4);

          if (dis in d) {
            d[dis].push([list[j], list[k]]);
          } else {
            d[dis] = [[list[j], list[k]]];
          }

          min = Math.min(dis, min);
        }
      } // cluster dots


      var dmin = d[min.toFixed(4)];
      var clustered = new Array(dmin.length);
      var count = 0;

      while (dmin.length > 0) {
        let aux = dmin.shift();

        const filterInt = function filterInt(n) {
          return aux.indexOf(n) !== -1;
        };

        const filterDiff = function filterDiff(n) {
          return aux.indexOf(n) === -1;
        };

        for (var q = 0; q < dmin.length; q++) {
          var int = dmin[q].filter(filterInt);

          if (int.length > 0) {
            var diff = dmin[q].filter(filterDiff);
            aux = aux.concat(diff);
            dmin.splice(q--, 1);
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
          if (clustered[ii][jj] instanceof ClusterLeaf) {
            obj.index[indCount++] = clustered[ii][jj];
          } else {
            indCount += clustered[ii][jj].index.length;
            obj.index = clustered[ii][jj].index.concat(obj.index);
          }

          list.splice(list.indexOf(clustered[ii][jj]), 1);
        }

        obj.index.length = indCount;
        list.push(obj);
      }
    }

    return list[0];
  }

  /**
   * @private
   * Returns the most distant point and his distance
   * @param {Array <Array <number>>} splitting - Clusters to split
   * @param {Array <Array <number>>} data - Original data
   * @param {function} disFun - Distance function
   * @returns {{d: number, p: number}} - d: maximum difference between points, p: the point more distant
   */

  function diff(splitting, data, disFun) {
    var ans = {
      d: 0,
      p: 0
    };
    var Ci = new Array(splitting[0].length);

    for (var e = 0; e < splitting[0].length; e++) {
      Ci[e] = data[splitting[0][e]];
    }

    var Cj = new Array(splitting[1].length);

    for (var f = 0; f < splitting[1].length; f++) {
      Cj[f] = data[splitting[1][f]];
    }

    var dist, ndist;

    for (var i = 0; i < Ci.length; i++) {
      dist = 0;

      for (var j = 0; j < Ci.length; j++) {
        if (i !== j) {
          dist += disFun(Ci[i], Ci[j]);
        }
      }

      dist /= Ci.length - 1;
      ndist = 0;

      for (var k = 0; k < Cj.length; k++) {
        ndist += disFun(Ci[i], Cj[k]);
      }

      ndist /= Cj.length;

      if (dist - ndist > ans.d) {
        ans.d = dist - ndist;
        ans.p = i;
      }
    }

    return ans;
  }
  /**
   * @private
   * Intra-cluster distance
   * @param {Array} index
   * @param {Array} data
   * @param {function} disFun
   * @returns {number}
   */


  function intrDist(index, data, disFun) {
    var dist = 0;
    var count = 0;

    for (var i = 0; i < index.length; i++) {
      for (var j = i; j < index.length; j++) {
        dist += disFun(data[index[i].index], data[index[j].index]);
        count++;
      }
    }

    return dist / count;
  }
  /**
   * Splits the higher level clusters
   * @param {Array <Array <number>>} data - Array of points to be clustered
   * @param {object} [options]
   * @param {Function} [options.distanceFunction]
   * @constructor
   */


  function diana(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      distanceFunction = euclidean
    } = options;
    var tree = new Cluster();
    tree.children = new Array(data.length);
    tree.index = new Array(data.length);

    for (var ind = 0; ind < data.length; ind++) {
      tree.children[ind] = new ClusterLeaf(ind);
      tree.index[ind] = new ClusterLeaf(ind);
    }

    tree.distance = intrDist(tree.index, data, distanceFunction);
    var m, M, clId, dist, rebel;
    var list = [tree];

    while (list.length > 0) {
      M = 0;
      clId = 0;

      for (var i = 0; i < list.length; i++) {
        m = 0;

        for (var j = 0; j < list[i].length; j++) {
          for (var l = j + 1; l < list[i].length; l++) {
            m = Math.max(distanceFunction(data[list[i].index[j].index], data[list[i].index[l].index]), m);
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
        list[clId].distance = distanceFunction(data[list[clId].index[0].index], data[list[clId].index[1].index]);
      } else if (list[clId].index.length === 3) {
        list[clId].children = [list[clId].index[0], list[clId].index[1], list[clId].index[2]];
        var d = [distanceFunction(data[list[clId].index[0].index], data[list[clId].index[1].index]), distanceFunction(data[list[clId].index[1].index], data[list[clId].index[2].index])];
        list[clId].distance = (d[0] + d[1]) / 2;
      } else {
        var C = new Cluster();
        var sG = new Cluster();
        var splitting = [new Array(list[clId].index.length), []];

        for (var spl = 0; spl < splitting[0].length; spl++) {
          splitting[0][spl] = spl;
        }

        for (var ii = 0; ii < splitting[0].length; ii++) {
          dist = 0;

          for (var jj = 0; jj < splitting[0].length; jj++) {
            if (ii !== jj) {
              dist += distanceFunction(data[list[clId].index[splitting[0][jj]].index], data[list[clId].index[splitting[0][ii]].index]);
            }
          }

          dist /= splitting[0].length - 1;

          if (dist > M) {
            M = dist;
            rebel = ii;
          }
        }

        splitting[1] = [rebel];
        splitting[0].splice(rebel, 1);
        dist = diff(splitting, data, distanceFunction);

        while (dist.d > 0) {
          splitting[1].push(splitting[0][dist.p]);
          splitting[0].splice(dist.p, 1);
          dist = diff(splitting, data, distanceFunction);
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

        C.distance = intrDist(C.index, data, distanceFunction);
        sG.distance = intrDist(sG.index, data, distanceFunction);
        list.push(C);
        list.push(sG);
        list[clId].children = [C, sG];
      }

      list.splice(clId, 1);
    }

    return tree;
  }

  // export * './cure';
  // export * from './chameleon';

  var index = /*#__PURE__*/Object.freeze({
    agnes: agnes,
    diana: diana
  });

  const defaultOptions$4 = {
    distanceFunction: squaredEuclidean
  };
  function nearestVector(listVectors, vector) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions$4;
    const distanceFunction = options.distanceFunction || defaultOptions$4.distanceFunction;
    const similarityFunction = options.similarityFunction || defaultOptions$4.similarityFunction;
    let vectorIndex = -1;

    if (typeof similarityFunction === 'function') {
      // maximum similarity
      let maxSim = Number.MIN_VALUE;

      for (let j = 0; j < listVectors.length; j++) {
        const sim = similarityFunction(vector, listVectors[j]);

        if (sim > maxSim) {
          maxSim = sim;
          vectorIndex = j;
        }
      }
    } else if (typeof distanceFunction === 'function') {
      // minimum distance
      let minDist = Number.MAX_VALUE;

      for (let i = 0; i < listVectors.length; i++) {
        const dist = distanceFunction(vector, listVectors[i]);

        if (dist < minDist) {
          minDist = dist;
          vectorIndex = i;
        }
      }
    } else {
      throw new Error("A similarity or distance function it's required");
    }

    return vectorIndex;
  }

  /**
   * Calculates the distance matrix for a given array of points
   * @ignore
   * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
   * @param {function} distance - Distance function to use between the points
   * @return {Array<Array<number>>} - matrix with the distance values
   */

  function calculateDistanceMatrix(data, distance) {
    var distanceMatrix = new Array(data.length);

    for (var i = 0; i < data.length; ++i) {
      for (var j = i; j < data.length; ++j) {
        if (!distanceMatrix[i]) {
          distanceMatrix[i] = new Array(data.length);
        }

        if (!distanceMatrix[j]) {
          distanceMatrix[j] = new Array(data.length);
        }

        const dist = distance(data[i], data[j]);
        distanceMatrix[i][j] = dist;
        distanceMatrix[j][i] = dist;
      }
    }

    return distanceMatrix;
  }
  /**
   * Updates the cluster identifier based in the new data
   * @ignore
   * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
   * @param {Array<Array<number>>} centers - the K centers in format [x,y,z,...]
   * @param {Array <number>} clusterID - the cluster identifier for each data dot
   * @param {function} distance - Distance function to use between the points
   * @return {Array} the cluster identifier for each data dot
   */

  function updateClusterID(data, centers, clusterID, distance) {
    for (var i = 0; i < data.length; i++) {
      clusterID[i] = nearestVector(centers, data[i], {
        distanceFunction: distance
      });
    }

    return clusterID;
  }
  /**
   * Update the center values based in the new configurations of the clusters
   * @ignore
   * @param {Array<Array<number>>} prevCenters - Centroids from the previous iteration
   * @param {Array <Array <number>>} data - the [x,y,z,...] points to cluster
   * @param {Array <number>} clusterID - the cluster identifier for each data dot
   * @param {number} K - Number of clusters
   * @return {Array} he K centers in format [x,y,z,...]
   */

  function updateCenters(prevCenters, data, clusterID, K) {
    const nDim = data[0].length; // copy previous centers

    var centers = new Array(K);
    var centersLen = new Array(K);

    for (var i = 0; i < K; i++) {
      centers[i] = new Array(nDim);
      centersLen[i] = 0;

      for (var j = 0; j < nDim; j++) {
        centers[i][j] = 0;
      }
    } // add the value for all dimensions of the point


    for (var l = 0; l < data.length; l++) {
      centersLen[clusterID[l]]++;

      for (var dim = 0; dim < nDim; dim++) {
        centers[clusterID[l]][dim] += data[l][dim];
      }
    } // divides by length


    for (var id = 0; id < K; id++) {
      for (var d = 0; d < nDim; d++) {
        if (centersLen[id]) {
          centers[id][d] /= centersLen[id];
        } else {
          centers[id][d] = prevCenters[id][d];
        }
      }
    }

    return centers;
  }
  /**
   * The centers have moved more than the tolerance value?
   * @ignore
   * @param {Array<Array<number>>} centers - the K centers in format [x,y,z,...]
   * @param {Array<Array<number>>} oldCenters - the K old centers in format [x,y,z,...]
   * @param {function} distanceFunction - Distance function to use between the points
   * @param {number} tolerance - Allowed distance for the centroids to move
   * @return {boolean}
   */

  function hasConverged(centers, oldCenters, distanceFunction, tolerance) {
    for (var i = 0; i < centers.length; i++) {
      if (distanceFunction(centers[i], oldCenters[i]) > tolerance) {
        return false;
      }
    }

    return true;
  }

  const LOOP = 8;
  const FLOAT_MUL = 1 / 16777216;
  const sh1 = 15;
  const sh2 = 18;
  const sh3 = 11;

  function multiply_uint32(n, m) {
    n >>>= 0;
    m >>>= 0;
    const nlo = n & 0xffff;
    const nhi = n - nlo;
    return (nhi * m >>> 0) + nlo * m >>> 0;
  }

  class XSadd {
    constructor() {
      let seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
      this.state = new Uint32Array(4);
      this.init(seed);
      this.random = this.getFloat.bind(this);
    }
    /**
     * Returns a 32-bit integer r (0 <= r < 2^32)
     */


    getUint32() {
      this.nextState();
      return this.state[3] + this.state[2] >>> 0;
    }
    /**
     * Returns a floating point number r (0.0 <= r < 1.0)
     */


    getFloat() {
      return (this.getUint32() >>> 8) * FLOAT_MUL;
    }

    init(seed) {
      if (!Number.isInteger(seed)) {
        throw new TypeError('seed must be an integer');
      }

      this.state[0] = seed;
      this.state[1] = 0;
      this.state[2] = 0;
      this.state[3] = 0;

      for (let i = 1; i < LOOP; i++) {
        this.state[i & 3] ^= i + multiply_uint32(1812433253, this.state[i - 1 & 3] ^ this.state[i - 1 & 3] >>> 30 >>> 0) >>> 0;
      }

      this.periodCertification();

      for (let i = 0; i < LOOP; i++) {
        this.nextState();
      }
    }

    periodCertification() {
      if (this.state[0] === 0 && this.state[1] === 0 && this.state[2] === 0 && this.state[3] === 0) {
        this.state[0] = 88; // X

        this.state[1] = 83; // S

        this.state[2] = 65; // A

        this.state[3] = 68; // D
      }
    }

    nextState() {
      let t = this.state[0];
      t ^= t << sh1;
      t ^= t >>> sh2;
      t ^= this.state[3] << sh3;
      this.state[0] = this.state[1];
      this.state[1] = this.state[2];
      this.state[2] = this.state[3];
      this.state[3] = t;
    }

  }

  const PROB_TOLERANCE = 0.00000001;

  function randomChoice(values) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random;
    const {
      size = 1,
      replace = false,
      probabilities
    } = options;
    let valuesArr;
    let cumSum;

    if (typeof values === 'number') {
      valuesArr = getArray(values);
    } else {
      valuesArr = values.slice();
    }

    if (probabilities) {
      if (!replace) {
        throw new Error('choice with probabilities and no replacement is not implemented');
      } // check input is sane


      if (probabilities.length !== valuesArr.length) {
        throw new Error('the length of probabilities option should be equal to the number of choices');
      }

      cumSum = [probabilities[0]];

      for (let i = 1; i < probabilities.length; i++) {
        cumSum[i] = cumSum[i - 1] + probabilities[i];
      }

      if (Math.abs(1 - cumSum[cumSum.length - 1]) > PROB_TOLERANCE) {
        throw new Error("probabilities should sum to 1, but instead sums to ".concat(cumSum[cumSum.length - 1]));
      }
    }

    if (replace === false && size > valuesArr.length) {
      throw new Error('size option is too large');
    }

    const result = [];

    for (let i = 0; i < size; i++) {
      const index = randomIndex(valuesArr.length, random, cumSum);
      result.push(valuesArr[index]);

      if (!replace) {
        valuesArr.splice(index, 1);
      }
    }

    return result;
  }

  function getArray(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
      arr.push(i);
    }

    return arr;
  }

  function randomIndex(n, random, cumSum) {
    const rand = random();

    if (!cumSum) {
      return Math.floor(rand * n);
    } else {
      let idx = 0;

      while (rand > cumSum[idx]) {
        idx++;
      }

      return idx;
    }
  }

  // tslint:disable-next-line
  /**
   * @classdesc Random class
   */

  class Random {
    /**
     * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
     */
    constructor() {
      let seedOrRandom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random;

      if (typeof seedOrRandom === 'number') {
        const xsadd = new XSadd(seedOrRandom);
        this.randomGenerator = xsadd.random;
      } else {
        this.randomGenerator = seedOrRandom;
      }
    }

    choice(values, options) {
      if (typeof values === 'number') {
        return randomChoice(values, options, this.randomGenerator);
      }

      return randomChoice(values, options, this.randomGenerator);
    }
    /**
     * Draw a random number from a uniform distribution on [0,1)
     * @return The random number
     */


    random() {
      return this.randomGenerator();
    }
    /**
     * Draw a random integer from a uniform distribution on [low, high). If only low is specified, the number is drawn on [0, low)
     * @param low - The lower bound of the uniform distribution interval.
     * @param high - The higher bound of the uniform distribution interval.
     */


    randInt(low, high) {
      if (high === undefined) {
        high = low;
        low = 0;
      }

      return low + Math.floor(this.randomGenerator() * (high - low));
    }
    /**
     * Draw several random number from a uniform distribution on [0, 1)
     * @param size - The number of number to draw
     * @return - The list of drawn numbers.
     */


    randomSample(size) {
      const result = [];

      for (let i = 0; i < size; i++) {
        result.push(this.random());
      }

      return result;
    }

  }

  /**
   * Choose K different random points from the original data
   * @ignore
   * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
   * @param {number} K - number of clusters
   * @param {number} seed - seed for random number generation
   * @return {Array<Array<number>>} - Initial random points
   */

  function random(data, K, seed) {
    const random = new Random(seed);
    return random.choice(data, {
      size: K
    });
  }
  /**
   * Chooses the most distant points to a first random pick
   * @ignore
   * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
   * @param {number} K - number of clusters
   * @param {Array<Array<number>>} distanceMatrix - matrix with the distance values
   * @param {number} seed - seed for random number generation
   * @return {Array<Array<number>>} - Initial random points
   */

  function mostDistant(data, K, distanceMatrix, seed) {
    const random = new Random(seed);
    var ans = new Array(K); // chooses a random point as initial cluster

    ans[0] = Math.floor(random.random() * data.length);

    if (K > 1) {
      // chooses the more distant point
      var maxDist = {
        dist: -1,
        index: -1
      };

      for (var l = 0; l < data.length; ++l) {
        if (distanceMatrix[ans[0]][l] > maxDist.dist) {
          maxDist.dist = distanceMatrix[ans[0]][l];
          maxDist.index = l;
        }
      }

      ans[1] = maxDist.index;

      if (K > 2) {
        // chooses the set of points that maximises the min distance
        for (var k = 2; k < K; ++k) {
          var center = {
            dist: -1,
            index: -1
          };

          for (var m = 0; m < data.length; ++m) {
            // minimum distance to centers
            var minDistCent = {
              dist: Number.MAX_VALUE,
              index: -1
            };

            for (var n = 0; n < k; ++n) {
              if (distanceMatrix[n][m] < minDistCent.dist && ans.indexOf(m) === -1) {
                minDistCent = {
                  dist: distanceMatrix[n][m],
                  index: m
                };
              }
            }

            if (minDistCent.dist !== Number.MAX_VALUE && minDistCent.dist > center.dist) {
              center = Object.assign({}, minDistCent);
            }
          }

          ans[k] = center.index;
        }
      }
    }

    return ans.map(index => data[index]);
  } // Implementation inspired from scikit

  function kmeanspp(X, K) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    X = new Matrix(X);
    const nSamples = X.rows;
    const random = new Random(options.seed); // Set the number of trials

    const centers = [];
    const localTrials = options.localTrials || 2 + Math.floor(Math.log(K)); // Pick the first center at random from the dataset

    const firstCenterIdx = random.randInt(nSamples);
    centers.push(X.getRow(firstCenterIdx)); // Init closest distances

    let closestDistSquared = new Matrix(1, X.rows);

    for (let i = 0; i < X.rows; i++) {
      closestDistSquared.set(0, i, squaredEuclidean(X.getRow(i), centers[0]));
    }

    let cumSumClosestDistSquared = [cumSum(closestDistSquared.getRow(0))];
    const factor = 1 / cumSumClosestDistSquared[0][nSamples - 1];
    let probabilities = Matrix.mul(closestDistSquared, factor); // Iterate over the remaining centers

    for (let i = 1; i < K; i++) {
      const candidateIdx = random.choice(nSamples, {
        replace: true,
        size: localTrials,
        probabilities: probabilities[0]
      });
      const candidates = X.selection(candidateIdx, range(X.columns));
      const distanceToCandidates = euclideanDistances(candidates, X);
      let bestCandidate;
      let bestPot;
      let bestDistSquared;

      for (let j = 0; j < localTrials; j++) {
        const newDistSquared = Matrix.min(closestDistSquared, [distanceToCandidates.getRow(j)]);
        const newPot = newDistSquared.sum();

        if (bestCandidate === undefined || newPot < bestPot) {
          bestCandidate = candidateIdx[j];
          bestPot = newPot;
          bestDistSquared = newDistSquared;
        }
      }

      centers[i] = X.getRow(bestCandidate);
      closestDistSquared = bestDistSquared;
      cumSumClosestDistSquared = [cumSum(closestDistSquared.getRow(0))];
      probabilities = Matrix.mul(closestDistSquared, 1 / cumSumClosestDistSquared[0][nSamples - 1]);
    }

    return centers;
  }

  function euclideanDistances(A, B) {
    const result = new Matrix(A.rows, B.rows);

    for (let i = 0; i < A.rows; i++) {
      for (let j = 0; j < B.rows; j++) {
        result.set(i, j, squaredEuclidean(A.getRow(i), B.getRow(j)));
      }
    }

    return result;
  }

  function range(l) {
    let r = [];

    for (let i = 0; i < l; i++) {
      r.push(i);
    }

    return r;
  }

  function cumSum(arr) {
    let cumSum = [arr[0]];

    for (let i = 1; i < arr.length; i++) {
      cumSum[i] = cumSum[i - 1] + arr[i];
    }

    return cumSum;
  }

  const distanceSymbol = Symbol('distance');
  class KMeansResult {
    /**
     * Result of the kmeans algorithm
     * @param {Array<number>} clusters - the cluster identifier for each data dot
     * @param {Array<Array<object>>} centroids - the K centers in format [x,y,z,...], the error and size of the cluster
     * @param {boolean} converged - Converge criteria satisfied
     * @param {number} iterations - Current number of iterations
     * @param {function} distance - (*Private*) Distance function to use between the points
     * @constructor
     */
    constructor(clusters, centroids, converged, iterations, distance) {
      this.clusters = clusters;
      this.centroids = centroids;
      this.converged = converged;
      this.iterations = iterations;
      this[distanceSymbol] = distance;
    }
    /**
     * Allows to compute for a new array of points their cluster id
     * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
     * @return {Array<number>} - cluster id for each point
     */


    nearest(data) {
      const clusterID = new Array(data.length);
      const centroids = this.centroids.map(function (centroid) {
        return centroid.centroid;
      });
      return updateClusterID(data, centroids, clusterID, this[distanceSymbol]);
    }
    /**
     * Returns a KMeansResult with the error and size of the cluster
     * @ignore
     * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
     * @return {KMeansResult}
     */


    computeInformation(data) {
      var enrichedCentroids = this.centroids.map(function (centroid) {
        return {
          centroid: centroid,
          error: 0,
          size: 0
        };
      });

      for (var i = 0; i < data.length; i++) {
        enrichedCentroids[this.clusters[i]].error += this[distanceSymbol](data[i], this.centroids[this.clusters[i]]);
        enrichedCentroids[this.clusters[i]].size++;
      }

      for (var j = 0; j < this.centroids.length; j++) {
        if (enrichedCentroids[j].size) {
          enrichedCentroids[j].error /= enrichedCentroids[j].size;
        } else {
          enrichedCentroids[j].error = null;
        }
      }

      return new KMeansResult(this.clusters, enrichedCentroids, this.converged, this.iterations, this[distanceSymbol]);
    }

  }

  const defaultOptions$5 = {
    maxIterations: 100,
    tolerance: 1e-6,
    withIterations: false,
    initialization: 'kmeans++',
    distanceFunction: squaredEuclidean
  };
  /**
   * Each step operation for kmeans
   * @ignore
   * @param {Array<Array<number>>} centers - K centers in format [x,y,z,...]
   * @param {Array<Array<number>>} data - Points [x,y,z,...] to cluster
   * @param {Array<number>} clusterID - Cluster identifier for each data dot
   * @param {number} K - Number of clusters
   * @param {object} [options] - Option object
   * @param {number} iterations - Current number of iterations
   * @return {KMeansResult}
   */

  function step(centers, data, clusterID, K, options, iterations) {
    clusterID = updateClusterID(data, centers, clusterID, options.distanceFunction);
    var newCenters = updateCenters(centers, data, clusterID, K);
    var converged = hasConverged(newCenters, centers, options.distanceFunction, options.tolerance);
    return new KMeansResult(clusterID, newCenters, converged, iterations, options.distanceFunction);
  }
  /**
   * Generator version for the algorithm
   * @ignore
   * @param {Array<Array<number>>} centers - K centers in format [x,y,z,...]
   * @param {Array<Array<number>>} data - Points [x,y,z,...] to cluster
   * @param {Array<number>} clusterID - Cluster identifier for each data dot
   * @param {number} K - Number of clusters
   * @param {object} [options] - Option object
   */


  function* kmeansGenerator(centers, data, clusterID, K, options) {
    var converged = false;
    var stepNumber = 0;
    var stepResult;

    while (!converged && stepNumber < options.maxIterations) {
      stepResult = step(centers, data, clusterID, K, options, ++stepNumber);
      yield stepResult.computeInformation(data);
      converged = stepResult.converged;
      centers = stepResult.centroids;
    }
  }
  /**
   * K-means algorithm
   * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
   * @param {number} K - Number of clusters
   * @param {object} [options] - Option object
   * @param {number} [options.maxIterations = 100] - Maximum of iterations allowed
   * @param {number} [options.tolerance = 1e-6] - Error tolerance
   * @param {boolean} [options.withIterations = false] - Store clusters and centroids for each iteration
   * @param {function} [options.distanceFunction = squaredDistance] - Distance function to use between the points
   * @param {number} [options.seed] - Seed for random initialization.
   * @param {string|Array<Array<number>>} [options.initialization = 'kmeans++'] - K centers in format [x,y,z,...] or a method for initialize the data:
   *  * You can either specify your custom start centroids, or select one of the following initialization method:
   *  * `'kmeans++'` will use the kmeans++ method as described by http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf
   *  * `'random'` will choose K random different values.
   *  * `'mostDistant'` will choose the more distant points to a first random pick
   * @return {KMeansResult} - Cluster identifier for each data dot and centroids with the following fields:
   *  * `'clusters'`: Array of indexes for the clusters.
   *  * `'centroids'`: Array with the resulting centroids.
   *  * `'iterations'`: Number of iterations that took to converge
   */


  function kmeans(data, K, options) {
    options = Object.assign({}, defaultOptions$5, options);

    if (K <= 0 || K > data.length || !Number.isInteger(K)) {
      throw new Error('K should be a positive integer smaller than the number of points');
    }

    var centers;

    if (Array.isArray(options.initialization)) {
      if (options.initialization.length !== K) {
        throw new Error('The initial centers should have the same length as K');
      } else {
        centers = options.initialization;
      }
    } else {
      switch (options.initialization) {
        case 'kmeans++':
          centers = kmeanspp(data, K, options);
          break;

        case 'random':
          centers = random(data, K, options.seed);
          break;

        case 'mostDistant':
          centers = mostDistant(data, K, calculateDistanceMatrix(data, options.distanceFunction), options.seed);
          break;

        default:
          throw new Error("Unknown initialization method: \"".concat(options.initialization, "\""));
      }
    } // infinite loop until convergence


    if (options.maxIterations === 0) {
      options.maxIterations = Number.MAX_VALUE;
    }

    var clusterID = new Array(data.length);

    if (options.withIterations) {
      return kmeansGenerator(centers, data, clusterID, K, options);
    } else {
      var converged = false;
      var stepNumber = 0;
      var stepResult;

      while (!converged && stepNumber < options.maxIterations) {
        stepResult = step(centers, data, clusterID, K, options, ++stepNumber);
        converged = stepResult.converged;
        centers = stepResult.centroids;
      }

      return stepResult.computeInformation(data);
    }
  }

  /**
   * @private
   * Function that retuns an array of matrices of the cases that belong to each class.
   * @param {Matrix} X - dataset
   * @param {Array} y - predictions
   * @return {Array}
   */

  function separateClasses(X, y) {
    var features = X.columns;
    var classes = 0;
    var totalPerClasses = new Array(10000); // max upperbound of classes

    for (var i = 0; i < y.length; i++) {
      if (totalPerClasses[y[i]] === undefined) {
        totalPerClasses[y[i]] = 0;
        classes++;
      }

      totalPerClasses[y[i]]++;
    }

    var separatedClasses = new Array(classes);
    var currentIndex = new Array(classes);

    for (i = 0; i < classes; ++i) {
      separatedClasses[i] = new Matrix(totalPerClasses[i], features);
      currentIndex[i] = 0;
    }

    for (i = 0; i < X.rows; ++i) {
      separatedClasses[y[i]].setRow(currentIndex[y[i]], X.getRow(i));
      currentIndex[y[i]]++;
    }

    return separatedClasses;
  }

  class GaussianNB {
    /**
     * Constructor for the Gaussian Naive Bayes classifier, the parameters here is just for loading purposes.
     * @constructor
     * @param {boolean} reload
     * @param {object} model
     */
    constructor(reload, model) {
      if (reload) {
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
     * @param {Matrix|Array} trainingSet
     * @param {Matrix|Array} trainingLabels
     */


    train(trainingSet, trainingLabels) {
      var C1 = Math.sqrt(2 * Math.PI); // constant to precalculate the squared root

      trainingSet = Matrix.checkMatrix(trainingSet);

      if (trainingSet.rows !== trainingLabels.length) {
        throw new RangeError('the size of the training set and the training labels must be the same.');
      }

      var separatedClasses = separateClasses(trainingSet, trainingLabels);
      var calculateProbabilities = new Array(separatedClasses.length);
      this.means = new Array(separatedClasses.length);

      for (var i = 0; i < separatedClasses.length; ++i) {
        var means = separatedClasses[i].mean('column');
        var std = separatedClasses[i].standardDeviation('column', {
          mean: means
        });
        var logPriorProbability = Math.log(separatedClasses[i].rows / trainingSet.rows);
        calculateProbabilities[i] = new Array(means.length + 1);
        calculateProbabilities[i][0] = logPriorProbability;

        for (var j = 1; j < means.length + 1; ++j) {
          var currentStd = std[j - 1];
          calculateProbabilities[i][j] = [1 / (C1 * currentStd), -2 * currentStd * currentStd];
        }

        this.means[i] = means;
      }

      this.calculateProbabilities = calculateProbabilities;
    }
    /**
     * function that predicts each row of the dataset (must be a matrix).
     *
     * @param {Matrix|Array} dataset
     * @return {Array}
     */


    predict(dataset) {
      dataset = Matrix.checkMatrix(dataset);

      if (dataset.rows === this.calculateProbabilities[0].length) {
        throw new RangeError('the dataset must have the same features as the training set');
      }

      var predictions = new Array(dataset.rows);

      for (var i = 0; i < predictions.length; ++i) {
        predictions[i] = getCurrentClass(dataset.getRow(i), this.means, this.calculateProbabilities);
      }

      return predictions;
    }
    /**
     * Function that export the NaiveBayes model.
     * @return {object}
     */


    toJSON() {
      return {
        modelName: 'NaiveBayes',
        means: this.means,
        calculateProbabilities: this.calculateProbabilities
      };
    }
    /**
     * Function that create a GaussianNB classifier with the given model.
     * @param {object} model
     * @return {GaussianNB}
     */


    static load(model) {
      if (model.modelName !== 'NaiveBayes') {
        throw new RangeError('The current model is not a Multinomial Naive Bayes, current model:', model.name);
      }

      return new GaussianNB(true, model);
    }

  }
  /**
   * @private
   * Function the retrieves a prediction with one case.
   *
   * @param {Array} currentCase
   * @param {Array} mean - Precalculated means of each class trained
   * @param {Array} classes - Precalculated value of each class (Prior probability and probability function of each feature)
   * @return {number}
   */

  function getCurrentClass(currentCase, mean, classes) {
    var maxProbability = 0;
    var predictedClass = -1; // going through all precalculated values for the classes

    for (var i = 0; i < classes.length; ++i) {
      var currentProbability = classes[i][0]; // initialize with the prior probability

      for (var j = 1; j < classes[0][1].length + 1; ++j) {
        currentProbability += calculateLogProbability(currentCase[j - 1], mean[i][j - 1], classes[i][j][0], classes[i][j][1]);
      }

      currentProbability = Math.exp(currentProbability);

      if (currentProbability > maxProbability) {
        maxProbability = currentProbability;
        predictedClass = i;
      }
    }

    return predictedClass;
  }
  /**
   * @private
   * function that retrieves the probability of the feature given the class.
   * @param {number} value - value of the feature.
   * @param {number} mean - mean of the feature for the given class.
   * @param {number} C1 - precalculated value of (1 / (sqrt(2*pi) * std)).
   * @param {number} C2 - precalculated value of (2 * std^2) for the denominator of the exponential.
   * @return {number}
   */


  function calculateLogProbability(value, mean, C1, C2) {
    value = value - mean;
    return Math.log(C1 * Math.exp(value * value / C2));
  }

  class MultinomialNB {
    /**
     * Constructor for Multinomial Naive Bayes, the model parameter is for load purposes.
     * @constructor
     * @param {object} model - for load purposes.
     */
    constructor(model) {
      if (model) {
        this.conditionalProbability = Matrix.checkMatrix(model.conditionalProbability);
        this.priorProbability = Matrix.checkMatrix(model.priorProbability);
      }
    }
    /**
     * Train the classifier with the current training set and labels, the labels must be numbers between 0 and n.
     * @param {Matrix|Array} trainingSet
     * @param {Array} trainingLabels
     */


    train(trainingSet, trainingLabels) {
      trainingSet = Matrix.checkMatrix(trainingSet);

      if (trainingSet.rows !== trainingLabels.length) {
        throw new RangeError('the size of the training set and the training labels must be the same.');
      }

      var separateClass = separateClasses(trainingSet, trainingLabels);
      this.priorProbability = new Matrix(separateClass.length, 1);

      for (var i = 0; i < separateClass.length; ++i) {
        this.priorProbability.set(i, 0, Math.log(separateClass[i].rows / trainingSet.rows));
      }

      var features = trainingSet.columns;
      this.conditionalProbability = new Matrix(separateClass.length, features);

      for (i = 0; i < separateClass.length; ++i) {
        var classValues = Matrix.checkMatrix(separateClass[i]);
        var total = classValues.sum();
        var divisor = total + features;
        this.conditionalProbability.setRow(i, Matrix.rowVector(classValues.sum('column')).add(1).div(divisor).apply(matrixLog));
      }
    }
    /**
     * Retrieves the predictions for the dataset with the current model.
     * @param {Matrix|Array} dataset
     * @return {Array} - predictions from the dataset.
     */


    predict(dataset) {
      dataset = Matrix.checkMatrix(dataset);
      var predictions = new Array(dataset.rows);

      for (var i = 0; i < dataset.rows; ++i) {
        var currentElement = dataset.getRowVector(i);
        const v = Matrix.columnVector(this.conditionalProbability.clone().mulRowVector(currentElement).sum('row'));
        predictions[i] = v.add(this.priorProbability).maxIndex()[0];
      }

      return predictions;
    }
    /**
     * Function that saves the current model.
     * @return {object} - model in JSON format.
     */


    toJSON() {
      return {
        name: 'MultinomialNB',
        priorProbability: this.priorProbability,
        conditionalProbability: this.conditionalProbability
      };
    }
    /**
     * Creates a new MultinomialNB from the given model
     * @param {object} model
     * @return {MultinomialNB}
     */


    static load(model) {
      if (model.name !== 'MultinomialNB') {
        throw new RangeError("".concat(model.name, " is not a Multinomial Naive Bayes"));
      }

      return new MultinomialNB(model);
    }

  }

  function matrixLog(i, j) {
    this.set(i, j, Math.log(this.get(i, j)));
  }



  var index$1 = /*#__PURE__*/Object.freeze({
    GaussianNB: GaussianNB,
    MultinomialNB: MultinomialNB
  });

  /*
   * Original code from:
   *
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

  class KDTree {
    constructor(points, metric) {
      // If points is not an array, assume we're loading a pre-built tree
      if (!Array.isArray(points)) {
        this.dimensions = points.dimensions;
        this.root = points;
        restoreParent(this.root);
      } else {
        this.dimensions = new Array(points[0].length);

        for (var i = 0; i < this.dimensions.length; i++) {
          this.dimensions[i] = i;
        }

        this.root = buildTree(points, 0, null, this.dimensions);
      }

      this.metric = metric;
    } // Convert to a JSON serializable structure; this just requires removing
    // the `parent` property


    toJSON() {
      const result = toJSONImpl(this.root);
      result.dimensions = this.dimensions;
      return result;
    }

    nearest(point, maxNodes, maxDistance) {
      const metric = this.metric;
      const dimensions = this.dimensions;
      var i;
      const bestNodes = new BinaryHeap(function (e) {
        return -e[1];
      });

      function nearestSearch(node) {
        const dimension = dimensions[node.dimension];
        const ownDistance = metric(point, node.obj);
        const linearPoint = {};
        var bestChild, linearDistance, otherChild, i;

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

      if (this.root) {
        nearestSearch(this.root);
      }

      const result = [];

      for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
        if (bestNodes.content[i][0]) {
          result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
        }
      }

      return result;
    }

  }

  function toJSONImpl(src) {
    const dest = new Node(src.obj, src.dimension, null);
    if (src.left) dest.left = toJSONImpl(src.left);
    if (src.right) dest.right = toJSONImpl(src.right);
    return dest;
  }

  function buildTree(points, depth, parent, dimensions) {
    const dim = depth % dimensions.length;

    if (points.length === 0) {
      return null;
    }

    if (points.length === 1) {
      return new Node(points[0], dim, parent);
    }

    points.sort((a, b) => a[dimensions[dim]] - b[dimensions[dim]]);
    const median = Math.floor(points.length / 2);
    const node = new Node(points[median], dim, parent);
    node.left = buildTree(points.slice(0, median), depth + 1, node, dimensions);
    node.right = buildTree(points.slice(median + 1), depth + 1, node, dimensions);
    return node;
  }

  function restoreParent(root) {
    if (root.left) {
      root.left.parent = root;
      restoreParent(root.left);
    }

    if (root.right) {
      root.right.parent = root;
      restoreParent(root.right);
    }
  } // Binary heap implementation from:
  // http://eloquentjavascript.net/appendix2.html


  class BinaryHeap {
    constructor(scoreFunction) {
      this.content = [];
      this.scoreFunction = scoreFunction;
    }

    push(element) {
      // Add the new element to the end of the array.
      this.content.push(element); // Allow it to bubble up.

      this.bubbleUp(this.content.length - 1);
    }

    pop() {
      // Store the first element so we can return it later.
      var result = this.content[0]; // Get the element at the end of the array.

      var end = this.content.pop(); // If there are any elements left, put the end element at the
      // start, and let it sink down.

      if (this.content.length > 0) {
        this.content[0] = end;
        this.sinkDown(0);
      }

      return result;
    }

    peek() {
      return this.content[0];
    }

    size() {
      return this.content.length;
    }

    bubbleUp(n) {
      // Fetch the element that has to be moved.
      var element = this.content[n]; // When at 0, an element can not go up any further.

      while (n > 0) {
        // Compute the parent element's index, and fetch it.
        const parentN = Math.floor((n + 1) / 2) - 1;
        const parent = this.content[parentN]; // Swap the elements if the parent is greater.

        if (this.scoreFunction(element) < this.scoreFunction(parent)) {
          this.content[parentN] = element;
          this.content[n] = parent; // Update 'n' to continue at the new position.

          n = parentN;
        } else {
          // Found a parent that is less, no need to move it further.
          break;
        }
      }
    }

    sinkDown(n) {
      // Look up the target element and its score.
      var length = this.content.length;
      var element = this.content[n];
      var elemScore = this.scoreFunction(element);

      while (true) {
        // Compute the indices of the child elements.
        var child2N = (n + 1) * 2;
        var child1N = child2N - 1; // This is used to store the new position of the element,
        // if any.

        var swap = null; // If the first child exists (is inside the array)...

        if (child1N < length) {
          // Look it up and compute its score.
          var child1 = this.content[child1N];
          var child1Score = this.scoreFunction(child1); // If the score is less than our element's, we need to swap.

          if (child1Score < elemScore) {
            swap = child1N;
          }
        } // Do the same checks for the other child.


        if (child2N < length) {
          var child2 = this.content[child2N];
          var child2Score = this.scoreFunction(child2);

          if (child2Score < (swap === null ? elemScore : child1Score)) {
            swap = child2N;
          }
        } // If the element needs to be moved, swap it, and continue.


        if (swap !== null) {
          this.content[n] = this.content[swap];
          this.content[swap] = element;
          n = swap;
        } else {
          // Otherwise, we are done.
          break;
        }
      }
    }

  }

  class KNN {
    /**
     * @param {Array} dataset
     * @param {Array} labels
     * @param {object} options
     * @param {number} [options.k=numberOfClasses + 1] - Number of neighbors to classify.
     * @param {function} [options.distance=euclideanDistance] - Distance function that takes two parameters.
     */
    constructor(dataset, labels) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (dataset === true) {
        const model = labels;
        this.kdTree = new KDTree(model.kdTree, options);
        this.k = model.k;
        this.classes = new Set(model.classes);
        this.isEuclidean = model.isEuclidean;
        return;
      }

      const classes = new Set(labels);
      const {
        distance = euclidean,
        k = classes.size + 1
      } = options;
      const points = new Array(dataset.length);

      for (var i = 0; i < points.length; ++i) {
        points[i] = dataset[i].slice();
      }

      for (i = 0; i < labels.length; ++i) {
        points[i].push(labels[i]);
      }

      this.kdTree = new KDTree(points, distance);
      this.k = k;
      this.classes = classes;
      this.isEuclidean = distance === euclidean;
    }
    /**
     * Create a new KNN instance with the given model.
     * @param {object} model
     * @param {function} distance=euclideanDistance - distance function must be provided if the model wasn't trained with euclidean distance.
     * @return {KNN}
     */


    static load(model) {
      let distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : euclidean;

      if (model.name !== 'KNN') {
        throw new Error("invalid model: ".concat(model.name));
      }

      if (!model.isEuclidean && distance === euclidean) {
        throw new Error('a custom distance function was used to create the model. Please provide it again');
      }

      if (model.isEuclidean && distance !== euclidean) {
        throw new Error('the model was created with the default distance function. Do not load it with another one');
      }

      return new KNN(true, model, distance);
    }
    /**
     * Return a JSON containing the kd-tree model.
     * @return {object} JSON KNN model.
     */


    toJSON() {
      return {
        name: 'KNN',
        kdTree: this.kdTree,
        k: this.k,
        classes: Array.from(this.classes),
        isEuclidean: this.isEuclidean
      };
    }
    /**
     * Predicts the output given the matrix to predict.
     * @param {Array} dataset
     * @return {Array} predictions
     */


    predict(dataset) {
      if (Array.isArray(dataset)) {
        if (typeof dataset[0] === 'number') {
          return getSinglePrediction(this, dataset);
        } else if (Array.isArray(dataset[0]) && typeof dataset[0][0] === 'number') {
          const predictions = new Array(dataset.length);

          for (var i = 0; i < dataset.length; i++) {
            predictions[i] = getSinglePrediction(this, dataset[i]);
          }

          return predictions;
        }
      }

      throw new TypeError('dataset to predict must be an array or a matrix');
    }

  }

  function getSinglePrediction(knn, currentCase) {
    var nearestPoints = knn.kdTree.nearest(currentCase, knn.k);
    var pointsPerClass = {};
    var predictedClass = -1;
    var maxPoints = -1;
    var lastElement = nearestPoints[0][0].length - 1;

    for (var element of knn.classes) {
      pointsPerClass[element] = 0;
    }

    for (var i = 0; i < nearestPoints.length; ++i) {
      var currentClass = nearestPoints[i][0][lastElement];
      var currentPoints = ++pointsPerClass[currentClass];

      if (currentPoints > maxPoints) {
        predictedClass = currentClass;
        maxPoints = currentPoints;
      }
    }

    return predictedClass;
  }

  /**
   * @private
   * Function that given vector, returns its norm
   * @param {Vector} X
   * @return {number} Norm of the vector
   */

  function norm(X) {
    return Math.sqrt(X.clone().apply(pow2array).sum());
  }
  /**
   * @private
   * Function that pow 2 each element of a Matrix or a Vector,
   * used in the apply method of the Matrix object
   * @param {number} i - index i.
   * @param {number} j - index j.
   * @return {Matrix} The Matrix object modified at the index i, j.
   * */

  function pow2array(i, j) {
    this.set(i, j, this.get(i, j) ** 2);
  }
  /**
   * @private
   * Function that initialize an array of matrices.
   * @param {Array} array
   * @param {boolean} isMatrix
   * @return {Array} array with the matrices initialized.
   */

  function initializeMatrices(array, isMatrix) {
    if (isMatrix) {
      for (var i = 0; i < array.length; ++i) {
        for (var j = 0; j < array[i].length; ++j) {
          var elem = array[i][j];
          array[i][j] = elem !== null ? new Matrix(array[i][j]) : undefined;
        }
      }
    } else {
      for (i = 0; i < array.length; ++i) {
        array[i] = new Matrix(array[i]);
      }
    }

    return array;
  }

  /**
   * @class PLS
   */

  class PLS {
    /**
     * Constructor for Partial Least Squares (PLS)
     * @param {object} options
     * @param {number} [options.latentVectors] - Number of latent vector to get (if the algorithm doesn't find a good model below the tolerance)
     * @param {number} [options.tolerance=1e-5]
     * @param {boolean} [options.scale=true] - rescale dataset using mean.
     * @param {object} model - for load purposes.
     */
    constructor(options, model) {
      if (options === true) {
        this.meanX = model.meanX;
        this.stdDevX = model.stdDevX;
        this.meanY = model.meanY;
        this.stdDevY = model.stdDevY;
        this.PBQ = Matrix.checkMatrix(model.PBQ);
        this.R2X = model.R2X;
        this.scale = model.scale;
        this.scaleMethod = model.scaleMethod;
        this.tolerance = model.tolerance;
      } else {
        var {
          tolerance = 1e-5,
          scale = true
        } = options;
        this.tolerance = tolerance;
        this.scale = scale;
        this.latentVectors = options.latentVectors;
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
     * @param {Matrix|Array} trainingSet
     * @param {Matrix|Array} trainingValues
     */


    train(trainingSet, trainingValues) {
      trainingSet = Matrix.checkMatrix(trainingSet);
      trainingValues = Matrix.checkMatrix(trainingValues);

      if (trainingSet.length !== trainingValues.length) {
        throw new RangeError('The number of X rows must be equal to the number of Y rows');
      }

      this.meanX = trainingSet.mean('column');
      this.stdDevX = trainingSet.standardDeviation('column', {
        mean: this.meanX,
        unbiased: true
      });
      this.meanY = trainingValues.mean('column');
      this.stdDevY = trainingValues.standardDeviation('column', {
        mean: this.meanY,
        unbiased: true
      });

      if (this.scale) {
        trainingSet = trainingSet.clone().subRowVector(this.meanX).divRowVector(this.stdDevX);
        trainingValues = trainingValues.clone().subRowVector(this.meanY).divRowVector(this.stdDevY);
      }

      if (this.latentVectors === undefined) {
        this.latentVectors = Math.min(trainingSet.rows - 1, trainingSet.columns);
      }

      var rx = trainingSet.rows;
      var cx = trainingSet.columns;
      var ry = trainingValues.rows;
      var cy = trainingValues.columns;
      var ssqXcal = trainingSet.clone().mul(trainingSet).sum(); // for the r²

      var sumOfSquaresY = trainingValues.clone().mul(trainingValues).sum();
      var tolerance = this.tolerance;
      var n = this.latentVectors;
      var T = Matrix.zeros(rx, n);
      var P = Matrix.zeros(cx, n);
      var U = Matrix.zeros(ry, n);
      var Q = Matrix.zeros(cy, n);
      var B = Matrix.zeros(n, n);
      var W = P.clone();
      var k = 0;

      while (norm(trainingValues) > tolerance && k < n) {
        var transposeX = trainingSet.transpose();
        var transposeY = trainingValues.transpose();
        var tIndex = maxSumColIndex(trainingSet.clone().mul(trainingSet));
        var uIndex = maxSumColIndex(trainingValues.clone().mul(trainingValues));
        var t1 = trainingSet.getColumnVector(tIndex);
        var u = trainingValues.getColumnVector(uIndex);
        var t = Matrix.zeros(rx, 1);

        while (norm(t1.clone().sub(t)) > tolerance) {
          var w = transposeX.mmul(u);
          w.div(norm(w));
          t = t1;
          t1 = trainingSet.mmul(w);
          var q = transposeY.mmul(t1);
          q.div(norm(q));
          u = trainingValues.mmul(q);
        }

        t = t1;
        var num = transposeX.mmul(t);
        var den = t.transpose().mmul(t).get(0, 0);
        var p = num.div(den);
        var pnorm = norm(p);
        p.div(pnorm);
        t.mul(pnorm);
        w.mul(pnorm);
        num = u.transpose().mmul(t);
        den = t.transpose().mmul(t).get(0, 0);
        var b = num.div(den).get(0, 0);
        trainingSet.sub(t.mmul(p.transpose()));
        trainingValues.sub(t.clone().mul(b).mmul(q.transpose()));
        T.setColumn(k, t);
        P.setColumn(k, p);
        U.setColumn(k, u);
        Q.setColumn(k, q);
        W.setColumn(k, w);
        B.set(k, k, b);
        k++;
      }

      k--;
      T = T.subMatrix(0, T.rows - 1, 0, k);
      P = P.subMatrix(0, P.rows - 1, 0, k);
      U = U.subMatrix(0, U.rows - 1, 0, k);
      Q = Q.subMatrix(0, Q.rows - 1, 0, k);
      W = W.subMatrix(0, W.rows - 1, 0, k);
      B = B.subMatrix(0, k, 0, k); // TODO: review of R2Y
      // this.R2Y = t.transpose().mmul(t).mul(q[k][0]*q[k][0]).divS(ssqYcal)[0][0];
      //

      this.ssqYcal = sumOfSquaresY;
      this.E = trainingSet;
      this.F = trainingValues;
      this.T = T;
      this.P = P;
      this.U = U;
      this.Q = Q;
      this.W = W;
      this.B = B;
      this.PBQ = P.mmul(B).mmul(Q.transpose());
      this.R2X = t.transpose().mmul(t).mmul(p.transpose().mmul(p)).div(ssqXcal).get(0, 0);
    }
    /**
     * Predicts the behavior of the given dataset.
     * @param {Matrix|Array} dataset - data to be predicted.
     * @return {Matrix} - predictions of each element of the dataset.
     */


    predict(dataset) {
      var X = Matrix.checkMatrix(dataset);

      if (this.scale) {
        X = X.subRowVector(this.meanX).divRowVector(this.stdDevX);
      }

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
    /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


    toJSON() {
      return {
        name: 'PLS',
        R2X: this.R2X,
        meanX: this.meanX,
        stdDevX: this.stdDevX,
        meanY: this.meanY,
        stdDevY: this.stdDevY,
        PBQ: this.PBQ,
        tolerance: this.tolerance,
        scale: this.scale
      };
    }
    /**
     * Load a PLS model from a JSON Object
     * @param {object} model
     * @return {PLS} - PLS object from the given model
     */


    static load(model) {
      if (model.name !== 'PLS') {
        throw new RangeError("Invalid model: ".concat(model.name));
      }

      return new PLS(true, model);
    }

  }
  /**
   * @private
   * Function that returns the index where the sum of each
   * column vector is maximum.
   * @param {Matrix} data
   * @return {number} index of the maximum
   */

  function maxSumColIndex(data) {
    return Matrix.rowVector(data.sum('column')).maxIndex()[0];
  }

  /**
   * @class KOPLS
   */

  class KOPLS {
    /**
       * Constructor for Kernel-based Orthogonal Projections to Latent Structures (K-OPLS)
       * @param {object} options
       * @param {number} [options.predictiveComponents] - Number of predictive components to use.
       * @param {number} [options.orthogonalComponents] - Number of Y-Orthogonal components.
       * @param {Kernel} [options.kernel] - Kernel object to apply, see [ml-kernel](https://github.com/mljs/kernel).
       * @param {object} model - for load purposes.
       */
    constructor(options, model) {
      if (options === true) {
        this.trainingSet = new Matrix(model.trainingSet);
        this.YLoadingMat = new Matrix(model.YLoadingMat);
        this.SigmaPow = new Matrix(model.SigmaPow);
        this.YScoreMat = new Matrix(model.YScoreMat);
        this.predScoreMat = initializeMatrices(model.predScoreMat, false);
        this.YOrthLoadingVec = initializeMatrices(model.YOrthLoadingVec, false);
        this.YOrthEigen = model.YOrthEigen;
        this.YOrthScoreMat = initializeMatrices(model.YOrthScoreMat, false);
        this.toNorm = initializeMatrices(model.toNorm, false);
        this.TURegressionCoeff = initializeMatrices(model.TURegressionCoeff, false);
        this.kernelX = initializeMatrices(model.kernelX, true);
        this.kernel = model.kernel;
        this.orthogonalComp = model.orthogonalComp;
        this.predictiveComp = model.predictiveComp;
      } else {
        if (options.predictiveComponents === undefined) {
          throw new RangeError('no predictive components found!');
        }

        if (options.orthogonalComponents === undefined) {
          throw new RangeError('no orthogonal components found!');
        }

        if (options.kernel === undefined) {
          throw new RangeError('no kernel found!');
        }

        this.orthogonalComp = options.orthogonalComponents;
        this.predictiveComp = options.predictiveComponents;
        this.kernel = options.kernel;
      }
    }
    /**
       * Train the K-OPLS model with the given training set and labels.
       * @param {Matrix|Array} trainingSet
       * @param {Matrix|Array} trainingValues
       */


    train(trainingSet, trainingValues) {
      trainingSet = Matrix.checkMatrix(trainingSet);
      trainingValues = Matrix.checkMatrix(trainingValues); // to save and compute kernel with the prediction dataset.

      this.trainingSet = trainingSet.clone();
      var kernelX = this.kernel.compute(trainingSet);
      var Identity = Matrix.eye(kernelX.rows, kernelX.rows, 1);
      var temp = kernelX;
      kernelX = new Array(this.orthogonalComp + 1);

      for (let i = 0; i < this.orthogonalComp + 1; i++) {
        kernelX[i] = new Array(this.orthogonalComp + 1);
      }

      kernelX[0][0] = temp;
      var result = new SingularValueDecomposition(trainingValues.transpose().mmul(kernelX[0][0]).mmul(trainingValues), {
        computeLeftSingularVectors: true,
        computeRightSingularVectors: false
      });
      var YLoadingMat = result.leftSingularVectors;
      var Sigma = result.diagonalMatrix;
      YLoadingMat = YLoadingMat.subMatrix(0, YLoadingMat.rows - 1, 0, this.predictiveComp - 1);
      Sigma = Sigma.subMatrix(0, this.predictiveComp - 1, 0, this.predictiveComp - 1);
      var YScoreMat = trainingValues.mmul(YLoadingMat);
      var predScoreMat = new Array(this.orthogonalComp + 1);
      var TURegressionCoeff = new Array(this.orthogonalComp + 1);
      var YOrthScoreMat = new Array(this.orthogonalComp);
      var YOrthLoadingVec = new Array(this.orthogonalComp);
      var YOrthEigen = new Array(this.orthogonalComp);
      var YOrthScoreNorm = new Array(this.orthogonalComp);
      var SigmaPow = Matrix.pow(Sigma, -0.5); // to avoid errors, check infinity

      SigmaPow.apply(function (i, j) {
        if (this.get(i, j) === Infinity) {
          this.set(i, j, 0);
        }
      });

      for (var i = 0; i < this.orthogonalComp; ++i) {
        predScoreMat[i] = kernelX[0][i].transpose().mmul(YScoreMat).mmul(SigmaPow);
        var TpiPrime = predScoreMat[i].transpose();
        TURegressionCoeff[i] = inverse(TpiPrime.mmul(predScoreMat[i])).mmul(TpiPrime).mmul(YScoreMat);
        result = new SingularValueDecomposition(TpiPrime.mmul(Matrix.sub(kernelX[i][i], predScoreMat[i].mmul(TpiPrime))).mmul(predScoreMat[i]), {
          computeLeftSingularVectors: true,
          computeRightSingularVectors: false
        });
        var CoTemp = result.leftSingularVectors;
        var SoTemp = result.diagonalMatrix;
        YOrthLoadingVec[i] = CoTemp.subMatrix(0, CoTemp.rows - 1, 0, 0);
        YOrthEigen[i] = SoTemp.get(0, 0);
        YOrthScoreMat[i] = Matrix.sub(kernelX[i][i], predScoreMat[i].mmul(TpiPrime)).mmul(predScoreMat[i]).mmul(YOrthLoadingVec[i]).mul(Math.pow(YOrthEigen[i], -0.5));
        var toiPrime = YOrthScoreMat[i].transpose();
        YOrthScoreNorm[i] = Matrix.sqrt(toiPrime.mmul(YOrthScoreMat[i]));
        YOrthScoreMat[i] = YOrthScoreMat[i].divRowVector(YOrthScoreNorm[i]);
        var ITo = Matrix.sub(Identity, YOrthScoreMat[i].mmul(YOrthScoreMat[i].transpose()));
        kernelX[0][i + 1] = kernelX[0][i].mmul(ITo);
        kernelX[i + 1][i + 1] = ITo.mmul(kernelX[i][i]).mmul(ITo);
      }

      var lastScoreMat = predScoreMat[this.orthogonalComp] = kernelX[0][this.orthogonalComp].transpose().mmul(YScoreMat).mmul(SigmaPow);
      var lastTpPrime = lastScoreMat.transpose();
      TURegressionCoeff[this.orthogonalComp] = inverse(lastTpPrime.mmul(lastScoreMat)).mmul(lastTpPrime).mmul(YScoreMat);
      this.YLoadingMat = YLoadingMat;
      this.SigmaPow = SigmaPow;
      this.YScoreMat = YScoreMat;
      this.predScoreMat = predScoreMat;
      this.YOrthLoadingVec = YOrthLoadingVec;
      this.YOrthEigen = YOrthEigen;
      this.YOrthScoreMat = YOrthScoreMat;
      this.toNorm = YOrthScoreNorm;
      this.TURegressionCoeff = TURegressionCoeff;
      this.kernelX = kernelX;
    }
    /**
       * Predicts the output given the matrix to predict.
       * @param {Matrix|Array} toPredict
       * @return {{y: Matrix, predScoreMat: Array<Matrix>, predYOrthVectors: Array<Matrix>}} predictions
       */


    predict(toPredict) {
      var KTestTrain = this.kernel.compute(toPredict, this.trainingSet);
      var temp = KTestTrain;
      KTestTrain = new Array(this.orthogonalComp + 1);

      for (let i = 0; i < this.orthogonalComp + 1; i++) {
        KTestTrain[i] = new Array(this.orthogonalComp + 1);
      }

      KTestTrain[0][0] = temp;
      var YOrthScoreVector = new Array(this.orthogonalComp);
      var predScoreMat = new Array(this.orthogonalComp);
      var i;

      for (i = 0; i < this.orthogonalComp; ++i) {
        predScoreMat[i] = KTestTrain[i][0].mmul(this.YScoreMat).mmul(this.SigmaPow);
        YOrthScoreVector[i] = Matrix.sub(KTestTrain[i][i], predScoreMat[i].mmul(this.predScoreMat[i].transpose())).mmul(this.predScoreMat[i]).mmul(this.YOrthLoadingVec[i]).mul(Math.pow(this.YOrthEigen[i], -0.5));
        YOrthScoreVector[i] = YOrthScoreVector[i].divRowVector(this.toNorm[i]);
        var scoreMatPrime = this.YOrthScoreMat[i].transpose();
        KTestTrain[i + 1][0] = Matrix.sub(KTestTrain[i][0], YOrthScoreVector[i].mmul(scoreMatPrime).mmul(this.kernelX[0][i].transpose()));
        var p1 = Matrix.sub(KTestTrain[i][0], KTestTrain[i][i].mmul(this.YOrthScoreMat[i]).mmul(scoreMatPrime));
        var p2 = YOrthScoreVector[i].mmul(scoreMatPrime).mmul(this.kernelX[i][i]);
        var p3 = p2.mmul(this.YOrthScoreMat[i]).mmul(scoreMatPrime);
        KTestTrain[i + 1][i + 1] = p1.sub(p2).add(p3);
      }

      predScoreMat[i] = KTestTrain[i][0].mmul(this.YScoreMat).mmul(this.SigmaPow);
      var prediction = predScoreMat[i].mmul(this.TURegressionCoeff[i]).mmul(this.YLoadingMat.transpose());
      return {
        prediction: prediction,
        predScoreMat: predScoreMat,
        predYOrthVectors: YOrthScoreVector
      };
    }
    /**
       * Export the current model to JSON.
       * @return {object} - Current model.
       */


    toJSON() {
      return {
        name: 'K-OPLS',
        YLoadingMat: this.YLoadingMat,
        SigmaPow: this.SigmaPow,
        YScoreMat: this.YScoreMat,
        predScoreMat: this.predScoreMat,
        YOrthLoadingVec: this.YOrthLoadingVec,
        YOrthEigen: this.YOrthEigen,
        YOrthScoreMat: this.YOrthScoreMat,
        toNorm: this.toNorm,
        TURegressionCoeff: this.TURegressionCoeff,
        kernelX: this.kernelX,
        trainingSet: this.trainingSet,
        orthogonalComp: this.orthogonalComp,
        predictiveComp: this.predictiveComp
      };
    }
    /**
       * Load a K-OPLS with the given model.
       * @param {object} model
       * @param {Kernel} kernel - kernel used on the model, see [ml-kernel](https://github.com/mljs/kernel).
       * @return {KOPLS}
       */


    static load(model, kernel) {
      if (model.name !== 'K-OPLS') {
        throw new RangeError("Invalid model: ".concat(model.name));
      }

      if (!kernel) {
        throw new RangeError('You must provide a kernel for the model!');
      }

      model.kernel = kernel;
      return new KOPLS(true, model);
    }

  }

  /**
   *  Constructs a confusion matrix
   * @class ConfusionMatrix
   * @example
   * const CM = new ConfusionMatrix([[13, 2], [10, 5]], ['cat', 'dog'])
   * @param {Array<Array<number>>} matrix - The confusion matrix, a 2D Array. Rows represent the actual label and columns
   *     the predicted label.
   * @param {Array<any>} labels - Labels of the confusion matrix, a 1D Array
   */
  class ConfusionMatrix {
    constructor(matrix, labels) {
      if (matrix.length !== matrix[0].length) {
        throw new Error('Confusion matrix must be square');
      }

      if (labels.length !== matrix.length) {
        throw new Error('Confusion matrix and labels should have the same length');
      }

      this.labels = labels;
      this.matrix = matrix;
    }
    /**
     * Construct confusion matrix from the predicted and actual labels (classes). Be sure to provide the arguments in
     * the correct order!
     * @param {Array<any>} actual  - The predicted labels of the classification
     * @param {Array<any>} predicted     - The actual labels of the classification. Has to be of same length as
     *     predicted.
     * @param {object} [options] - Additional options
     * @param {Array<any>} [options.labels] - The list of labels that should be used. If not provided the distinct set
     *     of labels present in predicted and actual is used. Labels are compared using the strict equality operator
     *     '==='
     * @return {ConfusionMatrix} - Confusion matrix
     */


    static fromLabels(actual, predicted) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (predicted.length !== actual.length) {
        throw new Error('predicted and actual must have the same length');
      }

      let distinctLabels;

      if (options.labels) {
        distinctLabels = new Set(options.labels);
      } else {
        distinctLabels = new Set([...actual, ...predicted]);
      }

      distinctLabels = Array.from(distinctLabels);

      if (options.sort) {
        distinctLabels.sort(options.sort);
      } // Create confusion matrix and fill with 0's


      const matrix = Array.from({
        length: distinctLabels.length
      });

      for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(matrix.length);
        matrix[i].fill(0);
      }

      for (let i = 0; i < predicted.length; i++) {
        const actualIdx = distinctLabels.indexOf(actual[i]);
        const predictedIdx = distinctLabels.indexOf(predicted[i]);

        if (actualIdx >= 0 && predictedIdx >= 0) {
          matrix[actualIdx][predictedIdx]++;
        }
      }

      return new ConfusionMatrix(matrix, distinctLabels);
    }
    /**
     * Get the confusion matrix
     * @return {Array<Array<number> >}
     */


    getMatrix() {
      return this.matrix;
    }

    getLabels() {
      return this.labels;
    }
    /**
     * Get the total number of samples
     * @return {number}
     */


    getTotalCount() {
      let predicted = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix.length; j++) {
          predicted += this.matrix[i][j];
        }
      }

      return predicted;
    }
    /**
     * Get the total number of true predictions
     * @return {number}
     */


    getTrueCount() {
      var count = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        count += this.matrix[i][i];
      }

      return count;
    }
    /**
     * Get the total number of false predictions.
     * @return {number}
     */


    getFalseCount() {
      return this.getTotalCount() - this.getTrueCount();
    }
    /**
     * Get the number of true positive predictions.
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getTruePositiveCount(label) {
      const index = this.getIndex(label);
      return this.matrix[index][index];
    }
    /**
     * Get the number of true negative predictions
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getTrueNegativeCount(label) {
      const index = this.getIndex(label);
      var count = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix.length; j++) {
          if (i !== index && j !== index) {
            count += this.matrix[i][j];
          }
        }
      }

      return count;
    }
    /**
     * Get the number of false positive predictions.
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalsePositiveCount(label) {
      const index = this.getIndex(label);
      var count = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        if (i !== index) {
          count += this.matrix[i][index];
        }
      }

      return count;
    }
    /**
     * Get the number of false negative predictions.
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalseNegativeCount(label) {
      const index = this.getIndex(label);
      var count = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        if (i !== index) {
          count += this.matrix[index][i];
        }
      }

      return count;
    }
    /**
     * Get the number of real positive samples.
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getPositiveCount(label) {
      return this.getTruePositiveCount(label) + this.getFalseNegativeCount(label);
    }
    /**
     * Get the number of real negative samples.
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getNegativeCount(label) {
      return this.getTrueNegativeCount(label) + this.getFalsePositiveCount(label);
    }
    /**
     * Get the index in the confusion matrix that corresponds to the given label
     * @param {any} label - The label to search for
     * @throws if the label is not found
     * @return {number}
     */


    getIndex(label) {
      const index = this.labels.indexOf(label);
      if (index === -1) throw new Error('The label does not exist');
      return index;
    }
    /**
     * Get the true positive rate a.k.a. sensitivity. Computes the ratio between the number of true positive predictions and the total number of positive samples.
     * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
     * @param {any} label - The label that should be considered "positive"
     * @return {number} - The true positive rate [0-1]
     */


    getTruePositiveRate(label) {
      return this.getTruePositiveCount(label) / this.getPositiveCount(label);
    }
    /**
     * Get the true negative rate a.k.a. specificity. Computes the ration between the number of true negative predictions and the total number of negative samples.
     * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getTrueNegativeRate(label) {
      return this.getTrueNegativeCount(label) / this.getNegativeCount(label);
    }
    /**
     * Get the positive predictive value a.k.a. precision. Computes TP / (TP + FP)
     * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getPositivePredictiveValue(label) {
      const TP = this.getTruePositiveCount(label);
      return TP / (TP + this.getFalsePositiveCount(label));
    }
    /**
     * Negative predictive value
     * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getNegativePredictiveValue(label) {
      const TN = this.getTrueNegativeCount(label);
      return TN / (TN + this.getFalseNegativeCount(label));
    }
    /**
     * False negative rate a.k.a. miss rate.
     * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalseNegativeRate(label) {
      return 1 - this.getTruePositiveRate(label);
    }
    /**
     * False positive rate a.k.a. fall-out rate.
     * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalsePositiveRate(label) {
      return 1 - this.getTrueNegativeRate(label);
    }
    /**
     * False discovery rate (FDR)
     * {@link https://en.wikipedia.org/wiki/False_discovery_rate}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalseDiscoveryRate(label) {
      const FP = this.getFalsePositiveCount(label);
      return FP / (FP + this.getTruePositiveCount(label));
    }
    /**
     * False omission rate (FOR)
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getFalseOmissionRate(label) {
      const FN = this.getFalseNegativeCount(label);
      return FN / (FN + this.getTruePositiveCount(label));
    }
    /**
     * F1 score
     * {@link https://en.wikipedia.org/wiki/F1_score}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getF1Score(label) {
      const TP = this.getTruePositiveCount(label);
      return 2 * TP / (2 * TP + this.getFalsePositiveCount(label) + this.getFalseNegativeCount(label));
    }
    /**
     * Matthews correlation coefficient (MCC)
     * {@link https://en.wikipedia.org/wiki/Matthews_correlation_coefficient}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getMatthewsCorrelationCoefficient(label) {
      const TP = this.getTruePositiveCount(label);
      const TN = this.getTrueNegativeCount(label);
      const FP = this.getFalsePositiveCount(label);
      const FN = this.getFalseNegativeCount(label);
      return (TP * TN - FP * FN) / Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    }
    /**
     * Informedness
     * {@link https://en.wikipedia.org/wiki/Youden%27s_J_statistic}
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getInformedness(label) {
      return this.getTruePositiveRate(label) + this.getTrueNegativeRate(label) - 1;
    }
    /**
     * Markedness
     * @param {any} label - The label that should be considered "positive"
     * @return {number}
     */


    getMarkedness(label) {
      return this.getPositivePredictiveValue(label) + this.getNegativePredictiveValue(label) - 1;
    }
    /**
     * Get the confusion table.
     * @param {any} label - The label that should be considered "positive"
     * @return {Array<Array<number> >} - The 2x2 confusion table. [[TP, FN], [FP, TN]]
     */


    getConfusionTable(label) {
      return [[this.getTruePositiveCount(label), this.getFalseNegativeCount(label)], [this.getFalsePositiveCount(label), this.getTrueNegativeCount(label)]];
    }
    /**
     * Get total accuracy.
     * @return {number} - The ratio between the number of true predictions and total number of classifications ([0-1])
     */


    getAccuracy() {
      let correct = 0;
      let incorrect = 0;

      for (var i = 0; i < this.matrix.length; i++) {
        for (var j = 0; j < this.matrix.length; j++) {
          if (i === j) correct += this.matrix[i][j];else incorrect += this.matrix[i][j];
        }
      }

      return correct / (correct + incorrect);
    }
    /**
     * Returns the element in the confusion matrix that corresponds to the given actual and predicted labels.
     * @param {any} actual - The true label
     * @param {any} predicted - The predicted label
     * @return {number} - The element in the confusion matrix
     */


    getCount(actual, predicted) {
      const actualIndex = this.getIndex(actual);
      const predictedIndex = this.getIndex(predicted);
      return this.matrix[actualIndex][predictedIndex];
    }
    /**
     * Compute the general prediction accuracy
     * @deprecated Use getAccuracy
     * @return {number} - The prediction accuracy ([0-1]
     */


    get accuracy() {
      return this.getAccuracy();
    }
    /**
     * Compute the number of predicted observations
     * @deprecated Use getTotalCount
     * @return {number}
     */


    get total() {
      return this.getTotalCount();
    }

  }

  var src$2 = ConfusionMatrix;

  const defaultOptions$6 = {
    mode: 'index'
  };

  var src$3 = function* src(M, N, options) {
    options = Object.assign({}, defaultOptions$6, options);
    var a = new Array(N);
    var c = new Array(M);
    var b = new Array(N);
    var p = new Array(N + 2);
    var x, y, z; // init a and b

    for (var i = 0; i < N; i++) {
      a[i] = i;
      if (i < N - M) b[i] = 0;else b[i] = 1;
    } // init c


    for (i = 0; i < M; i++) {
      c[i] = N - M + i;
    } // init p


    for (i = 0; i < p.length; i++) {
      if (i === 0) p[i] = N + 1;else if (i <= N - M) p[i] = 0;else if (i <= N) p[i] = i - N + M;else p[i] = -2;
    }

    function twiddle() {
      var i, j, k;
      j = 1;

      while (p[j] <= 0) {
        j++;
      }

      if (p[j - 1] === 0) {
        for (i = j - 1; i !== 1; i--) {
          p[i] = -1;
        }

        p[j] = 0;
        x = z = 0;
        p[1] = 1;
        y = j - 1;
      } else {
        if (j > 1) {
          p[j - 1] = 0;
        }

        do {
          j++;
        } while (p[j] > 0);

        k = j - 1;
        i = j;

        while (p[i] === 0) {
          p[i++] = -1;
        }

        if (p[i] === -1) {
          p[i] = p[k];
          z = p[k] - 1;
          x = i - 1;
          y = k - 1;
          p[k] = -1;
        } else {
          if (i === p[0]) {
            return 0;
          } else {
            p[j] = p[i];
            z = p[i] - 1;
            p[i] = 0;
            x = j - 1;
            y = i - 1;
          }
        }
      }

      return 1;
    }

    if (options.mode === 'index') {
      yield c.slice();

      while (twiddle()) {
        c[z] = a[x];
        yield c.slice();
      }
    } else if (options.mode === 'mask') {
      yield b.slice();

      while (twiddle()) {
        b[x] = 1;
        b[y] = 0;
        yield b.slice();
      }
    } else {
      throw new Error('Invalid mode');
    }
  };

  const CV = {};
  /**
   * Performs a leave-one-out cross-validation (LOO-CV) of the given samples. In LOO-CV, 1 observation is used as the
   * validation set while the rest is used as the training set. This is repeated once for each observation. LOO-CV is a
   * special case of LPO-CV. @see leavePout
   * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
   *     api.
   * @param {Array} features - The features for all samples of the data-set
   * @param {Array} labels - The classification class of all samples of the data-set
   * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
   * @return {ConfusionMatrix} - The cross-validation confusion matrix
   */

  CV.leaveOneOut = function (Classifier, features, labels, classifierOptions) {
    if (typeof labels === 'function') {
      var callback = labels;
      labels = features;
      features = Classifier;
      return CV.leavePOut(features, labels, 1, callback);
    }

    return CV.leavePOut(Classifier, features, labels, classifierOptions, 1);
  };
  /**
   * Performs a leave-p-out cross-validation (LPO-CV) of the given samples. In LPO-CV, p observations are used as the
   * validation set while the rest is used as the training set. This is repeated as many times as there are possible
   * ways to combine p observations from the set (unordered without replacement). Be aware that for relatively small
   * data-set size this can require a very large number of training and testing to do!
   * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
   *     api.
   * @param {Array} features - The features for all samples of the data-set
   * @param {Array} labels - The classification class of all samples of the data-set
   * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
   * @param {number} p - The size of the validation sub-samples' set
   * @return {ConfusionMatrix} - The cross-validation confusion matrix
   */


  CV.leavePOut = function (Classifier, features, labels, classifierOptions, p) {
    if (typeof classifierOptions === 'function') {
      var callback = classifierOptions;
      p = labels;
      labels = features;
      features = Classifier;
    }

    check(features, labels);
    const distinct = getDistinct(labels);
    const confusionMatrix = initMatrix(distinct.length, distinct.length);
    var N = features.length;
    var gen = src$3(p, N);
    var allIdx = new Array(N);

    for (let i = 0; i < N; i++) {
      allIdx[i] = i;
    }

    for (const testIdx of gen) {
      var trainIdx = allIdx.slice();

      for (let i = testIdx.length - 1; i >= 0; i--) {
        trainIdx.splice(testIdx[i], 1);
      }

      if (callback) {
        validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
      } else {
        validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
      }
    }

    return new src$2(confusionMatrix, distinct);
  };
  /**
   * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into k random equally sized partitions, and
   * uses each as a validation set, with all other partitions used in the training set. Observations left over from if k
   * does not divide the number of observations are left out of the cross-validation process.
   * @param {function} Classifier - The classifier's to use for the cross validation. Expect ml-classifier api.
   * @param {Array} features - The features for all samples of the data-set
   * @param {Array} labels - The classification class of all samples of the data-set
   * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
   * @param {number} k - The number of partitions to create
   * @return {ConfusionMatrix} - The cross-validation confusion matrix
   */


  CV.kFold = function (Classifier, features, labels, classifierOptions, k) {
    if (typeof classifierOptions === 'function') {
      var callback = classifierOptions;
      k = labels;
      labels = features;
      features = Classifier;
    }

    check(features, labels);
    const distinct = getDistinct(labels);
    const confusionMatrix = initMatrix(distinct.length, distinct.length);
    var N = features.length;
    var allIdx = new Array(N);

    for (var i = 0; i < N; i++) {
      allIdx[i] = i;
    }

    var l = Math.floor(N / k); // create random k-folds

    var current = [];
    var folds = [];

    while (allIdx.length) {
      var randi = Math.floor(Math.random() * allIdx.length);
      current.push(allIdx[randi]);
      allIdx.splice(randi, 1);

      if (current.length === l) {
        folds.push(current);
        current = [];
      }
    }

    if (current.length) folds.push(current);
    folds = folds.slice(0, k);

    for (i = 0; i < folds.length; i++) {
      var testIdx = folds[i];
      var trainIdx = [];

      for (var j = 0; j < folds.length; j++) {
        if (j !== i) trainIdx = trainIdx.concat(folds[j]);
      }

      if (callback) {
        validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
      } else {
        validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
      }
    }

    return new src$2(confusionMatrix, distinct);
  };

  function check(features, labels) {
    if (features.length !== labels.length) {
      throw new Error('features and labels should have the same length');
    }
  }

  function initMatrix(rows, columns) {
    return new Array(rows).fill(0).map(() => new Array(columns).fill(0));
  }

  function getDistinct(arr) {
    var s = new Set();

    for (let i = 0; i < arr.length; i++) {
      s.add(arr[i]);
    }

    return Array.from(s);
  }

  function validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct) {
    const {
      testFeatures,
      trainFeatures,
      testLabels,
      trainLabels
    } = getTrainTest(features, labels, testIdx, trainIdx);
    var classifier;

    if (Classifier.prototype.train) {
      classifier = new Classifier(classifierOptions);
      classifier.train(trainFeatures, trainLabels);
    } else {
      classifier = new Classifier(trainFeatures, trainLabels, classifierOptions);
    }

    var predictedLabels = classifier.predict(testFeatures);
    updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
  }

  function validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback) {
    const {
      testFeatures,
      trainFeatures,
      testLabels,
      trainLabels
    } = getTrainTest(features, labels, testIdx, trainIdx);
    const predictedLabels = callback(trainFeatures, trainLabels, testFeatures);
    updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
  }

  function updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct) {
    for (var i = 0; i < predictedLabels.length; i++) {
      const actualIdx = distinct.indexOf(testLabels[i]);
      const predictedIdx = distinct.indexOf(predictedLabels[i]);

      if (actualIdx < 0 || predictedIdx < 0) {
        // eslint-disable-next-line no-console
        console.warn("ignore unknown predicted label ".concat(predictedLabels[i]));
      }

      confusionMatrix[actualIdx][predictedIdx]++;
    }
  }

  function getTrainTest(features, labels, testIdx, trainIdx) {
    return {
      testFeatures: testIdx.map(function (index) {
        return features[index];
      }),
      trainFeatures: trainIdx.map(function (index) {
        return features[index];
      }),
      testLabels: testIdx.map(function (index) {
        return labels[index];
      }),
      trainLabels: trainIdx.map(function (index) {
        return labels[index];
      })
    };
  }

  var src$4 = CV;

  function logistic(val) {
    return 1 / (1 + Math.exp(-val));
  }

  function expELU(val, param) {
    return val < 0 ? param * (Math.exp(val) - 1) : val;
  }

  function softExponential(val, param) {
    if (param < 0) {
      return -Math.log(1 - param * (val + param)) / param;
    }

    if (param > 0) {
      return (Math.exp(param * val) - 1) / param + param;
    }

    return val;
  }

  function softExponentialPrime(val, param) {
    if (param < 0) {
      return 1 / (1 - param * (param + val));
    } else {
      return Math.exp(param * val);
    }
  }

  const ACTIVATION_FUNCTIONS = {
    tanh: {
      activation: Math.tanh,
      derivate: val => 1 - val * val
    },
    identity: {
      activation: val => val,
      derivate: () => 1
    },
    logistic: {
      activation: logistic,
      derivate: val => logistic(val) * (1 - logistic(val))
    },
    arctan: {
      activation: Math.atan,
      derivate: val => 1 / (val * val + 1)
    },
    softsign: {
      activation: val => val / (1 + Math.abs(val)),
      derivate: val => 1 / ((1 + Math.abs(val)) * (1 + Math.abs(val)))
    },
    relu: {
      activation: val => val < 0 ? 0 : val,
      derivate: val => val < 0 ? 0 : 1
    },
    softplus: {
      activation: val => Math.log(1 + Math.exp(val)),
      derivate: val => 1 / (1 + Math.exp(-val))
    },
    bent: {
      activation: val => (Math.sqrt(val * val + 1) - 1) / 2 + val,
      derivate: val => val / (2 * Math.sqrt(val * val + 1)) + 1
    },
    sinusoid: {
      activation: Math.sin,
      derivate: Math.cos
    },
    sinc: {
      activation: val => val === 0 ? 1 : Math.sin(val) / val,
      derivate: val => val === 0 ? 0 : Math.cos(val) / val - Math.sin(val) / (val * val)
    },
    gaussian: {
      activation: val => Math.exp(-(val * val)),
      derivate: val => -2 * val * Math.exp(-(val * val))
    },
    'parametric-relu': {
      activation: (val, param) => val < 0 ? param * val : val,
      derivate: (val, param) => val < 0 ? param : 1
    },
    'exponential-elu': {
      activation: expELU,
      derivate: (val, param) => val < 0 ? expELU(val, param) + param : 1
    },
    'soft-exponential': {
      activation: softExponential,
      derivate: softExponentialPrime
    }
  };

  class Layer {
    /**
       * @private
       * Create a new layer with the given options
       * @param {object} options
       * @param {number} [options.inputSize] - Number of conections that enter the neurons.
       * @param {number} [options.outputSize] - Number of conections that leave the neurons.
       * @param {number} [options.regularization] - Regularization parameter.
       * @param {number} [options.epsilon] - Learning rate parameter.
       * @param {string} [options.activation] - Activation function parameter from the FeedForwardNeuralNetwork class.
       * @param {number} [options.activationParam] - Activation parameter if needed.
       */
    constructor(options) {
      this.inputSize = options.inputSize;
      this.outputSize = options.outputSize;
      this.regularization = options.regularization;
      this.epsilon = options.epsilon;
      this.activation = options.activation;
      this.activationParam = options.activationParam;
      var selectedFunction = ACTIVATION_FUNCTIONS[options.activation];
      var params = selectedFunction.activation.length;
      var actFunction = params > 1 ? val => selectedFunction.activation(val, options.activationParam) : selectedFunction.activation;
      var derFunction = params > 1 ? val => selectedFunction.derivate(val, options.activationParam) : selectedFunction.derivate;

      this.activationFunction = function (i, j) {
        this.set(i, j, actFunction(this.get(i, j)));
      };

      this.derivate = function (i, j) {
        this.set(i, j, derFunction(this.get(i, j)));
      };

      if (options.model) {
        // load model
        this.W = Matrix.Matrix.checkMatrix(options.W);
        this.b = Matrix.Matrix.checkMatrix(options.b);
      } else {
        // default constructor
        this.W = Matrix.Matrix.rand(this.inputSize, this.outputSize);
        this.b = Matrix.Matrix.zeros(1, this.outputSize);
        this.W.apply(function (i, j) {
          this.set(i, j, this.get(i, j) / Math.sqrt(options.inputSize));
        });
      }
    }
    /**
       * @private
       * propagate the given input through the current layer.
       * @param {Matrix} X - input.
       * @return {Matrix} output at the current layer.
       */


    forward(X) {
      var z = X.mmul(this.W).addRowVector(this.b);
      z.apply(this.activationFunction);
      this.a = z.clone();
      return z;
    }
    /**
       * @private
       * apply backpropagation algorithm at the current layer
       * @param {Matrix} delta - delta values estimated at the following layer.
       * @param {Matrix} a - 'a' values from the following layer.
       * @return {Matrix} the new delta values for the next layer.
       */


    backpropagation(delta, a) {
      this.dW = a.transpose().mmul(delta);
      this.db = Matrix.Matrix.rowVector(delta.sum('column'));
      var aCopy = a.clone();
      return delta.mmul(this.W.transpose()).mul(aCopy.apply(this.derivate));
    }
    /**
       * @private
       * Function that updates the weights at the current layer with the derivatives.
       */


    update() {
      this.dW.add(this.W.clone().mul(this.regularization));
      this.W.add(this.dW.mul(-this.epsilon));
      this.b.add(this.db.mul(-this.epsilon));
    }
    /**
       * @private
       * Export the current layer to JSON.
       * @return {object} model
       */


    toJSON() {
      return {
        model: 'Layer',
        inputSize: this.inputSize,
        outputSize: this.outputSize,
        regularization: this.regularization,
        epsilon: this.epsilon,
        activation: this.activation,
        W: this.W,
        b: this.b
      };
    }
    /**
       * @private
       * Creates a new Layer with the given model.
       * @param {object} model
       * @return {Layer}
       */


    static load(model) {
      if (model.model !== 'Layer') {
        throw new RangeError('the current model is not a Layer model');
      }

      return new Layer(model);
    }

  }

  class OutputLayer extends Layer {
    constructor(options) {
      super(options);

      this.activationFunction = function (i, j) {
        this.set(i, j, Math.exp(this.get(i, j)));
      };
    }

    static load(model) {
      if (model.model !== 'Layer') {
        throw new RangeError('the current model is not a Layer model');
      }

      return new OutputLayer(model);
    }

  }

  class FeedForwardNeuralNetworks {
    /**
     * Create a new Feedforward neural network model.
     * @class FeedForwardNeuralNetworks
     * @param {object} [options]
     * @param {Array} [options.hiddenLayers=[10]] - Array that contains the sizes of the hidden layers.
     * @param {number} [options.iterations=50] - Number of iterations at the training step.
     * @param {number} [options.learningRate=0.01] - Learning rate of the neural net (also known as epsilon).
     * @param {number} [options.regularization=0.01] - Regularization parameter af the neural net.
     * @param {string} [options.activation='tanh'] - activation function to be used. (options: 'tanh'(default),
     * 'identity', 'logistic', 'arctan', 'softsign', 'relu', 'softplus', 'bent', 'sinusoid', 'sinc', 'gaussian').
     * (single-parametric options: 'parametric-relu', 'exponential-relu', 'soft-exponential').
     * @param {number} [options.activationParam=1] - if the selected activation function needs a parameter.
     */
    constructor(options) {
      options = options || {};

      if (options.model) {
        // load network
        this.hiddenLayers = options.hiddenLayers;
        this.iterations = options.iterations;
        this.learningRate = options.learningRate;
        this.regularization = options.regularization;
        this.dicts = options.dicts;
        this.activation = options.activation;
        this.activationParam = options.activationParam;
        this.model = new Array(options.layers.length);

        for (var i = 0; i < this.model.length - 1; ++i) {
          this.model[i] = Layer.load(options.layers[i]);
        }

        this.model[this.model.length - 1] = OutputLayer.load(options.layers[this.model.length - 1]);
      } else {
        // default constructor
        this.hiddenLayers = options.hiddenLayers || [10];
        this.iterations = options.iterations || 50;
        this.learningRate = options.learningRate || 0.01;
        this.regularization = options.regularization || 0.01;
        this.activation = options.activation || 'tanh';
        this.activationParam = options.activationParam || 1;

        if (!(this.activation in Object.keys(ACTIVATION_FUNCTIONS))) {
          this.activation = 'tanh';
        }
      }
    }
    /**
     * @private
     * Function that build and initialize the neural net.
     * @param {number} inputSize - total of features to fit.
     * @param {number} outputSize - total of labels of the prediction set.
     */


    buildNetwork(inputSize, outputSize) {
      var size = 2 + (this.hiddenLayers.length - 1);
      this.model = new Array(size); // input layer

      this.model[0] = new Layer({
        inputSize: inputSize,
        outputSize: this.hiddenLayers[0],
        activation: this.activation,
        activationParam: this.activationParam,
        regularization: this.regularization,
        epsilon: this.learningRate
      }); // hidden layers

      for (var i = 1; i < this.hiddenLayers.length; ++i) {
        this.model[i] = new Layer({
          inputSize: this.hiddenLayers[i - 1],
          outputSize: this.hiddenLayers[i],
          activation: this.activation,
          activationParam: this.activationParam,
          regularization: this.regularization,
          epsilon: this.learningRate
        });
      } // output layer


      this.model[size - 1] = new OutputLayer({
        inputSize: this.hiddenLayers[this.hiddenLayers.length - 1],
        outputSize: outputSize,
        activation: this.activation,
        activationParam: this.activationParam,
        regularization: this.regularization,
        epsilon: this.learningRate
      });
    }
    /**
     * Train the neural net with the given features and labels.
     * @param {Matrix|Array} features
     * @param {Matrix|Array} labels
     */


    train(features, labels) {
      features = Matrix.Matrix.checkMatrix(features);
      this.dicts = dictOutputs(labels);
      var inputSize = features.columns;
      var outputSize = Object.keys(this.dicts.inputs).length;

      if (!this.model) {
        this.buildNetwork(inputSize, outputSize);
      }

      for (var i = 0; i < this.iterations; ++i) {
        var probabilities = this.propagate(features);
        this.backpropagation(features, labels, probabilities);
      }
    }
    /**
     * @private
     * Propagate the input(training set) and retrives the probabilities of each class.
     * @param {Matrix} X
     * @return {Matrix} probabilities of each class.
     */


    propagate(X) {
      var input = X;

      for (var i = 0; i < this.model.length; ++i) {
        input = this.model[i].forward(input);
      } // get probabilities


      return input.divColumnVector(input.sum('row'));
    }
    /**
     * @private
     * Function that applies the backpropagation algorithm on each layer of the network
     * in order to fit the features and labels.
     * @param {Matrix} features
     * @param {Array} labels
     * @param {Matrix} probabilities - probabilities of each class of the feature set.
     */


    backpropagation(features, labels, probabilities) {
      for (var i = 0; i < probabilities.rows; ++i) {
        probabilities.set(i, this.dicts.inputs[labels[i]], probabilities.get(i, this.dicts.inputs[labels[i]]) - 1);
      } // remember, the last delta doesn't matter


      var delta = probabilities;

      for (i = this.model.length - 1; i >= 0; --i) {
        var a = i > 0 ? this.model[i - 1].a : features;
        delta = this.model[i].backpropagation(delta, a);
      }

      for (i = 0; i < this.model.length; ++i) {
        this.model[i].update();
      }
    }
    /**
     * Predict the output given the feature set.
     * @param {Array|Matrix} features
     * @return {Array}
     */


    predict(features) {
      features = Matrix.Matrix.checkMatrix(features);
      var outputs = new Array(features.rows);
      var probabilities = this.propagate(features);

      for (var i = 0; i < features.rows; ++i) {
        outputs[i] = this.dicts.outputs[probabilities.maxRowIndex(i)[1]];
      }

      return outputs;
    }
    /**
     * Export the current model to JSON.
     * @return {object} model
     */


    toJSON() {
      var model = {
        model: 'FNN',
        hiddenLayers: this.hiddenLayers,
        iterations: this.iterations,
        learningRate: this.learningRate,
        regularization: this.regularization,
        activation: this.activation,
        activationParam: this.activationParam,
        dicts: this.dicts,
        layers: new Array(this.model.length)
      };

      for (var i = 0; i < this.model.length; ++i) {
        model.layers[i] = this.model[i].toJSON();
      }

      return model;
    }
    /**
     * Load a Feedforward Neural Network with the current model.
     * @param {object} model
     * @return {FeedForwardNeuralNetworks}
     */


    static load(model) {
      if (model.model !== 'FNN') {
        throw new RangeError('the current model is not a feed forward network');
      }

      return new FeedForwardNeuralNetworks(model);
    }

  }
  /**
   * @private
   * Method that given an array of labels(predictions), returns two dictionaries, one to transform from labels to
   * numbers and other in the reverse way
   * @param {Array} array
   * @return {object}
   */


  function dictOutputs(array) {
    var inputs = {};
    var outputs = {};
    var index = 0;

    for (var i = 0; i < array.length; i += 1) {
      if (inputs[array[i]] === undefined) {
        inputs[array[i]] = index;
        outputs[index] = array[i];
        index++;
      }
    }

    return {
      inputs: inputs,
      outputs: outputs
    };
  }

  var FeedForwardNeuralNetwork = FeedForwardNeuralNetworks;

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
      this.neighbors[xy] = new Array(2); // left or bottom neighbor

      var v;

      if (this[xy] > 0) {
        v = this[xy] - 1;
      } else if (this.som.torus) {
        v = this.som.gridDim[xy] - 1;
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
      } // top or right neighbor


      var w;

      if (this[xy] < this.som.gridDim[xy] - 1) {
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

    if (neighbors[0]) {
      if (neighbors[1]) {
        var dist1 = distance(element, neighbors[0].weights),
            dist2 = distance(element, neighbors[1].weights);

        if (dist1 < dist2) {
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
    var factor = (simA - simB) / (2 - simA - simB);
    return 0.5 + 0.5 * factor * direction;
  };

  NodeSquare.prototype.getPosition = function getPosition(element) {
    return [this.getPos('x', element), this.getPos('y', element)];
  };

  var nodeSquare = NodeSquare;

  function NodeHexagonal(x, y, weights, som) {
    nodeSquare.call(this, x, y, weights, som);
    this.hX = x - Math.floor(y / 2);
    this.z = 0 - this.hX - y;
  }

  NodeHexagonal.prototype = new nodeSquare();
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

  var nodeHexagonal = NodeHexagonal;

  var defaultOptions$7 = {
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

    for (var i in defaultOptions$7) {
      if (options.hasOwnProperty(i)) {
        this.options[i] = options[i];
      } else {
        this.options[i] = defaultOptions$7[i];
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
      this.nodeType = nodeSquare;
      this.gridDim = {
        x: x,
        y: y
      };
    } else {
      this.nodeType = nodeHexagonal;
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

    if (reload === true) {
      // For model loading
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
        i,
        j,
        k;
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
    var i,
        l = trainingSet.length;

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
      var neighbourhoodRadius, trainingValue, trainingSetFactor;

      if (this.algorithmMethod === 'random') {
        // Pick a random value of the training set at each step
        neighbourhoodRadius = this.mapRadius * Math.exp(-this.iterationCount / this.timeConstant);
        trainingValue = getRandomValue(this.trainingSet, this.randomizer);

        this._adjust(trainingValue, neighbourhoodRadius);

        this.learningRate = this.startLearningRate * Math.exp(-this.iterationCount / this.numIterations);
      } else {
        // Get next input vector
        trainingSetFactor = -Math.floor(this.iterationCount / this.trainingSet.length);
        neighbourhoodRadius = this.mapRadius * Math.exp(trainingSetFactor / this.timeConstant);
        trainingValue = this.trainingSet[this.iterationCount % this.trainingSet.length];

        this._adjust(trainingValue, neighbourhoodRadius);

        if ((this.iterationCount + 1) % this.trainingSet.length === 0) {
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
        x,
        y,
        dist,
        influence;

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

    this.times.adjust += Date.now() - now2;
  };

  SOM.prototype.train = function train(trainingSet) {
    if (!this.done) {
      this.setTraining(trainingSet);

      while (this.trainOne()) {}
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

    if (Array.isArray(data) && (Array.isArray(data[0]) || typeof data[0] === 'object')) {
      // predict a dataset
      var self = this;
      return data.map(function (element) {
        return self._predict(element, computePosition);
      });
    } else {
      // predict a single element
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
  }; // As seen in http://www.scholarpedia.org/article/Kohonen_network


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
      return minMax[0] + value * (minMax[1] - minMax[0]);
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

  var src$5 = SOM;

  function maybeToPrecision(value, digits) {
    if (value < 0) {
      value = 0 - value;

      if (typeof digits === 'number') {
        return "- ".concat(value.toPrecision(digits));
      } else {
        return "- ".concat(value.toString());
      }
    } else {
      if (typeof digits === 'number') {
        return value.toPrecision(digits);
      } else {
        return value.toString();
      }
    }
  }

  function checkArraySize(x, y) {
    if (!Array.isArray(x) || !Array.isArray(y)) {
      throw new TypeError('x and y must be arrays');
    }

    if (x.length !== y.length) {
      throw new RangeError('x and y arrays must have the same length');
    }
  }

  class BaseRegression {
    constructor() {
      if (new.target === BaseRegression) {
        throw new Error('BaseRegression must be subclassed');
      }
    }

    predict(x) {
      if (typeof x === 'number') {
        return this._predict(x);
      } else if (Array.isArray(x)) {
        const y = [];

        for (let i = 0; i < x.length; i++) {
          y.push(this._predict(x[i]));
        }

        return y;
      } else {
        throw new TypeError('x must be a number or array');
      }
    }

    _predict() {
      throw new Error('_predict must be implemented');
    }

    train() {// Do nothing for this package
    }

    toString() {
      return '';
    }

    toLaTeX() {
      return '';
    }
    /**
     * Return the correlation coefficient of determination (r) and chi-square.
     * @param {Array<number>} x
     * @param {Array<number>} y
     * @return {object}
     */


    score(x, y) {
      if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) {
        throw new Error('x and y must be arrays of the same length');
      }

      const n = x.length;
      const y2 = new Array(n);

      for (let i = 0; i < n; i++) {
        y2[i] = this._predict(x[i]);
      }

      let xSum = 0;
      let ySum = 0;
      let chi2 = 0;
      let rmsd = 0;
      let xSquared = 0;
      let ySquared = 0;
      let xY = 0;

      for (let i = 0; i < n; i++) {
        xSum += y2[i];
        ySum += y[i];
        xSquared += y2[i] * y2[i];
        ySquared += y[i] * y[i];
        xY += y2[i] * y[i];

        if (y[i] !== 0) {
          chi2 += (y[i] - y2[i]) * (y[i] - y2[i]) / y[i];
        }

        rmsd += (y[i] - y2[i]) * (y[i] - y2[i]);
      }

      const r = (n * xY - xSum * ySum) / Math.sqrt((n * xSquared - xSum * xSum) * (n * ySquared - ySum * ySum));
      return {
        r: r,
        r2: r * r,
        chi2: chi2,
        rmsd: Math.sqrt(rmsd / n)
      };
    }

  }

  class PolynomialRegression extends BaseRegression {
    constructor(x, y, degree) {
      super();

      if (x === true) {
        this.degree = y.degree;
        this.powers = y.powers;
        this.coefficients = y.coefficients;
      } else {
        checkArraySize(x, y);
        regress(this, x, y, degree);
      }
    }

    _predict(x) {
      let y = 0;

      for (let k = 0; k < this.powers.length; k++) {
        y += this.coefficients[k] * Math.pow(x, this.powers[k]);
      }

      return y;
    }

    toJSON() {
      return {
        name: 'polynomialRegression',
        degree: this.degree,
        powers: this.powers,
        coefficients: this.coefficients
      };
    }

    toString(precision) {
      return this._toFormula(precision, false);
    }

    toLaTeX(precision) {
      return this._toFormula(precision, true);
    }

    _toFormula(precision, isLaTeX) {
      let sup = '^';
      let closeSup = '';
      let times = ' * ';

      if (isLaTeX) {
        sup = '^{';
        closeSup = '}';
        times = '';
      }

      let fn = '';
      let str = '';

      for (let k = 0; k < this.coefficients.length; k++) {
        str = '';

        if (this.coefficients[k] !== 0) {
          if (this.powers[k] === 0) {
            str = maybeToPrecision(this.coefficients[k], precision);
          } else {
            if (this.powers[k] === 1) {
              str = "".concat(maybeToPrecision(this.coefficients[k], precision) + times, "x");
            } else {
              str = "".concat(maybeToPrecision(this.coefficients[k], precision) + times, "x").concat(sup).concat(this.powers[k]).concat(closeSup);
            }
          }

          if (this.coefficients[k] > 0 && k !== this.coefficients.length - 1) {
            str = " + ".concat(str);
          } else if (k !== this.coefficients.length - 1) {
            str = " ".concat(str);
          }
        }

        fn = str + fn;
      }

      if (fn.charAt(0) === '+') {
        fn = fn.slice(1);
      }

      return "f(x) = ".concat(fn);
    }

    static load(json) {
      if (json.name !== 'polynomialRegression') {
        throw new TypeError('not a polynomial regression model');
      }

      return new PolynomialRegression(true, json);
    }

  }

  function regress(pr, x, y, degree) {
    const n = x.length;
    let powers;

    if (Array.isArray(degree)) {
      powers = degree;
      degree = powers.length;
    } else {
      degree++;
      powers = new Array(degree);

      for (let k = 0; k < degree; k++) {
        powers[k] = k;
      }
    }

    const F = new Matrix(n, degree);
    const Y = new Matrix([y]);

    for (let k = 0; k < degree; k++) {
      for (let i = 0; i < n; i++) {
        if (powers[k] === 0) {
          F.set(i, k, 1);
        } else {
          F.set(i, k, Math.pow(x[i], powers[k]));
        }
      }
    }

    const FT = new MatrixTransposeView(F);
    const A = FT.mmul(F);
    const B = FT.mmul(new MatrixTransposeView(Y));
    pr.degree = degree - 1;
    pr.powers = powers;
    pr.coefficients = solve(A, B).to1DArray();
  }

  class SimpleLinearRegression extends BaseRegression {
    constructor(x, y) {
      super();

      if (x === true) {
        this.slope = y.slope;
        this.intercept = y.intercept;
        this.coefficients = [y.intercept, y.slope];
      } else {
        checkArraySize(x, y);
        regress$1(this, x, y);
      }
    }

    toJSON() {
      return {
        name: 'simpleLinearRegression',
        slope: this.slope,
        intercept: this.intercept
      };
    }

    _predict(x) {
      return this.slope * x + this.intercept;
    }

    computeX(y) {
      return (y - this.intercept) / this.slope;
    }

    toString(precision) {
      let result = 'f(x) = ';

      if (this.slope !== 0) {
        const xFactor = maybeToPrecision(this.slope, precision);
        result += "".concat(xFactor === '1' ? '' : "".concat(xFactor, " * "), "x");

        if (this.intercept !== 0) {
          const absIntercept = Math.abs(this.intercept);
          const operator = absIntercept === this.intercept ? '+' : '-';
          result += " ".concat(operator, " ").concat(maybeToPrecision(absIntercept, precision));
        }
      } else {
        result += maybeToPrecision(this.intercept, precision);
      }

      return result;
    }

    toLaTeX(precision) {
      return this.toString(precision);
    }

    static load(json) {
      if (json.name !== 'simpleLinearRegression') {
        throw new TypeError('not a SLR model');
      }

      return new SimpleLinearRegression(true, json);
    }

  }

  function regress$1(slr, x, y) {
    const n = x.length;
    let xSum = 0;
    let ySum = 0;
    let xSquared = 0;
    let xY = 0;

    for (let i = 0; i < n; i++) {
      xSum += x[i];
      ySum += y[i];
      xSquared += x[i] * x[i];
      xY += x[i] * y[i];
    }

    const numerator = n * xY - xSum * ySum;
    slr.slope = numerator / (n * xSquared - xSum * xSum);
    slr.intercept = 1 / n * ySum - slr.slope * (1 / n) * xSum;
    slr.coefficients = [slr.intercept, slr.slope];
  }

  class ExponentialRegression extends BaseRegression {
    constructor(x, y) {
      super();

      if (x === true) {
        this.A = y.A;
        this.B = y.B;
      } else {
        checkArraySize(x, y);
        regress$2(this, x, y);
      }
    }

    _predict(input) {
      return this.B * Math.exp(input * this.A);
    }

    toJSON() {
      return {
        name: 'exponentialRegression',
        A: this.A,
        B: this.B
      };
    }

    toString(precision) {
      return "f(x) = ".concat(maybeToPrecision(this.B, precision), " * e^(").concat(maybeToPrecision(this.A, precision), " * x)");
    }

    toLaTeX(precision) {
      if (this.A >= 0) {
        return "f(x) = ".concat(maybeToPrecision(this.B, precision), "e^{").concat(maybeToPrecision(this.A, precision), "x}");
      } else {
        return "f(x) = \\frac{".concat(maybeToPrecision(this.B, precision), "}{e^{").concat(maybeToPrecision(-this.A, precision), "x}}");
      }
    }

    static load(json) {
      if (json.name !== 'exponentialRegression') {
        throw new TypeError('not a exponential regression model');
      }

      return new ExponentialRegression(true, json);
    }

  }

  function regress$2(er, x, y) {
    const n = x.length;
    const yl = new Array(n);

    for (let i = 0; i < n; i++) {
      yl[i] = Math.log(y[i]);
    }

    const linear = new SimpleLinearRegression(x, yl);
    er.A = linear.slope;
    er.B = Math.exp(linear.intercept);
  }

  class PowerRegression extends BaseRegression {
    constructor(x, y) {
      super();

      if (x === true) {
        // reloading model
        this.A = y.A;
        this.B = y.B;
      } else {
        checkArraySize(x, y);
        regress$3(this, x, y);
      }
    }

    _predict(newInputs) {
      return this.A * Math.pow(newInputs, this.B);
    }

    toJSON() {
      return {
        name: 'powerRegression',
        A: this.A,
        B: this.B
      };
    }

    toString(precision) {
      return "f(x) = ".concat(maybeToPrecision(this.A, precision), " * x^").concat(maybeToPrecision(this.B, precision));
    }

    toLaTeX(precision) {
      let latex = '';

      if (this.B >= 0) {
        latex = "f(x) = ".concat(maybeToPrecision(this.A, precision), "x^{").concat(maybeToPrecision(this.B, precision), "}");
      } else {
        latex = "f(x) = \\frac{".concat(maybeToPrecision(this.A, precision), "}{x^{").concat(maybeToPrecision(-this.B, precision), "}}");
      }

      latex = latex.replace(/e([+-]?[0-9]+)/g, 'e^{$1}');
      return latex;
    }

    static load(json) {
      if (json.name !== 'powerRegression') {
        throw new TypeError('not a power regression model');
      }

      return new PowerRegression(true, json);
    }

  }

  function regress$3(pr, x, y) {
    const n = x.length;
    const xl = new Array(n);
    const yl = new Array(n);

    for (let i = 0; i < n; i++) {
      xl[i] = Math.log(x[i]);
      yl[i] = Math.log(y[i]);
    }

    const linear = new SimpleLinearRegression(xl, yl);
    pr.A = Math.exp(linear.intercept);
    pr.B = linear.slope;
  }

  class MultivariateLinearRegression {
    constructor(x, y) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      const {
        intercept = true,
        statistics = true
      } = options;
      this.statistics = statistics;

      if (x === true) {
        this.weights = y.weights;
        this.inputs = y.inputs;
        this.outputs = y.outputs;
        this.intercept = y.intercept;
      } else {
        x = new Matrix(x);
        y = new Matrix(y);

        if (intercept) {
          x.addColumn(new Array(x.rows).fill(1));
        }

        let xt = x.transpose();
        const xx = xt.mmul(x);
        const xy = xt.mmul(y);
        const invxx = new SingularValueDecomposition(xx).inverse();
        const beta = xy.transpose().mmul(invxx).transpose();
        this.weights = beta.to2DArray();
        this.inputs = x.columns;
        this.outputs = y.columns;
        if (intercept) this.inputs--;
        this.intercept = intercept;

        if (statistics) {
          /*
           * Let's add some basic statistics about the beta's to be able to interpret them.
           * source: http://dept.stat.lsa.umich.edu/~kshedden/Courses/Stat401/Notes/401-multreg.pdf
           * validated against Excel Regression AddIn
           * test: "datamining statistics test"
           */
          const fittedValues = x.mmul(beta);
          const residuals = y.clone().addM(fittedValues.neg());
          const variance = residuals.to2DArray().map(ri => Math.pow(ri[0], 2)).reduce((a, b) => a + b) / (y.rows - x.columns);
          this.stdError = Math.sqrt(variance);
          this.stdErrorMatrix = pseudoInverse(xx).mul(variance);
          this.stdErrors = this.stdErrorMatrix.diagonal().map(d => Math.sqrt(d));
          this.tStats = this.weights.map((d, i) => this.stdErrors[i] === 0 ? 0 : d[0] / this.stdErrors[i]);
        }
      }
    }

    predict(x) {
      if (Array.isArray(x)) {
        if (typeof x[0] === 'number') {
          return this._predict(x);
        } else if (Array.isArray(x[0])) {
          const y = new Array(x.length);

          for (let i = 0; i < x.length; i++) {
            y[i] = this._predict(x[i]);
          }

          return y;
        }
      } else if (Matrix.isMatrix(x)) {
        const y = new Matrix(x.rows, this.outputs);

        for (let i = 0; i < x.rows; i++) {
          y.setRow(i, this._predict(x.getRow(i)));
        }

        return y;
      }

      throw new TypeError('x must be a matrix or array of numbers');
    }

    _predict(x) {
      const result = new Array(this.outputs);

      if (this.intercept) {
        for (let i = 0; i < this.outputs; i++) {
          result[i] = this.weights[this.inputs][i];
        }
      } else {
        result.fill(0);
      }

      for (let i = 0; i < this.inputs; i++) {
        for (let j = 0; j < this.outputs; j++) {
          result[j] += this.weights[i][j] * x[i];
        }
      }

      return result;
    }

    score() {
      throw new Error('score method is not implemented yet');
    }

    toJSON() {
      return {
        name: 'multivariateLinearRegression',
        weights: this.weights,
        inputs: this.inputs,
        outputs: this.outputs,
        intercept: this.intercept,
        summary: this.statistics ? {
          regressionStatistics: {
            standardError: this.stdError,
            observations: this.outputs
          },
          variables: this.weights.map((d, i) => {
            return {
              label: i === this.weights.length - 1 ? 'Intercept' : "X Variable ".concat(i + 1),
              coefficients: d,
              standardError: this.stdErrors[i],
              tStat: this.tStats[i]
            };
          })
        } : undefined
      };
    }

    static load(model) {
      if (model.name !== 'multivariateLinearRegression') {
        throw new Error('not a MLR model');
      }

      return new MultivariateLinearRegression(true, model);
    }

  }

  const {
    squaredEuclidean: squaredEuclidean$1
  } = euclidean$1;
  const defaultOptions$8 = {
    sigma: 1
  };

  class GaussianKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$8, options);
      this.sigma = options.sigma;
      this.divisor = 2 * options.sigma * options.sigma;
    }

    compute(x, y) {
      const distance = squaredEuclidean$1(x, y);
      return Math.exp(-distance / this.divisor);
    }

  }

  var gaussianKernel = GaussianKernel;

  const defaultOptions$9 = {
    degree: 1,
    constant: 1,
    scale: 1
  };

  class PolynomialKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$9, options);
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

  var polynomialKernel = PolynomialKernel;

  const defaultOptions$a = {
    alpha: 0.01,
    constant: -Math.E
  };

  class SigmoidKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$a, options);
      this.alpha = options.alpha;
      this.constant = options.constant;
    }

    compute(x, y) {
      var sum = 0;

      for (var i = 0; i < x.length; i++) {
        sum += x[i] * y[i];
      }

      return Math.tanh(this.alpha * sum + this.constant);
    }

  }

  var sigmoidKernel = SigmoidKernel;

  const defaultOptions$b = {
    sigma: 1,
    degree: 1
  };

  class ANOVAKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$b, options);
      this.sigma = options.sigma;
      this.degree = options.degree;
    }

    compute(x, y) {
      var sum = 0;
      var len = Math.min(x.length, y.length);

      for (var i = 1; i <= len; ++i) {
        sum += Math.pow(Math.exp(-this.sigma * Math.pow(Math.pow(x[i - 1], i) - Math.pow(y[i - 1], i), 2)), this.degree);
      }

      return sum;
    }

  }

  var anovaKernel = ANOVAKernel;

  const {
    squaredEuclidean: squaredEuclidean$2
  } = euclidean$1;
  const defaultOptions$c = {
    sigma: 1
  };

  class CauchyKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$c, options);
      this.sigma = options.sigma;
    }

    compute(x, y) {
      return 1 / (1 + squaredEuclidean$2(x, y) / (this.sigma * this.sigma));
    }

  }

  var cauchyKernel = CauchyKernel;

  const {
    euclidean: euclidean$2
  } = euclidean$1;
  const defaultOptions$d = {
    sigma: 1
  };

  class ExponentialKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$d, options);
      this.sigma = options.sigma;
      this.divisor = 2 * options.sigma * options.sigma;
    }

    compute(x, y) {
      const distance = euclidean$2(x, y);
      return Math.exp(-distance / this.divisor);
    }

  }

  var exponentialKernel = ExponentialKernel;

  class HistogramIntersectionKernel {
    compute(x, y) {
      var min = Math.min(x.length, y.length);
      var sum = 0;

      for (var i = 0; i < min; ++i) {
        sum += Math.min(x[i], y[i]);
      }

      return sum;
    }

  }

  var histogramIntersectionKernel = HistogramIntersectionKernel;

  const {
    euclidean: euclidean$3
  } = euclidean$1;
  const defaultOptions$e = {
    sigma: 1
  };

  class LaplacianKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$e, options);
      this.sigma = options.sigma;
    }

    compute(x, y) {
      const distance = euclidean$3(x, y);
      return Math.exp(-distance / this.sigma);
    }

  }

  var laplacianKernel = LaplacianKernel;

  const {
    squaredEuclidean: squaredEuclidean$3
  } = euclidean$1;
  const defaultOptions$f = {
    constant: 1
  };

  class MultiquadraticKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$f, options);
      this.constant = options.constant;
    }

    compute(x, y) {
      return Math.sqrt(squaredEuclidean$3(x, y) + this.constant * this.constant);
    }

  }

  var multiquadraticKernel = MultiquadraticKernel;

  const {
    squaredEuclidean: squaredEuclidean$4
  } = euclidean$1;
  const defaultOptions$g = {
    constant: 1
  };

  class RationalQuadraticKernel {
    constructor(options) {
      options = Object.assign({}, defaultOptions$g, options);
      this.constant = options.constant;
    }

    compute(x, y) {
      const distance = squaredEuclidean$4(x, y);
      return 1 - distance / (distance + this.constant);
    }

  }

  var rationalQuadraticKernel = RationalQuadraticKernel;

  const {
    Matrix: Matrix$1,
    MatrixTransposeView: MatrixTransposeView$1
  } = Matrix;
  const kernelType = {
    gaussian: gaussianKernel,
    rbf: gaussianKernel,
    polynomial: polynomialKernel,
    poly: polynomialKernel,
    anova: anovaKernel,
    cauchy: cauchyKernel,
    exponential: exponentialKernel,
    histogram: histogramIntersectionKernel,
    min: histogramIntersectionKernel,
    laplacian: laplacianKernel,
    multiquadratic: multiquadraticKernel,
    rational: rationalQuadraticKernel,
    sigmoid: sigmoidKernel,
    mlp: sigmoidKernel
  };

  class Kernel {
    constructor(type, options) {
      this.kernelType = type;
      if (type === 'linear') return;

      if (typeof type === 'string') {
        type = type.toLowerCase();
        var KernelConstructor = kernelType[type];

        if (KernelConstructor) {
          this.kernelFunction = new KernelConstructor(options);
        } else {
          throw new Error("unsupported kernel type: ".concat(type));
        }
      } else if (typeof type === 'object' && typeof type.compute === 'function') {
        this.kernelFunction = type;
      } else {
        throw new TypeError('first argument must be a valid kernel type or instance');
      }
    }

    compute(inputs, landmarks) {
      inputs = Matrix$1.checkMatrix(inputs);

      if (landmarks === undefined) {
        landmarks = inputs;
      } else {
        landmarks = Matrix$1.checkMatrix(landmarks);
      }

      if (this.kernelType === 'linear') {
        return inputs.mmul(new MatrixTransposeView$1(landmarks));
      }

      const kernelMatrix = new Matrix$1(inputs.rows, landmarks.rows);

      if (inputs === landmarks) {
        // fast path, matrix is symmetric
        for (let i = 0; i < inputs.rows; i++) {
          for (let j = i; j < inputs.rows; j++) {
            const value = this.kernelFunction.compute(inputs.getRow(i), inputs.getRow(j));
            kernelMatrix.set(i, j, value);
            kernelMatrix.set(j, i, value);
          }
        }
      } else {
        for (let i = 0; i < inputs.rows; i++) {
          for (let j = 0; j < landmarks.rows; j++) {
            kernelMatrix.set(i, j, this.kernelFunction.compute(inputs.getRow(i), landmarks.getRow(j)));
          }
        }
      }

      return kernelMatrix;
    }

  }

  var kernel = Kernel;

  class TheilSenRegression extends BaseRegression {
    /**
     * Theil–Sen estimator
     * https://en.wikipedia.org/wiki/Theil%E2%80%93Sen_estimator
     * @param {Array<number>|boolean} x
     * @param {Array<number>|object} y
     * @constructor
     */
    constructor(x, y) {
      super();

      if (x === true) {
        // loads the model
        this.slope = y.slope;
        this.intercept = y.intercept;
        this.coefficients = y.coefficients;
      } else {
        // creates the model
        checkArraySize(x, y);
        theilSen(this, x, y);
      }
    }

    toJSON() {
      return {
        name: 'TheilSenRegression',
        slope: this.slope,
        intercept: this.intercept
      };
    }

    _predict(input) {
      return this.slope * input + this.intercept;
    }

    computeX(input) {
      return (input - this.intercept) / this.slope;
    }

    toString(precision) {
      var result = 'f(x) = ';

      if (this.slope) {
        var xFactor = maybeToPrecision(this.slope, precision);
        result += "".concat(Math.abs(xFactor - 1) < 1e-5 ? '' : "".concat(xFactor, " * "), "x");

        if (this.intercept) {
          var absIntercept = Math.abs(this.intercept);
          var operator = absIntercept === this.intercept ? '+' : '-';
          result += " ".concat(operator, " ").concat(maybeToPrecision(absIntercept, precision));
        }
      } else {
        result += maybeToPrecision(this.intercept, precision);
      }

      return result;
    }

    toLaTeX(precision) {
      return this.toString(precision);
    }

    static load(json) {
      if (json.name !== 'TheilSenRegression') {
        throw new TypeError('not a Theil-Sen model');
      }

      return new TheilSenRegression(true, json);
    }

  }

  function theilSen(regression, x, y) {
    let len = x.length;
    let slopes = new Array(len * len);
    let count = 0;

    for (let i = 0; i < len; ++i) {
      for (let j = i + 1; j < len; ++j) {
        if (x[i] !== x[j]) {
          slopes[count++] = (y[j] - y[i]) / (x[j] - x[i]);
        }
      }
    }

    slopes.length = count;
    let medianSlope = median(slopes);
    let cuts = new Array(len);

    for (let i = 0; i < len; ++i) {
      cuts[i] = y[i] - medianSlope * x[i];
    }

    regression.slope = medianSlope;
    regression.intercept = median(cuts);
    regression.coefficients = [regression.intercept, regression.slope];
  }

  /**
   * @class RobustPolynomialRegression
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} degree - polynomial degree
   */

  class RobustPolynomialRegression extends BaseRegression {
    constructor(x, y, degree) {
      super();

      if (x === true) {
        this.degree = y.degree;
        this.powers = y.powers;
        this.coefficients = y.coefficients;
      } else {
        checkArraySize(x, y);
        robustPolynomial(this, x, y, degree);
      }
    }

    toJSON() {
      return {
        name: 'robustPolynomialRegression',
        degree: this.degree,
        powers: this.powers,
        coefficients: this.coefficients
      };
    }

    _predict(x) {
      return predict(x, this.powers, this.coefficients);
    }
    /**
     * Display the formula
     * @param {number} precision - precision for the numbers
     * @return {string}
     */


    toString(precision) {
      return this._toFormula(precision, false);
    }
    /**
     * Display the formula in LaTeX format
     * @param {number} precision - precision for the numbers
     * @return {string}
     */


    toLaTeX(precision) {
      return this._toFormula(precision, true);
    }

    _toFormula(precision, isLaTeX) {
      let sup = '^';
      let closeSup = '';
      let times = ' * ';

      if (isLaTeX) {
        sup = '^{';
        closeSup = '}';
        times = '';
      }

      let fn = '';
      let str = '';

      for (let k = 0; k < this.coefficients.length; k++) {
        str = '';

        if (this.coefficients[k] !== 0) {
          if (this.powers[k] === 0) {
            str = maybeToPrecision(this.coefficients[k], precision);
          } else {
            if (this.powers[k] === 1) {
              str = "".concat(maybeToPrecision(this.coefficients[k], precision) + times, "x");
            } else {
              str = "".concat(maybeToPrecision(this.coefficients[k], precision) + times, "x").concat(sup).concat(this.powers[k]).concat(closeSup);
            }
          }

          if (this.coefficients[k] > 0 && k !== this.coefficients.length - 1) {
            str = " + ".concat(str);
          } else if (k !== this.coefficients.length - 1) {
            str = " ".concat(str);
          }
        }

        fn = str + fn;
      }

      if (fn.charAt(0) === '+') {
        fn = fn.slice(1);
      }

      return "f(x) = ".concat(fn);
    }

    static load(json) {
      if (json.name !== 'robustPolynomialRegression') {
        throw new TypeError('not a RobustPolynomialRegression model');
      }

      return new RobustPolynomialRegression(true, json);
    }

  }

  function robustPolynomial(regression, x, y, degree) {
    let powers = Array(degree).fill(0).map((_, index) => index);
    const tuples = getRandomTuples(x, y, degree);
    var min;

    for (var i = 0; i < tuples.length; i++) {
      var tuple = tuples[i];
      var coefficients = calcCoefficients(tuple, powers);
      var residuals = x.slice();

      for (var j = 0; j < x.length; j++) {
        residuals[j] = y[j] - predict(x[j], powers, coefficients);
        residuals[j] = {
          residual: residuals[j] * residuals[j],
          coefficients
        };
      }

      var median = residualsMedian(residuals);

      if (!min || median.residual < min.residual) {
        min = median;
      }
    }

    regression.degree = degree;
    regression.powers = powers;
    regression.coefficients = min.coefficients;
  }
  /**
   * @ignore
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} degree
   * @return {Array<{x:number,y:number}>}
   */


  function getRandomTuples(x, y, degree) {
    var len = Math.floor(x.length / degree);
    var tuples = new Array(len);

    for (var i = 0; i < x.length; i++) {
      var pos = Math.floor(Math.random() * len);
      var counter = 0;

      while (counter < x.length) {
        if (!tuples[pos]) {
          tuples[pos] = [{
            x: x[i],
            y: y[i]
          }];
          break;
        } else if (tuples[pos].length < degree) {
          tuples[pos].push({
            x: x[i],
            y: y[i]
          });
          break;
        } else {
          counter++;
          pos = (pos + 1) % len;
        }
      }

      if (counter === x.length) {
        return tuples;
      }
    }

    return tuples;
  }
  /**
   * @ignore
   * @param {{x:number,y:number}} tuple
   * @param {Array<number>} powers
   * @return {Array<number>}
   */


  function calcCoefficients(tuple, powers) {
    var X = tuple.slice();
    var Y = tuple.slice();

    for (var i = 0; i < X.length; i++) {
      Y[i] = [tuple[i].y];
      X[i] = new Array(powers.length);

      for (var j = 0; j < powers.length; j++) {
        X[i][j] = Math.pow(tuple[i].x, powers[j]);
      }
    }

    return solve(X, Y).to1DArray();
  }

  function predict(x, powers, coefficients) {
    let y = 0;

    for (let k = 0; k < powers.length; k++) {
      y += coefficients[k] * Math.pow(x, powers[k]);
    }

    return y;
  }

  function residualsMedian(residuals) {
    residuals.sort((a, b) => a.residual - b.residual);
    var l = residuals.length;
    var half = Math.floor(l / 2);
    return l % 2 === 0 ? residuals[half - 1] : residuals[half];
  }

  /**
   * Calculate current error
   * @ignore
   * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
   * @param {Array<number>} parameters - Array of current parameter values
   * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
   * @return {number}
   */
  function errorCalculation(data, parameters, parameterizedFunction) {
    var error = 0;
    const func = parameterizedFunction(parameters);

    for (var i = 0; i < data.x.length; i++) {
      error += Math.abs(data.y[i] - func(data.x[i]));
    }

    return error;
  }

  /**
   * Difference of the matrix function over the parameters
   * @ignore
   * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
   * @param {Array<number>} evaluatedData - Array of previous evaluated function values
   * @param {Array<number>} params - Array of previous parameter values
   * @param {number} gradientDifference - Adjustment for decrease the damping parameter
   * @param {function} paramFunction - The parameters and returns a function with the independent variable as a parameter
   * @return {Matrix}
   */

  function gradientFunction(data, evaluatedData, params, gradientDifference, paramFunction) {
    const n = params.length;
    const m = data.x.length;
    var ans = new Array(n);

    for (var param = 0; param < n; param++) {
      ans[param] = new Array(m);
      var auxParams = params.concat();
      auxParams[param] += gradientDifference;
      var funcParam = paramFunction(auxParams);

      for (var point = 0; point < m; point++) {
        ans[param][point] = evaluatedData[point] - funcParam(data.x[point]);
      }
    }

    return new Matrix(ans);
  }
  /**
   * Matrix function over the samples
   * @ignore
   * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
   * @param {Array<number>} evaluatedData - Array of previous evaluated function values
   * @return {Matrix}
   */


  function matrixFunction(data, evaluatedData) {
    const m = data.x.length;
    var ans = new Array(m);

    for (var point = 0; point < m; point++) {
      ans[point] = [data.y[point] - evaluatedData[point]];
    }

    return new Matrix(ans);
  }
  /**
   * Iteration for Levenberg-Marquardt
   * @ignore
   * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
   * @param {Array<number>} params - Array of previous parameter values
   * @param {number} damping - Levenberg-Marquardt parameter
   * @param {number} gradientDifference - Adjustment for decrease the damping parameter
   * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
   * @return {Array<number>}
   */


  function step$1(data, params, damping, gradientDifference, parameterizedFunction) {
    var value = damping * gradientDifference * gradientDifference;
    var identity = Matrix.eye(params.length, params.length, value);
    const func = parameterizedFunction(params);
    var evaluatedData = data.x.map(e => func(e));
    var gradientFunc = gradientFunction(data, evaluatedData, params, gradientDifference, parameterizedFunction);
    var matrixFunc = matrixFunction(data, evaluatedData);
    var inverseMatrix = inverse(identity.add(gradientFunc.mmul(gradientFunc.transpose())));
    params = new Matrix([params]);
    params = params.sub(inverseMatrix.mmul(gradientFunc).mmul(matrixFunc).mul(gradientDifference).transpose());
    return params.to1DArray();
  }

  /**
   * Curve fitting algorithm
   * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
   * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
   * @param {object} [options] - Options object
   * @param {number} [options.damping] - Levenberg-Marquardt parameter
   * @param {number} [options.gradientDifference = 10e-2] - Adjustment for decrease the damping parameter
   * @param {Array<number>} [options.minValues] - Minimum allowed values for parameters
   * @param {Array<number>} [options.maxValues] - Maximum allowed values for parameters
   * @param {Array<number>} [options.initialValues] - Array of initial parameter values
   * @param {number} [options.maxIterations = 100] - Maximum of allowed iterations
   * @param {number} [options.errorTolerance = 10e-3] - Minimum uncertainty allowed for each point
   * @return {{parameterValues: Array<number>, parameterError: number, iterations: number}}
   */

  function levenbergMarquardt(data, parameterizedFunction) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let {
      maxIterations = 100,
      gradientDifference = 10e-2,
      damping = 0,
      errorTolerance = 10e-3,
      minValues,
      maxValues,
      initialValues
    } = options;

    if (damping <= 0) {
      throw new Error('The damping option must be a positive number');
    } else if (!data.x || !data.y) {
      throw new Error('The data parameter must have x and y elements');
    } else if (!Array.isArray(data.x) || data.x.length < 2 || !Array.isArray(data.y) || data.y.length < 2) {
      throw new Error('The data parameter elements must be an array with more than 2 points');
    } else if (data.x.length !== data.y.length) {
      throw new Error('The data parameter elements must have the same size');
    }

    var parameters = initialValues || new Array(parameterizedFunction.length).fill(1);
    let parLen = parameters.length;
    maxValues = maxValues || new Array(parLen).fill(Number.MAX_SAFE_INTEGER);
    minValues = minValues || new Array(parLen).fill(Number.MIN_SAFE_INTEGER);

    if (maxValues.length !== minValues.length) {
      throw new Error('minValues and maxValues must be the same size');
    }

    if (!Array.isArray(parameters)) {
      throw new Error('initialValues must be an array');
    }

    var error = errorCalculation(data, parameters, parameterizedFunction);
    var converged = error <= errorTolerance;

    for (var iteration = 0; iteration < maxIterations && !converged; iteration++) {
      parameters = step$1(data, parameters, damping, gradientDifference, parameterizedFunction);

      for (let k = 0; k < parLen; k++) {
        parameters[k] = Math.min(Math.max(minValues[k], parameters[k]), maxValues[k]);
      }

      error = errorCalculation(data, parameters, parameterizedFunction);
      if (isNaN(error)) break;
      converged = error <= errorTolerance;
    }

    return {
      parameterValues: parameters,
      parameterError: error,
      iterations: iteration
    };
  }

  var binarySearch = function binarySearch(haystack, needle, comparator, low, high) {
    var mid, cmp;
    if (low === undefined) low = 0;else {
      low = low | 0;
      if (low < 0 || low >= haystack.length) throw new RangeError("invalid lower bound");
    }
    if (high === undefined) high = haystack.length - 1;else {
      high = high | 0;
      if (high < low || high >= haystack.length) throw new RangeError("invalid upper bound");
    }

    while (low <= high) {
      /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
       * to double (which gives the wrong results). */
      mid = low + (high - low >> 1);
      cmp = +comparator(haystack[mid], needle, mid, haystack);
      /* Too low. */

      if (cmp < 0.0) low = mid + 1;
      /* Too high. */
      else if (cmp > 0.0) high = mid - 1;
        /* Key found. */
        else return mid;
    }
    /* Key not found. */


    return ~low;
  };

  function assertNumber(number) {
    if (typeof number !== 'number' || Number.isNaN(number)) {
      throw new TypeError('Expected a number');
    }
  }

  var ascending = (left, right) => {
    assertNumber(left);
    assertNumber(right);
    return left - right;
  };

  var descending = (left, right) => {
    assertNumber(left);
    assertNumber(right);
    return right - left;
  };

  var numSort = {
    ascending: ascending,
    descending: descending
  };

  var index$2 = /*#__PURE__*/Object.freeze({
    'default': numSort,
    __moduleExports: numSort,
    ascending: ascending,
    descending: descending
  });

  const largestPrime = 0x7fffffff;
  const primeNumbers = [// chunk #0
  largestPrime, // 2^31-1
  // chunk #1
  5, 11, 23, 47, 97, 197, 397, 797, 1597, 3203, 6421, 12853, 25717, 51437, 102877, 205759, 411527, 823117, 1646237, 3292489, 6584983, 13169977, 26339969, 52679969, 105359939, 210719881, 421439783, 842879579, 1685759167, // chunk #2
  433, 877, 1759, 3527, 7057, 14143, 28289, 56591, 113189, 226379, 452759, 905551, 1811107, 3622219, 7244441, 14488931, 28977863, 57955739, 115911563, 231823147, 463646329, 927292699, 1854585413, // chunk #3
  953, 1907, 3821, 7643, 15287, 30577, 61169, 122347, 244703, 489407, 978821, 1957651, 3915341, 7830701, 15661423, 31322867, 62645741, 125291483, 250582987, 501165979, 1002331963, 2004663929, // chunk #4
  1039, 2081, 4177, 8363, 16729, 33461, 66923, 133853, 267713, 535481, 1070981, 2141977, 4283963, 8567929, 17135863, 34271747, 68543509, 137087021, 274174111, 548348231, 1096696463, // chunk #5
  31, 67, 137, 277, 557, 1117, 2237, 4481, 8963, 17929, 35863, 71741, 143483, 286973, 573953, 1147921, 2295859, 4591721, 9183457, 18366923, 36733847, 73467739, 146935499, 293871013, 587742049, 1175484103, // chunk #6
  599, 1201, 2411, 4831, 9677, 19373, 38747, 77509, 155027, 310081, 620171, 1240361, 2480729, 4961459, 9922933, 19845871, 39691759, 79383533, 158767069, 317534141, 635068283, 1270136683, // chunk #7
  311, 631, 1277, 2557, 5119, 10243, 20507, 41017, 82037, 164089, 328213, 656429, 1312867, 2625761, 5251529, 10503061, 21006137, 42012281, 84024581, 168049163, 336098327, 672196673, 1344393353, // chunk #8
  3, 7, 17, 37, 79, 163, 331, 673, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557, 359339171, 718678369, 1437356741, // chunk #9
  43, 89, 179, 359, 719, 1439, 2879, 5779, 11579, 23159, 46327, 92657, 185323, 370661, 741337, 1482707, 2965421, 5930887, 11861791, 23723597, 47447201, 94894427, 189788857, 379577741, 759155483, 1518310967, // chunk #10
  379, 761, 1523, 3049, 6101, 12203, 24407, 48817, 97649, 195311, 390647, 781301, 1562611, 3125257, 6250537, 12501169, 25002389, 50004791, 100009607, 200019221, 400038451, 800076929, 1600153859, // chunk #11
  13, 29, 59, 127, 257, 521, 1049, 2099, 4201, 8419, 16843, 33703, 67409, 134837, 269683, 539389, 1078787, 2157587, 4315183, 8630387, 17260781, 34521589, 69043189, 138086407, 276172823, 552345671, 1104691373, // chunk #12
  19, 41, 83, 167, 337, 677, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557, 359339171, 718678369, 1437356741, // chunk #13
  53, 107, 223, 449, 907, 1823, 3659, 7321, 14653, 29311, 58631, 117269, 234539, 469099, 938207, 1876417, 3752839, 7505681, 15011389, 30022781, 60045577, 120091177, 240182359, 480364727, 960729461, 1921458943];
  primeNumbers.sort(ascending);
  function nextPrime(value) {
    let index = binarySearch(primeNumbers, value, ascending);

    if (index < 0) {
      index = ~index;
    }

    return primeNumbers[index];
  }

  const FREE = 0;
  const FULL = 1;
  const REMOVED = 2;
  const defaultInitialCapacity = 150;
  const defaultMinLoadFactor = 1 / 6;
  const defaultMaxLoadFactor = 2 / 3;
  class HashTable {
    constructor() {
      let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
        throw new RangeError("initial capacity must not be less than zero: ".concat(initialCapacity));
      }

      const minLoadFactor = options.minLoadFactor === undefined ? defaultMinLoadFactor : options.minLoadFactor;
      const maxLoadFactor = options.maxLoadFactor === undefined ? defaultMaxLoadFactor : options.maxLoadFactor;

      if (minLoadFactor < 0 || minLoadFactor >= 1) {
        throw new RangeError("invalid minLoadFactor: ".concat(minLoadFactor));
      }

      if (maxLoadFactor <= 0 || maxLoadFactor >= 1) {
        throw new RangeError("invalid maxLoadFactor: ".concat(maxLoadFactor));
      }

      if (minLoadFactor >= maxLoadFactor) {
        throw new RangeError("minLoadFactor (".concat(minLoadFactor, ") must be smaller than maxLoadFactor (").concat(maxLoadFactor, ")"));
      }

      let capacity = initialCapacity; // User wants to put at least capacity elements. We need to choose the size based on the maxLoadFactor to
      // avoid the need to rehash before this capacity is reached.
      // actualCapacity * maxLoadFactor >= capacity

      capacity = capacity / maxLoadFactor | 0;
      capacity = nextPrime(capacity);
      if (capacity === 0) capacity = 1;
      this.table = newArray$1(capacity);
      this.values = newArray$1(capacity);
      this.state = newArray$1(capacity);
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
      const newTable = newArray$1(newCapacity);
      const newValues = newArray$1(newCapacity);
      const newState = newArray$1(newCapacity);
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

  function chooseLowWaterMark(capacity, minLoad) {
    return capacity * minLoad | 0;
  }

  function chooseHighWaterMark(capacity, maxLoad) {
    return Math.min(capacity - 2, capacity * maxLoad | 0);
  }

  function chooseGrowCapacity(size, minLoad, maxLoad) {
    return nextPrime(Math.max(size + 1, 4 * size / (3 * minLoad + maxLoad) | 0));
  }

  function chooseShrinkCapacity(size, minLoad, maxLoad) {
    return nextPrime(Math.max(size + 1, 4 * size / (minLoad + 3 * maxLoad) | 0));
  }

  function newArray$1(size) {
    return Array(size).fill(0);
  }

  class SparseMatrix {
    constructor(rows, columns) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (rows instanceof SparseMatrix) {
        // clone
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

    static eye() {
      let rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      let columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rows;
      const min = Math.min(rows, columns);
      const matrix = new SparseMatrix(rows, columns, {
        initialCapacity: min
      });

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
    /**
     * Search for the wither band in the main diagonals
     * @return {number}
     */


    bandWidth() {
      let min = this.columns;
      let max = -1;
      this.forEachNonZero((i, j, v) => {
        let diff = i - j;
        min = Math.min(min, diff);
        max = Math.max(max, diff);
        return v;
      });
      return max - min;
    }
    /**
     * Test if a matrix is consider banded using a threshold
     * @param {number} width
     * @return {boolean}
     */


    isBanded(width) {
      let bandWidth = this.bandWidth();
      return bandWidth <= width;
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
      if (this.columns !== other.rows) {
        // eslint-disable-next-line no-console
        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');
      }

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
        const i = key / this.columns | 0;
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
      return {
        rows,
        columns,
        values
      };
    }

    setThreshold(newThreshold) {
      if (newThreshold !== 0 && newThreshold !== this.threshold) {
        this.threshold = newThreshold;
        this.forEachNonZero((i, j, v) => v);
      }

      return this;
    }
    /**
     * @return {SparseMatrix} - New transposed sparse matrix
     */


    transpose() {
      let trans = new SparseMatrix(this.columns, this.rows, {
        initialCapacity: this.cardinality
      });
      this.forEachNonZero((i, j, value) => {
        trans.set(j, i, value);
        return value;
      });
      return trans;
    }

  }
  SparseMatrix.prototype.klass = 'Matrix';
  SparseMatrix.identity = SparseMatrix.eye;
  SparseMatrix.prototype.tensorProduct = SparseMatrix.prototype.kroneckerProduct;
  /*
   Add dynamically instance and static methods for mathematical operations
   */

  var inplaceOperator = "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n";
  var inplaceOperatorScalar = "\n(function %name%S(value) {\n    this.forEachNonZero((i, j, v) => v %op% value);\n    return this;\n})\n";
  var inplaceOperatorMatrix = "\n(function %name%M(matrix) {\n    matrix.forEachNonZero((i, j, v) => {\n        this.set(i, j, this.get(i, j) %op% v);\n        return v;\n    });\n    return this;\n})\n";
  var staticOperator = "\n(function %name%(matrix, value) {\n    var newMatrix = new SparseMatrix(matrix);\n    return newMatrix.%name%(value);\n})\n";
  var inplaceMethod = "\n(function %name%() {\n    this.forEachNonZero((i, j, v) => %method%(v));\n    return this;\n})\n";
  var staticMethod = "\n(function %name%(matrix) {\n    var newMatrix = new SparseMatrix(matrix);\n    return newMatrix.%name%();\n})\n";
  const operators = [// Arithmetic operators
  ['+', 'add'], ['-', 'sub', 'subtract'], ['*', 'mul', 'multiply'], ['/', 'div', 'divide'], ['%', 'mod', 'modulus'], // Bitwise operators
  ['&', 'and'], ['|', 'or'], ['^', 'xor'], ['<<', 'leftShift'], ['>>', 'signPropagatingRightShift'], ['>>>', 'rightShift', 'zeroFillRightShift']];

  for (const operator of operators) {
    for (let i = 1; i < operator.length; i++) {
      SparseMatrix.prototype[operator[i]] = eval(fillTemplateFunction(inplaceOperator, {
        name: operator[i],
        op: operator[0]
      }));
      SparseMatrix.prototype["".concat(operator[i], "S")] = eval(fillTemplateFunction(inplaceOperatorScalar, {
        name: "".concat(operator[i], "S"),
        op: operator[0]
      }));
      SparseMatrix.prototype["".concat(operator[i], "M")] = eval(fillTemplateFunction(inplaceOperatorMatrix, {
        name: "".concat(operator[i], "M"),
        op: operator[0]
      }));
      SparseMatrix[operator[i]] = eval(fillTemplateFunction(staticOperator, {
        name: operator[i]
      }));
    }
  }

  var methods = [['~', 'not']];
  ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'].forEach(function (mathMethod) {
    methods.push(["Math.".concat(mathMethod), mathMethod]);
  });

  for (const method of methods) {
    for (let i = 1; i < method.length; i++) {
      SparseMatrix.prototype[method[i]] = eval(fillTemplateFunction(inplaceMethod, {
        name: method[i],
        method: method[0]
      }));
      SparseMatrix[method[i]] = eval(fillTemplateFunction(staticMethod, {
        name: method[i]
      }));
    }
  }

  function fillTemplateFunction(template, values) {
    for (const i in values) {
      template = template.replace(new RegExp("%".concat(i, "%"), 'g'), values[i]);
    }

    return template;
  }

  function additiveSymmetric(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) * (a[i] + b[i]) / (a[i] * b[i]);
    }

    return 2 * d;
  }

  function avg(a, b) {
    var ii = a.length;
    var max = 0;
    var ans = 0;
    var aux = 0;

    for (var i = 0; i < ii; i++) {
      aux = Math.abs(a[i] - b[i]);
      ans += aux;

      if (max < aux) {
        max = aux;
      }
    }

    return (max + ans) / 2;
  }

  function bhattacharyya(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.sqrt(a[i] * b[i]);
    }

    return -Math.log(ans);
  }

  function canberra(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
    }

    return ans;
  }

  function chebyshev(a, b) {
    var ii = a.length;
    var max = 0;
    var aux = 0;

    for (var i = 0; i < ii; i++) {
      aux = Math.abs(a[i] - b[i]);

      if (max < aux) {
        max = aux;
      }
    }

    return max;
  }

  function clark(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += Math.sqrt((a[i] - b[i]) * (a[i] - b[i]) / ((a[i] + b[i]) * (a[i] + b[i])));
    }

    return 2 * d;
  }

  function czekanowskiSimilarity(a, b) {
    var up = 0;
    var down = 0;

    for (var i = 0; i < a.length; i++) {
      up += Math.min(a[i], b[i]);
      down += a[i] + b[i];
    }

    return 2 * up / down;
  }

  function czekanowskiDistance(a, b) {
    return 1 - czekanowskiSimilarity(a, b);
  }

  function dice(a, b) {
    var ii = a.length;
    var p = 0;
    var q1 = 0;
    var q2 = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i] * a[i];
      q1 += b[i] * b[i];
      q2 += (a[i] - b[i]) * (a[i] - b[i]);
    }

    return q2 / (p + q1);
  }

  function divergence(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) / ((a[i] + b[i]) * (a[i] + b[i]));
    }

    return 2 * d;
  }

  function fidelity(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.sqrt(a[i] * b[i]);
    }

    return ans;
  }

  function gower(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.abs(a[i] - b[i]);
    }

    return ans / ii;
  }

  function harmonicMean(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += a[i] * b[i] / (a[i] + b[i]);
    }

    return 2 * ans;
  }

  function hellinger(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.sqrt(a[i] * b[i]);
    }

    return 2 * Math.sqrt(1 - ans);
  }

  function innerProduct(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += a[i] * b[i];
    }

    return ans;
  }

  function intersection(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.min(a[i], b[i]);
    }

    return 1 - ans;
  }

  function jaccard(a, b) {
    var ii = a.length;
    var p1 = 0;
    var p2 = 0;
    var q1 = 0;
    var q2 = 0;

    for (var i = 0; i < ii; i++) {
      p1 += a[i] * b[i];
      p2 += a[i] * a[i];
      q1 += b[i] * b[i];
      q2 += (a[i] - b[i]) * (a[i] - b[i]);
    }

    return q2 / (p2 + q1 - p1);
  }

  function jeffreys(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
    }

    return ans;
  }

  function jensenDifference(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += (a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2 - (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / 2);
    }

    return ans;
  }

  function jensenShannon(a, b) {
    var ii = a.length;
    var p = 0;
    var q = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
      q += b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
    }

    return (p + q) / 2;
  }

  function kdivergence(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
    }

    return ans;
  }

  function kulczynski(a, b) {
    var ii = a.length;
    var up = 0;
    var down = 0;

    for (var i = 0; i < ii; i++) {
      up += Math.abs(a[i] - b[i]);
      down += Math.min(a[i], b[i]);
    }

    return up / down;
  }

  function kullbackLeibler(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += a[i] * Math.log(a[i] / b[i]);
    }

    return ans;
  }

  function kumarHassebrook(a, b) {
    var ii = a.length;
    var p = 0;
    var p2 = 0;
    var q2 = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i] * b[i];
      p2 += a[i] * a[i];
      q2 += b[i] * b[i];
    }

    return p / (p2 + q2 - p);
  }

  function kumarJohnson(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.pow(a[i] * a[i] - b[i] * b[i], 2) / (2 * Math.pow(a[i] * b[i], 1.5));
    }

    return ans;
  }

  function lorentzian(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.log(Math.abs(a[i] - b[i]) + 1);
    }

    return ans;
  }

  function manhattan(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += Math.abs(a[i] - b[i]);
    }

    return d;
  }

  function matusita(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += Math.sqrt(a[i] * b[i]);
    }

    return Math.sqrt(2 - 2 * ans);
  }

  function minkowski(a, b, p) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += Math.pow(Math.abs(a[i] - b[i]), p);
    }

    return Math.pow(d, 1 / p);
  }

  function motyka(a, b) {
    var ii = a.length;
    var up = 0;
    var down = 0;

    for (var i = 0; i < ii; i++) {
      up += Math.min(a[i], b[i]);
      down += a[i] + b[i];
    }

    return 1 - up / down;
  }

  function neyman(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) / a[i];
    }

    return d;
  }

  function pearson(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) / b[i];
    }

    return d;
  }

  function probabilisticSymmetric(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) / (a[i] + b[i]);
    }

    return 2 * d;
  }

  function ruzicka(a, b) {
    var ii = a.length;
    var up = 0;
    var down = 0;

    for (var i = 0; i < ii; i++) {
      up += Math.min(a[i], b[i]);
      down += Math.max(a[i], b[i]);
    }

    return up / down;
  }

  function soergel(a, b) {
    var ii = a.length;
    var up = 0;
    var down = 0;

    for (var i = 0; i < ii; i++) {
      up += Math.abs(a[i] - b[i]);
      down += Math.max(a[i], b[i]);
    }

    return up / down;
  }

  function sorensen(a, b) {
    var ii = a.length;
    var up = 0;
    var down = 0;

    for (var i = 0; i < ii; i++) {
      up += Math.abs(a[i] - b[i]);
      down += a[i] + b[i];
    }

    return up / down;
  }

  function squared(a, b) {
    var i = 0;
    var ii = a.length;
    var d = 0;

    for (; i < ii; i++) {
      d += (a[i] - b[i]) * (a[i] - b[i]) / (a[i] + b[i]);
    }

    return d;
  }

  function squaredChord(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) * (Math.sqrt(a[i]) - Math.sqrt(b[i]));
    }

    return ans;
  }

  function taneja(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
    }

    return ans;
  }

  function tanimoto(a, b, bitvector) {
    if (bitvector) {
      var inter = 0;
      var union = 0;

      for (var j = 0; j < a.length; j++) {
        inter += a[j] && b[j];
        union += a[j] || b[j];
      }

      if (union === 0) {
        return 1;
      }

      return inter / union;
    } else {
      var ii = a.length;
      var p = 0;
      var q = 0;
      var m = 0;

      for (var i = 0; i < ii; i++) {
        p += a[i];
        q += b[i];
        m += Math.min(a[i], b[i]);
      }

      return 1 - (p + q - 2 * m) / (p + q - m);
    }
  }

  function tanimoto$1(a, b, bitvector) {
    if (bitvector) {
      return 1 - tanimoto(a, b, bitvector);
    } else {
      var ii = a.length;
      var p = 0;
      var q = 0;
      var m = 0;

      for (var i = 0; i < ii; i++) {
        p += a[i];
        q += b[i];
        m += Math.min(a[i], b[i]);
      }

      return (p + q - 2 * m) / (p + q - m);
    }
  }

  function topsoe(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i])) + b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
    }

    return ans;
  }

  function waveHedges(a, b) {
    var ii = a.length;
    var ans = 0;

    for (var i = 0; i < ii; i++) {
      ans += 1 - Math.min(a[i], b[i]) / Math.max(a[i], b[i]);
    }

    return ans;
  }



  var distances = /*#__PURE__*/Object.freeze({
    euclidean: euclidean,
    squaredEuclidean: squaredEuclidean,
    additiveSymmetric: additiveSymmetric,
    avg: avg,
    bhattacharyya: bhattacharyya,
    canberra: canberra,
    chebyshev: chebyshev,
    clark: clark,
    czekanowski: czekanowskiDistance,
    dice: dice,
    divergence: divergence,
    fidelity: fidelity,
    gower: gower,
    harmonicMean: harmonicMean,
    hellinger: hellinger,
    innerProduct: innerProduct,
    intersection: intersection,
    jaccard: jaccard,
    jeffreys: jeffreys,
    jensenDifference: jensenDifference,
    jensenShannon: jensenShannon,
    kdivergence: kdivergence,
    kulczynski: kulczynski,
    kullbackLeibler: kullbackLeibler,
    kumarHassebrook: kumarHassebrook,
    kumarJohnson: kumarJohnson,
    lorentzian: lorentzian,
    manhattan: manhattan,
    matusita: matusita,
    minkowski: minkowski,
    motyka: motyka,
    neyman: neyman,
    pearson: pearson,
    probabilisticSymmetric: probabilisticSymmetric,
    ruzicka: ruzicka,
    soergel: soergel,
    sorensen: sorensen,
    squared: squared,
    squaredChord: squaredChord,
    taneja: taneja,
    tanimoto: tanimoto$1,
    topsoe: topsoe,
    waveHedges: waveHedges
  });

  /**
   * Function that creates the tree
   * @param {Array<Array<number>>} spectrum
   * @param {object} [options]
   * @return {Tree|null}
   * left and right have the same structure than the parent,
   * or are null if they are leaves
   */

  function createTree(spectrum) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var X = spectrum[0];
    const {
      minWindow = 0.16,
      threshold = 0.01,
      from = X[0],
      to = X[X.length - 1]
    } = options;
    return mainCreateTree(spectrum[0], spectrum[1], from, to, minWindow, threshold);
  }

  function mainCreateTree(X, Y, from, to, minWindow, threshold) {
    if (to - from < minWindow) {
      return null;
    } // search first point


    var start = binarySearch(X, from, ascending);

    if (start < 0) {
      start = ~start;
    } // stop at last point


    var sum = 0;
    var center = 0;

    for (var i = start; i < X.length; i++) {
      if (X[i] >= to) {
        break;
      }

      sum += Y[i];
      center += X[i] * Y[i];
    }

    if (sum < threshold) {
      return null;
    }

    center /= sum;

    if (center - from < 1e-6 || to - center < 1e-6) {
      return null;
    }

    if (center - from < minWindow / 4) {
      return mainCreateTree(X, Y, center, to, minWindow, threshold);
    } else {
      if (to - center < minWindow / 4) {
        return mainCreateTree(X, Y, from, center, minWindow, threshold);
      } else {
        return new Tree(sum, center, mainCreateTree(X, Y, from, center, minWindow, threshold), mainCreateTree(X, Y, center, to, minWindow, threshold));
      }
    }
  }

  class Tree {
    constructor(sum, center, left, right) {
      this.sum = sum;
      this.center = center;
      this.left = left;
      this.right = right;
    }

  }

  /**
   * Similarity between two nodes
   * @param {Tree|Array<Array<number>>} a - tree A node
   * @param {Tree|Array<Array<number>>} b - tree B node
   * @param {object} [options]
   * @return {number} similarity measure between tree nodes
   */

  function getSimilarity(a, b) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      alpha = 0.1,
      beta = 0.33,
      gamma = 0.001
    } = options;

    if (a === null || b === null) {
      return 0;
    }

    if (Array.isArray(a)) {
      a = createTree(a);
    }

    if (Array.isArray(b)) {
      b = createTree(b);
    }

    var C = alpha * Math.min(a.sum, b.sum) / Math.max(a.sum, b.sum) + (1 - alpha) * Math.exp(-gamma * Math.abs(a.center - b.center));
    return beta * C + (1 - beta) * (getSimilarity(a.left, b.left, options) + getSimilarity(a.right, b.right, options)) / 2;
  }

  function treeSimilarity(A, B) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return getSimilarity(A, B, options);
  }
  function getFunction() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return (A, B) => getSimilarity(A, B, options);
  }

  var index$3 = /*#__PURE__*/Object.freeze({
    treeSimilarity: treeSimilarity,
    getFunction: getFunction,
    createTree: createTree
  });

  function cosine(a, b) {
    var ii = a.length;
    var p = 0;
    var p2 = 0;
    var q2 = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i] * b[i];
      p2 += a[i] * a[i];
      q2 += b[i] * b[i];
    }

    return p / (Math.sqrt(p2) * Math.sqrt(q2));
  }

  function dice$1(a, b) {
    return 1 - dice(a, b);
  }

  function intersection$1(a, b) {
    return 1 - intersection(a, b);
  }

  function jaccard$1(a, b) {
    return 1 - jaccard(a, b);
  }

  function kulczynski$1(a, b) {
    return 1 / kulczynski(a, b);
  }

  function motyka$1(a, b) {
    return 1 - motyka(a, b);
  }

  function pearson$1(a, b) {
    var avgA = mean(a);
    var avgB = mean(b);
    var newA = new Array(a.length);
    var newB = new Array(b.length);

    for (var i = 0; i < newA.length; i++) {
      newA[i] = a[i] - avgA;
      newB[i] = b[i] - avgB;
    }

    return cosine(newA, newB);
  }

  function squaredChord$1(a, b) {
    return 1 - squaredChord(a, b);
  }



  var similarities = /*#__PURE__*/Object.freeze({
    tree: index$3,
    cosine: cosine,
    czekanowski: czekanowskiSimilarity,
    dice: dice$1,
    intersection: intersection$1,
    jaccard: jaccard$1,
    kulczynski: kulczynski$1,
    motyka: motyka$1,
    pearson: pearson$1,
    squaredChord: squaredChord$1,
    tanimoto: tanimoto
  });

  var acc = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = (pred.tn[i] + pred.tp[i]) / (l - 1);
    }

    return result;
  }; // Error rate


  var err = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fn[i] + pred.fp[i] / (l - 1);
    }

    return result;
  }; // False positive rate


  var fpr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fp[i] / pred.nNeg;
    }

    return result;
  }; // True positive rate


  var tpr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.tp[i] / pred.nPos;
    }

    return result;
  }; // False negative rate


  var fnr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fn[i] / pred.nPos;
    }

    return result;
  }; // True negative rate


  var tnr = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.tn[i] / pred.nNeg;
    }

    return result;
  }; // Positive predictive value


  var ppv = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fp[i] + pred.tp[i] !== 0 ? pred.tp[i] / (pred.fp[i] + pred.tp[i]) : 0;
    }

    return result;
  }; // Negative predictive value


  var npv = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fn[i] + pred.tn[i] !== 0 ? pred.tn[i] / (pred.fn[i] + pred.tn[i]) : 0;
    }

    return result;
  }; // Prediction conditioned fallout


  var pcfall = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fp[i] + pred.tp[i] !== 0 ? 1 - pred.tp[i] / (pred.fp[i] + pred.tp[i]) : 1;
    }

    return result;
  }; // Prediction conditioned miss


  var pcmiss = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.fn[i] + pred.tn[i] !== 0 ? 1 - pred.tn[i] / (pred.fn[i] + pred.tn[i]) : 1;
    }

    return result;
  }; // Lift value


  var lift = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.nPosPred[i] !== 0 ? pred.tp[i] / pred.nPos / (pred.nPosPred[i] / pred.nSamples) : 0;
    }

    return result;
  }; // Rate of positive predictions


  var rpp = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.nPosPred[i] / pred.nSamples;
    }

    return result;
  }; // Rate of negative predictions


  var rnp = pred => {
    const l = pred.cutoffs.length;
    const result = new Array(l);

    for (var i = 0; i < l; i++) {
      result[i] = pred.nNegPred[i] / pred.nSamples;
    }

    return result;
  }; // Threshold


  var threshold = pred => {
    const clone = pred.cutoffs.slice();
    clone[0] = clone[1]; // Remove the infinite value

    return clone;
  };

  var measures = {
    acc: acc,
    err: err,
    fpr: fpr,
    tpr: tpr,
    fnr: fnr,
    tnr: tnr,
    ppv: ppv,
    npv: npv,
    pcfall: pcfall,
    pcmiss: pcmiss,
    lift: lift,
    rpp: rpp,
    rnp: rnp,
    threshold: threshold
  };

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
        throw new Error("The specified measure (".concat(measure, ") does not exist"));
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
      var interval = options.interval || Math.floor((cutHigh - cutLow) / 20 * 10000000 - 1) / 10000000; // Trick to avoid the precision problem of float numbers

      var xLabels = [];
      var interValues = [];
      var intraValues = [];
      var interCumPercent = [];
      var intraCumPercent = [];
      var nTP = this.tp[cutLength - 1],
          currentTP = 0;
      var nFP = this.fp[cutLength - 1],
          currentFP = 0;

      for (var i = cutLow, j = cutLength - 1; i <= cutHigh; i += interval) {
        while (this.cutoffs[j] < i) j--;

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
  var src$6 = Performance;

  var defaultOptions$h = {
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

    if (typeof options.size === 'number') {
      options.size = [options.size, options.size];
    }

    var cond = len + options.size[0] + options.size[1];
    var output;

    if (options.output) {
      if (options.output.length !== cond) {
        throw new RangeError('Wrong output size');
      }

      output = options.output;
    } else {
      output = new Array(cond);
    }

    var i;

    if (options.value === 'circular') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) {
          output[i] = data[(len - options.size[0] % len + i) % len];
        } else if (i < options.size[0] + len) {
          output[i] = data[i - options.size[0]];
        } else {
          output[i] = data[(i - options.size[0]) % len];
        }
      }
    } else if (options.value === 'replicate') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[0];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[len - 1];
      }
    } else if (options.value === 'symmetric') {
      if (options.size[0] > len || options.size[1] > len) {
        throw new RangeError('expanded value should not be bigger than the data length');
      }

      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[2 * len + options.size[0] - i - 1];
      }
    } else {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = options.value;else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = options.value;
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
    // var row = data.length;
    // var col = data[0].length;
    if (options.size[0] === undefined) {
      options.size = [options.size, options.size, options.size, options.size];
    }

    throw new Error('matrix not supported yet, sorry');
  }
  /**
   * Pads and array
   * @param {Array <number>} data
   * @param {object} options
   */


  function padArray(data, options) {
    options = Object.assign({}, defaultOptions$h, options);

    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) return matrixCase(data, options);else return arrayCase(data, options);
    } else {
      throw new TypeError('data should be an array');
    }
  }

  var src$7 = padArray;

  const {
    Matrix: Matrix$2,
    MatrixTransposeView: MatrixTransposeView$2,
    inverse: inverse$1
  } = Matrix;
  const defaultOptions$i = {
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

  function SavitzkyGolay(data, h, options) {
    options = Object.assign({}, defaultOptions$i, options);

    if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) {
      throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    }

    if (options.derivative < 0 || !Number.isInteger(options.derivative)) {
      throw new RangeError('Derivative should be a positive integer');
    }

    if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) {
      throw new RangeError('Polynomial should be a positive integer');
    }

    var C, norm;
    var step = Math.floor(options.windowSize / 2);

    if (options.pad === 'pre') {
      data = src$7(data, {
        size: step,
        value: options.padValue
      });
    }

    var ans = new Array(data.length - 2 * step);

    if (options.windowSize === 5 && options.polynomial === 2 && (options.derivative === 1 || options.derivative === 2)) {
      if (options.derivative === 1) {
        C = [-2, -1, 0, 1, 2];
        norm = 10;
      } else {
        C = [2, -1, -2, -1, 2];
        norm = 7;
      }
    } else {
      var J = Matrix$2.ones(options.windowSize, options.polynomial + 1);
      var inic = -(options.windowSize - 1) / 2;

      for (var i = 0; i < J.rows; i++) {
        for (var j = 0; j < J.columns; j++) {
          if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
        }
      }

      var Jtranspose = new MatrixTransposeView$2(J);
      var Jinv = inverse$1(Jtranspose.mmul(J));
      C = Jinv.mmul(Jtranspose);
      C = C.getRow(options.derivative);
      norm = 1;
    }

    var det = norm * Math.pow(h, options.derivative);

    for (var k = step; k < data.length - step; k++) {
      var d = 0;

      for (var l = 0; l < C.length; l++) d += C[l] * data[l + k - step] / det;

      ans[k - step] = d;
    }

    if (options.pad === 'post') {
      ans = src$7(ans, {
        size: step,
        value: options.padValue
      });
    }

    return ans;
  }

  var src$8 = SavitzkyGolay;

  // auxiliary file to create the 256 look at table elements
  var ans = new Array(256);

  for (var i = 0; i < 256; i++) {
    var num = i;
    var c = 0;

    while (num) {
      num = num & num - 1;
      c++;
    }

    ans[i] = c;
  }

  var creator = ans;

  /**
   * Count the number of true values in an array
   * @param {Array} arr
   * @return {number}
   */


  function count(arr) {
    var c = 0;

    for (var i = 0; i < arr.length; i++) {
      c += creator[arr[i] & 0xff] + creator[arr[i] >> 8 & 0xff] + creator[arr[i] >> 16 & 0xff] + creator[arr[i] >> 24 & 0xff];
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

    for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] & arr2[i];

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

    for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] | arr2[i];

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

    for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] ^ arr2[i];

    return ans;
  }
  /**
   * Logical NOT operation
   * @param {Array} arr
   * @return {Array}
   */


  function not(arr) {
    var ans = new Array(arr.length);

    for (var i = 0; i < ans.length; i++) ans[i] = ~arr[i];

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

    var mask = 1 << 31 - n % 32;
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

    var mask = 1 << 31 - n % 32;
    if (val) arr[index] = mask | arr[index];else arr[index] = ~mask & arr[index];
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
      ans[i] = parseInt(str.substr(i * 32, 32), 2) | 0;
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
      ans[i] = parseInt(str.substr(i * 8, 8), 16) | 0;
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

    return str;
  }

  var src$9 = {
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

  /**
   * Computes the mode of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function mode$1(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var maxValue = 0;
    var maxCount = 0;
    var count = 0;
    var counts = {};

    for (var i = 0; i < input.length; ++i) {
      var element = input[i];
      count = counts[element];

      if (count) {
        counts[element]++;
        count++;
      } else {
        counts[element] = count = 1;
      }

      if (count > maxCount) {
        maxCount = count;
        maxValue = input[i];
      }
    }

    return maxValue;
  }

  /**
   * Computes the norm of the given values
   * @param {Array<number>} input
   * @param {object} [options={}]
   * @param {string} [algorithm='absolute']
   * @return {number}
   */
  function norm$1(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$algorithm = options.algorithm,
        algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm;

    if (!Array.isArray(input)) {
      throw new Error('input must be an array');
    }

    if (input.length === 0) {
      throw new Error('input must not be empty');
    }

    switch (algorithm.toLowerCase()) {
      case 'absolute':
        var sum = absoluteSum(input);
        if (sum === 0) return input.slice(0);
        return input.map(function (element) {
          return element / sum;
        });

      default:
        throw new Error("norm: unknown algorithm: ".concat(algorithm));
    }
  }

  function absoluteSum(input) {
    var sum = 0;

    for (var i = 0; i < input.length; i++) {
      sum += Math.abs(input[i]);
    }

    return sum;
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  /**
   * Fill an array with sequential numbers
   * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
   * @param {object} [options={}]
   * @param {number} [options.from=0] - first value in the array
   * @param {number} [options.to=10] - last value in the array
   * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
   * @param {number} [options.step] - if not provided calculated from size
   * @return {Array<number>}
   */


  function sequentialFill() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (_typeof(input) === 'object' && !src(input)) {
      options = input;
      input = [];
    }

    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    var _options = options,
        _options$from = _options.from,
        from = _options$from === void 0 ? 0 : _options$from,
        _options$to = _options.to,
        to = _options$to === void 0 ? 10 : _options$to,
        _options$size = _options.size,
        size = _options$size === void 0 ? input.length : _options$size,
        step = _options.step;

    if (size && step) {
      throw new Error('step is defined by the array size');
    }

    if (!size) {
      if (step) {
        size = Math.floor((to - from) / step) + 1;
      } else {
        size = to - from + 1;
      }
    }

    if (!step && size) {
      step = (to - from) / (size - 1);
    }

    if (Array.isArray(input)) {
      input.length = 0; // only works with normal array

      for (var i = 0; i < size; i++) {
        input.push(from);
        from += step;
      }
    } else {
      if (input.length !== size) {
        throw new Error('sequentialFill typed array must have the correct length');
      }

      for (var _i = 0; _i < size; _i++) {
        input[_i] = from;
        from += step;
      }
    }

    return input;
  }

  /**
   * Computes the variance of the given values
   * @param {Array} values
   * @param {object} [options]
   * @param {boolean} [options.unbiased = true] - if true, divide by (n-1); if false, divide by n.
   * @param {number} [options.mean = arrayMean] - precalculated mean, if any.
   * @return {number}
   */

  function variance(values) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!src(values)) {
      throw new TypeError('input must be an array');
    }

    var _options$unbiased = options.unbiased,
        unbiased = _options$unbiased === void 0 ? true : _options$unbiased,
        _options$mean = options.mean,
        mean$1 = _options$mean === void 0 ? mean(values) : _options$mean;
    var sqrError = 0;

    for (var i = 0; i < values.length; i++) {
      var x = values[i] - mean$1;
      sqrError += x * x;
    }

    if (unbiased) {
      return sqrError / (values.length - 1);
    } else {
      return sqrError / values.length;
    }
  }

  /**
   * Computes the standard deviation of the given values
   * @param {Array} values
   * @param {object} [options]
   * @param {boolean} [options.unbiased = true] - if true, divide by (n-1); if false, divide by n.
   * @param {number} [options.mean = arrayMean] - precalculated mean, if any.
   * @return {number}
   */

  function standardDeviation(values) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return Math.sqrt(variance(values, options));
  }

  /**
   * Merge abscissa values if the ordinate value is in a list of centroids
   * @param {object} originalPoints
   * @param {Array<number>} originalPoints.x
   * @param {Array<number>} originalPoints.y
   * @param {Array<number>} centroids
   * @param {object} [options]
   * @param {number} [options.window = 0.01] - has to be a positive number
   * @return {{x: Array<number>, y: Array<number>}}
   */
  function mergeByCentroids(originalPoints, centroids) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      window = 0.01
    } = options;
    var mergedPoints = {
      x: centroids.slice(),
      y: new Array(centroids.length).fill(0)
    };
    var originalIndex = 0;
    var mergedIndex = 0;

    while (originalIndex < originalPoints.x.length && mergedIndex < centroids.length) {
      var diff = originalPoints.x[originalIndex] - centroids[mergedIndex];

      if (Math.abs(diff) < window) {
        mergedPoints.y[mergedIndex] += originalPoints.y[originalIndex++];
      } else if (diff < 0) {
        originalIndex++;
      } else {
        mergedIndex++;
      }
    }

    return mergedPoints;
  }

  /**
   *
   * @param {object} points
   * @param {Array<number>} originalPoints.x
   * @param {Array<number>} originalPoints.y
   * @param {*} options
   * @return {{x: Array<number>, y: Array<number>}}
   */

  function closestX(points, options) {
    const {
      x,
      y
    } = points;
    const {
      target = x[0],
      reverse = false
    } = options;
    let index;

    if (reverse) {
      index = binarySearch(x, target, descending);
    } else {
      index = binarySearch(x, target, ascending);
    }

    if (index >= 0) {
      return {
        x: x[index],
        y: y[index]
      };
    } else {
      index = ~index;

      if (index !== 0 && Math.abs(x[index] - target) > 0.5 || index === x.length) {
        return {
          x: x[index - 1],
          y: y[index - 1]
        };
      } else {
        return {
          x: x[index],
          y: y[index]
        };
      }
    }
  }

  /**
   * Merge abscissas values on similar ordinates and weight the group of abscissas
   * @param {object} points
   * @param {Array<number>} points.x - sorted abscissas values
   * @param {Array<number>} points.y - ordinates values
   * @param {object} [options]
   * @param {number} [options.groupWidth = 0.001] - window for abscissas to merge
   * @return {{x: Array<number>, y: Array<number>}}
   */
  function maxMerge(points) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      x,
      y
    } = points;
    const {
      groupWidth = 0.001
    } = options;
    var merged = {
      x: [],
      y: []
    };
    var maxAbscissa = {
      x: [],
      y: []
    };
    var size = 0;
    var index = 0;

    while (index < x.length) {
      if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
        maxAbscissa.x.push(x[index]);
        maxAbscissa.y.push(y[index]);
        merged.x.push(x[index]);
        merged.y.push(y[index]);
        index++;
        size++;
      } else {
        if (y[index] > maxAbscissa.y[size - 1]) {
          maxAbscissa.x[size - 1] = x[index];
          maxAbscissa.y[size - 1] = y[index];
        }

        merged.x[size - 1] = x[index];
        merged.y[size - 1] += y[index];
        index++;
      }
    }

    merged.x = maxAbscissa.x.slice();
    return merged;
  }

  /**
   * @param {object} points
   * @param {Array<number>} points.x - sorted abscissas values
   * @param {Array<number>} points.y - ordinates values
   * @param {object} [options]
   * @param {object} [options.from = {index: 0}]
   * @param {object} [options.to = {index: x.length-1}]
   * @param {boolean} [options.reverse = false]
   * @return {{index: number, value: number}}
   */

  function maxY(points) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      x,
      y
    } = points;
    let {
      from = {
        index: 0
      },
      to = {
        index: x.length
      },
      reverse = false
    } = options;

    if (from.value !== undefined && from.index === undefined) {
      from.index = calculateIndex(from.value, x, reverse);
    }

    if (to.value !== undefined && to.index === undefined) {
      to.index = calculateIndex(to.value, x, reverse);
    }

    var currentMax = Number.MIN_VALUE;
    var currentIndex;

    for (var i = from.index; i < to.index; i++) {
      if (currentMax < y[i]) {
        currentMax = y[i];
        currentIndex = i;
      }
    }

    return {
      index: currentIndex,
      value: currentMax
    };
  }
  /**
   * @param {number} value
   * @param {Array<number>} x
   * @param {boolean} reverse
   * @return {number} index of the value in the array
   */

  function calculateIndex(value, x, reverse) {
    let index;

    if (reverse) {
      index = binarySearch(x, value, descending);
    } else {
      index = binarySearch(x, value, ascending);
    }

    if (index < 0) {
      throw new Error("the value ".concat(value, " doesn't belongs to the abscissa value"));
    }

    return index;
  }

  function sortX(points) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      x,
      y
    } = points;
    const {
      reverse = false
    } = options;
    var sortFunc;

    if (!reverse) {
      sortFunc = (a, b) => a.x - b.x;
    } else {
      sortFunc = (a, b) => b.x - a.x;
    }

    var grouped = x.map((val, index) => ({
      x: val,
      y: y[index]
    })).sort(sortFunc);
    var response = {
      x: x.slice(),
      y: y.slice()
    };

    for (var i = 0; i < x.length; i++) {
      response.x[i] = grouped[i].x;
      response.y[i] = grouped[i].y;
    }

    return response;
  }

  /**
   * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
   * @param {object} [points={}] : Object of points contains property x (an array) and y (an array)
   * @return points
   */
  function uniqueX() {
    let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const {
      x,
      y
    } = points;
    if (x.length < 2) return;

    if (x.length !== y.length) {
      throw new Error('The X and Y arrays mush have the same length');
    }

    let current = x[0];
    let counter = 0;

    for (let i = 1; i < x.length; i++) {
      if (current !== x[i]) {
        counter++;
        current = x[i];
        x[counter] = x[i];

        if (i !== counter) {
          y[counter] = 0;
        }
      }

      if (i !== counter) {
        y[counter] += y[i];
      }
    }

    x.length = counter + 1;
    y.length = counter + 1;
  }

  /**
   * Merge abscissas values on similar ordinates and weight the group of abscissas
   * @param {object} points
   * @param {Array<number>} points.x - sorted abscissas values
   * @param {Array<number>} points.y - ordinates values
   * @param {object} [options]
   * @param {number} [options.groupWidth = 0.001] - window for abscissas to merge
   * @return {{x: Array<number>, y: Array<number>}}
   */
  function weightedMerge(points) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      x,
      y
    } = points;
    const {
      groupWidth = 0.001
    } = options;
    var merged = {
      x: [],
      y: []
    };
    var weightedAbscissa = {
      x: [],
      y: []
    };
    var size = 0;
    var index = 0;

    while (index < x.length) {
      if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
        weightedAbscissa.x.push(x[index] * y[index]);
        weightedAbscissa.y.push(y[index]);
        merged.x.push(x[index]);
        merged.y.push(y[index]);
        index++;
        size++;
      } else {
        weightedAbscissa.x[size - 1] += x[index] * y[index];
        weightedAbscissa.y[size - 1] += y[index];
        merged.x[size - 1] = x[index];
        merged.y[size - 1] += y[index];
        index++;
      }
    }

    for (var i = 0; i < merged.x.length; i++) {
      merged.x[i] = weightedAbscissa.x[i] / weightedAbscissa.y[i];
    }

    return merged;
  }

  /**
   * Function that calculates the integral of the line between two
   * x-coordinates, given the slope and intercept of the line.
   * @param {number} x0
   * @param {number} x1
   * @param {number} slope
   * @param {number} intercept
   * @return {number} integral value.
   */
  function integral(x0, x1, slope, intercept) {
    return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "smooth"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "smooth"
   */

  function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
    var xLength = x.length;
    var step = (to - from) / (numberOfPoints - 1);
    var halfStep = step / 2;
    var output = new Array(numberOfPoints);
    var initialOriginalStep = x[1] - x[0];
    var lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

    var min = from - halfStep;
    var max = from + halfStep;
    var previousX = Number.MIN_VALUE;
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

    main: while (true) {
      if (previousX <= min && min <= nextX) {
        add = integral(0, min - previousX, slope, previousY);
        sumAtMin = currentValue + add;
      }

      while (nextX - max >= 0) {
        // no overlap with original point, just consume current value
        var add = integral(0, max - previousX, slope, previousY);
        sumAtMax = currentValue + add;
        output[j++] = (sumAtMax - sumAtMin) / step;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        sumAtMin = sumAtMax;
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

      slope = getSlope(previousX, previousY, nextX, nextY);
      intercept = -slope * previousX + previousY;
    }

    return output;
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "slot"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "slot"
   */
  function equallySpacedSlot(x, y, from, to, numberOfPoints) {
    var xLength = x.length;
    var step = (to - from) / (numberOfPoints - 1);
    var halfStep = step / 2;
    var lastStep = x[x.length - 1] - x[x.length - 2];
    var start = from - halfStep;
    var output = new Array(numberOfPoints); // Init main variables

    var min = start;
    var max = start + step;
    var previousX = -Number.MAX_VALUE;
    var previousY = 0;
    var nextX = x[0];
    var nextY = y[0];
    var frontOutsideSpectra = 0;
    var backOutsideSpectra = true;
    var currentValue = 0; // for slot algorithm

    var currentPoints = 0;
    var i = 1; // index of input

    var j = 0; // index of output

    main: while (true) {
      if (previousX >= nextX) throw new Error('x must be an increasing serie');

      while (previousX - max > 0) {
        // no overlap with original point, just consume current value
        if (backOutsideSpectra) {
          currentPoints++;
          backOutsideSpectra = false;
        }

        output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
        j++;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        currentValue = 0;
        currentPoints = 0;
      }

      if (previousX > min) {
        currentValue += previousY;
        currentPoints++;
      }

      if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
        currentPoints--;
      }

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

  function getZones(from, to, numberOfPoints) {
    let exclusions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

    if (from > to) {
      [from, to] = [to, from];
    } // in exclusions from and to have to be defined


    exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
    exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

    exclusions.forEach(exclusion => {
      if (exclusion.from > exclusion.to) {
        [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
      }
    });
    exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

    exclusions.forEach(exclusion => {
      if (exclusion.from < from) exclusion.from = from;
      if (exclusion.to > to) exclusion.to = to;
    });

    for (let i = 0; i < exclusions.length - 1; i++) {
      if (exclusions[i].to > exclusions[i + 1].from) {
        exclusions[i].to = exclusions[i + 1].from;
      }
    }

    exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

    if (!exclusions || exclusions.length === 0) {
      return [{
        from,
        to,
        numberOfPoints
      }];
    } // need to deal with overlapping exclusions and out of bound exclusions


    let toRemove = exclusions.reduce((previous, exclusion) => previous += exclusion.to - exclusion.from, 0);
    let total = to - from;
    let unitsPerPoint = (total - toRemove) / numberOfPoints;
    let zones = [];
    let currentFrom = from;
    let totalPoints = 0;

    for (let exclusion of exclusions) {
      let currentNbPoints = Math.round((exclusion.from - currentFrom) / unitsPerPoint);
      totalPoints += currentNbPoints;

      if (currentNbPoints > 0) {
        zones.push({
          from: currentFrom,
          to: exclusion.from,
          numberOfPoints: currentNbPoints
        });
      }

      currentFrom = exclusion.to;
    }

    if (numberOfPoints - totalPoints > 0) {
      zones.push({
        from: currentFrom,
        to: to,
        numberOfPoints: numberOfPoints - totalPoints
      });
    }

    return zones;
  }

  /**
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
   * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
   * @param {object} [options={}]
   * @param {number} [options.from=x[0]]
   * @param {number} [options.to=x[x.length-1]]
   * @param {string} [options.variant='smooth']
   * @param {number} [options.numberOfPoints=100]
   * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
   * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
   */

  function equallySpaced() {
    let arrayXY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let {
      x,
      y
    } = arrayXY;
    let xLength = x.length;
    let reverse = false;

    if (x.length > 1 && x[0] > x[1]) {
      x = x.slice().reverse();
      y = y.slice().reverse();
      reverse = true;
    }

    let {
      from = x[0],
      to = x[xLength - 1],
      variant = 'smooth',
      numberOfPoints = 100,
      exclusions = []
    } = options;

    if (xLength !== y.length) {
      throw new RangeError("the x and y vector doesn't have the same size.");
    }

    if (typeof from !== 'number' || isNaN(from)) {
      throw new RangeError("'from' option must be a number");
    }

    if (typeof to !== 'number' || isNaN(to)) {
      throw new RangeError("'to' option must be a number");
    }

    if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
      throw new RangeError("'numberOfPoints' option must be a number");
    }

    let zones = getZones(from, to, numberOfPoints, exclusions);
    let xResult = [];
    let yResult = [];

    for (let zone of zones) {
      let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant);
      xResult.push(...zoneResult.x);
      yResult.push(...zoneResult.y);
    }

    if (reverse) {
      if (from < to) {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      } else {
        return {
          x: xResult,
          y: yResult
        };
      }
    } else {
      if (from < to) {
        return {
          x: xResult,
          y: yResult
        };
      } else {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      }
    }
  }

  function processZone(x, y, from, to, numberOfPoints, variant) {
    if (numberOfPoints < 1) {
      throw new RangeError('the number of points must be at least 1');
    }

    var output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
    return {
      x: sequentialFill({
        from,
        to,
        size: numberOfPoints
      }),
      y: output
    };
  }

  function getZones$1(from, to) {
    let exclusions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    if (from > to) {
      [from, to] = [to, from];
    } // in exclusions from and to have to be defined


    exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
    exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

    exclusions.forEach(exclusion => {
      if (exclusion.from > exclusion.to) {
        [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
      }
    });
    exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

    exclusions.forEach(exclusion => {
      if (exclusion.from < from) exclusion.from = from;
      if (exclusion.to > to) exclusion.to = to;
    });

    for (let i = 0; i < exclusions.length - 1; i++) {
      if (exclusions[i].to > exclusions[i + 1].from) {
        exclusions[i].to = exclusions[i + 1].from;
      }
    }

    exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

    if (!exclusions || exclusions.length === 0) {
      return [{
        from,
        to
      }];
    }

    let zones = [];
    let currentFrom = from;

    for (let exclusion of exclusions) {
      if (currentFrom < exclusion.from) {
        zones.push({
          from: currentFrom,
          to: exclusion.from
        });
      }

      currentFrom = exclusion.to;
    }

    if (currentFrom < to) {
      zones.push({
        from: currentFrom,
        to: to
      });
    }

    return zones;
  }

  /**
   * Filter an array x/y based on various criteria
   * x points are expected to be sorted
   *
   * @param {object} points
   * @param {object} [options={}]
   * @param {array} [options.from]
   * @param {array} [options.to]
   * @param {array} [options.exclusions=[]]
   * @return {{x: Array<number>, y: Array<number>}}
   */

  function filterX(points) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      x,
      y
    } = points;
    const {
      from = x[0],
      to = x[x.length - 1],
      exclusions = []
    } = options;
    let zones = getZones$1(from, to, exclusions);
    let currentZoneIndex = 0;
    let newX = [];
    let newY = [];
    let position = 0;

    while (position < x.length) {
      if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
        newX.push(x[position]);
        newY.push(y[position]);
      } else {
        if (x[position] > zones[currentZoneIndex].to) {
          currentZoneIndex++;
          if (!zones[currentZoneIndex]) break;
        }
      }

      position++;
    }

    return {
      x: newX,
      y: newY
    };
  }

  const {
    Matrix: Matrix$3,
    SVD,
    EVD,
    CholeskyDecomposition: CholeskyDecomposition$1,
    LuDecomposition: LuDecomposition$1,
    QrDecomposition: QrDecomposition$1
  } = MatrixLib;
  const Array$1 = {
    min,
    max,
    median,
    mean,
    mode: mode$1,
    normed: norm$1,
    rescale,
    sequentialFill,
    standardDeviation,
    variance
  };
  const ArrayXY = {
    centroidsMerge: mergeByCentroids,
    closestX,
    maxMerge,
    maxY,
    sortX,
    uniqueX,
    weightedMerge,
    equallySpaced,
    filterX
  };

  exports.Array = Array$1;
  exports.ArrayXY = ArrayXY;
  exports.BitArray = src$9;
  exports.CholeskyDecomposition = CholeskyDecomposition$1;
  exports.ConfusionMatrix = src$2;
  exports.CrossValidation = src$4;
  exports.DecisionTreeClassifier = DecisionTreeClassifier;
  exports.DecisionTreeRegression = DecisionTreeRegression;
  exports.Distance = distances;
  exports.EVD = EVD;
  exports.ExponentialRegression = ExponentialRegression;
  exports.FNN = FeedForwardNeuralNetwork;
  exports.HClust = index;
  exports.HashTable = HashTable;
  exports.KMeans = kmeans;
  exports.KNN = KNN;
  exports.KOPLS = KOPLS;
  exports.Kernel = kernel;
  exports.LuDecomposition = LuDecomposition$1;
  exports.Matrix = Matrix$3;
  exports.MatrixLib = MatrixLib;
  exports.MultivariateLinearRegression = MultivariateLinearRegression;
  exports.NaiveBayes = index$1;
  exports.PCA = PCA;
  exports.PLS = PLS;
  exports.Performance = src$6;
  exports.PolynomialRegression = PolynomialRegression;
  exports.PowerRegression = PowerRegression;
  exports.QrDecomposition = QrDecomposition$1;
  exports.Random = Random;
  exports.RandomForestClassifier = RandomForestClassifier;
  exports.RandomForestRegression = RandomForestRegression;
  exports.RobustPolynomialRegression = RobustPolynomialRegression;
  exports.SOM = src$5;
  exports.SVD = SVD;
  exports.Similarity = similarities;
  exports.SimpleLinearRegression = SimpleLinearRegression;
  exports.SparseMatrix = SparseMatrix;
  exports.TheilSenRegression = TheilSenRegression;
  exports.XSadd = XSadd;
  exports.binarySearch = binarySearch;
  exports.distanceMatrix = src$1;
  exports.levenbergMarquardt = levenbergMarquardt;
  exports.numSort = index$2;
  exports.padArray = src$7;
  exports.savitzkyGolay = src$8;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=ml.js.map
