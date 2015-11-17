# ml.js API guidelines

This document explains the general guidelines for the development of JavaScript APIs
for the machine learning algorithms.

## General rules

### Use camelCase

For consistency and because it is by far the most common style in JavaScript.  
Exception: class names must start with a capital letter.

#### Good

* xSquared
* kernelType
* maybeToPrecision

#### Bad

* x_squared
* KernelType
* maybe_To$precision

### Use understandable names

The API is the point of contact with the outside world. People that use it should remember what an
option or a function does without looking at the documentation.

#### Good

* alpha, beta, gamma, ...
* kernel, xSquared, numerator

#### Bad

* a, b, c
* k, x2, num

## Standalone functions

Functions that take some input and directly return the result should always have the following signature:

```js
function myFunction(param1, param2, ..., paramN, options) {}
```

The `param1` to `paramN` arguments are reserved for __mandatory__ parameters. Anything else goes in an `options` object.

To handle default options, use [`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign):

```js
var defaultOptions = {
    option1: 'value1',
    option2: 'value2'
};

function myFunction(options) {
    options = Object.assign({}, defaultOptions, options);
    ...
}
```

## Predictors

Predictors are classes which implement the following interface.

### new Predictor()

Creates the predictor. The constructor can take parameters or options to initialize the algorithm.

### predictor.train(trainingSet)

This method is optional.  
If the predictor has a training phase, it is executed here.

### predictor.predict(data)

This method runs the prediction for a new set of values.

### predictor.toJSON()

This method should return plain JSON that enables to reload the current predictor.

### Predictor.load(json)

This static method should return a new predictor instance that is ready to make predictions. The `json`
parameter is the object returned by an earlier call of `toJSON`.
