ml
==

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

### Neural networks

`ML.nn`

#### Self-organizing map

`ML.nn.SOM`  
See [ml-som](https://github.com/mljs/som)

## License

MIT
